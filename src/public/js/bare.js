function bareInit() {
    localforage.config({
        driver      : localforage.INDEXEDDB,
        name        : 'Ruby',
        version     : 1.0,
        storeName   : 'ruby_config', // Should be alphanumeric, with underscores.
        description : 'Ruby Config for things in sw'
    });
    localforage.setItem('bare', window.location.origin + '/bare/');
    localStorage.setItem('bare', '/bare/');
    uninstallAllSW2();
}

function bareChange(value) {
    localforage.config({
        driver      : localforage.INDEXEDDB,
        name        : 'Ruby',
        version     : 1.0,
        storeName   : 'ruby_config', // Should be alphanumeric, with underscores.
        description : 'Ruby Config for things in sw'
    });
    localforage.setItem('bare', value).then(function (value) {
        if (value === "") { value = window.location.origin + '/bare/'; localforage.setItem('bare', value); localStorage.setItem('bare', value); }
        if (!value.endsWith('/')) { value += '/'; localforage.setItem('bare', value); localStorage.setItem('bare', value);}
        if (!value.startsWith('http://') && !value.startsWith('https://') && value !== '/bare/' && value !== '/bare') { value = 'https://' + value; localforage.setItem('bare', value); localStorage.setItem('bare', value); }
        if (value === '/bare/' || value === '/bare') { value = window.location.origin + value; localforage.setItem('bare', value); localStorage.setItem('bare', value); }
        setBareTransport(localStorage.getItem('bare'));
        setItems();
    }).catch(function(err) {
        console.log(err);
    });
    //uninstallAllSW()
}

function uninstallAllSW() {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
            registration.unregister();
        }
    }).then(function() {
        window.location.reload();
    });
}
function uninstallAllSW2() {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
            registration.unregister();
        }
    }).then(function() {
        regSW();
    });
}

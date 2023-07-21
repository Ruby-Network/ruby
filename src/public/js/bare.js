function bareInit() {
    bareChange('/bare/');
}

function bareChange(value) {
    localforage.config({
        driver      : localforage.INDEXEDDB,
        name        : 'Ruby',
        version     : 1.0,
        storeName   : 'ruby_config',
        description : 'Ruby Config for things in sw'
    });
    localforage.setItem('bare', value).then(function (value) {
        if (!value.endsWith('/')) { value += '/'; localforage.setItem('bare', value); }
        if (!value.startsWith('http://') && !value.startsWith('https://') && value !== '/bare/' && value !== '/bare') { value = 'https://' + value; localforage.setItem('bare', value); }
    }).catch(function(err) {
        console.log(err);
    }); 
    uninstallAllSW();
}

function uninstallAllSW() {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
            if (registration.scope.includes('/service/')) {
                registration.unregister();
            }
        }
    });
}

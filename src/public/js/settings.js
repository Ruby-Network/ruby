localforage.config({
    driver      : localforage.INDEXEDDB,
    name        : 'Ruby',
    version     : 1.0,
    storeName   : 'ruby_config', // Should be alphanumeric, with underscores.
    description : 'Ruby Config for things in sw',
});
function bare(value) {
    if (!value.endsWith('/')) { value = value + '/'; }
    if (!value.startsWith('http://') && !value.startsWith('https://') && value !== '/bare/' && value !== '/bare') { value = 'https://' + value; }
    if ( value !== '/bare/' && value !== '/bare' ) {
        fetch(value).then(function(response) {
            if (response.status !== 200) { return false; }
            bareChange(value)
        }).catch(function(err) {
            console.log('Fetch Error :-S', err);
            bareChange('/bare/');
        });
    }
    else {
        bareChange(value);
    }
}
function setTitle(value) {
    localStorage.setItem('title', value);
    document.title = value;
}
function favicon(value) {
    localStorage.setItem('favicon', value);
    document.getElementById('favicon').href = value;
}
function theme(value) {
    localStorage.setItem('theme', value);
    document.documentElement.className = value;
}
function searchSettings(value) {
    localStorage.setItem('searchEngine', value);
}
function proxyChange(value) {
    localStorage.setItem('proxy', value);
}
function aboutBlank() {
    window.location.replace('https://google.com');
    const win = window.open();
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    const iframe = win.document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.margin = '0';
    const url = window.location.href;
    iframe.src = url;
    win.document.body.appendChild(iframe);
}

function setItems() {
    localforage.getItem('bare').then(function(value) {
        if ( value === window.location.origin + '/bare/' ) { value = '/bare/'; }
        document.getElementById('bareInput').value = value;
    }).catch(function(err) {
        console.log(err);
    });
    let titleInput = document.getElementById('titleInput');
    let faviconInput = document.getElementById('faviconInput');
    let themeSelect = document.getElementById('themeSelect');
    let searchInput = document.getElementById('searchInput');
    let proxySelect = document.getElementById('proxySelect');
    let bareInput = document.getElementById('bareInput');
    let title = localStorage.getItem('title');
    let favicon = localStorage.getItem('favicon');
    let theme = localStorage.getItem('theme');
    let search = localStorage.getItem('searchEngine');
    let proxy = localStorage.getItem('proxy');
    let bare = localStorage.getItem('bare');
    titleInput.value = title;
    faviconInput.value = favicon;
    themeSelect.value = theme;
    searchInput.value = search;
    proxySelect.value = proxy;
    bareInput.value = bare;
    document.documentElement.className = localStorage.getItem('theme');
    document.title = title;
    document.getElementById('favicon').href = favicon;
}

function init() {
    let init = localStorage.getItem('init');
    if (init === null || init === undefined || init === 'false') {
        bareInit();
        localStorage.setItem('init', true);
        localStorage.setItem('title', 'Ruby');
        localStorage.setItem('favicon', '/favicon.ico');
        localStorage.setItem('theme', 'default');
        localStorage.setItem('searchEngine', 'https://www.google.com/search?q=%s');
        localStorage.setItem('proxy', 'uv');
        localStorage.setItem('bare', window.location.origin + '/bare/');
        setItems();
    }
    else { 
        setItems();
    }
}
init();

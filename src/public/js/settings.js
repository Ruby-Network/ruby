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
            localStorage.setItem('bare', value);
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
    const setValue = function() {
        localStorage.setItem('proxy', value);
    }
    const defaultFUNC = function() {
        setItems();
    }
    if (value === 'dynamic') {
        notifyBeta('Dynamic', setValue, defaultFUNC);
    }
    if (value === 'rammerhead') {
        notifyWithConfirm('Rammerhead', 'is a server based proxy so it MAY run slower, as well as breaking the URL bar of the browser. Are you sure you want to use Rammerhead?', setValue, defaultFUNC);
    }
    else {
        setValue();
    }
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
function jsBLOB() {
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
        <style type="text/css">
        body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
        </style>
        </head>
        <body>
        <iframe style="border: none; width: 100%; height: 100vh;" src="${window.location.href}"></iframe>
        </body>
        </html>
    `;

    window.location.replace('https://google.com');
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const blobURL = URL.createObjectURL(blob);
    const newWindow = window.open(blobURL, '_blank');
}
function promptCloaking() {
    promptCloakingNotify(aboutBlank, jsBLOB);
}

function fullScreenChange(value) {
    localStorage.setItem('fullScreen', value);
}

function setItems() {
    let titleInput = document.getElementById('titleInput');
    let faviconInput = document.getElementById('faviconInput');
    let themeSelect = document.getElementById('themeSelect');
    let searchInput = document.getElementById('searchInput');
    let proxySelect = document.getElementById('proxySelect');
    let fullscreenSelect = document.getElementById('fullscreenSelect');
    let wispInput = document.getElementById('wispInput');
    let bareInput = document.getElementById('bareInput');
    let transportSelect = document.getElementById('transportSelect');
    //let bareInput = document.getElementById('bareInput');
    let title = localStorage.getItem('title');
    let favicon = localStorage.getItem('favicon');
    let theme = localStorage.getItem('theme');
    let search = localStorage.getItem('searchEngine');
    let proxy = localStorage.getItem('proxy');
    let fullscreen = localStorage.getItem('fullScreen');
    let wispUrl = localStorage.getItem('wispUrl');
    let bare = localStorage.getItem('bare');
    let transports = localStorage.getItem('transports');
    //let bare = localStorage.getItem('bare');
    titleInput.value = title;
    faviconInput.value = favicon;
    themeSelect.value = theme;
    searchInput.value = search;
    proxySelect.value = proxy;
    fullscreenSelect.value = fullscreen;
    wispInput.value = wispUrl;
    bareInput.value = bare;
    transportSelect.value = transports;
    bareOrWisp(transports);
    //if (bare === window.location.origin + '/bare/') { bareInput.value = '/bare/'; } else { bareInput.value = bare; }
    document.documentElement.className = localStorage.getItem('theme');
    document.title = title;
    document.getElementById('favicon').href = favicon;
}
function reset() {
    localStorage.clear();
    bareChange(window.location.origin + '/bare/');
    setTitle('Ruby');
    favicon('/favicon.ico');
    theme('default');
    searchSettings('https://www.google.com/search?q=%s');
    proxyChange('uv');
    fullScreenChange('page');
    setDefaultTransport();
    setItems();
}
function exportSettings() {
    let title = localStorage.getItem('title');
    let favicon = localStorage.getItem('favicon');
    let theme = localStorage.getItem('theme');
    let search = localStorage.getItem('searchEngine');
    let proxy = localStorage.getItem('proxy');
    let fullscreen = localStorage.getItem('fullScreen');
    let bare = localStorage.getItem('bare');
    let password = localStorage.getItem('password');
    let transports = localStorage.getItem('transports');
    let wispUrl = localStorage.getItem('wispUrl');
    let settings = {
        title: title,
        favicon: favicon,
        theme: theme,
        search: search,
        proxy: proxy,
        fullscreen: fullscreen,
        bare: bare,
        password: password,
        transports: transports,
        wispUrl: wispUrl,
    }
    let a = document.createElement('a');
    let file = new Blob([JSON.stringify(settings)], { type: 'text/plain' });
    let url = URL.createObjectURL(file);
    a.href = url;
    a.download = 'ruby_settings.json';
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
}
function importSettings() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function() {
        let file = input.files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function() {
            let settings = JSON.parse(reader.result);
            localStorage.setItem('title', settings.title);
            localStorage.setItem('favicon', settings.favicon);
            localStorage.setItem('theme', settings.theme);
            localStorage.setItem('searchEngine', settings.search);
            localStorage.setItem('proxy', settings.proxy);
            localStorage.setItem('fullScreen', settings.fullscreen);
            localStorage.setItem('bare', settings.bare);
            localStorage.setItem('password', settings.password);
            localStorage.setItem('transports', settings.transports);
            changeWisp(settings.wispUrl);
            setItems();
            console.log('Imported settings');
            window.location.reload();
        }
    }
    input.click();
}
function importExportSettings() {
    settingsImportExportChoice(exportSettings, importSettings);
}

function password() {
    if (!localStorage.getItem('password')) {
        passwordPrompt();
    }
    else {
        passwordIsThere();
    }
}

function passwordKeybinds() {
    document.addEventListener('keydown', function (e) {
        //alt L
        if (e.altKey && e.key === 'l') {
            passwordLock();
        }
    }); 
    console.log("Password Keybind initalized");
}

function changeWisp(value) {
    if (value.startsWith('http://')) {
        value = value.replace('http://', 'ws://');
    }
    else if (value.startsWith('https://')) {
        value = value.replace('https://', 'wss://');
    }
    localStorage.setItem('wispUrl', value);
    setTransports();
}

function transportChange(value) {
    function epox() {
        localStorage.setItem('transports', 'epoxy');
        setTransports('epoxy');
        bareOrWisp('epoxy');
    }
    function defaultFUNC() {
        const lastValue = localStorage.getItem('transports');
        setTransports(lastValue);
        bareOrWisp(lastValue);
        setItems();
    }
    function bareee() {
        localStorage.setItem('transports', 'bare');
        setTransports('bare');
        bareOrWisp('bare');
    }
    if (value === 'epoxy') {
        return notifyWithConfirm('Epoxy', 'is a less stable. Are you sure you want to use Epoxy?', epox, defaultFUNC);
    }
    if (value === 'bare') {
        return notifyWithConfirm('Bare', 'is a less secure option then the others. Are you sure you want to use Bare?', bareee, defaultFUNC);
    }
    else {
        localStorage.setItem('transports', value);
        setTransports(value);
        bareOrWisp(value);
    }
}

function bareOrWisp(transport) {
    const wispBox = document.getElementsByClassName('wisp')[0];
    const bareBox = document.getElementsByClassName('bare')[0];
    if (transport === 'bare') {
        wispBox.classList.add('dnone');
        bareBox.classList.remove('dnone');
    }
    else {
        bareBox.classList.add('dnone');
        wispBox.classList.remove('dnone');
    }
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
        localStorage.setItem('fullScreen', 'page'); 
        localStorage.setItem('transports', 'libcurl');
        localStorage.setItem('wispUrl', (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/");
        setItems();
    }
    else {
        if (localStorage.getItem('unlocked') === "false") {
            passwordLock();
        }
        setItems();
    }
}
init();

function settingsPage(value) {
    if (value === true) {
        document.getElementById('settings-container').classList.remove('dnone');
        setPage('settings');
    }
    if (value === false) {
        document.getElementById('settings-container').classList.add('dnone');
    }
}
function gamesPage(value) {
    if (value === true) {
        document.getElementById('games-container').classList.remove('dnone');
        setPage('games');
        fetchGames();
    }
    if (value === false) {
        document.getElementById('games-container').classList.add('dnone');
    }
}
function refreshPage() {
    let currentTab = getCurrentTab();
    let iframe = document.querySelector(`[data-iframe-id="${currentTab}"]`);
    try {
        iframe.contentWindow.location.reload();
    } catch (err) {};
}
function previousPage() {
    let currentTab = getCurrentTab();
    let iframe = document.querySelector(`[data-iframe-id="${currentTab}"]`);
    try {
        iframe.contentWindow.history.back();
    } catch (err) {};
}
function nextPage() {
    let currentTab = getCurrentTab();
    let iframe = document.querySelector(`[data-iframe-id="${currentTab}"]`);
    try {
        iframe.contentWindow.history.forward();
    } catch (err) {};
}
function popout() {
    let currentTab = getCurrentTab();
    let iframe = document.querySelector(`[data-iframe-id="${currentTab}"]`);
    try {
        let url = iframe.src;
        let win = window.open(url, '_blank');
        win.focus();
    } catch (err) {};
}
function updateURLBar(val) {
    let currentTab = getCurrentTab();
    let iframe = document.querySelector(`[data-iframe-id="${currentTab}"]`);
    let currentProx = localStorage.getItem('proxy');
    //remove the https:// or http:// and the prefix
    val = val.replace(window.location.origin, '');
    if (currentProx === 'uv') {
        val = val.replace(__uv$config.prefix, '');
        val = __uv$config.decodeUrl(val);
    }
    if (currentProx === 'dynamic') {
        val = val.replace(__dynam$ic.prefix, '');
        val = __dynam$ic.decodeUrl(val);
    }
    if (currentProx === 'rammerhead') {
        val = '';
    }
    if (val === "a`owt8bnalk") {
        val = "";
    }
    updateSearch(val);
}
function fullscreen() {
    //this has two options, fullscreen the page, and fullscreen the tab to the window (add later)
    let currentTab = getCurrentTab();
    let iframe = document.querySelector(`[data-iframe-id="${currentTab}"]`);
    try {
        if (localStorage.getItem('fullScreen') === 'full') {
            iframe.requestFullscreen();
        }
        if (localStorage.getItem('fullScreen') === 'page') {
            //set to position absolute
            iframe.style.position = 'absolute';
            //set to top left corner
            iframe.style.top = '0';
            iframe.style.left = '0';
            //set to full width and height
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            //set z-index to 9999
            iframe.style.zIndex = '9998';
            //add a transition
            iframe.style.transition = 'all 0.5s ease-in-out';
            document.getElementById('exit-iframe').classList.remove('dnone');
            //listen for escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    exitIframe();
                }
            });
        }
    } catch (err) {};
}
function searchBar(value) {
    const f = document.getElementById('uv-form');
    const i = document.getElementById('uv-address');
    i.value = value;
    f.dispatchEvent(new Event('submit'));
    resetOmniBox();
}
function updateSearch(value) {
    const s = document.getElementById('search-input');
    //update the placeholder
    s.value = value;
}
function isIframeLoaded() {
    let currentTab = getCurrentTab();
    let iframe = document.querySelector(`[data-iframe-id="${currentTab}"]`);
    addRightClickToIframe(currentTab);
    updateTabDetail("Loading...", "loading.gif");
    iframe.addEventListener('load', function() {
        addRightClickToIframe(currentTab);
        updateTabDetail(iframe.contentWindow.document.title,  iframe.contentWindow.document.querySelector('link[rel="icon"]') ? proxyOtherStuff(iframe.contentWindow.document.querySelector('link[rel="icon"]').href) : "favicon.ico", currentTab);
        updateURLBar(iframe.contentWindow.location.href);
        addToHistory(iframe.contentWindow.location.href, iframe.contentWindow.document.title, iframe.contentWindow.document.querySelector('link[rel="icon"]') ? proxyOtherStuff(iframe.contentWindow.document.querySelector('link[rel="icon"]').href) : "favicon.ico");
    });
}
function exitIframe() {
    iframe.style.position = '';
    iframe.style.top = '';
    iframe.style.left = '';
    iframe.style.width = '';
    iframe.style.height = '';
    iframe.style.zIndex = '';
    iframe.style.transition = '';
    document.getElementById('exit-iframe').classList.add('dnone');
}

function historySidebar() {
    let history = document.getElementById('history');
    history.classList.remove('dnone');
    setPage('history');
}

function closeHistorySidebar() {
    let history = document.getElementById('history');
    history.classList.add('dnone');
}

function addToHistory(url, title, favicon) {
    let history = document.getElementById('history');
    let historyContent = document.getElementById('history-content');
    let historyItem = document.createElement('div');

    historyItem.setAttribute('id', 'history-item');

    let historyLink = document.createElement('a');
    historyLink.setAttribute('id', 'history-link');
    historyLink.setAttribute('onclick', `handoffToTABS('${url}')`);

    let historyTitle = document.createElement('p');
    historyTitle.innerText = title;

    let historyFavicon = document.createElement('img');
    historyFavicon.setAttribute('src', favicon);

    let historyDelete = document.createElement('li');
    historyDelete.setAttribute('id', 'history-delete');
    historyDelete.setAttribute('onclick', `deleteHistoryItem(${historyContent.childElementCount})`);
    historyDelete.classList.add('fa-solid', 'fa-trash');

    historyLink.appendChild(historyFavicon);
    historyLink.appendChild(historyTitle);
    historyItem.appendChild(historyLink);
    historyContent.appendChild(historyItem);
    historyItem.appendChild(historyDelete);
    
    if (localStorage.getItem('history') === null) {
        let historyArray = [];
        historyArray.push({
            url: url,
            title: title,
            favicon: favicon,
        });
        localStorage.setItem('history', JSON.stringify({history: historyArray}));
    }
    else {
        let historyJSON = JSON.parse(localStorage.getItem('history'));
        let historyArray = historyJSON.history;
        historyArray.push({
            url: url,
            title: title,
            favicon: favicon,
            id: historyArray.length,
        });
        localStorage.setItem('history', JSON.stringify({history: historyArray}));
    }
}

function restoreHistory() {
    let history = document.getElementById('history');
    let historyContent = document.getElementById('history-content');
    if (localStorage.getItem('history') === null) {
        return;
    }
    let historyJSON = JSON.parse(localStorage.getItem('history'));
    let historyArray = historyJSON.history;
    historyArray.forEach(function(item) {
        let historyItem = document.createElement('div');

        historyItem.setAttribute('id', 'history-item');

        let historyLink = document.createElement('a');
        historyLink.setAttribute('id', 'history-link');
        historyLink.setAttribute('onclick', `handoffToTABS('${item.url}')`);

        let historyTitle = document.createElement('p');
        historyTitle.innerText = item.title;

        let historyFavicon = document.createElement('img');
        historyFavicon.setAttribute('src', item.favicon);

        let historyDelete = document.createElement('li');
        historyDelete.setAttribute('id', 'history-delete');
        historyDelete.setAttribute('onclick', `deleteHistoryItem(${item.id})`);
        historyDelete.classList.add('fa-solid', 'fa-trash');

        historyLink.appendChild(historyFavicon);
        historyLink.appendChild(historyTitle);
        historyItem.appendChild(historyLink);
        historyItem.appendChild(historyDelete);
        historyContent.appendChild(historyItem);
    });
}

function deleteHistoryItem(id) {
    if (localStorage.getItem('history') === null) {
        return;
    }
    let historyJSON = JSON.parse(localStorage.getItem('history'));
    let historyArray = historyJSON.history;
    historyArray = historyArray.filter((item) => item.id != id);
    localStorage.setItem('history', JSON.stringify({history: historyArray}));
    let historyContent = document.getElementById('history-content');
    historyContent.innerHTML = '';
    restoreHistory();
}
    

function historySidebarKeybinds() {
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 'h') {
            if (document.getElementById('history').classList.contains('dnone')) {
                historySidebar();
            }
            else {
                home(closeHistorySidebar());
            }
        }
    });
    console.log('history keybinds loaded');
    restoreHistory();
    console.log('history restored');
}

let el = document.querySelector('.chrome-tabs');
let chromeTabs = new ChromeTabs();
let tabs = [];
let deletedTabs = [];
chromeTabs.init(el);
document.getElementById('add-tab').addEventListener('click', function (e) {
    chromeTabs.addTab({
        title: 'Search',
        favicon: 'favicon.ico',
    });
});
el.addEventListener('tabAdd', function ({ detail }) {
    tabAdded(detail);
});
el.addEventListener('tabRemove', function ({ detail }) {
    tabRemoved(detail);
});
el.addEventListener('activeTabChange', function ({ detail }) {
    let tabId = detail.tabEl.getAttribute('data-tab-id');
    let iframeID = document.querySelector(`[data-iframe-id="${tabId}"]`);
    let iframes = document.querySelectorAll('[data-iframe-id]');
    iframes.forEach((iframe) => {
        iframe.classList.add('dnone');
        updateURLBar("");
    })
    if (iframeID) {
        showIframe(tabId);
        updateURLBar(iframeID.contentWindow.location.href);
        updateTabDetail(iframeID.contentWindow.document.title, iframeID.contentWindow.document.querySelector('link[rel="icon"]') ? proxyOtherStuff(iframeID.contentWindow.document.querySelector('link[rel="icon"]').href) : 'favicon.ico', tabId);
    }
});
function showIframe(tabId) {
    let iframe = document.querySelector(`[data-iframe-id="${tabId}"]`);
    iframe.classList.remove('dnone');
}
function getCurrentTab() {
    let tabId = chromeTabs.activeTabEl.getAttribute('data-tab-id');
    return tabId;
}
function hideIframe(tabId) {
    let previousTabID;
    if (tabId) {
        previousTabID = tabId;
    }
    else {
        try { 
            previousTabID = chromeTabs.activeTabEl.getAttribute('data-tab-id');
        } catch (err) {
            previousTabID = null;
        }
    }
    if (previousTabID != null) {
        let iframe;
        try {
            iframe = document.querySelector(`[data-iframe-id="${previousTabID}"]`);
        } catch (err) {
            iframe = null;
        }
        if (iframe != null) {
            iframe.classList.add('dnone');
        }
    }
}
function tabAdded(detail) {
    let tabLength = tabs.length + deletedTabs.length;
    console.log(tabLength); 
    //add a id to the tab
    detail.tabEl.setAttribute('data-tab-id', tabLength);
    tabs.push({
        id: tabLength,
        title: 'Search',
        favicon: 'favicon.ico',
    });
    hideIframe();
}
function tabRemoved(detail) {
    let tabId = detail.tabEl.getAttribute('data-tab-id');
    tabs = tabs.filter((tab) => tab.id != tabId);
    let iframe = document.querySelector(`[data-iframe-id="${tabId}"]`);
    if (iframe) {
        iframe.remove();
    }
    deletedTabs.push(tabId);
}
function handoffToTABS(url) {
    //if there is a current iframe, delete it
    let i = chromeTabs.activeTabEl.getAttribute('data-tab-id');
    let isCurentTabHaveIframe = document.querySelector(`[data-iframe-id="${i}"]`);
    if (isCurentTabHaveIframe) {
        isCurentTabHaveIframe.remove();
    }
    let iframe = document.createElement('iframe');
    iframe.setAttribute('src', url);
    iframe.setAttribute('id', 'iframe');
    let tabId = chromeTabs.activeTabEl.getAttribute('data-tab-id');
    iframe.setAttribute('data-iframe-id', tabId);
    document.body.appendChild(iframe);
    addRightClickToIframe(tabId);
    isIframeLoaded();
    function resetOmniBox() {
        document.getElementById("uv-form").style.marginTop = "20px";
        document.getElementById("omnibox").setAttribute("class", "dnone");
        document.getElementById("omnibox-list").innerHTML = ''
    }
    resetOmniBox();
}
function restoreTabs() {
    chromeTabs.removeTab(chromeTabs.activeTabEl);
    let tabLocal = localStorage.getItem('tabs');
    tabLocal = JSON.parse(tabLocal);
    tabLocal.forEach((tab) => {
        chromeTabs.addTab({
            title: tab.title,
            favicon: tab.favicon,
        });
    });
    let iframeLocal = localStorage.getItem('iframes');
    iframeLocal = JSON.parse(iframeLocal);
    iframeLocal.forEach((iframe) => {
        //create an iframe 
        let iframeEl = document.createElement('iframe');
        iframeEl.setAttribute('src', iframe.src);
        iframeEl.setAttribute('data-iframe-id', iframe.id);
        iframeEl.setAttribute('id', 'iframe');
        iframeEl.classList.add('dnone');
        document.body.appendChild(iframeEl);
        chromeTabs.addTab({
            title: 'Search',
            favicon: 'favicon.ico',
        });
        chromeTabs.removeTab(chromeTabs.activeTabEl);
    });
}
function tabKeybinds() {
    console.log("tab keybinds initalized")
    //override ctrl + t
    document.addEventListener('keydown', function (e) {
        if (e.altKey && e.key === 't') {
            chromeTabs.addTab({
                title: 'Search',
                favicon: 'favicon.ico',
            });
        }
        if (e.altKey && e.key === 'w') {
            chromeTabs.removeTab(chromeTabs.activeTabEl);
        }
    });
}
//window.addEventListener('beforeunload', function (e) {
   // e.preventDefault();
 //   e.returnValue = '';
   // if (tabs.length > 0) {
  //      localStorage.setItem('tabs', JSON.stringify(tabs));
 //   }
    //get all iframe 
    //let iframeJSON = [];
  //  let iframes = document.querySelectorAll('[data-iframe-id]');
  //  iframes.forEach((iframe) => {
   //     iframeJSON.push({
         //   id: iframe.getAttribute('data-iframe-id'),
       //  src: iframe.contentWindow.location.href,
     //   });
 //   });
   // if (iframeJSON.length > 0) {
   //     localStorage.setItem('iframes', JSON.stringify(iframeJSON));
  //  }
//});
function updateTabDetail(title, favicon, tabID) {
    let previousTabID = tabID || chromeTabs.activeTabEl.getAttribute('data-tab-id');
    const tabTitle = document.querySelector(`.chrome-tab[data-tab-id="${previousTabID}"] .chrome-tab-title`);
    const tabFavicon = document.querySelector(`.chrome-tab[data-tab-id="${previousTabID}"] .chrome-tab-favicon`);
    if (title == "" || title == null) { title = "Search"; }
    if (favicon == "" || favicon == null) { favicon = "favicon.ico"; }
    if (tabTitle && tabFavicon) {
        tabTitle.innerHTML = title;
        tabFavicon.style.backgroundImage = `url(${favicon})`;
    }
    else {
        console.log('tabTitle is null');
    }
}
function init() {
    chromeTabs.removeTab(chromeTabs.activeTabEl);
    chromeTabs.addTab({
        title: 'Search',
        favicon: 'favicon.ico',
    });
}
init();

let el = document.querySelector('.chrome-tabs');
let chromeTabs = new ChromeTabs();
let tabs = [];
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
    })
    if (iframeID) {
        showIframe(tabId);
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
    let tabLength = tabs.length;
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
}
function handoffToTABS(url) {
    let iframe = document.createElement('iframe');
    iframe.setAttribute('src', url);
    iframe.setAttribute('id', 'iframe');
    let tabId = chromeTabs.activeTabEl.getAttribute('data-tab-id');
    iframe.setAttribute('data-iframe-id', tabId);
    document.body.appendChild(iframe);
    pageLoaded();
}
function changeTabDetail(title, favicon) {
    let tabId = chromeTabs.activeTabEl 
    //get the div chrome-tab-content
    let tabContent = tabId.querySelector('.chrome-tab-content');
    let tabTitle = tabContent.querySelector('.chrome-tab-title');
    let tabFavicon = tabContent.querySelector('.chrome-tab-favicon');
    tabTitle.innerHTML = title;
    //the tab favicon is set with a background image
    tabFavicon.style.backgroundImage = `url(${favicon})`;
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
function keybinds() {
    console.log("keybinds initalized")
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
function init() {
    chromeTabs.removeTab(chromeTabs.activeTabEl);
    chromeTabs.addTab({
        title: 'Search',
        favicon: 'favicon.ico',
    });
    keybinds();
}
init();
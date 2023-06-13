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
function tabAdded(detail) {
    let tabLength = tabs.length;
    //add a id to the tab
    detail.tabEl.setAttribute('data-tab-id', tabLength);
    tabs.push({
        id: tabLength,
        title: 'Search',
        favicon: 'favicon.ico',
    });
}
function tabRemoved(detail) {
    let tabId = detail.tabEl.getAttribute('data-tab-id');
    tabs = tabs.filter((tab) => tab.id != tabId);
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
}
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
    if (tabs.length > 0) {
        localStorage.setItem('tabs', JSON.stringify(tabs));
    }
});
function init() {
    chromeTabs.removeTab(chromeTabs.activeTabEl);
    chromeTabs.addTab({
        title: 'Search',
        favicon: 'favicon.ico',
    });
}
if (localStorage.getItem('tabs')) {
    restoreTabs();
} else {
    init();
}

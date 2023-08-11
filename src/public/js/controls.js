function settingsPage(value) {
    if (value === true) {
        document.getElementById('settings-container').classList.remove('dnone');
        setPage('settings');
    }
    if (value === false) {
        document.getElementById('settings-container').classList.add('dnone');
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
function fullscreen() {
    //this has two options, fullscreen the page, and fullscreen the tab to the window (add later)
    let currentTab = getCurrentTab();
    let iframe = document.querySelector(`[data-iframe-id="${currentTab}"]`);
    try {
        iframe.contentWindow.document.documentElement.requestFullscreen();
    } catch (err) {};
}

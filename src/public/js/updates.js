//This file is here to handle updated of the website.
function getLatestRelease() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/version', false);
    xhr.send();
    let textResp = xhr.responseText;
    return JSON.parse(textResp)
}
const userVersion = localStorage.getItem('version');
let latestRelease = getLatestRelease();
if (userVersion != latestRelease.version || userVersion == null || userVersion == undefined) {
    localStorage.setItem('updated', true);
    localStorage.setItem('version', latestRelease.version);
    uninstallAllSW();
}

//This file is here to handle updated of the website.
function getLatestRelease() {
    fetch('/version/').then((res) => res.json()).then((data) => {
        const userVersion = localStorage.getItem('version');
        if (userVersion != data.version || userVersion == null || userVersion == undefined) {
            localStorage.setItem('updated', true);
            localStorage.setItem('version', data.version);
            uninstallAllSW();
        }
    });
}

getLatestRelease();

window.addEventListener('load', () => {
    let page = localStorage.getItem('currentPage');

    switch (page) {
        case 'settings':
            settingsPage(true);
            break;
        case 'games':
            gamesPage(true);
            break;
        case 'history':
            historySidebar();
            break;
    }
});

function setPage(value) {
    localStorage.setItem('currentPage', value);
}

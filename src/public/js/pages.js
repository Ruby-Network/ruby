window.addEventListener('load', () => {
    let page = localStorage.getItem('currentPage');

    switch (page) {
        case 'settings':
            settingsPage(true);
            break;
    }
});

function setPage(value) {
    localStorage.setItem('currentPage', value);
}

function settingsPage(value) {
    if (value === true) {
        document.getElementById('settings-container').classList.remove('dnone');
        setPage('settings');
    }
    if (value === false) {
        document.getElementById('settings-container').classList.add('dnone');
    }
}

'serviceWorker' in navigator &&
    window.addEventListener('load', function () {
        navigator.serviceWorker
            .register('/sw.js')
            .then((e) => console.log('service worker registered'))
            .catch((e) => console.log('service worker not registered', e));
    });

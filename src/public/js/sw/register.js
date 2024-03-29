'serviceWorker' in navigator &&
    window.addEventListener('load', function () {
        navigator.serviceWorker
            .register('/sw.js')
            .then((e) => {
                console.log('service worker registered');
                BareMux.registerRemoteListener(navigator.serviceWorker.controller);
                setDefaultTransport();
            })
            .catch((e) => console.log('service worker not registered', e));
    });

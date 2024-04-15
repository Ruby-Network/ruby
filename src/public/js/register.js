if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(async (sw) => {
        //await registerRemoteListener(sw.active!)
        console.log('Service Worker Ready');
        await createTransportScripts()
        setDefaultTransport()
    });
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
}
function regSW() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(async (sw) => {
            await createTransportScripts()
            setDefaultTransport()
        })
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
    }
}

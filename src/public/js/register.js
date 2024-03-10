'serviceWorker' in navigator &&
    window.addEventListener('load', async function () {
        await navigator.serviceWorker.register('/sw.js', { scope: '/' }) 
        //uv SW  
        await navigator.serviceWorker.register('/js/sw/uv.js', { scope: '/js/sw/service/uv/' })
        //await navigator.serviceWorker.register('/js/sw/dynamic.js', { scope: '/js/sw/service/dynamic/' })
        BareMux.registerRemoteListener(navigator.serviceWorker.controller);
        setDefaultTransport();
    });
function regSW() {
    'serviceWorker' in navigator && 
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
    //uv SW 
    navigator.serviceWorker.register('/js/sw/uv.js', { scope: '/js/sw/service/uv/' })
    //navigator.serviceWorker.register('/js/sw/dynamic.js', { scope: '/js/sw/service/dynamic/' })
    BareMux.registerRemoteListener(navigator.serviceWorker.controller);
    setDefaultTransport();
}

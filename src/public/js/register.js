'serviceWorker' in navigator &&
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js', { scope: '/' }) 
        //uv SW  
        navigator.serviceWorker.register('/js/sw/uv.js', { scope: '/js/sw/service/uv/' })
        navigator.serviceWorker.register('/js/sw/dynamic.js', { scope: '/js/sw/service/dynamic/' })
    });
function regSW() {
    'serviceWorker' in navigator && 
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
    //uv SW 
    navigator.serviceWorker.register('/js/sw/uv.js', { scope: '/js/sw/service/uv/' })
    navigator.serviceWorker.register('/js/sw/dynamic.js', { scope: '/js/sw/service/dynamic/' })
}

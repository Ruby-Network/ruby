if ( navigator.serviceWorker ) {
    //Register the UV service worker
    navigator.serviceWorker.register('/js/sw/uv.js', { scope: '/~/service/uv/' })
}

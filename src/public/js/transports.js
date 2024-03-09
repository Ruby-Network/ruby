const wispUrl = localStorage.getItem('wispUrl') || (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";

function setTransports(transport) {
        function localStorageTransport() {
            switch (localStorage.getItem('transports')) {
                case 'libcurl':
                    setLibcurlTransport();
                    break;
                case 'epoxy':
                    setEpoxyTransport();
                    break;
                default:
                    setLibcurlTransport();
                    break;
            }
        }
        switch (transport) {
            case 'libcurl':
                setLibcurlTransport();
                break;
            case 'epoxy':
                setEpoxyTransport();
                break;
            default:
                localStorageTransport();
                break;
        }
}


function setLibcurlTransport() {
    BareMux.SetTransport('CurlMod.LibcurlClient', { wisp: localStorage.getItem('wispUrl') || wispUrl, wasm: '/libcurl.wasm' })
}

function destroyLibcurlTransport() {
    //remove all wasm modules

    for (let i = 0; i < WebAssembly.Module.length; i++) {
        WebAssembly.Module[i].dispose();
    }
}

function setDefaultTransport() {
    if (!localStorage.getItem('transports')) {
        localStorage.setItem('transports', 'libcurl');
        setLibcurlTransport();
    }
    else {
        setTransports();
    }
}

function refreshEpoxyTransport() {
    setTransports();
}

function setEpoxyTransport() {
    BareMux.SetTransport('EpxMod.EpoxyClient', { wisp: localStorage.getItem('wispUrl') || wispUrl });
}

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
                case 'bare':
                    setBareTransport(localStorage.getItem('bare'));
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
            case 'bare':
                setBareTransport(localStorage.getItem('bare'));
                break;
            default:
                localStorageTransport();
                break;
        }
}


function setLibcurlTransport() {
    BareMux.SetTransport('CurlMod.LibcurlClient', { wisp: localStorage.getItem('wispUrl') || wispUrl, wasm: 'https://cdn.jsdelivr.net/npm/libcurl.js@v0.5.2/libcurl.wasm' })
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

function setBareTransport(value) {
    BareMux.SetTransport('BareMod.BareClient', value);
}

const wispUrl = localStorage.getItem('wispUrl') || (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";

function createTransportScripts() {
    return new Promise((resolve) => {
        const epoxyScript = document.createElement('script');
        epoxyScript.src = 'epoxy/index.js';
        //epoxyScript.defer = true;
        document.body.appendChild(epoxyScript);
        const libcurlScript = document.createElement('script');
        libcurlScript.src = 'libcurl/index.cjs';
        //libcurlScript.defer = true;
        document.body.appendChild(libcurlScript);
        //wait for the scripts to be loaded
        const checkScripts = setInterval(() => {
            if (typeof EpxMod !== 'undefined' && typeof CurlMod !== 'undefined') {
                clearInterval(checkScripts);
                resolve();
            }
        }, 100);
    });
}

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
    BareMux.SetTransport('CurlMod.LibcurlClient', { wisp: localStorage.getItem('wispUrl') || wispUrl })   
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


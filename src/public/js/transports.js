const wispUrl = localStorage.getItem('wispUrl') || (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
const connection = new BareMux.BareMuxConnection('/baremux/worker.js');
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
                    setEpoxyTransport();
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
                setEpoxyTransport();
                break;
        }
}


function setLibcurlTransport() {
    connection.setTransport("/libcurl/index.mjs", [{ wisp: localStorage.getItem("wispUrl") || wispUrl }]);
}


function setDefaultTransport() {
    if (!localStorage.getItem('transports')) {
        localStorage.setItem('transports', 'epoxy');
        setEpoxyTransport();
    }
    else {
        setTransports();
    }
}

function refreshEpoxyTransport() {
    setTransports();
}

function setEpoxyTransport() {
    connection.setTransport('/epoxy/index.mjs', [{ wisp: localStorage.getItem('wispUrl') || wispUrl }]);
}

function setBareTransport(value) {
    connection.setTransport('/baremodule/index.mjs', [value]);
}


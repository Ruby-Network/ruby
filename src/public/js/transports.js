const transports = localStorage.getItem('transports');
const wispUrl = localStorage.getItem('wispUrl') || (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";

function setTransports() {
        switch (transports) {
            case 'libcurl':
                setLibcurlTransport();
                break;
            case 'epoxy':
                setEpoxyTransport();
                //run recreateTransports every 1 minute to update transport setting
                setInterval(recreateTransports, 60000);
                break;
            default:
                setEpoxyTransport();
                break;
        }
}

function setLibcurlTransport() {
    BareMux.SetTransport('CurlMod.LibcurlClient', { wisp: localStorage.getItem('wispUrl') || wispUrl });
}

function setDefaultTransport() {
    if (!transports) {
        localStorage.setItem('transports', 'epoxy');
        setEpoxyTransport();
    }
    else {
        setTransports();
    }
}

function recreateTransports() {
    setTransports();
}

function setEpoxyTransport() {
    BareMux.SetTransport('EpxMod.EpoxyClient', { wisp: localStorage.getItem('wispUrl') || wispUrl });
}

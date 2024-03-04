const transports = localStorage.getItem('transports');
const wispUrl = localStorage.getItem('wispUrl') || (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";

function setTransports() {
        switch (transports) {
            case 'epoxy':
                setEpoxyTransport();
                break;
            default:
                setEpoxyTransport();
                break;
        }
}

function setDefaultTransport() {
    if (!transports) {
        localStorage.setItem('transports', 'epoxy');
        setEpoxyTransport();
    }
}

function setEpoxyTransport() {
    BareMux.SetTransport('EpxMod.EpoxyClient', { wisp: localStorage.getItem('wispUrl') || wispUrl });
}

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
    else {
        setTransports();
    }
}

function recreateTransports() {
    setTransports();
}

//run recreateTransports every 2 minutes
setInterval(recreateTransports, 120000);

function setEpoxyTransport() {
    BareMux.SetTransport('EpxMod.EpoxyClient', { wisp: localStorage.getItem('wispUrl') || wispUrl });
}

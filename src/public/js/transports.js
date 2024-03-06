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

//run recreateTransports every 1 minute to update transport setting
setInterval(recreateTransports, 60000);

function setEpoxyTransport() {
    BareMux.SetTransport('EpxMod.EpoxyClient', { wisp: localStorage.getItem('wispUrl') || wispUrl });
}

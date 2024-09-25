import { BareMuxConnection } from "@mercuryworkshop/bare-mux";

function loadUVBundle() {
    return new Promise<void>((resolve) => {
        //@ts-ignore
        if (typeof window.Ultraviolet === 'undefined') {
            const uvBundle = document.createElement('script');
            uvBundle.src = '/uv/uv.bundle.js';
            uvBundle.defer = true;
            document.body.appendChild(uvBundle);
            const timeOut = setTimeout(() => {
                //@ts-ignore
                if (typeof window.Ultraviolet !== 'undefined') {
                    clearInterval(timeOut);
                    resolve();
                }
            }, 100);
        }
        else {
            resolve();
        }
    })
}

function loadUVConfig() {
    return new Promise<void>((resolve) => {
        //@ts-ignore
        if (typeof window.__uv$config === 'undefined') {
            const uvConfig = document.createElement('script');
            uvConfig.src = '/uv/uv.config.js';
            uvConfig.defer = true;
            document.body.appendChild(uvConfig);
            const timeOut = setTimeout(() => {
                //@ts-ignore
                if (typeof window.__uv$config !== 'undefined') {
                    clearInterval(timeOut);
                    resolve();
                }
            }, 100)
        }
        else {
            resolve()
        }
    });
}

function loadUV() {
    return new Promise<void>((resolve) => {
        loadUVBundle().then(() => {
            loadUVConfig().then(() => {
                resolve();
            })
        })
    });
}

const conn = new BareMuxConnection("/baremux/worker.js");
function setTransport(conn: BareMuxConnection, transport: string, wisp: string) {
    return new Promise<void>((resolve) => {
        conn.setTransport("/epoxy/index.mjs", [{ wisp }]);
        resolve();
    })
}


async function register() {
    if (!navigator.serviceWorker) {
        throw new Error("Woah!!! Your browser doesn't support service workers!");
    }
    await navigator.serviceWorker.register("/sw.js");
}

export { loadUV, register, setTransport, conn };

function createDevTools(currentIframeID) {
    if (currentIframeID) {
        const iframe = document.querySelector(`[data-iframe-id="${currentIframeID}"]`);
        const devTools = document.createElement('script');
        devTools.src = 'https://cdn.jsdelivr.net/npm/eruda';
        devTools.onload = () => {
            iframe.contentWindow.eruda.init();
            iframe.contentWindow.eruda.show();
        };
        iframe.contentDocument.body.appendChild(devTools); 
    }
    else {
        const devTools = document.createElement('script');
        devTools.src = 'https://cdn.jsdelivr.net/npm/eruda';
        devTools.onload = () => {
            eruda.init();
            eruda.show();
        };
        document.body.appendChild(devTools);
    }
}

function destroyDevTools(currentIframeID) {
    if (currentIframeID) {
        const iframe = document.querySelector(`[data-iframe-id="${currentIframeID}"]`);
        const devScript = iframe.contentDocument.querySelector('script[src="https://cdn.jsdelivr.net/npm/eruda"]');
        iframe.contentWindow.eruda.destroy();
        devScript.remove();
    }
    else {
        const devScript = document.querySelector('script[src="https://cdn.jsdelivr.net/npm/eruda"]');
        eruda.destroy();
        devScript.remove();
    }
}

function devToolsKeybinds() {
    console.log("DevTools keybinds enabled");
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            const currentTab = getCurrentTab();
            const iframe = document.querySelector(`[data-iframe-id="${currentTab}"]`);
            if (iframe) {
                if (iframe.contentDocument.querySelector('script[src="https://cdn.jsdelivr.net/npm/eruda"]')) {
                    destroyDevTools(currentTab);
                }
                else {
                    createDevTools(currentTab);
                }
            }
            else {
                if (document.querySelector('script[src="https://cdn.jsdelivr.net/npm/eruda"]')) {
                    destroyDevTools();
                }
                else {
                    createDevTools();
                }
            }
        }
    })
}

function devTools() {
    const currentTab = getCurrentTab();
    const iframe = document.querySelector(`[data-iframe-id="${currentTab}"]`);
    if (iframe) {
        if (iframe.contentDocument.querySelector('script[src="https://cdn.jsdelivr.net/npm/eruda"]')) {
            destroyDevTools(currentTab);
        }
        else {
            createDevTools(currentTab);
        }
    }
    else {
        if (document.querySelector('script[src="https://cdn.jsdelivr.net/npm/eruda"]')) {
            destroyDevTools();
        }
        else {
            createDevTools();
        }
    }
}

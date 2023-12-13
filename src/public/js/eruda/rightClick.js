function rightClick() {
    event.preventDefault();
    let menu = document.getElementById("rightClickMenu");
    menu.style.display = "block";
    menu.style.position = "absolute";
    menu.style.visibility = "visible";
    let x = event.clientX;
    let y = event.clientY;
    let w = window.innerWidth;
    let h = window.innerHeight;
    let menuW = menu.offsetWidth;
    let menuH = menu.offsetHeight;
    if (y < 86) {
        menu.style.display = "none";
        menu.style.position = "absolute";
        menu.style.visibility = "hidden";
        menu.style.left = "0px";
        menu.style.top = "0px";
        return;
    }
    if (x + menuW > w) {
        x = w - menuW;
    }
    if (y + menuH > h) {
        y = h - menuH;
    }
    menu.style.left = x + "px";
    menu.style.top = y + "px"
    return false
}

function hideRightClick() {
    let menu = document.getElementById("rightClickMenu");
    menu.style.display = "none";
    menu.style.position = "absolute";
    menu.style.visibility = "hidden";
    menu.style.left = "0px";
    menu.style.top = "0px";
}

function rightClickIframe(iframe) {
    event.preventDefault();
    let menu = document.getElementById("rightClickMenu");
    menu.style.display = "block";
    menu.style.position = "absolute";
    menu.style.visibility = "visible";
    let x = event.clientX;
    let y = event.clientY;
    let w = iframe.offsetWidth;
    let h = iframe.offsetHeight;
    let menuW = menu.offsetWidth;
    let menuH = menu.offsetHeight;
    if (y < 86) {
        menu.style.display = "none";
        menu.style.position = "absolute";
        menu.style.visibility = "hidden";
        menu.style.left = "0px";
        menu.style.top = "0px";
        return;
    }
    if (x + menuW > w) {
        x = w - menuW;
    }
    if (y + menuH > h) {
        y = h - menuH;
    }
    menu.style.left = x + "px";
    menu.style.top = y + "px"
    return false
}


function controls(iframeId) {
    let back = document.getElementById("rcmb-back");
    let forward = document.getElementById("rcmb-forward");
    let reload = document.getElementById("rcmb-reload");
    let inspect = document.getElementById("rcmb-inspect");

    back.onclick = function () {
        previousPage();
    }
    forward.onclick = function () {
        nextPage();
    }
    reload.onclick = function () {
        refreshPage();
    }
    inspect.onclick = function () {
        if (iframeId) {
            createDevTools(iframeId);
        }
        else {
            createDevTools();
        }
    }
}

function addRightClickToIframe(currentIframeId) {
    let iframe = document.querySelector(`[data-iframe-id="${currentIframeId}"]`);
    iframe.contentDocument.oncontextmenu = function () {
        rightClickIframe(iframe);
    }
    iframe.contentDocument.onclick = hideRightClick;
    controls(currentIframeId);
}

function initRightClick() {
    document.oncontextmenu = rightClick;
    document.onclick = hideRightClick;
    controls();
    console.log("Right Click Handler Initialized");
}

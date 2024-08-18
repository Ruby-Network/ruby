"use strict";
/**
    * @type {HTMLFormElement}
    */
    const form = document.getElementById("uv-form");
/**
    * @type {HTMLInputElement}
    */
    const address = document.getElementById("uv-address");
/**
    * @type {HTMLParagraphElement}
    */
    const error = document.getElementById("uv-error");
/**
    * @type {HTMLPreElement}
    */
    const errorCode = document.getElementById("uv-error-code");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const url = search(address.value, localStorage.getItem("searchEngine"));
    updateSearch(url);
    address.value = "";
    switch (localStorage.getItem("proxy")) {
        case "uv":
            handoffToTABS(__uv$config.prefix + __uv$config.encodeUrl(url));
            break;
        case "rammerhead":
            const origin = window.location.origin;
            async function proxy() {
                const endURL = await RammerheadEncode(url);
                handoffToTABS(endURL);
            };
            proxy();
            break;
        default:
            handoffToTABS(__uv$config.prefix + __uv$config.encodeUrl(url));
        }
});
function proxyOtherStuff(url) {
    switch (localStorage.getItem("proxy")) {
        case "uv":
            return __uv$config.prefix + __uv$config.encodeUrl(url);
        case "rammerhead":
            const origin = window.location.origin;
            async function proxy() {
                const endURL = await RammerheadEncode(url)
                return endURL;
            };
            proxy();
            break;
        default:
            return __uv$config.prefix + __uv$config.encodeUrl(url);
        }
}

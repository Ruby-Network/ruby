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
    address.value = "";
    switch (localStorage.getItem("proxy")) {
        case "uv":
            handoffToTABS(__uv$config.prefix + __uv$config.encodeUrl(url));
            break;
        case "dynamic":
            handoffToTABS(__dynamic$config.prefix + "route/?url=" + encodeURIComponent(url));
            break;
        default:
            handoffToTABS(__uv$config.prefix + __uv$config.encodeUrl(url));
        }
});
function proxyOtherStuff(url) {
    switch (localStorage.getItem("proxy")) {
        case "uv":
            return __uv$config.prefix + __uv$config.encodeUrl(url);
        case "dynamic":
            return __dynam$ic.prefix + "route/?url=" + __dynam$ic.encodeUrl(url);
        default:
            return __uv$config.prefix + __uv$config.encodeUrl(url);
        }
}

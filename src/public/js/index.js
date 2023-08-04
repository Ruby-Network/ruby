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
    handoffToTABS(__uv$config.prefix + __uv$config.encodeUrl(url));
});

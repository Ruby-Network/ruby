const genUtils = {
    getIframe: (id: number): HTMLIFrameElement => {
        const iframe = document.querySelector(`[data-iframe-id='${id}']`) as HTMLIFrameElement;
        return iframe; 
    } 
}

export { genUtils }

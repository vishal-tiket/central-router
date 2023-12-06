import { getSource } from './getSource.js';

export const IFRAME_ID = 'tiket-com-localstorage-iframe';

export const isIframeReady = () => {
  return !!window?.tiketStorageIframeReady;
};

export const listenToIframeReady = () => {
  return new Promise((resolve) => {
    const checkIfIframeStorageMessage = (e) => {
      if (e.data === 'tiketStorageIframeReady') {
        window.tiketStorageIframeReady = true;

        window.removeEventListener(
          'message',
          checkIfIframeStorageMessage,
          false,
        );
        resolve();
      }
    };

    window.addEventListener('message', checkIfIframeStorageMessage);
  });
};

export const getIframe = () => {
  return new Promise((resolve) => {
    let iframe = document.getElementById(IFRAME_ID);
    const isReady = isIframeReady();

    if (isReady) {
      resolve(iframe);
    } else if (iframe && !isReady) {
      listenToIframeReady().then(() => resolve(iframe));
    } else if (!iframe) {
      listenToIframeReady().then(() => {
        resolve(document.getElementById(IFRAME_ID));
      });

      iframe = document.createElement('iframe');
      iframe.setAttribute('src', getSource());
      iframe.setAttribute('id', IFRAME_ID);
      iframe.setAttribute('style', 'display: none');
      document.body.appendChild(iframe);
    }
  });
};

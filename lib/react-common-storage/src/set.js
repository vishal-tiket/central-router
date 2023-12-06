import { addToQueue } from "./queue";
import { getIframe } from "./getIframe";
import { getSource } from "./getSource";
import { isIFrame, isSafari } from "./utils";
import { RESPONSE_TIMEOUT } from "./constants";
import { setCookie } from "./setCookie";

export const set = (key, value) => {
  const p = new Promise((resolve) => {
    (async () => {
      /**
       * Safari workaround to address Intelligent Tracking Prevention (ITP) in the Safari browser.
       * Reference: https://stackoverflow.com/questions/63922558/safari-localstorage-not-shared-between-iframes-hosted-on-same-domain
       *
       * Initially attempted various solutions, but ended up using a cookie-based approach due to persistent issues:
       * - Creating an iframe in the top-level domain.
       * - Utilizing the deprecated document.domain method.
       * - Storage Access API is not applicable to our use case.
       */
      if (isSafari()) {
        setCookie(key, JSON.stringify(value));
        return resolve();
      }

      try {
        const iframe = await getIframe();
        const target = new URL(getSource());

        if (isIFrame(iframe)) {
          const id = `${key}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
          let timeout;

          const pResponse = new Promise((pResponseResolve) => {
            const receiver = (e) => {
              const iframeUrl = new URL(iframe.getAttribute("src") || "");
              const isTrusted = e.origin === iframeUrl.origin;
              const { id: responseId } = e.data.data || {};

              if (
                isTrusted &&
                e.data.name === "SET_LOCALSTORAGE_RESPONSE_OK" &&
                responseId === id
              ) {
                window.removeEventListener("message", receiver, false);

                clearTimeout(timeout);
                pResponseResolve();
              }
            };

            window.addEventListener("message", receiver);

            iframe.contentWindow?.postMessage(
              {
                name: "SET_LOCALSTORAGE",
                data: {
                  id,
                  key,
                  value: JSON.stringify(value),
                },
              },
              target.origin
            );
          });

          const pTimeout = new Promise((pTimeoutResolve) => {
            timeout = setTimeout(() => {
              console.log(
                `@tiket/react-common-storage fail to set ${key}. timeout reached!.`
              );
              pTimeoutResolve();
            }, RESPONSE_TIMEOUT);
          });

          await Promise.race([pResponse, pTimeout]);
          resolve();
        } else {
          console.log(
            "@tiket/react-common-storage fail to get the iframe on set!."
          );
          resolve();
        }
      } catch (e) {
        console.log(e);
        resolve();
      }
    })();
  });

  addToQueue(key, p);

  return p;
};

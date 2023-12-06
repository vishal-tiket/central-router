import { getCookie } from "./getCookie";
import { getIframe } from "./getIframe";
import { getSource } from "./getSource";
import { isIFrame, isSafari } from "./utils";
import { RESPONSE_TIMEOUT } from "./constants";
import { waitForSetters } from "./queue";

export const get = async (key) => {
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
    try {
      const cookieValue = getCookie(key);
      return JSON.parse(cookieValue);
    } catch (e) {
      console.log(
        `@tiket/react-common-storage failed to parse value on get ${key}!.`
      );
    }
  }

  const iframe = await getIframe();
  const target = new URL(getSource());

  if (isIFrame(iframe)) {
    await waitForSetters(key);

    let timeout;

    const pResponse =
      new Promise() <
      SharedStorageValue >
      ((pResponseResolve) => {
        const receiver = (e) => {
          const iframeUrl = new URL(iframe.getAttribute("src") || "");
          const isTrusted = e.origin === iframeUrl.origin;
          const { key: responseKey, value: responseValue } = e.data.data || {};

          if (
            isTrusted &&
            e.data.name === "GET_LOCALSTORAGE_RESPONSE" &&
            responseKey === key
          ) {
            window.removeEventListener("message", receiver, false);
            let data = null;
            try {
              data = JSON.parse(responseValue || "");
            } catch (e) {
              console.log(
                `@tiket/react-common-storage failed to parse value on get ${key}!.`,
                responseValue
              );
            }

            clearTimeout(timeout);
            pResponseResolve(data);
          }
        };

        window.addEventListener("message", receiver);

        iframe.contentWindow?.postMessage(
          {
            name: "GET_LOCALSTORAGE",
            data: {
              key,
            },
          },
          target.origin
        );
      });

    const pTimeout =
      new Promise() <
      SharedStorageValue >
      ((pTimeoutResolve) => {
        timeout = setTimeout(() => {
          console.log(
            `@tiket/react-common-storage fail to get ${key}. timeout reached!.`
          );
          pTimeoutResolve(null);
        }, RESPONSE_TIMEOUT);
      });

    return await Promise.race([pResponse, pTimeout]);
  } else {
    console.log("@tiket/react-common-storage fail to get the iframe on get!.");
    return null;
  }
};

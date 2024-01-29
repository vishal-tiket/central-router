"use client";
import { useEffect, useState } from "react";
import styles from "./CentralRouter.module.css";
import { useSearchParams, useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { set } from "../../lib/react-common-storage";
import { callGenericJSICommand } from "../../lib/react-common-jsi/jsi/invokeJSI";

export const CentralRouter = ({ referrerHeader, callJSI, handleBack }) => {
  const [url, setUrl] = useState("");
  const [clearTopFlag, setIsClearTopFlag] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [contactWebResponse, setContactWebResponse] = useState("");
  const [payloadFromApps, setPayloadFromApps] = useState("");
  const [authenticationJSI, setAuthenticationJSI] = useState("");
  const [trackerJSI, setTrackerJSI] = useState("");
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();

  const queryParams = () => {
    let obj = {};
    for (const [key, value] of searchParams.entries()) {
      obj[key] = value;
    }
    return obj;
  };

  const [countrycode, language] =
    (params && params?.["countrycode-language"]?.split("-")) || [];

  useEffect(() => {
    setIsClient(true);
    setCurrentUrl(window.location.href);

    window.carPayloadWithWindow = (payload) => {
      console.log("inside window carPayloadWithWindow");
      const customEvent = new CustomEvent("customEvent1", {
        detail: { payload },
      });
      document.dispatchEvent(customEvent);
      return true;
    };

    window.handleBackPressed = () => {
      return queryParams()?.["back"] === "true" ? true : false;
    };

    const callSharedStorage =
      window.location.href.includes("/ttd/pdp/11") ||
      window.location.href.includes("/ttd/pdp/12") ||
      window.location.href.includes("/ttd/pdp/13") ||
      window.location.href.includes("/ttd/pdp/14") ||
      window.location.href.includes("/ttd/pdp/15");

    if (callSharedStorage) {
      set("sample-tiket-com-analytic", "dummy value");
    }

    if (
      countrycode &&
      language &&
      !(countrycode === "%23%23" && language === "%23%23")
    ) {
      setUrl(
        "https://" + window.location.host + "/" + countrycode + "-" + language
      );
    } else {
      setUrl("https://" + window.location.host);
    }

    /**
     * CAR Cross App Routing event listener For Contact Picker;
     */
    const CARCallback = (event) => {
      console.log("Webview CARCallback event.data", { response: event?.data });
      setContactWebResponse(JSON.stringify(event?.data));
    };

    const customEventHandler = (event, log) => {
      console.log(log);
      console.log("inside event handler", event.detail);
      setPayloadFromApps(JSON.stringify(event.detail));
    };

    document.addEventListener("onCrossAppRoutingResponse", CARCallback);
    document.addEventListener("customEvent1", (event) =>
      customEventHandler(event, "window function")
    );
    document.addEventListener("customEvent2", (event) =>
      customEventHandler(event, "script function")
    );
    document.addEventListener("customEvent3", (event) =>
      customEventHandler(event, "script function")
    );

    return () => {
      document.removeEventListener("customEvent1", (event) =>
        customEventHandler(event, "window function")
      );
      document.removeEventListener("customEvent2", (event) =>
        customEventHandler(event, "script function")
      );
      document.removeEventListener("customEvent3", (event) =>
        customEventHandler(event, "script function")
      );
      document.removeEventListener("onCrossAppRoutingResponse", CARCallback);
    };
  }, []);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleUrlInput = (e) => {
    if (isValidUrl(e.target.value)) {
      const validateUrl = new URL(e.target.value);
      const clearTop = validateUrl.searchParams.get("clearTop");
      if (clearTop === "true") {
        setIsClearTopFlag(true);
      } else if (clearTop === "false") {
        setIsClearTopFlag(false);
      } else {
        setIsClearTopFlag(false);
      }
    }
    setUrl(e.target.value);
  };

  const handleClearTopFlag = (e) => {
    if (!isValidUrl(url) && isClient) {
      window.alert("Please enter a valid url");
      return;
    }

    setIsClearTopFlag((prevVal) => {
      let newUrl = new URL(url);
      if (!prevVal) {
        newUrl.searchParams.set("clearTop", !prevVal);
      } else {
        newUrl.searchParams.delete("clearTop");
      }
      setUrl(newUrl);
      return !prevVal;
    });
  };

  const handleJSNavigation = (isReplace = false) => {
    if (!isValidUrl(url) && isClient) {
      window.alert("Please enter a valid url");
      return;
    }
    if (isReplace) {
      window.location.replace(url);
      return;
    }
    window.location.href = url;
  };

  /**
   * CAR Cross App Routing event listener For Contact Picker;
   * Detect in case of webview if it is android or ios.
   */
  const getMobileOS = () => {
    var userAgent = navigator.userAgent || window.opera;

    if (/android/i.test(userAgent)) {
      return "android";
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
    }

    return false;
  };

  const getContacts = async () => {
    if (typeof window !== "undefined") {
      /**
       * Webview CAR handling
       */
      if (getMobileOS()) {
        let carRequest = {};
        let carProperties;
        if (getMobileOS() === "ios") {
          carRequest.displayedInfo = "[phone]";
          carProperties = "phoneNumbers,givenName";
        }
        if (getMobileOS() === "android") {
          carRequest.type = "phone";
          carProperties = "data1,display_name";
        }
        window.location.href = `${
          window.location.origin
        }/cross-app-request/contact-picker?car-request=${JSON.stringify(
          carRequest
        )}&car-properties=${carProperties}`;
      }

      // Check if the Contact Picker API is supported in the browser
      const opts = { multiple: true };
      if ("contacts" in navigator) {
        try {
          const contacts = await navigator.contacts.select(props, opts);
          setContactWebResponse(JSON.stringify(contacts));
        } catch (ex) {
          // Handle any errors here.
          setContactWebResponse(JSON.stringify(ex));
        }
      } else {
        // Fallback for browsers that do not support the Contact Picker API
        setContactWebResponse(
          "Contact Picker API is not supported in this browser"
        );
      }
    }
  };

  const callAuthenticationJSI = async () => {
    console.log("callAuthenticationJSI jsi");
    const response = await callGenericJSICommand({
      request: "getAuthenticatedUserDetails",
    });
    setAuthenticationJSI(JSON.stringify(response));
  };

  const callTrackerJSI = async () => {
    console.log("call tracker jsi");
    const response = await callGenericJSICommand({
      request: "trackAnalyticEvent",
      payload: {
        event: "click",
        eventCategory: "ctaClick",
        text: "promo",
      },
    });
    setTrackerJSI(JSON.stringify(response));
  };

  return (
    <div>
      {handleBack && <button onClick={() => router.back()}>Back</button>}
      <h2>Enter the url to route to below</h2>
      <input
        type="text"
        onChange={handleUrlInput}
        value={url}
        className={styles.url_input}
      ></input>

      <div className={styles.checkbox}>
        <label htmlFor="clearTop">
          append <span>clearTop</span> flag to above url?
        </label>
        <input
          checked={clearTopFlag}
          id="clearTop"
          type="checkbox"
          onChange={handleClearTopFlag}
        />
      </div>

      <div>
        {url && isValidUrl(url) ? (
          <Link href={url} className={styles.link}>
            Route to (using nextjs app router)
          </Link>
        ) : (
          <a onClick={handleJSNavigation} className={styles.link}>
            Route to (using nextjs app router)
          </a>
        )}

        {url && isValidUrl(url) ? (
          <button
            href={url}
            className={styles.link}
            onClick={() => {
              let urlRef;
              if (typeof url === "string") {
                urlRef = url;
              } else {
                urlRef = url?.href;
              }
              router.push(urlRef);
            }}
          >
            Route to (using next js app router.push)
          </button>
        ) : (
          <a onClick={handleJSNavigation} className={styles.link}>
            Route to (using nextjs app router.push)
          </a>
        )}

        {url && isValidUrl(url) ? (
          <a href={url} className={styles.link}>
            Route to (using html anchor)
          </a>
        ) : (
          <a onClick={handleJSNavigation} className={styles.link}>
            Route to (using html anchor)
          </a>
        )}

        <button className={styles.link} onClick={handleJSNavigation}>
          Route to (using window.location.href)
        </button>

        <button
          className={styles.link}
          onClick={() => handleJSNavigation(true)}
        >
          Route to (using window.location.replace)
        </button>
        <button className={styles.link} onClick={getContacts}>
          Get Contacts
        </button>
      </div>
      {callJSI && (
        <>
          <button onClick={callAuthenticationJSI}>
            Call getAuthenticatedUserDetails
          </button>
          <br />
          <button onClick={callTrackerJSI}>Call trackAnalyticEvent</button>
        </>
      )}
      {callJSI && (
        <>
          <h2>trackAnalyticEvent Response</h2>
          <span>{trackerJSI}</span>
          <h2>getAuthenticatedUserDetails Response</h2>
          <span>{authenticationJSI}</span>
        </>
      )}
      <h2>CAR Response</h2>
      <span>{contactWebResponse || payloadFromApps}</span>
      <h2>Current Url</h2>
      <span>{currentUrl}</span>
      <h2>Referrer</h2>
      <span>{referrerHeader || "null"}</span>
      <h2>Query Params</h2>
      <span>{JSON.stringify({ ...queryParams() })}</span>
      <h2>Path Params</h2>
      <span>
        {JSON.stringify({
          ...params,
          "countrycode-language": undefined,
          ...(countrycode === "%23%23"
            ? { countrycode: undefined }
            : { countrycode }),
          ...(language === "%23%23" ? { language: undefined } : { language }),
        })}
      </span>
    </div>
  );
};

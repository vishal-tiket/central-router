"use client";
import { useEffect, useState } from "react";
import styles from "./CentralRouter.module.css";
import { useSearchParams, useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { set } from "../../lib/react-common-storage";
import { ContactPicker } from "@tiket/react-common-navigator-permission";
import {
  callAuthenticationJSI,
  callTrackerJSI,
  handleJSNavigation,
  isValidUrl,
  queryParams,
} from "./helper";
import {
  useGetAuthenticatedUserDetails,
  trackAnalyticEvent,
  PageRenderPerformanceMarker,
} from "@tiket/react-common-jsi";

export const CentralRouter = ({
  referrerHeader,
  callJSI,
  handleBack,
  carRequest,
}) => {
  const getAuthenticatedUserDetails = useGetAuthenticatedUserDetails();
  const [url, setUrl] = useState("");
  const [clearTopFlag, setIsClearTopFlag] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [contactWebResponse, setContactWebResponse] = useState("");
  const [authenticationJSI, setAuthenticationJSI] = useState("");
  const [trackerJSI, setTrackerJSI] = useState("");
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const [code, setCode] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setCode(200);
    }, 2000);
  }, []);

  /** get country code and language code from url parameters */
  const [language, countrycode] =
    (params && params?.["language-countrycode"]?.split("-")) || [];

  useEffect(() => {
    /** car properties mapping */
    window.CARProperties = {
      android: {
        "contact-picker": {
          phoneNumbers: "phoneNumbers",
          emailAddresses: "emailAddresses",
          name: "givenName",
          organizationName: "organizationName",
          departmentName: "departmentName",
          postalAddress: "postalAddresses",
          birthday: "birthday",
          contactRelations: "contactRelations",
        },
      },

      ios: {
        "contact-picker": {
          phoneNumbers: "phoneNumbers",
          emailAddresses: "emailAddresses",
          name: "givenName",
          organizationName: "organizationName",
          departmentName: "departmentName",
          postalAddress: "postalAddresses",
          birthday: "birthday",
          contactRelations: "contactRelations",
          namePrefix: "namePrefix",
          middleName: "middleName",
          familyName: "familyName",
        },
      },

      web: {
        "contact-picker": {
          phoneNumbers: "tel",
          name: "name",
          emailAddresses: "email",
          postalAddress: "address",
        },
      },
    };

    /** to handle csr actions */
    setIsClient(true);
    setCurrentUrl(decodeURIComponent(window.location.href));

    /** back navigation handling ( show confirmation popup on back press )  */
    window.handleBackPressed = () => {
      return queryParams(searchParams)?.["back"] === "true" ? true : false;
    };

    /** replicate iOS callback issue for storage.tiket.com on these urls */
    const callSharedStorage =
      window.location.href.includes("/ttd/pdp/11") ||
      window.location.href.includes("/ttd/pdp/12") ||
      window.location.href.includes("/ttd/pdp/13") ||
      window.location.href.includes("/ttd/pdp/14") ||
      window.location.href.includes("/ttd/pdp/15");

    if (callSharedStorage) {
      set("sample-tiket-com-analytic", "dummy value");
    }

    /** support url field placeholder for both old and new tiket url schemes */
    if (
      countrycode &&
      language &&
      !(countrycode === "%23%23" && language === "%23%23")
    ) {
      setUrl(
        "https://" + window.location.host + "/" + language + "-" + countrycode
      );
    } else {
      setUrl("https://" + window.location.host);
    }

    /** handle window.gtm.push method for analytics */
    window.dataLayer = [];
    const originalDataLayerPush = window?.dataLayer?.push?.bind(
      window?.dataLayer
    );
    window.dataLayer.push = (event) => {
      originalDataLayerPush(event);
      if (event === "tracker") {
        callTrackerJSI(setTrackerJSI, trackAnalyticEvent);
      } else {
        callAuthenticationJSI(
          setAuthenticationJSI,
          getAuthenticatedUserDetails
        );
      }
      return window?.dataLayer?.length;
    };
  }, []);

  /** url field onChange handler */
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
    setUrl(e.target.value || "");
  };

  /** clearTop checkbox onChange handler */
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

  const getContacts = async () => {
    if (typeof window !== "undefined") {
      try {
        const carProperties =
          queryParams(searchParams)?.["car-properties"]?.split(",");
        console.log("car properties from url", carProperties);
        const response = await ContactPicker.get(carProperties);
        setContactWebResponse(JSON.stringify(response));
      } catch (e) {
        console.log("possibly car properties are not defined");
        console.log("error", JSON.stringify(e));
        setContactWebResponse(JSON.stringify(e));
      }
    }
  };
  if (!code) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <PageRenderPerformanceMarker respCode={code} message="Success" />
      {handleBack && <button onClick={() => router.back()}>Back</button>}
      {handleBack && (
        <button onClick={() => history.back()}>Back using history.back</button>
      )}
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
        {/* <>
          {url && isValidUrl(url) ? (
            <Link href={url} className={styles.link}>
              Route to (using nextjs app router)
            </Link>
          ) : (
            <a onClick={handleJSNavigation} className={styles.link}>
              Route to (using nextjs app router)
            </a>
          )}
          </>
        */}

        {/* {url && isValidUrl(url) ? (
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
        )} */}

        {url && isValidUrl(url) ? (
          <a href={url} className={styles.link}>
            Route to
          </a>
        ) : (
          <a onClick={() => handleJSNavigation(url)} className={styles.link}>
            Route to
          </a>
        )}

        {/* <button className={styles.link} onClick={handleJSNavigation}>
          Route to (using window.location.href)
        </button>

        <button
          className={styles.link}
          onClick={() => handleJSNavigation(true)}
        >
          Route to (using window.location.replace)
        </button> */}
        {carRequest && (
          <button className={styles.link} onClick={getContacts}>
            Get Contacts
          </button>
        )}
      </div>
      {callJSI && (
        <>
          <button onClick={() => window.dataLayer.push("auth")}>
            Call getAuthenticatedUserDetails
          </button>
          <br />
          <button onClick={() => window.dataLayer.push("tracker")}>
            Call trackAnalyticEvent
          </button>
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
      {carRequest && (
        <>
          <h2>CAR Response</h2>
          <span>{contactWebResponse}</span>
        </>
      )}
      <h2>Current Url</h2>
      <span>{currentUrl}</span>
      <h2>Referrer</h2>
      <span>{referrerHeader || "null"}</span>
      <h2>Query Params</h2>
      <span>{JSON.stringify({ ...queryParams(searchParams) })}</span>
      <h2>Path Params</h2>
      <span>
        {JSON.stringify({
          ...Object.keys(params).reduce((acc, key) => {
            acc[key] = decodeURIComponent(params[key]);
            return acc;
          }, {}),
          "language-countrycode": undefined,
          ...(countrycode === "%23%23"
            ? { countrycode: undefined }
            : { countrycode: decodeURIComponent(countrycode) }),
          ...(language === "%23%23"
            ? { language: undefined }
            : { language: decodeURIComponent(language) }),
        })}
      </span>
    </div>
  );
};

"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import styles from "./CentralRouter.module.css";
import { Context } from "../Context";
import { useSearchParams, useParams } from "next/navigation";
import { CustomLink } from "../CustomLink";
import { useRouter } from "next/navigation";

export const CentralRouter = () => {
  const [url, setUrl] = useState("");
  const [clearTopFlag, setIsClearTopFlag] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const { referrer, setReferrer, currentUrl, setCurrentUrl } =
    useContext(Context);

  const queryParams = () => {
    let obj = {};
    for (const [key, value] of searchParams.entries()) {
      obj[key] = value;
    }
    return obj;
  };

  useEffect(() => {
    setIsClient(true);
    setUrl("https://" + window.location.host);
  }, []);

  const finalReferrer = referrer || "null";

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

  return (
    <div>
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
          <CustomLink
            href={url}
            className={styles.link}
            callback={() => {
              let urlRef;
              if (typeof url === "string") {
                urlRef = url;
              } else {
                urlRef = url?.href;
              }
              setCurrentUrl(urlRef);
            }}
          >
            Route to (using nextjs app router)
          </CustomLink>
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
              setReferrer(currentUrl);
              setCurrentUrl(urlRef);
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
      </div>
      <h2>Current Url</h2>
      <span>{currentUrl}</span>
      <h2>Referrer</h2>
      <span>{finalReferrer}</span>
      <h2>Query Params</h2>
      <span>{JSON.stringify({ ...queryParams() })}</span>
      <h2>Path Params</h2>
      <span>{JSON.stringify({ ...params })}</span>
    </div>
  );
};

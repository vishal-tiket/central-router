"use client";
import React, { useEffect, useState } from "react";

import styles from "./page.module.css";

const CookiePoc = () => {
  const cookieName = "client-cookie-token";
  const [cookieValue, setCookieValue] = useState("");

  const setClientSideCookie = (cookieName, cookieValue) => {
    document.cookie =
      cookieName + "=" + cookieValue + "; domain=.vipul-pandit.in; ";
    setCookieValue(document.cookie);
  };

  const removeClientSideCookie = (cookieName) => {
    document.cookie =
      cookieName +
      "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.vipul-pandit.in; ";
    setCookieValue("No cookies are there");
  };

  useEffect(() => {
    if (document.cookie) setCookieValue(document.cookie);
    else setCookieValue("No cookies are there");
  }, []);

  /** Requirement: To remove the cookie when tab is closed 
   *  
   * This solution is not correct since 
   * it removes the cookie not only when 
   * tab is closed but it also removes cookie 
   * when tab is reloaded or routed to any of the
   * sub-domain.
  */
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     removeClientSideCookie(cookieName);
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Cookie POC</h2>

      <input readOnly value={cookieValue} className={styles.input} />

      <button
        className={styles.button}
        onClick={() => setClientSideCookie(cookieName, "1223442342424242")}
      >
        Set Client Side Cookie
      </button>

      <button
        className={styles.button}
        onClick={() => removeClientSideCookie(cookieName)}
      >
        Remove Client Side Cookie
      </button>

      <div className={styles.link_container}>
        <a className={styles.link} href="https://m.vipul-pandit.in/cookie">
          Route to mweb
        </a>

        <a className={styles.link} href="https://en.vipul-pandit.in/cookie">
          Rout to en
        </a>

        <a className={styles.link} href="https://www.vipul-pandit.in/cookie">
          Route to www
        </a>
      </div>
    </div>
  );
};

export default CookiePoc;

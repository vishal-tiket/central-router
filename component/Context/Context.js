"use client";
import { createContext, useEffect, useState } from "react";

export const Context = createContext({
  referrer: null,
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=-8640000000;";
}

export const ContextProvider = ({ children }) => {
  const [referrer, setReferrer] = useState(null);

  useEffect(() => {
    const referrerCookie = getCookie("referrer");
    if (!!referrerCookie) {
      setReferrer(decodeURIComponent(referrerCookie));
      eraseCookie("referrer");
      return;
    }
    setReferrer(isClient && document.referrer);
  }, []);

  return (
    <Context.Provider value={{ referrer, setReferrer }}>
      {children}
    </Context.Provider>
  );
};

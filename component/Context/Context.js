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

export const ContextProvider = ({ children }) => {
  const [referrer, setReferrer] = useState(null);

  useEffect(() => {
    const referrerCookie = getCookie("referrer");
    setReferrer(decodeURIComponent(referrerCookie));
  }, []);

  return (
    <Context.Provider value={{ referrer, setReferrer }}>
      {children}
    </Context.Provider>
  );
};

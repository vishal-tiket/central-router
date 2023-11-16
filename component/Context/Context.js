"use client";
import { createContext, useState } from "react";

export const Context = createContext({
  referrer: null,
});

export const ContextProvider = ({ children }) => {
  const [referrer, setReferrer] = useState(null);

  return (
    <Context.Provider value={{ referrer, setReferrer }}>
      {children}
    </Context.Provider>
  );
};

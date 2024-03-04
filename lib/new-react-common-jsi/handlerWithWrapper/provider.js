"use client";
import React, { useContext, useEffect } from "react";
import { callGenericJSIWithRequestId } from "../handlerWithRequestId";

const HelperFunctionsContext = React.createContext();

export const HelperFunctionsProvider = ({ children }) => {
  useEffect(() => {
    console.log("mount");

    return () => {
      console.log("unmount");
    };
  }, []);

  return (
    <HelperFunctionsContext.Provider value={{ callGenericJSIWithRequestId }}>
      {children}
    </HelperFunctionsContext.Provider>
  );
};

export const useGenericJSI = () => useContext(HelperFunctionsContext);

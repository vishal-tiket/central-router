"use client";
import { useEffect } from "react";
import {
  JSICallback,
  callGenericJSIWithRequestId,
} from "../handlerWithRequestId/callGenericJSIWithRequestId";

export const useCallGenericJSI = () => {
  const uniqueId = () => {
    return "jsi-request-" + String(new Date().getTime());
  };

  useEffect(() => {
    console.log("mount");

    return () => {
      console.log("unmount");
      window.removeEventListener("nativeJSICallback", JSICallback);
    };
  }, []);

  const callJSI = async (command) => {
    const requestId = uniqueId();
    return await callGenericJSIWithRequestId(command, requestId);
  };

  return callJSI;
};

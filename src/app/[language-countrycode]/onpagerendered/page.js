"use client";
import { onPageRendered } from "@tiket/react-common-jsi";
import { useEffect } from "react";

export default function GenericJSI() {
  useEffect(() => {
    setTimeout(() => {
      onPageRendered({
        url: window.location.href,
        message: "message is not confirmed yet",
        status: "SUCCESS",
      });
    }, 2000);
  }, []);

  return <h1>Testing on page rendered jsi</h1>;
}

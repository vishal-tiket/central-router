"use client";
import { onPageRendered } from "@tiket/react-common-jsi";
import { useEffect, useState } from "react";

export default function GenericJSI() {
  const [time, setTime] = useState("");
  useEffect(() => {
    setTimeout(() => {
      const startTime = localStorage.getItem("startTime");
      const finalTime = new Date().getTime();
      setTime(finalTime - startTime);
      onPageRendered({
        url: window.location.href,
        message: "message is not confirmed yet",
        status: "SUCCESS",
      });
    }, 2000);
  }, []);

  return <h1>Testing on page rendered jsi, Time Taken = {time}</h1>;
}

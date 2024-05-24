"use client";
import {
  logWebApi,
  onJSRouting,
  onPageRendered,
} from "@tiket/react-common-jsi";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GenericJSI() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const startTime = new Date().getTime();
    // js routing JSI call
    onJSRouting({
      url: `${window.location.href}`,
    });

    logWebApi({
      uri: "12",
    });
    logWebApi({
      uri: "13",
    });
    logWebApi({
      uri: "14",
    });
    logWebApi({
      uri: "15",
    });
    logWebApi({
      uri: "16",
    });
    logWebApi({
      uri: "17",
    });

    // on page rendered jsi call after 2 seconds
    setTimeout(() => {
      const finalTime = new Date().getTime();
      onPageRendered({
        url: window.location.href,
        message: "message is not confirmed yet",
        status: "SUCCESS",
      });
      setTime(finalTime - startTime);
    }, 2000);
  }, []);

  return (
    <>
      <Link
        onClick={() => {
          if (typeof window !== "undefined") {
            localStorage.setItem("startTime", new Date().getTime());
          }
          onJSRouting({
            url: `${window.location.origin}/onpagerendered`,
          });
        }}
        href="/onpagerendered"
        style={{ display: "block" }}
      >
        next js router
      </Link>

      <a
        onClick={() => {
          if (typeof window !== "undefined") {
            localStorage.setItem("startTime", new Date().getTime());
          }
          onJSRouting({
            url: `${window.location.origin}/onpagerendered`,
          });
        }}
        href="/onpagerendered"
        style={{ display: "block" }}
      >
        normal router
      </a>

      <h2>Time Taken = {time}</h2>
    </>
  );
}

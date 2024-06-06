"use client";
import {
  PageRenderPerformanceMarker,
  onNavigationStart,
} from "@tiket/react-common-jsi";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GenericJSI() {
  const [code, setCode] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setCode(200);
    }, 2000);
  }, []);

  if (!code) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Link
        onClick={() => {
          onNavigationStart({ url: "/onpagerendered" });
        }}
        href="/onpagerendered"
        style={{ display: "block" }}
      >
        next js router
      </Link>

      <a href="/onpagerendered" style={{ display: "block" }}>
        normal router
      </a>

      <Link
        href="/redirect307"
        onClick={() => {
          onNavigationStart({ url: "/redirect307" });
        }}
        style={{ display: "block" }}
      >
        Soft Redirect (document redirect)
      </Link>

      <Link
        href="/softRedirect"
        onClick={() => {
          onNavigationStart({ url: "/softRedirect" });
        }}
        style={{ display: "block" }}
      >
        Soft Redirect (router.push)
      </Link>

      <a href="/hardRedirect" style={{ display: "block" }}>
        Hard Redirect
      </a>

      <PageRenderPerformanceMarker
        respCode={code}
        message={"page rendered successfully"}
      />
    </>
  );
}

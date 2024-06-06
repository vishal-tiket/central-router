"use client";
import {
  PageRenderPerformanceMarker,
  logWebApi,
  onNavigationStart,
} from "@tiket/react-common-jsi";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GenericJSI() {
  const [code, setCode] = useState(null);
  useEffect(() => {
    logWebApi({
      exception: "none",
      method: "GET",
      query: "https://something.com/api/v1/getData",
      reqPayloadSize: 100,
      respCode: 200,
      respTime: 2000,
      uri: "https://something.com/api/v1/getData",
      businessCode: 400,
      businessMsg: "none",
      respPayloadSize: 20000,
    });
    logWebApi({
      exception: "none",
      method: "POST",
      query: "https://something.com/api/v2/getData",
      reqPayloadSize: 100,
      respCode: 200,
      respTime: 2000,
      uri: "https://something.com/api/v2/getData",
      businessCode: 400,
      businessMsg: "none",
      respPayloadSize: 20000,
    });
    logWebApi({
      exception: "none",
      method: "PUT",
      query: "https://something.com/api/v3/getData",
      reqPayloadSize: 100,
      respCode: 200,
      respTime: 2000,
      uri: "https://something.com/api/v3/getData",
      businessCode: 400,
      businessMsg: "none",
      respPayloadSize: 20000,
    });
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

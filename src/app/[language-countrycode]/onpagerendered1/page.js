"use client";
import {
  PageRenderPerformanceMarker,
  logWebApi,
  onNavigationStart,
} from "@tiket/react-common-jsi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GenericJSI() {
  const router = useRouter();
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
      correlationId: "1234",
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
      correlationId: "1234",
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
      correlationId: "1234",
    });
    setTimeout(() => {
      setCode(200);
    }, 2000);
  }, []);

  if (!code) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <button onClick={() => router.back()}>Go Back</button>
        <h1>Page Rendered 1</h1>
        <Link
          onClick={() => {
            onNavigationStart({ url: "/onpagerendered2" });
          }}
          href="/onpagerendered2"
          style={{ display: "block" }}
        >
          next js router page 2
        </Link>
        <PageRenderPerformanceMarker
          respCode={code}
          message={"page rendered successfully"}
        />
      </>
    );
  }
}

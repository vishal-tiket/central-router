"use client";
import {
  PageRenderPerformanceMarker,
  logWebApi,
} from "@tiket/react-common-jsi";
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
  } else {
    return (
      <>
        <h1>Page Rendered</h1>
        <PageRenderPerformanceMarker
          respCode={code}
          message={"page rendered successfully"}
        />
      </>
    );
  }
}

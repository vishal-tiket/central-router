"use client";
import {
  PageRenderPerformanceMarker,
  logWebApi,
} from "@tiket/react-common-jsi";
import { useEffect, useState } from "react";

export default function ErrorScreen() {
  const [code, setCode] = useState(null);
  useEffect(() => {
    logWebApi({
      exception: "Forbidden",
      method: "GET",
      query: "https://something.com/api/v1/getData",
      reqPayloadSize: 100,
      respCode: 403,
      respTime: 2000,
      uri: "https://something.com/api/v1/getData",
      businessCode: 400,
      businessMsg: "none",
      respPayloadSize: 20000,
      correlationId: "1234",
    });
    logWebApi({
      exception: "Forbidden",
      method: "POST",
      query: "https://something.com/api/v2/getData",
      reqPayloadSize: 100,
      respCode: 403,
      respTime: 2000,
      uri: "https://something.com/api/v2/getData",
      businessCode: 400,
      businessMsg: "none",
      respPayloadSize: 20000,
      correlationId: "1234",
    });
    setTimeout(() => {
      setCode(403);
    }, 1000);
  }, []);

  if (!code) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <PageRenderPerformanceMarker
        respCode={code}
        message="Forbidden"
        customFields={{
          airportRoute: "CGK - DPS",
          departAirline: "QG - JT",
          flightRouteType: "Round Trip",
          totalPax: "3",
          screenName: "flight",
        }}
      />
      <h2>403 forbidden</h2>
      <button
        onClick={() => {
          if (typeof window !== "undefined") window.location.reload();
        }}
      >
        Reload
      </button>
    </>
  );
}

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

      <PageRenderPerformanceMarker
        respCode={code}
        message={"page rendered successfully"}
      />
    </>
  );
}

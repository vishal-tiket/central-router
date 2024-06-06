"use client";
import { PageRenderPerformanceMarker } from "@tiket/react-common-jsi";
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

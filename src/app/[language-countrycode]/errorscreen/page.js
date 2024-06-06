"use client";
import { PageRenderPerformanceMarker } from "@tiket/react-common-jsi";
import { useEffect, useState } from "react";

export default function ErrorScreen() {
  const [code, setCode] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setCode(403);
    }, 1000);
  }, []);

  if (!code) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <PageRenderPerformanceMarker respCode={code} message="Forbidden" />
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

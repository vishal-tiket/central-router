"use client";
import { headers } from "next/headers";
import { CentralRouter } from "../../../../component/CentralRouter";
import { useEffect, useState } from "react";
import { PageRenderPerformanceMarker } from "@tiket/react-common-jsi";

export default function Hotel() {
  const [code, setCode] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setCode(200);
    }, 2000);
  }, []);

  const headersList = headers();
  const referrer = headersList.get("referer");
  if (!code) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <CentralRouter referrerHeader={referrer} />;
      <PageRenderPerformanceMarker respCode={code} message="Success" />
    </>
  );
}

"use client";

import { PageRenderPerformanceMarker } from "@tiket/react-common-jsi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [code, setCode] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setCode(404);
    }, 1000);
  });

  if (!code) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <button onClick={() => router.back()}>Go Back</button>
      <PageRenderPerformanceMarker
        respCode={code}
        message={"page not found"}
        customFields={{
          airportRoute: "CGK - DPS",
          departAirline: "QG - JT",
          flightRouteType: "Round Trip",
          totalPax: "1",
          screenName: "flight",
        }}
      />
    </div>
  );
}

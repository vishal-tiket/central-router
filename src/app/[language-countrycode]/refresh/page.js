"use client";
import { PageRenderPerformanceMarker } from "@tiket/react-common-jsi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Refresh() {
  const router = useRouter();
  const [loading, setIsLoading] = useState({ bool: true, key: 0 });
  const [code, setCode] = useState(null);

  useEffect(() => {
    setIsLoading(false);
    setTimeout(() => {
      setCode(200);
    }, 2000);
  }, [loading.key]);

  if (loading.bool || !code) {
    return <h2>Loading</h2>;
  }

  return (
    <>
      <button onClick={() => window.location.reload()}>Reload</button>
      <button
        onClick={() => {
          setIsLoading({
            bool: true,
            key: loading.key + 1,
          });
          router.refresh();
        }}
      >
        Router Refresh
      </button>

      <PageRenderPerformanceMarker
        respCode={code}
        message={"page rendered successfully"}
        customData={{
          airportRoute: "CGK - DPS",
          departAirline: "QG - JT",
          flightRouteType: "Round Trip",
          totalPax: "5",
        }}
      />
    </>
  );
}

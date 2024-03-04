"use client";
import { useEffect, useState } from "react";
import { setupMockJSI } from "../../lib/new-react-common-jsi/mock-jsi";
import { useRouter } from "next/navigation";
import { useCallGenericJSI } from "../../lib/new-react-common-jsi";

export const TestComponent = () => {
  const callGenericJSIWithRequestId = useCallGenericJSI();
  const route = useRouter();
  const [response, setResponse] = useState(null);

  useEffect(() => {
    setupMockJSI();
  }, []);

  const callJSI = async (delay) => {
    const response = await callGenericJSIWithRequestId(`sampleJSI${delay}`);
    console.log(response);
    return setResponse(response[0]);
  };

  return (
    <>
      <h3>JSI Wrapper with dynamic id</h3>
      <button onClick={() => callJSI(0)}>Call JSI 0</button>
      <button onClick={() => callJSI(50)}>Call JSI 50</button>
      <button onClick={() => callJSI(200)}>Call JSI 200</button>
      <button onClick={() => callJSI(500)}>Call JSI 500</button>
      <button
        onClick={() => {
          callJSI(1000);
          if (window.location.href.includes("/test-jsi-requestId")) {
            route.push("/test-jsi-request");
            return;
          }
          route.push("/test-jsi-requestId");
        }}
      >
        Call JSI 1000 + route to (next js 14) different url
      </button>

      <button
        onClick={() => {
          callJSI(1000);
          if (window.location.href.includes("/test-jsi-requestId")) {
            route.push("/test-jsi-requestId?id=1000");
            return;
          }
          route.push("/test-jsi-request?id=1000");
          return;
        }}
      >
        Call JSI 1000 + change query params (next js 14)
      </button>

      <button
        onClick={() => {
          callJSI(1000);
          if (window.location.href.includes("/test-jsi-requestId")) {
            window.location.href = "/test-jsi-request";
            return;
          }
          window.location.href = "/test-jsi-requestId";
        }}
      >
        Call JSI 1000 + route to different url
      </button>

      <button
        onClick={() => {
          callJSI(1000);
          window.location.href = window.location.href + "?id=1000";
        }}
      >
        Call JSI 1000 + change query params
      </button>

      <p>{JSON.stringify(response)}</p>
    </>
  );
};

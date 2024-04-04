"use client";
import { useEffect, useState } from "react";
import { fetch } from "../../../../lib/fetch";
import { getCommonHeaders } from "@tiket/react-common-utilities";

export default function ApiPerformance() {
  const [feFetchData, setFeFetchData] = useState(null);
  const [jsiFetchData, setJsiFetchData] = useState(null);

  const callApi = async () => {
    const startTimeInMs = new Date().getTime();
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1",
      {}
    );
    const jsonResponse = await response.json();

    const endTimeInMs = new Date().getTime();

    setFeFetchData(`fe-fetch-api-duration: ${endTimeInMs - startTimeInMs}`);
  };

  const callApiJsi = async () => {
    if (typeof window !== "undefined") {
      // start time
      const startTimeInMs = new Date().getTime();
      window.JSIStartTime = startTimeInMs;
      const jsiArg = {
        command: "fetchApi",
        request: {
          url: "https://jsonplaceholder.typicode.com/todos/1",
          protocolConfig: {
            config: "",
            method: "GET",
          },
          data: "",
          headers: {
            ...getCommonHeaders({}),
            "Cache-Control": "no-cache",
          },
          isCritical: true,
          page: "SamplePage",
          responseHandler: "ApiPerformance",
        },
      };
      window.generic?.callGenericNativeJSI?.(JSON.stringify(jsiArg));
    }
  };

  useEffect(() => {
    const handleNativeJSICallback = (e) => {
      const data = JSON.parse(e?.detail?.response?.data);

      // get start time
      const startTimeInMs = window.JSIStartTime || 0;
      // end time
      const endTimeInMs = new Date().getTime();

      setJsiFetchData(`jsi-fetch-api-duration: ${endTimeInMs - startTimeInMs}`);
      window.JSIStartTime = undefined;

      return;
    };

    window.addEventListener("nativeJSICallback", handleNativeJSICallback);

    return () => {
      window.removeEventListener("nativeJSICallback", handleNativeJSICallback);
    };
  }, []);

  return (
    <>
      <button onClick={callApi} id="call-api-fe">
        Call Api - FE Fetch
      </button>
      <pre style={{ wordBreak: "break-all" }} id="api-response-fe">
        {feFetchData}
      </pre>

      <button onClick={callApiJsi} id="call-api-jsi">
        Call Api - JSI
      </button>
      <pre style={{ wordBreak: "break-all" }} id="api-response-jsi">
        {jsiFetchData}
      </pre>
    </>
  );
}

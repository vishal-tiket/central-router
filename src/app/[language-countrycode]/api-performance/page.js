"use client";
import { useEffect, useState } from "react";
import { fetch } from "../../../../lib/fetch";

export default function ApiPerformance() {
  const [feFetchData, setFeFetchData] = useState(null);
  const [jsiFetchData, setJsiFetchData] = useState(null);

  const callApi = async () => {
    const startTimeInMs = new Date().getTime();
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1",
      { cache: "no-store" }
    );
    const jsonResponse = await response.json();

    const endTimeInMs = new Date().getTime();

    setFeFetchData({
      method: "FE Fetch",
      startTimeInMs,
      endTimeInMs,
      durationInMs: endTimeInMs - startTimeInMs,
      response: jsonResponse,
    });
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
          headers: {},
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
      console.log("stringify", JSON.stringify(e?.detail?.response?.data));
      console.log("stringify response", JSON.stringify(e?.detail?.response));
      console.log("stringify detail", JSON.stringify(e?.detail));
      console.log("event", e);
      const data = JSON.parse(e?.detail?.response?.data);

      // get start time
      const startTimeInMs = window.JSIStartTime || 0;
      // end time
      const endTimeInMs = new Date().getTime();

      setJsiFetchData({
        method: "JSI",
        startTimeInMs,
        endTimeInMs,
        durationInMs: endTimeInMs - startTimeInMs,
        response: data,
      });
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
        {JSON.stringify(feFetchData, null, 2)}
      </pre>

      <button onClick={callApiJsi} id="call-api-jsi">
        Call Api - JSI
      </button>
      <pre style={{ wordBreak: "break-all" }} id="api-response-jsi">
        {JSON.stringify(jsiFetchData, null, 2)}
      </pre>
    </>
  );
}

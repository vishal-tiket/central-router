"use client";
import { useEffect, useState } from "react";
import { fetch } from "../../../../lib/fetch";
import { getCommonHeaders } from "@tiket/react-common-utilities";

export default function ApiPerformance() {
  // states for FE Fetch
  const [feFetchData, setFeFetchData] = useState(null);
  const [feFetchTiketData, setFeFetchTiketData] = useState(null);

  // states for JSI Fetch
  const [jsiFetchData, setJsiFetchData] = useState(null);
  const [jsiFetchTiketData, setJsiFetchTiketData] = useState(null);

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

  const callTiketApi = async () => {
    // start time
    const startTimeInMs = new Date().getTime();
    try {
      const response = await fetch(
        // `https://www.tiket.com/ms-gateway/tix-promotion-page/promos/multicurrency?areaSize=6&brandSize=6&category=pesawat&inventorySize=6&promoCodeSize=10`,
        `https://lb1-ms.tiket.com/gateway/tix-hotel-search/v2/search`,
        {
          opts: {
            method: "POST",
            headers: {
              Authorization:
                "Bearer eyJraWQiOiJoa1lwUzVfazZxRUc5TGRHZVdVRi1vWGxFSlBFRVoyciJ9.eyJhdWQiOiJ0aWtldC5jb20vcnQiLCJzdWIiOiI2NjFlNWJkN2I5MGUzOTY1NzExNjM0NzgiLCJuYmYiOjE3MTMyNjU2MjMsImlzcyI6Imh0dHBzOi8vd3d3LnRpa2V0LmNvbSIsImV4cCI6MTc0NDgyNTYyM30.rlpF3GOhpWEeGaXqq0B9sikQqL-Tk6taM1kaz9pVbVaxIjMRINhZP8iQtFCahmTf",
            },
            body: JSON.stringify({
              room: 2,
              adult: 2,
              childAges: [],
              searchType: "REGION",
              searchValue: "jakarta-108001534490276204",
              sort: "popularity",
              startDate: "2024-04-16",
              night: 2,
              page: 1,
              showAlternate: true,
              priorityRankingType: "NORMAL_SEARCH",
              filter: {},
              groupFilterKeyword: "",
              ABTest: { enableNHAStarRatingCalculation: "true" },
              additionalData: ["hotelInfo", "imageGallery"],
            }),
            credentials: "omit",
          },
        }
      );
      const jsonData = await response.json();

      // end time
      const endTimeInMs = new Date().getTime();

      setFeFetchTiketData(
        `fe-fetch-tiket-api-duration: ${endTimeInMs - startTimeInMs}`
      );
    } catch (error) {
      console.log("Error fetching data:", error);
      setFeFetchTiketData(
        `fe-fetch-tiket-api-failed: ${JSON.stringify(error)}`
      );
    }
  };

  const callTiketApiJsi = async () => {
    if (typeof window !== "undefined") {
      // start time
      const startTimeInMs = new Date().getTime();
      window.JSIStartTime = startTimeInMs;

      const jsiArg = {
        command: "fetchApi",
        request: {
          // url: `https://www.tiket.com/ms-gateway/tix-promotion-page/promos/multicurrency?areaSize=6&brandSize=6&category=pesawat&inventorySize=6&promoCodeSize=10`,
          url: `https://lb1-ms.tiket.com/gateway/tix-hotel-search/v2/search`,
          protocolConfig: {
            config: "",
            method: "POST",
            credentials: "omit",
          },
          data: {
            room: 2,
            adult: 2,
            childAges: [],
            searchType: "REGION",
            searchValue: "jakarta-108001534490276204",
            sort: "popularity",
            startDate: "2024-04-16",
            night: 2,
            page: 1,
            showAlternate: true,
            priorityRankingType: "NORMAL_SEARCH",
            filter: {},
            groupFilterKeyword: "",
            ABTest: { enableNHAStarRatingCalculation: "true" },
            additionalData: ["hotelInfo", "imageGallery"],
          },
          headers: {
            ...getCommonHeaders({}),
            Authorization:
              "Bearer eyJraWQiOiJoa1lwUzVfazZxRUc5TGRHZVdVRi1vWGxFSlBFRVoyciJ9.eyJhdWQiOiJ0aWtldC5jb20vcnQiLCJzdWIiOiI2NjFlNWJkN2I5MGUzOTY1NzExNjM0NzgiLCJuYmYiOjE3MTMyNjU2MjMsImlzcyI6Imh0dHBzOi8vd3d3LnRpa2V0LmNvbSIsImV4cCI6MTc0NDgyNTYyM30.rlpF3GOhpWEeGaXqq0B9sikQqL-Tk6taM1kaz9pVbVaxIjMRINhZP8iQtFCahmTf",
            "Cache-Control": "no-cache",
          },
          isCritical: true,
          page: "SamplePageTiket",
          responseHandler: "ApiPerformanceTiket",
        },
      };
      window.generic?.callGenericNativeJSI?.(JSON.stringify(jsiArg));
    }
  };

  useEffect(() => {
    const handleNativeJSICallback = (e) => {
      console.log("stringify e.detail", JSON.stringify(e?.detail));
      const data = JSON.parse(e?.detail?.response?.data);

      // get start time
      const startTimeInMs = window.JSIStartTime || 0;
      // end time
      const endTimeInMs = new Date().getTime();

      window.JSIStartTime = undefined;
      if (data?.userId) {
        setJsiFetchData(
          `jsi-fetch-api-duration: ${endTimeInMs - startTimeInMs}`
        );
      } else {
        setJsiFetchTiketData(
          `jsi-fetch-tiket-api-duration: ${endTimeInMs - startTimeInMs}`
        );
      }

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

      <div
        style={{ width: "100%", height: "2px", background: "#42a5f2" }}
      ></div>

      <button onClick={callTiketApi} id="call-tiket-api-fe">
        Call Tiket Api - Fe Fetch
      </button>
      <pre style={{ wordBreak: "break-all" }} id="api-response-tiket-fe">
        {feFetchTiketData}
      </pre>

      <button onClick={callTiketApiJsi} id="call-tiket-api-jsi">
        Call Tiket Api - JSI
      </button>
      <pre style={{ wordBreak: "break-all" }} id="api-response-tiket-jsi">
        {jsiFetchTiketData}
      </pre>
    </>
  );
}

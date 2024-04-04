"use client";
import { getCommonHeaders } from "@tiket/react-common-utilities";
import { useEffect, useState } from "react";

function Page() {
  const [data, setData] = useState(null);
  const [cookies, setCookies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://m.gatotkaca.tiket.com/ms-gateway/tix-promotion-page/promos/ferry-test?areaSize=6&brandSize=6&category=campaign&inventorySize=6&promoCodeSize=10`,
          {
            headers: {
              "X-Country-Code": "IDN",
              "X-Channel-Id": "MOBILE_WEB",
              "X-Currency": "IDR",
              Authorization:
                "Bearer eyJraWQiOiJTVnZZbjhYMFphMmZENDIzN3FLdjBwVXdRRkRrUWdtTSJ9.eyJhdWQiOiJ0aWtldC5jb20iLCJzdWIiOiI2NjBlOTJmNTE5MTk2ODMyMzNmMTZjZjciLCJuYmYiOjE3MTIyMzExNTcsImlzcyI6Imh0dHBzOi8vd3d3LnRpa2V0LmNvbSIsImV4cCI6MTcyODAxMTE1N30.oFmFuNh4Jw7SAFQu2L0x6GTyG5jJfsOx0YzCaukIFcwl1ZjG2idVFl7XQRESbKxr",
            },
          }
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [name, value] = cookie.trim().split("=");
      return { ...acc, [name]: value };
    }, {});
    setCookies(JSON.stringify(cookies, undefined, 2));
  }, []);

  return (
    <div>
      {data ? (
        <>
          <div>
            <h1>Client Side Api Call</h1>
            <h2>API Response</h2>
            <span>{JSON.stringify(data)}</span>
          </div>
          <div>
            <h2>Headers Sent</h2>
            <span>
              <pre>{JSON.stringify(getCommonHeaders({}), undefined, 2)}</pre>
            </span>
            <h2>Cookies available</h2>
            <span>
              <pre>{cookies}</pre>
            </span>
          </div>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default Page;

"use client";
import { getCommonHeaders } from "@tiket/react-common-utilities";
import { useEffect, useState } from "react";
import { fetch } from "../../../../lib/fetch";

function Page() {
  const [data, setData] = useState(null);
  const [cookies, setCookies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          // `https://www.tiket.com/ms-gateway/tix-promotion-page/promos/multicurrency?areaSize=6&brandSize=6&category=pesawat&inventorySize=6&promoCodeSize=10`,
          `https://gatotkaca.tiket.com/ms-gateway/tix-promotion-page/promos/ferry-test?areaSize=6&brandSize=6&category=campaign&inventorySize=6&promoCodeSize=10`,
          {
            opts: {
              headers: {
                Authorization:
                  // "Bearer eyJraWQiOiJ3YzVZVU5OS0l1Sk1LV0otcFBaX1d0XzFnblhIc2JYRiJ9.eyJhdWQiOiJ0aWtldC5jb20iLCJzdWIiOiI2NjBmYjVmMDYxNTM1NDZmOGVkMzQ2N2EiLCJuYmYiOjE3MTIzMDU2NDgsImlzcyI6Imh0dHBzOi8vd3d3LnRpa2V0LmNvbSIsImV4cCI6MTcyODA4NTY0OH0.acgykb-xKhocu9O2d2twJGIprKAop0PCQPGWFrDHEpDRXyEExBLeWYx-fHvq2ouL",
                  "Bearer eyJraWQiOiJkUjd5OW9iMkhYcm4tQ21MRHRoZ1l6REFRaEQtVnhVeCJ9.eyJhdWQiOiJ0aWtldC5jb20iLCJzdWIiOiI2NjBmYjlhNDZjMGNmNTMxNWRlNmM2NjgiLCJuYmYiOjE3MTIzMDY1OTYsImlzcyI6Imh0dHBzOi8vd3d3LnRpa2V0LmNvbSIsImV4cCI6MTcxMjkxMTM5Nn0.fDkHLI-OBehKRjEuX0DVJqsbNvpEZ600kTbBzDpNQHvMR3KrQPGGVg9hJaGiwcLl",
              },
              credentials: "omit",
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
              <pre>
                {JSON.stringify(
                  { ...getCommonHeaders({}), "X-Cookie-Session-V2": undefined },
                  undefined,
                  2
                )}
              </pre>
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

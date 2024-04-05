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
          `https://m.gatotkaca.tiket.com/ms-gateway/tix-promotion-page/promos/ferry-test?areaSize=6&brandSize=6&category=campaign&inventorySize=6&promoCodeSize=10`,
          {
            opts: {
              headers: {
                Authorization:
                  "Bearer eyJraWQiOiJGbGpkRExkSjA3VmhNUU00clh1Nk5fMTNfX2U4ajFsayJ9.eyJhdWQiOiJ0aWtldC5jb20iLCJzdWIiOiI2NjBmODZiMjEyODFiNTY0ZjUwMGY3ZGMiLCJuYmYiOjE3MTIyOTM1NTQsImlzcyI6Imh0dHBzOi8vd3d3LnRpa2V0LmNvbSIsImV4cCI6MTcxMjg5ODM1NH0.IuWz7PXT6alVLLh29O9HQR80xAPTmCUxRfhBzNXwJRk2lx7tbWh-MAp99TL4lOvl",
              },
            },
            credentials: "omit",
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

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
          `https://lb1-testing.tiket.com/gateway/tix-member-session/v1/session`,
          {}
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

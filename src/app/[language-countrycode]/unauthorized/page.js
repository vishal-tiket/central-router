"use client";

import { useEffect, useState } from "react";

export default function Unauthorized() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const callApi = async () => {
      try {
        const result = await fetch("https://api.github.com/user");
        console.log(result);
        setData(result);
      } catch (e) {
        console.log(JSON.stringify(e));
        setData(e);
      }
    };
    callApi();
  }, []);

  return <div>Calling Api to get response {JSON.stringify(data)}</div>;
}

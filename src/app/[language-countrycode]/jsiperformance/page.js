"use client";

import { ShareDownloadableFiles } from "@tiket/react-common-navigator-permission";
import { useState } from "react";

export default function JSIPerformance() {
  const [multipleFileLoading, setMultipleFileLoading] = useState(false);
  const [error, setError] = useState(null);

  const shareFiles = async () => {
    setMultipleFileLoading(true);
    try {
      const response = await ShareDownloadableFiles([
        {
          url: "https://images.unsplash.com/photo-15105056bb78115-f2a7ae4cfea9?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          name: "sssssss1",
        },
        {
          url: "https://images.unsplash.com/photo-1510505678115-f2a7ae4cfea9?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          name: "sssssss2",
        },
        {
          url: "https://images.unsplash.com/photo-1510505678115-f2a7ae4cfea9?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          name: "sssssss3",
        },
        {
          url: "https://images.unsplash.com/photo-1510505678115-f2a7ae4cfea9?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          name: "sssssss4",
        },
        {
          url: "https://images.unsplash.com/photo-1510505678115-f2a7ae4cfea9?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          name: "sssssss5",
        },
        {
          url: "https://images.unsplash.com/photo-1510505678115-f2a7ae4cfea9?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          name: "sssssss6",
        },
      ]);
      console.log("dsadasdasdasdasdA", response);
    } catch (e) {
      setMultipleFileLoading(false);
      setError(e);
      console.log("error caught");
    }
  };

  return (
    <div>
      <h3>Share Wrapper</h3>
      <h4>FE Error Case</h4>
      <button onClick={shareFiles}>Share Multiple Files</button>
      {multipleFileLoading ? (
        <div>Loading</div>
      ) : (
        <div>{JSON.stringify(error)}</div>
      )}
    </div>
  );
}

"use client";

import { Share } from "@tiket/react-common-navigator-permission";
import { useEffect, useState } from "react";

export default function JSIPerformance() {
  const [isSmallContentLoading, setIsSmallContentLoading] = useState(false);
  const [isLargeContentLoading, setIsLargeContentLoading] = useState(false);

  const callJSIWithSmallContent = async () => {
    setIsSmallContentLoading(true);
    const res = await Share({
      files: [
        {
          url: "https://images.unsplash.com/photo-1510505678115-f2a7ae4cfea9?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          name: "sssssss",
        },
      ],
    });
    setIsSmallContentLoading(false);
  };

  const callJSIWithLargeContent = async () => {
    setIsLargeContentLoading(true);
    const res = await Share({
      files: [
        {
          url: "https://drive.google.com/uc?export=download&id=1nJPkC6I2L9BfmYUSFLOhDye18878zQv8",
          name: "ssss",
        },
      ],
    });
    setIsLargeContentLoading(false);
  };

  return (
    <div>
      <h3>JSI Performance</h3>
      <button onClick={callJSIWithSmallContent}>JSI with small content</button>
      {isSmallContentLoading && <div>Loading</div>}
      <button onClick={callJSIWithLargeContent}>JSI with large content</button>
      {isLargeContentLoading && <div>Loading</div>}
    </div>
  );
}

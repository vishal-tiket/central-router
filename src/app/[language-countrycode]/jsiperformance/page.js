"use client";

import { ShareDownloadableFiles } from "@tiket/react-common-navigator-permission";
import { useEffect, useState } from "react";

export default function JSIPerformance() {
  const [isSmallContentLoading, setIsSmallContentLoading] = useState(false);
  const [isLargeContentLoading, setIsLargeContentLoading] = useState(false);

  const callJSIWithSmallContent = () => {
    setIsSmallContentLoading(true);
    ShareDownloadableFiles([
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
    ])
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log("handle rejection");
        console.log(e);
      });
    setIsSmallContentLoading(false);
  };

  const callJSIWithLargeContent = async () => {
    setIsLargeContentLoading(true);
    const res = await ShareDownloadableFiles([
      {
        url: "https://drive.google.com/uc?export=download&id=1nJPkC6I2L9BfmYUSFLOhDye18878zQv8",
        name: "ssss",
      },
    ]);
    console.log(res);
    setIsLargeContentLoading(false);
  };

  const download = async () => {
    try {
      const res = await fetch(
        "https://images.unsnjnkjnkjnkjnplash.com/photo-1510505678115-f2a7ae4cfea9?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      );
      console.log(res);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const promiseHandler = () => {
    try {
      return new Promise((res, rej) => {
        try {
          res(undefined);
        } catch (e) {
          console.log("inside promise");
          rej(e);
        }
      });
    } catch (e) {
      console.log("outside promise");
      console.log(e);
    }
  };

  const errorHandler = async () => {
    try {
      const res = await promiseHandler();
    } catch (e) {
      console.log("outside errorHandler");
      console.log(e);
    }
  };

  return (
    <div>
      <h3>JSI Performance</h3>
      <button onClick={callJSIWithSmallContent}>JSI with small content</button>
      {isSmallContentLoading && <div>Loading</div>}
      <button onClick={callJSIWithLargeContent}>JSI with large content</button>
      {isLargeContentLoading && <div>Loading</div>}
      <button onClick={errorHandler}>errorHandler</button>
    </div>
  );
}

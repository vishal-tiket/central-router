"use client";

import { ShareDownloadableFiles } from "@tiket/react-common-navigator-permission";
import { useState } from "react";

export default function JSIPerformance() {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);
  const [error, setError] = useState(null);

  const share2FilesWithBrokenUrls = async () => {
    setLoading1(true);
    try {
      const response = await ShareDownloadableFiles([
        {
          url: "https://images.unsplash.com/1510505678115-f2a7ae4cfea9?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          name: "image1",
        },
        {
          url: "https://images.unsplash.com/1510505678115-f2a7ae4cfea9?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          name: "image2",
        },
      ]);
    } catch (e) {
      console.log("error caught", e);
      setError(e);
    } finally {
      setLoading1(false);
    }
  };

  const share2FilesWithoutName = async () => {
    setLoading2(true);
    try {
      const response = await ShareDownloadableFiles([
        {
          url: "https://images.unsplash.com/photo-1510505678115-f2a7ae4cfea9?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          url: "https://images.unsplash.com/photo-1510505678115-f2a7ae4cfea9?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ]);
    } catch (e) {
      console.log("error caught", e);
    } finally {
      setLoading2(false);
    }
  };

  const share2SameFiles = async () => {
    setLoading3(true);
    try {
      const response = await ShareDownloadableFiles([
        {
          url: "https://images.unsplash.com/photo-1510505678115-f2a7ae4cfea9?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          name: "image1",
        },
        {
          url: "https://images.unsplash.com/photo-1510505678115-f2a7ae4cfea9?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          name: "image1",
        },
      ]);
    } catch (e) {
      console.log("error caught", e);
    } finally {
      setLoading3(false);
    }
  };

  const share100SameFiles = async () => {
    setLoading4(true);
    try {
      const response = await ShareDownloadableFiles(
        Array.from({ length: 100 }, (_, i) => ({
          url: "https://images.unsplash.com/photo-1510505678115-f2a7ae4cfea9?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          name: `image-${i}`,
        }))
      );
    } catch (e) {
      console.log("error caught", e);
    } finally {
      setLoading4(false);
    }
  };

  const share2FilesWithStrangeNames = async () => {
    setLoading5(true);
    try {
      const response = await ShareDownloadableFiles([
        {
          url: "https://images.unsplash.com/photo-1510505678115-f2a7ae4cfea9?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          name: "$$$%$%#%#%#@img",
        },
        {
          url: "https://images.unsplash.com/photo-1510505678115-f2a7ae4cfea9?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          name: "(*(**&%%^$@img",
        },
      ]);
    } catch (e) {
      console.log("error caught", e);
    } finally {
      setLoading5(false);
    }
  };

  return (
    <div>
      <h3>FE Share Wrapper</h3>
      <button onClick={share2FilesWithBrokenUrls}>
        Share 2 Images with Broken urls
      </button>
      {loading1 ? <p>Loading...</p> : error && <p>{error.message}</p>}

      <button onClick={share2FilesWithoutName}>
        Share 2 Images without name
      </button>
      {loading2 && <p>Loading...</p>}

      <button onClick={share2SameFiles}>
        Share 2 Images With Same Urls And Name
      </button>
      {loading3 && <p>Loading...</p>}

      <button onClick={share100SameFiles}>Share 100 Images</button>
      {loading4 && <p>Loading...</p>}

      <button onClick={share2FilesWithStrangeNames}>
        Share Images with symbols in name
      </button>
      {loading5 && <p>Loading...</p>}
    </div>
  );
}

"use client";

import { ShareDownloadableFiles } from "@tiket/react-common-navigator-permission";
import { useState } from "react";

export default function JSIPerformance() {
  const [multipleFileLoading, setMultipleFileLoading] = useState(false);
  const [error, setError] = useState(null);

  const share2FilesWithBrokenUrls = async () => {
    setMultipleFileLoading(true);
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
      console.log("error caught");
    } finally {
      setMultipleFileLoading(false);
    }
  };

  const share2FilesWithoutName = async () => {
    setMultipleFileLoading(true);
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
      console.log("error caught");
    } finally {
      setMultipleFileLoading(false);
    }
  };

  const share2SameFiles = async () => {
    setMultipleFileLoading(true);
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
      console.log("error caught");
    } finally {
      setMultipleFileLoading(false);
    }
  };

  const share100SameFiles = async () => {
    setMultipleFileLoading(true);
    try {
      const response = await ShareDownloadableFiles(
        Array.map({ length: 100 }, (_, i) => ({
          url: "https://images.unsplash.com/photo-1510505678115-f2a7ae4cfea9?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          name: `image-${i}`,
        }))
      );
    } catch (e) {
      console.log("error caught");
    } finally {
      setMultipleFileLoading(false);
    }
  };

  const share2FilesWithStrangeNames = async () => {
    setMultipleFileLoading(true);
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
      console.log("error caught");
    } finally {
      setMultipleFileLoading(false);
    }
  };

  return (
    <div>
      <h3>FE Share Wrapper</h3>
      <button onClick={share2FilesWithBrokenUrls}>
        Share 2 Images with Broken urls
      </button>

      <button onClick={share2FilesWithoutName}>
        Share 2 Images without name
      </button>

      <button onClick={share2SameFiles}>
        Share 2 Images With Same Urls And Name
      </button>

      <button onClick={share100SameFiles}>Share 100 Images</button>

      <button onClick={share2FilesWithStrangeNames}>
        Share Images with symbols in name
      </button>
    </div>
  );
}

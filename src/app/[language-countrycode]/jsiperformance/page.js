"use client";

import { ShareDownloadableFiles } from "@tiket/react-common-navigator-permission";
import { useState } from "react";

export default function JSIPerformance() {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);
  const [loading6, setLoading6] = useState(false);
  const [loading7, setLoading7] = useState(false);
  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null);
  const [error3, setError3] = useState(null);
  const [error4, setError4] = useState(null);
  const [error5, setError5] = useState(null);
  const [error6, setError6] = useState(null);
  const [error7, setError7] = useState(null);

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
      console.log("error caught", typeof e);
      setError1(e);
    } finally {
      setLoading1(false);
    }
  };

  const share2FilesWithoutName = async () => {
    setLoading2(true);
    try {
      const response = await ShareDownloadableFiles([
        {
          url: "https://plus.unsplash.com/premium_photo-1671659204766-58c13cf39b5c?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          url: "https://plus.unsplash.com/premium_photo-1671659204766-58c13cf39b5c?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ]);
    } catch (e) {
      console.log("error caught", e);
      setError2(e);
    } finally {
      setLoading2(false);
    }
  };

  const share2SameFiles = async () => {
    setLoading3(true);
    try {
      const response = await ShareDownloadableFiles([
        {
          url: "https://plus.unsplash.com/premium_photo-1671659204766-58c13cf39b5c?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          name: "image1",
        },
        {
          url: "https://plus.unsplash.com/premium_photo-1671659204766-58c13cf39b5c?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          name: "image1",
        },
      ]);
    } catch (e) {
      console.log("error caught", e);
      setError3(e);
    } finally {
      setLoading3(false);
    }
  };

  const share100SameFiles = async () => {
    setLoading4(true);
    try {
      const response = await ShareDownloadableFiles(
        Array.from({ length: 100 }, (_, i) => ({
          url: "https://plus.unsplash.com/premium_photo-1671659204766-58c13cf39b5c?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          name: `image-${i}`,
        }))
      );
    } catch (e) {
      console.log("error caught", e);
      setError4(e);
    } finally {
      setLoading4(false);
    }
  };

  const share2FilesWithStrangeNames = async () => {
    setLoading5(true);
    try {
      const response = await ShareDownloadableFiles([
        {
          url: "https://plus.unsplash.com/premium_photo-1671659204766-58c13cf39b5c?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          name: "$$$%$%#%#%#@img",
        },
        {
          url: "https://plus.unsplash.com/premium_photo-1671659204766-58c13cf39b5c?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          name: "(*(**&%%^$@img",
        },
      ]);
    } catch (e) {
      console.log("error caught", e);
      setError5(e);
    } finally {
      setLoading5(false);
    }
  };

  const shareAVIFFile = async () => {
    setLoading6(true);
    try {
      const response = await ShareDownloadableFiles([
        {
          url: "https://i.postimg.cc/4NQRyC0d/photo-1510505678115-f2a7ae4cfea9.avif",
          name: "image1",
        },
      ]);
    } catch (e) {
      console.log("error caught", e);
      setError6(e);
    } finally {
      setLoading6(false);
    }
  };

  const shareWebpFile = async () => {
    setLoading7(true);
    try {
      const response = await ShareDownloadableFiles([
        {
          url: "https://i.postimg.cc/YSmX4YS3/0c7cf56a-a2c9-4106-b24d-424711909d89.webp",
          name: "image1",
        },
      ]);
    } catch (e) {
      console.log("error caught", e);
      setError7(e);
    } finally {
      setLoading7(false);
    }
  };

  return (
    <div>
      <h3>FE Share Wrapper</h3>
      <button onClick={share2FilesWithBrokenUrls}>
        Share 2 Images with Broken urls
      </button>
      {loading1 ? <p>Loading...</p> : error1 && <p>{error1}</p>}

      <button onClick={share2FilesWithoutName}>
        Share 2 Images without name
      </button>
      {loading2 ? <p>Loading...</p> : error2 && <p>{error2}</p>}

      <button onClick={share2SameFiles}>
        Share 2 Images With Same Urls And Name
      </button>
      {loading3 ? <p>Loading...</p> : error3 && <p>{error3}</p>}

      <button onClick={share100SameFiles}>Share 100 Images</button>
      {loading4 ? <p>Loading...</p> : error4 && <p>{error4}</p>}

      <button onClick={share2FilesWithStrangeNames}>
        Share Images with symbols in name
      </button>
      {loading5 ? <p>Loading...</p> : error5 && <p>{error5}</p>}

      <button onClick={shareAVIFFile}>Share AVIF Image</button>
      {loading6 ? <p>Loading...</p> : error6 && <p>{error6}</p>}

      <button onClick={shareWebpFile}>Share Webp Image</button>
      {loading7 ? <p>Loading...</p> : error7 && <p>{error7}</p>}
    </div>
  );
}

"use client";

import { shareFilesWithContent } from "@tiket/react-common-navigator-permission";

export default function ShareSheetTesting() {
  const handleShareSheett = async () => {
    if (typeof window === "undefined") return;
    try {
      const result = await shareFilesWithContent({
        files: [
          {
            url: `${window.location.origin}/api/download-pdf`,
            name: "dummy-pdf.pdf",
          },
        ],
      });
    } catch (e) {
      console.log("error caught", e);
    }
  };
  const handleShareSheet = async () => {
    if (typeof window === "undefined") return;
    try {
      const result = await shareFilesWithContent({
        files: [
          {
            url: `${window.location.origin}/api/download-pdf`,
            name: "dummy-pdf.pdf",
          },
          {
            url: `${window.location.origin}/api/download-img`,
            name: "dummy-image.png",
          },
        ],
        message: "This title \nThis message \nhttps://google.com/",
      });
    } catch (e) {
      console.log("error caught", e);
    }
  };

  const handleShareSheet1 = async () => {
    if (typeof window === "undefined") return;
    try {
      const result = await shareFilesWithContent({
        mimeType: "text/plain",
        message: "This title \nThis message \nhttps://google.com/",
      });
    } catch (e) {
      console.log("error caught", e);
    }
  };

  const handleShareSheet2 = async () => {
    if (typeof window === "undefined") return;
    try {
      const result = await shareFilesWithContent({
        files: [
          {
            url: `${window.location.origin}/api/download-img`,
            name: "dummy-image.png",
          },
        ],
        mimeType: "image/*",
        message: "This title \nThis message \nhttps://google.com/",
      });
    } catch (e) {
      console.log("error caught", e);
    }
  };

  const handleShareSheet3 = async () => {
    if (typeof window === "undefined") return;
    try {
      const result = await shareFilesWithContent({
        files: [
          {
            url: `${window.location.origin}/api/download-img`,
            name: "dummy-image.png",
          },
        ],
        mimeType: "image/*",
      });
    } catch (e) {
      console.log("error caught", e);
    }
  };

  const handleShareSheet4 = async () => {
    if (typeof window === "undefined") return;
    try {
      const result = await shareFilesWithContent({});
    } catch (e) {
      console.log("error caught", e);
    }
  };

  const handleShareSheet5 = async () => {
    if (typeof window === "undefined") return;
    try {
      const result = await shareFilesWithContent({
        files: [
          {
            url: `${window.location.origin}/api/download-img`,
            name: "dummy-image.png",
          },
          {
            url: `${window.location.origin}/api/download-img`,
            name: "dummy-image.png",
          },
        ],
        message: "This title \nThis message \nhttps://google.com/",
      });
    } catch (e) {
      console.log("error caught", e);
    }
  };

  const handleShareSheet6 = async () => {
    if (typeof window === "undefined") return;
    try {
      const result = await shareFilesWithContent({
        files: [
          {
            url: `${window.location.origin}/api/download-pdf`,
            name: "dummy-pdf.pdf",
          },
          {
            url: `${window.location.origin}/api/download-pdf`,
            name: "dummy-pdf.pdf",
          },
        ],
        message: "This title \nThis message \nhttps://google.com/",
      });
    } catch (e) {
      console.log("error caught", e);
    }
  };

  const handleShareSheet7 = async () => {
    if (typeof window === "undefined") return;
    try {
      const result = await shareFilesWithContent({
        files: [
          {
            url: `${window.location.origin}/api/download-img`,
            name: "",
          },
        ],
      });
    } catch (e) {
      console.log("error caught", e);
    }
  };

  const handleShareSheet8 = async () => {
    if (typeof window === "undefined") return;
    try {
      const result = await shareFilesWithContent({
        files: [
          {
            url: `${window.location.origin}/api/download-img`,
            name: null,
          },
        ],
      });
    } catch (e) {
      console.log("error caught", e);
    }
  };

  const handleShareSheet9 = async () => {
    if (typeof window === "undefined") return;
    try {
      const result = await shareFilesWithContent({
        files: [
          {
            url: `empty.png`,
            name: null,
          },
        ],
      });
    } catch (e) {
      console.log("error caught", e);
    }
  };

  const handleShareSheet10 = async () => {
    if (typeof window === "undefined") return;
    try {
      const result = await shareFilesWithContent({
        files: [
          {
            url: "",
            name: "",
          },
        ],
      });
    } catch (e) {
      console.log("error caught", e);
    }
  };

  return (
    <div>
      <h1>Testing for Share Sheet Buttons</h1>

      <h3>Share PDF only</h3>
      <button onClick={handleShareSheett}>Share Sheet</button>

      <h3>Share Sheet with PDF , Image and Message</h3>
      <button onClick={handleShareSheet}>Share Sheet</button>

      <h3>Share Sheet with Message Only</h3>
      <button onClick={handleShareSheet1}>Share Sheet</button>

      <h3>Share Sheet with Image and Message</h3>
      <button onClick={handleShareSheet2}>Share Sheet</button>

      <h3>Share Sheet with Image Only</h3>
      <button onClick={handleShareSheet3}>Share Sheet</button>

      <h3>Share Sheet with empty files</h3>
      <button onClick={handleShareSheet4}>Share Sheet</button>

      <h3>Share Sheet with 2 images and a Text</h3>
      <button onClick={handleShareSheet5}>Share Sheet</button>

      <h3>Share Sheet with 2 PDFs and a Text</h3>
      <button onClick={handleShareSheet6}>Share Sheet</button>

      <h3>Share Sheet with a Image but empty file name</h3>
      <button onClick={handleShareSheet7}>Share Sheet</button>

      <h3>Share Sheet with a Image with null or undefined filename</h3>
      <button onClick={handleShareSheet8}>Share Sheet</button>

      <h3>Share Sheet with invalid png </h3>
      <button onClick={handleShareSheet9}>Share Sheet</button>

      <h3>Share Sheet with empty png </h3>
      <button onClick={handleShareSheet10}>Share Sheet</button>
    </div>
  );
}

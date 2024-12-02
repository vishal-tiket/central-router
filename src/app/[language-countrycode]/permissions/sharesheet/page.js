"use client";

import { SharefilesWithContent } from "@tiket/react-common-navigator-permission";

export default function ShareSheetTesting() {
  const handleShareSheet = async () => {
    if (typeof window === "undefined") return;
    try {
      const result = await SharefilesWithContent({
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
        analytic: {
          event: "click",
          eventCategory: "shareWin",
          eventLabel: "shareButtonChooseApp",
          campaignName: "WinterPromo2024",
          url: "onelink.tiket.com/shareoct",
          campaignStatus: "Active",
          eventAction: "clickBack",
          screenName: "shareWin",
          screenOwner: "memeber",
          vertical: "memeber",
        },
      });
    } catch (e) {
      console.log("error caught", e);
    }
  };

  const handleShareSheet1 = async () => {
    if (typeof window === "undefined") return;
    try {
      const result = await SharefilesWithContent({
        mimeType: "text/plain",
        message: "This title \nThis message \nhttps://google.com/",
        analytic: {
          event: "click",
          eventCategory: "shareWin",
          campaignStatus: "Active",
          eventAction: "clickBack",
          screenName: "shareWin",
          vertical: "memeber",
        },
      });
    } catch (e) {
      console.log("error caught", e);
    }
  };

  const handleShareSheet2 = async () => {
    if (typeof window === "undefined") return;
    try {
      const result = await SharefilesWithContent({
        files: [
          {
            url: `${window.location.origin}/api/download-img`,
            name: "dummy-image.png",
          },
        ],
        mimeType: "image/*",
        message: "This title \nThis message \nhttps://google.com/",
        analytic: {
          event: "click",
          eventCategory: "shareWin",
          campaignStatus: "Active",
          eventAction: "clickBack",
          screenName: "shareWin",
          vertical: "memeber",
        },
      });
    } catch (e) {
      console.log("error caught", e);
    }
  };

  const handleShareSheet3 = async () => {
    if (typeof window === "undefined") return;
    try {
      const result = await SharefilesWithContent({
        files: [
          {
            url: `${window.location.origin}/api/download-img`,
            name: "dummy-image.png",
          },
        ],
        mimeType: "image/*",
        analytic: {
          event: "click",
          eventCategory: "shareWin",
          campaignStatus: "Active",
          eventAction: "clickBack",
          screenName: "shareWin",
          vertical: "memeber",
        },
      });
    } catch (e) {
      console.log("error caught", e);
    }
  };
  return (
    <div>
      <h1>Testing for Share Sheet Buttons</h1>
      <h3>Share Sheet with PDF , Image and Message </h3>
      <button onClick={handleShareSheet}>Share Sheet</button>
      <h3>Share Sheet with Message Only </h3>
      <button onClick={handleShareSheet1}>Share Sheet</button>
      <h3>Share Sheet with Image and Message </h3>
      <button onClick={handleShareSheet2}>Share Sheet</button>
      <h3>Share Sheet with Image Only </h3>
      <button onClick={handleShareSheet3}>Share Sheet</button>
    </div>
  );
}

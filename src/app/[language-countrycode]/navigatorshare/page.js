"use client";

export default function NavigatorShare() {
  const getFileNameFromContentDisposition = (disposition) => {
    let fileName = "";
    if (disposition && disposition.indexOf("attachment") !== -1) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(disposition);
      if (matches != null && matches[1]) {
        fileName = matches[1].replace(/['"]/g, "");
      }
    }
    return fileName;
  };

  const getFileDataFromUrl = async () => {
    try {
      const response = await fetch(
        "https://images.unsplash.com/photo-1510505678115-f2a7ae4cfea9?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      );

      if (!response.ok) {
        throw new Error("Fetching file from url failed!");
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Get the MIME type from the blob
      const mimeType = blob.type;
      console.log("[share feat]: mimeType", mimeType);

      // Extract the file name from the Content-Disposition header
      const disposition = response.headers.get("Content-Disposition");
      const fileName =
        getFileNameFromContentDisposition(disposition) || "something.jpeg";
      console.log("[share feat]: fileName", fileName);

      const file = new File([blob], fileName, { type: mimeType });
      console.log("[share feat]: file", file);

      return { file };
    } catch (error) {
      console.log("Failed to get file data", JSON.stringify(error));
    }
  };

  const shareFile = async () => {
    const file = await getFileDataFromUrl();
    try {
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
        });
      } else {
        console.log("Sharing files is not supported");
      }
    } catch (error) {
      console.log("Failed to share file", JSON.stringify(error));
    }
  };

  return (
    <div>
      <h1>Navigator Share</h1>
      <button onClick={shareFile}>Share</button>
    </div>
  );
}

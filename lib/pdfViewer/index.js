import React from "react";

const PdfViewer = ({ base64String }) => {
  const pdfData = base64String;

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <iframe
        src={pdfData}
        title="PDF Viewer"
        style={{ height: "100%", width: "100%", border: "none" }}
      />
    </div>
  );
};

export default PdfViewer;

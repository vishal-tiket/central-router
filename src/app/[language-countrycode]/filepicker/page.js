"use client";
import { useEffect, useRef, useState } from "react";
import PdfViewer from "../../../../lib/pdfViewer";

export default function ImagePicker() {
  const [image, setImage] = useState(null);
  const [singleImageFile, setSingleImageFile] = useState(null);
  const [singlePDFFile, setSinglePDFFile] = useState(null);
  const [multipleImageFiles, setMultipleImageFiles] = useState(null);

  const handleMultipleFileChange = (e, setState) => {
    Object.keys(e.target.files).map((_) => {
      const src = URL.createObjectURL(e.target.files[_]);
      setState((prev) => (prev ? [...prev, src] : [src]));
    });
  };

  const handleFileChange = (e, setState) => {
    const src = URL.createObjectURL(e.target.files[0]);
    setState(src);
  };

  return (
    <>
      {/* File upload with capture */}
      <h3>File Upload with capture</h3>
      <input
        type="file"
        style={{ margin: "20px 0" }}
        capture="user"
        onChange={(e) => handleFileChange(e, setImage)}
      />
      {image && (
        <img
          src={image || "#"}
          alt="Image Preview"
          width={100}
          height={100}
          style={{ objectFit: "cover" }}
        />
      )}
      {/* Single Image Picker */}
      <h2>Single Image File Picker</h2>
      <input
        type="file"
        accept="image/*"
        style={{ margin: "20px 0" }}
        onChange={(e) => handleFileChange(e, setSingleImageFile)}
      />
      {singleImageFile && (
        <img
          src={singleImageFile || "#"}
          alt="Image Preview"
          width={100}
          height={100}
          style={{ objectFit: "cover" }}
        />
      )}
      {/* Multiple Image Picker */}
      <h2>Multiple Image File Picker</h2>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleMultipleFileChange(e, setMultipleImageFiles)}
      />
      {multipleImageFiles && ( // Display multiple images preview if available else null
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {multipleImageFiles.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt="Image Preview"
              width={100}
              height={100}
              style={{ objectFit: "cover" }}
            />
          ))}
        </div>
      )}
      {/* Single Pdf Picker */}
      <h2>Single Pdf File Picker</h2>
      <input
        type="file"
        accept="application/pdf"
      />

      {/* Multiple Pdf Picker */}
      <h2>Multiple Pdf File Picker</h2>
      <input type="file" accept="application/pdf" multiple />

      {/* Multiple Mime type picker */}
      <h2>
        Multiple Mime Type File Picker <i>{`accept=image/*,application/pdf`}</i>
      </h2>
      <input type="file" accept="image/*,application/pdf" multiple />
      {/* Multiple Mime type picker */}
      <h2>
        Multiple Mime Type File Picker <i>{`without accept attribute`}</i>
      </h2>
      <input type="file" multiple />;
    </>
  );
}

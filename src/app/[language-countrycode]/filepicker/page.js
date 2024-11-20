"use client";
import { useState } from "react";

export default function ImagePicker() {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const src = URL.createObjectURL(e.target.files[0]);
    setImage(src);
  };

  return (
    <>
      {/* File upload with capture */}
      <h3>File Upload with capture</h3>
      <input
        type="file"
        style={{ margin: "20px 0" }}
        capture="user"
        onChange={handleFileChange}
      />
      <img src={image || "#"} alt="Image Preview" />

      {/* Single Image Picker */}
      <h2>Single Image File Picker</h2>
      <input type="file" accept="image/*" />
      {/* Multiple Image Picker */}
      <h2>Multiple Image File Picker</h2>
      <input type="file" accept="image/*" multiple />
      {/* Single Pdf Picker */}
      <h2>Single Pdf File Picker</h2>
      <input type="file" accept="application/pdf" />
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
      <input type="file" multiple />
    </>
  );
}

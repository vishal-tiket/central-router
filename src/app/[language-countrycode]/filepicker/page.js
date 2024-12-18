"use client";
import { useEffect, useRef, useState } from "react";

import { Worker, Viewer } from "@react-pdf-viewer/core";
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function ImagePicker() {
  const [image, setImage] = useState(null);
  const [singleImageFile, setSingleImageFile] = useState(null);
  const [multipleImageFiles, setMultipleImageFiles] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [multiplePdfFiles, setMultiplePdfFiles] = useState(null);
  const [pdfLoader, setPdfLoader] = useState(false);
  const [multipleFileData, setMultipleFileData] = useState(null);
  const [multipleRandomFileData, setMultipleRandomFileData] = useState(null);

  const fileType = ["application/pdf"];
  const handleChange = (e) => {
    let selectedFiles = e.target.files[0];
    if (selectedFiles) {
      if (selectedFiles && fileType.includes(selectedFiles.type)) {
        let reader = new FileReader();
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
        };
        reader.readAsDataURL(selectedFiles);
      }
    }
  };

  const handleMultiplePDFChange = (e) => {
    setPdfLoader(true);
    let selectedFiles = e.target.files;
    if (selectedFiles) {
      console.log(Object.keys(selectedFiles));
      Object.keys(selectedFiles).map((_) => {
        if (selectedFiles[_] && fileType.includes(selectedFiles[_].type)) {
          let reader = new FileReader();
          reader.onloadend = (e) => {
            setMultiplePdfFiles((temp) =>
              temp ? [...temp, e.target.result] : [e.target.result]
            );
            setPdfLoader(false);
          };
          reader.readAsDataURL(selectedFiles[_]);
        }
      });
    }
  };

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

  const handleChangeMultipleFileData = (e) => {
    // get names of each file and set the state
    const files = e.target.files;
    const names = Object.keys(files).map((_) => files[_].name);
    setMultipleFileData(names);
  };

  const handleChangeMultipleRandomFileData = (e) => {
    // get names of each file and set the state
    const files = e.target.files;
    const names = Object.keys(files).map((_) => files[_].name);
    setMultipleRandomFileData(names);
  };

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

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
      <input type="file" accept="application/pdf" onChange={handleChange} />
      {pdfFile && (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <div style={{ width: "100%", height: "200px", margin: "20px 0" }}>
            <Viewer
              fileUrl={pdfFile}
              plugins={[
                // Register plugins
                defaultLayoutPluginInstance,
              ]}
            />
          </div>
        </Worker>
      )}
      {/* Multiple Pdf Picker */}
      <h2>Multiple Pdf File Picker</h2>

      {pdfLoader && <p>Loading...</p>}
      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={handleMultiplePDFChange}
      />
      {multiplePdfFiles &&
        multiplePdfFiles.map((mu, idx) => (
          <Worker
            workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"
            key={idx}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ width: "100%", height: "200px" }}>
                <Viewer
                  fileUrl={mu}
                  plugins={[
                    // Register plugins
                    defaultLayoutPluginInstance,
                  ]}
                />
              </div>
            </div>
          </Worker>
        ))}
      {/* Multiple Mime type picker */}
      <h2>
        Multiple Mime Type File Picker <i>{`accept=image/*,application/pdf`}</i>
      </h2>
      <input
        type="file"
        accept="image/*,application/pdf"
        multiple
        onChange={handleChangeMultipleFileData}
      />
      {multipleFileData &&
        multipleFileData.map((file, idx) => (
          <p key={idx}>
            ({idx}). {file}
          </p>
        ))}
      {/* Multiple Mime type picker */}
      <h2>
        Multiple Mime Type File Picker <i>{`without accept attribute`}</i>
      </h2>
      <input
        type="file"
        multiple
        onChange={handleChangeMultipleRandomFileData}
      />
      {multipleRandomFileData &&
        multipleRandomFileData.map((file, idx) => (
          <p key={idx}>
            ({idx}). {file}
          </p>
        ))}
    </>
  );
}

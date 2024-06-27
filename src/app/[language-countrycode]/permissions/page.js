"use client";

import { useRef } from "react";

export default function Permissions() {
  const cameraRef = useRef(null);
  const startCamera = async () => {
    console.log("startCamera");
    if (
      "mediaDevices" in navigator &&
      "getUserMedia" in navigator.mediaDevices
    ) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: "100%",
          height: 220,
        },
      });
      cameraRef.current.srcObject = stream;
    }
  };
  const stopCamera = async () => {
    console.log("stopCamera");
    if (cameraRef.current.srcObject) {
      cameraRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };
  return (
    <>
      <h2>Permission</h2>
      <h3>Camera</h3>
      <button onClick={startCamera}>Play</button>
      <button onClick={stopCamera}>Pause</button>
      <video
        ref={cameraRef}
        style={{
          border: "1px solid black",
          margin: "20px 0",
          width: "100%",
          height: "220px",
        }}
      />
    </>
  );
}

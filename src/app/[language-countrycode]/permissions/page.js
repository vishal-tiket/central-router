"use client";

import { useRef, useState } from "react";

export default function Permissions() {
  const cameraRef = useRef(null);
  const microphoneRef = useRef(null);

  const [cameraState, setCameraState] = useState(false);
  const [microphoneState, setMicrophoneState] = useState(false);

  const startCamera = async () => {
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
      setCameraState(true);
      cameraRef.current.srcObject = stream;
    }
  };
  const stopCamera = async () => {
    if (cameraRef.current.srcObject) {
      cameraRef.current.srcObject.getTracks().forEach((track) => track.stop());
      setCameraState(false);
    }
  };

  const startMicrophone = async () => {
    console.log("startMicrophone");
    if (
      "mediaDevices" in navigator &&
      "getUserMedia" in navigator.mediaDevices
    ) {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setMicrophoneState(true);
      microphoneRef.current.srcObject = stream;
    }
  };
  const stopMicrophone = async () => {
    console.log("stopMicrophone");
    if (microphoneRef.current.srcObject) {
      microphoneRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());

      setMicrophoneState(false);
    }
  };
  return (
    <>
      <h2>Permissions</h2>
      <h3>Camera</h3>
      <button onClick={startCamera}>Play</button>
      <button onClick={stopCamera}>Pause</button>
      {cameraState && (
        <video
          ref={cameraRef}
          style={{
            border: "1px solid black",
            margin: "20px 0",
            width: "100%",
            height: "220px",
          }}
        />
      )}

      <h3>Microphone</h3>
      <button onClick={startMicrophone}>Play</button>
      <button onClick={stopMicrophone}>Pause</button>
      {microphoneState && (
        <audio
          ref={microphoneRef}
          style={{
            border: "1px solid black",
            margin: "20px 0",
            width: "100%",
            height: "30px",
          }}
        />
      )}
    </>
  );
}

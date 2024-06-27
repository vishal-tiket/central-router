"use client";

import { useState } from "react";

export default function Permissions() {
  const videoRef = useRef();
  const [camera, setCamera] = useState(null);
  const [microphone, setMicrophone] = useState({});
  const [location, setLocation] = useState({});

  const startCamera = async () => {
    console.log("startCamera");
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setCamera(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };

  const stopCamera = async () => {
    console.log("stopCamera");
    if (camera) {
      camera.getTracks().forEach((track) => track.stop());
      setCamera(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
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
      setMicrophone(stream);
    }
  };
  const stopMicrophone = async () => {
    console.log("stopMicrophone");
    if (microphone.getTracks) {
      microphone.getTracks().forEach((track) => track.stop());

      setMicrophone({});
    }
  };

  const getLocation = () => {
    console.log("getLocation");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(position);
      });
    }
  };
  return (
    <>
      <h2>Permissions</h2>
      <h3>Camera</h3>
      <button onClick={startCamera}>Play</button>
      <button onClick={stopCamera}>Pause</button>
      <video
        ref={videoRef}
        autoPlay
        style={{
          border: "1px solid black",
          margin: "20px 0",
          width: "100%",
          height: "220px",
        }}
      />

      <h3>Microphone</h3>
      <button onClick={startMicrophone}>Play</button>
      <button onClick={stopMicrophone}>Pause</button>
      <audio
        src={microphone}
        style={{
          border: "1px solid black",
          margin: "20px 0",
          width: "100%",
          height: "30px",
        }}
      />

      <h3>Location</h3>
      <button onClick={getLocation}>Get Location</button>
      {location?.coords && (
        <div style={{ margin: "20px 0" }}>
          {JSON.stringify({
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude,
          })}
        </div>
      )}

      <h3>File Upload</h3>
      <input type="file" />
    </>
  );
}

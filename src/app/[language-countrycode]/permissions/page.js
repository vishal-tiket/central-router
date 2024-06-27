"use client";

import { useRef, useState } from "react";
import "./style.css";

export default function Permissions() {
  const videoRef = useRef();
  const [camera, setCamera] = useState(null);
  const [microphone, setMicrophone] = useState(null);
  const [location, setLocation] = useState({});
  const [contacts, setContacts] = useState([]);

  const startCamera = async () => {
    console.log("startCamera");
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
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
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setMicrophone(mediaStream);
    } catch (error) {
      console.error("Error accessing audio devices.", error);
    }
  };

  const stopMicrophone = async () => {
    console.log("stopMicrophone");
    if (microphone) {
      microphone.getTracks().forEach((track) => track.stop());
      setMicrophone(null);
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

  const getContacts = async () => {
    if ("contacts" in navigator && "select" in navigator.contacts) {
      const props = ["name", "tel"];
      const opts = { multiple: true };

      try {
        const contacts = await navigator.contacts.select(props, opts);
        setContacts(contacts);
      } catch (e) {
        setContacts(e);
      }
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
      {microphone && (
        <div style={{ margin: "20px 0" }}>Microphone should be working</div>
      )}

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
      <input type="file" style={{ margin: "20px 0" }} />

      <h3>FE Contact Picker</h3>
      <button onClick={getContacts}>Get Contacts</button>
      <div style={{ margin: "20px 0" }}>{JSON.stringify(contacts)}</div>

      <h3>Open Phone Dialer with given phone number</h3>
      <a href="tel:+91 1234567890">Call 1234567890</a>
    </>
  );
}

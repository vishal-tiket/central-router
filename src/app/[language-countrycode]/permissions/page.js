"use client";

import { useEffect, useRef, useState } from "react";
import "./style.css";

export default function Permissions() {
  const videoRef = useRef();
  const [camera, setCamera] = useState(null);
  const [microphone, setMicrophone] = useState(null);
  const [location, setLocation] = useState({});
  const [contacts, setContacts] = useState([]);
  const [notificationError, setNotificationError] = useState("");
  const [clipboardData, setClipboardData] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState("");
  const [multiplePermissions, setMultiplePermissions] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  useEffect(() => {
    if (!("Notification" in window)) return;
    setNotificationPermission(Notification.permission);
  }, []);

  const startCamera = async () => {
    console.log("startCamera");
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setCamera(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        console.log("videoRef srcobject", videoRef.current.srcObject);
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };

  const getCameraPermission = async () => {
    console.log("startCamera");
    try {
      const mediaStream = await navigator?.mediaDevices?.getUserMedia({
        video: true,
      });
      return "granted";
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };

  const getMicrophonePermission = async () => {
    console.log("startMicrophone");
    try {
      const mediaStream = await navigator?.mediaDevices?.getUserMedia({
        audio: true,
      });
      return "granted";
    } catch (error) {
      console.error("Error accessing audio devices.", error);
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
      const stream = await navigator?.mediaDevices?.getUserMedia({
        audio: true,
      });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/mp3" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        audioChunks.current = [];
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing the microphone", error);
    }
  };

  const stopMicrophone = async () => {
    console.log("stopMicrophone");
    mediaRecorder.current.stop();
    setIsRecording(false);
  };

  const getLocation = () => {
    console.log("getLocation");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(position);
      });
    }
  };

  const getLocationPermission = () => {
    console.log("getLocation");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        return "granted";
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

  function showNotification() {
    let title = "Hello There!!";
    let body = "Message to be displayed";

    let notification = new Notification(title, { body });

    notification.onclick = () => {
      notification.close();
      window.parent.focus();
    };
  }

  const getNotification = () => {
    console.log("getNotification", "Notification" in window);
    if (!("Notification" in window)) {
      console.log("This browser does not support notification");
    } else if (Notification.permission === "granted") {
      console.log("Notification permission is granted show notification");
      showNotification();
    } else if (Notification.permission !== "denied") {
      console.log("Notification permission is not denied, request permission");
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission", permission);
        if (permission === "granted") {
          console.log("Notification permission is granted show notification");
          showNotification();
        }
      });
    } else {
      console.log("Notification permission is denied");
      setNotificationError("Notification permission is denied");
    }
  };

  const copyToClipboard = () => {
    // Writing to the clipboard
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText("Hello, Clipboard!").then(
        function () {
          console.log("Text copied to clipboard");
          setCopySuccess("Text copied to clipboard");
        },
        function (err) {
          console.error("Could not copy text: ", err);
          setCopySuccess(err);
        }
      );
    }
  };

  const getClipboardData = () => {
    // Reading from the clipboard
    if ("clipboard" in navigator) {
      navigator.clipboard.readText().then(
        function (text) {
          console.log("Pasted content: ", text);
          setClipboardData(text);
        },
        function (err) {
          console.error("Failed to read clipboard contents: ", err);
          setClipboardData(err);
        }
      );
    }
  };

  const getMultiplePermissions = async () => {
    try {
      const cameraPermission = await getCameraPermission();
      if (cameraPermission !== "granted") return;
      const microphonePermission = await getMicrophonePermission();
      if (microphonePermission !== "granted") return;
      const locationPermission = await getLocationPermission();
      if (locationPermission !== "granted") return;
      if (
        cameraPermission === "granted" &&
        microphonePermission === "granted" &&
        locationPermission === "granted"
      ) {
        setMultiplePermissions("All permissions granted");
      } else {
        setMultiplePermissions("All permissions not granted");
      }
    } catch (error) {
      console.error("Error fetching permissions", error);
      setMultiplePermissions(error);
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
      {audioURL && (
        <div>
          <audio src={audioURL} controls style={{ marginTop: "20px" }}></audio>
          <a href={audioURL} download="recording.mp3">
            Download recording
          </a>
        </div>
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

      <h3>Send Email</h3>
      <a href="mailto: johndoe@gmail.com">send email to johndoe@gmail.com</a>

      <h3>Notification</h3>
      <button onClick={getNotification}>Show Notification</button>
      <div style={{ margin: "20px 0" }}>{notificationError}</div>

      <h3>Set Calendar Events</h3>
      {/* <a href="webcal://drive.google.com/uc?export=download&id=1BMqfObNnwx-9BXWfwpyGTEL00F0UlyOt">
        Add to Calendar
      </a> */}
      <a href="webcal://m.vipul-pandit.in/api/webcal?start=20240630T073500Z&end=20240630T134100Z">
        Add to Calendar
      </a>

      <h3>Clipboard</h3>
      <button onClick={copyToClipboard}>Copy to Clipboard</button>
      {copySuccess && (
        <div style={{ margin: "20px 0" }}>{JSON.stringify(copySuccess)}</div>
      )}
      <button onClick={getClipboardData}>Paste from Clipboard</button>
      {clipboardData && (
        <div style={{ margin: "20px 0" }}>{JSON.stringify(clipboardData)}</div>
      )}

      <h3>Notification Status</h3>
      <div style={{ margin: "20px 0" }}>
        Notification Permission: {notificationPermission}
      </div>

      <h3>Multiple Permissions</h3>
      <button onClick={getMultiplePermissions}>Get Multiple Permissions</button>
      <div style={{ margin: "20px 0" }}>
        {JSON.stringify(multiplePermissions)}
      </div>

      <h3>OTP AutoComplete</h3>
      <input autoComplete="one-time-code" placeholder="enter otp" />
    </>
  );
}

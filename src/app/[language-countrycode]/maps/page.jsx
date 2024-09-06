"use client";
import { openMaps } from "@tiket/react-common-navigator-permission";
import { useState } from "react";

export default function OpenMaps() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [gmapsPriority, setGmapsPriority] = useState(false);
  const [isDirection, setIsDirection] = useState(false);

  const handleOpenMaps = async () => {
    try {
      const result = await openMaps({
        latitude: Number(latitude),
        longitude: Number(longitude),
        address,
        gmapsPriority,
        isDirection,
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          fontSize: "20px",
          marginTop: "40px",
        }}
      >
        <div>
          <label>Latitude</label>
          <input
            type="text"
            placeholder="latitude"
            style={{ margin: "10px 0", height: "40px", fontSize: "19px" }}
            onChange={(e) => setLatitude(e.target.value)}
            value={latitude}
          />
        </div>
        <div>
          <label>Longitude</label>
          <input
            type="text"
            placeholder="longitude"
            style={{ margin: "10px 0", height: "40px", fontSize: "19px" }}
            onChange={(e) => setLongitude(e.target.value)}
            value={longitude}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            placeholder="address"
            style={{ margin: "10px 0", height: "40px", fontSize: "19px" }}
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <input
            id="gmapsPriority"
            type="checkbox"
            style={{ width: "fit-content", margin: "0 20px 0 0" }}
            onChange={(e) => setGmapsPriority(e.target.checked)}
            checked={gmapsPriority}
          />
          <label htmlFor="gmapsPriority">Gmaps Priority</label>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <input
            id="isDirection"
            type="checkbox"
            style={{ width: "fit-content", margin: "0 20px 0 0" }}
            onChange={(e) => setIsDirection(e.target.checked)}
            checked={isDirection}
          />
          <label htmlFor="isDirection">Is Direction</label>
        </div>
      </form>
      <button onClick={handleOpenMaps}>Open Maps</button>
    </>
  );
}

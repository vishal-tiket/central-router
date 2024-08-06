"use client";

export default function Maps() {
  const openMapUsingGeo = () => {
    window.location.href = "geo:0,0?q=37.7749,-122.4194";
  };

  const openMapsUsingWaze = () => {
    window.location.href = "waze://?ll=37.7749,-122.4194";
  };

  const openMapsUsingHereMaps = () => {
    window.location.href = "here-maps://?map=37.7749,-122.4194";
  };

  const openMapsUsingMaps = () => {
    window.location.href = "maps:0,0?q=37.7749,-122.4194";
  };

  const openMapsUsingComGoogle = () => {
    window.location.href = "comgooglemaps://?q=37.7749,-122.4194";
  };

  return (
    <>
      <button onClick={openMapUsingGeo}>Open Maps Using GEO</button>
      <button onClick={openMapsUsingWaze}>Open Maps Using Waze</button>
      <button onClick={openMapsUsingHereMaps}>Open Maps Using Here Maps</button>
      <button onClick={openMapsUsingMaps}>Open Maps Using Maps</button>
      <button onClick={openMapsUsingComGoogle}>
        Open Maps Using Com Google
      </button>
    </>
  );
}

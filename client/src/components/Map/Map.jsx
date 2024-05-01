import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import GeoCoderMarker from "../GeoCoderMarker/GeoCoderMarker";

const Map = ({ address, city, country }) => {
  const position = [51.505, -0.09];
  return (
    <MapContainer
      center={[53.35, 18.8]}
      zoom={1}
      scrollWheelZoom={true}
      style={{
        height: "40vh",
        width: "100%",
        marginTop: "20px",
        zIndex: 0,
        cursor: "grab",
        overflow: "hidden",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <div>
        <GeoCoderMarker address={`${address} ${city} ${country}`}/>
      </div>
    </MapContainer>
  );
};

export default Map;

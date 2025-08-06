"use client";

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 32.0853, // Tel Aviv example
  lng: 34.7818,
};

export default function Map() {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

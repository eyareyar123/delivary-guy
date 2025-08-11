"use client";

import { useEffect, useState } from "react";

import { GoogleMap, Marker } from "@react-google-maps/api";
import { DeliveryPoint, LatLng } from "@/types";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const telAvivPoint: LatLng = {
  lat: 32.0853, // Tel Aviv example
  lng: 34.7818,
};

type MapProps = {
  deliveryPoints: DeliveryPoint[];
};

export default function Map({ deliveryPoints }: MapProps) {
  const [center, setCenter] = useState<LatLng>(telAvivPoint);

  useEffect(() => {
    if (deliveryPoints.length > 0) {
      const lastPoint = deliveryPoints[deliveryPoints.length - 1];
      setCenter({
        lat: lastPoint.addressData.lat,
        lng: lastPoint.addressData.lng,
      });
    }
  }, [deliveryPoints]);

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      {deliveryPoints.map((point) => (
        <Marker
          key={point.id}
          position={{ lat: point.addressData.lat, lng: point.addressData.lng }}
        />
      ))}
    </GoogleMap>
  );
}

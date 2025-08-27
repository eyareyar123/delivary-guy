"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { DeliveryPoint, Driver, RouteOptimizeAPI } from "../types";

type CalcButtonProps = {
  deliveryPoints: DeliveryPoint[];
  drivers: Driver[];
};

export default function CalcRouteButton({
  deliveryPoints,
  drivers,
}: CalcButtonProps) {
  const [loading, setLoading] = useState(false);

  const calcRoute = async () => {
    setLoading(true);
    try {
      const DEPOT: DeliveryPoint = {
        id: 1756022516522,
        clientName: "Home",
        addressData: {
          fullAddress: "ראשית היישוב, Hogla, 38880, Israel",
          lat: 32.3850036,
          lng: 34.9307524,
          placeId: "ChIJoQOUq1ITHRURFEF65siLGEI",
        },
        crates: 10,
        preferredTime: "07:00",
      };
      const requestBody: RouteOptimizeAPI = {
        points: deliveryPoints,
        drivers: drivers,
        depot: DEPOT,
      };
      const res = await fetch("/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const data = await res.json();
      console.log("Optimized route:", data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={calcRoute}
      disabled={loading}
      className="w-64 h-64 text-4xl font-semibold"
    >
      {loading ? "Calculating..." : "Calc Route"}
    </Button>
  );
}

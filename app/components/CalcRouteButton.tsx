"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { DeliveryPoint, DriversData } from "../types";
import { RouteOptimizeRequest } from "../types/api";

type CalcButtonProps = {
  deliveryPoints: DeliveryPoint[];
  driversData: DriversData;
};

export default function CalcRouteButton({
  deliveryPoints,
  driversData,
}: CalcButtonProps) {
  const [loading, setLoading] = useState(false);

  const calcRoute = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          points: deliveryPoints,
          numberOfDrivers: driversData.numberOfDrivers,
        } as RouteOptimizeRequest),
      });
      const data = await res.json();
      console.log("Optimized route from server:", data);
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

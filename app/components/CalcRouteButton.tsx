"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { DeliveryPoint } from "../types";

type CalcButtonProps = {
  deliveryPoints: DeliveryPoint[];
};

export default function CalcRouteButton({ deliveryPoints }: CalcButtonProps) {
  const [loading, setLoading] = useState(false);

  const calcRoute = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ points: deliveryPoints, vehicleCount: 6 }),
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
    <Button onClick={calcRoute} disabled={loading}>
      {loading ? "Calculating..." : "Calc Route"}
    </Button>
  );
}

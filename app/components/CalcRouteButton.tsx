"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { DeliveryPoint, Driver } from "../types";

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
      const res = await fetch("/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          points: deliveryPoints,
          drivers: drivers,
        }),
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

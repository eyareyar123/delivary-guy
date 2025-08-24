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
    // send request to client here - WIP
  };

  return (
    <Button onClick={calcRoute} disabled={loading}>
      {loading ? "Calculating..." : "Calc Route"}
    </Button>
  );
}

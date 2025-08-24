"use client";

import {} from "react";
import { Button } from "@/app/components/ui/button";

export default function CalcRouteButton() {
  const calcRoute = async () => {
    console.log("sending calc route from client...");

    try {
      const res = await fetch("/api/distance"); // call your server route
      const data = await res.json();
      console.log("Client got response:", data);
    } catch (err) {
      console.error("Error calling API:", err);
    }
  };

  return (
    <Button
      size="lg"
      className="w-64 h-64 text-4xl font-semibold"
      onClick={calcRoute}
    >
      calc route
    </Button>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import DeliveryForm from "@/components/DelivaryForm";
import DeliveryList from "@/components/DeliveryList";
import DarkModeToggle from "@/components/DarkModeToggle";

type DeliveryPoint = {
  id: number;
  clientName: string;
  address: string;
  crates: number;
};

export default function Home() {
  const [deliveryPoints, setDeliveryPoints] = useState<DeliveryPoint[]>([]);

  const handleAddPoint = (
    clientName: string,
    address: string,
    crates: number
  ) => {
    const newPoint: DeliveryPoint = {
      id: Date.now(),
      clientName,
      address,
      crates,
    };
    setDeliveryPoints((prev) => [...prev, newPoint]);
  };

  return (
    <>
      <DarkModeToggle />

      <main className="min-h-screen p-20 bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <main className="flex items-center justify-center">
          <h1 className="text-4xl font-bold">Delivery Line Manager</h1>
        </main>

        <DeliveryForm onAdd={handleAddPoint} />

        <DeliveryList deliveryPoints={deliveryPoints} />
      </main>
    </>
  );
}

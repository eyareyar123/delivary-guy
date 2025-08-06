"use client";

import { useState } from "react";
import DeliveryForm from "@/components/DeliveryForm";
import DeliveryList from "@/components/DeliveryList";
import DarkModeToggle from "@/components/DarkModeToggle";
import { DeliveryPoint } from "@/types";

export default function Home() {
  const [deliveryPoints, setDeliveryPoints] = useState<DeliveryPoint[]>([]);

  const handleAddPoint = (NewDeliveryPoint: DeliveryPoint) => {
    setDeliveryPoints((prev) => [...prev, NewDeliveryPoint]);
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

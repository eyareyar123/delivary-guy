"use client";

import { useState } from "react";
import DeliveryForm from "@/components/DeliveryForm";
import DeliveryList from "@/components/DeliveryList";
import DarkModeToggle from "@/components/DarkModeToggle";
import { DeliveryPoint } from "@/types";
import Map from "@/components/Map";

export default function Home() {
  const [deliveryPoints, setDeliveryPoints] = useState<DeliveryPoint[]>([]);

  const handleAddPoint = (NewDeliveryPoint: DeliveryPoint) => {
    setDeliveryPoints((prev) => [...prev, NewDeliveryPoint]);
  };

  const handleDeletePoint = (id: number) => {
    setDeliveryPoints((prev) => prev.filter((point) => point.id !== id));
  };

  return (
    <>
      <DarkModeToggle />

      <main className="min-h-screen p-20 bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <main className="flex items-center justify-center">
          <h1 className="text-4xl font-bold">Delivery Line Manager</h1>
        </main>
        <Map />

        <DeliveryForm onAdd={handleAddPoint} />

        <DeliveryList
          deliveryPoints={deliveryPoints}
          onDelete={handleDeletePoint}
        />
      </main>
    </>
  );
}

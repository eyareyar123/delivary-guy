"use client";

import { useState } from "react";
import DeliveryForm from "@/components/DeliveryForm";
import DeliveryList from "@/components/DeliveryList";
import DarkModeToggle from "@/components/DarkModeToggle";
import { DeliveryPoint } from "@/types";
import Map from "@/components/Map";
import { LoadScript, Libraries } from "@react-google-maps/api";

const libraries: Libraries = ["places"];

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
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        libraries={libraries}
      >
        <DarkModeToggle />

        <main className="flex flex-col h-screen p-20 bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300 gap-y-6">
          <header className="flex items-center justify-center">
            <h1 className="text-4xl font-bold">Delivery Line Manager</h1>
          </header>

          <Map deliveryPoints={deliveryPoints} />

          <div className="flex justify-between items-center w-full max-h-100 ">
            <DeliveryForm onAdd={handleAddPoint} />

            <DeliveryList
              deliveryPoints={deliveryPoints}
              onDelete={handleDeletePoint}
            />
          </div>
        </main>
      </LoadScript>
    </>
  );
}

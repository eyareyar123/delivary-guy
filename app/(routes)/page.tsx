"use client";

import { useState } from "react";
import DeliveryForm from "@/app/components/DeliveryForm";
import DeliveryList from "@/app/components/DeliveryList";
import DarkModeToggle from "@/app/components/DarkModeToggle";
import { DeliveryPoint, Driver } from "@/app/types";
import Map from "@/app/components/Map";
import { LoadScript, Libraries } from "@react-google-maps/api";
import CalcRouteButton from "../components/CalcRouteButton";
import DriversForm from "../components/DriversForm";
import DriversDisplay from "../components/DriversDisplay";

const libraries: Libraries = ["places"];

export default function Home() {
  const [deliveryPoints, setDeliveryPoints] = useState<DeliveryPoint[]>([]);

  const [drivers, setDrivers] = useState<Driver[]>([]);

  const handleAddPoint = (NewDeliveryPoint: DeliveryPoint) => {
    setDeliveryPoints((prev) => [...prev, NewDeliveryPoint]);
  };

  const handleDeletePoint = (id: number) => {
    setDeliveryPoints((prev) => prev.filter((point) => point.id !== id));
  };

  const handleAddDrivers = (driversData: Driver) => {
    setDrivers((prev) => [...prev, driversData]);
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

          <div className="flex justify-between items-center w-full max-h-100 gap-x-5 ">
            <DeliveryForm onAdd={handleAddPoint} />

            <DriversForm onAdd={handleAddDrivers} driversData={drivers} />

            <DriversDisplay drivers={drivers} />

            <DeliveryList
              deliveryPoints={deliveryPoints}
              onDelete={handleDeletePoint}
            />
            <CalcRouteButton
              deliveryPoints={deliveryPoints}
              drivers={drivers}
            />
          </div>
        </main>
      </LoadScript>
    </>
  );
}

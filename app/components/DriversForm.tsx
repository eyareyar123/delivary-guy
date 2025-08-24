"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { DriversData } from "../types";

type DriversForm = {
  onAdd: (driversData: DriversData) => void;
  driversData: DriversData;
};

export default function DriversForm({ onAdd, driversData }: DriversForm) {
  const [numberOfDrivers, setNumberOfDrivers] = useState(
    driversData.numberOfDrivers
  );
  const [driverCapacity, setDriverCapacity] = useState(
    driversData.numberOfDrivers
  );

  const handleSubmit = () => {
    if (!numberOfDrivers || !driverCapacity) {
      alert("Please fill in all required fields.");
      return;
    }
    onAdd({ numberOfDrivers, driverCapacity });
  };

  const clearValues = () => {
    setDriverCapacity(0);
    setNumberOfDrivers(0);
  };

  return (
    <div className="w-100 h-100 flex flex-col space-y-6  bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors duration-300">
      <div>
        <Label
          htmlFor="numberOfDrivers"
          className="text-gray-700 dark:text-gray-300 font-semibold mb-1 block"
        >
          Number of Drivers
        </Label>
        <Input
          id="numberOfDrivers"
          type="number"
          value={numberOfDrivers}
          onChange={(e) => setNumberOfDrivers(parseInt(e.target.value) || 0)}
          placeholder="Number Of Drivers"
          min={0}
          className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
        />
      </div>

      <div>
        <Label
          htmlFor="driverCapacity"
          className="text-gray-700 dark:text-gray-300 font-semibold mb-1 block"
        >
          Capacity per Driver
        </Label>
        <Input
          id="driverCapacity"
          type="number"
          value={driverCapacity}
          onChange={(e) => setDriverCapacity(parseInt(e.target.value) || 0)}
          placeholder="Driver Capacity"
          min={0}
          className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
        />
      </div>

      <div className="flex space-x-4">
        <Button className="flex-1 px-6 py-3 text-lg" onClick={handleSubmit}>
          Save
        </Button>
        <Button
          variant="outline"
          className="flex-1 px-6 py-3 text-lg"
          onClick={clearValues}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}

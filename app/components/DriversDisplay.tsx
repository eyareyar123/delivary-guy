"use client";

import { DriversData } from "../types";

type DriversDisplayProps = {
  driversData: DriversData | null;
};

export default function DriversDisplay({ driversData }: DriversDisplayProps) {
  return (
    <div className="w-100 h-100 p-4 bg-gray-50 dark:bg-gray-800 rounded-md shadow-md text-gray-800 dark:text-gray-200">
      <h3 className="text-lg font-semibold mb-2">Drivers Info</h3>
      <p>
        <span className="font-semibold">Number of Drivers:</span>{" "}
        {driversData?.numberOfDrivers ?? 0}
      </p>
      <p>
        <span className="font-semibold">Capacity per Driver:</span>{" "}
        {driversData?.driverCapacity ?? 0}
      </p>
    </div>
  );
}

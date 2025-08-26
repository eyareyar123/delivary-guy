"use client";

import { Driver } from "../types";

type DriversDisplayProps = {
  drivers: Driver[];
};

export default function DriversDisplay({ drivers }: DriversDisplayProps) {
  return (
    // <div className="w-100 h-100 p-4 dark:bg-gray-800 rounded-md shadow-md">
    <ul className="h-full w-3/8 flex flex-wrap justify-center gap-6 overflow-y-scroll dark:bg-gray-800 p-5 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Drivers Info</h3>
      {drivers.map((driver) => (
        <li
          key={driver.id}
          className="min-w-[200px] h-20 flex p-6 justify-between items-center rounded shadow dark:bg-gray-50 text-gray-800 gap-5"
        >
          <p>
            <span className="font-semibold">Driver Name:</span> {driver.name}
          </p>
          <p>
            <span className="font-semibold">Driver Capacity:</span>{" "}
            {driver.capacity}
          </p>
        </li>
      ))}
    </ul>
    // </div>
  );
}

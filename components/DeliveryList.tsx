"use client";

import React from "react";

type DeliveryPoint = {
  id: number;
  clientName: string;
  address: string;
  crates: number;
};

type DeliveryListProps = {
  deliveryPoints: DeliveryPoint[];
};

export default function DeliveryList({ deliveryPoints }: DeliveryListProps) {
  return (
    <ul className="mt-8 space-y-4 max-w-lg mx-auto">
      {deliveryPoints.map((point) => (
        <li
          key={point.id}
          className="flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors duration-300"
        >
          <span className="text-xl">🧍</span>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              {point.clientName}
            </p>
            <p className="text-gray-600 dark:text-gray-400">{point.address}</p>
          </div>
          <div className="text-gray-700 dark:text-gray-300 font-medium">
            📦 {point.crates} crate{point.crates !== 1 ? "s" : ""}
          </div>
        </li>
      ))}
    </ul>
  );
}

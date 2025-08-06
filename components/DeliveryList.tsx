"use client";

import { DeliveryPoint } from "@/types";
import React from "react";

type DeliveryListProps = {
  deliveryPoints: DeliveryPoint[];
  onDelete: (id: number) => void;
};

export default function DeliveryList({
  deliveryPoints,
  onDelete,
}: DeliveryListProps) {
  return (
    <ul className="mt-8 space-y-4 max-w-lg mx-auto">
      {deliveryPoints.map((point) => (
        <li
          key={point.id}
          className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded shadow"
        >
          <div>
            <p className="font-semibold">{point.clientName}</p>
            <p className="text-sm text-gray-500">{point.address}</p>
            <p className="text-sm text-gray-400">
              📦 {point.crates} crate{point.crates !== 1 ? "s" : ""} — ⏰{" "}
              {point.preferredTime} ±1h
            </p>
          </div>
          <button
            onClick={() => onDelete(point.id)}
            className="text-red-600 hover:text-red-800 text-lg font-bold"
          >
            ✖
          </button>
        </li>
      ))}
    </ul>
  );
}

"use client";

import { DeliveryPoint } from "@/app/types";
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
    <ul className="h-full w-3/4 flex flex-wrap justify-center gap-6 p-3 overflow-auto">
      {deliveryPoints.map((point) => (
        <li
          key={point.id}
          className="w-3/10 min-w-[320px] h-20 flex p-6 justify-between items-center bg-white dark:bg-gray-800 rounded shadow"
        >
          <div>
            <p className="font-semibold">{point.clientName}</p>
            <p className="text-sm text-gray-500">
              {point.addressData.fullAddress}
            </p>
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

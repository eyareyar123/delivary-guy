"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import DeliveryForm from "@/components/DelivaryForm";

type DeliveryPoint = {
  id: number;
  clientName: string;
  address: string;
  crates: number;
};

export default function Home() {
  const [deliveryPoints, setDeliveryPoints] = useState<DeliveryPoint[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [clientName, setClientName] = useState("");
  const [address, setAddress] = useState("");
  const [crates, setCrates] = useState(0);

  // Dark mode state
  const [isDark, setIsDark] = useState(false);

  // On mount, check if user prefers dark or has saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else if (
      !savedTheme &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      // No saved theme, but OS prefers dark
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  // Toggle dark mode handler
  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const handleAddPoint = () => {
    const newPoint: DeliveryPoint = {
      id: Date.now(),
      clientName,
      address,
      crates,
    };
    setDeliveryPoints([...deliveryPoints, newPoint]);
    setClientName("");
    setAddress("");
    setCrates(0);
    setShowForm(false);
  };

  return (
    <>
      {/* Dark mode toggle button fixed top right */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          size="lg"
          className="px-8 py-4 text-xl font-semibold"
          onClick={toggleDarkMode}
        >
          {isDark ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>

      <main className="min-h-screen p-20 bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <main className="flex items-center justify-center">
          <h1 className="text-4xl font-bold">Delivery Line Manager</h1>
        </main>

        <div className="flex items-center justify-start bg-blue-500 mt-6 rounded-md">
          <Button
            className="px-6 py-3 text-lg"
            onClick={() => setShowForm(true)}
            variant="default"
          >
            Add Delivery Point
          </Button>
        </div>

        {showForm && (
          <DeliveryForm
            onAdd={handleAddPoint}
            onCancel={() => setShowForm(false)}
          />
        )}

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
                <p className="text-gray-600 dark:text-gray-400">
                  {point.address}
                </p>
              </div>
              <div className="text-gray-700 dark:text-gray-300 font-medium">
                📦 {point.crates} crate{point.crates !== 1 ? "s" : ""}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

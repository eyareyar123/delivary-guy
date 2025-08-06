"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import DeliveryForm from "@/components/DelivaryForm";
import DeliveryList from "@/components/DeliveryList";

type DeliveryPoint = {
  id: number;
  clientName: string;
  address: string;
  crates: number;
};

export default function Home() {
  const [deliveryPoints, setDeliveryPoints] = useState<DeliveryPoint[]>([]);
  const [showForm, setShowForm] = useState(false);

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

  const handleAddPoint = (
    clientName: string,
    address: string,
    crates: number
  ) => {
    const newPoint: DeliveryPoint = {
      id: Date.now(),
      clientName,
      address,
      crates,
    };
    setDeliveryPoints((prev) => [...prev, newPoint]);
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

        <DeliveryForm onAdd={handleAddPoint} />

        <DeliveryList deliveryPoints={deliveryPoints} />
      </main>
    </>
  );
}

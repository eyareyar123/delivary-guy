"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <Button size="sm" onClick={toggleDarkMode}>
          {isDark ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>

      <main className="min-h-screen p-8 bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <main className="flex items-center justify-center">
          <h1 className="text-4xl font-bold">Delivery Line Manager</h1>
        </main>

        <div className="flex items-center justify-start bg-blue-500 w-[70vw] mx-auto mt-6 rounded-md">
          <Button
            className="px-6 py-3 text-lg"
            onClick={() => setShowForm(true)}
            variant="default"
          >
            Add Delivery Point
          </Button>
        </div>

        {showForm && (
          <div className="flex flex-col space-y-6 mt-6 max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-colors duration-300">
            <div>
              <Label
                htmlFor="clientName"
                className="text-gray-700 dark:text-gray-300 font-semibold mb-1 block"
              >
                Client Name
              </Label>
              <Input
                id="clientName"
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Client Name"
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
              />
            </div>

            <div>
              <Label
                htmlFor="address"
                className="text-gray-700 dark:text-gray-300 font-semibold mb-1 block"
              >
                Address
              </Label>
              <Input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
              />
            </div>

            <div>
              <Label
                htmlFor="crates"
                className="text-gray-700 dark:text-gray-300 font-semibold mb-1 block"
              >
                Number of Crates
              </Label>
              <Input
                id="crates"
                type="number"
                value={crates}
                onChange={(e) => setCrates(parseInt(e.target.value) || 0)}
                placeholder="Crates"
                min={0}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
              />
            </div>

            <Button
              className="w-full px-6 py-3 text-lg"
              onClick={handleAddPoint}
            >
              Save
            </Button>
          </div>
        )}

        <ul style={{ marginTop: "2rem" }}>
          {deliveryPoints.map((point) => (
            <li key={point.id} className="mb-2">
              🧍 {point.clientName} — 📍 {point.address} — 📦 {point.crates}{" "}
              crate
              {point.crates !== 1 ? "s" : ""}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

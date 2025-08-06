"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type DeliveryFormProps = {
  onAdd: (clientName: string, address: string, crates: number) => void;
};

export default function DeliveryForm({ onAdd }: DeliveryFormProps) {
  const [clientName, setClientName] = useState("");
  const [address, setAddress] = useState("");
  const [crates, setCrates] = useState(0);

  const handleSubmit = () => {
    if (!clientName || !address) {
      alert("Please fill in all required fields.");
      return;
    }
    onAdd(clientName, address, crates);
    clearValues();
  };

  const clearValues = () => {
    setClientName("");
    setAddress("");
    setCrates(0);
  };

  return (
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

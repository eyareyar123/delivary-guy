"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AddressInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function AddressInput({ value, onChange }: AddressInputProps) {
  return (
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Address"
        className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
      />
    </div>
  );
}

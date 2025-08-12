"use client";

import { Autocomplete } from "@react-google-maps/api";
import { useRef, useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { AddressData } from "@/app/types";

type AddressInputProps = {
  onSelectPlace: (value: AddressData) => void;
};

export default function AddressInput({ onSelectPlace }: AddressInputProps) {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();
  const inputRef = useRef(null);

  const onLoad = (auto: google.maps.places.Autocomplete) =>
    setAutocomplete(auto);

  const onPlaceChanged = () => {
    if (!autocomplete) return;
    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) return;
    const location = place.geometry.location;

    if (!place.geometry.location || !place.formatted_address || !place.place_id)
      return;
    const parsedAddress: AddressData = {
      fullAddress: place.formatted_address,
      lat: location.lat(),
      lng: location.lng(),
      placeId: place.place_id,
    };

    onSelectPlace(parsedAddress);
  };

  return (
    <div>
      <Label
        htmlFor="address"
        className="text-gray-700 dark:text-gray-300 font-semibold mb-1 block"
      >
        Address
      </Label>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <Input
          id="address"
          type="text"
          ref={inputRef}
          placeholder="Address"
          className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
        />
      </Autocomplete>
    </div>
  );
}

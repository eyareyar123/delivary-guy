export type DriversData = {
  numberOfDrivers: number;
  driverCapacity: number;
};

export type DeliveryPoint = {
  id: number;
  clientName: string;
  addressData: AddressData;
  crates: number;
  preferredTime: string;
};

export type LatLng = {
  lat: number;
  lng: number;
};

export type AddressData = LatLng & {
  fullAddress: string; // The formatted address
  placeId: string;
};

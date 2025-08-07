export type DeliveryPoint = {
  id: number;
  clientName: string;
  addressData: AddressData;
  crates: number;
  preferredTime: string;
};

export type AddressData = {
  fullAddress: string; // The formatted address
  lat: number;
  lng: number;
  placeId: string;
};

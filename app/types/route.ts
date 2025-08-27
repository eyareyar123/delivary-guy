import { DeliveryPoint, Driver } from "@/app/types";

export type RouteOptimizeAPI = {
  points: DeliveryPoint[];
  drivers: Driver[];
  depot: DeliveryPoint;
};

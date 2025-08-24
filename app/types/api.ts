import { DeliveryPoint } from "./delivery";

export type RouteOptimizeRequest = {
  points: DeliveryPoint[];
  numberOfDrivers: number;
};

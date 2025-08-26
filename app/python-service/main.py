"""
FastAPI application defining models and an endpoint for solving
a simplified Vehicle Routing Problem with Time Windows (VRPTW).

This module provides:
- Data models for addresses, delivery points, and drivers.
- A request schema including delivery points, drivers, and a distance matrix.
- An endpoint `/solve-vrptw` that demonstrates basic route assignment.

Note:
    The current routing logic distributes delivery points across drivers
    in a round-robin manner and does not yet perform true optimization.
    start this by running `uvicorn main:app --reload --port 8000`
"""
from typing import List, Any
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class AddressData(BaseModel):
    """
    Represents a geographic address with coordinates and metadata.

    Attributes:
        lat (float): Latitude of the address.
        lng (float): Longitude of the address.
        placeId (str): Unique identifier from the place provider (e.g., Google Maps).
        fullAddress (str): Formatted, human-readable address string.
    """
    lat: float
    lng: float
    placeId: str
    fullAddress: str


class DeliveryPoint(BaseModel):
    """
    Represents a delivery point with client information and delivery details.

    Attributes:
        id (float): Unique identifier for the delivery point.
        clientName (str): Name of the client receiving the delivery.
        addressData (AddressData): Address information for the delivery.
        crates (int): Number of crates required for the delivery.
        preferredTime (str): Client's preferred delivery time window.
    """
    id: float
    clientName: str
    addressData: AddressData
    crates: int
    preferredTime: str


class Driver(BaseModel):
    """
    Represents a delivery driver and their carrying capacity.

    Attributes:
        id (float): Unique identifier for the driver.
        name (str): Driver's name.
        capacity (int): Maximum number of crates the driver can carry.
    """
    id: float
    name: str
    capacity: int


class RouteRequest(BaseModel):
    """
    Represents a request for solving the Vehicle Routing Problem with Time Windows (VRPTW).

    Attributes:
        points (List[DeliveryPoint]): A list of delivery points to be routed.
        drivers (List[Driver]): A list of available drivers.
        distanceMatrix (Any): Precomputed distance matrix between all delivery points and depots.
    """
    points: List[DeliveryPoint]
    drivers: List[Driver]
    distanceMatrix: Any


@app.post("/solve-vrptw")
async def solve_vrptw(request: RouteRequest):
    """
    Solve a simplified Vehicle Routing Problem with Time Windows (VRPTW).

    Args:
        request (RouteRequest): Request object containing delivery points,
            drivers, and the distance matrix.

    Returns:
        dict: A dictionary containing a list of routes, where each route is
        assigned to a driver with their allocated delivery point IDs.

    Notes:
        - This implementation is a placeholder. It does not use the distance matrix
          or perform optimization, but instead distributes delivery points in a
          round-robin fashion across the drivers.
        - Ensure that the `RouteRequest` model matches the fields used here.
    """
    print("Number of drivers:", len(request.drivers))
    print("Distance matrix received")

    vehicles = [{"vehicle": i + 1, "points": []} for i in range(len(request.drivers))]
    for idx, p in enumerate(request.points):
        vehicles[idx % len(request.drivers)]["points"].append(p.id)

    return {"routes": vehicles}

from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Any

app = FastAPI()

class AddressData(BaseModel):
    lat: float
    lng: float
    placeId: str
    fullAddress: str

class DeliveryPoint(BaseModel):
    id: int
    clientName: str
    addressData: AddressData
    crates: int
    preferredTime: str

class RouteRequest(BaseModel):
    points: List[DeliveryPoint]
    numberOfDrivers: int
    distanceMatrix: Any

@app.post("/solve-vrptw")
async def solve_vrptw(request: RouteRequest):
    print("Number of drivers:", request.numberOfDrivers)
    print("Distance matrix received")

    vehicles = [{"vehicle": i + 1, "points": []} for i in range(request.numberOfDrivers)]
    for idx, p in enumerate(request.points):
        vehicles[idx % request.numberOfDrivers]["points"].append(p.id)

    return {"routes": vehicles}

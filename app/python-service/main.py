from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Data models
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
    vehicleCount: int

@app.post("/solve-vrptw")
async def solve_vrptw(request: RouteRequest):
    # Dummy response: split points evenly per vehicle
    vehicles = [{"vehicle": i+1, "points": []} for i in range(request.vehicleCount)]
    for idx, p in enumerate(request.points):
        vehicles[idx % request.vehicleCount]["points"].append(p.id)
    return {"routes": vehicles}

@app.get("/health")
def health():
    return {"status": "alive"}

# Delivery-Guy Project

A **full-stack delivery management and optimization system**. The project provides a **Next.js frontend** for managing delivery points and drivers, integrates with **Google Maps APIs** for geocoding and routing, and uses a **Python FastAPI backend** with **Google OR-Tools** (planned) for solving the Vehicle Routing Problem (VRP), eventually extending to **VRPTW (Vehicle Routing Problem with Time Windows)**.

The system is designed for logistics-style optimization where multiple drivers must deliver crates to many clients, minimizing the number of drivers while respecting capacity and maximum work duration.

---

## ✨ Features

- **Delivery Point Management**

  - Add delivery points with client name, geolocation, and preferred time.
  - Address autocomplete and place details via **Google Maps Places API**.
  - Store crate counts per delivery.

- **Driver Management**

  - Add drivers with ID, name, and crate capacity.
  - All drivers start from a common depot (hardcoded for now).

- **Optimization**

  - Next.js backend fetches a **distance matrix** via Google Distance Matrix API.
  - Python FastAPI service solves the VRP using that matrix.
  - Optimization goal: minimize the number of active drivers while ensuring capacity and 10h driving limit per driver.
  - Future: handle **time windows** with earliest/latest delivery times.

- **Visualization**
  - Delivery points and routes displayed on a Google Map.
  - Clean UI using **shadcn/ui** components + Tailwind CSS.

---

## 🧱 Architecture

### Frontend & Middleware (Next.js)

- Framework: **Next.js (App Router)**
- Styling: **Tailwind CSS + shadcn/ui**
- Maps Integration: **@react-google-maps/api**
- Validation: **Zod** schemas (strict request validation)
- API Routes:
  - `/api/route-optimize`: Validates input, fetches Distance Matrix from Google, sends structured payload to Python.

### Backend Optimization (Python)

- Framework: **FastAPI**
- Planned Solver: **Google OR-Tools** for VRP/VRPTW
- Models:
  - `Driver` (id, name, capacity)
  - `DeliveryPoint` (id, clientName, addressData, crates, preferredTime)
  - `AddressData` (lat, lng, placeId, fullAddress)
  - `RouteRequest` (depot, points, drivers, distanceMatrix)
- Endpoint:
  - `POST /solve-vrptw`: Receives payload, solves VRP, returns optimized routes.

### Data Flow

1. User inputs delivery points + drivers in the UI.
2. Next.js validates and builds a Distance Matrix with Google Maps API.
3. Payload `{ depot, points, drivers, distanceMatrix }` sent to FastAPI.
4. FastAPI optimizer computes optimal routes.
5. Optimized routes returned and visualized on the map.

---

## 📦 Packages & Dependencies

### Frontend (Next.js)

- `next`
- `react`
- `@react-google-maps/api`
- `tailwindcss`
- `shadcn/ui`
- `zod`

### Backend (Python)

- `fastapi`
- `pydantic`
- `uvicorn`
- `ortools` (planned for optimization)

### External APIs

- **Google Maps Distance Matrix API**
- **Google Maps Places API** (for autocomplete + place details)

---

## 📂 Project Structure (planned)

```
app/
  ├─ page.tsx                # Home page
  ├─ api/
  │   └─ route-optimize/
  │       └─ route.ts        # API endpoint for optimization
  ├─ components/
  │   ├─ DeliveryList.tsx
  │   ├─ DeliveryForm.tsx
  │   ├─ AddressInput.tsx
  │   └─ Map.tsx
  ├─ zod-schemas/
  │   └─ RouteOptimizeSchemas.ts
  └─ types/
      └─ index.ts

python-service/
  ├─ main.py                 # FastAPI app
  └─ models.py               # Data models (Driver, DeliveryPoint, etc.)
```

---

## 🚀 Development Setup

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
pip install fastapi uvicorn pydantic ortools
uvicorn main:app --reload --port 8000
```

### Environment

- `NEXT_PRIVATE_GOOGLE_MAPS_API_KEY` — Google Maps API key (Distance Matrix, Places, etc.)

---

## 🔮 Roadmap

- [ ] Implement VRP solver with OR-Tools
- [ ] Add time windows (VRPTW)
- [ ] Visualize optimized routes on the map
- [ ] Support multiple depots
- [ ] Add heuristics/metaheuristics for larger datasets (>1000 points)

---

## 📝 Author

- **Eyar** — Full-stack developer, photographer, traveler, and cooking enthusiast. Passionate about building smart logistics tools and experimenting with maps + optimization.

"use server";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const RouteOptimizeSchema = z.object({
  points: z.array(
    z.object({
      id: z.number(),
      clientName: z.string(),
      addressData: z.object({
        lat: z.number(),
        lng: z.number(),
        fullAddress: z.string(),
        placeId: z.string(),
      }),
      crates: z.number(),
      preferredTime: z.string(),
    })
  ),
  drivers: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      capacity: z.number(),
    })
  ),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = RouteOptimizeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: `Invalid body, ${parsed.error}` },
      { status: 400 }
    );
  }
  const { points, drivers } = parsed.data;

  // Build origins and destinations
  const origins = points.map(
    (p) => `${p.addressData.lat},${p.addressData.lng}`
  );
  const destinations = origins;

  const apiKey = process.env.NEXT_PRIVATE_GOOGLE_MAPS_API_KEY!;
  const params = new URLSearchParams({
    origins: origins.join("|"),
    destinations: destinations.join("|"),
    mode: "driving",
    key: apiKey,
  });

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?${params}`
  );
  const distanceData = await res.json();

  const payload = { points, drivers, distanceMatrix: distanceData };

  try {
    const pythonRes = await fetch("http://localhost:8000/solve-vrptw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await pythonRes.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Python service unreachable" },
      { status: 500 }
    );
  }
}

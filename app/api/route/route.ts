"use server";

import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("Node.js received points:", body.points);

  // Send to Python FastAPI
  try {
    const pythonResponse = await fetch("http://localhost:8000/solve-vrptw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await pythonResponse.json();

    console.log("Python response:", data);
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error calling Python service:", err);
    return NextResponse.json(
      { error: "Python service unreachable" },
      { status: 500 }
    );
  }
}

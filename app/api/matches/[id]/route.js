import { NextResponse } from "next/server";

const API_KEY = process.env.FOOTBALL_API_KEY;
const API_BASE = "https://api-football-v1.p.rapidapi.com/v3";

export async function GET(request, { params }) {
  try {
    if (!API_KEY) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    console.log("[API] Fetching match details for ID:", params.id);

    const response = await fetch(`${API_BASE}/fixtures?id=${params.id}`, {
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      },
      next: { revalidate: 30 }, // Optional: cache for 30s (Next.js feature)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[API] Error (${response.status}):`, errorText);
      return NextResponse.json(
        { error: `API returned ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("[API] Match details response:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("[API] Error fetching match details:", error);
    return NextResponse.json(
      { error: "Failed to fetch match details" },
      { status: 500 }
    );
  }
}

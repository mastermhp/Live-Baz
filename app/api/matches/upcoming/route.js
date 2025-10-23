import { NextResponse } from "next/server";

const API_KEY = process.env.FOOTBALL_API_KEY;
const API_BASE = "https://v3.football-api-sports.io";

export async function GET(request) {
  try {
    console.log("[v0] === UPCOMING MATCHES DEBUG ===");
    console.log("[v0] API_KEY exists:", !!API_KEY);
    console.log("[v0] API_KEY value:", API_KEY ? `${API_KEY.substring(0, 5)}...` : "NOT SET");
    console.log(
      "[v0] All env keys:",
      Object.keys(process.env).filter((k) => k.includes("FOOTBALL") || k.includes("API"))
    );

    if (!API_KEY) {
      console.error("[v0] CRITICAL: API key not configured. Check Vars section in v0 sidebar.");
      return NextResponse.json(
        { error: "API key not configured. Please add FOOTBALL_API_KEY to Vars section." },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const days = searchParams.get("days") || "7";

    const today = new Date().toISOString().split("T")[0];
    const futureDate = new Date(Date.now() + parseInt(days) * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    console.log("[v0] Fetching upcoming matches from", today, "to", futureDate);

    const response = await fetch(
      `${API_BASE}/fixtures?dateFrom=${today}&dateTo=${futureDate}&status=NS`,
      {
        headers: {
          "x-api-key": API_KEY,
        },
      }
    );

    console.log("[v0] API Response Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[v0] API Error Response:", errorText);
      return NextResponse.json(
        { error: `API returned ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("[v0] Upcoming matches data received, results:", data.results);
    return NextResponse.json(data);
  } catch (error) {
    console.error("[v0] Error fetching upcoming matches:", error);
    return NextResponse.json(
      { error: "Failed to fetch upcoming matches", details: String(error) },
      { status: 500 }
    );
  }
}

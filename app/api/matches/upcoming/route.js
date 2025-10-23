import { NextResponse } from "next/server"

const API_KEY = process.env.FOOTBALL_API_KEY
const API_BASE = "https://v3.football.api-sports.io"

export async function GET(request) {
  try {
    console.log("[v0] === UPCOMING MATCHES DEBUG ===")
    console.log("[v0] API_KEY exists:", !!API_KEY)

    if (!API_KEY) {
      console.error("[v0] CRITICAL: API key not configured. Check Vars section in v0 sidebar.")
      return NextResponse.json(
        { error: "API key not configured. Please add FOOTBALL_API_KEY to Vars section." },
        { status: 500 },
      )
    }

    const { searchParams } = new URL(request.url)
    const days = searchParams.get("days") || "1"

    const today = new Date().toISOString().split("T")[0]

    // This reduces API calls from 7 per request to just 1
    console.log("[v0] Fetching matches for date:", today)

    const response = await fetch(`${API_BASE}/fixtures?date=${today}`, {
      headers: {
        "x-apisports-key": API_KEY,
      },
    })

    console.log("[v0] API Response Status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] API Error Response:", errorText)
      return NextResponse.json(
        { error: `API returned ${response.status}`, details: errorText },
        { status: response.status },
      )
    }

    const data = await response.json()
    console.log("[v0] Upcoming matches data received, total results:", data.results)

    // Return in same format as API
    return NextResponse.json({
      get: "fixtures",
      parameters: { date: today, days: 1 },
      errors: {},
      results: data.results || 0,
      paging: { current: 1, total: 1 },
      response: data.response || [],
    })
  } catch (error) {
    console.error("[v0] Error fetching upcoming matches:", error)
    return NextResponse.json({ error: "Failed to fetch upcoming matches", details: String(error) }, { status: 500 })
  }
}

import { NextResponse } from "next/server"

const API_KEY = process.env.RAPIDAPI_KEY
const API_HOST = "api-football-v1.p.rapidapi.com"
const API_BASE = "https://api-football-v1.p.rapidapi.com"

export async function GET() {
  try {
    console.log("[v0] === LIVE MATCHES DEBUG ===")
    console.log("[v0] API_KEY exists:", !!API_KEY)
    console.log("[v0] API_KEY value:", API_KEY ? `${API_KEY.substring(0, 5)}...` : "NOT SET")
    console.log(
      "[v0] All env keys:",
      Object.keys(process.env).filter((k) => k.includes("RAPIDAPI") || k.includes("API")),
    )

    if (!API_KEY) {
      console.error("[v0] CRITICAL: API key not configured. Check Vars section in v0 sidebar.")
      return NextResponse.json(
        { error: "API key not configured. Please add RAPIDAPI_KEY to Vars section." },
        { status: 500 },
      )
    }

    console.log("[v0] Fetching live matches")

    const response = await fetch(`${API_BASE}/v3/fixtures?live=all`, {
      headers: {
        "x-rapidapi-host": API_HOST,
        "x-rapidapi-key": API_KEY,
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
    console.log("[v0] Live matches data received, results:", data.results)
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching live matches:", error)
    return NextResponse.json({ error: "Failed to fetch live matches", details: String(error) }, { status: 500 })
  }
}

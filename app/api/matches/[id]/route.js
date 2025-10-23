import { NextResponse } from "next/server"

const API_KEY = process.env.FOOTBALL_API_KEY
const API_BASE = "https://v3.football.api-sports.io"

export async function GET(request, { params }) {
  try {
    if (!API_KEY) {
      console.error("[v0] CRITICAL: API key not configured")
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    console.log("[v0] Fetching match details for ID:", params.id)

    const response = await fetch(`${API_BASE}/fixtures?id=${params.id}`, {
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
    console.log("[v0] Match details received, results:", data.results)

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching match details:", error)
    return NextResponse.json({ error: "Failed to fetch match details", details: String(error) }, { status: 500 })
  }
}

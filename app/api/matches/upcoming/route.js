import { NextResponse } from "next/server"

const API_KEY = process.env.FOOTBALL_API_KEY
const API_BASE = "https://v3.football.api-sports.io"

export async function GET(request) {
  try {
    console.log("[v0] === UPCOMING MATCHES DEBUG ===")
    console.log("[v0] API_KEY exists:", !!API_KEY)
    console.log("[v0] API_KEY value:", API_KEY ? `${API_KEY.substring(0, 5)}...` : "NOT SET")
    console.log(
      "[v0] All env keys:",
      Object.keys(process.env).filter((k) => k.includes("FOOTBALL") || k.includes("API")),
    )

    if (!API_KEY) {
      console.error("[v0] CRITICAL: API key not configured. Check Vars section in v0 sidebar.")
      return NextResponse.json(
        { error: "API key not configured. Please add FOOTBALL_API_KEY to Vars section." },
        { status: 500 },
      )
    }

    const { searchParams } = new URL(request.url)
    const days = searchParams.get("days") || "7"

    const today = new Date().toISOString().split("T")[0]

    // Fetch matches for today and next N days by querying each date
    const allMatches = []
    const daysToFetch = Number.parseInt(days)

    for (let i = 0; i < daysToFetch; i++) {
      const queryDate = new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
      console.log("[v0] Fetching matches for date:", queryDate)

      const response = await fetch(`${API_BASE}/fixtures?date=${queryDate}`, {
        headers: {
          "x-apisports-key": API_KEY,
        },
      })

      console.log("[v0] API Response Status for", queryDate, ":", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("[v0] API Error Response:", errorText)
        continue
      }

      const data = await response.json()
      if (data.response && Array.isArray(data.response)) {
        allMatches.push(...data.response)
      }
    }

    console.log("[v0] Upcoming matches data received, total results:", allMatches.length)

    // Return in same format as API
    return NextResponse.json({
      get: "fixtures",
      parameters: { date: today, days: daysToFetch },
      errors: {},
      results: allMatches.length,
      paging: { current: 1, total: 1 },
      response: allMatches,
    })
  } catch (error) {
    console.error("[v0] Error fetching upcoming matches:", error)
    return NextResponse.json({ error: "Failed to fetch upcoming matches", details: String(error) }, { status: 500 })
  }
}

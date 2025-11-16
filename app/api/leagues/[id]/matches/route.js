const API_KEY = process.env.API_SPORTS_KEY
const API_BASE = "https://v3.football.api-sports.io"

export async function GET(request, { params }) {
  try {
    const { id } = params

    if (!API_KEY) {
      return Response.json(
        { error: "API key not configured. Please add API_SPORTS_KEY to environment variables." },
        { status: 500 },
      )
    }

    const options = {
      method: "GET",
      headers: {
        "x-apisports-key": API_KEY,
      },
    }

    // Fetch matches for the league
    const response = await fetch(
      `${API_BASE}/fixtures?league=${id}&season=${new Date().getFullYear()}&status=LIVE,FT,NS,PST`,
      options,
    )

    if (!response.ok) {
      return Response.json({ error: "Failed to fetch matches" }, { status: 500 })
    }

    const data = await response.json()
    console.log("[v0] League matches API response:", data.response?.length || 0, "matches")

    return Response.json({ response: data.response || [] })
  } catch (error) {
    console.error("[v0] League matches API error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

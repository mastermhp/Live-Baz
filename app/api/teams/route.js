const API_KEY = process.env.API_SPORTS_KEY
const API_BASE = "https://v3.football.api-sports.io"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const league = searchParams.get("league") || "39" // Default to Premier League
    const season = searchParams.get("season") || new Date().getFullYear()

    if (!API_KEY) {
      console.error("[v0] API key not configured")
      return Response.json({ error: "API key not configured" }, { status: 500 })
    }

    const options = {
      method: "GET",
      headers: {
        "x-apisports-key": API_KEY,
      },
    }

    // Fetch teams from top leagues
    const response = await fetch(`${API_BASE}/teams?league=${league}&season=${season}`, options)

    if (!response.ok) {
      console.error("[v0] Teams API error:", response.status)
      return Response.json({ error: "Failed to fetch teams" }, { status: 500 })
    }

    const data = await response.json()
    console.log("[v0] Teams API response:", data.response?.length || 0, "teams")

    return Response.json({ response: data.response || [] })
  } catch (error) {
    console.error("[v0] Teams API error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

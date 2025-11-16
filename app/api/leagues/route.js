const API_KEY = process.env.API_SPORTS_KEY
const API_BASE = "https://v3.football.api-sports.io"

export async function GET() {
  try {
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

    // Fetch top leagues
    const response = await fetch(`${API_BASE}/leagues?type=league&current=true`, options)

    if (!response.ok) {
      console.error("[v0] Leagues API error:", response.status)
      return Response.json({ error: "Failed to fetch leagues" }, { status: 500 })
    }

    const data = await response.json()
    console.log("[v0] Leagues API response:", data.response?.length || 0, "leagues")

    // Transform and filter top leagues
    const topLeagues =
      data.response?.slice(0, 15).map((league) => ({
        id: league.league.id,
        name: league.league.name,
        country: league.country.name,
        logo: league.league.logo,
        flag: league.country.flag,
        season: league.seasons?.[0]?.year || new Date().getFullYear(),
      })) || []

    return Response.json({ response: topLeagues })
  } catch (error) {
    console.error("[v0] Leagues API error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

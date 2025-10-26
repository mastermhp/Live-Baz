export async function GET() {
  try {
    const apiKey = process.env.RAPIDAPI_KEY
    if (!apiKey) {
      return Response.json({ error: "API key not configured" }, { status: 500 })
    }

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      },
    }

    // Fetch top leagues
    const response = await fetch("https://api-football-v1.p.rapidapi.com/v3/leagues?type=league&current=true", options)

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

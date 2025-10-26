export async function GET(request, { params }) {
  try {
    const { id } = params
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

    // Fetch matches for the league
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${id}&season=${new Date().getFullYear()}&status=LIVE,FT,NS,PST`,
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

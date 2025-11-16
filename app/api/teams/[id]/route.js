const API_KEY = process.env.API_SPORTS_KEY
const API_BASE = "https://v3.football.api-sports.io"

export async function GET(request, { params }) {
  try {
    const { id } = await params
    const season = new Date().getFullYear()

    if (!API_KEY) {
      return Response.json({ error: "API key not configured" }, { status: 500 })
    }

    const options = {
      method: "GET",
      headers: {
        "x-apisports-key": API_KEY,
      },
    }

    // Fetch team statistics
    const statsResponse = await fetch(`${API_BASE}/teams/statistics?team=${id}&season=${season}&league=39`, options)
    
    // Fetch team fixtures
    const fixturesResponse = await fetch(`${API_BASE}/fixtures?team=${id}&last=10`, options)

    if (!statsResponse.ok || !fixturesResponse.ok) {
      console.error("[v0] Team details API error")
      return Response.json({ error: "Failed to fetch team details" }, { status: 500 })
    }

    const statsData = await statsResponse.json()
    const fixturesData = await fixturesResponse.json()

    return Response.json({
      statistics: statsData.response || null,
      fixtures: fixturesData.response || [],
    })
  } catch (error) {
    console.error("[v0] Team details API error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

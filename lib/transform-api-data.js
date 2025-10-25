// Transform a single match object
export function transformMatch(apiMatch) {
  const fixture = apiMatch.fixture
  const goals = apiMatch.goals
  const status = fixture.status.short

  // Map API status to your status format
  const statusMap = {
    NS: "upcoming",
    "1H": "live",
    HT: "live",
    "2H": "live",
    ET: "live",
    P: "live",
    FT: "finished",
    AET: "finished",
    PEN: "finished",
    CANC: "cancelled",
    ABD: "abandoned",
    AWD: "awarded",
    WO: "walkover",
  }

  const matchStatus = statusMap[status] || "upcoming"
  const minute = fixture.status.elapsed || 0

  const statistics = apiMatch.statistics || []
  const homeStats = statistics[0]?.statistics || []
  const awayStats = statistics[1]?.statistics || []

  // Helper function to get stat value
  const getStatValue = (stats, statType) => {
    const stat = stats.find((s) => s.type === statType)
    return stat ? Number.parseInt(stat.value) || 0 : 0
  }

  return {
    id: fixture.id,
    league: apiMatch.league.name,
    homeTeam: apiMatch.teams.home.name,
    awayTeam: apiMatch.teams.away.name,
    homeScore: goals.home || 0,
    awayScore: goals.away || 0,
    status: matchStatus,
    minute: matchStatus === "live" ? minute : 0,
    time: fixture.date
      ? new Date(fixture.date).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "",
    homeWinPercent: 0,
    drawPercent: 0,
    awayWinPercent: 0,
    btts: 0,
    over25: 0,
    statistics: {
      home: {
        shotsOnGoal: getStatValue(homeStats, "Shots on Goal"),
        shots: getStatValue(homeStats, "Shots"),
        possession: getStatValue(homeStats, "Ball Possession"),
        passes: getStatValue(homeStats, "Passes"),
        passAccuracy: getStatValue(homeStats, "Pass Accuracy %"),
        fouls: getStatValue(homeStats, "Fouls"),
        yellowCards: getStatValue(homeStats, "Yellow Cards"),
        redCards: getStatValue(homeStats, "Red Cards"),
        corners: getStatValue(homeStats, "Corner Kicks"),
        offsides: getStatValue(homeStats, "Offsides"),
      },
      away: {
        shotsOnGoal: getStatValue(awayStats, "Shots on Goal"),
        shots: getStatValue(awayStats, "Shots"),
        possession: getStatValue(awayStats, "Ball Possession"),
        passes: getStatValue(awayStats, "Passes"),
        passAccuracy: getStatValue(awayStats, "Pass Accuracy %"),
        fouls: getStatValue(awayStats, "Fouls"),
        yellowCards: getStatValue(awayStats, "Yellow Cards"),
        redCards: getStatValue(awayStats, "Red Cards"),
        corners: getStatValue(awayStats, "Corner Kicks"),
        offsides: getStatValue(awayStats, "Offsides"),
      },
    },
    stadium: apiMatch.fixture.venue?.name || "Unknown",
    referee: apiMatch.fixture.referee || "Unknown",
    attendance: apiMatch.fixture.attendance || 0,
    homeTeamLogo: apiMatch.teams.home.logo,
    awayTeamLogo: apiMatch.teams.away.logo,
    leagueId: apiMatch.league.id,
    leagueLogo: apiMatch.league.logo,
  }
}

// Transform multiple matches at once
export function transformMatches(apiMatches) {
  return apiMatches.map(transformMatch)
}

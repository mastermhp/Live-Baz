// Transform a single match object
export function transformMatch(apiMatch) {
  const fixture = apiMatch.fixture;
  const goals = apiMatch.goals;
  const status = fixture.status.short;

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
  };

  const matchStatus = statusMap[status] || "upcoming";
  const minute = fixture.status.elapsed || 0;

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
    homeWinPercent: 0, // Can be filled later with prediction data
    drawPercent: 0,
    awayWinPercent: 0,
    btts: 0,
    over25: 0,
    // Additional fields from API
    stadium: apiMatch.fixture.venue?.name || "Unknown",
    referee: apiMatch.fixture.referee || "Unknown",
    attendance: apiMatch.fixture.attendance || 0,
    homeTeamLogo: apiMatch.teams.home.logo,
    awayTeamLogo: apiMatch.teams.away.logo,
    leagueId: apiMatch.league.id,
    leagueLogo: apiMatch.league.logo,
  };
}

// Transform multiple matches at once
export function transformMatches(apiMatches) {
  return apiMatches.map(transformMatch);
}

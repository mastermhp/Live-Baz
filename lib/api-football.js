// Fetch live matches for today
export async function getLiveMatches() {
  try {
    console.log("[v0] Client: Fetching live matches...");
    const response = await fetch("/api/matches/live");

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[v0] Client: API error:", errorData);
      return [];
    }

    const data = await response.json();
    console.log("[v0] Client: Live matches received:", data);
    return data.response || [];
  } catch (error) {
    console.error("[v0] Client: Error fetching live matches:", error);
    return [];
  }
}

// Fetch upcoming matches
export async function getUpcomingMatches(days = 7) {
  try {
    console.log("[v0] Client: Fetching upcoming matches for", days, "days...");
    const response = await fetch(`/api/matches/upcoming?days=${days}`);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[v0] Client: API error:", errorData);
      return [];
    }

    const data = await response.json();
    console.log("[v0] Client: Upcoming matches received:", data);
    return data.response || [];
  } catch (error) {
    console.error("[v0] Client: Error fetching upcoming matches:", error);
    return [];
  }
}

// Fetch match details by ID
export async function getMatchDetails(fixtureId) {
  try {
    const response = await fetch(`/api/matches/${fixtureId}`);
    const data = await response.json();
    return data.response?.[0] || null;
  } catch (error) {
    console.error("Error fetching match details:", error);
    return null;
  }
}

// Fetch matches by league
export async function getMatchesByLeague(leagueId, season) {
  try {
    const response = await fetch(`/api/matches/league?leagueId=${leagueId}&season=${season}`);
    const data = await response.json();
    return data.response || [];
  } catch (error) {
    console.error("Error fetching league matches:", error);
    return [];
  }
}

// Fetch team statistics
export async function getTeamStats(teamId, season) {
  try {
    const response = await fetch(`/api/teams/stats?teamId=${teamId}&season=${season}`);
    const data = await response.json();
    return data.response || null;
  } catch (error) {
    console.error("Error fetching team stats:", error);
    return null;
  }
}

// Fetch predictions (if available in your plan)
export async function getMatchPredictions(fixtureId) {
  try {
    const response = await fetch(`/api/matches/predictions?fixtureId=${fixtureId}`);
    const data = await response.json();
    return data.response?.[0] || null;
  } catch (error) {
    console.error("Error fetching predictions:", error);
    return null;
  }
}

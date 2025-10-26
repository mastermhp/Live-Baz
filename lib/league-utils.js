export function groupMatchesByLeague(matches) {
  console.log("[v0] groupMatchesByLeague - Input matches:", matches?.length || 0)
  console.log("[v0] Full match data sample:", matches?.[0])

  const grouped = {}

  matches.forEach((match) => {
    const leagueKey = match.leagueId || match.league
    if (!grouped[leagueKey]) {
      grouped[leagueKey] = {
        leagueId: match.leagueId,
        league: match.league,
        leagueLogo: match.leagueLogo,
        matches: [],
      }
    }
    grouped[leagueKey].matches.push(match)
  })

  const result = Object.values(grouped)
  console.log("[v0] Grouped by league - Total leagues:", result.length)
  result.forEach((league) => {
    console.log(`[v0] League: ${league.league} - Matches: ${league.matches.length}`)
  })

  return result
}

export function calculateLeagueStats(matches) {
  if (!matches || matches.length === 0) {
    return {
      totalMatches: 0,
      bttsPercentage: 0,
      over15Percentage: 0,
      over25Percentage: 0,
      over35Percentage: 0,
      averageGoals: 0,
      totalGoals: 0,
    }
  }

  console.log("[v0] calculateLeagueStats - Total matches:", matches.length)

  // Use all matches with scores (live + finished), not just finished
  const matchesWithScores = matches.filter((m) => (m.homeScore || 0) + (m.awayScore || 0) > 0)

  console.log("[v0] Matches with scores:", matchesWithScores.length)

  if (matchesWithScores.length === 0) {
    return {
      totalMatches: matches.length,
      bttsPercentage: 0,
      over15Percentage: 0,
      over25Percentage: 0,
      over35Percentage: 0,
      averageGoals: 0,
      totalGoals: 0,
    }
  }

  let bttsCount = 0
  let over15Count = 0
  let over25Count = 0
  let over35Count = 0
  let totalGoals = 0

  matchesWithScores.forEach((match) => {
    const totalGoalsInMatch = (match.homeScore || 0) + (match.awayScore || 0)
    totalGoals += totalGoalsInMatch

    // Both teams to score
    if ((match.homeScore || 0) > 0 && (match.awayScore || 0) > 0) {
      bttsCount++
    }

    // Over goals
    if (totalGoalsInMatch > 1.5) over15Count++
    if (totalGoalsInMatch > 2.5) over25Count++
    if (totalGoalsInMatch > 3.5) over35Count++
  })

  const stats = {
    totalMatches: matches.length,
    matchesWithScores: matchesWithScores.length,
    bttsPercentage: Math.round((bttsCount / matchesWithScores.length) * 100),
    over15Percentage: Math.round((over15Count / matchesWithScores.length) * 100),
    over25Percentage: Math.round((over25Count / matchesWithScores.length) * 100),
    over35Percentage: Math.round((over35Count / matchesWithScores.length) * 100),
    averageGoals: (totalGoals / matchesWithScores.length).toFixed(2),
    totalGoals,
  }

  console.log("[v0] Calculated stats:", stats)
  return stats
}

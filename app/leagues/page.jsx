"use client"

import { useState } from "react"
import Header from "@/components/header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, Users, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

const leagues = [
  {
    id: 1,
    name: "Premier League",
    country: "England",
    logo: "PL",
    gradient: "from-purple-500 to-pink-500",
    teams: 20,
    matches: 380,
    season: "2024/25",
    topScorer: "Erling Haaland",
    goals: 24,
  },
  {
    id: 2,
    name: "La Liga",
    country: "Spain",
    logo: "LL",
    gradient: "from-orange-500 to-red-500",
    teams: 20,
    matches: 380,
    season: "2024/25",
    topScorer: "Robert Lewandowski",
    goals: 21,
  },
  {
    id: 3,
    name: "Serie A",
    country: "Italy",
    logo: "SA",
    gradient: "from-blue-600 to-blue-800",
    teams: 20,
    matches: 380,
    season: "2024/25",
    topScorer: "Victor Osimhen",
    goals: 19,
  },
  {
    id: 4,
    name: "Bundesliga",
    country: "Germany",
    logo: "BL",
    gradient: "from-red-600 to-red-800",
    teams: 18,
    matches: 306,
    season: "2024/25",
    topScorer: "Harry Kane",
    goals: 23,
  },
  {
    id: 5,
    name: "Ligue 1",
    country: "France",
    logo: "L1",
    gradient: "from-blue-500 to-blue-700",
    teams: 18,
    matches: 306,
    season: "2024/25",
    topScorer: "Kylian Mbappé",
    goals: 20,
  },
  {
    id: 6,
    name: "Champions League",
    country: "Europe",
    logo: "CL",
    gradient: "from-blue-600 via-blue-700 to-blue-900",
    teams: 32,
    matches: 125,
    season: "2024/25",
    topScorer: "Erling Haaland",
    goals: 12,
  },
]

const standings = [
  {
    position: 1,
    team: "Manchester City",
    played: 23,
    won: 18,
    drawn: 3,
    lost: 2,
    gf: 56,
    ga: 18,
    gd: 38,
    points: 57,
    form: ["W", "W", "W", "D", "W"],
  },
  {
    position: 2,
    team: "Liverpool",
    played: 23,
    won: 17,
    drawn: 4,
    lost: 2,
    gf: 52,
    ga: 20,
    gd: 32,
    points: 55,
    form: ["W", "W", "D", "W", "W"],
  },
  {
    position: 3,
    team: "Arsenal",
    played: 23,
    won: 16,
    drawn: 5,
    lost: 2,
    gf: 48,
    ga: 19,
    gd: 29,
    points: 53,
    form: ["W", "D", "W", "W", "W"],
  },
  {
    position: 4,
    team: "Aston Villa",
    played: 23,
    won: 15,
    drawn: 3,
    lost: 5,
    gf: 45,
    ga: 28,
    gd: 17,
    points: 48,
    form: ["W", "L", "W", "W", "D"],
  },
  {
    position: 5,
    team: "Tottenham",
    played: 23,
    won: 14,
    drawn: 4,
    lost: 5,
    gf: 50,
    ga: 32,
    gd: 18,
    points: 46,
    form: ["W", "W", "L", "W", "W"],
  },
]

export default function LeaguesPage() {
  const [selectedLeague, setSelectedLeague] = useState(leagues[0])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-green-50/30">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-float-delayed" />

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex items-center gap-4 mb-6 animate-slide-up">
            <div className="relative">
              <Trophy className="h-12 w-12 text-white" />
              <div className="absolute inset-0 h-12 w-12 bg-white rounded-full blur-xl opacity-50" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-2 text-balance">Leagues</h1>
              <p className="text-xl text-white/90">Standings, fixtures, and statistics</p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* Leagues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {leagues.map((league, index) => (
            <Card
              key={league.id}
              className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border-2 border-gray-100 hover:border-blue-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedLeague(league)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${league.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`h-16 w-16 rounded-xl bg-gradient-to-br ${league.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-white font-bold text-xl">{league.logo}</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">{league.season}</Badge>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {league.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  {league.country}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-xs text-gray-600">Teams</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">{league.teams}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span className="text-xs text-gray-600">Matches</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">{league.matches}</div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-xs text-gray-600">Top Scorer</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{league.topScorer}</span>
                    <Badge className="bg-green-100 text-green-700">{league.goals} goals</Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Selected League Details */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-4 mb-8">
            <div
              className={`h-16 w-16 rounded-xl bg-gradient-to-br ${selectedLeague.gradient} flex items-center justify-center shadow-lg`}
            >
              <span className="text-white font-bold text-2xl">{selectedLeague.logo}</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{selectedLeague.name} Standings</h2>
              <p className="text-gray-600">
                {selectedLeague.country} • {selectedLeague.season}
              </p>
            </div>
          </div>

          <Card className="overflow-hidden border-2 border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-bold">#</th>
                    <th className="px-4 py-4 text-left text-sm font-bold">Team</th>
                    <th className="px-4 py-4 text-center text-sm font-bold">P</th>
                    <th className="px-4 py-4 text-center text-sm font-bold">W</th>
                    <th className="px-4 py-4 text-center text-sm font-bold">D</th>
                    <th className="px-4 py-4 text-center text-sm font-bold">L</th>
                    <th className="px-4 py-4 text-center text-sm font-bold">GF</th>
                    <th className="px-4 py-4 text-center text-sm font-bold">GA</th>
                    <th className="px-4 py-4 text-center text-sm font-bold">GD</th>
                    <th className="px-4 py-4 text-center text-sm font-bold">Pts</th>
                    <th className="px-4 py-4 text-center text-sm font-bold">Form</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((team, index) => (
                    <tr
                      key={team.position}
                      className="border-b border-gray-100 hover:bg-blue-50 transition-colors cursor-pointer group"
                    >
                      <td className="px-4 py-4">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            team.position <= 4
                              ? "bg-green-100 text-green-700"
                              : team.position === 5
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {team.position}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs font-bold">{team.team.slice(0, 3).toUpperCase()}</span>
                          </div>
                          <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {team.team}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center text-gray-700">{team.played}</td>
                      <td className="px-4 py-4 text-center text-gray-700">{team.won}</td>
                      <td className="px-4 py-4 text-center text-gray-700">{team.drawn}</td>
                      <td className="px-4 py-4 text-center text-gray-700">{team.lost}</td>
                      <td className="px-4 py-4 text-center text-gray-700">{team.gf}</td>
                      <td className="px-4 py-4 text-center text-gray-700">{team.ga}</td>
                      <td className="px-4 py-4 text-center">
                        <span className={`font-semibold ${team.gd > 0 ? "text-green-600" : "text-gray-700"}`}>
                          {team.gd > 0 ? "+" : ""}
                          {team.gd}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="font-bold text-lg text-blue-600">{team.points}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex gap-1 justify-center">
                          {team.form.map((result, i) => (
                            <div
                              key={i}
                              className={`h-6 w-6 rounded flex items-center justify-center text-xs font-bold ${
                                result === "W"
                                  ? "bg-green-500 text-white"
                                  : result === "D"
                                    ? "bg-gray-400 text-white"
                                    : "bg-red-500 text-white"
                              }`}
                            >
                              {result}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="mt-6 flex justify-center">
            <Link href="/matches">
              <Button className="gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                View All Fixtures
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

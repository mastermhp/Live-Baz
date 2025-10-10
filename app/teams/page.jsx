"use client"

import { useState } from "react"
import Header from "@/components/header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, Search, Trophy, Target, Star } from "lucide-react"

const teams = [
  {
    id: 1,
    name: "Manchester City",
    league: "Premier League",
    logo: "MCI",
    gradient: "from-sky-400 to-sky-600",
    position: 1,
    points: 57,
    played: 23,
    won: 18,
    form: ["W", "W", "W", "D", "W"],
    topScorer: "Erling Haaland",
    goals: 24,
    value: "€1.2B",
  },
  {
    id: 2,
    name: "Liverpool",
    league: "Premier League",
    logo: "LIV",
    gradient: "from-red-500 to-red-700",
    position: 2,
    points: 55,
    played: 23,
    won: 17,
    form: ["W", "W", "D", "W", "W"],
    topScorer: "Mohamed Salah",
    goals: 18,
    value: "€1.1B",
  },
  {
    id: 3,
    name: "Arsenal",
    league: "Premier League",
    logo: "ARS",
    gradient: "from-red-600 to-red-800",
    position: 3,
    points: 53,
    played: 23,
    won: 16,
    form: ["W", "D", "W", "W", "W"],
    topScorer: "Bukayo Saka",
    goals: 15,
    value: "€1.0B",
  },
  {
    id: 4,
    name: "Real Madrid",
    league: "La Liga",
    logo: "RMA",
    gradient: "from-white to-gray-200",
    position: 1,
    points: 61,
    played: 21,
    won: 19,
    form: ["W", "W", "W", "W", "D"],
    topScorer: "Jude Bellingham",
    goals: 16,
    value: "€1.3B",
  },
  {
    id: 5,
    name: "Barcelona",
    league: "La Liga",
    logo: "BAR",
    gradient: "from-blue-600 to-red-600",
    position: 2,
    points: 58,
    played: 21,
    won: 18,
    form: ["W", "W", "L", "W", "W"],
    topScorer: "Robert Lewandowski",
    goals: 21,
    value: "€1.1B",
  },
  {
    id: 6,
    name: "Bayern Munich",
    league: "Bundesliga",
    logo: "BAY",
    gradient: "from-red-600 to-red-800",
    position: 1,
    points: 52,
    played: 20,
    won: 16,
    form: ["W", "W", "W", "W", "W"],
    topScorer: "Harry Kane",
    goals: 23,
    value: "€1.2B",
  },
  {
    id: 7,
    name: "Inter Milan",
    league: "Serie A",
    logo: "INT",
    gradient: "from-blue-600 to-black",
    position: 1,
    points: 56,
    played: 22,
    won: 17,
    form: ["W", "D", "W", "W", "W"],
    topScorer: "Lautaro Martínez",
    goals: 17,
    value: "€900M",
  },
  {
    id: 8,
    name: "PSG",
    league: "Ligue 1",
    logo: "PSG",
    gradient: "from-blue-800 to-red-600",
    position: 1,
    points: 54,
    played: 20,
    won: 17,
    form: ["W", "W", "W", "D", "W"],
    topScorer: "Kylian Mbappé",
    goals: 20,
    value: "€1.0B",
  },
]

export default function TeamsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLeague, setSelectedLeague] = useState("all")

  const filteredTeams = teams.filter((team) => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLeague = selectedLeague === "all" || team.league === selectedLeague
    return matchesSearch && matchesLeague
  })

  const leagues = ["all", "Premier League", "La Liga", "Serie A", "Bundesliga", "Ligue 1"]

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
              <Shield className="h-12 w-12 text-white" />
              <div className="absolute inset-0 h-12 w-12 bg-white rounded-full blur-xl opacity-50" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-2 text-balance">Teams</h1>
              <p className="text-xl text-white/90">Explore clubs from around the world</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg bg-white/95 backdrop-blur-lg border-white/20 focus:bg-white transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* League Filters */}
        <div className="flex flex-wrap gap-3 mb-8 animate-slide-up">
          {leagues.map((league) => (
            <Button
              key={league}
              variant={selectedLeague === league ? "default" : "outline"}
              onClick={() => setSelectedLeague(league)}
              className="capitalize"
            >
              {league === "all" ? "All Leagues" : league}
            </Button>
          ))}
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTeams.map((team, index) => (
            <Card
              key={team.id}
              className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border-2 border-gray-100 hover:border-blue-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${team.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="p-6 relative z-10">
                {/* Team Logo */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${team.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-white font-bold text-2xl">{team.logo}</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">#{team.position}</Badge>
                </div>

                {/* Team Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {team.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                  <Trophy className="h-3 w-3" />
                  {team.league}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-600 mb-1">Played</div>
                    <div className="text-lg font-bold text-gray-900">{team.played}</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-green-600 mb-1">Won</div>
                    <div className="text-lg font-bold text-green-700">{team.won}</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-blue-600 mb-1">Points</div>
                    <div className="text-lg font-bold text-blue-700">{team.points}</div>
                  </div>
                </div>

                {/* Form */}
                <div className="mb-4">
                  <div className="text-xs text-gray-600 mb-2">Recent Form</div>
                  <div className="flex gap-1">
                    {team.form.map((result, i) => (
                      <div
                        key={i}
                        className={`h-7 w-7 rounded flex items-center justify-center text-xs font-bold ${
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
                </div>

                {/* Top Scorer */}
                <div className="border-t border-gray-100 pt-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-yellow-500" />
                    <span className="text-xs text-gray-600">Top Scorer</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-gray-900">{team.topScorer}</span>
                    <Badge className="bg-green-100 text-green-700">{team.goals} goals</Badge>
                  </div>
                </div>

                {/* Team Value */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Squad Value
                  </span>
                  <span className="font-bold text-blue-600">{team.value}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No results */}
        {filteredTeams.length === 0 && (
          <Card className="p-12 text-center">
            <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Teams Found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </Card>
        )}
      </main>
    </div>
  )
}

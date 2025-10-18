"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Shield, Search, Trophy, Target, Star, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

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
    gradient: "from-green-500 to-emerald-700",
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
    name: "Real Madrid",
    league: "La Liga",
    logo: "RMA",
    gradient: "from-blue-500 to-blue-700",
    position: 1,
    points: 61,
    played: 21,
    won: 19,
    form: ["W", "W", "W", "W", "D"],
    topScorer: "Jude Bellingham",
    goals: 16,
    value: "€1.3B",
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden h-[60vh] flex items-center justify-center text-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://gomomentus.com/hubfs/Momentus%20Website%20Assets%20-%20NB%202023/Solutions%20-%20Stadiums%20and%20Arenas/5%20Stadium%20and%20Arena%20Card.jpg"
            alt="stadium"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/60 to-black opacity-80" />
        </div>

        {/* Floating Lights */}
        <motion.div
          animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 8 }}
          className="absolute w-96 h-96 bg-green-300/30 rounded-full blur-3xl top-20 left-10"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 10 }}
          className="absolute w-80 h-80 bg-blue-300/30 rounded-full blur-3xl bottom-10 right-20"
        />

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="mx-auto mb-6 flex justify-center"
          >
            <Shield className="h-16 w-16 text-white drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
          </motion.div>
          <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent drop-shadow-xl">
            Explore World Teams
          </h1>
          <p className="mt-4 text-xl text-white/90 font-light">Discover elite clubs, stats, and performance insights</p>

          {/* Search Bar */}
          <div className="mt-8 mx-auto max-w-lg relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 rounded-2xl bg-white/80 backdrop-blur-md border border-blue-200 focus:ring-2 focus:ring-blue-400 transition-all text-gray-700 text-lg"
            />
          </div>
        </motion.div>
      </div>

      {/* League Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center flex-wrap gap-3 py-10"
      >
        {leagues.map((league) => (
          <button
            key={league}
            onClick={() => setSelectedLeague(league)}
            className={`px-6 py-2 rounded-full font-semibold border transition-all duration-300 ${
              selectedLeague === league
                ? "bg-gradient-to-r from-blue-500 to-green-400 text-white shadow-lg"
                : "bg-white border-blue-200 text-blue-500 hover:bg-blue-50"
            }`}
          >
            {league === "all" ? "All Leagues" : league}
          </button>
        ))}
      </motion.div>

      {/* Teams Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6 pb-20 max-w-7xl mx-auto"
      >
        {filteredTeams.map((team) => (
          <motion.div
            key={team.id}
            whileHover={{ scale: 1.05, rotate: 0.5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group"
          >
            <Card className="relative bg-white/90 backdrop-blur-lg border border-blue-200 shadow-lg hover:shadow-blue-300/40 rounded-2xl overflow-hidden transition-all">
              {/* Top Accent */}
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${team.gradient}`} />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`h-16 w-16 rounded-xl bg-gradient-to-br ${team.gradient} flex items-center justify-center shadow-lg text-white font-bold`}
                  >
                    {team.logo}
                  </motion.div>
                  <Badge className="bg-blue-100 text-blue-600 border border-blue-300 font-semibold">
                    #{team.position}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-blue-800 mb-1">{team.name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-2 mb-3">
                  <Trophy className="h-3 w-3 text-green-500" /> {team.league}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-blue-50 rounded-lg p-2 text-center border border-blue-100">
                    <div className="text-xs text-blue-400 mb-1">Played</div>
                    <div className="text-lg font-bold text-blue-700">{team.played}</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2 text-center border border-green-100">
                    <div className="text-xs text-green-400 mb-1">Won</div>
                    <div className="text-lg font-bold text-green-700">{team.won}</div>
                  </div>
                  <div className="bg-cyan-50 rounded-lg p-2 text-center border border-cyan-100">
                    <div className="text-xs text-cyan-400 mb-1">Points</div>
                    <div className="text-lg font-bold text-cyan-700">{team.points}</div>
                  </div>
                </div>

                {/* Top Scorer */}
                <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Target className="h-4 w-4 text-yellow-500" />
                    <span>{team.topScorer}</span>
                  </div>
                  <Badge className="bg-green-100 text-green-600 border border-green-300">
                    {team.goals} Goals
                  </Badge>
                </div>

                {/* Value */}
                <div className="mt-4 flex justify-between items-center bg-blue-50/50 border border-blue-100 rounded-lg px-3 py-2">
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Star className="h-3 w-3 text-blue-400" /> Value
                  </span>
                  <span className="font-bold text-blue-700">{team.value}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Footer />
    </div>
  )
}

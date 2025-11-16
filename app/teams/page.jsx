"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Shield, Search, Trophy, Target, Calendar, TrendingUp, Activity } from 'lucide-react'
import { motion } from "framer-motion"
import Link from "next/link"

export default function TeamsPage() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLeague, setSelectedLeague] = useState("39") // Premier League
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [teamDetails, setTeamDetails] = useState(null)
  const [loadingDetails, setLoadingDetails] = useState(false)

  const leagues = [
    { id: "39", name: "Premier League" },
    { id: "140", name: "La Liga" },
    { id: "135", name: "Serie A" },
    { id: "78", name: "Bundesliga" },
    { id: "61", name: "Ligue 1" },
  ]

  useEffect(() => {
    fetchTeams()
  }, [selectedLeague])

  useEffect(() => {
    if (selectedTeam) {
      fetchTeamDetails(selectedTeam)
    }
  }, [selectedTeam])

  async function fetchTeams() {
    try {
      setLoading(true)
      const res = await fetch(`/api/teams?league=${selectedLeague}`)
      const data = await res.json()
      setTeams(data.response || [])
      
      // Auto-select first team
      if (data.response && data.response.length > 0) {
        setSelectedTeam(data.response[0].team.id)
      }
    } catch (error) {
      console.error("[v0] Error fetching teams:", error)
    } finally {
      setLoading(false)
    }
  }

  async function fetchTeamDetails(teamId) {
    try {
      setLoadingDetails(true)
      const res = await fetch(`/api/teams/${teamId}`)
      const data = await res.json()
      setTeamDetails(data)
    } catch (error) {
      console.error("[v0] Error fetching team details:", error)
    } finally {
      setLoadingDetails(false)
    }
  }

  const filteredTeams = teams.filter((item) =>
    item.team.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden h-[50vh] flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <img
            src="https://gomomentus.com/hubfs/Momentus%20Website%20Assets%20-%20NB%202023/Solutions%20-%20Stadiums%20and%20Arenas/5%20Stadium%20and%20Arena%20Card.jpg"
            alt="stadium"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/60 to-black opacity-80" />
        </div>

        <motion.div
          animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8 }}
          className="absolute w-96 h-96 bg-green-300/30 rounded-full blur-3xl top-20 left-10"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 25, ease: "linear" }}
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
            key={league.id}
            onClick={() => {
              setSelectedLeague(league.id)
              setSelectedTeam(null)
              setTeamDetails(null)
            }}
            className={`px-6 py-2 rounded-full font-semibold border transition-all duration-300 ${
              selectedLeague === league.id
                ? "bg-gradient-to-r from-blue-500 to-green-400 text-white shadow-lg"
                : "bg-white border-blue-200 text-blue-500 hover:bg-blue-50"
            }`}
          >
            {league.name}
          </button>
        ))}
      </motion.div>

      {/* Main Content: Teams Grid + Team Details Sidebar */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Teams Grid */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading teams...</p>
              </div>
            ) : (
              <motion.div
                initial="hidden"
                whileInView="visible"
                transition={{ staggerChildren: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {filteredTeams.map((item) => (
                  <motion.div
                    key={item.team.id}
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => setSelectedTeam(item.team.id)}
                    className={`cursor-pointer ${selectedTeam === item.team.id ? "ring-2 ring-blue-500" : ""}`}
                  >
                    <Card className="relative bg-white/90 backdrop-blur-lg border border-blue-200 shadow-lg hover:shadow-blue-300/40 rounded-2xl overflow-hidden transition-all">
                      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-green-400" />
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="h-16 w-16 rounded-xl bg-white shadow-md flex items-center justify-center overflow-hidden">
                            {item.team.logo ? (
                              <img src={item.team.logo || "/placeholder.svg"} alt={item.team.name} className="w-12 h-12 object-contain" />
                            ) : (
                              <Shield className="w-8 h-8 text-blue-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-blue-800">{item.team.name}</h3>
                            <p className="text-sm text-gray-500">{item.venue?.name || "Stadium"}</p>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-3 mt-3">
                          <p className="text-xs text-gray-500">Founded: {item.team.founded || "N/A"}</p>
                          <p className="text-xs text-gray-500">Country: {item.team.country || "N/A"}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Team Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card className="bg-white/90 backdrop-blur-lg border border-blue-200 shadow-xl rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-green-400 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Activity className="h-6 w-6" />
                    Team Overview
                  </h3>
                  <p className="text-white/90 text-sm">Recent matches and performance</p>
                </div>

                <div className="p-6">
                  {loadingDetails ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600">Loading team details...</p>
                    </div>
                  ) : teamDetails && teamDetails.fixtures ? (
                    <div className="space-y-6">
                      {/* Recent & Upcoming Matches */}
                      <div>
                        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-blue-500" />
                          Recent Matches
                        </h4>
                        <div className="space-y-3">
                          {teamDetails.fixtures.slice(0, 5).map((fixture) => {
                            const isHome = fixture.teams.home.id === selectedTeam
                            const opponent = isHome ? fixture.teams.away : fixture.teams.home
                            const result = fixture.fixture.status.short === "FT" 
                              ? (isHome 
                                  ? (fixture.goals.home > fixture.goals.away ? "W" : fixture.goals.home < fixture.goals.away ? "L" : "D")
                                  : (fixture.goals.away > fixture.goals.home ? "W" : fixture.goals.away < fixture.goals.home ? "L" : "D"))
                              : "NS"

                            return (
                              <Link key={fixture.fixture.id} href={`/match/${fixture.fixture.id}`}>
                                <div className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:shadow-md transition-all">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      {opponent.logo && (
                                        <img src={opponent.logo || "/placeholder.svg"} alt={opponent.name} className="w-6 h-6 object-contain" />
                                      )}
                                      <span className="font-semibold text-sm text-gray-800">{opponent.name}</span>
                                    </div>
                                    {result !== "NS" && (
                                      <Badge
                                        className={`${
                                          result === "W"
                                            ? "bg-green-100 text-green-700"
                                            : result === "L"
                                              ? "bg-red-100 text-red-700"
                                              : "bg-gray-100 text-gray-700"
                                        }`}
                                      >
                                        {result}
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>{new Date(fixture.fixture.date).toLocaleDateString()}</span>
                                    {fixture.fixture.status.short === "FT" && (
                                      <span className="font-bold text-gray-700">
                                        {isHome ? `${fixture.goals.home} - ${fixture.goals.away}` : `${fixture.goals.away} - ${fixture.goals.home}`}
                                      </span>
                                    )}
                                    {fixture.fixture.status.short === "NS" && (
                                      <span className="text-blue-600">Upcoming</span>
                                    )}
                                  </div>
                                </div>
                              </Link>
                            )
                          })}
                        </div>
                      </div>

                      {/* Team Statistics */}
                      {teamDetails.statistics && (
                        <div>
                          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-green-500" />
                            Season Statistics
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                              <div className="text-xs text-blue-600 mb-1">Played</div>
                              <div className="text-xl font-bold text-blue-700">
                                {teamDetails.statistics.fixtures?.played?.total || 0}
                              </div>
                            </div>
                            <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                              <div className="text-xs text-green-600 mb-1">Wins</div>
                              <div className="text-xl font-bold text-green-700">
                                {teamDetails.statistics.fixtures?.wins?.total || 0}
                              </div>
                            </div>
                            <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-100">
                              <div className="text-xs text-yellow-600 mb-1">Draws</div>
                              <div className="text-xl font-bold text-yellow-700">
                                {teamDetails.statistics.fixtures?.draws?.total || 0}
                              </div>
                            </div>
                            <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                              <div className="text-xs text-red-600 mb-1">Losses</div>
                              <div className="text-xl font-bold text-red-700">
                                {teamDetails.statistics.fixtures?.loses?.total || 0}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Shield className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">Select a team to view details</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

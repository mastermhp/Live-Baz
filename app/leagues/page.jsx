"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Calendar, Play } from 'lucide-react'
import Link from "next/link"
import { motion } from "framer-motion"
import { useLeagues } from "@/hooks/use-leagues"
import { useLeagueMatches } from "@/hooks/use-league-matches"

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
}

const cardHover = {
  hover: {
    scale: 1.03,
    y: -8,
    boxShadow: "0 30px 60px rgba(6,78,59,0.18)",
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
}

export default function LeaguesPage() {
  const { leagues, loading: leaguesLoading } = useLeagues()
  const [selectedLeagueId, setSelectedLeagueId] = useState(null)

  useEffect(() => {
    if (leagues.length > 0 && !selectedLeagueId) {
      setSelectedLeagueId(leagues[0].id)
    }
  }, [leagues, selectedLeagueId])

  const { matches, loading: matchesLoading } = useLeagueMatches(selectedLeagueId)

  const selectedLeague = leagues.find((l) => l.id === selectedLeagueId)

  // Group matches by status
  const liveMatches = matches.filter((m) => m.fixture?.status?.short === "LIVE" || m.fixture?.status?.short === "1H" || m.fixture?.status?.short === "2H" || m.fixture?.status?.short === "HT")
  const finishedMatches = matches.filter((m) => m.fixture?.status?.short === "FT")
  const upcomingMatches = matches.filter((m) => m.fixture?.status?.short === "NS" || m.fixture?.status?.short === "TBD")

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-emerald-50 text-slate-800">
      <Header />

      {/* Floating decorative background orbs */}
      <motion.div
        animate={{ rotate: [0, 8, 0] }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="pointer-events-none fixed -top-36 -right-36 w-[28rem] h-[28rem] rounded-full blur-3xl bg-gradient-to-br from-emerald-300/30 to-blue-400/20"
      />
      <motion.div
        animate={{ rotate: [0, -6, 0] }}
        transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="pointer-events-none fixed -bottom-32 -left-32 w-[26rem] h-[26rem] rounded-full blur-3xl bg-gradient-to-br from-blue-300/25 to-emerald-300/25"
      />

      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-emerald-400 opacity-90" />
        <img
          src="https://as1.ftcdn.net/jpg/05/21/40/42/1000_F_521404240_4iZIxhDj97d1fu6uuGc3igkSSNfkwHuc.jpg"
          alt="Abstract football texture"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02),transparent)]"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="flex items-center gap-4 mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 20, ease: "linear" }}
              className="relative"
            >
              <Trophy className="h-14 w-14 text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.2)]" />
              <div className="absolute -inset-1 rounded-full blur-md bg-white/10" />
            </motion.div>

            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight">
                All Leagues — Live & Legendary
              </h1>
              <p className="mt-1 text-lg text-white/90">
                Explore all leagues with live matches, standings, and fixtures
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20 max-w-7xl mx-auto px-6 pt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Leagues List - Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">All Leagues</h2>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2"
              >
                {leaguesLoading ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">Loading leagues...</p>
                  </div>
                ) : leagues.length > 0 ? (
                  leagues.map((league) => (
                    <motion.div
                      key={league.id}
                      variants={cardHover}
                      whileHover="hover"
                      onClick={() => setSelectedLeagueId(league.id)}
                      className={`cursor-pointer ${selectedLeagueId === league.id ? "ring-2 ring-blue-500" : ""}`}
                    >
                      <Card className="relative overflow-hidden rounded-xl p-4 transition-all border border-slate-100 hover:border-blue-300">
                        <div className="flex items-center gap-3">
                          <motion.div
                            whileHover={{ rotate: 6, scale: 1.08 }}
                            className="h-12 w-12 rounded-lg flex items-center justify-center shadow-md bg-gradient-to-br from-blue-500 to-emerald-400 overflow-hidden flex-shrink-0"
                          >
                            {league.logo ? (
                              <img
                                src={league.logo || "/placeholder.svg"}
                                alt={league.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Trophy className="w-6 h-6 text-white" />
                            )}
                          </motion.div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-slate-800 truncate">{league.name}</h3>
                            <p className="text-sm text-slate-500 flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {league.country}
                            </p>
                          </div>

                          {league.flag && (
                            <motion.img
                              whileHover={{ scale: 1.1 }}
                              src={league.flag}
                              alt={league.country}
                              className="h-8 w-10 rounded object-cover shadow-sm flex-shrink-0"
                            />
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No leagues available</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Matches Display - Right Side */}
          <div className="lg:col-span-2">
            {selectedLeague ? (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <motion.div
                    whileHover={{ scale: 1.06, rotate: 4 }}
                    className="h-16 w-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-emerald-400 shadow-lg overflow-hidden"
                  >
                    {selectedLeague.logo ? (
                      <img
                        src={selectedLeague.logo || "/placeholder.svg"}
                        alt={selectedLeague.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Trophy className="w-8 h-8 text-white" />
                    )}
                  </motion.div>

                  {selectedLeague.flag && (
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={selectedLeague.flag}
                      alt={selectedLeague.country}
                      className="h-16 w-24 rounded-lg object-cover shadow-md"
                    />
                  )}

                  <div>
                    <h2 className="text-3xl font-extrabold text-slate-800">{selectedLeague.name}</h2>
                    <p className="text-sm text-slate-500">
                      {selectedLeague.country} • Season {selectedLeague.season}
                    </p>
                  </div>
                </div>

                {/* Live Matches */}
                {liveMatches.length > 0 && (
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <Play className="w-6 h-6 text-red-500 animate-pulse" />
                      Live Matches
                    </h3>
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="grid grid-cols-1 gap-6"
                    >
                      {liveMatches.map((match) => (
                        <MatchCard key={match.fixture.id} match={match} />
                      ))}
                    </motion.div>
                  </div>
                )}

                {/* Upcoming Matches */}
                {upcomingMatches.length > 0 && (
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <Calendar className="w-6 h-6 text-blue-500" />
                      Upcoming Matches
                    </h3>
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="grid grid-cols-1 gap-6"
                    >
                      {upcomingMatches.map((match) => (
                        <MatchCard key={match.fixture.id} match={match} />
                      ))}
                    </motion.div>
                  </div>
                )}

                {/* Finished Matches */}
                {finishedMatches.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <Trophy className="w-6 h-6 text-emerald-500" />
                      Finished Matches
                    </h3>
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="grid grid-cols-1 gap-6"
                    >
                      {finishedMatches.map((match) => (
                        <MatchCard key={match.fixture.id} match={match} />
                      ))}
                    </motion.div>
                  </div>
                )}

                {matchesLoading && (
                  <div className="text-center py-12">
                    <p className="text-gray-600">Loading matches...</p>
                  </div>
                )}

                {!matchesLoading &&
                  liveMatches.length === 0 &&
                  upcomingMatches.length === 0 &&
                  finishedMatches.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-600">No matches available for this league</p>
                    </div>
                  )}
              </motion.section>
            ) : (
              <div className="text-center py-20">
                <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a league to view matches</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function MatchCard({ match }) {
  const homeTeam = match.teams.home
  const awayTeam = match.teams.away
  const isLive = ["LIVE", "1H", "2H", "HT"].includes(match.fixture.status?.short)
  const isFinished = match.fixture.status?.short === "FT"

  return (
    <Link href={`/match/${match.fixture.id}`}>
      <motion.div whileHover={{ scale: 1.02, y: -4 }} className="cursor-pointer">
        <Card className="overflow-hidden rounded-2xl border border-slate-100 hover:border-blue-300 hover:shadow-xl transition-all">
          <div className="p-6 bg-white">
            {/* Status Badge */}
            <div className="flex items-center justify-between mb-4">
              <Badge
                className={`${
                  isLive
                    ? "bg-red-100 text-red-700 animate-pulse"
                    : isFinished
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-blue-100 text-blue-700"
                }`}
              >
                {isLive ? "LIVE" : isFinished ? "FINISHED" : "UPCOMING"}
              </Badge>
              <span className="text-sm text-slate-500">
                {new Date(match.fixture.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            {/* Teams */}
            <div className="space-y-3">
              {/* Home Team */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  {homeTeam.logo && (
                    <img
                      src={homeTeam.logo || "/placeholder.svg"}
                      alt={homeTeam.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <span className="font-semibold text-slate-800 truncate">{homeTeam.name}</span>
                </div>
                <span className="text-2xl font-bold text-slate-800 ml-2">{match.goals.home ?? "-"}</span>
              </div>

              {/* Away Team */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  {awayTeam.logo && (
                    <img
                      src={awayTeam.logo || "/placeholder.svg"}
                      alt={awayTeam.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <span className="font-semibold text-slate-800 truncate">{awayTeam.name}</span>
                </div>
                <span className="text-2xl font-bold text-slate-800 ml-2">{match.goals.away ?? "-"}</span>
              </div>
            </div>

            {/* Match Info */}
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
              {isLive && <span className="text-red-600 font-semibold">{match.fixture.status?.elapsed}' {match.fixture.status?.short}</span>}
              {!isLive && (
                <span>
                  {new Date(match.fixture.date).toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  )
}

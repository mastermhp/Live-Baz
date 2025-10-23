"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Castle as Whistle, Activity, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import Footer from "@/components/footer"

const relatedPredictions = [
  {
    id: 1,
    team1: {
      name: "Gamba Osaka",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Gamba_Osaka_logo.svg/250px-Gamba_Osaka_logo.svg.png",
    },
    team2: {
      name: "Kashiwa Reysol",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlOyJOBg4fzDpswTCJsTAYraZ4TAU9ZjEWVw&s",
    },
    league: "J. League Japan",
    date: "Today, 11:00",
    title: "Gamba Osaka vs Kashiwa Reysol prediction and betting tips on October 19, 2025",
  },
  {
    id: 2,
    team1: {
      name: "Yokohama FC",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFU5X8tJPDESLkmQ-zbHydd_OJjz9RX6iiXw&s",
    },
    team2: {
      name: "Nagoya Grampus",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Nagoya_Grampus_Logo.svg/150px-Nagoya_Grampus_Logo.svg.png",
    },
    league: "J. League Japan",
    date: "Today, 11:00",
    title: "Yokohama FC vs Nagoya Grampus prediction and betting tips on October 19, 2025",
  },
  {
    id: 3,
    team1: {
      name: "Shonan Bellmare",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWniFNKblMLA1uH8cFnldZ-JcgQc_lu2AoiQ&s",
    },
    team2: {
      name: "Kyoto Sanga",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Kyoto_Sanga_FC_logo.svg/150px-Kyoto_Sanga_FC_logo.svg.png",
    },
    league: "J. League Japan",
    date: "19 Oct 2025, 12:00",
    title: "Shonan Bellmare vs Kyoto Sanga prediction and betting tips on October 19, 2025",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function MatchDetailsPage({ params }) {
  const [match, setMatch] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        console.log("[v0] Fetching match details for ID:", params.id)
        const response = await fetch(`/api/matches/${params.id}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch match: ${response.status}`)
        }

        const data = await response.json()
        console.log("[v0] Match data received:", data)

        if (data.response && data.response.length > 0) {
          const fixture = data.response[0]
          setMatch(fixture)
        } else {
          setError("Match not found")
        }
      } catch (err) {
        console.error("[v0] Error fetching match:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMatchDetails()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Header />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading match details...</p>
        </div>
      </div>
    )
  }

  if (error || !match) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Card className="p-8 text-center">
            <p className="text-red-600 font-semibold">{error || "Match not found"}</p>
            <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
              Back to Home
            </Link>
          </Card>
        </main>
      </div>
    )
  }

  const homeTeam = match.teams?.home
  const awayTeam = match.teams?.away
  const homeScore = match.goals?.home || 0
  const awayScore = match.goals?.away || 0
  const league = match.league
  const fixture = match.fixture
  const stats = match.statistics || []
  const events = match.events || []

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <motion.div
        animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.1, 1] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8 }}
        className="fixed -top-40 -right-40 w-80 h-80 bg-blue-500/10 blur-3xl rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.03, 0.08, 0.03], scale: [1.1, 1, 1.1] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 10 }}
        className="fixed -bottom-40 -left-40 w-80 h-80 bg-green-500/10 blur-3xl rounded-full pointer-events-none"
      />

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Match Header Card */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="p-8 mb-8 bg-gradient-to-br from-white to-blue-50/30 border-2 border-blue-200 overflow-hidden relative shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-blue-700">{league?.name}</span>
                  <span className="h-1 w-1 bg-blue-300 rounded-full" />
                  <span className="text-sm text-blue-600">Round {league?.round}</span>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                >
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30">
                    <span className="h-2 w-2 rounded-full bg-white mr-2 animate-pulse" />
                    {fixture?.status === "LIVE" ? `LIVE ${fixture?.elapsed}'` : fixture?.status}
                  </Badge>
                </motion.div>
              </div>

              {/* Score Display */}
              <div className="flex items-center justify-between mb-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex-1 text-center"
                >
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
                    {homeTeam?.logo ? (
                      <Image
                        src={homeTeam.logo || "/placeholder.svg"}
                        alt={homeTeam.name}
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-white font-bold text-2xl">{homeTeam?.name?.slice(0, 3).toUpperCase()}</span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{homeTeam?.name}</h2>
                  <p className="text-sm text-blue-600">Home</p>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-6 px-8"
                >
                  <div className="text-center">
                    <span className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                      {homeScore}
                    </span>
                  </div>
                  <span className="text-3xl text-gray-300 font-light">:</span>
                  <div className="text-center">
                    <span className="text-6xl font-extrabold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                      {awayScore}
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex-1 text-center"
                >
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                    {awayTeam?.logo ? (
                      <Image
                        src={awayTeam.logo || "/placeholder.svg"}
                        alt={awayTeam.name}
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-white font-bold text-2xl">{awayTeam?.name?.slice(0, 3).toUpperCase()}</span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{awayTeam?.name}</h2>
                  <p className="text-sm text-green-600">Away</p>
                </motion.div>
              </div>

              {/* Match Info */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 border-t border-blue-200 pt-6"
              >
                <motion.div variants={itemVariants} className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  {fixture?.venue?.name || "TBA"}
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center gap-2">
                  <Whistle className="h-4 w-4 text-blue-600" />
                  {fixture?.referee || "TBA"}
                </motion.div>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Match Statistics */}
            {stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-6 bg-white border-2 border-blue-200 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Activity className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">Match Statistics</h3>
                  </div>
                  <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="space-y-5">
                    {stats.map((stat, idx) => {
                      const homeVal = stat.statistics?.find((s) => s.type === "Shots on Goal")?.value || 0
                      const awayVal = stat.statistics?.find((s) => s.type === "Shots on Goal")?.value || 0
                      return (
                        <motion.div key={idx} variants={itemVariants}>
                          <div className="flex items-center justify-between text-sm mb-3">
                            <span className="font-semibold text-blue-600">{homeVal}</span>
                            <span className="text-gray-600 capitalize text-center flex-1 px-4">Shots on Goal</span>
                            <span className="font-semibold text-green-600">{awayVal}</span>
                          </div>
                          <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden flex">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(homeVal / (homeVal + awayVal || 1)) * 100}%` }}
                              transition={{ delay: 0.2, duration: 0.8 }}
                              className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                            />
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(awayVal / (homeVal + awayVal || 1)) * 100}%` }}
                              transition={{ delay: 0.2, duration: 0.8 }}
                              className="bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                            />
                          </div>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </Card>
              </motion.div>
            )}

            {/* Match Events Timeline */}
            {events.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="p-6 bg-white border-2 border-blue-200 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Match Events</h3>
                  <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="space-y-4">
                    {events.map((event, index) => (
                      <motion.div key={index} variants={itemVariants} className="flex items-start gap-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 shrink-0 shadow-lg shadow-blue-600/30"
                        >
                          <span className="text-xs font-bold text-white">{event.time?.elapsed || 0}'</span>
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {event.type === "Goal" && (
                              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                                ⚽ Goal
                              </Badge>
                            )}
                            {event.type === "Card" && event.detail === "Yellow Card" && (
                              <Badge className="bg-yellow-500 text-white">🟨 Yellow Card</Badge>
                            )}
                            {event.type === "Card" && event.detail === "Red Card" && (
                              <Badge className="bg-red-600 text-white">🟥 Red Card</Badge>
                            )}
                            {event.type === "subst" && (
                              <Badge variant="outline" className="border-blue-500 text-blue-600">
                                🔄 Substitution
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold text-gray-900">{event.player?.name}</span>
                            {event.assist?.name && (
                              <span className="text-gray-600"> (Assist: {event.assist.name})</span>
                            )}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prediction CTA */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/all-predictions">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl border-2 border-blue-500 shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  <h4 className="text-lg font-bold text-white mb-2">Get Predictions</h4>
                  <p className="text-sm text-blue-100 mb-4">View expert predictions for this match</p>
                  <div className="flex items-center gap-2 text-white font-semibold">
                    View Predictions <ArrowRight className="h-4 w-4" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">⚡ Related Predictions</h2>
            <p className="text-gray-600 mt-2">Expert predictions for similar matches</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {relatedPredictions.map((p) => (
              <motion.div
                key={p.id}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden border-2 border-blue-200 bg-white shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <div
                  className="absolute inset-0 opacity-20 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://png.pngtree.com/background/20250124/original/pngtree-futuristic-soccer-stadium-with-holographic-ball-and-blue-lights-picture-image_15711843.jpg')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />

                <div className="relative p-6 flex flex-col items-center space-y-4">
                  {/* Teams */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col items-center flex-1">
                      <Image
                        src={p.team1.logo || "/placeholder.svg"}
                        alt={p.team1.name}
                        width={50}
                        height={50}
                        className="object-contain mb-2"
                      />
                      <p className="text-sm text-gray-700 text-center font-medium">{p.team1.name}</p>
                    </div>
                    <div className="px-4 text-xl font-bold text-blue-600">VS</div>
                    <div className="flex flex-col items-center flex-1">
                      <Image
                        src={p.team2.logo || "/placeholder.svg"}
                        alt={p.team2.name}
                        width={50}
                        height={50}
                        className="object-contain mb-2"
                      />
                      <p className="text-sm text-gray-700 text-center font-medium">{p.team2.name}</p>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="pt-3 text-center space-y-1 border-t border-blue-200 w-full">
                    <p className="text-xs text-blue-600 font-semibold tracking-wide">{p.league}</p>
                    <h3 className="text-base font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    <p className="text-xs text-gray-500">{p.date}</p>
                  </div>

                  {/* CTA Button */}
                  <Link href={`/prediction/${p.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="mt-4 px-6 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 rounded-full text-white hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300"
                    >
                      View Prediction →
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

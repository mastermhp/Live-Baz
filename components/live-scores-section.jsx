"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Clock, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"
import { getLiveMatches, getUpcomingMatches } from "@/lib/api-football"
import { transformMatches } from "@/lib/transform-api-data"

export default function LiveScoresSection() {
  const [liveGames, setLiveGames] = useState([])
  const [upcomingGames, setUpcomingGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true)
        const [liveData, upcomingData] = await Promise.all([getLiveMatches(), getUpcomingMatches(1)])

        const transformedLive = transformMatches(liveData).slice(0, 5)
        const transformedUpcoming = transformMatches(upcomingData).slice(0, 5)

        setLiveGames(transformedLive)
        setUpcomingGames(transformedUpcoming)
      } catch (error) {
        console.error("Error fetching matches:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
    const interval = setInterval(fetchMatches, 30000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  if (loading) {
    return (
      <section className="py-8 md:py-16 border-b border-border bg-gradient-to-b from-transparent via-blue-950/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-600">Loading live matches...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 md:py-16 border-b border-border bg-gradient-to-b from-transparent via-blue-950/5 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
            <h2 className="text-2xl md:text-4xl font-bold text-foreground">Live Scores</h2>
          </div>
          <p className="text-muted-foreground text-base md:text-lg">Follow matches happening right now</p>
        </motion.div>

        {/* Tabs - Responsive */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 md:gap-3 mb-8 md:mb-10 overflow-x-auto pb-4 scrollbar-hide"
        >
          {["Live games", "Today", "Tomorrow", "Calendar"].map((tab, idx) => (
            <motion.button
              key={tab}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`px-4 md:px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 text-sm md:text-base ${
                idx === 0
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                  : "border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </motion.div>

        {/* Live Games Section */}
        {liveGames.length > 0 && (
          <div className="mb-12 md:mb-16">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg md:text-2xl font-bold text-gray-600 mb-4 md:mb-6 flex items-center gap-2"
            >
              <TrendingUp className="h-5 md:h-6 w-5 md:w-6 text-red-500" />
              Currently Live
            </motion.h3>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="space-y-3 md:space-y-4"
            >
              {liveGames.map((game) => (
                <motion.div
                  key={game.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 8 }}
                  onClick={() => (window.location.href = `/match/${game.id}`)}
                  className="group relative overflow-hidden rounded-xl md:rounded-2xl backdrop-blur-md shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 hover:shadow-lg bg-gray-900/0 cursor-pointer"
                >
                  {/* Live Indicator */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-red-500 via-blue-600 to-transparent" />

                  <div className="p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    {/* Left - Status and Time */}
                    <div className="flex items-center gap-2 md:gap-4 flex-1 w-full md:w-auto">
                      <div className="flex items-center gap-2">
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 1.5,
                          }}
                          className="inline-block h-2 md:h-3 w-2 md:w-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"
                        />
                        <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Live</span>
                        <span className="text-xs text-gray-600 font-semibold">{game.minute}'</span>
                      </div>
                      <span className="text-[9px] md:text-xs text-gray-200 px-2 md:px-3 py-1 bg-gray-800/50 rounded-full">
                        {game.league}
                      </span>
                    </div>

                    {/* Center - Teams and Score */}
                    <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 px-0 md:px-8 w-full">
                      {/* Home Team */}
                      <div className="text-center flex-1 w-full md:w-auto">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          {game.homeTeamLogo ? (
                            <img
                              src={game.homeTeamLogo || "/placeholder.svg"}
                              alt={game.homeTeam}
                              className="w-6 h-6 md:w-10 md:h-10 rounded-full object-contain"
                            />
                          ) : (
                            <span className="text-lg md:text-2xl">⚽</span>
                          )}
                          <p className="text-xs md:text-sm text-gray-400">Home</p>
                        </div>
                        <p className="text-sm md:text-base font-bold text-gray-600">{game.homeTeam}</p>
                      </div>

                      {/* Score Box */}
                      <div className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg md:rounded-xl border border-blue-500/30">
                        <span className="text-2xl md:text-4xl font-extrabold text-blue-400">{game.homeScore}</span>
                        <span className="text-lg md:text-2xl text-gray-500">:</span>
                        <span className="text-2xl md:text-4xl font-extrabold text-cyan-400">{game.awayScore}</span>
                      </div>

                      {/* Away Team */}
                      <div className="text-center flex-1 w-full md:w-auto">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          {game.awayTeamLogo ? (
                            <img
                              src={game.awayTeamLogo || "/placeholder.svg"}
                              alt={game.awayTeam}
                              className="w-6 h-6 md:w-10 md:h-10 rounded-full object-contain"
                            />
                          ) : (
                            <span className="text-lg md:text-2xl">⚽</span>
                          )}
                          <p className="text-xs md:text-sm text-gray-400">Away</p>
                        </div>
                        <p className="text-sm md:text-base font-bold text-gray-600">{game.awayTeam}</p>
                      </div>
                    </div>

                    {/* Right - Standings (placeholder for now) */}
                    <div className="flex-1 w-full md:w-auto">
                      <div className="text-center">
                        <p className="text-xs md:text-sm text-gray-400 mb-2 font-semibold">Standings</p>
                        <div className="flex items-center justify-center gap-2 md:gap-3">
                          <div className="text-center">
                            <p className="text-xs md:text-sm text-gray-500">1</p>
                            <p className="text-sm md:text-base font-bold text-gray-600">-</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs md:text-sm text-gray-500">X</p>
                            <p className="text-sm md:text-base font-bold text-gray-600">-</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs md:text-sm text-gray-500">2</p>
                            <p className="text-sm md:text-base font-bold text-gray-600">-</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Upcoming Games Section */}
        {upcomingGames.length > 0 && (
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg md:text-2xl font-bold text-gray-600 mb-4 md:mb-6 flex items-center gap-2"
            >
              <Clock className="h-5 md:h-6 w-5 md:w-6 text-blue-500" />
              Upcoming Matches
            </motion.h3>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="space-y-2 md:space-y-3"
            >
              {upcomingGames.map((game) => (
                <motion.div
                  key={game.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01, x: 4 }}
                  onClick={() => (window.location.href = `/match/${game.id}`)}
                  className="group relative overflow-hidden border border-blue-500/30 hover:border-blue-500/70 transition-all duration-300 backdrop-blur-sm p-3 md:p-5 cursor-pointer rounded-lg md:rounded-xl"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
                    {/* Time and League */}
                    <div className="flex items-center gap-2 md:gap-3 flex-1 w-full md:w-auto">
                      <span className="text-[9px] md:text-[10px] text-gray-100 px-2 py-1 bg-gray-800/50 rounded">
                        {game.league}
                      </span>
                      <span className="flex gap-2 mt-1 text-xs md:text-sm font-semibold text-blue-400">
                        <Clock className="h-3 md:h-4 w-3 md:w-4 text-blue-400" />
                        {game.time}
                      </span>
                    </div>

                    {/* Teams with Logos */}
                    <div className="flex-1 flex items-center justify-center gap-3 md:gap-6 px-0 md:px-6 w-full md:w-auto">
                      {/* Team 1 */}
                      <div className="flex items-center justify-end gap-2 flex-1">
                        <p className="text-xs md:text-sm font-semibold text-gray-500 text-right">{game.homeTeam}</p>
                        {game.homeTeamLogo ? (
                          <img
                            src={game.homeTeamLogo || "/placeholder.svg"}
                            alt={game.homeTeam}
                            className="w-5 h-5 md:w-8 md:h-8 rounded-full object-contain"
                          />
                        ) : (
                          <span className="text-lg">⚽</span>
                        )}
                      </div>

                      <span className="text-blue-500 font-bold text-xs md:text-base">vs</span>

                      {/* Team 2 */}
                      <div className="flex items-center justify-start gap-2 flex-1">
                        {game.awayTeamLogo ? (
                          <img
                            src={game.awayTeamLogo || "/placeholder.svg"}
                            alt={game.awayTeam}
                            className="w-5 h-5 md:w-8 md:h-8 rounded-full object-contain"
                          />
                        ) : (
                          <span className="text-lg">⚽</span>
                        )}
                        <p className="text-xs md:text-sm font-semibold text-gray-500 text-left">{game.awayTeam}</p>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex-1 flex justify-end w-full md:w-auto">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-3 md:px-4 py-1.5 text-xs md:text-sm font-semibold text-blue-400 border border-blue-500/50 rounded-lg hover:bg-blue-500/10 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.location.href = `/prediction/${game.id}`
                        }}
                      >
                        Prediction
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-8 md:mt-12"
        >
          <Link href="/live">
            <motion.button
              whileHover={{
                scale: 1.08,
                boxShadow: "0px 0px 30px rgba(59,130,246,0.4)",
              }}
              className="px-6 md:px-10 py-3 md:py-4 border-2 border-blue-500 text-blue-400 font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-500 text-sm md:text-lg"
            >
              View All Live Matches →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

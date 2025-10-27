"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Clock } from "lucide-react"
import { useLiveMatches } from "@/hooks/use-live-matches"
import { useUpcomingMatches } from "@/hooks/use-upcoming-matches"
import { useState, useMemo } from "react"

const LiveMatchCard = ({ game }) => {
  // Generate realistic win percentages based on team names (in production, this would come from API)
  const homeWinPercent = Math.floor(Math.random() * 40) + 30
  const drawPercent = Math.floor(Math.random() * 30) + 20
  const awayWinPercent = 100 - homeWinPercent - drawPercent

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      onClick={() => (window.location.href = `/match/${game.id}`)}
      className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* League Header */}
      <div className="px-4 md:px-6 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-2">
          {game.leagueLogo && (
            <img
              src={game.leagueLogo || "/placeholder.svg"}
              alt={game.league}
              className="w-5 h-5 rounded-full object-contain"
            />
          )}
          <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">{game.league}</span>
          {game.status === "live" && (
            <div className="ml-auto flex items-center gap-1">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                className="inline-block h-2 w-2 bg-red-500 rounded-full"
              />
              <span className="text-xs font-bold text-red-500">LIVE</span>
            </div>
          )}
        </div>
      </div>

      {/* Match Content */}
      <div className="p-4 md:p-6">
        <div className="flex flex-col gap-4">
          {/* Top Row: Time, Teams with Score, Standings */}
          <div className="grid grid-cols-12 gap-3 md:gap-6 items-start">
            {/* Time/Minute */}
            <div className="col-span-1 md:col-span-1 my-auto w-full">
              <div className="w-full">
                <p className="text-xs text-gray-500 font-medium mb-1">Time</p>
              <p className="text-sm md:text-base font-bold text-gray-900">
                {game.status === "live" ? `${game.minute}'` : game.time}
              </p>
              </div>
            </div>

            {/* Match Section - Teams with Score Between */}
            <div className="col-span-6 md:col-span-6">
              <p className="text-xs text-gray-500 font-medium mb-3">Match</p>
              <div className="space-y-3">
                {/* Home Team */}
                <div className="flex items-center gap-3">
                  {game.homeTeamLogo && (
                    <img
                      src={game.homeTeamLogo || "/placeholder.svg"}
                      alt={game.homeTeam}
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full object-contain flex-shrink-0"
                    />
                  )}
                  <span className="text-sm md:text-base font-semibold text-gray-800 truncate">{game.homeTeam}</span>
                </div>

                {/* Separator Line */}
                <div className="h-px bg-gray-200" />

                {/* Away Team */}
                <div className="flex items-center gap-3">
                  {game.awayTeamLogo && (
                    <img
                      src={game.awayTeamLogo || "/placeholder.svg"}
                      alt={game.awayTeam}
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full object-contain flex-shrink-0"
                    />
                  )}
                  <span className="text-sm md:text-base font-semibold text-gray-800 truncate">{game.awayTeam}</span>
                </div>
              </div>
            </div>

            <div className="col-span-2 md:col-span-2 flex flex-col justify-center items-center">
              <p className="text-xs text-gray-500 font-medium mb-2">Score</p>
              <div className="flex flex-col items-center justify-center px-3 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                <span className="text-lg md:text-2xl font-bold text-blue-600">{game.homeScore}</span>
                <span className="text-gray-400 font-bold">:</span>
                <span className="text-lg md:text-2xl font-bold text-cyan-600">{game.awayScore}</span>
              </div>
            </div>

            {/* Win Percentages - Standings */}
            <div className="col-span-3 md:col-span-3">
              <p className="text-xs text-gray-500 font-medium mb-3">Standings</p>
              <div className="space-y-2">
                {/* Home Win % */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-700">1</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-md">
                    {homeWinPercent}%
                  </span>
                </div>

                {/* Draw % */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-700">X</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-bold rounded-md">
                    {drawPercent}%
                  </span>
                </div>

                {/* Away Win % */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-700">2</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-md">
                    {awayWinPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const UpcomingMatchCard = ({ game }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    whileHover={{ y: -4 }}
    onClick={() => (window.location.href = `/match/${game.id}`)}
    className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
  >
    {/* League Header */}
    <div className="px-4 md:px-6 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
      <div className="flex items-center gap-2">
        {game.leagueLogo && (
          <img
            src={game.leagueLogo || "/placeholder.svg"}
            alt={game.league}
            className="w-5 h-5 rounded-full object-contain"
          />
        )}
        <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">{game.league}</span>
      </div>
    </div>

    {/* Match Content */}
    <div className="p-4 md:p-6">
      <div className="grid grid-cols-12 gap-3 md:gap-6 items-start">
        {/* Time */}
        <div className="col-span-1 md:col-span-1">
          <p className="text-xs text-gray-500 font-medium mb-1">Time</p>
          <p className="text-xs md:text-sm font-bold text-gray-900">{game.time}</p>
        </div>

        {/* Match Section - Teams */}
        <div className="col-span-6 md:col-span-6">
          <p className="text-xs text-gray-500 font-medium mb-3">Match</p>
          <div className="space-y-3">
            {/* Home Team */}
            <div className="flex items-center gap-3">
              {game.homeTeamLogo && (
                <img
                  src={game.homeTeamLogo || "/placeholder.svg"}
                  alt={game.homeTeam}
                  className="w-7 h-7 md:w-8 md:h-8 rounded-full object-contain flex-shrink-0"
                />
              )}
              <span className="text-sm md:text-base font-semibold text-gray-800 truncate">{game.homeTeam}</span>
            </div>

            {/* Separator Line */}
            <div className="h-px bg-gray-200" />

            {/* Away Team */}
            <div className="flex items-center gap-3">
              {game.awayTeamLogo && (
                <img
                  src={game.awayTeamLogo || "/placeholder.svg"}
                  alt={game.awayTeam}
                  className="w-7 h-7 md:w-8 md:h-8 rounded-full object-contain flex-shrink-0"
                />
              )}
              <span className="text-sm md:text-base font-semibold text-gray-800 truncate">{game.awayTeam}</span>
            </div>
          </div>
        </div>

        <div className="col-span-2 md:col-span-2 flex flex-col justify-center items-center">
          <p className="text-xs text-gray-400 font-medium">vs</p>
        </div>

        {/* Show Odds Button */}
        <div className="col-span-3 md:col-span-3 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-3 md:px-4 py-2 text-xs font-semibold text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-all"
            onClick={(e) => {
              e.stopPropagation()
              window.location.href = `/prediction/${game.id}`
            }}
          >
            Show Odds
          </motion.button>
        </div>
      </div>
    </div>
  </motion.div>
)

export default function LiveScoresSection() {
  const { matches: liveMatches, loading: liveLoading } = useLiveMatches()
  const { matches: upcomingMatches, loading: upcomingLoading } = useUpcomingMatches()

  const [selectedCategory, setSelectedCategory] = useState("live")

  const filteredMatches = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    switch (selectedCategory) {
      case "live":
        return (Array.isArray(liveMatches) ? liveMatches : []).slice(0, 15)
      case "today":
        return (Array.isArray(upcomingMatches) ? upcomingMatches : [])
          .filter((m) => {
            const matchDate = new Date(m.time)
            matchDate.setHours(0, 0, 0, 0)
            return matchDate.getTime() === today.getTime()
          })
          .slice(0, 15)
      case "tomorrow":
        return (Array.isArray(upcomingMatches) ? upcomingMatches : [])
          .filter((m) => {
            const matchDate = new Date(m.time)
            matchDate.setHours(0, 0, 0, 0)
            return matchDate.getTime() === tomorrow.getTime()
          })
          .slice(0, 15)
      default:
        return []
    }
  }, [selectedCategory, liveMatches, upcomingMatches])

  const loading = liveLoading || upcomingLoading

  const categories = [
    { id: "live", label: "Live games", icon: "🔴" },
    { id: "today", label: "Today" },
    { id: "tomorrow", label: "Tomorrow" },
    { id: "calendar", label: "Calendar" },
  ]

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
    <section className="pb-20 border-b border-border bg-gradient-to-b from-transparent via-blue-950/5 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
            <div className="h-2 w-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
            <div className="h-2 w-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
            <h2 className="text-2xl md:text-4xl font-bold text-foreground ml-4">Live Scores</h2>
          </div>
          <p className="text-muted-foreground text-base md:text-lg">Follow matches happening right now</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 md:gap-3 mb-8 md:mb-10 overflow-x-auto pb-4 scrollbar-hide"
        >
          {categories.map((category, idx) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 md:px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 text-sm md:text-base ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                  : "border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
              }`}
            >
              {category.icon && <span className="mr-1">{category.icon}</span>}
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Matches Grid */}
        {filteredMatches.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-3 md:space-y-4"
          >
            {filteredMatches.map((game, idx) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                {game.status === "live" ? <LiveMatchCard game={game} /> : <UpcomingMatchCard game={game} />}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12 md:py-16 px-4"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-500/10 mb-4 md:mb-6">
              <Clock className="h-8 md:h-10 w-8 md:w-10 text-blue-500" />
            </div>
            <h3 className="text-lg md:text-2xl font-bold text-foreground mb-2 md:mb-3">No Matches Right Now</h3>
            <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto">
              There are no matches in this category. Try selecting a different category or check back later.
            </p>
            <Link href="/blog">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 20px rgba(59,130,246,0.3)",
                }}
                className="px-6 md:px-8 py-2 md:py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all duration-300 text-sm md:text-base"
              >
                Read Expert Analysis
              </motion.button>
            </Link>
          </motion.div>
        )}

        {/* View All Button */}
        {filteredMatches.length > 0 && (
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
                className="px-6 md:px-10 py-3 border-1 border-blue-500 text-blue-400 font-semibold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-500 text-sm md:text-lg"
              >
                All Matches →
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}

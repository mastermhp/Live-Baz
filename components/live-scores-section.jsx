"use client"

import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import { useLiveMatches } from "@/hooks/use-live-matches"
import { useUpcomingMatches } from "@/hooks/use-upcoming-matches"
import { useState, useMemo } from "react"

const CompactMatchRow = ({ game, isLive, showOdds }) => {
  const homeWinPercent = game.homeWinPercent || Math.floor(Math.random() * 40) + 30
  const drawPercent = game.drawPercent || Math.floor(Math.random() * 30) + 20
  const awayWinPercent = game.awayWinPercent || 100 - homeWinPercent - drawPercent

  const homeOdds = (100 / homeWinPercent).toFixed(2)
  const drawOdds = (100 / drawPercent).toFixed(2)
  const awayOdds = (100 / awayWinPercent).toFixed(2)

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.03)" }}
      transition={{ duration: 0.2 }}
      onClick={() => (window.location.href = `/match/${game.id}`)}
      className="group grid grid-cols-[60px_1fr_auto_50px_30px] items-center gap-3 px-4 py-2 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
    >
      {/* Time & status */}
      <div className="flex flex-col items-start text-[11px] text-gray-500 font-semibold">
        <span>{isLive ? `${game.minute}'` : game.time || "--:--"}</span>
        <span className={`uppercase ${isLive ? "text-red-600" : "text-gray-400"}`}>
          {isLive ? "LIVE" : game.status || "FT"}
        </span>
      </div>

      {/* Teams */}
      <div className="flex flex-col gap-1 truncate">
        <div className="flex items-center gap-2">
          {game.homeTeamLogo && (
            <img src={game.homeTeamLogo} alt={game.homeTeam} className="w-5 h-5 rounded-full object-contain" />
          )}
          <span className="text-sm text-gray-900 font-medium truncate">{game.homeTeam}</span>
        </div>
        <div className="flex items-center gap-2">
          {game.awayTeamLogo && (
            <img src={game.awayTeamLogo} alt={game.awayTeam} className="w-5 h-5 rounded-full object-contain" />
          )}
          <span className="text-sm text-gray-700 truncate">{game.awayTeam}</span>
        </div>
      </div>

      {/* Odds section */}
      {showOdds && (
        <div className="flex flex-col items-center gap-1">
          <div className="flex gap-2 text-[11px] font-semibold text-gray-400">
            <span>1</span>
            <span>X</span>
            <span>2</span>
          </div>
          <div className="flex gap-2">
            <button className="px-2 py-0.5 text-sm border border-gray-300 rounded-md font-semibold text-gray-800 hover:border-blue-400 hover:text-blue-600 transition">
              {homeOdds}
            </button>
            <button className="px-2 py-0.5 text-sm border border-gray-300 rounded-md font-semibold text-gray-800 hover:border-blue-400 hover:text-blue-600 transition">
              {drawOdds}
            </button>
            <button className="px-2 py-0.5 text-sm border border-gray-300 rounded-md font-semibold text-gray-800 hover:border-blue-400 hover:text-blue-600 transition">
              {awayOdds}
            </button>
          </div>
        </div>
      )}

      {/* Scores */}
      <div className="flex flex-col items-center text-sm font-bold text-gray-900">
        <span>{game.homeScore ?? 0}</span>
        <span>{game.awayScore ?? 0}</span>
      </div>

      {/* Favorite star */}
      <button
        onClick={(e) => e.stopPropagation()}
        className="text-gray-400 hover:text-yellow-500 transition text-lg"
      >
        ☆
      </button>
    </motion.div>
  )
}

const LeagueHeader = ({ country, leagueName, flag, leagueLogo }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200">
    {leagueLogo ? (
      <img src={leagueLogo} alt={leagueName} className="w-5 h-5 object-contain rounded-full" />
    ) : (
      <span className="text-lg">{flag}</span>
    )}
    <div>
      <div className="text-[11px] text-gray-500">{country}</div>
      <div className="text-sm font-bold text-gray-900">{leagueName}</div>
    </div>
  </div>
)

export default function LiveScoresSection() {
  const { matches: liveMatches, loading: liveLoading } = useLiveMatches()
  const { matches: upcomingMatches, loading: upcomingLoading } = useUpcomingMatches()

  const [selectedCategory, setSelectedCategory] = useState("live")
  const [showOdds, setShowOdds] = useState(true)

  const groupedMatches = useMemo(() => {
    const matches =
      selectedCategory === "live"
        ? liveMatches || []
        : upcomingMatches || []

    const grouped = {}
    matches.forEach((match) => {
      const key = match.league
      if (!grouped[key]) {
        grouped[key] = {
          country: match.country,
          league: match.league,
          flag: match.countryFlag || "🏳️",
          leagueLogo: match.leagueLogo,
          matches: [],
        }
      }
      grouped[key].matches.push(match)
    })
    return Object.values(grouped)
  }, [selectedCategory, liveMatches, upcomingMatches])

  const loading = liveLoading || upcomingLoading

  const categories = [
    { id: "live", label: `Live (${liveMatches?.length || 0})` },
    { id: "today", label: "Today" },
    { id: "tomorrow", label: "Tomorrow" },
  ]

  if (loading) {
    return (
      <section className="py-6 border-b border-gray-200 text-center text-gray-600 text-sm">
        Loading matches...
      </section>
    )
  }

  return (
    <section className="py-4 border-b border-gray-200">
      {/* Top Controls */}
      <div className="flex items-center justify-between mb-4">
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Odds Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">Odds</span>
          <button
            onClick={() => setShowOdds(!showOdds)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showOdds ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showOdds ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* League and Matches */}
      {groupedMatches.length > 0 ? (
        <div className="space-y-4">
          {groupedMatches.map((group) => (
            <motion.div key={group.league} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
              <LeagueHeader
                country={group.country}
                leagueName={group.league}
                flag={group.flag}
                leagueLogo={group.leagueLogo}
              />
              <div>
                {group.matches.slice(0, 15).map((game) => (
                  <CompactMatchRow
                    key={game.id}
                    game={game}
                    isLive={selectedCategory === "live"}
                    showOdds={showOdds}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 text-sm">
          <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
          No matches available
        </div>
      )}
    </section>
  )
}

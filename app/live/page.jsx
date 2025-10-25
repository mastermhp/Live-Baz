"use client"

import { useState, useMemo, memo } from "react"
import { motion } from "framer-motion"
import Header from "@/components/header"
import { Card } from "@/components/ui/card"
import { Flame, Radio, TrendingUp, Clock } from "lucide-react"
import Footer from "@/components/footer"
import { useLiveMatchesCache, useUpcomingMatchesCache } from "@/lib/swr-config"
import { transformMatches } from "@/lib/transform-api-data"
import Link from "next/link"

const LiveMatchCardFull = memo(({ game }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }}
    whileHover={{ scale: 1.02, x: 8 }}
    onClick={() => (window.location.href = `/match/${game.id}`)}
    className="group relative overflow-hidden rounded-xl md:rounded-2xl backdrop-blur-md shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 hover:shadow-lg bg-gray-900/0 cursor-pointer"
  >
    {/* Live Indicator */}
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-red-500 via-blue-600 to-transparent" />

    <div className="p-4 md:p-3">
      {/* Main content row with grid alignment */}
      <div className="grid grid-cols-12 gap-2 md:gap-4 items-start">
        {/* Left: Animated minute (1 col) */}
        <div className="w-full my-auto col-span-1 md:col-span-1 flex items-center gap-1.5 md:gap-2">
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.2,
            }}
            className="inline-block h-2 md:h-2.5 w-2 md:w-2.5 bg-red-500 rounded-full shadow-lg shadow-red-500/50 flex-shrink-0"
          />
          <motion.div
            className="flex flex-col gap-0.5"
            animate={{ y: [0, -2, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              delay: 0.3,
            }}
          >
            <motion.span
              className="text-[10px] md:text-xs font-bold text-red-500 uppercase tracking-wider leading-none"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
              }}
            >
              {game.minute}'
            </motion.span>
          </motion.div>
        </div>

        {/* Home Team (3 cols) */}
        <div className="col-span-3 md:col-span-3 flex flex-col items-center gap-0.5 h-full">
          <div className="flex items-center justify-center h-7 md:h-9">
            {game.homeTeamLogo ? (
              <img
                src={game.homeTeamLogo || "/placeholder.svg"}
                alt={game.homeTeam}
                className="w-7 h-7 md:w-10 md:h-10 rounded-full object-contain shadow-lg shadow-blue-500/20"
              />
            ) : (
              <span className="text-lg md:text-xl">⚽</span>
            )}
          </div>
          <p className="text-[8px] md:text-[9px] text-gray-400 font-medium uppercase tracking-wide leading-none mt-2">
            Home
          </p>
          <p className="text-[9px] md:text-xs font-bold text-gray-600 truncate w-full text-center px-0.5 leading-tight mt-2">
            {game.homeTeam}
          </p>
          {game.statistics && (
            <div className="text-[7px] md:text-[8px] text-gray-500 mt-1 space-y-0.5 w-full">
              <div className="flex justify-center gap-1">
                <span>SOG: {game.statistics.home?.shotsOnGoal || 0}</span>
              </div>
              <div className="flex justify-center gap-1">
                <span>Poss: {game.statistics.home?.possession || 0}%</span>
              </div>
            </div>
          )}
        </div>

        {/* Score Box (2 cols) */}
        <div className="w-full my-auto col-span-2 md:col-span-2 flex items-center justify-center px-2 md:px-2.5 py-2 md:py-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg md:rounded-lg border border-blue-500/30 shadow-lg shadow-blue-500/10">
          <span className="text-lg md:text-2xl font-extrabold text-blue-400">{game.homeScore}</span>
          <span className="text-sm md:text-base text-gray-500 font-light mx-0.5 md:mx-1">:</span>
          <span className="text-lg md:text-2xl font-extrabold text-cyan-400">{game.awayScore}</span>
        </div>

        {/* Away Team (3 cols) */}
        <div className="col-span-3 md:col-span-3 flex flex-col items-center gap-0.5 h-full">
          <div className="flex items-center justify-center h-7 md:h-9">
            {game.awayTeamLogo ? (
              <img
                src={game.awayTeamLogo || "/placeholder.svg"}
                alt={game.awayTeam}
                className="w-7 h-7 md:w-10 md:h-10 rounded-full object-contain shadow-lg shadow-cyan-500/20"
              />
            ) : (
              <span className="text-lg md:text-xl">⚽</span>
            )}
          </div>
          <p className="text-[8px] md:text-[9px] text-gray-400 font-medium uppercase tracking-wide leading-none mt-2">
            Away
          </p>
          <p className="text-[9px] md:text-xs font-bold text-gray-600 truncate w-full text-center px-0.5 leading-tight mt-2">
            {game.awayTeam}
          </p>
          {game.statistics && (
            <div className="text-[7px] md:text-[8px] text-gray-500 mt-1 space-y-0.5 w-full">
              <div className="flex justify-center gap-1">
                <span>SOG: {game.statistics.away?.shotsOnGoal || 0}</span>
              </div>
              <div className="flex justify-center gap-1">
                <span>Poss: {game.statistics.away?.possession || 0}%</span>
              </div>
            </div>
          )}
        </div>

        {/* Right side: League badge with flag (3 cols) */}
        <div className="col-span-3 md:col-span-3 flex flex-col items-end gap-1.5 md:gap-2">
          <div className="flex items-center gap-1.5 text-[5px] md:text-[6px] text-gray-600 px-1.5 md:px-2 py-0.5 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border border-blue-500/40 rounded-full font-semibold uppercase tracking-wider whitespace-nowrap">
            {game.leagueLogo && (
              <img
                src={game.leagueLogo || "/placeholder.svg"}
                alt={game.league}
                className="h-3 md:h-4 w-3 md:w-4 rounded-full object-contain"
              />
            )}
            <span>{game.league}</span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
))

LiveMatchCardFull.displayName = "LiveMatchCardFull"

const UpcomingMatchCardFull = memo(({ game }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }}
    whileHover={{ scale: 1.01, x: 4 }}
    onClick={() => (window.location.href = `/match/${game.id}`)}
    className="group relative overflow-hidden border border-blue-500/30 hover:border-blue-500/70 transition-all duration-300 backdrop-blur-sm p-3 md:p-5 cursor-pointer rounded-lg md:rounded-xl"
  >
    {/* League Badge with flag */}
    <span className="absolute -top-3 -left-3 md:-top-3 md:-left-4 z-20 px-2 py-0.5 md:pl-6 md:pt-3 text-[7px] md:text-[7px] bg-gradient-to-r from-blue-600 to-cyan-500 border border-blue-500/50 rounded-full font-semibold uppercase tracking-wider whitespace-nowrap text-white flex items-center gap-1">
      {game.leagueLogo && (
        <img
          src={game.leagueLogo || "/placeholder.svg"}
          alt={game.league}
          className="h-3 md:h-3 w-3 md:w-3 rounded-full object-contain"
        />
      )}
      <span>{game.league}</span>
    </span>

    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
      {/* Time */}
      <div className="flex items-center gap-2 md:gap-3 flex-1 w-full md:w-auto">
        <span className="flex gap-2 mt-1 text-xs md:text-sm font-semibold text-blue-400">
          <Clock className="h-3 md:h-4 w-3 md:w-4 text-blue-400" />
          {game.time}
        </span>
      </div>

      {/* Teams with Logos */}
      <div className="flex-1 flex items-center justify-center gap-3 md:gap-6 px-0 md:px-6 w-full md:w-auto">
        {/* Team 1 */}
        <div className="flex items-center justify-end gap-2 flex-1 min-w-[100px] md:min-w-[120px]">
          <p className="text-xs md:text-sm font-semibold text-gray-500 text-right whitespace-nowrap">{game.homeTeam}</p>
          {game.homeTeamLogo ? (
            <img
              src={game.homeTeamLogo || "/placeholder.svg"}
              alt={game.homeTeam}
              className="w-8 h-8 md:w-12 md:h-12 rounded-full object-contain"
            />
          ) : (
            <span className="text-lg">⚽</span>
          )}
        </div>

        <span className="text-blue-500 font-bold text-xs md:text-base">vs</span>

        {/* Team 2 */}
        <div className="flex items-center justify-start gap-2 flex-1 min-w-[100px] md:min-w-[120px]">
          {game.awayTeamLogo ? (
            <img
              src={game.awayTeamLogo || "/placeholder.svg"}
              alt={game.awayTeam}
              className="w-8 h-8 md:w-12 md:h-12 rounded-full object-contain"
            />
          ) : (
            <span className="text-lg">⚽</span>
          )}
          <p className="text-xs md:text-sm font-semibold text-gray-500 text-left whitespace-nowrap">{game.awayTeam}</p>
        </div>
      </div>

      {/* Action */}
      <div className="flex-1 flex justify-end w-full md:w-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-3 md:px-4 py-1.5 text-xs md:text-sm font-semibold text-blue-400 border border-blue-500/50 rounded-2xl hover:bg-blue-500/10 transition-all duration-300"
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
))

UpcomingMatchCardFull.displayName = "UpcomingMatchCardFull"

export default function LivePage() {
  const [filter, setFilter] = useState("all")

  const { matches: liveMatches, loading: liveLoading } = useLiveMatchesCache()
  const { matches: upcomingMatches, loading: upcomingLoading } = useUpcomingMatchesCache(1)

  const transformedLive = useMemo(
    () => (Array.isArray(liveMatches) ? transformMatches(liveMatches) : []),
    [liveMatches],
  )
  const transformedUpcoming = useMemo(
    () => (Array.isArray(upcomingMatches) ? transformMatches(upcomingMatches) : []),
    [upcomingMatches],
  )
  const loading = liveLoading || upcomingLoading

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-green-50/30">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-float-delayed" />

        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <div className="flex items-center gap-4 mb-6 animate-slide-up">
            <div className="relative">
              <Radio className="h-12 w-12 text-white animate-pulse" />
              <div className="absolute inset-0 h-12 w-12 bg-white rounded-full blur-xl opacity-50 animate-pulse" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-2 text-balance">Live Matches</h1>
              <p className="text-xl text-white/90">Real-time scores and instant updates</p>
            </div>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg border-white/20 p-6 hover:bg-white/20 transition-all duration-300 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <Flame className="h-6 w-6 text-green-300" />
                <span className="text-sm text-white/80">Live Now</span>
              </div>
              <div className="text-4xl font-bold">{transformedLive.length}</div>
            </motion.div>
            <Card
              className="bg-white/10 backdrop-blur-lg border-white/20 p-6 hover:bg-white/20 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-6 w-6 text-blue-300" />
                <span className="text-sm text-white/80">Goals Today</span>
              </div>
              <div className="text-4xl font-bold">
                {transformedLive.reduce((sum, match) => sum + (match.homeScore || 0) + (match.awayScore || 0), 0)}
              </div>
            </Card>
            <Card
              className="bg-white/10 backdrop-blur-lg border-white/20 p-6 hover:bg-white/20 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-6 w-6 text-yellow-300" />
                <span className="text-sm text-white/80">Starting Soon</span>
              </div>
              <div className="text-4xl font-bold">{transformedUpcoming.length}</div>
            </Card>
            <Card
              className="bg-white/10 backdrop-blur-lg border-white/20 p-6 hover:bg-white/20 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Radio className="h-6 w-6 text-red-300" />
                <span className="text-sm text-white/80">Viewers</span>
              </div>
              <div className="text-4xl font-bold">2.4M</div>
            </Card>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
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
              onClick={() => setFilter(tab)}
            >
              {tab}
            </motion.button>
          ))}
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12 md:py-16 px-4"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-500/10 mb-4 md:mb-6">
              <Radio className="h-8 md:h-10 w-8 md:w-10 text-blue-500 animate-spin" />
            </div>
            <p className="text-gray-600">Loading live matches...</p>
          </motion.div>
        ) : transformedLive.length > 0 || transformedUpcoming.length > 0 ? (
          <>
            {/* Live Games Section */}
            {transformedLive.length > 0 && (
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
                  {transformedLive.map((game) => (
                    <LiveMatchCardFull key={game.id} game={game} />
                  ))}
                </motion.div>
              </div>
            )}

            {/* Upcoming Games Section */}
            {transformedUpcoming.length > 0 && (
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
                  {transformedUpcoming.map((game) => (
                    <UpcomingMatchCardFull key={game.id} game={game} />
                  ))}
                </motion.div>
              </div>
            )}
          </>
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
              There are no live matches or scheduled matches for today. Check back later or explore our expert analysis
              and predictions.
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
      </main>
      <Footer />
    </div>
  )
}

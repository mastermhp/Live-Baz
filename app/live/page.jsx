"use client"

import { useState, useMemo, memo } from "react"
import { motion } from "framer-motion"
import Header from "@/components/header"
import { Card } from "@/components/ui/card"
import { Flame, Radio, TrendingUp, Clock } from "lucide-react"
import Footer from "@/components/footer"
import { useLiveMatchesCache, useUpcomingMatchesCache, useFinishedMatchesCache } from "@/lib/swr-config"
import { transformMatches } from "@/lib/transform-api-data"
import { groupMatchesByLeague, calculateLeagueStats } from "@/lib/league-utils"
import LiveMatchCardCompact from "@/components/live-match-card-compact"
import Link from "next/link"

const LiveMatchCardFull = memo(({ game }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }}
    whileHover={{ scale: 1.02, x: 8 }}
    onClick={() => (window.location.href = `/match/${game.id}`)}
    className="group relative overflow-hidden rounded-xl md:rounded-2xl backdrop-blur-md shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 hover:shadow-lg cursor-pointer"
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

const UpcomingMatchCardCompact = memo(({ game }) => (
  <Link href={`/match/${game.id}`}>
    <motion.div
      whileHover={{ x: 4 }}
      className="group relative overflow-hidden rounded-lg backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 mb-2 bg-gradient-to-r from-gray-900/40 to-gray-900/20 border border-blue-500/20 hover:border-blue-500/40 p-3 cursor-pointer"
    >
      <div className="flex flex-col gap-2">
        {/* Time and League */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-blue-600">{game.time}</span>
          <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-600/20 rounded-full border border-blue-500/30">
            {game.leagueLogo && (
              <img
                src={game.leagueLogo || "/placeholder.svg"}
                alt={game.league}
                className="h-3 w-3 rounded-full object-contain"
              />
            )}
            <span className="text-[8px] font-semibold text-blue-600 uppercase">{game.league}</span>
          </div>
        </div>

        {/* Teams */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <img
              src={game.homeTeamLogo || "/placeholder.svg"}
              alt={game.homeTeam}
              className="w-6 h-6 rounded-full object-contain flex-shrink-0"
            />
            <span className="text-xs font-semibold text-gray-200 truncate">{game.homeTeam}</span>
          </div>
          <span className="text-xs text-gray-500 font-semibold">vs</span>
          <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-end">
            <span className="text-xs font-semibold text-gray-100 truncate">{game.awayTeam}</span>
            <img
              src={game.awayTeamLogo || "/placeholder.svg"}
              alt={game.awayTeam}
              className="w-6 h-6 rounded-full object-contain flex-shrink-0"
            />
          </div>
        </div>
      </div>
    </motion.div>
  </Link>
))

UpcomingMatchCardCompact.displayName = "UpcomingMatchCardCompact"

export default function LivePage() {
  const [filter, setFilter] = useState("all")
  const [rightPanelTab, setRightPanelTab] = useState("upcoming")

  const { matches: liveMatches, loading: liveLoading } = useLiveMatchesCache()
  const { matches: upcomingMatches, loading: upcomingLoading } = useUpcomingMatchesCache(1)
  const { matches: finishedMatches, loading: finishedLoading } = useFinishedMatchesCache(1)

  const transformedLive = useMemo(
    () => (Array.isArray(liveMatches) ? transformMatches(liveMatches) : []),
    [liveMatches],
  )
  const transformedUpcoming = useMemo(
    () => (Array.isArray(upcomingMatches) ? transformMatches(upcomingMatches) : []),
    [upcomingMatches],
  )
  const transformedFinished = useMemo(
    () => (Array.isArray(finishedMatches) ? transformMatches(finishedMatches) : []),
    [finishedMatches],
  )

  const groupedLiveMatches = useMemo(() => groupMatchesByLeague(transformedLive), [transformedLive])
  const leagueStats = useMemo(
    () =>
      groupedLiveMatches.map((group) => ({
        ...group,
        stats: calculateLeagueStats(group.matches),
      })),
    [groupedLiveMatches],
  )

  const loading = liveLoading || upcomingLoading || finishedLoading

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  }

  const rightPanelMatches = rightPanelTab === "upcoming" ? transformedUpcoming : transformedFinished
  const rightPanelLoading = rightPanelTab === "upcoming" ? upcomingLoading : finishedLoading

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-green-50/30">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden  bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white">
        <img
          src="/livebg1.jpg"
          alt="Abstract football texture"
          className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-screen pointer-events-none"
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-black/30 rounded-full blur-3xl animate-float" />
        <div className="absolute top-0 right-0 w-full h-full bg-black/50 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/30 rounded-full blur-3xl animate-float-delayed" />

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Live Matches */}
          <div className="lg:col-span-2">
            {loading && liveLoading ? (
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
            ) : leagueStats.length > 0 ? (
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg md:text-2xl font-bold text-gray-600 mb-4 md:mb-6 flex items-center gap-2"
                >
                  <TrendingUp className="h-5 md:h-6 w-5 md:w-6 text-red-500" />
                  Currently Live
                </motion.h3>

                {leagueStats.map((leagueGroup) => (
                  <motion.div
                    key={leagueGroup.leagueId}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    {/* League Header with Stats */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-blue-500/30">
                      <div className="flex items-center gap-3">
                        {leagueGroup.leagueLogo && (
                          <img
                            src={leagueGroup.leagueLogo || "/placeholder.svg"}
                            alt={leagueGroup.league}
                            className="h-8 w-8 rounded-full object-contain"
                          />
                        )}
                        <h4 className="text-lg font-bold text-gray-700">{leagueGroup.league}</h4>
                      </div>

                      {/* League Statistics */}
                      <div className="flex gap-2 md:gap-4 text-xs md:text-xs">
                        <div className="text-center">
                          <div className="font-bold text-blue-600">{leagueGroup.stats.bttsPercentage}%</div>
                          <div className="text-gray-600">BTTS</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-green-600">{leagueGroup.stats.over25Percentage}%</div>
                          <div className="text-gray-600">Over 2.5</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-purple-600">{leagueGroup.stats.over15Percentage}%</div>
                          <div className="text-gray-600">Over 1.5</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-orange-600">{leagueGroup.stats.averageGoals}</div>
                          <div className="text-gray-600">Avg Goals</div>
                        </div>
                      </div>
                    </div>

                    {/* Matches for this league */}
                    <div className="space-y-2">
                      {leagueGroup.matches.map((game) => (
                        <LiveMatchCardCompact key={game.id} game={game} />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
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
                <h3 className="text-lg md:text-2xl font-bold text-foreground mb-2 md:mb-3">No Live Matches</h3>
                <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto">
                  There are no live matches right now. Check the upcoming matches on the right or explore our expert
                  analysis.
                </p>
              </motion.div>
            )}
          </div>

          {/* RIGHT COLUMN: Upcoming/Finished Matches with Toggle */}
          <div className="lg:col-span-1">
            <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setRightPanelTab("upcoming")}
                className={`flex-1 px-4 py-2 rounded-md font-semibold transition-all duration-300 text-sm ${
                  rightPanelTab === "upcoming"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Upcoming
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setRightPanelTab("finished")}
                className={`flex-1 px-4 py-2 rounded-md font-semibold transition-all duration-300 text-sm ${
                  rightPanelTab === "finished"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Finished
              </motion.button>
            </div>

            {rightPanelLoading ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8 px-4"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 mb-3">
                  <Radio className="h-6 w-6 text-blue-500 animate-spin" />
                </div>
                <p className="text-sm text-gray-600">Loading matches...</p>
              </motion.div>
            ) : rightPanelMatches.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                className="space-y-2 md:space-y-3"
              >
                {rightPanelMatches.map((game) => (
                  <UpcomingMatchCardCompact key={game.id} game={game} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8 px-4"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 mb-3">
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
                <h4 className="text-sm font-bold text-foreground mb-1">No {rightPanelTab} matches</h4>
                <p className="text-xs text-muted-foreground">
                  {rightPanelTab === "upcoming"
                    ? "Check back later for upcoming matches"
                    : "No finished matches to display"}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

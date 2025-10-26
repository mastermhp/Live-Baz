"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, TrendingUp } from "lucide-react";
import { useLiveMatches } from "@/hooks/use-live-matches";
import { useUpcomingMatches } from "@/hooks/use-upcoming-matches";
import { calculateLeagueStats } from "@/lib/league-utils";
import { memo } from "react";

const LiveMatchCard = memo(({ game, leagueStats }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      whileHover={{ scale: 1.02, x: 8 }}
      onClick={() => (window.location.href = `/match/${game.id}`)}
      className="group relative overflow-hidden rounded-xl md:rounded-2xl backdrop-blur-md shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 hover:shadow-lg bg-gray-900/0 cursor-pointer"
    >
      <span className="absolute -top-3 -left-3 md:-top-3 md:-left-4 z-20 px-2 py-0.5 md:pl-6 md:pt-3 text-[7px] md:text-[7px] bg-gradient-to-r from-blue-600 to-cyan-500 border border-blue-500/50 rounded-full font-semibold uppercase tracking-wider whitespace-nowrap text-white flex items-center gap-1">
        <span>{game.league}</span>
      </span>

      {/* Live Indicator */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-red-500 via-blue-600 to-transparent" />

      <div className="p-4 md:p-3">
        {/* Main content row with grid alignment */}
        <div className="grid grid-cols-12 gap-2 md:gap-4 items-start">
          {/* Left: Animated minute with pop animation (1 col) */}
          <div className="w-full h-full my-auto col-span-1 md:col-span-2 flex items-center gap-1.5 md:gap-2">
            {game.leagueLogo && (
              <div className="shadow-blue-500/20 shadow-2xl p-1">
                <img
                  src={game.leagueLogo || "/placeholder.svg"}
                  alt={game.league}
                  className="h-9 md:h-11 w-9 md:w-11 rounded-md bg-black/50 object-contain shadow-xl shadow-blue-500/30"
                />
              </div>
            )}
            <div className="flex flex-col">
              <motion.div
                className=""
                animate={{ scale: [1, 1.1, 1], opacity: [1, 0.6, 1] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1,
                  delay: 0.2,
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
              <p className="text-red-500 text-[11px] "> LIVE</p>
            </div>
          </div>

          {/* Home Team (3 cols) */}
          <div className="col-span-3 md:col-span-3 flex flex-col items-end justify-center gap-0.5 h-full">
            <div className="flex items-center justify-center gap-3">
              <div className="">
                <p className="text-[8px] md:text-[10px] text-center text-gray-400 font-medium uppercase tracking-wide leading-none mt-2">
                  Home
                </p>
                <p className="text-[9px] md:text-[14px] font-bold text-gray-600 truncate w-full text-center px-0.5 leading-tight mt-2">
                  {game.homeTeam}
                </p>
              </div>
              <div className="">
                {game.homeTeamLogo ? (
                  <img
                    src={game.homeTeamLogo || "/placeholder.svg"}
                    alt={game.homeTeam}
                    className="w-8 h-8 md:w-12 md:h-12 rounded-full object-contain shadow-lg shadow-blue-500/20"
                  />
                ) : (
                  <span className="text-lg md:text-xl">⚽</span>
                )}
              </div>
            </div>
          </div>

          {/* Score Box (2 cols) */}
          <div className="col-span-2 md:col-span-2 w-full my-auto px-6">
            <div className=" flex items-center justify-center px-2 md:px-2.5 py-2 md:py-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg md:rounded-lg border border-blue-500/30 shadow-lg shadow-blue-500/10">
              <span className="text-lg md:text-2xl font-extrabold text-blue-400">
                {game.homeScore}
              </span>
              <span className="text-sm md:text-base text-gray-500 font-light mx-0.5 md:mx-1">
                :
              </span>
              <span className="text-lg md:text-2xl font-extrabold text-cyan-400">
                {game.awayScore}
              </span>
            </div>
          </div>

          {/* Away Team (3 cols) */}
          <div className="col-span-3 md:col-span-3 flex flex-col items-start justify-center gap-0.5 h-full">
            <div className="flex items-center justify-center gap-3">
              <div className="">
                {game.awayTeamLogo ? (
                  <img
                    src={game.awayTeamLogo || "/placeholder.svg"}
                    alt={game.awayTeam}
                    className="w-8 h-8 md:w-12 md:h-12 rounded-full object-contain shadow-lg shadow-cyan-500/20"
                  />
                ) : (
                  <span className="text-lg md:text-xl">⚽</span>
                )}
              </div>
              <div className="">
                <p className="text-[8px] md:text-[10px] text-center text-gray-400 font-medium uppercase tracking-wide leading-none mt-2">
                  Away
                </p>
                <p className="text-[9px] md:text-[14px] font-bold text-gray-600 truncate w-full text-center px-0.5 leading-tight mt-2">
                  {game.awayTeam}
                </p>
              </div>
            </div>
          </div>

          {/* Right side: League badge with country flag and stats (3 cols) */}
          <div className="col-span-3 md:col-span-2 flex flex-col items-end gap-2 md:gap-2.5">
            {leagueStats && (
              <div className="grid grid-cols-2 gap-1.5 md:gap-2 w-full text-right">
                <div className="text-center px-1.5 py-1 bg-blue-500/10 rounded border border-blue-500/20">
                  <p className="text-[7px] md:text-[8px] text-blue-400 font-bold">
                    {leagueStats.bttsPercentage}%
                  </p>
                  <p className="text-[6px] md:text-[7px] text-gray-500 uppercase">
                    BTTS
                  </p>
                </div>
                <div className="text-center px-1.5 py-1 bg-green-500/10 rounded border border-green-500/20">
                  <p className="text-[7px] md:text-[8px] text-green-400 font-bold">
                    {leagueStats.over25Percentage}%
                  </p>
                  <p className="text-[6px] md:text-[7px] text-gray-500 uppercase">
                    O2.5
                  </p>
                </div>
                <div className="text-center px-1.5 py-1 bg-purple-500/10 rounded border border-purple-500/20">
                  <p className="text-[7px] md:text-[8px] text-purple-400 font-bold">
                    {leagueStats.over15Percentage}%
                  </p>
                  <p className="text-[6px] md:text-[7px] text-gray-500 uppercase">
                    O1.5
                  </p>
                </div>
                <div className="text-center px-1.5 py-1 bg-orange-500/10 rounded border border-orange-500/20">
                  <p className="text-[7px] md:text-[8px] text-orange-400 font-bold">
                    {leagueStats.averageGoals}
                  </p>
                  <p className="text-[6px] md:text-[7px] text-gray-500 uppercase">
                    Avg
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

LiveMatchCard.displayName = "LiveMatchCard";

const UpcomingMatchCard = memo(({ game }) => (
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
      <span>{game.league}</span>
    </span>

    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
      {/* Time */}
      <div className="flex items-center gap-2 md:gap-3 flex-1 w-full md:w-auto">
        <span className="flex items-center justify-center gap-2 mt-1 text-xs md:text-sm font-semibold text-blue-400">
          {/* <Clock className="h-3 md:h-4 w-3 md:w-4 text-blue-400" /> */}
          {game.leagueLogo && (
            <img
              src={game.leagueLogo || "/placeholder.svg"}
              alt={game.league}
              className="h-3 md:h-11 w-3 md:w-11 rounded-full object-contain"
            />
          )}
          {game.time}
        </span>
      </div>

      {/* Teams with Logos */}
      <div className="flex-1 flex items-center justify-center gap-3 md:gap-6 px-0 md:px-6 w-full md:w-auto">
        {/* Team 1 */}
        <div className="flex items-center justify-end gap-2 flex-1 min-w-[100px] md:min-w-[120px]">
          <p className="text-xs md:text-sm font-semibold text-gray-500 text-right whitespace-nowrap">
            {game.homeTeam}
          </p>
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
          <p className="text-xs md:text-sm font-semibold text-gray-500 text-left whitespace-nowrap">
            {game.awayTeam}
          </p>
        </div>
      </div>

      {/* Action */}
      <div className="flex-1 flex justify-end w-full md:w-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-3 md:px-4 py-1.5 text-xs md:text-sm font-semibold text-blue-400 border border-blue-500/50 rounded-2xl hover:bg-blue-500/10 transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = `/prediction/${game.id}`;
          }}
        >
          Prediction
        </motion.button>
      </div>
    </div>
  </motion.div>
));

UpcomingMatchCard.displayName = "UpcomingMatchCard";

export default function LiveScoresSection() {
  const {
    matches: liveMatches,
    loading: liveLoading,
    error: liveError,
  } = useLiveMatches();
  const {
    matches: upcomingMatches,
    loading: upcomingLoading,
    error: upcomingError,
  } = useUpcomingMatches();

  console.log(
    "[v0] LiveScoresSection - liveMatches:",
    liveMatches?.length,
    "loading:",
    liveLoading
  );
  console.log(
    "[v0] LiveScoresSection - upcomingMatches:",
    upcomingMatches?.length,
    "loading:",
    upcomingLoading
  );
  console.log("[v0] Full liveMatches data:", liveMatches);

  const liveGames = (Array.isArray(liveMatches) ? liveMatches : []).slice(0, 5);
  const upcomingGames = (
    Array.isArray(upcomingMatches) ? upcomingMatches : []
  ).slice(0, 5);
  const loading = liveLoading || upcomingLoading;

  const leagueStatsMap = {};
  liveGames.forEach((game) => {
    if (!leagueStatsMap[game.leagueId]) {
      const leagueMatches = liveMatches.filter(
        (m) => m.leagueId === game.leagueId
      );
      leagueStatsMap[game.leagueId] = calculateLeagueStats(leagueMatches);
    }
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  if (loading) {
    return (
      <section className="py-8 md:py-16 border-b border-border bg-gradient-to-b from-transparent via-blue-950/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-600">Loading live matches...</p>
          </div>
        </div>
      </section>
    );
  }

  const hasData = liveGames.length > 0 || upcomingGames.length > 0;

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
          <div className="flex items-center gap-1 mb-4">
            <div className="h-1 w-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
            <div className="h-2 w-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
            <div className="h-2 w-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
            <h2 className="text-2xl md:text-4xl font-bold text-foreground ml-4">
              Live Scores
            </h2>
          </div>
          <p className="text-muted-foreground text-base md:text-lg">
            Follow matches happening right now
          </p>
        </motion.div>

        {!hasData ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12 md:py-16 px-4"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-500/10 mb-4 md:mb-6">
              <Clock className="h-8 md:h-10 w-8 md:w-10 text-blue-500" />
            </div>
            <h3 className="text-lg md:text-2xl font-bold text-foreground mb-2 md:mb-3">
              No Matches Right Now
            </h3>
            <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto">
              There are no live matches or scheduled matches for today. Check
              back later or explore our expert analysis and predictions.
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
        ) : (
          <>
            {/* Tabs - Responsive */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex gap-2 md:gap-3 mb-8 md:mb-10 overflow-x-auto pb-4 scrollbar-hide"
            >
              {["Live games", "Today", "Tomorrow", "Calendar"].map(
                (tab, idx) => (
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
                )
              )}
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
                    <LiveMatchCard
                      key={game.id}
                      game={game}
                      leagueStats={leagueStatsMap[game.leagueId]}
                    />
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
                    <UpcomingMatchCard key={game.id} game={game} />
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
                  className="px-6 md:px-10 py-3 border-1 border-blue-500 text-blue-400 font-semibold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-500 text-sm md:text-lg"
                >
                  All Matches →
                </motion.button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}

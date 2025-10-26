"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, TrendingUp, Clock, Target, Shield } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/footer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function MatchDetailsPage({ params }) {
  const unwrappedParams = use(params);
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await fetch(`/api/matches/${unwrappedParams.id}`);
        if (!response.ok)
          throw new Error(`Failed to fetch match: ${response.status}`);

        const data = await response.json();
        if (data.response && data.response.length > 0) {
          const fixture = data.response[0];
          setMatch(fixture);
          console.log("[v0] Match details loaded:", fixture);

          if (["LIVE", "1H", "2H"].includes(fixture.fixture?.status?.short)) {
            if (!refreshInterval) {
              const interval = setInterval(() => fetchMatchDetails(), 2000);
              setRefreshInterval(interval);
            }
          } else if (refreshInterval) {
            clearInterval(refreshInterval);
            setRefreshInterval(null);
          }
        } else {
          setError("Match not found");
        }
      } catch (err) {
        console.error("[v0] Error fetching match:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDetails();
    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [unwrappedParams.id, refreshInterval]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Header />
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading match details...</p>
        </div>
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Card className="p-8 text-center bg-red-500/10 border-red-500/30">
            <p className="text-red-400 font-semibold text-lg">
              {error || "Match not found"}
            </p>
            <Link
              href="/"
              className="text-blue-400 hover:text-blue-300 mt-4 inline-block"
            >
              ← Back to Home
            </Link>
          </Card>
        </main>
      </div>
    );
  }

  const homeTeam = match.teams?.home;
  const awayTeam = match.teams?.away;
  const homeScore = match.goals?.home || 0;
  const awayScore = match.goals?.away || 0;
  const league = match.league;
  const fixture = match.fixture;
  const stats = match.statistics || [];
  const events = match.events || [];
  const lineups = match.lineups || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      {/* Animated background elements */}
      <motion.div
        animate={{ opacity: [0.05, 0.15, 0.05], scale: [1, 1.05, 1] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8 }}
        className="fixed -top-40 -right-40 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.03, 0.1, 0.03], scale: [1.1, 1, 1.1] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 10 }}
        className="fixed -bottom-40 -left-40 w-96 h-96 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none"
      />

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section with Match Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-2xl"
            style={{
              backgroundImage: `url('/stadium.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/95" />

            <div className="relative p-8 md:p-12">
              {/* League and Status */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  {league?.logo && (
                    <Image
                      src={league.logo || "/placeholder.svg"}
                      alt={league.name}
                      width={50}
                      height={50}
                      className="rounded-lg object-contain bg-white/10 p-2"
                    />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-blue-400">
                      {league?.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      Round {league?.round}
                    </p>
                  </div>
                </div>

                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                >
                  <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/50 px-4 py-2 text-sm">
                    <span className="h-2 w-2 rounded-full bg-white mr-2 animate-pulse" />
                    {fixture?.status?.short === "LIVE"
                      ? `LIVE ${fixture?.elapsed || 0}'`
                      : fixture?.status?.long || "TBA"}
                  </Badge>
                </motion.div>
              </div>
              {/* Score Display */}
              <div className="flex items-center justify-between gap-8">
                {/* Home Team */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex-1 text-center"
                >
                  <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/50">
                    {homeTeam?.logo ? (
                      <Image
                        src={homeTeam.logo || "/placeholder.svg"}
                        alt={homeTeam.name}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-white font-bold text-3xl">
                        {homeTeam?.name?.slice(0, 3).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {homeTeam?.name}
                  </h2>
                  <p className="text-sm text-blue-300">Home</p>
                </motion.div>

                {/* Score */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-6"
                >
                  <div className="text-center">
                    <span className="text-7xl md:text-8xl font-black bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                      {homeScore}
                    </span>
                  </div>
                  <span className="text-4xl text-blue-600 font-bold">:</span>
                  <div className="text-center">
                    <span className="text-7xl md:text-8xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                      {awayScore}
                    </span>
                  </div>
                </motion.div>

                {/* Away Team */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex-1 text-center"
                >
                  <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/50">
                    {awayTeam?.logo ? (
                      <Image
                        src={awayTeam.logo || "/placeholder.svg"}
                        alt={awayTeam.name}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-white font-bold text-3xl">
                        {awayTeam?.name?.slice(0, 3).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {awayTeam?.name}
                  </h2>
                  <p className="text-sm text-emerald-300">Away</p>
                </motion.div>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm text-gray-300 border-t border-slate-700 mt-8 pt-8 p-6 rounded-2xl overflow-hidden"
              >
                {/* Background image */}
                <div className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"></div>
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 md:gap-12">
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-2"
                  >
                    <MapPin className="h-5 w-5 text-blue-400" />
                    <span>{fixture?.venue?.name || "TBA"}</span>
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-2"
                  >
                    <Clock className="h-5 w-5 text-blue-400" />
                    <span>{new Date(fixture?.date).toLocaleString()}</span>
                  </motion.div>
                  {fixture?.attendance && (
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center gap-2"
                    >
                      <Users className="h-5 w-5 text-blue-400" />
                      <span>
                        {fixture.attendance.toLocaleString()} Attendance
                      </span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Statistics and Events */}
          <div className="lg:col-span-2 space-y-8">
            {/* Statistics Section */}
            {stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl">
                  <div className="flex items-center gap-3 mb-8">
                    <TrendingUp className="h-6 w-6 text-blue-400" />
                    <h3 className="text-2xl font-bold text-white">
                      Match Statistics
                    </h3>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    {stats.map((stat, idx) => {
                      const homeStats = stat.statistics || [];
                      const awayStats = stats[1]?.statistics || [];

                      const getStatValue = (stats, type) => {
                        const s = stats.find((s) => s.type === type);
                        return s ? Number.parseInt(s.value) || 0 : 0;
                      };

                      const statTypes = [
                        {
                          label: "Shots on Goal",
                          key: "Shots on Goal",
                          icon: "🎯",
                        },
                        { label: "Shots", key: "Shots", icon: "⚽" },
                        {
                          label: "Possession %",
                          key: "Ball Possession",
                          icon: "🔄",
                        },
                        { label: "Passes", key: "Passes", icon: "📍" },
                        { label: "Fouls", key: "Fouls", icon: "⚠️" },
                        { label: "Corners", key: "Corner Kicks", icon: "🚩" },
                      ];

                      return (
                        <div key={idx} className="space-y-4">
                          {statTypes.map((statType) => {
                            const homeVal = getStatValue(
                              homeStats,
                              statType.key
                            );
                            const awayVal = getStatValue(
                              awayStats,
                              statType.key
                            );
                            const total = homeVal + awayVal || 1;
                            const homePercent = (homeVal / total) * 100;
                            const awayPercent = (awayVal / total) * 100;

                            return (
                              <motion.div
                                key={statType.key}
                                variants={itemVariants}
                              >
                                <div className="flex items-center justify-between text-sm mb-2">
                                  <span className="font-semibold text-blue-300">
                                    {homeVal}
                                  </span>
                                  <span className="text-gray-400 capitalize text-center flex-1 px-4 font-medium flex items-center justify-center gap-2">
                                    <span>{statType.icon}</span>
                                    {statType.label}
                                  </span>
                                  <span className="font-semibold text-emerald-300">
                                    {awayVal}
                                  </span>
                                </div>
                                <div className="h-3 bg-slate-700 rounded-full overflow-hidden flex shadow-inner">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${homePercent}%` }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                    className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                                  />
                                  <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${awayPercent}%` }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                    className="bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                                  />
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      );
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
                viewport={{ once: true }}
              >
                <Card className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl">
                  <div className="flex items-center gap-3 mb-8">
                    <Target className="h-6 w-6 text-emerald-400" />
                    <h3 className="text-2xl font-bold text-white">
                      Match Events
                    </h3>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-4"
                  >
                    {events.map((event, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-start gap-4 pb-4 border-b border-slate-700 last:border-0"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 shrink-0 shadow-lg shadow-blue-600/50 font-bold text-white text-sm"
                        >
                          {event.time?.elapsed || 0}'
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {event.type === "Goal" && (
                              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                                ⚽ Goal
                              </Badge>
                            )}
                            {event.type === "Card" &&
                              event.detail === "Yellow Card" && (
                                <Badge className="bg-yellow-600 text-white">
                                  🟨 Yellow Card
                                </Badge>
                              )}
                            {event.type === "Card" &&
                              event.detail === "Red Card" && (
                                <Badge className="bg-red-600 text-white">
                                  🟥 Red Card
                                </Badge>
                              )}
                            {event.type === "subst" && (
                              <Badge className="bg-blue-600 text-white">
                                🔄 Substitution
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-300">
                            <span className="font-semibold text-white">
                              {event.player?.name}
                            </span>
                            {event.assist?.name && (
                              <span className="text-gray-400">
                                {" "}
                                (Assist: {event.assist.name})
                              </span>
                            )}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </Card>
              </motion.div>
            )}

            {/* Team Lineups */}
            {lineups.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl">
                  <div className="flex items-center gap-3 mb-8">
                    <Shield className="h-6 w-6 text-purple-400" />
                    <h3 className="text-2xl font-bold text-white">
                      Team Lineups
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {lineups.map((lineup, idx) => (
                      <motion.div
                        key={idx}
                        variants={itemVariants}
                        className="bg-slate-700/50 rounded-xl p-6 border border-slate-600"
                      >
                        <div className="flex items-center gap-3 pb-4 border-b border-slate-600 mb-6">
                          {lineup.team?.logo && (
                            <Image
                              src={lineup.team.logo || "/placeholder.svg"}
                              alt={lineup.team.name}
                              width={50}
                              height={50}
                              className="rounded-lg object-contain bg-white/10 p-2"
                            />
                          )}
                          <div>
                            <h4 className="font-bold text-white text-lg">
                              {lineup.team?.name}
                            </h4>
                            <p className="text-xs text-gray-400">
                              Formation: {lineup.formation}
                            </p>
                          </div>
                        </div>

                        {/* Starting XI */}
                        <div className="space-y-3 mb-6">
                          <p className="text-sm font-semibold text-blue-400 uppercase tracking-wide">
                            Starting XI
                          </p>
                          {lineup.startXI?.map((player, pidx) => (
                            <div
                              key={pidx}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-600/50 transition-colors"
                            >
                              <span className="font-bold text-gray-400 w-6 text-center">
                                {player.player?.number}
                              </span>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-200">
                                  {player.player?.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {player.player?.pos}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Substitutes */}
                        {lineup.substitutes?.length > 0 && (
                          <div className="space-y-3 pt-6 border-t border-slate-600">
                            <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wide">
                              Substitutes
                            </p>
                            {lineup.substitutes?.map((player, pidx) => (
                              <div
                                key={pidx}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-600/50 transition-colors opacity-75"
                              >
                                <span className="font-bold text-gray-500 w-6 text-center">
                                  {player.player?.number}
                                </span>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-300">
                                    {player.player?.name}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    {player.player?.pos}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Venue Info */}
            {fixture?.venue && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="relative overflow-hidden p-6 border border-slate-700 shadow-xl rounded-2xl">
                  {/* Background image */}
                  <div className="absolute inset-0 bg-[url('/stadium.jpg')] bg-cover bg-center opacity-90 blur-xs"></div>
                  {/* Dark overlay */}
                  {/* <div className="absolute inset-0 bg-black/60"></div> */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-slate-900/70"></div>


                  {/* Card Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-5 w-5 text-blue-400" />
                      <h4 className="font-bold text-white">Venue</h4>
                    </div>
                    <p className="text-sm font-semibold text-gray-200 mb-1">
                      {fixture.venue.name}
                    </p>
                    <p className="text-xs text-gray-400 mb-3">
                      {fixture.venue.city}
                    </p>
                    {fixture.attendance && (
                      <div className="pt-3 border-t border-slate-700">
                        <p className="text-xs text-gray-400">
                          <span className="text-blue-400 font-semibold">
                            {fixture.attendance.toLocaleString()}
                          </span>{" "}
                          Attendance
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Predictions CTA */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Link href="/all-predictions">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl border border-blue-500 shadow-lg shadow-blue-600/50 cursor-pointer"
                >
                  <h4 className="text-lg font-bold text-white mb-2">
                    Expert Predictions
                  </h4>
                  <p className="text-sm text-blue-100 mb-4">
                    Get AI-powered predictions for this match
                  </p>
                  <div className="flex items-center gap-2 text-white font-semibold">
                    View Predictions →
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

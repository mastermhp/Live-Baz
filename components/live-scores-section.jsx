"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Clock, TrendingUp } from "lucide-react"

const liveGames = [
  {
    id: 1,
    team1: "Luqueno",
    team2: "Sportivo Trinidense",
    score1: 0,
    score2: 0,
    minute: "71'",
    status: "LIVE",
    league: "Paraguay Division",
  },
  {
    id: 2,
    team1: "Santiago Morning",
    team2: "Cobreloá",
    score1: 2,
    score2: 0,
    minute: "45' +2",
    status: "LIVE",
    league: "Chile Primera",
  },
  {
    id: 3,
    team1: "Audax Italiano",
    team2: "Union La Calera",
    score1: 1,
    score2: 3,
    minute: "45'",
    status: "LIVE",
    league: "Chile Primera",
  },
  {
    id: 4,
    team1: "Academia Puerto Cabello",
    team2: "Deportivo La Guaira",
    score1: 1,
    score2: 0,
    minute: "29'",
    status: "LIVE",
    league: "Venezuela Division",
  },
  {
    id: 5,
    team1: "Real Tomayapo",
    team2: "Guabira",
    score1: 1,
    score2: 0,
    minute: "29'",
    status: "LIVE",
    league: "Bolivia Division",
  },
]

const upcomingGames = [
  { id: 6, team1: "Solihull Moors", team2: "Braintree Town", time: "Today, 17:30", league: "England National" },
  { id: 7, team1: "Southampton", team2: "Swansea", time: "Today, 17:30", league: "England Championship" },
  { id: 8, team1: "Queens Park Rangers", team2: "Millwall", time: "Today, 17:30", league: "England Championship" },
  { id: 9, team1: "Oxford", team2: "Derby", time: "Today, 17:30", league: "England Championship" },
  { id: 10, team1: "Nottingham Forest", team2: "Chelsea", time: "Today, 17:30", league: "England Premier" },
]

export default function LiveScoresSection() {
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

  return (
    <section className="py-16 border-b border-border bg-gradient-to-b from-transparent via-blue-950/5 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
            <h2 className="text-4xl font-bold text-foreground">Live Scores</h2>
          </div>
          <p className="text-muted-foreground text-lg">Follow matches happening right now</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide"
        >
          {["Live games", "16.10", "Yesterday", "Today", "Tomorrow", "20.10", "Calendar"].map((tab, idx) => (
            <motion.button
              key={tab}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
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
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-gray-600 mb-6 flex items-center gap-2"
          >
            <TrendingUp className="h-6 w-6 text-red-500" />
            Currently Live
          </motion.h3>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="space-y-4">
            {liveGames.map((game) => (
              <motion.div
                key={game.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 8 }}
                className="group relative overflow-hidden rounded-2xl  backdrop-blur-md shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 hover:shadow-lg bg-gray-900/0"
              >
                {/* Live Indicator */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-red-500 via-blue-600 to-transparent" />

                <div className="p-6 flex items-center justify-between">
                  {/* Left - Status and Time */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                        className="inline-block h-3 w-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"
                      />
                      <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Live</span>
                      <span className="text-xs text-gray-600 font-semibold">{game.minute}</span>
                    </div>
                    <span className="text-[9px] text-gray-200 px-3 py-1 bg-gray-800/50 rounded-full">{game.league}</span>
                  </div>

                  {/* Center - Teams and Score */}
                  <div className="flex-1 flex items-center justify-center gap-6 px-8">
                    <div className="text-center flex-1">
                      <p className="text-xs text-gray-400 mb-1">Home</p>
                      <p className="text-md font-bold text-gray-600">{game.team1}</p>
                    </div>

                    <div className="flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl border border-blue-500/30">
                      <span className="text-4xl font-extrabold text-blue-400">{game.score1}</span>
                      <span className="text-2xl text-gray-500">:</span>
                      <span className="text-4xl font-extrabold text-cyan-400">{game.score2}</span>
                    </div>

                    <div className="text-center flex-1">
                      <p className="text-xs text-gray-400 mb-1">Away</p>
                      <p className="text-md font-bold text-gray-600">{game.team2}</p>
                    </div>
                  </div>

                  {/* Right - Action Button */}
                  <div className="flex-1 flex justify-end">
                    <Link href={`/match/${game.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                      >
                        View Match
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Upcoming Games Section */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-gray-600 mb-6 flex items-center gap-2"
          >
            <Clock className="h-6 w-6 text-blue-500" />
            Upcoming Matches
          </motion.h3>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="space-y-3">
            {upcomingGames.map((game) => (
              <motion.div
                key={game.id}
                variants={itemVariants}
                whileHover={{ scale: 1.01, x: 4 }}
                className="group relative overflow-hidden border border-blue-500/30 hover:border-blue-500/70 transition-all duration-300 backdrop-blur-sm p-5"
              >
                <div className="flex items-center justify-between">
                  {/* Time */}
                  <div className="flex items-center gap-3 flex-1">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-semibold text-blue-400">{game.time}</span>
                    <span className="text-[9px] text-gray-100 px-2 py-1 bg-gray-800/50 rounded">{game.league}</span>
                  </div>

                  {/* Teams */}
                  <div className="flex-1 flex items-center justify-center gap-4 px-6">
                    <p className="text-sm font-semibold text-gray-500 text-right flex-1">{game.team1}</p>
                    <span className="text-blue-500 font-bold">vs</span>
                    <p className="text-sm font-semibold text-gray-500 text-left flex-1">{game.team2}</p>
                  </div>

                  {/* Action */}
                  <div className="flex-1 flex justify-end">
                    <Link href={`/prediction/${game.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-1.5 text-xs font-semibold text-blue-400 border border-blue-500/50 rounded-lg hover:bg-blue-500/10 transition-all duration-300"
                      >
                        Prediction
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <Link href="/live">
            <motion.button
              whileHover={{
                scale: 1.08,
                boxShadow: "0px 0px 30px rgba(59,130,246,0.4)",
              }}
              className="px-10 py-4 border-2 border-blue-500 text-blue-400 font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-500 text-lg"
            >
              View All Live Matches →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

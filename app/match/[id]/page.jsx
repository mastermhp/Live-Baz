"use client"

import Header from "@/components/header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { matchDetails } from "@/lib/demo-data"
import { MapPin, Users, Castle as Whistle, TrendingUp, Activity, ArrowRight } from "lucide-react"
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
  const match = matchDetails[1]

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
                  <span className="text-sm font-medium text-blue-700">{match.league}</span>
                  <span className="h-1 w-1 bg-blue-300 rounded-full" />
                  <span className="text-sm text-blue-600">Round 23</span>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                >
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30">
                    <span className="h-2 w-2 rounded-full bg-white mr-2 animate-pulse" />
                    LIVE {match.minute}'
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
                    <span className="text-white font-bold text-2xl">{match.homeTeam.slice(0, 3).toUpperCase()}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{match.homeTeam}</h2>
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
                      {match.homeScore}
                    </span>
                  </div>
                  <span className="text-3xl text-gray-300 font-light">:</span>
                  <div className="text-center">
                    <span className="text-6xl font-extrabold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                      {match.awayScore}
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
                    <span className="text-white font-bold text-2xl">{match.awayTeam.slice(0, 3).toUpperCase()}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{match.awayTeam}</h2>
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
                  {match.stadium}
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center gap-2">
                  <Whistle className="h-4 w-4 text-blue-600" />
                  {match.referee}
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  {match.attendance}
                </motion.div>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Win Probability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-6 bg-white border-2 border-blue-200 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Win Probability</h3>
                </div>
                <div className="flex gap-4 mb-6">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 text-center p-4 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-300"
                  >
                    <div className="text-4xl font-bold text-blue-600 mb-2">{match.homeWinPercent}%</div>
                    <div className="text-sm text-blue-700">Home Win</div>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex-1 text-center p-4 rounded-xl bg-gray-100 border-2 border-gray-300"
                  >
                    <div className="text-4xl font-bold text-gray-700 mb-2">{match.drawPercent}%</div>
                    <div className="text-sm text-gray-600">Draw</div>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex-1 text-center p-4 rounded-xl bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-300"
                  >
                    <div className="text-4xl font-bold text-green-600 mb-2">{match.awayWinPercent}%</div>
                    <div className="text-sm text-green-700">Away Win</div>
                  </motion.div>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden flex">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${match.homeWinPercent}%` }}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="bg-gradient-to-r from-blue-500 to-blue-600"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${match.drawPercent}%` }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="bg-gray-400"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${match.awayWinPercent}%` }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="bg-gradient-to-r from-green-500 to-green-600"
                  />
                </div>
              </Card>
            </motion.div>

            {/* Match Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="p-6 bg-white border-2 border-blue-200 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Match Statistics</h3>
                </div>
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="space-y-5">
                  {Object.entries(match.stats).map(([key, value], idx) => (
                    <motion.div key={key} variants={itemVariants}>
                      <div className="flex items-center justify-between text-sm mb-3">
                        <span className="font-semibold text-blue-600">{value.home}</span>
                        <span className="text-gray-600 capitalize text-center flex-1 px-4">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <span className="font-semibold text-green-600">{value.away}</span>
                      </div>
                      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden flex">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(value.home / (value.home + value.away)) * 100}%` }}
                          transition={{ delay: 0.2 + idx * 0.1, duration: 0.8 }}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                        />
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(value.away / (value.home + value.away)) * 100}%` }}
                          transition={{ delay: 0.2 + idx * 0.1, duration: 0.8 }}
                          className="bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </Card>
            </motion.div>

            {/* Match Events Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6 bg-white border-2 border-blue-200 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Match Events</h3>
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="space-y-4">
                  {match.events.map((event, index) => (
                    <motion.div key={index} variants={itemVariants} className="flex items-start gap-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 shrink-0 shadow-lg shadow-blue-600/30"
                      >
                        <span className="text-xs font-bold text-white">{event.minute}'</span>
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {event.type === "goal" && (
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">⚽ Goal</Badge>
                          )}
                          {event.type === "yellow" && (
                            <Badge className="bg-yellow-500 text-white">🟨 Yellow Card</Badge>
                          )}
                          {event.type === "substitution" && (
                            <Badge variant="outline" className="border-blue-500 text-blue-600">
                              🔄 Substitution
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-700">
                          {event.type === "substitution" ? (
                            <>
                              <span className="font-semibold text-gray-900">{event.playerOut}</span>
                              <span className="text-gray-600"> off, </span>
                              <span className="font-semibold text-gray-900">{event.playerIn}</span>
                              <span className="text-gray-600"> on</span>
                            </>
                          ) : (
                            <>
                              <span className="font-semibold text-gray-900">{event.player}</span>
                              {event.assist && <span className="text-gray-600"> (Assist: {event.assist})</span>}
                            </>
                          )}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Form Guide */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-6 bg-white border-2 border-blue-200 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-5">Recent Form</h3>
                <div className="space-y-5">
                  <div>
                    <div className="text-sm font-semibold text-blue-600 mb-3">{match.homeTeam}</div>
                    <div className="flex gap-2">
                      {match.form.home.map((result, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`h-9 w-9 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg ${
                            result === "W"
                              ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-500/30"
                              : result === "D"
                                ? "bg-gray-300 text-gray-700 shadow-gray-300/30"
                                : "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-red-500/30"
                          }`}
                        >
                          {result}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-green-600 mb-3">{match.awayTeam}</div>
                    <div className="flex gap-2">
                      {match.form.away.map((result, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`h-9 w-9 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg ${
                            result === "W"
                              ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-500/30"
                              : result === "D"
                                ? "bg-gray-300 text-gray-700 shadow-gray-300/30"
                                : "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-red-500/30"
                          }`}
                        >
                          {result}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Related Articles */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="p-6 bg-white border-2 border-blue-200 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-5">Match Analysis</h3>
                <Link href="/blog/1" className="block group">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="aspect-video bg-gray-200 rounded-xl mb-3 overflow-hidden relative"
                  >
                    <Image
                      src="/football-tactical-analysis.png"
                      alt="Analysis"
                      fill
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </motion.div>
                  <h4 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
                    Tactical Preview: What to Expect
                  </h4>
                  <p className="text-xs text-gray-500 mt-2">5 min read</p>
                </Link>
              </Card>
            </motion.div>

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
        <Footer/>

    </div>
  )
}

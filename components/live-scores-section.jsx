"use client"

import { motion } from "framer-motion"

const liveGames = [
  {
    id: 1,
    team1: "Luqueno",
    team2: "Sportivo Trinidense",
    score1: 0,
    score2: 0,
    minute: "71'",
    status: "LIVE",
  },
  {
    id: 2,
    team1: "Santiago Morning",
    team2: "Cobreloá",
    score1: 2,
    score2: 0,
    minute: "45' +2",
    status: "LIVE",
  },
  {
    id: 3,
    team1: "Audax Italiano",
    team2: "Union La Calera",
    score1: 1,
    score2: 3,
    minute: "45'",
    status: "LIVE",
  },
  {
    id: 4,
    team1: "Academia Puerto Cabello",
    team2: "Deportivo La Guaira",
    score1: 1,
    score2: 0,
    minute: "29'",
    status: "LIVE",
  },
  {
    id: 5,
    team1: "Real Tomayapo",
    team2: "Guabira",
    score1: 1,
    score2: 0,
    minute: "29'",
    status: "LIVE",
  },
]

const upcomingGames = [
  { id: 6, team1: "Solihull Moors", team2: "Braintree Town", time: "Today, 17:30" },
  { id: 7, team1: "Southampton", team2: "Swansea", time: "Today, 17:30" },
  { id: 8, team1: "Queens Park Rangers", team2: "Millwall", time: "Today, 17:30" },
  { id: 9, team1: "Oxford", team2: "Derby", time: "Today, 17:30" },
  { id: 10, team1: "Nottingham Forest", team2: "Chelsea", time: "Today, 17:30" },
]

export default function LiveScoresSection() {
  return (
    <section className="py-12 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border pb-4">
          <button className="px-4 py-2 text-accent font-semibold border-b-2 border-accent">Live games</button>
          <button className="px-4 py-2 text-muted-foreground hover:text-foreground transition-all duration-300 ease-out">
            16.10
          </button>
          <button className="px-4 py-2 text-muted-foreground hover:text-foreground transition-all duration-300 ease-out">
            Yesterday
          </button>
          <button className="px-4 py-2 text-muted-foreground hover:text-foreground transition-all duration-300 ease-out">
            Today
          </button>
          <button className="px-4 py-2 text-muted-foreground hover:text-foreground transition-all duration-300 ease-out">
            Tomorrow
          </button>
          <button className="px-4 py-2 text-muted-foreground hover:text-foreground transition-all duration-300 ease-out">
            20.10
          </button>
          <button className="px-4 py-2 text-muted-foreground hover:text-foreground transition-all duration-300 ease-out">
            Calendar
          </button>
        </div>

        {/* Live Games */}
        <div className="space-y-3 mb-12">
          {liveGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-accent hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105 transition-all duration-300 ease-out"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-accent-orange rounded-full animate-live" />
                  <span className="text-xs font-bold text-accent-orange">LIVE</span>
                  <span className="text-xs text-muted-foreground">{game.minute}</span>
                </div>
              </div>

              <div className="flex-1 text-center">
                <p className="text-sm text-muted-foreground mb-1">{game.team1}</p>
              </div>

              <div className="flex items-center gap-4 px-6">
                <span className="text-2xl font-bold text-foreground">{game.score1}</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-2xl font-bold text-foreground">{game.score2}</span>
              </div>

              <div className="flex-1 text-center">
                <p className="text-sm text-muted-foreground">{game.team2}</p>
              </div>

              <div className="text-right">
                <button className="px-3 py-1 text-xs text-accent border border-accent rounded hover:bg-accent hover:text-primary transition-all duration-300 ease-out">
                  Prediction
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Games */}
        <div className="space-y-3">
          {upcomingGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-accent transition-all duration-300 ease-out"
            >
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{game.time}</p>
              </div>

              <div className="flex-1 text-center">
                <p className="text-sm text-foreground">{game.team1}</p>
              </div>

              <div className="px-6">
                <span className="text-muted-foreground">-</span>
              </div>

              <div className="flex-1 text-center">
                <p className="text-sm text-foreground">{game.team2}</p>
              </div>

              <div className="text-right">
                <button className="px-3 py-1 text-xs text-accent border border-accent rounded hover:bg-accent hover:text-primary transition-all duration-300 ease-out">
                  Prediction
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-8">
          <button className="px-8 py-3 border-2 border-accent text-accent rounded-full font-semibold hover:bg-accent hover:text-primary transition-all duration-300 ease-out">
            All games →
          </button>
        </div>
      </div>
    </section>
  )
}

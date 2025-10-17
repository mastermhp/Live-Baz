"use client";

import { motion } from "framer-motion";

const leagues = [
  { id: 1, name: "African Nations Championship", icon: "🏆" },
  { id: 2, name: "Champions League", icon: "⭐" },
  { id: 3, name: "UEFA Super Cup", icon: "🏅" },
  { id: 4, name: "Europa League", icon: "🏆" },
  { id: 5, name: "Europa Conference League", icon: "🏆" },
  { id: 6, name: "English Premier League", icon: "🇬🇧" },
  { id: 7, name: "LaLiga Spain", icon: "🇪🇸" },
  { id: 8, name: "Serie A Italy", icon: "🇮🇹" },
  { id: 9, name: "Bundesliga Germany", icon: "🇩🇪" },
  { id: 10, name: "Ligue 1 France", icon: "🇫🇷" },
];

export default function TopLeaguesSection() {
  return (
    <section className="bg-primary py-12 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Leagues */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-accent-blue text-2xl">/</span>
              <h3 className="text-2xl font-bold text-foreground">
                Top Leagues
              </h3>
              <span className="text-accent-blue text-2xl">/</span>
            </div>

            <div className="space-y-2 bg-secondary border border-border rounded-lg p-4">
              {leagues.map((league, index) => (
                <motion.button
                  key={league.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-primary transition-all duration-300 ease-out text-sm text-foreground hover:text-accent"
                >
                  <span className="mr-2">{league.icon}</span>
                  {league.name}
                </motion.button>
              ))}
            </div>

            <button className="w-full mt-4 px-6 py-3 border-2 border-accent text-accent rounded-full font-semibold hover:bg-accent hover:text-primary transition-all duration-300 ease-out">
              All leagues
            </button>
          </motion.div>

          {/* Right Content - Scores */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-accent-blue text-2xl">/</span>
              <h3 className="text-2xl font-bold text-foreground">Scores</h3>
              <span className="text-accent-blue text-2xl">/</span>
            </div>

            <div className="space-y-3">
              {[
                {
                  team1: "Luqueno",
                  team2: "Sportivo Trinidense",
                  score1: 0,
                  score2: 0,
                  minute: "71'",
                  status: "LIVE",
                },
                {
                  team1: "Santiago Morning",
                  team2: "Cobreloá",
                  score1: 2,
                  score2: 0,
                  minute: "45' +2",
                  status: "LIVE",
                },
                {
                  team1: "Audax Italiano",
                  team2: "Union La Calera",
                  score1: 1,
                  score2: 3,
                  minute: "45'",
                  status: "LIVE",
                },
                {
                  team1: "Academia Puerto Cabello",
                  team2: "Deportivo La Guaira",
                  score1: 1,
                  score2: 0,
                  minute: "29'",
                  status: "LIVE",
                },
                {
                  team1: "Real Tomayapo",
                  team2: "Guabira",
                  score1: 1,
                  score2: 0,
                  minute: "29'",
                  status: "LIVE",
                },
              ].map((game, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-secondary border border-border rounded-lg hover:border-accent transition-all duration-300 ease-out"
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-accent">
                      {game.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {game.minute}
                    </span>
                  </div>

                  <div className="flex-1 text-center px-4">
                    <p className="text-sm text-accent font-semibold">
                      {game.team1}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-foreground">
                      {game.score1}
                    </span>
                    <span className="text-muted-foreground">:</span>
                    <span className="text-xl font-bold text-foreground">
                      {game.score2}
                    </span>
                  </div>

                  <div className="flex-1 text-center px-4">
                    <p className="text-sm text-foreground">{game.team2}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

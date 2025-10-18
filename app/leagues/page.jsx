"use client";

import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Users, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * NOTE:
 * - This uses Tailwind utility classes heavily (glassmorphism, gradients, shadows).
 * - The background image is intentionally low-opacity (abstract football texture).
 * - Keep your Tailwind config standard (or adjust colors if you have custom palette).
 */

/* ---------- data (unchanged semantics) ---------- */
const leagues = [
  {
    id: 1,
    name: "Premier League",
    country: "England",
    logo: "PL",
    gradient: "from-blue-500 to-cyan-400",
    teams: 20,
    matches: 380,
    season: "2024/25",
    topScorer: "Erling Haaland",
    goals: 24,
  },
  {
    id: 2,
    name: "La Liga",
    country: "Spain",
    logo: "LL",
    gradient: "from-green-400 to-blue-500",
    teams: 20,
    matches: 380,
    season: "2024/25",
    topScorer: "Robert Lewandowski",
    goals: 21,
  },
  {
    id: 3,
    name: "Serie A",
    country: "Italy",
    logo: "SA",
    gradient: "from-cyan-500 to-blue-700",
    teams: 20,
    matches: 380,
    season: "2024/25",
    topScorer: "Victor Osimhen",
    goals: 19,
  },
  {
    id: 4,
    name: "Bundesliga",
    country: "Germany",
    logo: "BL",
    gradient: "from-emerald-400 to-green-700",
    teams: 18,
    matches: 306,
    season: "2024/25",
    topScorer: "Harry Kane",
    goals: 23,
  },
  {
    id: 5,
    name: "Ligue 1",
    country: "France",
    logo: "L1",
    gradient: "from-blue-500 to-indigo-600",
    teams: 18,
    matches: 306,
    season: "2024/25",
    topScorer: "Kylian Mbappé",
    goals: 20,
  },
  {
    id: 6,
    name: "Champions League",
    country: "Europe",
    logo: "CL",
    gradient: "from-indigo-600 to-sky-700",
    teams: 32,
    matches: 125,
    season: "2024/25",
    topScorer: "Erling Haaland",
    goals: 12,
  },
];

const standings = [
  {
    position: 1,
    team: "Manchester City",
    played: 23,
    won: 18,
    drawn: 3,
    lost: 2,
    gf: 56,
    ga: 18,
    gd: 38,
    points: 57,
    form: ["W", "W", "W", "D", "W"],
  },
  {
    position: 2,
    team: "Liverpool",
    played: 23,
    won: 17,
    drawn: 4,
    lost: 2,
    gf: 52,
    ga: 20,
    gd: 32,
    points: 55,
    form: ["W", "W", "D", "W", "W"],
  },
  {
    position: 3,
    team: "Arsenal",
    played: 23,
    won: 16,
    drawn: 5,
    lost: 2,
    gf: 48,
    ga: 19,
    gd: 29,
    points: 53,
    form: ["W", "D", "W", "W", "W"],
  },
  {
    position: 4,
    team: "Aston Villa",
    played: 23,
    won: 15,
    drawn: 3,
    lost: 5,
    gf: 45,
    ga: 28,
    gd: 17,
    points: 48,
    form: ["W", "L", "W", "W", "D"],
  },
  {
    position: 5,
    team: "Tottenham",
    played: 23,
    won: 14,
    drawn: 4,
    lost: 5,
    gf: 50,
    ga: 32,
    gd: 18,
    points: 46,
    form: ["W", "W", "L", "W", "W"],
  },
];

/* ---------- animations ---------- */
const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const cardHover = {
  hover: {
    scale: 1.03,
    y: -8,
    boxShadow: "0 30px 60px rgba(6,78,59,0.18)",
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

/* ---------- component ---------- */
export default function LeaguesPage() {
  const [selectedLeague, setSelectedLeague] = useState(leagues[0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-emerald-50 text-slate-800">
      <Header />

      {/* --- floating decorative background orbs --- */}
      <motion.div
        animate={{ rotate: [0, 8, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none fixed -top-36 -right-36 w-[28rem] h-[28rem] rounded-full blur-3xl bg-gradient-to-br from-emerald-300/30 to-blue-400/20"
      />
      <motion.div
        animate={{ rotate: [0, -6, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none fixed -bottom-32 -left-32 w-[26rem] h-[26rem] rounded-full blur-3xl bg-gradient-to-br from-blue-300/25 to-emerald-300/25"
      />

      {/* --- Hero: gradient base + LOW-OPACITY abstract football texture ABOVE gradient --- */}
      <header className="relative overflow-hidden">
        
        {/* base strong gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-emerald-400 opacity-90" />

        {/* low-opacity abstract football texture image above gradient */}
        <img
          src="https://as1.ftcdn.net/jpg/05/21/40/42/1000_F_521404240_4iZIxhDj97d1fu6uuGc3igkSSNfkwHuc.jpg"
          alt="Abstract football texture"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen pointer-events-none"
        />

        {/* subtle overlay grid / motion lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02),transparent)]"
        />

        {/* hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="flex items-center gap-4 mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="relative"
            >
              <Trophy className="h-14 w-14 text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.2)]" />
              <div className="absolute -inset-1 rounded-full blur-md bg-white/10" />
            </motion.div>

            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight">
                Leagues — Live & Legendary
              </h1>
              <p className="mt-1 text-lg text-white/90">
                Standings, fixtures, and electric highlights — curated for football fans
              </p>
            </div>
          </motion.div>

          {/* CTA and pill stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link href="/live">
              <motion.a
                whileHover={{ scale: 1.03 }}
                className="inline-flex items-center gap-3 bg-white/95 text-sky-700 font-semibold px-5 py-3 rounded-full shadow-md hover:shadow-lg transition"
              >
                Live Matches
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </Link>

            <div className="ml-2 flex items-center gap-3">
              <div className="px-3 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white text-sm flex items-center gap-2">
                <Users className="w-4 h-4" /> Global Tournaments
              </div>
              <div className="px-3 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white text-sm flex items-center gap-2">
                <Star className="w-4 h-4" /> Top Scorers
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- main content --- */}
      <main className="relative z-20 max-w-7xl mx-auto px-6 pt-12 pb-24">
        {/* Leagues grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {leagues.map((league, idx) => (
            <motion.article
              key={league.id}
              variants={cardHover}
              whileHover="hover"
              onClick={() => setSelectedLeague(league)}
            >
              {/* glass card */}
              <Card className="relative overflow-hidden rounded-2xl p-0 cursor-pointer transition-all">
                {/* animated accent strip */}
                <div
                  className={`absolute -top-6 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-30 bg-gradient-to-br ${league.gradient}`}
                  style={{ mixBlendMode: "overlay" }}
                />

                <div className="p-6 bg-white/90 backdrop-blur-sm border border-slate-100">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <motion.div
                      whileHover={{ rotate: 6, scale: 1.08 }}
                      className={`h-16 w-16 rounded-xl flex items-center justify-center shadow-md text-white font-bold text-lg bg-gradient-to-br ${league.gradient}`}
                    >
                      {league.logo}
                    </motion.div>

                    <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100 font-semibold">
                      {league.season}
                    </Badge>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 mb-1">{league.name}</h3>
                  <p className="text-sm text-slate-500 mb-4 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" /> {league.country}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="rounded-lg p-3 bg-sky-50 border border-sky-100">
                      <div className="flex items-center gap-2 mb-1 text-slate-500 text-xs">
                        <Users className="w-4 h-4 text-sky-500" /> Teams
                      </div>
                      <div className="text-lg font-bold text-sky-700">{league.teams}</div>
                    </div>

                    <div className="rounded-lg p-3 bg-emerald-50 border border-emerald-100">
                      <div className="flex items-center gap-2 mb-1 text-slate-500 text-xs">
                        <Calendar className="w-4 h-4 text-emerald-500" /> Matches
                      </div>
                      <div className="text-lg font-bold text-emerald-700">{league.matches}</div>
                    </div>
                  </div>

                  <div className="border-t pt-3 border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <div className="text-sm">Top Scorer</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-sm text-slate-800 font-semibold">{league.topScorer}</div>
                        <Badge className="bg-blue-50 text-blue-700 border border-blue-100">
                          {league.goals} goals
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.article>
          ))}
        </motion.section>

        {/* Selected League details - stronger emphasis, animated entrance */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              whileHover={{ scale: 1.06, rotate: 4 }}
              className={`h-16 w-16 rounded-xl flex items-center justify-center text-white font-bold text-2xl bg-gradient-to-br ${selectedLeague.gradient} shadow-lg`}
            >
              {selectedLeague.logo}
            </motion.div>

            <div>
              <h2 className="text-3xl font-extrabold text-slate-800">{selectedLeague.name} Standings</h2>
              <p className="text-sm text-slate-500">{selectedLeague.country} • {selectedLeague.season}</p>
            </div>
          </div>

          <Card className="overflow-hidden rounded-2xl border border-slate-100 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="bg-gradient-to-r from-blue-600 to-emerald-400 text-white">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-bold">#</th>
                    <th className="px-4 py-4 text-left text-sm font-bold">Team</th>
                    <th className="px-4 py-4 text-center text-sm font-bold">P</th>
                    <th className="px-4 py-4 text-center text-sm font-bold">W</th>
                    <th className="px-4 py-4 text-center text-sm font-bold">D</th>
                    <th className="px-4 py-4 text-center text-sm font-bold">L</th>
                    <th className="px-4 py-4 text-center text-sm font-bold">GF</th>
                    <th className="px-4 py-4 text-center text-sm font-bold">GA</th>
                    <th className="px-4 py-4 text-center text-sm font-bold">GD</th>
                    <th className="px-4 py-4 text-center text-sm font-bold">Pts</th>
                    <th className="px-4 py-4 text-center text-sm font-bold">Form</th>
                  </tr>
                </thead>

                <tbody className="bg-slate-800/5">
                  {standings.map((team, index) => (
                    <motion.tr
                      key={team.position}
                      initial={{ opacity: 0, x: -18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.06 }}
                      className="border-b last:border-b-0 hover:bg-slate-100/40 transition cursor-pointer"
                    >
                      <td className="px-4 py-4">
                        <motion.div
                          whileHover={{ scale: 1.15 }}
                          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            team.position <= 4
                              ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow"
                              : team.position === 5
                              ? "bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow"
                              : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {team.position}
                        </motion.div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-xs text-white font-semibold">
                            {team.team.slice(0, 3).toUpperCase()}
                          </div>
                          <div className="font-semibold text-slate-800">{team.team}</div>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-center text-slate-600">{team.played}</td>
                      <td className="px-4 py-4 text-center text-slate-600">{team.won}</td>
                      <td className="px-4 py-4 text-center text-slate-600">{team.drawn}</td>
                      <td className="px-4 py-4 text-center text-slate-600">{team.lost}</td>
                      <td className="px-4 py-4 text-center text-slate-600">{team.gf}</td>
                      <td className="px-4 py-4 text-center text-slate-600">{team.ga}</td>

                      <td className="px-4 py-4 text-center">
                        <span className={`font-semibold ${team.gd > 0 ? "text-emerald-600" : "text-slate-600"}`}>
                          {team.gd > 0 ? "+" : ""}
                          {team.gd}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-center">
                        <span className="font-extrabold text-lg text-blue-600">{team.points}</span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex gap-2 justify-center">
                          {team.form.map((result, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, rotate: -8 }}
                              whileInView={{ scale: 1, rotate: 0 }}
                              transition={{ delay: i * 0.04 }}
                              className={`h-6 w-6 rounded flex items-center justify-center text-xs font-bold ${
                                result === "W"
                                  ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow"
                                  : result === "D"
                                  ? "bg-slate-300 text-slate-800"
                                  : "bg-gradient-to-br from-red-400 to-red-600 text-white shadow"
                              }`}
                            >
                              {result}
                            </motion.div>
                          ))}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* CTA */}
          <div className="mt-8 flex justify-center">
            <Link href="/fixtures">
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(3,105,161,0.18)" }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-emerald-400 text-white px-6 py-3 rounded-full font-bold shadow-lg"
              >
                View All Fixtures
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </Link>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}

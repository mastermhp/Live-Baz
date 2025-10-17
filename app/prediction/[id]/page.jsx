"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function PredictionDetailsPage() {
  const { id } = useParams();

  // Example static data – replace with API fetch later
  const prediction = {
    id,
    league: "J. League Japan",
    team1: { name: "Gamba Osaka", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Gamba_Osaka_logo.svg/250px-Gamba_Osaka_logo.svg.png" },
    team2: { name: "Kashiwa Reysol", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlOyJOBg4fzDpswTCJsTAYraZ4TAU9ZjEWVw&s" },
    matchDate: "October 19, 2025 — 11:00 AM",
    winProbability: { team1: 52, draw: 28, team2: 20 },
    analysis: `
      Gamba Osaka enter this match with strong home form, winning 3 of their last 5 games.
      Kashiwa Reysol, meanwhile, are struggling defensively and could concede early.
      Expect an open game with over 2.5 goals likely.
    `,
  };

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/herobg.png"
          alt="Hero Background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-gray-950/80 to-black" />
      </div>

      {/* Floating lights */}
      <motion.div
        animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1.2, 1, 1.2] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-400/15 blur-3xl rounded-full"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-white bg-clip-text text-transparent">
            {prediction.team1.name} vs {prediction.team2.name}
          </h1>
          <p className="text-gray-400 mt-3">{prediction.league}</p>
          <p className="text-blue-300 text-sm mt-1">{prediction.matchDate}</p>
        </motion.div>

        {/* Teams */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-around gap-8 mb-12"
        >
          {[prediction.team1, prediction.team2].map((team, i) => (
            <div key={i} className="flex flex-col items-center space-y-3">
              <Image src={team.logo} alt={team.name} width={100} height={100} />
              <h3 className="text-xl font-semibold text-white">{team.name}</h3>
            </div>
          ))}
        </motion.div>

        {/* Win Probability */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Win Probability</h2>
          <div className="flex justify-center gap-10 text-gray-300">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-blue-300">{prediction.winProbability.team1}%</span>
              <span>{prediction.team1.name}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-gray-300">{prediction.winProbability.draw}%</span>
              <span>Draw</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-blue-300">{prediction.winProbability.team2}%</span>
              <span>{prediction.team2.name}</span>
            </div>
          </div>
        </motion.div>

        {/* Analysis Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900/70 p-8 rounded-2xl border border-gray-800 shadow-lg shadow-blue-500/10"
        >
          <h3 className="text-xl font-bold text-blue-400 mb-3">Match Analysis</h3>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">{prediction.analysis}</p>
        </motion.div>

        {/* Back Button */}
        <div className="flex justify-center mt-16">
          <Link href="/all-predictions">
            <motion.button
              whileHover={{
                scale: 1.08,
                boxShadow: "0px 0px 20px rgba(59,130,246,0.5)",
              }}
              className="px-10 py-3 border-2 border-blue-500 text-blue-400 font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-500"
            >
              ← Back to Predictions
            </motion.button>
          </Link>
        </div>
      </div>
    </main>
  );
}

"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const trendingPredictions = [
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
    league: "J. LEAGUE JAPAN",
    date: "Today, 11:00",
    title: "Gamba Osaka vs Kashiwa Reysol Prediction and Betting Tips on October 19, 2025",
    prediction: "Total Goals (Over/Under) - Over(2.5)",
    odds: "1.84",
    matchImage:
      "https://png.pngtree.com/background/20250124/original/pngtree-futuristic-soccer-stadium-with-holographic-ball-and-blue-lights-picture-image_15711843.jpg",
  },
  {
    id: 2,
    team1: {
      name: "Yokohama F Marinos",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFU5X8tJPDESLkmQ-zbHydd_OJjz9RX6iiXw&s",
    },
    team2: {
      name: "Urawa Red Diamonds",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Nagoya_Grampus_Logo.svg/250px-Nagoya_Grampus_Logo.svg.png",
    },
    league: "J. LEAGUE JAPAN",
    date: "Today, 11:00",
    title: "Yokohama F Marinos vs Urawa Red Diamonds Prediction and Betting Tips on October 18, 2025",
    prediction: "BTTS: No",
    odds: "2.18",
    matchImage:
      "https://png.pngtree.com/background/20250124/original/pngtree-futuristic-soccer-stadium-with-holographic-ball-and-blue-lights-picture-image_15711843.jpg",
  },
  {
    id: 3,
    team1: {
      name: "Kawasaki Frontale",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWniFNKblMLA1uH8cFnldZ-JcgQc_lu2AoiQ&s",
    },
    team2: {
      name: "Shimizu S-Pulse",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Kyoto_Sanga_FC_logo.svg/150px-Kyoto_Sanga_FC_logo.svg.png",
    },
    league: "J. LEAGUE JAPAN",
    date: "Today, 11:00",
    title: "Kawasaki Frontale vs Shimizu S-Pulse Prediction and Betting Tips on October 18, 2025",
    prediction: "1X2: 1",
    odds: "1.69",
    matchImage:
      "https://png.pngtree.com/background/20250124/original/pngtree-futuristic-soccer-stadium-with-holographic-ball-and-blue-lights-picture-image_15711843.jpg",
  },
  {
    id: 4,
    team1: {
      name: "Cerezo Osaka",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Gamba_Osaka_logo.svg/250px-Gamba_Osaka_logo.svg.png",
    },
    team2: {
      name: "FC Tokyo",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlOyJOBg4fzDpswTCJsTAYraZ4TAU9ZjEWVw&s",
    },
    league: "J. LEAGUE JAPAN",
    date: "Tomorrow, 14:30",
    title: "Cerezo Osaka vs FC Tokyo Prediction and Betting Tips on October 20, 2025",
    prediction: "Both Teams to Score - Yes",
    odds: "1.95",
    matchImage:
      "https://png.pngtree.com/background/20250124/original/pngtree-futuristic-soccer-stadium-with-holographic-ball-and-blue-lights-picture-image_15711843.jpg",
  },
  {
    id: 5,
    team1: {
      name: "Nagoya Grampus",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Nagoya_Grampus_Logo.svg/250px-Nagoya_Grampus_Logo.svg.png",
    },
    team2: {
      name: "Sagan Tosu",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWniFNKblMLA1uH8cFnldZ-JcgQc_lu2AoiQ&s",
    },
    league: "J. LEAGUE JAPAN",
    date: "Tomorrow, 16:00",
    title: "Nagoya Grampus vs Sagan Tosu Prediction and Betting Tips on October 20, 2025",
    prediction: "Over 2.5 Goals",
    odds: "1.72",
    matchImage:
      "https://png.pngtree.com/background/20250124/original/pngtree-futuristic-soccer-stadium-with-holographic-ball-and-blue-lights-picture-image_15711843.jpg",
  },
  {
    id: 6,
    team1: {
      name: "Vissel Kobe",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Gamba_Osaka_logo.svg/250px-Gamba_Osaka_logo.svg.png",
    },
    team2: {
      name: "Kyoto Sanga",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Kyoto_Sanga_FC_logo.svg/150px-Kyoto_Sanga_FC_logo.svg.png",
    },
    league: "J. LEAGUE JAPAN",
    date: "Tomorrow, 18:00",
    title: "Vissel Kobe vs Kyoto Sanga Prediction and Betting Tips on October 20, 2025",
    prediction: "Home Win",
    odds: "1.58",
    matchImage:
      "https://png.pngtree.com/background/20250124/original/pngtree-futuristic-soccer-stadium-with-holographic-ball-and-blue-lights-picture-image_15711843.jpg",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export default function TrendingPredictions() {
  return (
    <section className="relative py-20 bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image src="/herobg.png" alt="Background Stadium" fill className="object-cover opacity-40" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/90 via-blue-950/70 to-black opacity-95" />
      </div>

      {/* Animated Lights */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6 }}
        className="absolute -top-40 left-0 w-[600px] h-[600px] bg-blue-500/20 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.6, 0.2] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 7 }}
        className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-cyan-400/10 blur-3xl rounded-full"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
              TRENDING EXPERT PREDICTIONS
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full" />
          </div>
          <p className="text-gray-400 mt-2">Our most popular and trending match predictions with expert analysis</p>
        </motion.div>

        {/* Predictions List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
        >
          {trendingPredictions.map((prediction) => (
            <motion.div
              key={prediction.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 backdrop-blur-md shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5" />

              {/* Content Container */}
              <div className="relative flex flex-col md:flex-row gap-6 p-6">
                {/* Match Image */}
                <div className="md:w-1/3 flex-shrink-0">
                  <div className="relative h-48 md:h-full rounded-xl overflow-hidden border border-gray-700">
                    <Image
                      src={prediction.matchImage || "/placeholder.svg"}
                      alt={`${prediction.team1.name} vs ${prediction.team2.name}`}
                      fill
                      className="object-cover"
                    />
                    {/* Team Logos Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40">
                      <div className="flex flex-col items-center">
                        <Image
                          src={prediction.team1.logo || "/placeholder.svg"}
                          alt={prediction.team1.name}
                          width={60}
                          height={60}
                          className="object-contain mb-2"
                        />
                        <span className="text-white text-xs font-bold text-center">{prediction.team1.name}</span>
                      </div>
                      <div className="text-white text-2xl font-bold">VS</div>
                      <div className="flex flex-col items-center">
                        <Image
                          src={prediction.team2.logo || "/placeholder.svg"}
                          alt={prediction.team2.name}
                          width={60}
                          height={60}
                          className="object-contain mb-2"
                        />
                        <span className="text-white text-xs font-bold text-center">{prediction.team2.name}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prediction Details */}
                <div className="md:w-2/3 flex flex-col justify-between">
                  {/* League and Date */}
                  <div className="mb-4">
                    <p className="text-blue-400 text-sm font-semibold tracking-wide">
                      {prediction.league} • {prediction.date}
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold text-white mt-2 leading-tight">{prediction.title}</h3>
                  </div>

                  {/* Prediction and Odds */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        <Image
                          src={prediction.team1.logo || "/placeholder.svg"}
                          alt={prediction.team1.name}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                        <Image
                          src={prediction.team2.logo || "/placeholder.svg"}
                          alt={prediction.team2.name}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Prediction</p>
                        <p className="text-white font-bold">{prediction.prediction}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Odds</p>
                      <p className="text-3xl font-bold text-blue-400">{prediction.odds}</p>
                    </div>
                  </div>

                  {/* View Button */}
                  <div className="mt-4 flex justify-end">
                    <Link href={`/prediction/${prediction.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-6 py-2 text-sm font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full text-black hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300"
                      >
                        View Details →
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Link href="/all-predictions">
            <motion.button
              whileHover={{
                scale: 1.08,
                boxShadow: "0px 0px 20px rgba(59,130,246,0.5)",
              }}
              className="px-10 py-3 border-2 border-blue-500 text-blue-400 font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-500"
            >
              All Predictions →
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  )
}

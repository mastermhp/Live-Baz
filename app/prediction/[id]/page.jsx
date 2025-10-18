

// "use client"

// import { useParams } from "next/navigation"
// import { motion } from "framer-motion"
// import Image from "next/image"
// import Link from "next/link"
// import { TrendingUp, Users, Target, Shield, Zap } from "lucide-react"

// export default function PredictionDetailsPage() {
//   const { id } = useParams()

//   const prediction = {
//     id,
//     league: "J. League Japan",
//     team1: {
//       name: "Gamba Osaka",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Gamba_Osaka_logo.svg/250px-Gamba_Osaka_logo.svg.png",
//       form: "W-W-D-L-L",
//       goalsFor: 0.6,
//       goalsAgainst: 1.0,
//       wins: 3,
//       draws: 1,
//       losses: 1,
//     },
//     team2: {
//       name: "Kashiwa Reysol",
//       logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlOyJOBg4fzDpswTCJsTAYraZ4TAU9ZjEWVw&s",
//       form: "W-W-W-D-L",
//       goalsFor: 1.2,
//       goalsAgainst: 1.4,
//       wins: 3,
//       draws: 1,
//       losses: 1,
//     },
//     matchDate: "October 19, 2025 — 11:00 AM",
//     venue: "Suita City Football Stadium",
//     winProbability: { team1: 52, draw: 28, team2: 20 },
//     analysis: `Gamba Osaka enter this match with strong home form, winning 3 of their last 5 games. Kashiwa Reysol, meanwhile, are struggling defensively and could concede early. Expect an open game with over 2.5 goals likely.`,
//     keyStats: [
//       { label: "Gamba Osaka has lost all of its last 3 games", icon: TrendingUp },
//       { label: "Gamba Osaka has won 3 and drawn 1 of its last 5 home games", icon: Users },
//       { label: "Gamba Osaka concedes 1 goal and scores 0.6 on average", icon: Target },
//       { label: "Kashiwa Reysol has won 3 of its last 5 games, with 1 draw and 1 loss", icon: Shield },
//       { label: "Kashiwa Reysol concedes 1.4 goals and scores 1.2 on average", icon: Zap },
//     ],
//     predictedLineups: {
//       team1: "Ryo, Hosoi-Nduka-Iwatanake, Kaili-Yamada-Ogura-Yamane, Adailton-Solomon-Paulo",
//       team2: "Takeda, Sato-Fuji-Uchida, Nakayama-Moroshima-Inagaki-Mori-Kadtro, Kimura",
//     },
//     recentForm: {
//       team1:
//         "After finishing last in 2021, Gamba Osaka was relegated to J.League 2 for the 2022 season. They earned promotion the following season by finishing as runners-up in J.League 2.",
//       team2:
//         "Nagoya Grampus won the league cup in 2021 and 2024. The club from the city of Nagoya in Aichi Prefecture also won the championship in 2010 and finished second the following year.",
//     },
//     expertTip: "Nagoya Grampus to win and both teams to score 'Yes'",
//     odds: "2.11",
//     bookmaker: "1XBET",
//   }

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1, delayChildren: 0.2 },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   }

//   return (
//     <main className="relative min-h-screen bg-black text-white overflow-hidden">
//       {/* Background */}
//       <div className="absolute inset-0">
//         <Image src="/herobg.png" alt="Hero Background" fill className="object-cover opacity-40" priority />
//         <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-gray-950/80 to-black" />
//       </div>

//       {/* Floating lights */}
//       <motion.div
//         animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }}
//         transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6 }}
//         className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full"
//       />
//       <motion.div
//         animate={{ opacity: [0.3, 0.7, 0.3], scale: [1.2, 1, 1.2] }}
//         transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8 }}
//         className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-400/15 blur-3xl rounded-full"
//       />

//       <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        

// {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-white bg-clip-text text-transparent">
//             {prediction.team1.name} vs {prediction.team2.name}
//           </h1>
//           <p className="text-gray-400 mt-3">{prediction.league}</p>
//           <p className="text-blue-300 text-sm mt-1">{prediction.matchDate}</p>
//         </motion.div>

//         {/* Teams */}
        // <motion.div
        //   initial={{ scale: 0.9, opacity: 0 }}
        //   animate={{ scale: 1, opacity: 1 }}
        //   transition={{ duration: 0.6 }}
        //   className="flex items-center justify-around gap-8 mb-12"
        // >
        //   {[prediction.team1, prediction.team2].map((team, i) => (
        //     <div key={i} className="flex flex-col items-center space-y-3">
        //       <Image src={team.logo} alt={team.name} width={100} height={100} />
        //       <h3 className="text-xl font-semibold text-white">{team.name}</h3>
        //     </div>
        //   ))}
        // </motion.div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
//           {/* Left Column - Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Teams */}
//             {/* <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ duration: 0.6 }}
//               className="flex items-center justify-around gap-8 bg-gray-900/50 p-8 rounded-2xl border border-gray-800"
//             >
//               {[prediction.team1, prediction.team2].map((team, i) => (
//                 <div key={i} className="flex flex-col items-center space-y-3">
//                   <Image src={team.logo || "/placeholder.svg"} alt={team.name} width={100} height={100} />
//                   <h3 className="text-xl font-semibold text-white">{team.name}</h3>
//                 </div>
//               ))}
//             </motion.div> */}

//             {/* Win Probability */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800"
//             >
//               <h2 className="text-2xl font-bold text-blue-400 mb-6">Match Prediction</h2>
//               <div className="flex justify-between gap-4 mb-6">
//                 <div className="flex-1 text-center">
//                   <div className="text-4xl font-extrabold text-blue-300 mb-2">{prediction.winProbability.team1}%</div>
//                   <div className="text-sm text-gray-400">{prediction.team1.name}</div>
//                   <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
//                     <div className="h-full bg-blue-500" style={{ width: `${prediction.winProbability.team1}%` }} />
//                   </div>
//                 </div>
//                 <div className="flex-1 text-center">
//                   <div className="text-4xl font-extrabold text-gray-300 mb-2">{prediction.winProbability.draw}%</div>
//                   <div className="text-sm text-gray-400">Draw</div>
//                   <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
//                     <div className="h-full bg-gray-500" style={{ width: `${prediction.winProbability.draw}%` }} />
//                   </div>
//                 </div>
//                 <div className="flex-1 text-center">
//                   <div className="text-4xl font-extrabold text-blue-300 mb-2">{prediction.winProbability.team2}%</div>
//                   <div className="text-sm text-gray-400">{prediction.team2.name}</div>
//                   <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
//                     <div className="h-full bg-blue-500" style={{ width: `${prediction.winProbability.team2}%` }} />
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Key Stats and Trends */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800"
//             >
//               <h3 className="text-2xl font-bold text-blue-400 mb-6">Key Stats and Trends</h3>
//               <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
//                 {prediction.keyStats.map((stat, idx) => {
//                   const Icon = stat.icon
//                   return (
//                     <motion.div
//                       key={idx}
//                       variants={itemVariants}
//                       className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors"
//                     >
//                       <Icon className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
//                       <p className="text-gray-300">{stat.label}</p>
//                     </motion.div>
//                   )
//                 })}
//               </motion.div>
//             </motion.div>

//             {/* Predicted Line-ups */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.1 }}
//               className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800"
//             >
//               <h3 className="text-2xl font-bold text-blue-400 mb-6">Predicted Line-ups</h3>
//               <div className="space-y-6">
//                 <div>
//                   <h4 className="text-lg font-semibold text-white mb-3">{prediction.team1.name} probable line-up:</h4>
//                   <p className="text-gray-300 leading-relaxed">{prediction.predictedLineups.team1}</p>
//                 </div>
//                 <div>
//                   <h4 className="text-lg font-semibold text-white mb-3">{prediction.team2.name} probable line-up:</h4>
//                   <p className="text-gray-300 leading-relaxed">{prediction.predictedLineups.team2}</p>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Recent Form */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800"
//             >
//               <h3 className="text-2xl font-bold text-blue-400 mb-6">Recent Form</h3>
//               <div className="space-y-6">
//                 <div>
//                   <h4 className="text-lg font-semibold text-white mb-3">{prediction.team1.name}</h4>
//                   <p className="text-gray-300 leading-relaxed">{prediction.recentForm.team1}</p>
//                 </div>
//                 <div>
//                   <h4 className="text-lg font-semibold text-white mb-3">{prediction.team2.name}</h4>
//                   <p className="text-gray-300 leading-relaxed">{prediction.recentForm.team2}</p>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Analysis Section */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//               className="bg-gray-900/70 p-8 rounded-2xl border border-gray-800 shadow-lg shadow-blue-500/10"
//             >
//               <h3 className="text-xl font-bold text-blue-400 mb-3">Match Analysis</h3>
//               <p className="text-gray-300 leading-relaxed whitespace-pre-line">{prediction.analysis}</p>
//             </motion.div>
//           </div>

//           {/* Right Column - Sidebar */}
//           <div className="space-y-6">
//             {/* Expert Tip */}
//             <motion.div
//               initial={{ opacity: 0, x: 40 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//               className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl border border-blue-500/50 shadow-lg shadow-blue-500/20"
//             >
//               <div className="text-sm font-semibold text-blue-100 mb-2">OUR PICK</div>
//               <h4 className="text-lg font-bold text-white mb-4">{prediction.expertTip}</h4>
//               <div className="flex items-center justify-between">
//                 <span className="text-3xl text-yellow-400 font-extrabold ">{prediction.odds}</span>
//                 {/* <span className="text-sm text-blue-100">{prediction.bookmaker}</span> */}
//               </div>
//               {/* <button className="w-full mt-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded-lg transition-colors">
//                 Make a bet →
//               </button> */}
//             </motion.div>

//             {/* Team Stats */}
//             <motion.div
//               initial={{ opacity: 0, x: 40 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.5 }}
//               className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800"
//             >
//               <h4 className="text-lg font-bold text-white mb-4">Team Stats</h4>
//               <div className="space-y-4">
//                 {[prediction.team1, prediction.team2].map((team, idx) => (
//                   <div key={idx} className="pb-4 border-b border-gray-700 last:border-b-0">
//                     <p className="text-sm font-semibold text-gray-300 mb-2">{team.name}</p>
//                     <div className="grid grid-cols-3 gap-2 text-xs">
//                       <div className="bg-gray-800 p-2 rounded text-center">
//                         <div className="font-bold text-green-400">{team.wins}</div>
//                         <div className="text-gray-400">Wins</div>
//                       </div>
//                       <div className="bg-gray-800 p-2 rounded text-center">
//                         <div className="font-bold text-gray-300">{team.draws}</div>
//                         <div className="text-gray-400">Draws</div>
//                       </div>
//                       <div className="bg-gray-800 p-2 rounded text-center">
//                         <div className="font-bold text-red-400">{team.losses}</div>
//                         <div className="text-gray-400">Losses</div>
//                       </div>
//                     </div>
//                     <div className="mt-3 text-xs space-y-1">
//                       <div className="flex justify-between">
//                         <span className="text-gray-400">Goals For:</span>
//                         <span className="text-white font-semibold">{team.goalsFor}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-400">Goals Against:</span>
//                         <span className="text-white font-semibold">{team.goalsAgainst}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Back Button */}
//         <div className="flex justify-center">
//           <Link href="/all-predictions">
//             <motion.button
//               whileHover={{
//                 scale: 1.08,
//                 boxShadow: "0px 0px 20px rgba(59,130,246,0.5)",
//               }}
//               className="px-10 py-3 border-2 border-blue-500 text-blue-400 font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-500"
//             >
//               ← Back to Predictions
//             </motion.button>
//           </Link>
//         </div>
//       </div>
//     </main>
//   )
// }



"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { TrendingUp, Users, Target, Shield, Zap, ArrowRight, Clock } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PredictionDetailsPage() {
  const { id } = useParams()

  const prediction = {
    id,
    league: "J. League Japan",
    team1: {
      name: "Gamba Osaka",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Gamba_Osaka_logo.svg/250px-Gamba_Osaka_logo.svg.png",
      form: "W-W-D-L-L",
      goalsFor: 0.6,
      goalsAgainst: 1.0,
      wins: 3,
      draws: 1,
      losses: 1,
    },
    team2: {
      name: "Kashiwa Reysol",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlOyJOBg4fzDpswTCJsTAYraZ4TAU9ZjEWVw&s",
      form: "W-W-W-D-L",
      goalsFor: 1.2,
      goalsAgainst: 1.4,
      wins: 3,
      draws: 1,
      losses: 1,
    },
    matchDate: "October 19, 2025 — 11:00 AM",
    venue: "Suita City Football Stadium",
    winProbability: { team1: 52, draw: 28, team2: 20 },
    analysis: `Gamba Osaka enter this match with strong home form, winning 3 of their last 5 games. Kashiwa Reysol, meanwhile, are struggling defensively and could concede early. Expect an open game with over 2.5 goals likely.`,
    keyStats: [
      { label: "Gamba Osaka has lost all of its last 3 games", icon: TrendingUp },
      { label: "Gamba Osaka has won 3 and drawn 1 of its last 5 home games", icon: Users },
      { label: "Gamba Osaka concedes 1 goal and scores 0.6 on average", icon: Target },
      { label: "Kashiwa Reysol has won 3 of its last 5 games, with 1 draw and 1 loss", icon: Shield },
      { label: "Kashiwa Reysol concedes 1.4 goals and scores 1.2 on average", icon: Zap },
    ],
    predictedLineups: {
      team1: "Ryo, Hosoi-Nduka-Iwatanake, Kaili-Yamada-Ogura-Yamane, Adailton-Solomon-Paulo",
      team2: "Takeda, Sato-Fuji-Uchida, Nakayama-Moroshima-Inagaki-Mori-Kadtro, Kimura",
    },
    recentForm: {
      team1:
        "After finishing last in 2021, Gamba Osaka was relegated to J.League 2 for the 2022 season. They earned promotion the following season by finishing as runners-up in J.League 2.",
      team2:
        "Nagoya Grampus won the league cup in 2021 and 2024. The club from the city of Nagoya in Aichi Prefecture also won the championship in 2010 and finished second the following year.",
    },
    expertTip: "Nagoya Grampus to win and both teams to score 'Yes'",
    odds: "2.11",
    bookmaker: "1XBET",
  }

  const trendingPredictions = [
    {
      id: 1,
      league: "J. League Japan",
      time: "Today, 11:00",
      team1: "Gamba Osaka",
      team2: "Kashiwa Reysol",
      prediction: "Total Goals (Over/Under) - Over(2.5)",
      odds: "1.84",
      image: "/football-tactical-analysis.png",
    },
    {
      id: 2,
      league: "J. League Japan",
      time: "Today, 14:00",
      team1: "Yokohama F Marinos",
      team2: "Urawa Red Diamonds",
      prediction: "BTTS: No",
      odds: "2.18",
      image: "/football-match-analysis-featured.jpg",
    },
    {
      id: 3,
      league: "J. League Japan",
      time: "Today, 17:00",
      team1: "Kawasaki Frontale",
      team2: "Shimizu S-Pulse",
      prediction: "1X2: 1",
      odds: "1.69",
      image: "/football-striker-scoring-goal.jpg",
    },
    {
      id: 4,
      league: "J. League Japan",
      time: "Tomorrow, 11:00",
      team1: "FC Tokyo",
      team2: "Nagoya Grampus",
      prediction: "Both Teams to Score - Yes",
      odds: "1.95",
      image: "/football-tactical-analysis-manchester-city-liverpo.jpg",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
        <Header/>
      {/* Background */}
      <div className="absolute inset-0">
        <Image src="/herobg.png" alt="Hero Background" fill className="object-cover opacity-40" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-gray-950/80 to-black" />
      </div>

      {/* Floating lights */}
      <motion.div
        animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6 }}
        className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-blue-600/20 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1.2, 1, 1.2] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8 }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-400/15 blur-3xl rounded-full"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
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
          <p className="text-gray-500 text-sm mt-1">{prediction.venue}</p>
        </motion.div>

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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Teams */}
            {/* <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-around gap-8 bg-gray-900/50 p-8 rounded-2xl border border-gray-800"
            >
              {[prediction.team1, prediction.team2].map((team, i) => (
                <div key={i} className="flex flex-col items-center space-y-3">
                  <Image src={team.logo || "/placeholder.svg"} alt={team.name} width={100} height={100} />
                  <h3 className="text-xl font-semibold text-white">{team.name}</h3>
                </div>
              ))}
            </motion.div> */}

            {/* Win Probability */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800"
            >
              <h2 className="text-2xl font-bold text-blue-400 mb-6">Match Prediction</h2>
              <div className="flex justify-between gap-4 mb-6">
                <div className="flex-1 text-center">
                  <div className="text-4xl font-extrabold text-blue-300 mb-2">{prediction.winProbability.team1}%</div>
                  <div className="text-sm text-gray-400">{prediction.team1.name}</div>
                  <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${prediction.winProbability.team1}%` }} />
                  </div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-4xl font-extrabold text-gray-300 mb-2">{prediction.winProbability.draw}%</div>
                  <div className="text-sm text-gray-400">Draw</div>
                  <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-500" style={{ width: `${prediction.winProbability.draw}%` }} />
                  </div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-4xl font-extrabold text-blue-300 mb-2">{prediction.winProbability.team2}%</div>
                  <div className="text-sm text-gray-400">{prediction.team2.name}</div>
                  <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${prediction.winProbability.team2}%` }} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Key Stats and Trends */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-6">Key Stats and Trends</h3>
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                {prediction.keyStats.map((stat, idx) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors"
                    >
                      <Icon className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                      <p className="text-gray-300">{stat.label}</p>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>

            {/* Predicted Line-ups */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-6">Predicted Line-ups</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">{prediction.team1.name} probable line-up:</h4>
                  <p className="text-gray-300 leading-relaxed">{prediction.predictedLineups.team1}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">{prediction.team2.name} probable line-up:</h4>
                  <p className="text-gray-300 leading-relaxed">{prediction.predictedLineups.team2}</p>
                </div>
              </div>
            </motion.div>

            {/* Recent Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-6">Recent Form</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">{prediction.team1.name}</h4>
                  <p className="text-gray-300 leading-relaxed">{prediction.recentForm.team1}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">{prediction.team2.name}</h4>
                  <p className="text-gray-300 leading-relaxed">{prediction.recentForm.team2}</p>
                </div>
              </div>
            </motion.div>

            {/* Analysis Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gray-900/70 p-8 rounded-2xl border border-gray-800 shadow-lg shadow-blue-500/10"
            >
              <h3 className="text-xl font-bold text-blue-400 mb-3">Match Analysis</h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{prediction.analysis}</p>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Expert Tip */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl border border-blue-500/50 shadow-lg shadow-blue-500/20"
            >
              <div className="text-sm font-semibold text-blue-100 mb-2">OUR PICK</div>
              <h4 className="text-lg font-bold text-white mb-4">{prediction.expertTip}</h4>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-yellow-400">{prediction.odds}</span>
                {/* <span className="text-sm text-blue-100">{prediction.bookmaker}</span> */}
              </div>
              {/* <button className="w-full mt-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded-lg transition-colors">
                Make a bet →
              </button> */}
            </motion.div>

            {/* Team Stats */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800"
            >
              <h4 className="text-lg font-bold text-white mb-4">Team Stats</h4>
              <div className="space-y-4">
                {[prediction.team1, prediction.team2].map((team, idx) => (
                  <div key={idx} className="pb-4 border-b border-gray-700 last:border-b-0">
                    <p className="text-sm font-semibold text-gray-300 mb-2">{team.name}</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-gray-800 p-2 rounded text-center">
                        <div className="font-bold text-green-400">{team.wins}</div>
                        <div className="text-gray-400">Wins</div>
                      </div>
                      <div className="bg-gray-800 p-2 rounded text-center">
                        <div className="font-bold text-gray-300">{team.draws}</div>
                        <div className="text-gray-400">Draws</div>
                      </div>
                      <div className="bg-gray-800 p-2 rounded text-center">
                        <div className="font-bold text-red-400">{team.losses}</div>
                        <div className="text-gray-400">Losses</div>
                      </div>
                    </div>
                    <div className="mt-3 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Goals For:</span>
                        <span className="text-white font-semibold">{team.goalsFor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Goals Against:</span>
                        <span className="text-white font-semibold">{team.goalsAgainst}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Trending Expert Predictions</h2>
              <p className="text-gray-400">Popular predictions from our experts</p>
            </div>
            <Link href="/all-predictions">
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                View All <ArrowRight className="h-4 w-4" />
              </motion.button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trendingPredictions.map((pred, idx) => (
              <motion.div
                key={pred.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
              >
                {/* Background Image */}
                <div className="absolute inset-0 h-full w-full">
                  <Image
                    src={pred.image || "/placeholder.svg"}
                    alt={`${pred.team1} vs ${pred.team2}`}
                    fill
                    className="object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative p-6 h-full flex flex-col justify-between">
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-blue-400">{pred.league}</span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {pred.time}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-4">
                      {pred.team1} vs {pred.team2}
                    </h3>
                  </div>

                  {/* Prediction Details */}
                  <div className="space-y-4">
                    <div className="bg-gray-900/60 backdrop-blur-sm p-4 rounded-lg border border-gray-800">
                      <p className="text-sm text-gray-300 mb-2">Prediction</p>
                      <p className="text-white font-semibold">{pred.prediction}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Odds</span>
                      <span className="text-2xl font-bold text-blue-400">{pred.odds}</span>
                    </div>

                    <Link href={`/prediction/${pred.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        View Details <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Back Button */}
        <div className="flex justify-center">
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
      <Footer/>
    </main>
    
  )
}

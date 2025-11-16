"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import AddPredictionModal from "@/components/add-prediction-modal"
import { useUserAuth } from "@/lib/hooks/use-user-auth"
import { useRouter } from 'next/navigation'

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

export default function PredictionsSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const { authenticated } = useUserAuth()
  const router = useRouter()

  useEffect(() => {
    // Fetch predictions from database
    fetch("/api/predictions?limit=6")
      .then((res) => res.json())
      .then((data) => {
        setPredictions(data.predictions || [])
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching predictions:", error)
        setLoading(false)
      })
  }, [])

  const handleShareClick = () => {
    if (!authenticated) {
      alert("Please sign in to share predictions")
      router.push("/signin")
      return
    }
    setModalOpen(true)
  }

  return (
    <section className="relative py-20 bg-black text-white overflow-hidden">
      {/* Background with Image + Gradient Overlay */}
      <div className="absolute inset-0">
        <Image src="/herobg.png" alt="Football stadium background" fill className="object-cover opacity-50" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/80 to-black opacity-90" />
      </div>

      {/* Animated Lights */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/30 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.6, 0.2], scale: [1.2, 1, 1.2] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
            ⚡ Match Predictions
          </h2>
          <div className="flex gap-3">
            <Button
              onClick={handleShareClick}
              className="px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Share Prediction
            </Button>
          </div>
        </motion.div>

        {/* Predictions Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-400">Loading predictions...</p>
          </div>
        ) : predictions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No predictions available yet. Be the first to share one!</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {predictions.map((p) => (
              <motion.div
                key={p._id}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/70 backdrop-blur-md shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500"
              >
                {/* Background */}
                <div
                  className="absolute inset-0 opacity-30 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://png.pngtree.com/background/20250124/original/pngtree-futuristic-soccer-stadium-with-holographic-ball-and-blue-lights-picture-image_15711843.jpg')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

                {/* Content */}
                <div className="relative p-6 flex flex-col items-center space-y-4">
                  {/* Teams */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col items-center flex-1">
                      <Image 
                        src={p.team1?.logo || "/placeholder.svg?height=50&width=50"} 
                        alt={p.team1?.name || "Home team"} 
                        width={50} 
                        height={50} 
                        className="object-contain mb-2" 
                      />
                      <p className="text-sm text-gray-300 text-center">{p.team1?.name}</p>
                    </div>
                    <div className="px-4 text-xl font-bold text-blue-400">VS</div>
                    <div className="flex flex-col items-center flex-1">
                      <Image 
                        src={p.team2?.logo || "/placeholder.svg?height=50&width=50"} 
                        alt={p.team2?.name || "Away team"} 
                        width={50} 
                        height={50} 
                        className="object-contain mb-2" 
                      />
                      <p className="text-sm text-gray-300 text-center">{p.team2?.name}</p>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="pt-3 text-center space-y-1 border-t border-gray-700 w-full">
                    <p className="text-xs text-blue-400 font-semibold tracking-wide">{p.league}</p>
                    <h3 className="text-base font-bold text-white hover:text-blue-400 transition-colors line-clamp-2">
                      {p.team1?.name} vs {p.team2?.name} prediction and betting tips on {new Date(p.matchDate).toLocaleDateString()}
                    </h3>
                    <p className="text-xs text-gray-400">{new Date(p.matchDate).toLocaleString()}</p>
                  </div>

                  {/* CTA Button */}
                  <Link href={`/prediction/${p._id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="mt-4 px-6 py-2 text-sm font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full text-black hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300"
                    >
                      View Prediction →
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All Button */}
        <div className="flex justify-center mt-16">
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

      <AddPredictionModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  )
}

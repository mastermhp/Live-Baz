"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import PredictionsSection from "@/components/predictions-section";

export default function AllPredictionsPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background with Image + Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/herobg.png"
          alt="Background Stadium"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/90 via-blue-950/70 to-black opacity-95" />
      </div>

      {/* Floating Animated Lights */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute -top-40 left-0 w-[600px] h-[600px] bg-blue-500/20 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.6, 0.2] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-cyan-400/10 blur-3xl rounded-full"
      />

      {/* Header Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent"
        >
          ⚽ All Match Predictions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-gray-300 max-w-2xl mx-auto"
        >
          Explore all our AI-powered match insights and prediction analytics across football leagues worldwide.
        </motion.p>
      </div>

      {/* Prediction Cards */}
      <div className="relative z-10">
        <PredictionsSection />
      </div>
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LiveMatchCardCompact({ game }) {
  const homeWinPercent = Math.floor(Math.random() * 40) + 30;
  const drawPercent = Math.floor(Math.random() * 30) + 20;
  const awayWinPercent = 100 - homeWinPercent - drawPercent;

  return (
    <Link href={`/match/${game.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 mb-3 cursor-pointer"
      >
        {/* League Header */}
        <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {game.leagueLogo && (
                <img
                  src={game.leagueLogo || "/placeholder.svg"}
                  alt={game.league}
                  className="w-5 h-5 rounded-full object-contain"
                />
              )}
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                {game.league}
              </span>
            </div>
            {game.status === "live" && (
              <div className="flex items-center gap-1">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                  className="inline-block h-2 w-2 bg-red-500 rounded-full"
                />
                <span className="text-xs font-bold text-red-500">LIVE</span>
              </div>
            )}
          </div>
        </div>

        {/* Match Content */}
        <div className="p-4">
          <div className="grid grid-cols-12 gap-4 items-start">
            {/* Time Column */}
            <div className="col-span-1 w-full my-auto">
              <div className="w-full">
                <p className="text-xs text-gray-500 font-medium mb-2">Time</p>
                <p className="text-sm font-bold text-gray-900">
                  {game.status === "live" ? `${game.minute}'` : game.time}
                </p>
              </div>
            </div>

            {/* Match Section - Teams with Vertical Score */}
            <div className="col-span-6">
              <p className="text-xs text-gray-500 font-medium mb-3">Match</p>
              <div className="space-y-3">
                {/* Home Team */}
                <div className="flex items-center gap-3">
                  {game.homeTeamLogo && (
                    <img
                      src={game.homeTeamLogo || "/placeholder.svg"}
                      alt={game.homeTeam}
                      className="w-7 h-7 rounded-full object-contain flex-shrink-0"
                    />
                  )}
                  <span className="text-sm font-semibold text-gray-800 truncate">
                    {game.homeTeam}
                  </span>
                </div>

                {/* Separator Line */}
                <div className="h-px bg-gray-200" />

                {/* Away Team */}
                <div className="flex items-center gap-3">
                  {game.awayTeamLogo && (
                    <img
                      src={game.awayTeamLogo || "/placeholder.svg"}
                      alt={game.awayTeam}
                      className="w-7 h-7 rounded-full object-contain flex-shrink-0"
                    />
                  )}
                  <span className="text-sm font-semibold text-gray-800 truncate">
                    {game.awayTeam}
                  </span>
                </div>
              </div>
            </div>

            {/* Score Column - Vertical Display */}
            <div className="col-span-2 flex flex-col items-center justify-center gap-2">
              <p className="text-xs text-gray-500 font-medium">Score</p>
              <div className="flex flex-col items-center gap-2">
                <span className="text-lg font-bold text-blue-600">
                  {game.homeScore}
                </span>
                <span className="text-xs font-bold text-gray-400">-</span>
                <span className="text-lg font-bold text-cyan-600">
                  {game.awayScore}
                </span>
              </div>
            </div>

            {/* Standings Column - Win Percentages */}
            <div className="col-span-3">
              <p className="text-xs text-gray-500 font-medium mb-3">
                Standings
              </p>
              <div className="space-y-2">
                {/* Home Win % */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-700">1</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded">
                    {homeWinPercent}%
                  </span>
                </div>

                {/* Draw % */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-700">X</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-bold rounded">
                    {drawPercent}%
                  </span>
                </div>

                {/* Away Win % */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-700">2</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded">
                    {awayWinPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

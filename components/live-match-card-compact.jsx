"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LiveMatchCardCompact({ game }) {
  return (
    <Link href={`/match/${game.id}`}>
      <motion.div
        whileHover={{ x: 4 }}
        className="group relative overflow-hidden rounded-lg backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 mb-2 border border-blue-500/20 hover:border-blue-500/40 p-3 cursor-pointer"
      >
        <div className="flex items-center justify-between gap-3">
          {/* Left: Animated minute */}
          <div className="flex items-center gap-2 min-w-fit">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.2 }}
              className="inline-block h-2 w-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50"
            />
            <span className="text-xs font-bold text-red-500 whitespace-nowrap">
              {game.minute}'
            </span>
          </div>

          {/* Home Team */}
          <div className="flex items-center justify-end gap-2 flex-1 min-w-0">
            <span className="text-xs font-semibold text-gray-600 truncate">
              {game.homeTeam}
            </span>
            <img
              src={game.homeTeamLogo || "/placeholder.svg"}
              alt={game.homeTeam}
              className="w-6 h-6 rounded-full object-contain flex-shrink-0"
            />
            
          </div>

          {/* Score */}
          <div className="flex items-center justify-center gap-1 px-2 py-1 bg-blue-600/30 rounded border border-blue-500/30 min-w-fit">
            <span className="text-sm font-bold text-cyan-900">
              {game.homeScore}
            </span>
            <span className="text-xs font-bold text-cyan-900">:</span>
            <span className="text-sm font-bold text-cyan-900">
              {game.awayScore}
            </span>
          </div>

          {/* Away Team */}
          <div className="flex items-center justify-start gap-2 flex-1 min-w-0">
            <img
              src={game.awayTeamLogo || "/placeholder.svg"}
              alt={game.awayTeam}
              className="w-6 h-6 rounded-full object-contain flex-shrink-0"
            />
            <span className="text-xs font-semibold text-gray-600 truncate">
              {game.awayTeam}
            </span>
          </div>

          {/* League Badge */}
          <div className="flex items-center gap-1 px-2 py-1 bg-blue-600/20 rounded-full border border-blue-500/30 min-w-fit">
            {game.leagueLogo && (
              <img
                src={game.leagueLogo || "/placeholder.svg"}
                alt={game.league}
                className="h-3 w-3 rounded-full object-contain"
              />
            )}
            <span className="text-[8px] font-semibold text-blue-600 uppercase">
              {game.league}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

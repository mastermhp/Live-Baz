"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, TrendingUp, Flame, Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MatchCard({ match }) {
  const [isHovered, setIsHovered] = useState(false)
  const isLive = match.status === "live"

  return (
    <Link href={`/match/${match.id}`}>
      <Card
        className="relative p-4 md:p-5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border-2 border-gray-100 hover:border-blue-300 animate-fade-in overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          {/* League and time */}
          <div className="flex items-center justify-between mb-3 md:mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 md:px-3 py-1 rounded-full">
                {match.league}
              </span>
            </div>
            {isLive ? (
              <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg animate-pulse-subtle text-xs md:text-sm">
                <Flame className="h-3 w-3 mr-1" />
                LIVE {match.minute}'
              </Badge>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-2 md:px-3 py-1 rounded-full">
                <Clock className="h-3 w-3" />
                {match.time}
              </div>
            )}
          </div>

          <div className="space-y-3 md:space-y-4 mb-4 md:mb-5">
            {/* Home team */}
            <div className="flex items-center justify-between group/team">
              <div className="flex items-center gap-2 md:gap-3 flex-1">
                <div className="relative h-8 md:h-10 w-8 md:w-10 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shrink-0 group-hover/team:scale-110 transition-transform duration-300 shadow-md">
                  <span className="text-xs font-bold text-blue-700">{match.homeTeam.slice(0, 3).toUpperCase()}</span>
                  <div className="absolute inset-0 rounded-lg md:rounded-xl bg-blue-500 opacity-0 group-hover/team:opacity-20 transition-opacity duration-300" />
                </div>
                <span className="font-bold text-sm md:text-base text-gray-900 group-hover/team:text-blue-600 transition-colors">
                  {match.homeTeam}
                </span>
              </div>
              {isLive && (
                <span className="text-2xl md:text-3xl font-bold text-gray-900 tabular-nums animate-scale-in">
                  {match.homeScore}
                </span>
              )}
            </div>

            {/* Away team */}
            <div className="flex items-center justify-between group/team">
              <div className="flex items-center gap-2 md:gap-3 flex-1">
                <div className="relative h-8 md:h-10 w-8 md:w-10 rounded-lg md:rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center shrink-0 group-hover/team:scale-110 transition-transform duration-300 shadow-md">
                  <span className="text-xs font-bold text-green-700">{match.awayTeam.slice(0, 3).toUpperCase()}</span>
                  <div className="absolute inset-0 rounded-lg md:rounded-xl bg-green-500 opacity-0 group-hover/team:opacity-20 transition-opacity duration-300" />
                </div>
                <span className="font-bold text-sm md:text-base text-gray-900 group-hover/team:text-green-600 transition-colors">
                  {match.awayTeam}
                </span>
              </div>
              {isLive && (
                <span className="text-2xl md:text-3xl font-bold text-gray-900 tabular-nums animate-scale-in">
                  {match.awayScore}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2 md:space-y-3 pt-3 md:pt-4 border-t-2 border-gray-100">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600 font-semibold flex items-center gap-1">
                <TrendingUp className="h-3 md:h-3.5 w-3 md:w-3.5 text-blue-500" />
                Win Probability
              </span>
              <Star className="h-3 md:h-3.5 w-3 md:w-3.5 text-yellow-500" />
            </div>

            {/* Animated probability bars */}
            <div className="space-y-1.5 md:space-y-2">
              <div className="flex items-center gap-1.5 md:gap-2">
                <span className="text-xs text-gray-600 w-10 md:w-12">Home</span>
                <div className="flex-1 h-1.5 md:h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: isHovered ? `${match.homeWinPercent}%` : "0%" }}
                  />
                </div>
                <span className="text-xs md:text-sm font-bold text-blue-600 w-10 md:w-12 text-right">
                  {match.homeWinPercent}%
                </span>
              </div>

              <div className="flex items-center gap-1.5 md:gap-2">
                <span className="text-xs text-gray-600 w-10 md:w-12">Draw</span>
                <div className="flex-1 h-1.5 md:h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gray-400 to-gray-500 rounded-full transition-all duration-1000 ease-out delay-100"
                    style={{ width: isHovered ? `${match.drawPercent}%` : "0%" }}
                  />
                </div>
                <span className="text-xs md:text-sm font-bold text-gray-600 w-10 md:w-12 text-right">
                  {match.drawPercent}%
                </span>
              </div>

              <div className="flex items-center gap-1.5 md:gap-2">
                <span className="text-xs text-gray-600 w-10 md:w-12">Away</span>
                <div className="flex-1 h-1.5 md:h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000 ease-out delay-200"
                    style={{ width: isHovered ? `${match.awayWinPercent}%` : "0%" }}
                  />
                </div>
                <span className="text-xs md:text-sm font-bold text-green-600 w-10 md:w-12 text-right">
                  {match.awayWinPercent}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 md:gap-3 mt-3 md:mt-4 pt-3 md:pt-4 border-t-2 border-gray-100">
            <div className="flex-1 text-center p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 group-hover:shadow-md transition-shadow">
              <div className="text-base md:text-lg font-bold text-blue-600">{match.btts}%</div>
              <div className="text-xs text-gray-600 font-medium">BTTS</div>
            </div>
            <div className="flex-1 text-center p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br from-green-50 to-green-100 group-hover:shadow-md transition-shadow">
              <div className="text-base md:text-lg font-bold text-green-600">{match.over25}%</div>
              <div className="text-xs text-gray-600 font-medium">Over 2.5</div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

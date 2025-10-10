"use client"

import Link from "next/link"
import { Clock, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MatchCard({ match }) {
  const isLive = match.status === "live"

  return (
    <Link href={`/match/${match.id}`}>
      <Card className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border-border/50 animate-fade-in">
        {/* League and time */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">{match.league}</span>
          </div>
          {isLive ? (
            <Badge variant="default" className="bg-success text-success-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-white mr-1.5 animate-pulse-live" />
              LIVE {match.minute}'
            </Badge>
          ) : (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {match.time}
            </div>
          )}
        </div>

        {/* Teams and scores */}
        <div className="space-y-3 mb-4">
          {/* Home team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                <span className="text-xs font-bold">{match.homeTeam.slice(0, 3).toUpperCase()}</span>
              </div>
              <span className="font-semibold text-sm">{match.homeTeam}</span>
            </div>
            {isLive && <span className="text-2xl font-bold text-foreground">{match.homeScore}</span>}
          </div>

          {/* Away team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                <span className="text-xs font-bold">{match.awayTeam.slice(0, 3).toUpperCase()}</span>
              </div>
              <span className="font-semibold text-sm">{match.awayTeam}</span>
            </div>
            {isLive && <span className="text-2xl font-bold text-foreground">{match.awayScore}</span>}
          </div>
        </div>

        {/* Win percentages */}
        <div className="space-y-2 pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Win Probability</span>
            <TrendingUp className="h-3 w-3 text-primary" />
          </div>
          <div className="flex gap-2">
            <div className="flex-1 text-center">
              <div className="text-lg font-bold text-primary">{match.homeWinPercent}%</div>
              <div className="text-xs text-muted-foreground">Home</div>
            </div>
            <div className="flex-1 text-center">
              <div className="text-lg font-bold text-muted-foreground">{match.drawPercent}%</div>
              <div className="text-xs text-muted-foreground">Draw</div>
            </div>
            <div className="flex-1 text-center">
              <div className="text-lg font-bold text-accent">{match.awayWinPercent}%</div>
              <div className="text-xs text-muted-foreground">Away</div>
            </div>
          </div>
        </div>

        {/* Additional stats */}
        <div className="flex gap-4 mt-3 pt-3 border-t border-border/50">
          <div className="flex-1 text-center">
            <div className="text-sm font-semibold text-secondary">{match.btts}%</div>
            <div className="text-xs text-muted-foreground">BTTS</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-sm font-semibold text-secondary">{match.over25}%</div>
            <div className="text-xs text-muted-foreground">Over 2.5</div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

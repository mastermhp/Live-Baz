import Header from "@/components/header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { matchDetails } from "@/lib/demo-data"
import { MapPin, Users, Castle as Whistle, TrendingUp, Activity } from "lucide-react"
import Link from "next/link"

export default function MatchDetailsPage({ params }) {
  // In a real app, we'd fetch based on params.id
  const match = matchDetails[1]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Match Header */}
        <Card className="p-6 mb-6 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">{match.league}</span>
            </div>
            <Badge variant="default" className="bg-success text-success-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-white mr-1.5 animate-pulse-live" />
              LIVE {match.minute}'
            </Badge>
          </div>

          {/* Score Display */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                <span className="text-sm font-bold">{match.homeTeam.slice(0, 3).toUpperCase()}</span>
              </div>
              <h2 className="text-xl font-bold mb-1">{match.homeTeam}</h2>
            </div>

            <div className="flex items-center gap-4 px-8">
              <span className="text-5xl font-bold">{match.homeScore}</span>
              <span className="text-3xl text-muted-foreground">-</span>
              <span className="text-5xl font-bold">{match.awayScore}</span>
            </div>

            <div className="flex-1 text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                <span className="text-sm font-bold">{match.awayTeam.slice(0, 3).toUpperCase()}</span>
              </div>
              <h2 className="text-xl font-bold mb-1">{match.awayTeam}</h2>
            </div>
          </div>

          {/* Match Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground border-t border-border pt-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {match.stadium}
            </div>
            <div className="flex items-center gap-2">
              <Whistle className="h-4 w-4" />
              {match.referee}
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {match.attendance}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Win Probability */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold">Win Probability</h3>
              </div>
              <div className="flex gap-4 mb-4">
                <div className="flex-1 text-center p-4 rounded-lg bg-primary/10">
                  <div className="text-3xl font-bold text-primary mb-1">{match.homeWinPercent}%</div>
                  <div className="text-sm text-muted-foreground">Home Win</div>
                </div>
                <div className="flex-1 text-center p-4 rounded-lg bg-muted">
                  <div className="text-3xl font-bold text-muted-foreground mb-1">{match.drawPercent}%</div>
                  <div className="text-sm text-muted-foreground">Draw</div>
                </div>
                <div className="flex-1 text-center p-4 rounded-lg bg-accent/10">
                  <div className="text-3xl font-bold text-accent mb-1">{match.awayWinPercent}%</div>
                  <div className="text-sm text-muted-foreground">Away Win</div>
                </div>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden flex">
                <div className="bg-primary h-full" style={{ width: `${match.homeWinPercent}%` }} />
                <div className="bg-muted-foreground h-full" style={{ width: `${match.drawPercent}%` }} />
                <div className="bg-accent h-full" style={{ width: `${match.awayWinPercent}%` }} />
              </div>
            </Card>

            {/* Match Statistics */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-5 w-5 text-secondary" />
                <h3 className="text-lg font-bold">Match Statistics</h3>
              </div>
              <div className="space-y-4">
                {Object.entries(match.stats).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="font-semibold">{value.home}</span>
                      <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                      <span className="font-semibold">{value.away}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden flex">
                      <div
                        className="bg-primary h-full"
                        style={{ width: `${(value.home / (value.home + value.away)) * 100}%` }}
                      />
                      <div
                        className="bg-accent h-full"
                        style={{ width: `${(value.away / (value.home + value.away)) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Match Events Timeline */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Match Events</h3>
              <div className="space-y-4">
                {match.events.map((event, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted shrink-0">
                      <span className="text-xs font-bold">{event.minute}'</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {event.type === "goal" && (
                          <Badge variant="default" className="bg-secondary">
                            ⚽ Goal
                          </Badge>
                        )}
                        {event.type === "yellow" && (
                          <Badge variant="default" className="bg-yellow-500">
                            🟨 Yellow Card
                          </Badge>
                        )}
                        {event.type === "substitution" && <Badge variant="outline">🔄 Substitution</Badge>}
                      </div>
                      <p className="text-sm">
                        {event.type === "substitution" ? (
                          <>
                            <span className="font-semibold">{event.playerOut}</span> off,{" "}
                            <span className="font-semibold">{event.playerIn}</span> on
                          </>
                        ) : (
                          <>
                            <span className="font-semibold">{event.player}</span>
                            {event.assist && <span className="text-muted-foreground"> (Assist: {event.assist})</span>}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Form Guide */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Recent Form</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">{match.homeTeam}</div>
                  <div className="flex gap-2">
                    {match.form.home.map((result, index) => (
                      <div
                        key={index}
                        className={`h-8 w-8 rounded flex items-center justify-center text-xs font-bold ${
                          result === "W"
                            ? "bg-secondary text-secondary-foreground"
                            : result === "D"
                              ? "bg-muted text-muted-foreground"
                              : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">{match.awayTeam}</div>
                  <div className="flex gap-2">
                    {match.form.away.map((result, index) => (
                      <div
                        key={index}
                        className={`h-8 w-8 rounded flex items-center justify-center text-xs font-bold ${
                          result === "W"
                            ? "bg-secondary text-secondary-foreground"
                            : result === "D"
                              ? "bg-muted text-muted-foreground"
                              : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Related Articles */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Match Analysis</h3>
              <div className="space-y-4">
                <Link href="/blog/1" className="block group">
                  <div className="aspect-video bg-muted rounded-lg mb-2 overflow-hidden">
                    <img
                      src="/football-tactical-analysis.png"
                      alt="Analysis"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                    Tactical Preview: What to Expect
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">5 min read</p>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

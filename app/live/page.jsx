"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import MatchCard from "@/components/match-card"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Flame, Filter, Radio, TrendingUp, Clock } from "lucide-react"
import Footer from "@/components/footer"
import { getLiveMatches, getUpcomingMatches } from "@/lib/api-football"
import { transformMatches } from "@/lib/transform-api-data"

export default function LivePage() {
  const [filter, setFilter] = useState("all")
  const [liveMatches, setLiveMatches] = useState([])
  const [upcomingMatches, setUpcomingMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [liveCount, setLiveCount] = useState(0)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true)
        const [liveData, upcomingData] = await Promise.all([getLiveMatches(), getUpcomingMatches(1)])

        const transformedLive = transformMatches(liveData)
        const transformedUpcoming = transformMatches(upcomingData)

        setLiveMatches(transformedLive)
        setUpcomingMatches(transformedUpcoming)
        setLiveCount(transformedLive.length)
      } catch (error) {
        console.error("Error fetching matches:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()

    // Refresh live data every 30 seconds
    const interval = setInterval(fetchMatches, 30000)
    return () => clearInterval(interval)
  }, [])

  const displayMatches = [...liveMatches, ...upcomingMatches]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-green-50/30">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-float-delayed" />

        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <div className="flex items-center gap-4 mb-6 animate-slide-up">
            <div className="relative">
              <Radio className="h-12 w-12 text-white animate-pulse" />
              <div className="absolute inset-0 h-12 w-12 bg-white rounded-full blur-xl opacity-50 animate-pulse" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-2 text-balance">Live Matches</h1>
              <p className="text-xl text-white/90">Real-time scores and instant updates</p>
            </div>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6 hover:bg-white/20 transition-all duration-300 animate-fade-in">
              <div className="flex items-center gap-3 mb-2">
                <Flame className="h-6 w-6 text-green-300" />
                <span className="text-sm text-white/80">Live Now</span>
              </div>
              <div className="text-4xl font-bold">{liveCount}</div>
            </Card>
            <Card
              className="bg-white/10 backdrop-blur-lg border-white/20 p-6 hover:bg-white/20 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-6 w-6 text-blue-300" />
                <span className="text-sm text-white/80">Goals Today</span>
              </div>
              <div className="text-4xl font-bold">127</div>
            </Card>
            <Card
              className="bg-white/10 backdrop-blur-lg border-white/20 p-6 hover:bg-white/20 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-6 w-6 text-yellow-300" />
                <span className="text-sm text-white/80">Starting Soon</span>
              </div>
              <div className="text-4xl font-bold">{upcomingMatches.length}</div>
            </Card>
            <Card
              className="bg-white/10 backdrop-blur-lg border-white/20 p-6 hover:bg-white/20 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Radio className="h-6 w-6 text-red-300" />
                <span className="text-sm text-white/80">Viewers</span>
              </div>
              <div className="text-4xl font-bold">2.4M</div>
            </Card>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8 animate-slide-up">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")} className="gap-2">
            <Filter className="h-4 w-4" />
            All Matches
          </Button>
          <Button
            variant={filter === "premier-league" ? "default" : "outline"}
            onClick={() => setFilter("premier-league")}
          >
            Premier League
          </Button>
          <Button variant={filter === "la-liga" ? "default" : "outline"} onClick={() => setFilter("la-liga")}>
            La Liga
          </Button>
          <Button variant={filter === "serie-a" ? "default" : "outline"} onClick={() => setFilter("serie-a")}>
            Serie A
          </Button>
          <Button variant={filter === "bundesliga" ? "default" : "outline"} onClick={() => setFilter("bundesliga")}>
            Bundesliga
          </Button>
        </div>

        {/* Live Matches Grid */}
        <div className="space-y-8">
          {loading ? (
            <Card className="p-12 text-center">
              <div className="animate-spin inline-block">
                <Radio className="h-16 w-16 text-gray-400" />
              </div>
              <p className="text-gray-600 mt-4">Loading live matches...</p>
            </Card>
          ) : displayMatches.length > 0 ? (
            displayMatches.map((match, index) => (
              <div key={match.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <MatchCard match={match} />
              </div>
            ))
          ) : (
            <Card className="p-12 text-center">
              <Radio className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Live Matches</h3>
              <p className="text-gray-600">Check back soon for live match updates</p>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

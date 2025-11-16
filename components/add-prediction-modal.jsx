"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUserAuth } from "@/lib/hooks/use-user-auth"
import { TrendingUp, Trophy, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AddPredictionModal({ open, onOpenChange }) {
  const { user, authenticated } = useUserAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [loadingMatches, setLoadingMatches] = useState(true)
  const [matches, setMatches] = useState([])
  const [selectedMatch, setSelectedMatch] = useState("")
  
  const [formData, setFormData] = useState({
    predictedWinner: "home",
    confidence: 70,
    venue: "",
    winProbability: { team1: 0, draw: 0, team2: 0 },
    expertTip: "",
    odds: "",
    team1Stats: {
      form: "",
      goalsFor: 0,
      goalsAgainst: 0,
      wins: 0,
      draws: 0,
      losses: 0,
    },
    team2Stats: {
      form: "",
      goalsFor: 0,
      goalsAgainst: 0,
      wins: 0,
      draws: 0,
      losses: 0,
    },
    predictedLineups: {
      team1: "",
      team2: "",
    },
    recentForm: {
      team1: "",
      team2: "",
    },
    keyStats: ["", "", "", "", ""],
    analysis: {
      en: "",
      fa: "",
      ar: "",
    },
    title: {
      en: "",
      fa: "",
      ar: "",
    },
  })

  useEffect(() => {
    if (open) {
      fetchMatches()
    }
  }, [open])

  const fetchMatches = async () => {
    setLoadingMatches(true)
    try {
      // Fetch both live and upcoming matches
      const [liveRes, upcomingRes] = await Promise.all([
        fetch("/api/matches/live"),
        fetch("/api/matches/upcoming?limit=20")
      ])

      const liveData = await liveRes.json()
      const upcomingData = await upcomingRes.json()

      // Combine and format matches
      const liveMatches = (liveData.response || []).map(fixture => ({
        id: fixture.fixture.id.toString(),
        homeTeam: { name: fixture.teams.home.name, logo: fixture.teams.home.logo },
        awayTeam: { name: fixture.teams.away.name, logo: fixture.teams.away.logo },
        league: { name: fixture.league.name },
        venue: fixture.fixture.venue?.name || "",
        date: fixture.fixture.date,
        status: 'live',
        time: fixture.fixture.status.elapsed ? `${fixture.fixture.status.elapsed}'` : 'LIVE'
      }))

      const upcomingMatches = (upcomingData.response || []).map(fixture => ({
        id: fixture.fixture.id.toString(),
        homeTeam: { name: fixture.teams.home.name, logo: fixture.teams.home.logo },
        awayTeam: { name: fixture.teams.away.name, logo: fixture.teams.away.logo },
        league: { name: fixture.league.name },
        venue: fixture.fixture.venue?.name || "",
        date: fixture.fixture.date,
        status: 'upcoming',
        time: new Date(fixture.fixture.date).toLocaleString()
      }))

      const allMatches = [...liveMatches, ...upcomingMatches]
      const uniqueMatchesMap = new Map()
      
      allMatches.forEach(match => {
        // Prioritize live matches over upcoming if same ID appears in both
        if (!uniqueMatchesMap.has(match.id) || match.status === 'live') {
          uniqueMatchesMap.set(match.id, match)
        }
      })

      const uniqueMatches = Array.from(uniqueMatchesMap.values())
      setMatches(uniqueMatches)
      console.log("[v0] Loaded unique matches:", uniqueMatches.length, "total")
    } catch (error) {
      console.error("[v0] Error fetching matches:", error)
    } finally {
      setLoadingMatches(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Require authentication
    if (!authenticated) {
      alert("Please sign in to share predictions")
      router.push("/signin")
      return
    }

    setLoading(true)

    try {
      // Find selected match details
      const match = matches.find((m) => m.id === selectedMatch)
      if (!match) {
        alert("Please select a match")
        setLoading(false)
        return
      }

      const payload = {
        matchId: match.id,
        team1: { name: match.homeTeam?.name || "Team 1", logo: match.homeTeam?.logo || "" },
        team2: { name: match.awayTeam?.name || "Team 2", logo: match.awayTeam?.logo || "" },
        league: match.league?.name || "League",
        matchDate: match.date,
        venue: formData.venue || match.venue,
        predictedWinner: formData.predictedWinner,
        confidence: formData.confidence,
        winProbability: formData.winProbability,
        expertTip: formData.expertTip,
        odds: formData.odds,
        team1Stats: formData.team1Stats,
        team2Stats: formData.team2Stats,
        predictedLineups: formData.predictedLineups,
        recentForm: formData.recentForm,
        keyStats: formData.keyStats.filter(stat => stat.trim() !== ""),
        translations: {
          en: {
            title: formData.title.en,
            analysis: formData.analysis.en,
          },
          fa: {
            title: formData.title.fa,
            analysis: formData.analysis.fa,
          },
          ar: {
            title: formData.title.ar,
            analysis: formData.analysis.ar,
          },
        },
        author: user?.name || "User",
        authorId: user?.id || null,
      }

      const res = await fetch("/api/predictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (res.ok) {
        alert("Prediction submitted successfully!")
        onOpenChange(false)
        // Reset form
        setFormData({
          predictedWinner: "home",
          confidence: 70,
          venue: "",
          winProbability: { team1: 0, draw: 0, team2: 0 },
          expertTip: "",
          odds: "",
          team1Stats: { form: "", goalsFor: 0, goalsAgainst: 0, wins: 0, draws: 0, losses: 0 },
          team2Stats: { form: "", goalsFor: 0, goalsAgainst: 0, wins: 0, draws: 0, losses: 0 },
          predictedLineups: { team1: "", team2: "" },
          recentForm: { team1: "", team2: "" },
          keyStats: ["", "", "", "", ""],
          analysis: { en: "", fa: "", ar: "" },
          title: { en: "", fa: "", ar: "" },
        })
        setSelectedMatch("")
        // Refresh page to show new prediction
        window.location.reload()
      } else {
        alert(data.error || "Failed to submit prediction")
      }
    } catch (error) {
      console.error("[v0] Error submitting prediction:", error)
      alert("Failed to submit prediction")
    } finally {
      setLoading(false)
    }
  }

  const updateKeyStats = (index, value) => {
    const newKeyStats = [...formData.keyStats]
    newKeyStats[index] = value
    setFormData({ ...formData, keyStats: newKeyStats })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-gray-800 text-white border border-blue-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <Trophy className="h-7 w-7 text-yellow-400" />
            Share Your Match Prediction
          </DialogTitle>
        </DialogHeader>

        {!authenticated && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-200 font-semibold">Authentication Required</p>
              <p className="text-xs text-yellow-300/80 mt-1">
                You must be signed in to share predictions.{" "}
                <button onClick={() => router.push("/signin")} className="underline hover:text-yellow-200">
                  Sign in now
                </button>
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Match Selection */}
          <div className="space-y-2">
            <Label className="text-white">Select Match</Label>
            {loadingMatches ? (
              <div className="bg-white/10 border border-blue-500/30 rounded-md p-3 text-center text-gray-400">
                Loading matches...
              </div>
            ) : matches.length === 0 ? (
              <div className="bg-white/10 border border-blue-500/30 rounded-md p-3 text-center text-gray-400">
                No matches available
              </div>
            ) : (
              <Select value={selectedMatch} onValueChange={setSelectedMatch}>
                <SelectTrigger className="bg-white/10 border-blue-500/30 text-white">
                  <SelectValue placeholder="Choose a match" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-blue-500/30 max-h-[300px]">
                  {matches.map((match) => (
                    <SelectItem key={match.id} value={match.id} className="text-white hover:bg-blue-500/20">
                      <div className="flex items-center gap-2">
                        {match.status === 'live' && (
                          <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded">LIVE</span>
                        )}
                        <span>{match.homeTeam?.name} vs {match.awayTeam?.name}</span>
                        <span className="text-xs text-gray-400">({match.league?.name})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Basic Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Predicted Winner</Label>
              <Select value={formData.predictedWinner} onValueChange={(val) => setFormData({ ...formData, predictedWinner: val })}>
                <SelectTrigger className="bg-white/10 border-blue-500/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-blue-500/30">
                  <SelectItem value="home" className="text-white hover:bg-blue-500/20">Home Win</SelectItem>
                  <SelectItem value="draw" className="text-white hover:bg-blue-500/20">Draw</SelectItem>
                  <SelectItem value="away" className="text-white hover:bg-blue-500/20">Away Win</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Venue</Label>
              <Input
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                placeholder="Stadium name"
                className="bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Confidence Level */}
          <div className="space-y-2">
            <Label className="text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Confidence Level: {formData.confidence}%
            </Label>
            <input
              type="range"
              min="50"
              max="100"
              value={formData.confidence}
              onChange={(e) => setFormData({ ...formData, confidence: parseInt(e.target.value) })}
              className="w-full h-2 bg-blue-500/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Win Probability</Label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-xs text-gray-400">Home Win %</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.winProbability.team1}
                  onChange={(e) => setFormData({
                    ...formData,
                    winProbability: { ...formData.winProbability, team1: parseInt(e.target.value) || 0 }
                  })}
                  className="bg-white/10 border-blue-500/30 text-white mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-400">Draw %</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.winProbability.draw}
                  onChange={(e) => setFormData({
                    ...formData,
                    winProbability: { ...formData.winProbability, draw: parseInt(e.target.value) || 0 }
                  })}
                  className="bg-white/10 border-blue-500/30 text-white mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-400">Away Win %</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.winProbability.team2}
                  onChange={(e) => setFormData({
                    ...formData,
                    winProbability: { ...formData.winProbability, team2: parseInt(e.target.value) || 0 }
                  })}
                  className="bg-white/10 border-blue-500/30 text-white mt-1"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Expert Tip</Label>
              <Input
                value={formData.expertTip}
                onChange={(e) => setFormData({ ...formData, expertTip: e.target.value })}
                placeholder="e.g., Home team to win and BTTS"
                className="bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Odds</Label>
              <Input
                value={formData.odds}
                onChange={(e) => setFormData({ ...formData, odds: e.target.value })}
                placeholder="e.g., 2.11"
                className="bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="border border-blue-500/30 rounded-lg p-4 space-y-4 bg-white/5">
            <h3 className="font-bold text-lg text-blue-400">Team Statistics</h3>
            <div className="grid grid-cols-2 gap-6">
              {/* Home Team Stats */}
              <div className="space-y-3">
                <h4 className="font-semibold text-cyan-400">Home Team</h4>
                <Input
                  placeholder="Form (W-W-D-L-L)"
                  value={formData.team1Stats.form}
                  onChange={(e) => setFormData({
                    ...formData,
                    team1Stats: { ...formData.team1Stats, form: e.target.value }
                  })}
                  className="bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400"
                />
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    type="number"
                    placeholder="Wins"
                    value={formData.team1Stats.wins}
                    onChange={(e) => setFormData({
                      ...formData,
                      team1Stats: { ...formData.team1Stats, wins: parseInt(e.target.value) || 0 }
                    })}
                    className="bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400"
                  />
                  <Input
                    type="number"
                    placeholder="Draws"
                    value={formData.team1Stats.draws}
                    onChange={(e) => setFormData({
                      ...formData,
                      team1Stats: { ...formData.team1Stats, draws: parseInt(e.target.value) || 0 }
                    })}
                    className="bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400"
                  />
                  <Input
                    type="number"
                    placeholder="Losses"
                    value={formData.team1Stats.losses}
                    onChange={(e) => setFormData({
                      ...formData,
                      team1Stats: { ...formData.team1Stats, losses: parseInt(e.target.value) || 0 }
                    })}
                    className="bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Goals For"
                    value={formData.team1Stats.goalsFor}
                    onChange={(e) => setFormData({
                      ...formData,
                      team1Stats: { ...formData.team1Stats, goalsFor: parseFloat(e.target.value) || 0 }
                    })}
                    className="bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400"
                  />
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Goals Against"
                    value={formData.team1Stats.goalsAgainst}
                    onChange={(e) => setFormData({
                      ...formData,
                      team1Stats: { ...formData.team1Stats, goalsAgainst: parseFloat(e.target.value) || 0 }
                    })}
                    className="bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Away Team Stats */}
              <div className="space-y-3">
                <h4 className="font-semibold text-purple-400">Away Team</h4>
                <Input
                  placeholder="Form (W-W-D-L-L)"
                  value={formData.team2Stats.form}
                  onChange={(e) => setFormData({
                    ...formData,
                    team2Stats: { ...formData.team2Stats, form: e.target.value }
                  })}
                  className="bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400"
                />
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    type="number"
                    placeholder="Wins"
                    value={formData.team2Stats.wins}
                    onChange={(e) => setFormData({
                      ...formData,
                      team2Stats: { ...formData.team2Stats, wins: parseInt(e.target.value) || 0 }
                    })}
                    className="bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400"
                  />
                  <Input
                    type="number"
                    placeholder="Draws"
                    value={formData.team2Stats.draws}
                    onChange={(e) => setFormData({
                      ...formData,
                      team2Stats: { ...formData.team2Stats, draws: parseInt(e.target.value) || 0 }
                    })}
                    className="bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400"
                  />
                  <Input
                    type="number"
                    placeholder="Losses"
                    value={formData.team2Stats.losses}
                    onChange={(e) => setFormData({
                      ...formData,
                      team2Stats: { ...formData.team2Stats, losses: parseInt(e.target.value) || 0 }
                    })}
                    className="bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Goals For"
                    value={formData.team2Stats.goalsFor}
                    onChange={(e) => setFormData({
                      ...formData,
                      team2Stats: { ...formData.team2Stats, goalsFor: parseFloat(e.target.value) || 0 }
                    })}
                    className="bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400"
                  />
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Goals Against"
                    value={formData.team2Stats.goalsAgainst}
                    onChange={(e) => setFormData({
                      ...formData,
                      team2Stats: { ...formData.team2Stats, goalsAgainst: parseFloat(e.target.value) || 0 }
                    })}
                    className="bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Home Team Lineup</Label>
              <Textarea
                value={formData.predictedLineups.team1}
                onChange={(e) => setFormData({
                  ...formData,
                  predictedLineups: { ...formData.predictedLineups, team1: e.target.value }
                })}
                placeholder="e.g., Ryo, Hosoi-Nduka-Iwatanake..."
                className="bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Away Team Lineup</Label>
              <Textarea
                value={formData.predictedLineups.team2}
                onChange={(e) => setFormData({
                  ...formData,
                  predictedLineups: { ...formData.predictedLineups, team2: e.target.value }
                })}
                placeholder="e.g., Takeda, Sato-Fuji-Uchida..."
                className="bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400"
                rows={3}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Home Team Recent Form</Label>
              <Textarea
                value={formData.recentForm.team1}
                onChange={(e) => setFormData({
                  ...formData,
                  recentForm: { ...formData.recentForm, team1: e.target.value }
                })}
                placeholder="Describe recent performance..."
                className="bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Away Team Recent Form</Label>
              <Textarea
                value={formData.recentForm.team2}
                onChange={(e) => setFormData({
                  ...formData,
                  recentForm: { ...formData.recentForm, team2: e.target.value }
                })}
                placeholder="Describe recent performance..."
                className="bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400"
                rows={3}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Key Stats and Trends (5 points)</Label>
            <div className="space-y-2">
              {[0, 1, 2, 3, 4].map((idx) => (
                <Input
                  key={idx}
                  value={formData.keyStats[idx]}
                  onChange={(e) => updateKeyStats(idx, e.target.value)}
                  placeholder={`Key stat ${idx + 1}`}
                  className="bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400"
                />
              ))}
            </div>
          </div>

          {/* Multi-language Tabs */}
          <Tabs defaultValue="en" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/10">
              <TabsTrigger value="en" className="data-[state=active]:bg-blue-500">English</TabsTrigger>
              <TabsTrigger value="fa" className="data-[state=active]:bg-blue-500">فارسی</TabsTrigger>
              <TabsTrigger value="ar" className="data-[state=active]:bg-blue-500">العربية</TabsTrigger>
            </TabsList>

            {["en", "fa", "ar"].map((lang) => (
              <TabsContent key={lang} value={lang} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Title ({lang.toUpperCase()})</Label>
                  <Input
                    value={formData.title[lang]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: { ...formData.title, [lang]: e.target.value },
                      })
                    }
                    placeholder="Enter prediction title"
                    className="bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400"
                    dir={lang === "fa" || lang === "ar" ? "rtl" : "ltr"}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Analysis ({lang.toUpperCase()})</Label>
                  <Textarea
                    value={formData.analysis[lang]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        analysis: { ...formData.analysis, [lang]: e.target.value },
                      })
                    }
                    placeholder="Enter your detailed match analysis and prediction reasoning"
                    className="bg-white/10 border-blue-500/30 text-white placeholder:text-gray-400 min-h-[150px]"
                    dir={lang === "fa" || lang === "ar" ? "rtl" : "ltr"}
                    required={lang === "en"}
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-gray-600 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !selectedMatch || !formData.analysis.en}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold"
            >
              {loading ? "Submitting..." : "Share Prediction"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

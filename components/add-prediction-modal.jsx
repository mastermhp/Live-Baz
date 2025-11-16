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
        status: 'live',
        time: fixture.fixture.status.elapsed ? `${fixture.fixture.status.elapsed}'` : 'LIVE'
      }))

      const upcomingMatches = (upcomingData.response || []).map(fixture => ({
        id: fixture.fixture.id.toString(),
        homeTeam: { name: fixture.teams.home.name, logo: fixture.teams.home.logo },
        awayTeam: { name: fixture.teams.away.name, logo: fixture.teams.away.logo },
        league: { name: fixture.league.name },
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
        team1: match.homeTeam?.name || "Team 1",
        team2: match.awayTeam?.name || "Team 2",
        league: match.league?.name || "League",
        predictedWinner: formData.predictedWinner,
        confidence: formData.confidence,
        analysis: formData.analysis.en,
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-gray-800 text-white border border-blue-500/30">
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

          {/* Predicted Winner */}
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

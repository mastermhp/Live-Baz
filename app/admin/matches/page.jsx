"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, RefreshCw } from 'lucide-react'
import { toast } from "sonner"

export default function MatchesManager() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState("live")
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [expandedId, setExpandedId] = useState(null)
  const [formData, setFormData] = useState({
    homeTeamId: "",
    awayTeamId: "",
    homeTeam: { name: "", logo: "" },
    awayTeam: { name: "", logo: "" },
    leagueId: "",
    league: { name: "", logo: "" },
    status: "upcoming",
    score: { home: 0, away: 0 },
    odds: { home: 1.5, draw: 3.0, away: 2.5 },
    startTime: new Date().toISOString().slice(0, 16),
    venue: "",
    referee: "",
  })

  useEffect(() => {
    fetchMatches()
    const interval = setInterval(fetchMatches, 10000) // Auto-refresh every 10 seconds
    return () => clearInterval(interval)
  }, [status])

  async function fetchMatches() {
    try {
      setLoading(true)
      const localRes = await fetch(`/api/admin/matches?status=${status}&limit=100`)
      const localData = await localRes.json()

      let allMatches = localData.matches || []

      if (status === "live") {
        try {
          const liveRes = await fetch("/api/matches/live")
          const liveData = await liveRes.json()

          if (liveData.response && Array.isArray(liveData.response)) {
            const apiMatches = liveData.response.map((match) => ({
              _id: `api-${match.fixture.id}`,
              fixtureId: match.fixture.id,
              homeTeamId: match.teams.home.id,
              awayTeamId: match.teams.away.id,
              homeTeam: {
                name: match.teams.home.name,
                logo: match.teams.home.logo,
              },
              awayTeam: {
                name: match.teams.away.name,
                logo: match.teams.away.logo,
              },
              leagueId: match.league.id,
              league: {
                name: match.league.name,
                logo: match.league.logo,
              },
              status: "live",
              score: {
                home: match.goals.home || 0,
                away: match.goals.away || 0,
              },
              odds: match.odds || { home: 1.5, draw: 3.0, away: 2.5 },
              startTime: match.fixture.timestamp * 1000,
              venue: match.fixture.venue?.name || "TBA",
              referee: match.fixture.referee || "TBA",
              isFromAPI: true,
            }))
            allMatches = [...apiMatches, ...allMatches]
          }
        } catch (err) {
          console.error("[v0] Error fetching API matches:", err)
        }
      }

      allMatches.sort((a, b) => {
        const timeA = new Date(a.startTime).getTime()
        const timeB = new Date(b.startTime).getTime()
        return timeB - timeA
      })

      setMatches(allMatches)
    } catch (error) {
      toast.error("Failed to fetch matches")
      console.error("[v0] Error fetching matches:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (formData._id?.startsWith("api-")) {
        toast.error("Cannot edit API matches. Only manually added matches can be edited.")
        return
      }

      const url = editingId ? `/api/admin/matches/${editingId}` : "/api/admin/matches"
      const method = editingId ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Failed to save match")

      toast.success(editingId ? "Match updated" : "Match created")
      setShowForm(false)
      setEditingId(null)
      resetForm()
      fetchMatches()
    } catch (error) {
      toast.error(error.message)
    }
  }

  async function handleDelete(id) {
    if (id.startsWith("api-")) {
      toast.error("Cannot delete API matches")
      return
    }
    if (!confirm("Are you sure you want to delete this match?")) return
    try {
      const res = await fetch(`/api/admin/matches/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
      toast.success("Match deleted")
      fetchMatches()
    } catch (error) {
      toast.error(error.message)
    }
  }

  function resetForm() {
    setFormData({
      homeTeamId: "",
      awayTeamId: "",
      homeTeam: { name: "", logo: "" },
      awayTeam: { name: "", logo: "" },
      leagueId: "",
      league: { name: "", logo: "" },
      status: "upcoming",
      score: { home: 0, away: 0 },
      odds: { home: 1.5, draw: 3.0, away: 2.5 },
      startTime: new Date().toISOString().slice(0, 16),
      venue: "",
      referee: "",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Matches Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            {status === "live" && "Live matches from API-Sports + manually added matches"}
            {status === "upcoming" && "Upcoming matches (manually added)"}
            {status === "finished" && "Finished matches (manually added)"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchMatches} variant="outline" className="gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button
            onClick={() => {
              setShowForm(!showForm)
              setEditingId(null)
              resetForm()
            }}
            className="bg-gradient-to-r from-blue-600 to-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Match
          </Button>
        </div>
      </div>

      {/* Match Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 animate-slide-down">
          <h2 className="text-xl font-bold mb-6">{editingId ? "Edit Match" : "Create New Match"}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Home Team Name</label>
                <input
                  type="text"
                  value={formData.homeTeam.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      homeTeam: { ...formData.homeTeam, name: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Away Team Name</label>
                <input
                  type="text"
                  value={formData.awayTeam.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      awayTeam: { ...formData.awayTeam, name: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">League Name</label>
                <input
                  type="text"
                  value={formData.league.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      league: { ...formData.league, name: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Start Time</label>
                <input
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Venue</label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Home Score</label>
                <input
                  type="number"
                  min="0"
                  value={formData.score.home}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      score: { ...formData.score, home: Number.parseInt(e.target.value) || 0 },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Away Score</label>
                <input
                  type="number"
                  min="0"
                  value={formData.score.away}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      score: { ...formData.score, away: Number.parseInt(e.target.value) || 0 },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                >
                  <option>upcoming</option>
                  <option>live</option>
                  <option>finished</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Referee</label>
                <input
                  type="text"
                  value={formData.referee}
                  onChange={(e) => setFormData({ ...formData, referee: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Home Odds</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.odds.home}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      odds: { ...formData.odds, home: Number.parseFloat(e.target.value) || 1.5 },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Draw Odds</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.odds.draw}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      odds: { ...formData.odds, draw: Number.parseFloat(e.target.value) || 3.0 },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Away Odds</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.odds.away}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      odds: { ...formData.odds, away: Number.parseFloat(e.target.value) || 2.5 },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-gradient-to-r from-green-600 to-green-700">
                {editingId ? "Update Match" : "Create Match"}
              </Button>
              <Button type="button" onClick={() => setShowForm(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Status Filter */}
      <div className="flex gap-2">
        {["live", "upcoming", "finished"].map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              status === s
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)} ({matches.filter((m) => m.status === s).length})
          </button>
        ))}
      </div>

      {/* Enhanced Matches Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading matches...</p>
          </div>
        ) : matches.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No matches found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Match</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Score</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">League</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Venue</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Source</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((match) => (
                  <tr key={match._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {match.homeTeam?.logo && (
                          <img
                            src={match.homeTeam.logo || "/placeholder.svg"}
                            alt={match.homeTeam.name}
                            className="h-6 w-6 rounded-full"
                            onError={(e) => {
                              e.target.style.display = "none"
                            }}
                          />
                        )}
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">
                            {match.homeTeam?.name || match.homeTeamId}
                          </span>
                          <span className="text-xs text-gray-500">{match.awayTeam?.name || match.awayTeamId}</span>
                        </div>
                        {match.awayTeam?.logo && (
                          <img
                            src={match.awayTeam.logo || "/placeholder.svg"}
                            alt={match.awayTeam.name}
                            className="h-6 w-6 rounded-full"
                            onError={(e) => {
                              e.target.style.display = "none"
                            }}
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-lg font-bold text-gray-900">
                        {match.score?.home || 0}-{match.score?.away || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {match.league?.logo && (
                          <img
                            src={match.league.logo || "/placeholder.svg"}
                            alt={match.league.name}
                            className="h-5 w-5 rounded-full"
                            onError={(e) => {
                              e.target.style.display = "none"
                            }}
                          />
                        )}
                        <span className="text-sm font-medium">{match.league?.name || match.leagueId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{match.venue || "TBA"}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-lg font-semibold ${
                          match.status === "live"
                            ? "bg-green-100 text-green-700"
                            : match.status === "finished"
                              ? "bg-gray-100 text-gray-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {match.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(match.startTime).toLocaleString()}</td>
                    <td className="px-6 py-4 text-xs">
                      <span
                        className={`px-2 py-1 rounded-lg font-semibold ${
                          match.isFromAPI ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {match.isFromAPI ? "API-Sports" : "Manual"}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      {!match.isFromAPI && (
                        <>
                          <button
                            onClick={() => {
                              setFormData(match)
                              setEditingId(match._id)
                              setShowForm(true)
                            }}
                            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Edit match"
                          >
                            <Edit className="h-4 w-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(match._id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete match"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </>
                      )}
                      {match.isFromAPI && <span className="text-xs text-gray-500 p-2">Read-only</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

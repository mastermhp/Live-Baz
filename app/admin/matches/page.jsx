"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, RefreshCw } from "lucide-react"
import { toast } from "sonner"

export default function MatchesManager() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState("live")
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    homeTeamId: "",
    awayTeamId: "",
    leagueId: "",
    status: "upcoming",
    score: { home: 0, away: 0 },
    odds: { home: 1.5, draw: 3.0, away: 2.5 },
    startTime: new Date().toISOString().slice(0, 16),
  })

  useEffect(() => {
    fetchMatches()
  }, [status])

  async function fetchMatches() {
    try {
      setLoading(true)
      const localRes = await fetch(`/api/admin/matches?status=${status}&limit=50`)
      const localData = await localRes.json()

      // Fetch live matches from real API
      const liveRes = await fetch("/api/matches/live")
      const liveData = liveRes.ok ? await liveRes.json() : { matches: [] }

      // Combine local admin matches with live API matches
      let allMatches = localData.matches || []
      if (liveData.matches && status === "live") {
        allMatches = [...liveData.matches, ...allMatches]
      }

      setMatches(allMatches)
    } catch (error) {
      toast.error("Failed to fetch matches")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
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
    if (!confirm("Are you sure?")) return
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
      leagueId: "",
      status: "upcoming",
      score: { home: 0, away: 0 },
      odds: { home: 1.5, draw: 3.0, away: 2.5 },
      startTime: new Date().toISOString().slice(0, 16),
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Matches Management</h1>
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
                <label className="block text-sm font-semibold mb-2">Home Team ID</label>
                <input
                  type="text"
                  value={formData.homeTeamId}
                  onChange={(e) => setFormData({ ...formData, homeTeamId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Away Team ID</label>
                <input
                  type="text"
                  value={formData.awayTeamId}
                  onChange={(e) => setFormData({ ...formData, awayTeamId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">League ID</label>
                <input
                  type="text"
                  value={formData.leagueId}
                  onChange={(e) => setFormData({ ...formData, leagueId: e.target.value })}
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
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Matches List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">Loading matches...</div>
        ) : matches.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No matches found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Match</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Score</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((match) => (
                  <tr key={match._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">
                      {match.homeTeamId} vs {match.awayTeamId}
                    </td>
                    <td className="px-6 py-4">
                      {match.score?.home || 0} - {match.score?.away || 0}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-sm rounded-lg ${
                          match.status === "live"
                            ? "bg-green-100 text-green-700"
                            : match.status === "finished"
                              ? "bg-gray-100 text-gray-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {match.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(match.startTime).toLocaleString()}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => {
                          setFormData(match)
                          setEditingId(match._id)
                          setShowForm(true)
                        }}
                        className="p-2 hover:bg-blue-100 rounded-lg"
                      >
                        <Edit className="h-4 w-4 text-blue-600" />
                      </button>
                      <button onClick={() => handleDelete(match._id)} className="p-2 hover:bg-red-100 rounded-lg">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
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

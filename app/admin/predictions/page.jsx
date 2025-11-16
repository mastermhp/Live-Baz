"use client"

import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, TrendingUp, Trophy, Eye, ThumbsUp, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AddPredictionModal from "@/components/add-prediction-modal"

export default function AdminPredictionsPage() {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    fetchPredictions()
  }, [])

  const fetchPredictions = async () => {
    try {
      const res = await fetch("/api/predictions?limit=100")
      const data = await res.json()
      setPredictions(data.predictions || [])
    } catch (error) {
      console.error("[v0] Error fetching predictions:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this prediction?")) return

    try {
      const res = await fetch(`/api/predictions/${id}`, { method: "DELETE" })
      if (res.ok) {
        alert("Prediction deleted successfully")
        fetchPredictions()
      }
    } catch (error) {
      console.error("[v0] Error deleting prediction:", error)
      alert("Failed to delete prediction")
    }
  }

  const filteredPredictions = predictions.filter(
    (p) =>
      p.team1?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.team2?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.league?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Trophy className="h-8 w-8 text-blue-600" />
              Predictions Management
            </h1>
            <p className="text-gray-500 mt-1">Manage and moderate match predictions</p>
          </div>
          <Button
            onClick={() => setModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Prediction
          </Button>
        </div>

        {/* Search */}
        <div className="mt-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search predictions..."
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Predictions</p>
              <h3 className="text-3xl font-bold mt-1">{predictions.length}</h3>
            </div>
            <Trophy className="h-12 w-12 text-blue-200 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Correct</p>
              <h3 className="text-3xl font-bold mt-1">
                {predictions.filter((p) => p.result === "correct").length}
              </h3>
            </div>
            <TrendingUp className="h-12 w-12 text-green-200 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Views</p>
              <h3 className="text-3xl font-bold mt-1">
                {predictions.reduce((acc, p) => acc + (p.views || 0), 0)}
              </h3>
            </div>
            <Eye className="h-12 w-12 text-purple-200 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Total Likes</p>
              <h3 className="text-3xl font-bold mt-1">
                {predictions.reduce((acc, p) => acc + (p.likes || 0), 0)}
              </h3>
            </div>
            <ThumbsUp className="h-12 w-12 text-orange-200 opacity-80" />
          </div>
        </div>
      </div>

      {/* Predictions Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Match
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  League
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Prediction
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Confidence
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    Loading predictions...
                  </td>
                </tr>
              ) : filteredPredictions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    No predictions found
                  </td>
                </tr>
              ) : (
                filteredPredictions.map((prediction) => (
                  <tr key={prediction._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {prediction.team1?.name || prediction.team1} vs {prediction.team2?.name || prediction.team2}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(prediction.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                        {prediction.league}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900 capitalize">
                        {prediction.predictedWinner} Win
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${prediction.confidence}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{prediction.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{prediction.author}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {prediction.views || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {prediction.likes || 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(prediction._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddPredictionModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  )
}

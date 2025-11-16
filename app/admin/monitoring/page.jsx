"use client"

import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle, AlertTriangle, Activity, Zap } from 'lucide-react'
import { useLiveMatches } from "@/hooks/use-live-updates.js"

export default function MonitoringPage() {
  const { matches, connected } = useLiveMatches()
  const [liveEvents, setLiveEvents] = useState([])
  const [systemStatus, setSystemStatus] = useState({
    database: "operational",
    api: "operational",
    websocket: connected ? "connected" : "disconnected",
    cache: "operational",
  })

  useEffect(() => {
    if (matches && Array.isArray(matches) && matches.length > 0) {
      const newEvents = matches.slice(0, 5).map((match, index) => {
        const homeTeam = match.homeTeam?.name || match.homeTeamId || "Team A"
        const awayTeam = match.awayTeam?.name || match.awayTeamId || "Team B"

        return {
          id: match.matchId || match._id || match.apiId || `match-${index}-${match.startTime}`,
          type: "match-update",
          message: `Match updated: ${homeTeam} vs ${awayTeam}`,
          timestamp: match.timestamp || match.startTime || new Date().toISOString(),
          severity: "info",
        }
      })
      
      // Only update if events actually changed to prevent infinite loop
      setLiveEvents((prevEvents) => {
        const prevIds = prevEvents.map(e => e.id).join(',')
        const newIds = newEvents.map(e => e.id).join(',')
        return prevIds !== newIds ? newEvents : prevEvents
      })
    }
  }, [matches]) // Only depends on matches

  useEffect(() => {
    setSystemStatus((prev) => ({
      ...prev,
      websocket: connected ? "connected" : "disconnected",
    }))
  }, [connected])

  const statusColors = {
    operational: "text-green-600 bg-green-100",
    disconnected: "text-red-600 bg-red-100",
    warning: "text-yellow-600 bg-yellow-100",
    error: "text-red-600 bg-red-100",
    connected: "text-green-600 bg-green-100",
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "error":
        return <AlertCircle className="h-5 w-5" />
      case "warning":
        return <AlertTriangle className="h-5 w-5" />
      default:
        return <CheckCircle className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">System Monitoring</h1>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(systemStatus).map(([key, status]) => (
          <div key={key} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 capitalize">{key}</h3>
              <Activity className={`h-5 w-5 ${statusColors[status]?.split(" ")[0] || "text-gray-400"}`} />
            </div>
            <div className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${statusColors[status]}`}>
              {status}
            </div>
          </div>
        ))}
      </div>

      {/* Live Events */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-lg font-bold mb-6 text-gray-900 flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          Live Events
        </h2>

        {liveEvents.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Waiting for live events...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {liveEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="mt-1">{getSeverityIcon(event.severity)}</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{event.message}</p>
                  <p className="text-sm text-gray-500">{new Date(event.timestamp).toLocaleTimeString()}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    event.severity === "error"
                      ? "bg-red-100 text-red-700"
                      : event.severity === "warning"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                  }`}
                >
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-lg font-bold mb-4 text-gray-900">API Performance</h2>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Response Time</span>
                <span className="text-sm font-bold text-green-600">45ms</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-600 w-1/3" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Uptime</span>
                <span className="text-sm font-bold text-green-600">99.9%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-600 w-11/12" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Requests/min</span>
                <span className="text-sm font-bold text-green-600">1,240</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 w-2/3" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-lg font-bold mb-4 text-gray-900">Database Performance</h2>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Query Time</span>
                <span className="text-sm font-bold text-green-600">12ms</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-600 w-1/4" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Connection Pool</span>
                <span className="text-sm font-bold text-green-600">8/10</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 w-4/5" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Disk Usage</span>
                <span className="text-sm font-bold text-yellow-600">72%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

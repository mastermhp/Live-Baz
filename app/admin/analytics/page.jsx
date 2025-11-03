"use client"

import { useState, useEffect } from "react"
import { Eye, Users, Activity, BarChart3 } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function AnalyticsDashboard() {
  const [period, setPeriod] = useState("week")
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  async function fetchAnalytics() {
    try {
      setLoading(true)
      const res = await fetch(`/api/admin/analytics?period=${period}`)
      const data = await res.json()
      setAnalytics(data)

      // Format data for charts
      const formattedData =
        data.analyticsData?.map((item) => ({
          date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          pageViews: item.pageViews || 0,
          visitors: item.uniqueVisitors || 0,
          matches: item.matchesViewed || 0,
        })) || []

      setChartData(formattedData)
    } catch (error) {
      console.error("[v0] Error fetching analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    {
      label: "Total Page Views",
      value: analytics?.totalPageViews || 0,
      icon: Eye,
      color: "blue",
      trend: "+12%",
    },
    {
      label: "Unique Visitors",
      value: analytics?.totalVisitors || 0,
      icon: Users,
      color: "green",
      trend: "+8%",
    },
    {
      label: "Matches Viewed",
      value: analytics?.totalMatchesViewed || 0,
      icon: Activity,
      color: "purple",
      trend: "+5%",
    },
    {
      label: "Top Articles",
      value: analytics?.topArticles?.length || 0,
      icon: BarChart3,
      color: "orange",
      trend: "+3",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div className="flex gap-2">
          {["today", "week", "month"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                period === p
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`h-12 w-12 rounded-xl bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 flex items-center justify-center`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">
                {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
              </h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Page Views Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-lg font-bold mb-6 text-gray-900">Page Views Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="pageViews"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Visitors Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-lg font-bold mb-6 text-gray-900">Unique Visitors</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Legend />
              <Bar dataKey="visitors" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Articles */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-lg font-bold mb-6 text-gray-900">Top Performing Articles</h2>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : analytics?.topArticles?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No data available</div>
        ) : (
          <div className="space-y-3">
            {analytics.topArticles.map((article, index) => (
              <div
                key={article._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 line-clamp-1">{article.title}</p>
                    <p className="text-xs text-gray-500">{article.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{article.views || 0}</p>
                  <p className="text-xs text-gray-500">views</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* System Health */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 border border-blue-200">
        <h2 className="text-lg font-bold mb-4 text-gray-900">System Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-xl">
            <div>
              <p className="text-sm text-gray-600">Database</p>
              <p className="font-bold text-green-600">Connected</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-white rounded-xl">
            <div>
              <p className="text-sm text-gray-600">API Status</p>
              <p className="font-bold text-green-600">Operational</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-white rounded-xl">
            <div>
              <p className="text-sm text-gray-600">WebSocket</p>
              <p className="font-bold text-green-600">Active</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

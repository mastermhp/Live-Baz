"use client"

import { useState } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  FileText,
  Trophy,
  Settings,
  BarChart3,
  Globe,
  Radio,
  LogOut,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  Activity,
  Calendar,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Demo data
  const stats = [
    { label: "Total Articles", value: "248", change: "+12%", icon: FileText, color: "blue" },
    { label: "Live Matches", value: "15", change: "Active", icon: Radio, color: "green" },
    { label: "Total Teams", value: "156", change: "+8", icon: Trophy, color: "purple" },
    { label: "Page Views", value: "45.2K", change: "+23%", icon: TrendingUp, color: "orange" },
  ]

  const recentArticles = [
    {
      id: 1,
      title: "Manchester City vs Liverpool Tactical Analysis",
      status: "Published",
      views: "2.4K",
      date: "2 hours ago",
    },
    { id: 2, title: "Real Madrid's Winning Strategy", status: "Draft", views: "0", date: "5 hours ago" },
    { id: 3, title: "Premier League Top Scorers Analysis", status: "Published", views: "1.8K", date: "1 day ago" },
  ]

  const liveMatches = [
    { id: 1, home: "Barcelona", away: "Real Madrid", score: "2-1", time: "67'", league: "La Liga" },
    { id: 2, home: "Man City", away: "Arsenal", score: "1-1", time: "45'", league: "Premier League" },
    { id: 3, home: "Bayern", away: "Dortmund", score: "3-2", time: "82'", league: "Bundesliga" },
  ]

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "articles", label: "Articles", icon: FileText },
    { id: "matches", label: "Matches", icon: Activity },
    { id: "teams", label: "Teams & Leagues", icon: Trophy },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "translations", label: "Translations", icon: Globe },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full w-64 bg-white border-r border-gray-200 shadow-xl flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-green-500 flex items-center justify-center">
                  <LayoutDashboard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Admin Panel</h2>
                  <p className="text-xs text-gray-500">LIVEBAZ</p>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-green-500 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@livebaz.com</p>
              </div>
              <Link href="/signin">
                <LogOut className="h-5 w-5 text-gray-400 hover:text-red-600 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : ""}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
                <Menu className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold gradient-text-animated">
                  {menuItems.find((item) => item.id === activeTab)?.label}
                </h1>
                <p className="text-sm text-gray-500">Manage your sports platform</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all text-sm w-64"
                />
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                New Article
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-fade-in">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up stagger-item"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`h-12 w-12 rounded-xl bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 flex items-center justify-center shadow-lg`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                          {stat.change}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  )
                })}
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Articles */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-slide-up">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Recent Articles</h2>
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {recentArticles.map((article) => (
                      <div
                        key={article.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{article.title}</h3>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span
                              className={`px-2 py-1 rounded-lg ${article.status === "Published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                            >
                              {article.status}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {article.views}
                            </span>
                            <span>{article.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-white rounded-lg transition-colors">
                            <Edit className="h-4 w-4 text-blue-600" />
                          </button>
                          <button className="p-2 hover:bg-white rounded-lg transition-colors">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Matches */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-slide-up animation-delay-200">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse-live" />
                      Live Matches
                    </h2>
                    <Button variant="ghost" size="sm">
                      Manage
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {liveMatches.map((match) => (
                      <div
                        key={match.id}
                        className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-gray-600">{match.league}</span>
                          <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-lg">
                            {match.time}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900">{match.home}</span>
                          <span className="text-xl font-bold text-blue-600">{match.score}</span>
                          <span className="font-semibold text-gray-900">{match.away}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 shadow-2xl text-white animate-slide-up animation-delay-400">
                <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-lg border border-white/30 text-white h-auto py-4">
                    <FileText className="h-5 w-5 mr-2" />
                    Create Article
                  </Button>
                  <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-lg border border-white/30 text-white h-auto py-4">
                    <Trophy className="h-5 w-5 mr-2" />
                    Add Team
                  </Button>
                  <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-lg border border-white/30 text-white h-auto py-4">
                    <Calendar className="h-5 w-5 mr-2" />
                    Schedule Match
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs content placeholder */}
          {activeTab !== "dashboard" && (
            <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center animate-fade-in">
              <div className="max-w-md mx-auto">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center mx-auto mb-6">
                  {menuItems.find((item) => item.id === activeTab)?.icon && (
                    <div className="text-white">
                      {(() => {
                        const Icon = menuItems.find((item) => item.id === activeTab)?.icon
                        return Icon ? <Icon className="h-10 w-10" /> : null
                      })()}
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {menuItems.find((item) => item.id === activeTab)?.label} Section
                </h2>
                <p className="text-gray-600 mb-6">
                  This section will contain all the tools to manage{" "}
                  {menuItems.find((item) => item.id === activeTab)?.label.toLowerCase()}. Full functionality coming
                  soon!
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useUserAuth } from "@/lib/hooks/use-user-auth"
import { Mail, LogOut, User, Activity, ArrowRight, Calendar, Eye, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

export default function UserProfilePage() {
  const router = useRouter()
  const { user, loading, authenticated, logout, trackActivity } = useUserAuth()
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/signin")
    }
  }, [loading, authenticated, router])

  useEffect(() => {
    if (user?.id) {
      fetchUserStats()
      trackActivity("profile_view", { userId: user.id })
    }
  }, [user])

  const fetchUserStats = async () => {
    try {
      const res = await fetch(`/api/user/stats/${user?.id}`)
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-gray-400">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Profile Header Card */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white mb-8 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                  <User className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">{user.name || "User"}</h1>
                  <p className="flex items-center gap-2 text-blue-100">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </p>
                  <p className="text-sm text-blue-200 mt-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-xl px-6 py-2 transition-all duration-300"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <Eye className="h-8 w-8 text-blue-400" />
                  <span className="text-green-400 text-sm font-semibold">+12%</span>
                </div>
                <p className="text-gray-400 text-sm mb-1">Page Views</p>
                <p className="text-3xl font-bold text-white">{stats.pageViews || 0}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-green-500/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="h-8 w-8 text-green-400" />
                  <span className="text-green-400 text-sm font-semibold">+8%</span>
                </div>
                <p className="text-gray-400 text-sm mb-1">Activities</p>
                <p className="text-3xl font-bold text-white">{stats.totalActivities || 0}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-400" />
                  <span className="text-green-400 text-sm font-semibold">+5%</span>
                </div>
                <p className="text-gray-400 text-sm mb-1">Articles Read</p>
                <p className="text-3xl font-bold text-white">{stats.articlesRead || 0}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-pink-500/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <User className="h-8 w-8 text-pink-400" />
                  <span className="text-green-400 text-sm font-semibold">Active</span>
                </div>
                <p className="text-gray-400 text-sm mb-1">Account Status</p>
                <p className="text-3xl font-bold text-white">Active</p>
              </div>
            </div>
          )}

          {/* Recent Activities */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Activities</h2>
            {stats?.recentActivities && stats.recentActivities.length > 0 ? (
              <div className="space-y-3">
                {stats.recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/10"
                  >
                    <div>
                      <p className="text-white font-medium capitalize">{activity.activityType}</p>
                      <p className="text-gray-400 text-sm">{new Date(activity.timestamp).toLocaleDateString()}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-blue-400" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No activities yet. Start exploring!</p>
            )}
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/live">
              <Button className="w-full h-16 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3">
                <Eye className="h-5 w-5" />
                View Live Matches
              </Button>
            </Link>
            <Link href="/blog">
              <Button className="w-full h-16 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3">
                <Activity className="h-5 w-5" />
                Read Analysis & News
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

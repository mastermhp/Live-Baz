"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { useUserAuth } from "@/lib/hooks/use-user-auth"
import { Mail, LogOut, User, Activity, ArrowRight, Calendar, Eye, TrendingUp, Trophy, Heart, BookOpen, Settings, Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { motion } from "framer-motion"

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
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Hero Profile Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 pt-24 pb-32">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md flex items-center justify-center border-4 border-white/50 shadow-2xl">
                  <User className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-green-500 border-4 border-white flex items-center justify-center">
                  <span className="text-xs font-bold text-white">✓</span>
                </div>
              </motion.div>

              <div className="flex-1 text-center md:text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl font-extrabold text-white mb-3"
                >
                  {user.name || "User"}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center md:justify-start gap-2 text-white/90 text-lg mb-2"
                >
                  <Mail className="h-5 w-5" />
                  {user.email}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-center md:justify-start gap-2 text-white/80 mb-6"
                >
                  <Calendar className="h-4 w-4" />
                  Member since {new Date(user.createdAt || Date.now()).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-3 justify-center md:justify-start"
                >
                  <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-xl px-6">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button
                    onClick={handleLogout}
                    className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold rounded-xl px-6 border border-white/30"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Eye, label: "Page Views", value: stats?.pageViews || 0, color: "blue", trend: "+12%" },
              { icon: Activity, label: "Activities", value: stats?.totalActivities || 0, color: "green", trend: "+8%" },
              { icon: BookOpen, label: "Articles Read", value: stats?.articlesRead || 0, color: "purple", trend: "+5%" },
              { icon: Trophy, label: "Predictions", value: stats?.predictions || 0, color: "yellow", trend: "New" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={`h-10 w-10 text-${stat.color}-400`} />
                    <span className="text-green-400 text-sm font-semibold bg-green-400/10 px-3 py-1 rounded-full">
                      {stat.trend}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                  <p className="text-4xl font-bold text-white">{stat.value}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-1 rounded-xl mb-8">
              <TabsTrigger value="activity" className="data-[state=active]:bg-blue-600 rounded-lg text-white">
                <Activity className="h-4 w-4 mr-2" />
                Recent Activity
              </TabsTrigger>
              <TabsTrigger value="favorites" className="data-[state=active]:bg-blue-600 rounded-lg text-white">
                <Heart className="h-4 w-4 mr-2" />
                Favorites
              </TabsTrigger>
              <TabsTrigger value="predictions" className="data-[state=active]:bg-blue-600 rounded-lg text-white">
                <Trophy className="h-4 w-4 mr-2" />
                My Predictions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="activity">
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 p-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Activity className="h-6 w-6 text-blue-400" />
                  Recent Activities
                </h3>
                {stats?.recentActivities && stats.recentActivities.length > 0 ? (
                  <div className="space-y-3">
                    {stats.recentActivities.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-all duration-300 border border-gray-600/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Activity className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium capitalize">{activity.activityType.replace("_", " ")}</p>
                            <p className="text-gray-400 text-sm">
                              {new Date(activity.timestamp).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400" />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Activity className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">No activities yet</p>
                    <p className="text-gray-500 text-sm mt-2">Start exploring to see your activity here</p>
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="favorites">
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 p-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Heart className="h-6 w-6 text-pink-400" />
                  Favorite Articles
                </h3>
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No favorites yet</p>
                  <p className="text-gray-500 text-sm mt-2">Save articles you love to access them easily</p>
                  <Link href="/blog">
                    <Button className="mt-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                      Browse Articles
                    </Button>
                  </Link>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="predictions">
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 p-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Trophy className="h-6 w-6 text-yellow-400" />
                  My Predictions
                </h3>
                <div className="text-center py-12">
                  <Trophy className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No predictions yet</p>
                  <p className="text-gray-500 text-sm mt-2">Share your match predictions with the community</p>
                  <Link href="/">
                    <Button className="mt-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                      Make a Prediction
                    </Button>
                  </Link>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Quick Actions */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/live">
              <Card className="bg-gradient-to-br from-green-600 to-emerald-700 border-0 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                <Eye className="h-12 w-12 text-white mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Live Matches</h4>
                <p className="text-green-100 text-sm">Watch live scores and updates</p>
              </Card>
            </Link>
            <Link href="/blog">
              <Card className="bg-gradient-to-br from-purple-600 to-pink-700 border-0 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                <BookOpen className="h-12 w-12 text-white mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Read Analysis</h4>
                <p className="text-purple-100 text-sm">Expert insights and predictions</p>
              </Card>
            </Link>
            <Link href="/teams">
              <Card className="bg-gradient-to-br from-blue-600 to-cyan-700 border-0 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                <Trophy className="h-12 w-12 text-white mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Browse Teams</h4>
                <p className="text-blue-100 text-sm">Explore teams and statistics</p>
              </Card>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

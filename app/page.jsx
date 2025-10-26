"use client"
import Header from "@/components/header"
import Footer from "@/components/footer"
import PredictionsSection from "@/components/predictions-section"
import LiveScoresSection from "@/components/live-scores-section"
import MatchCard from "@/components/match-card"
import { demoMatches, demoArticles } from "@/lib/demo-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLeagues } from "@/hooks/use-leagues"

import { ArrowRight, TrendingUp, Newspaper, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function HomePage() {
  const { leagues, loading: leaguesLoading } = useLeagues()
  const liveMatches = demoMatches.filter((m) => m.status === "live")
  const upcomingMatches = demoMatches.filter((m) => m.status === "upcoming")

  const displayLeagues = leagues.length > 0 ? leagues : []

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Sidebar - Top Leagues */}
          <aside className="lg:col-span-1">
            <Card className="p-2 sticky top-20 md:top-24 animate-fade-in overflow-hidden border border-gradient-to-r from-blue-500/80 to-cyan-500/60  shadow-xl hover:shadow-2xl transition-all duration-500">
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/80 rounded-full blur-3xl animate-pulse-subtle" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/70 rounded-full blur-2xl animate-pulse-subtle animation-delay-400" />

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <div className="flex items-center gap-1 mb-6">
                  <div className="h-1 w-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                  <div className="h-2 w-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                  <h3 className="text-xl md:text-2xl font-bold text-foreground px-4">Top Leagues</h3>
                </div>

                <div className="space-y-1 border-1 border-blue-200/50 rounded-xl p-1 md:p-1 backdrop-blur-sm max-h-96 md:max-h-none overflow-y-auto">
                  {leaguesLoading ? (
                    <div className="text-center py-4 text-gray-500 text-sm">Loading leagues...</div>
                  ) : displayLeagues.length > 0 ? (
                    displayLeagues.map((league, index) => (
                      <motion.button
                        key={league.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        whileHover={{ x: 8, scale: 1.01 }}
                        className="w-full text-left px-3 md:px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 ease-out text-xs text-foreground hover:text-blue-600 font-medium border border-transparent hover:border-blue-300/50 group flex items-center gap-2"
                      >
                        {league.flag && (
                          <img
                            src={league.flag || "/placeholder.svg"}
                            alt={league.country}
                            className="w-4 h-3 rounded object-cover"
                          />
                        )}
                        <span className="group-hover:font-semibold transition-all truncate">{league.name}</span>
                      </motion.button>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500 text-sm">No leagues available</div>
                  )}
                </div>

                <Link href="/leagues">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-2 px-4 py-2 md:py-2 border-1 border-blue-500 text-blue-600 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 ease-out text-sm md:text-base"
                  >
                    All leagues
                  </motion.button>
                </Link>
              </motion.div>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6 md:space-y-8">
            <LiveScoresSection />
            {/* Live Matches Section */}

            {/* Upcoming Matches Section */}
            <section className="mb-12 md:mb-16">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 animate-slide-up gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <TrendingUp className="h-6 md:h-8 w-6 md:w-8 text-blue-600" />
                    <div className="absolute inset-0 h-6 md:h-8 w-6 md:w-8 bg-blue-500 rounded-full blur-xl opacity-30" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Upcoming Matches</h2>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">Get ahead with AI predictions</p>
                  </div>
                </div>
                <Link href="/matches">
                  <Button
                    variant="outline"
                    className="gap-2 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 bg-transparent text-sm md:text-base"
                  >
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {upcomingMatches.map((match, index) => (
                  <div
                    key={match.id}
                    className="stagger-item animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <MatchCard match={match} />
                  </div>
                ))}
              </div>
            </section>

            {/* Expert Analysis Section */}
            <section className="">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 animate-slide-up gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Newspaper className="h-6 md:h-8 w-6 md:w-8 text-blue-600" />
                    <div className="absolute inset-0 h-6 md:h-8 w-6 md:w-8 bg-blue-500 rounded-full blur-xl opacity-30" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Expert Analysis</h2>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">Insights from professional analysts</p>
                  </div>
                </div>
                <Link href="/blog">
                  <Button
                    variant="outline"
                    className="gap-2 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 bg-transparent text-sm md:text-base"
                  >
                    View All Articles
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {demoArticles.map((article, index) => (
                  <Link key={article.id} href={`/blog/${article.id}`}>
                    <Card
                      className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full border-2 border-gray-100 hover:border-blue-300 group animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-blue-100 to-green-100">
                        <img
                          src={
                            article.image ||
                            "/placeholder.svg?height=300&width=400&query=football analysis" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg"
                          }
                          alt={article.title}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-4 md:p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                            {article.category}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            {article.readTime}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg md:text-xl mb-3 line-clamp-2 text-balance text-gray-900 group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                          <span className="font-medium">{article.author}</span>
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* <HeroSection /> */}
      <PredictionsSection />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <section className="py-12 md:py-16 animate-fade-in">
          <Card className="relative h-96 md:h-[500px] overflow-hidden border-0 shadow-2xl">
            {/* Gradient background with low opacity */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/90 to-black/80 opacity-90" />

            {/* Image layer between gradient and content */}
            <img
              src="/cta.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
            />

            {/* Animated floating elements */}
            <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-white/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 left-0 w-48 md:w-80 h-48 md:h-80 bg-green-500/20 rounded-full blur-3xl animate-float-delayed" />

            {/* Foreground content */}
            <div className="relative z-10 p-6 md:p-12 lg:p-16 text-center flex flex-col justify-center h-full">
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-white/25 text-black/50 text-xs md:text-sm font-semibold mb-4 md:mb-6 animate-bounce-subtle backdrop-blur-md w-fit mx-auto">
                <Sparkles className="h-3 md:h-4 w-3 md:w-4 text-blue-200" />
                Join 1M+ Sports Fans
              </div>

              {/* Gradient Headline */}
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-black/10 via-blue-600 to-green-700 drop-shadow-[0_0_10px_rgba(0,0,0,0.4)]">
                Never Miss a Match Again
              </h2>

              <p className="text-sm md:text-lg lg:text-xl text-gray-400 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                Create your free account to get personalized match notifications, follow your favorite teams, and access
                exclusive expert analysis and predictions.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-200 font-bold px-8 md:px-10 h-10 md:h-11 rounded-lg md:rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-sm md:text-base"
                >
                  Get Started Free
                  <ArrowRight className="h-4 md:h-5 w-4 md:w-5 ml-1" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-1 border-white text-white hover:bg-white/10 font-semibold px-6 md:px-8 h-10 md:h-11 rounded-lg md:rounded-xl bg-transparent text-sm md:text-base"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}

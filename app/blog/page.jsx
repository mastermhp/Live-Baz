"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, TrendingUp, ArrowRight, Search } from 'lucide-react'
import { motion } from "framer-motion"
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function BlogPage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { value: "all", label: "All Articles" },
    { value: "analysis", label: "Analysis" },
    { value: "news", label: "News" },
    { value: "prediction", label: "Predictions" },
    { value: "tutorial", label: "Tutorials" },
    { value: "feature", label: "Features" },
  ]

  useEffect(() => {
    fetchArticles()
  }, [selectedCategory])

  async function fetchArticles() {
    try {
      setLoading(true)
      const url = selectedCategory === "all" 
        ? "/api/public/articles" 
        : `/api/public/articles?category=${selectedCategory}`
      
      console.log("[v0] Fetching articles from:", url)
      const res = await fetch(url)
      const data = await res.json()
      console.log("[v0] Articles fetched:", data)
      setArticles(data.articles || [])
    } catch (error) {
      console.error("[v0] Error fetching articles:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredArticles = articles.filter((article) =>
    article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const featuredArticle = filteredArticles.find(a => a.featured) || filteredArticles[0]
  const regularArticles = filteredArticles.filter(a => a !== featuredArticle)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-emerald-50">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500 py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
            className="inline-block mb-6"
          >
            <TrendingUp className="h-16 w-16 text-white drop-shadow-lg" />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            Football Analysis & Insights
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Expert analysis, match predictions, and in-depth tactical breakdowns from our team of football analysts
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 rounded-2xl bg-white/95 backdrop-blur-md border-0 focus:ring-2 focus:ring-white/50 transition-all text-gray-700 text-lg shadow-xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category.value
                    ? "bg-gradient-to-r from-blue-500 to-emerald-400 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent" />
            <p className="mt-4 text-gray-600">Loading articles...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No articles found. Check back soon for new content!</p>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featuredArticle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <Link href={`/blog/${featuredArticle._id}`}>
                  <Card className="overflow-hidden rounded-3xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group cursor-pointer">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="relative h-80 md:h-auto overflow-hidden">
                        <img
                          src={featuredArticle.image || "/placeholder.svg?height=600&width=800"}
                          alt={featuredArticle.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-gradient-to-r from-blue-500 to-emerald-400 text-white border-0 px-4 py-2 text-sm font-bold shadow-lg">
                            FEATURED
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-blue-50">
                        <Badge className="bg-blue-100 text-blue-700 border-0 w-fit mb-4">
                          {featuredArticle.category}
                        </Badge>
                        
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                          {featuredArticle.title}
                        </h2>
                        
                        <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                          {featuredArticle.excerpt}
                        </p>

                        <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{featuredArticle.author || "Admin"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(featuredArticle.publishedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{featuredArticle.readingTime || 5} min read</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">
                          Read Full Article
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            )}

            {/* Regular Articles Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {regularArticles.map((article, index) => (
                <motion.div
                  key={article._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <Link href={`/blog/${article._id}`}>
                    <Card className="h-full overflow-hidden rounded-2xl border border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.image || "/placeholder.svg?height=300&width=400"}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-white/90 text-gray-800 border-0 backdrop-blur-sm">
                            {article.category}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            <span>{article.readingTime || 5} min</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}

import Header from "@/components/header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import Footer from "@/components/footer"

async function getArticles() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/admin/articles?limit=100`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error("Failed to fetch articles")
    const data = await res.json()
    return data.articles || []
  } catch (error) {
    console.error("[v0] Error fetching articles:", error)
    return []
  }
}

export default async function BlogPage() {
  const articles = await getArticles()
  const categories = ["All", "Analysis", "Preview", "Features", "News"]

  const featuredArticle = articles.length > 0 ? articles[0] : null
  const restArticles = articles.length > 1 ? articles.slice(1) : []

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Analysis & News</h1>
          <p className="text-lg text-muted-foreground">
            Expert insights, match previews, and in-depth analysis from our team of football analysts.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <Link href={`/blog/${featuredArticle._id}`}>
            <Card className="mb-8 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-video md:aspect-auto relative overflow-hidden bg-muted">
                  <img
                    src={featuredArticle.image || "/placeholder.svg?height=400&width=600&query=football analysis"}
                    alt={featuredArticle.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <Badge variant="default" className="w-fit mb-3 bg-primary">
                    Featured
                  </Badge>
                  <h2 className="text-3xl font-bold mb-4 text-balance">{featuredArticle.title}</h2>
                  <p className="text-muted-foreground mb-4">{featuredArticle.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredArticle.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />5 min read
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restArticles.map((article) => (
            <Link key={article._id} href={`/blog/${article._id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer h-full animate-fade-in">
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={article.image || "/placeholder.svg?height=300&width=400&query=football analysis"}
                    alt={article.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">5 min</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 text-balance">{article.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                    <span className="font-medium">{article.author || "Admin"}</span>
                    <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No articles found yet. Check back soon!</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

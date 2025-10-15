import Header from "@/components/header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { demoArticles } from "@/lib/demo-data"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"

export default function BlogPage() {
  const categories = ["All", "Analysis", "Preview", "Features", "News"]

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
        <Link href="/blog/1">
          <Card className="mb-8 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-video md:aspect-auto relative overflow-hidden bg-muted">
                <img src="/football-match-analysis-featured.jpg" alt="Featured article" className="object-cover w-full h-full" />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <Badge variant="default" className="w-fit mb-3 bg-primary">
                  Featured
                </Badge>
                <h2 className="text-3xl font-bold mb-4 text-balance">
                  Manchester City vs Liverpool: Tactical Analysis
                </h2>
                <p className="text-muted-foreground mb-4">
                  A deep dive into the tactical battle between two Premier League giants. How Guardiola's system matches
                  up against Klopp's high press and what we can expect from this clash.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Jan 15, 2024
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />5 min read
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Link>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoArticles.map((article) => (
            <Link key={article.id} href={`/blog/${article.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer h-full animate-fade-in">
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 text-balance">{article.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                    <span className="font-medium">{article.author}</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}

          {/* Duplicate articles for demo */}
          {demoArticles.map((article) => (
            <Link key={`dup-${article.id}`} href={`/blog/${article.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer h-full animate-fade-in">
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 text-balance">{article.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                    <span className="font-medium">{article.author}</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

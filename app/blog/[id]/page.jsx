import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, Share2, Bookmark, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

async function getArticle(id) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/admin/articles/${id}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error("Article not found")
    return await res.json()
  } catch (error) {
    console.error("[v0] Error fetching article:", error)
    return null
  }
}

async function getRelatedArticles(category) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/admin/articles?category=${category}&limit=3`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error("Failed to fetch articles")
    return await res.json().then((d) => d.articles || [])
  } catch (error) {
    console.error("[v0] Error fetching related articles:", error)
    return []
  }
}

export async function generateMetadata({ params }) {
  const article = await getArticle(params.id)

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The article you're looking for doesn't exist.",
    }
  }

  const seo = article.seo || {}
  return {
    title: seo.metaTitle || article.title,
    description: seo.metaDescription || article.excerpt,
    keywords: seo.keywords || [article.category],
    openGraph: {
      title: seo.metaTitle || article.title,
      description: seo.metaDescription || article.excerpt,
      image: article.image || "/placeholder.svg",
    },
  }
}

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.id)

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-lg text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/blog">
              <Button className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Articles
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const relatedArticles = await getRelatedArticles(article.category)
  const otherArticles = relatedArticles.filter((a) => a._id !== article._id).slice(0, 2)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/blog">
            <Button variant="ghost" className="mb-8 gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Articles
            </Button>
          </Link>

          {/* Article Header */}
          <div className="mb-8 animate-slide-up">
            <Badge variant="default" className="mb-4 bg-primary">
              {article.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{article.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{article.excerpt}</p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{article.author || "Admin"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>5 min read</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Bookmark className="h-4 w-4" />
                Save
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          {article.image && (
            <div className="aspect-video relative overflow-hidden rounded-lg bg-muted mb-8 animate-fade-in">
              <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
            </div>
          )}

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: article.content || "" }}
          />

          {/* Related Articles */}
          {otherArticles.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6">More {article.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherArticles.map((relArticle) => (
                  <Link key={relArticle._id} href={`/blog/${relArticle._id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <div className="aspect-video relative overflow-hidden bg-muted">
                        <Image
                          src={relArticle.image || "/placeholder.svg?height=300&width=500"}
                          alt={relArticle.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <Badge variant="outline" className="mb-2 text-xs">
                          {relArticle.category}
                        </Badge>
                        <h4 className="font-bold mb-2 line-clamp-2">{relArticle.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{relArticle.excerpt}</p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

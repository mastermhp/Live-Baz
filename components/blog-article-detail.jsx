"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  User,
  Calendar,
  Clock,
  Eye,
  Share2,
  Bookmark,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
} from "lucide-react"
import { toast } from "sonner"
import LanguageSwitcher from "@/components/language-switcher"
import { LANGUAGES, getTranslation } from "@/lib/i18n"

export default function BlogArticleDetail({ article, relatedArticles = [], initialLang = "en" }) {
  const [bookmarked, setBookmarked] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [currentLang, setCurrentLang] = useState(initialLang)

  useEffect(() => {
    const dir = LANGUAGES[currentLang]?.dir || "ltr"
    document.documentElement.dir = dir
  }, [currentLang])

  const displayArticle = article.translations?.[currentLang]
    ? { ...article, ...article.translations[currentLang] }
    : article

  const otherArticles = relatedArticles.filter((a) => a._id !== article._id).slice(0, 3)

  const handleCopyLink = () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    navigator.clipboard.writeText(url)
    setCopied(true)
    toast.success(getTranslation(currentLang, "linkCopied"))
    setTimeout(() => setCopied(false), 2000)
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    toast.success(getTranslation(currentLang, bookmarked ? "tagsRemoved" : "tagsSaved"))
  }

  const t = (key) => getTranslation(currentLang, key)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${typeof window !== "undefined" ? window.location.href : ""}`,
    twitter: `https://twitter.com/intent/tweet?url=${typeof window !== "undefined" ? window.location.href : ""}&text=${displayArticle.title}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== "undefined" ? window.location.href : ""}`,
  }

  return (
    <>
      <main
        className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30"
        dir={LANGUAGES[currentLang]?.dir}
      >
        {/* Language Switcher in Header */}
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-end">
          <LanguageSwitcher currentLang={currentLang} onLanguageChange={setCurrentLang} />
        </div>

        {/* Featured image with gradient overlay */}
        {displayArticle.image && (
          <div className="relative h-[300px] md:h-[500px] lg:h-[600px] rounded-b-2xl overflow-hidden group">
            <Image
              src={displayArticle.image || "/placeholder.svg"}
              alt={displayArticle.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-12 text-white">
              <div className="max-w-4xl mx-auto w-full">
                <Badge className="mb-4 bg-primary/90 backdrop-blur-sm">{displayArticle.category}</Badge>
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 text-balance drop-shadow-lg">
                  {displayArticle.title}
                </h1>
                <p className="text-base md:text-lg text-gray-100 max-w-2xl drop-shadow-lg">{displayArticle.excerpt}</p>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          {/* Back Button */}
          <Link href="/blog">
            <Button variant="ghost" className="mb-8 gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              {t("backToArticles")}
            </Button>
          </Link>

          {!displayArticle.image && (
            <div className="mb-8 animate-slide-up">
              <Badge variant="default" className="mb-4 bg-primary">
                {displayArticle.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{displayArticle.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{displayArticle.excerpt}</p>
            </div>
          )}

          <Card className="mb-8 p-6 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">{t("author")}</p>
                  <p className="font-semibold text-sm text-foreground">{displayArticle.author || "Admin"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">{t("published")}</p>
                  <p className="font-semibold text-sm text-foreground">
                    {new Date(displayArticle.publishedAt || displayArticle.createdAt).toLocaleDateString(
                      currentLang === "fa" ? "fa-IR" : currentLang === "ar" ? "ar-EG" : "en-US",
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">{t("readingTime")}</p>
                  <p className="font-semibold text-sm text-foreground">
                    {displayArticle.readingTime || 5} {t("min")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">{t("views")}</p>
                  <p className="font-semibold text-sm text-foreground">{displayArticle.views || 0}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* ... existing sharing buttons ... */}
          <div className="flex gap-2 flex-wrap mb-8">
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
                onClick={() => setShowShareMenu(!showShareMenu)}
              >
                <Share2 className="h-4 w-4" />
                {t("share")}
              </Button>
              {showShareMenu && (
                <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg p-2 animate-slide-down z-10 flex gap-1">
                  <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-muted rounded transition-colors"
                  >
                    <Facebook className="h-4 w-4 text-blue-600" />
                  </a>
                  <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-muted rounded transition-colors"
                  >
                    <Twitter className="h-4 w-4 text-blue-400" />
                  </a>
                  <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-muted rounded transition-colors"
                  >
                    <Linkedin className="h-4 w-4 text-blue-700" />
                  </a>
                  <button onClick={handleCopyLink} className="p-2 hover:bg-muted rounded transition-colors">
                    {copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              )}
            </div>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleBookmark}>
              <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-primary text-primary" : ""}`} />
              {t("save")}
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <MessageCircle className="h-4 w-4" />
              {t("comments")}
            </Button>
          </div>

          {displayArticle.gameAnalysis &&
            (displayArticle.gameAnalysis.homeTeam || displayArticle.gameAnalysis.awayTeam) && (
              <Card className="mb-12 p-6 md:p-8 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border border-primary/20 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6 text-balance">{t("gameAnalysis") || "Match Analysis"}</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {/* Home Team */}
                  <div className="bg-card/60 backdrop-blur-sm p-4 rounded-xl border border-border/50 text-center">
                    <h3 className="font-bold text-lg mb-2">{displayArticle.gameAnalysis.homeTeam || "Home Team"}</h3>
                    <div className="text-sm text-muted-foreground">Home</div>
                  </div>

                  {/* VS Badge */}
                  <div className="flex items-center justify-center">
                    <div className="bg-primary/10 px-6 py-4 rounded-full text-center border border-primary/20">
                      <div className="text-xs font-semibold text-primary mb-1">PREDICTION</div>
                      <div className="text-2xl font-bold text-foreground">
                        {displayArticle.gameAnalysis.predictedWinner === "home"
                          ? "1"
                          : displayArticle.gameAnalysis.predictedWinner === "draw"
                            ? "X"
                            : "2"}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {displayArticle.gameAnalysis.confidence}% Confidence
                      </div>
                    </div>
                  </div>

                  {/* Away Team */}
                  <div className="bg-card/60 backdrop-blur-sm p-4 rounded-xl border border-border/50 text-center">
                    <h3 className="font-bold text-lg mb-2">{displayArticle.gameAnalysis.awayTeam || "Away Team"}</h3>
                    <div className="text-sm text-muted-foreground">Away</div>
                  </div>
                </div>

                {/* Confidence Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">{t("confidence") || "Prediction Confidence"}</span>
                    <span className="text-sm font-bold text-primary">{displayArticle.gameAnalysis.confidence}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-500"
                      style={{ width: `${displayArticle.gameAnalysis.confidence}%` }}
                    />
                  </div>
                </div>

                {/* Key Players */}
                {displayArticle.gameAnalysis.keyPlayers && (
                  <div className="mb-6 p-4 bg-card rounded-xl border border-border/50">
                    <h4 className="font-semibold mb-2 text-sm">{t("keyPlayers") || "Key Players"}</h4>
                    <p className="text-sm text-foreground">{displayArticle.gameAnalysis.keyPlayers}</p>
                  </div>
                )}

                {/* Tactical Breakdown */}
                {displayArticle.gameAnalysis.tacticalBreakdown && (
                  <div className="p-4 bg-card rounded-xl border border-border/50">
                    <h4 className="font-semibold mb-2 text-sm">{t("tacticalBreakdown") || "Tactical Breakdown"}</h4>
                    <p className="text-sm text-foreground leading-relaxed">
                      {displayArticle.gameAnalysis.tacticalBreakdown}
                    </p>
                  </div>
                )}
              </Card>
            )}

          {displayArticle.images && displayArticle.images.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{t("gallery") || "Image Gallery"}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayArticle.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative h-64 rounded-xl overflow-hidden group border border-border/50 cursor-pointer"
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`Gallery ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {displayArticle.comparisonData &&
            displayArticle.comparisonData.enabled &&
            displayArticle.comparisonData.items?.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">{t("comparison") || "Comparison"}</h2>
                <Card className="overflow-hidden border-primary/20">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
                        <tr>
                          <th className="px-6 py-4 text-left font-bold text-foreground">{t("metric") || "Metric"}</th>
                          <th className="px-6 py-4 text-center font-bold text-foreground">
                            {displayArticle.gameAnalysis?.homeTeam || "Value 1"}
                          </th>
                          <th className="px-6 py-4 text-center font-bold text-foreground">
                            {displayArticle.gameAnalysis?.awayTeam || "Value 2"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayArticle.comparisonData.items.map((item, idx) => (
                          <tr key={idx} className={`border-b border-border ${idx % 2 === 0 ? "bg-card/30" : ""}`}>
                            <td className="px-6 py-4 font-semibold text-foreground">{item.label}</td>
                            <td className="px-6 py-4 text-center">
                              <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg font-bold">
                                {item.value1}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-lg font-bold">
                                {item.value2}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            )}

          {/* Main Content */}
          <div className="mb-12 py-8 border-y border-border">
            <div
              className="prose prose-lg dark:prose-invert max-w-none mb-8 text-foreground leading-8"
              dangerouslySetInnerHTML={{ __html: displayArticle.content || "" }}
            />

            {displayArticle.tags && (
              <div className="pt-6 border-t border-border">
                <h3 className="font-semibold mb-3 text-sm">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {displayArticle.tags.split(",").map((tag, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {displayArticle.sections && displayArticle.sections.length > 0 && (
            <div className="mb-12 space-y-8">
              {displayArticle.sections.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  {section.title && <h2 className="text-2xl font-bold text-balance">{section.title}</h2>}

                  {section.type === "text" && (
                    <div
                      className="prose prose-lg dark:prose-invert max-w-none text-foreground leading-8"
                      dangerouslySetInnerHTML={{ __html: section.content || "" }}
                    />
                  )}

                  {section.type === "highlight" && (
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-l-4 border-primary p-6 rounded-r-xl">
                      <div
                        className="prose prose-lg dark:prose-invert max-w-none text-foreground"
                        dangerouslySetInnerHTML={{ __html: section.content || "" }}
                      />
                    </div>
                  )}

                  {section.type === "stats" && (
                    <div className="bg-card border border-border rounded-xl p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {section.content.split(",").map((stat, sidx) => {
                          const [label, value] = stat.split(":").map((s) => s.trim())
                          return (
                            <div key={sidx} className="text-center p-3 bg-muted rounded-lg">
                              <div className="text-2xl font-bold text-primary mb-1">{value || label}</div>
                              <div className="text-xs text-muted-foreground font-semibold">{label || value}</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {section.image && (
                    <div className="relative h-96 rounded-xl overflow-hidden border border-border/50">
                      <Image
                        src={section.image || "/placeholder.svg"}
                        alt={section.title || "Section image"}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Author Bio */}
          <Card className="mb-12 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 text-white font-bold text-xl shadow-lg">
                {(displayArticle.author || "A").charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1">About the Author</h3>
                <p className="text-sm text-muted-foreground font-semibold mb-2">{displayArticle.author || "Admin"}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Expert sports analyst with deep knowledge in football tactics, match analysis, and predictions.
                  Contributing to LiveBaz since {new Date(displayArticle.createdAt).getFullYear()}.
                </p>
              </div>
            </div>
          </Card>

          {/* Related Articles */}
          {otherArticles.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6">
                {t("related")} {displayArticle.category.charAt(0).toUpperCase() + displayArticle.category.slice(1)}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherArticles.map((relArticle) => (
                  <Link key={relArticle._id} href={`/blog/${relArticle._id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer h-full animate-fade-in group border-border/50 hover:border-primary/30">
                      <div className="aspect-video relative overflow-hidden bg-muted">
                        <Image
                          src={relArticle.image || "/placeholder.svg?height=300&width=500"}
                          alt={relArticle.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {relArticle.featured && (
                          <Badge className="absolute top-3 right-3 bg-primary/90">{t("featured")}</Badge>
                        )}
                      </div>
                      <div className="p-4">
                        <Badge variant="outline" className="mb-2 text-xs">
                          {relArticle.category}
                        </Badge>
                        <h4 className="font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {relArticle.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{relArticle.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                          <span className="font-medium">{relArticle.author || "Admin"}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {relArticle.readingTime || 5} {t("min")}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

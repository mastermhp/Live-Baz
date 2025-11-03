"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Globe, Save, AlertCircle } from "lucide-react"
import { toast } from "sonner"

export default function SEOManager() {
  const [articles, setArticles] = useState([])
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [languages] = useState(["en", "fa", "ar"])
  const [seoData, setSeoData] = useState({
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    ogImage: "",
  })
  const [translations, setTranslations] = useState({
    en: { title: "", content: "", excerpt: "" },
    fa: { title: "", content: "", excerpt: "" },
    ar: { title: "", content: "", excerpt: "" },
  })

  useEffect(() => {
    fetchArticles()
  }, [])

  async function fetchArticles() {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/articles?limit=100")
      const data = await res.json()
      setArticles(data.articles || [])
      if (data.articles?.length > 0) {
        selectArticle(data.articles[0])
      }
    } catch (error) {
      toast.error("Failed to fetch articles")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  function selectArticle(article) {
    setSelectedArticle(article)
    setSeoData(article.seo || {})
    setTranslations(
      article.translations ||
        languages.reduce((acc, lang) => {
          acc[lang] = { title: "", content: "", excerpt: "" }
          return acc
        }, {}),
    )
  }

  async function handleSave() {
    if (!selectedArticle) return
    try {
      const res = await fetch(`/api/admin/articles/${selectedArticle._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seo: seoData,
          translations,
          updatedAt: new Date(),
        }),
      })

      if (!res.ok) throw new Error("Failed to save SEO data")
      toast.success("SEO data and translations saved successfully")
      fetchArticles()
    } catch (error) {
      toast.error(error.message)
    }
  }

  if (loading) return <div className="p-8 text-center">Loading articles...</div>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">SEO Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Article List */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 h-fit">
          <h2 className="text-lg font-bold mb-4">Articles</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {articles.map((article) => (
              <button
                key={article._id}
                onClick={() => selectArticle(article)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  selectedArticle?._id === article._id
                    ? "bg-blue-100 border-2 border-blue-500"
                    : "border border-gray-200 hover:border-blue-300"
                }`}
              >
                <p className="font-semibold text-sm text-gray-900 line-clamp-2">{article.title}</p>
                <p className="text-xs text-gray-500 mt-1">{article.category}</p>
              </button>
            ))}
          </div>
        </div>

        {/* SEO Editor */}
        <div className="lg:col-span-2 space-y-6">
          {selectedArticle ? (
            <>
              {/* SEO Metadata */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-lg font-bold mb-4">SEO Metadata</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Meta Title (50-60 chars)</label>
                    <input
                      type="text"
                      value={seoData.metaTitle || ""}
                      onChange={(e) => setSeoData({ ...seoData, metaTitle: e.target.value })}
                      maxLength="60"
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      placeholder="Optimal title for search engines"
                    />
                    <p className="text-xs text-gray-500 mt-1">{seoData.metaTitle?.length || 0}/60 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Meta Description (150-160 chars)</label>
                    <textarea
                      value={seoData.metaDescription || ""}
                      onChange={(e) => setSeoData({ ...seoData, metaDescription: e.target.value })}
                      maxLength="160"
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none h-20"
                      placeholder="Compelling description for search results"
                    />
                    <p className="text-xs text-gray-500 mt-1">{seoData.metaDescription?.length || 0}/160 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Keywords (comma-separated)</label>
                    <input
                      type="text"
                      value={typeof seoData.keywords === "string" ? seoData.keywords : seoData.keywords?.join(", ")}
                      onChange={(e) =>
                        setSeoData({
                          ...seoData,
                          keywords: e.target.value.split(",").map((k) => k.trim()),
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">OG Image URL</label>
                    <input
                      type="url"
                      value={seoData.ogImage || ""}
                      onChange={(e) => setSeoData({ ...seoData, ogImage: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
              </div>

              {/* Multi-language Translations */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="h-5 w-5" />
                  <h2 className="text-lg font-bold">Translations</h2>
                </div>

                <div className="space-y-6">
                  {languages.map((lang) => (
                    <div key={lang} className="border-t pt-6 first:border-t-0 first:pt-0">
                      <h3 className="font-semibold mb-3 text-gray-900">
                        {lang === "en" ? "English" : lang === "fa" ? "Persian (فارسی)" : "Arabic (العربية)"}
                      </h3>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Title</label>
                          <input
                            type="text"
                            value={translations[lang]?.title || ""}
                            onChange={(e) =>
                              setTranslations({
                                ...translations,
                                [lang]: {
                                  ...translations[lang],
                                  title: e.target.value,
                                },
                              })
                            }
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                            dir={lang === "ar" || lang === "fa" ? "rtl" : "ltr"}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Excerpt</label>
                          <textarea
                            value={translations[lang]?.excerpt || ""}
                            onChange={(e) =>
                              setTranslations({
                                ...translations,
                                [lang]: {
                                  ...translations[lang],
                                  excerpt: e.target.value,
                                },
                              })
                            }
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none h-20"
                            dir={lang === "ar" || lang === "fa" ? "rtl" : "ltr"}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Content (HTML)</label>
                          <textarea
                            value={translations[lang]?.content || ""}
                            onChange={(e) =>
                              setTranslations({
                                ...translations,
                                [lang]: {
                                  ...translations[lang],
                                  content: e.target.value,
                                },
                              })
                            }
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none h-32 font-mono text-sm"
                            dir={lang === "ar" || lang === "fa" ? "rtl" : "ltr"}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 h-12 text-base font-semibold"
              >
                <Save className="h-5 w-5 mr-2" />
                Save SEO & Translations
              </Button>
            </>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-900">No article selected</p>
                <p className="text-sm text-yellow-800">Select an article from the list to manage its SEO</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

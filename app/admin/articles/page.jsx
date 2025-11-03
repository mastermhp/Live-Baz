"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { toast } from "sonner"

export default function ArticlesManager() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "analysis",
    featured: false,
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: "",
    },
  })

  useEffect(() => {
    fetchArticles()
  }, [category])

  async function fetchArticles() {
    try {
      setLoading(true)
      const url = `/api/admin/articles${category ? `?category=${category}` : ""}`
      const res = await fetch(url)
      const data = await res.json()
      setArticles(data.articles || [])
    } catch (error) {
      toast.error("Failed to fetch articles")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const url = editingId ? `/api/admin/articles/${editingId}` : "/api/admin/articles"
      const method = editingId ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Failed to save article")

      toast.success(editingId ? "Article updated" : "Article created")
      setShowForm(false)
      setEditingId(null)
      resetForm()
      fetchArticles()
    } catch (error) {
      toast.error(error.message)
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure?")) return
    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
      toast.success("Article deleted")
      fetchArticles()
    } catch (error) {
      toast.error(error.message)
    }
  }

  function resetForm() {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "analysis",
      featured: false,
      seo: {
        metaTitle: "",
        metaDescription: "",
        keywords: "",
      },
    })
  }

  const filteredArticles = articles.filter((article) => article.title?.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Articles Management</h1>
        <Button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            resetForm()
          }}
          className="bg-gradient-to-r from-blue-600 to-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Article
        </Button>
      </div>

      {/* Article Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 animate-slide-down">
          <h2 className="text-xl font-bold mb-6">{editingId ? "Edit Article" : "Create New Article"}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                >
                  <option>analysis</option>
                  <option>news</option>
                  <option>prediction</option>
                  <option>tutorial</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none h-20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Content (HTML)</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none h-40 font-mono text-sm"
              />
            </div>

            {/* SEO Section */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Meta Title</label>
                  <input
                    type="text"
                    value={formData.seo.metaTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seo: { ...formData.seo, metaTitle: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Meta Description</label>
                  <input
                    type="text"
                    value={formData.seo.metaDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seo: { ...formData.seo, metaDescription: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-gradient-to-r from-green-600 to-green-700">
                {editingId ? "Update Article" : "Create Article"}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  resetForm()
                }}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
        >
          <option value="">All Categories</option>
          <option value="analysis">Analysis</option>
          <option value="news">News</option>
          <option value="prediction">Prediction</option>
          <option value="tutorial">Tutorial</option>
        </select>
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">Loading articles...</div>
        ) : filteredArticles.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No articles found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Views</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map((article) => (
                  <tr key={article._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">{article.title}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg">{article.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-sm rounded-lg ${
                          article.publishedAt ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {article.publishedAt ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4">{article.views || 0}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => {
                          setFormData(article)
                          setEditingId(article._id)
                          setShowForm(true)
                        }}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(article._id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

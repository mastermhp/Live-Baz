"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Search, Upload, X } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

export default function ArticlesManager() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "analysis",
    featured: false,
    image: "",
    images: [],
    author: "Admin",
    tags: "",
    readingTime: 5,
    publishedAt: new Date().toISOString().split("T")[0],
    status: "draft",
    gameAnalysis: {
      homeTeam: "",
      awayTeam: "",
      predictedWinner: "",
      confidence: 50,
      keyPlayers: "",
      tacticalBreakdown: "",
    },
    comparisonData: {
      enabled: false,
      items: [{ label: "", value1: "", value2: "" }],
    },
    sections: [
      {
        title: "",
        content: "",
        image: "",
        type: "text", // text, comparison, stats, highlight
      },
    ],
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: "",
    },
    translations: {
      en: { title: "", content: "", excerpt: "", gameAnalysis: {} },
      fa: { title: "", content: "", excerpt: "", gameAnalysis: {} },
      ar: { title: "", content: "", excerpt: "", gameAnalysis: {} },
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

  async function handleImageUpload(e, field = "image", index = null) {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploadingImage(true)
      const formDataForUpload = new FormData()
      formDataForUpload.append("file", file)

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formDataForUpload,
      })

      if (!res.ok) throw new Error("Image upload failed")

      const { url } = await res.json()

      if (field === "featured") {
        setFormData({ ...formData, image: url })
      } else if (field === "gallery" && index !== null) {
        const newImages = [...formData.images]
        newImages[index] = url
        setFormData({ ...formData, images: newImages })
      } else if (field === "section" && index !== null) {
        const newSections = [...formData.sections]
        newSections[index].image = url
        setFormData({ ...formData, sections: newSections })
      }

      toast.success("Image uploaded successfully")
    } catch (error) {
      toast.error(error.message || "Failed to upload image")
    } finally {
      setUploadingImage(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const url = editingId ? `/api/admin/articles/${editingId}` : "/api/admin/articles"
      const method = editingId ? "PUT" : "POST"

      // Prepare data, ensuring translations are handled correctly
      const dataToSend = { ...formData }
      // Ensure nested translations are properly structured if they exist
      if (dataToSend.translations) {
        for (const lang in dataToSend.translations) {
          if (dataToSend.translations[lang] && typeof dataToSend.translations[lang] === "object") {
            // Merge existing translation data with potentially new fields
            // For now, just ensure the structure is there. If specific fields need
            // to be pulled from formData directly, this logic would be more complex.
          } else {
            // Initialize if missing or not an object
            dataToSend.translations[lang] = {
              title: dataToSend.translations[lang]?.title || "",
              content: dataToSend.translations[lang]?.content || "",
              excerpt: dataToSend.translations[lang]?.excerpt || "",
              gameAnalysis: dataToSend.translations[lang]?.gameAnalysis || {},
            }
          }
        }
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Failed to save article")
      }

      toast.success(editingId ? "Article updated" : "Article created")
      setShowForm(false)
      setEditingId(null)
      resetForm()
      fetchArticles()
    } catch (error) {
      toast.error(error.message)
      console.error("Submission error:", error)
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
      image: "",
      images: [],
      author: "Admin",
      tags: "",
      readingTime: 5,
      publishedAt: new Date().toISOString().split("T")[0],
      status: "draft",
      gameAnalysis: {
        homeTeam: "",
        awayTeam: "",
        predictedWinner: "",
        confidence: 50,
        keyPlayers: "",
        tacticalBreakdown: "",
      },
      comparisonData: {
        enabled: false,
        items: [{ label: "", value1: "", value2: "" }],
      },
      sections: [
        {
          title: "",
          content: "",
          image: "",
          type: "text",
        },
      ],
      seo: {
        metaTitle: "",
        metaDescription: "",
        keywords: "",
      },
      translations: {
        en: { title: "", content: "", excerpt: "", gameAnalysis: {} },
        fa: { title: "", content: "", excerpt: "", gameAnalysis: {} },
        ar: { title: "", content: "", excerpt: "", gameAnalysis: {} },
      },
    })
  }

  function addComparisonItem() {
    const newItems = [...formData.comparisonData.items, { label: "", value1: "", value2: "" }]
    setFormData({
      ...formData,
      comparisonData: { ...formData.comparisonData, items: newItems },
    })
  }

  function removeComparisonItem(index) {
    const newItems = formData.comparisonData.items.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      comparisonData: { ...formData.comparisonData, items: newItems },
    })
  }

  function addSection() {
    setFormData({
      ...formData,
      sections: [...formData.sections, { title: "", content: "", image: "", type: "text" }],
    })
  }

  function removeSection(index) {
    const newSections = formData.sections.filter((_, i) => i !== index)
    setFormData({ ...formData, sections: newSections })
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
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-900">Basic Information</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
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
                    <option>feature</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Author Name</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Reading Time (minutes)</label>
                  <input
                    type="number"
                    value={formData.readingTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        readingTime: Number.parseInt(e.target.value),
                      })
                    }
                    min="1"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Featured Image</h3>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6">
                {formData.image ? (
                  <div className="relative">
                    <div className="relative h-48 mb-4">
                      <Image
                        src={formData.image || "/placeholder.svg"}
                        alt="Article preview"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: "" })}
                      className="text-red-600 hover:text-red-700 flex items-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-sm font-semibold text-gray-700">Click to upload featured image</span>
                    <span className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "featured")}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Gallery Images */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-900">Gallery Images (for comparisons & showcase)</h3>
                <Button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      images: [...formData.images, ""],
                    })
                  }
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Image
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-2">
                    {img ? (
                      <div className="relative">
                        <div className="relative h-24 mb-2">
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`Gallery ${idx}`}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = formData.images.filter((_, i) => i !== idx)
                            setFormData({ ...formData, images: newImages })
                          }}
                          className="text-red-600 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center gap-1 h-24 justify-center border-2 border-dashed border-gray-300 rounded">
                        <Upload className="h-5 w-5 text-gray-400" />
                        <span className="text-xs text-gray-500">Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "gallery", idx)}
                          disabled={uploadingImage}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Game Analysis */}
            <div className="border-t pt-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Game Analysis (Football Specific)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Home Team</label>
                  <input
                    type="text"
                    value={formData.gameAnalysis.homeTeam}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gameAnalysis: {
                          ...formData.gameAnalysis,
                          homeTeam: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., Manchester City"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Away Team</label>
                  <input
                    type="text"
                    value={formData.gameAnalysis.awayTeam}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gameAnalysis: {
                          ...formData.gameAnalysis,
                          awayTeam: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., Liverpool"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Predicted Winner</label>
                  <select
                    value={formData.gameAnalysis.predictedWinner}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gameAnalysis: {
                          ...formData.gameAnalysis,
                          predictedWinner: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="home">Home Team</option>
                    <option value="draw">Draw</option>
                    <option value="away">Away Team</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Confidence Level (%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.gameAnalysis.confidence}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gameAnalysis: {
                          ...formData.gameAnalysis,
                          confidence: Number.parseInt(e.target.value),
                        },
                      })
                    }
                    className="w-full"
                  />
                  <span className="text-sm text-gray-600">{formData.gameAnalysis.confidence}% confidence</span>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">Key Players</label>
                <input
                  type="text"
                  value={formData.gameAnalysis.keyPlayers}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gameAnalysis: {
                        ...formData.gameAnalysis,
                        keyPlayers: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g., Haaland (City), Diaz (Liverpool)"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">Tactical Breakdown</label>
                <textarea
                  value={formData.gameAnalysis.tacticalBreakdown}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gameAnalysis: {
                        ...formData.gameAnalysis,
                        tacticalBreakdown: e.target.value,
                      },
                    })
                  }
                  placeholder="Describe formations, playing style, and tactical approach..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none h-24"
                />
              </div>
            </div>

            {/* Comparison Data */}
            <div className="border-t pt-6">
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="enableComparison"
                  checked={formData.comparisonData.enabled}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      comparisonData: {
                        ...formData.comparisonData,
                        enabled: e.target.checked,
                      },
                    })
                  }
                  className="h-4 w-4"
                />
                <label htmlFor="enableComparison" className="font-bold text-lg text-gray-900">
                  Add Comparison Table (Team/Player Stats)
                </label>
              </div>

              {formData.comparisonData.enabled && (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left">Metric</th>
                          <th className="px-4 py-2 text-left">Value 1</th>
                          <th className="px-4 py-2 text-left">Value 2</th>
                          <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.comparisonData.items.map((item, idx) => (
                          <tr key={idx} className="border-b">
                            <td className="px-4 py-2">
                              <input
                                type="text"
                                value={item.label}
                                onChange={(e) => {
                                  const newItems = formData.comparisonData.items
                                  newItems[idx].label = e.target.value
                                  setFormData({
                                    ...formData,
                                    comparisonData: {
                                      ...formData.comparisonData,
                                      items: newItems,
                                    },
                                  })
                                }}
                                placeholder="e.g., Passes"
                                className="w-full px-2 py-1 border border-gray-200 rounded"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type="text"
                                value={item.value1}
                                onChange={(e) => {
                                  const newItems = formData.comparisonData.items
                                  newItems[idx].value1 = e.target.value
                                  setFormData({
                                    ...formData,
                                    comparisonData: {
                                      ...formData.comparisonData,
                                      items: newItems,
                                    },
                                  })
                                }}
                                placeholder="845"
                                className="w-full px-2 py-1 border border-gray-200 rounded"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type="text"
                                value={item.value2}
                                onChange={(e) => {
                                  const newItems = formData.comparisonData.items
                                  newItems[idx].value2 = e.target.value
                                  setFormData({
                                    ...formData,
                                    comparisonData: {
                                      ...formData.comparisonData,
                                      items: newItems,
                                    },
                                  })
                                }}
                                placeholder="723"
                                className="w-full px-2 py-1 border border-gray-200 rounded"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <button
                                type="button"
                                onClick={() => removeComparisonItem(idx)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Button type="button" onClick={addComparisonItem} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Comparison Row
                  </Button>
                </div>
              )}
            </div>

            {/* Content Sections */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-900">Content Sections (Rich Content Builder)</h3>
                <Button type="button" onClick={addSection} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Section
                </Button>
              </div>
              <div className="space-y-6">
                {formData.sections.map((section, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold">Section {idx + 1}</h4>
                      <button type="button" onClick={() => removeSection(idx)} className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-semibold mb-1">Section Title</label>
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) => {
                            const newSections = [...formData.sections]
                            newSections[idx].title = e.target.value
                            setFormData({
                              ...formData,
                              sections: newSections,
                            })
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1">Type</label>
                        <select
                          value={section.type}
                          onChange={(e) => {
                            const newSections = [...formData.sections]
                            newSections[idx].type = e.target.value
                            setFormData({
                              ...formData,
                              sections: newSections,
                            })
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded"
                        >
                          <option value="text">Text</option>
                          <option value="comparison">Comparison</option>
                          <option value="stats">Stats</option>
                          <option value="highlight">Highlight</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1">Content (HTML)</label>
                        <textarea
                          value={section.content}
                          onChange={(e) => {
                            const newSections = [...formData.sections]
                            newSections[idx].content = e.target.value
                            setFormData({
                              ...formData,
                              sections: newSections,
                            })
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded h-20 font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1">Section Image</label>
                        {section.image ? (
                          <div className="relative h-24 rounded border border-gray-200 mb-2">
                            <Image
                              src={section.image || "/placeholder.svg"}
                              alt={section.title}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                        ) : null}
                        <label className="cursor-pointer flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded hover:bg-gray-50">
                          <Upload className="h-4 w-4" />
                          {section.image ? "Replace Image" : "Upload Image"}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, "section", idx)}
                            disabled={uploadingImage}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Existing fields: tags, dates, status, SEO, translations */}
            {/* Tags, Publication Date, Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g. football, tactics, analysis"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Publication Date</label>
                <input
                  type="date"
                  value={formData.publishedAt}
                  onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            {/* Featured Checkbox */}
            <div className="grid grid-cols-1">
              <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="h-4 w-4"
                />
                Featured Article
              </label>
            </div>

            {/* Translations */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Translations (Multi-Language Support)</h3>
              <div className="space-y-6">
                {["en", "fa", "ar"].map((lang) => (
                  <div key={lang} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3 capitalize">
                      {lang === "en" ? "English" : lang === "fa" ? "Farsi (Persian)" : "Arabic"}
                    </h4>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.translations[lang]?.title || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            translations: {
                              ...formData.translations,
                              [lang]: { ...formData.translations[lang], title: e.target.value },
                            },
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm font-semibold mb-2">Excerpt</label>
                      <textarea
                        value={formData.translations[lang]?.excerpt || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            translations: {
                              ...formData.translations,
                              [lang]: { ...formData.translations[lang], excerpt: e.target.value },
                            },
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none h-20"
                      />
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm font-semibold mb-2">Content (HTML)</label>
                      <textarea
                        value={formData.translations[lang]?.content || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            translations: {
                              ...formData.translations,
                              [lang]: { ...formData.translations[lang], content: e.target.value },
                            },
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none h-24"
                      />
                    </div>
                    {/* Add translation for gameAnalysis if applicable */}
                    {lang !== "en" && ( // Assuming gameAnalysis is primarily for English, or needs specific translation logic
                      <div className="mt-2">
                        <label className="block text-sm font-semibold mb-2">Game Analysis Title (Translated)</label>
                        <input
                          type="text"
                          value={formData.translations[lang]?.gameAnalysis?.title || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              translations: {
                                ...formData.translations,
                                [lang]: {
                                  ...formData.translations[lang],
                                  gameAnalysis: {
                                    ...(formData.translations[lang]?.gameAnalysis || {}),
                                    title: e.target.value,
                                  },
                                },
                              },
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Meta Title (60 chars)</label>
                  <input
                    type="text"
                    value={formData.seo.metaTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seo: { ...formData.seo, metaTitle: e.target.value },
                      })
                    }
                    maxLength="60"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.seo.metaTitle.length}/60</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Meta Description (160 chars)</label>
                  <textarea
                    value={formData.seo.metaDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seo: { ...formData.seo, metaDescription: e.target.value },
                      })
                    }
                    maxLength="160"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none h-16"
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.seo.metaDescription.length}/160</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Keywords (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.seo.keywords}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seo: { ...formData.seo, keywords: e.target.value },
                      })
                    }
                    placeholder="football, analysis, tactics"
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
          <option value="feature">Feature</option>
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Author</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Views</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map((article) => (
                  <tr key={article._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">{article.title}</td>
                    <td className="px-6 py-4">
                      {article.image && (
                        <div className="relative h-12 w-12">
                          <Image
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg">{article.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-sm rounded-lg ${
                          article.status === "published"
                            ? "bg-green-100 text-green-700"
                            : article.status === "scheduled"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {article.status || (article.publishedAt ? "Published" : "Draft")}
                      </span>
                    </td>
                    <td className="px-6 py-4">{article.author || "Admin"}</td>
                    <td className="px-6 py-4">{article.views || 0}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => {
                          // Pre-fill form with article data
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

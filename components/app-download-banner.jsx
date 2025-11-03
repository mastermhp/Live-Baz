"use client"

import { useState, useEffect } from "react"
import { X, Download, Apple, Smartphone } from "lucide-react"

export default function AppDownloadBanner() {
  const [showBanner, setShowBanner] = useState(true)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if user has dismissed banner before
    const isDismissed = localStorage.getItem("appBannerDismissed")
    if (isDismissed) {
      setShowBanner(false)
      setDismissed(true)
    }
  }, [])

  const handleDismiss = () => {
    setShowBanner(false)
    localStorage.setItem("appBannerDismissed", "true")
  }

  if (!showBanner) return null

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white animate-slide-down relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-screen filter blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300 rounded-full mix-blend-screen filter blur-3xl animate-float-delayed" />
      </div>

      <div className="max-w-7xl mx-auto px-3 md:px-4 py-3 md:py-4 flex items-center justify-between gap-3 relative z-10">
        {/* Left Content */}
        <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
          <div className="flex-shrink-0 hidden sm:flex items-center justify-center h-10 md:h-12 w-10 md:w-12 rounded-lg bg-white/20 backdrop-blur-sm">
            <Smartphone className="h-5 md:h-6 w-5 md:w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm font-bold tracking-wide">Get LiveBaz on Your Phone</p>
            <p className="text-xs md:text-xs text-blue-100 line-clamp-1">
              Live scores, predictions & analysis in your pocket
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* iOS Button */}
          <a
            href="https://apps.apple.com/app/livebaz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 md:px-4 py-1.5 md:py-2 bg-white text-blue-600 rounded-lg font-semibold text-xs md:text-sm hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Apple className="h-3.5 md:h-4 w-3.5 md:w-4" />
            <span className="hidden sm:inline">iOS</span>
          </a>

          {/* Android Button */}
          <a
            href="https://play.google.com/store/apps/details?id=com.livebaz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 md:px-4 py-1.5 md:py-2 bg-white/20 text-white rounded-lg font-semibold text-xs md:text-sm hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/30 backdrop-blur-sm"
          >
            <Download className="h-3.5 md:h-4 w-3.5 md:w-4" />
            <span className="hidden sm:inline">Android</span>
          </a>

          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0 backdrop-blur-sm"
            aria-label="Dismiss banner"
          >
            <X className="h-4 md:h-5 w-4 md:w-5" />
          </button>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="h-0.5 bg-white/20">
        <div className="h-full bg-gradient-to-r from-white via-cyan-200 to-transparent animate-pulse" />
      </div>
    </div>
  )
}

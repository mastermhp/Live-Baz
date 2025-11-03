"use client"

import { useEffect } from "react"
import { trackPageView } from "@/lib/analytics"

export default function AnalyticsTracker() {
  useEffect(() => {
    // Track page view on mount
    trackPageView()
  }, [])

  return null
}

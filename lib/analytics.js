// Client-side analytics tracking utility
export async function trackPageView() {
  try {
    await fetch("/api/admin/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pageViews: 1,
        uniqueVisitors: 1,
      }),
    })
  } catch (error) {
    console.error("[v0] Failed to track page view:", error)
  }
}

export async function trackArticleView(articleId) {
  try {
    await fetch("/api/admin/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pageViews: 1,
        articleViewId: articleId,
      }),
    })
  } catch (error) {
    console.error("[v0] Failed to track article view:", error)
  }
}

export async function trackMatchView() {
  try {
    await fetch("/api/admin/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pageViews: 1,
        matchesViewed: 1,
      }),
    })
  } catch (error) {
    console.error("[v0] Failed to track match view:", error)
  }
}

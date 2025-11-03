"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function useAdminAuth() {
  const router = useRouter()
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth/verify")
        if (res.ok) {
          const data = await res.json()
          setAdmin(data.admin)
          setAuthenticated(true)
        } else {
          setAuthenticated(false)
          router.push("/admin-login")
        }
      } catch (error) {
        console.error("[v0] Auth check failed:", error)
        setAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const logout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" })
      setAdmin(null)
      setAuthenticated(false)
      router.push("/admin-login")
    } catch (error) {
      console.error("[v0] Logout failed:", error)
    }
  }

  return { admin, loading, authenticated, logout }
}

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function useUserAuth() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/verify")
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
          setAuthenticated(true)
        } else {
          setAuthenticated(false)
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

  const login = async (email, password) => {
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error)
      }

      const data = await res.json()
      setUser(data.user)
      setAuthenticated(true)
      return data.user
    } catch (error) {
      console.error("[v0] Login error:", error)
      throw error
    }
  }

  const signup = async (email, password, name) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error)
      }

      const data = await res.json()
      setUser(data.user)
      setAuthenticated(true)
      return data.user
    } catch (error) {
      console.error("[v0] Signup error:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      setAuthenticated(false)
      router.push("/")
    } catch (error) {
      console.error("[v0] Logout failed:", error)
    }
  }

  const trackActivity = async (activityType, data = {}) => {
    if (!user?.id) return

    try {
      await fetch("/api/user/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          activityType,
          data,
        }),
      })
    } catch (error) {
      console.error("[v0] Activity tracking failed:", error)
    }
  }

  return {
    user,
    loading,
    authenticated,
    login,
    signup,
    logout,
    trackActivity,
  }
}

"use client"

import { useEffect, useState } from "react"
import { io } from "socket.io-client"

let socket = null

function getSocket() {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_APP_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    })
  }
  return socket
}

export function useLiveMatchUpdates(matchId) {
  const [matchUpdate, setMatchUpdate] = useState(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const socket = getSocket()

    socket.on("connect", () => {
      console.log("[v0] Socket connected")
      setConnected(true)
      socket.emit("join-match", matchId)
    })

    socket.on("match-update", (data) => {
      console.log("[v0] Match update received:", data)
      setMatchUpdate(data)
    })

    socket.on("goal-scored", (data) => {
      console.log("[v0] Goal scored:", data)
      setMatchUpdate((prev) => ({
        ...prev,
        lastEvent: data,
      }))
    })

    socket.on("status-change", (data) => {
      console.log("[v0] Status change:", data)
      setMatchUpdate((prev) => ({
        ...prev,
        status: data.status,
      }))
    })

    socket.on("disconnect", () => {
      console.log("[v0] Socket disconnected")
      setConnected(false)
    })

    return () => {
      socket.emit("leave-match", matchId)
    }
  }, [matchId])

  return { matchUpdate, connected }
}

export function useLiveMatches() {
  const [liveMatches, setLiveMatches] = useState([])
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const socket = getSocket()

    socket.on("connect", () => {
      console.log("[v0] Socket connected")
      setConnected(true)
      socket.emit("subscribe-live")
    })

    socket.on("live-update", (data) => {
      console.log("[v0] Live update received:", data)
      setLiveMatches((prev) => {
        const index = prev.findIndex((m) => m.matchId === data.matchId)
        if (index > -1) {
          const updated = [...prev]
          updated[index] = { ...updated[index], ...data }
          return updated
        }
        return [...prev, data]
      })
    })

    socket.on("goal-notification", (data) => {
      console.log("[v0] Goal notification:", data)
      // Show notification to user
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Goal!", {
          body: `Goal in ${data.matchId}!`,
          icon: "/football-icon.png",
        })
      }
    })

    socket.on("disconnect", () => {
      console.log("[v0] Socket disconnected")
      setConnected(false)
    })

    return () => {
      socket.emit("unsubscribe-live")
    }
  }, [])

  return { liveMatches, connected }
}

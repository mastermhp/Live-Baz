import { Server } from "socket.io"

let io = null

export function initializeWebSocket(httpServer) {
  if (io) return io

  io = new Server(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL,
      methods: ["GET", "POST"],
    },
  })

  // Connection event
  io.on("connection", (socket) => {
    console.log("[v0] Client connected:", socket.id)

    // Join specific match room for live updates
    socket.on("join-match", (matchId) => {
      socket.join(`match-${matchId}`)
      console.log(`[v0] Client joined match room: match-${matchId}`)
    })

    // Leave match room
    socket.on("leave-match", (matchId) => {
      socket.leave(`match-${matchId}`)
      console.log(`[v0] Client left match room: match-${matchId}`)
    })

    // Subscribe to all live matches
    socket.on("subscribe-live", () => {
      socket.join("live-matches")
      console.log("[v0] Client subscribed to live matches")
    })

    // Unsubscribe from live matches
    socket.on("unsubscribe-live", () => {
      socket.leave("live-matches")
      console.log("[v0] Client unsubscribed from live matches")
    })

    // Disconnect event
    socket.on("disconnect", () => {
      console.log("[v0] Client disconnected:", socket.id)
    })
  })

  return io
}

export function getWebSocketServer() {
  return io
}

// Broadcast match update to all clients in that match room
export function broadcastMatchUpdate(matchId, update) {
  if (!io) return
  io.to(`match-${matchId}`).emit("match-update", {
    matchId,
    ...update,
    timestamp: new Date(),
  })
  console.log(`[v0] Broadcast match update: ${matchId}`)
}

// Broadcast to all live match subscribers
export function broadcastLiveUpdate(update) {
  if (!io) return
  io.to("live-matches").emit("live-update", {
    ...update,
    timestamp: new Date(),
  })
}

// Notify all clients of a goal
export function notifyGoal(matchId, goalData) {
  if (!io) return
  io.to(`match-${matchId}`).emit("goal-scored", {
    matchId,
    ...goalData,
    timestamp: new Date(),
  })
  io.to("live-matches").emit("goal-notification", {
    matchId,
    ...goalData,
  })
  console.log(`[v0] Goal notification: ${matchId}`)
}

// Notify match status changes
export function notifyMatchStatusChange(matchId, newStatus) {
  if (!io) return
  io.to(`match-${matchId}`).emit("status-change", {
    matchId,
    status: newStatus,
    timestamp: new Date(),
  })
  io.to("live-matches").emit("status-change", {
    matchId,
    status: newStatus,
  })
}

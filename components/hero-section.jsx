"use client"

import { useEffect, useRef, useState } from "react"
import { TrendingUp, BarChart3, FileText, Zap, Target, Play } from "lucide-react"

export default function HeroSection() {
  const canvasRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles = []
    const particleCount = 80

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 4 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.opacity = Math.random() * 0.5 + 0.3
        this.color = Math.random() > 0.5 ? "59, 130, 246" : "34, 197, 94"
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        ctx.shadowBlur = 10
        ctx.shadowColor = `rgba(${this.color}, 0.5)`
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - distance / 150)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })
      connectParticles()
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 md:py-32 min-h-[90vh]">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/modern-football-stadium-aerial-view-night.jpg')] bg-cover bg-center animate-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50" />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/30 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-green-400/20 rounded-full blur-3xl animate-float" />

      <div
        className="absolute top-32 right-20 animate-float-3d"
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
      >
        <div className="relative w-24 h-24 animate-spin-slow">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-gray-300 shadow-2xl" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-100 to-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-gray-800" />
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-800" />
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800" />
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-32 left-20 animate-float-delayed"
        style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
      >
        <div className="relative w-16 h-16 animate-spin-slow">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-gray-300 shadow-2xl" />
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-gray-100 to-white" />
        </div>
      </div>

      <div className="absolute top-40 left-10 animate-float-3d opacity-20 hover:opacity-100 transition-opacity duration-500 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl w-64">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-green-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              LIVE
            </span>
            <span className="text-xs text-white/60">45'</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500" />
              <span className="text-white text-sm font-semibold">Team A</span>
            </div>
            <span className="text-2xl font-bold text-white">2</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500" />
              <span className="text-white text-sm font-semibold">Team B</span>
            </div>
            <span className="text-2xl font-bold text-white">1</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-40 right-10 animate-float-delayed opacity-20 hover:opacity-100 transition-opacity duration-500 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl w-64">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-blue-400 font-semibold">UPCOMING</span>
            <span className="text-xs text-white/60">19:00</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-500" />
              <span className="text-white text-sm font-semibold">Team C</span>
            </div>
            <span className="text-sm text-white/60">vs</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-500" />
              <span className="text-white text-sm font-semibold">Team D</span>
            </div>
            <span className="text-sm text-green-400">85% Win</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold mb-8 animate-bounce-subtle shadow-lg">
              <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
              Real-Time Sports Analytics Platform
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-8 text-balance leading-tight">
              <span className="text-white drop-shadow-2xl">Live Scores & </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent animate-gradient drop-shadow-2xl">
                Smart Predictions
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-12 text-pretty max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
              Experience the future of sports analysis with AI-powered predictions, real-time statistics, and expert
              insights all in one revolutionary platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                  Get Started Free
                  <Target className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 animate-pulse-ring" />
              </button>

              <button className="group px-10 py-5 bg-white/10 backdrop-blur-md text-white font-bold text-lg rounded-2xl border-2 border-white/30 hover:border-white hover:bg-white/20 hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Play className="h-6 w-6 fill-white" />
                </div>
                Watch Demo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-md border border-white/20 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:-translate-y-3 animate-slide-up overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative text-center">
                <div className="text-5xl md:text-6xl font-black text-white mb-3 animate-count-up drop-shadow-lg">
                  500+
                </div>
                <div className="text-sm text-blue-200 font-semibold uppercase tracking-wider">Live Matches Daily</div>
              </div>
            </div>

            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-md border border-white/20 hover:border-green-400 hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-500 hover:-translate-y-3 animate-slide-up animation-delay-200 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative text-center">
                <div className="text-5xl md:text-6xl font-black text-white mb-3 animate-count-up drop-shadow-lg">
                  95%
                </div>
                <div className="text-sm text-green-200 font-semibold uppercase tracking-wider">Prediction Accuracy</div>
              </div>
            </div>

            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-blue-500/20 to-green-500/10 backdrop-blur-md border border-white/20 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:-translate-y-3 animate-slide-up animation-delay-400 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative text-center">
                <div className="text-5xl md:text-6xl font-black text-white mb-3 animate-count-up drop-shadow-lg">
                  1M+
                </div>
                <div className="text-sm text-blue-200 font-semibold uppercase tracking-wider">Active Users</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative p-10 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:-translate-y-4 hover:rotate-1 animate-slide-up overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 shadow-2xl shadow-blue-500/50">
                  <TrendingUp className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-black text-2xl mb-4 text-white drop-shadow-lg">AI Win Predictions</h3>
                <p className="text-blue-100 leading-relaxed">
                  Advanced machine learning algorithms analyze thousands of data points to predict match outcomes with
                  incredible accuracy.
                </p>
              </div>
            </div>

            <div className="group relative p-10 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-green-400 hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-500 hover:-translate-y-4 hover:rotate-1 animate-slide-up animation-delay-200 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 shadow-2xl shadow-green-500/50">
                  <BarChart3 className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-black text-2xl mb-4 text-white drop-shadow-lg">Live Statistics</h3>
                <p className="text-green-100 leading-relaxed">
                  Real-time match stats, player performance metrics, and team analytics updated every second during live
                  games.
                </p>
              </div>
            </div>

            <div className="group relative p-10 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:-translate-y-4 hover:rotate-1 animate-slide-up animation-delay-400 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-blue-500 via-green-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 shadow-2xl shadow-blue-500/50">
                  <FileText className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-black text-2xl mb-4 text-white drop-shadow-lg">Expert Analysis</h3>
                <p className="text-blue-100 leading-relaxed">
                  In-depth match previews, tactical breakdowns, and post-game analysis from professional sports
                  analysts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-20 right-32 opacity-20 animate-spin-slow hidden xl:block">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="58" stroke="white" strokeWidth="3" />
          <path d="M60 10 L70 35 L95 35 L75 52 L82 77 L60 60 L38 77 L45 52 L25 35 L50 35 Z" fill="white" />
        </svg>
      </div>

      <div className="absolute bottom-20 left-32 opacity-20 animate-pulse-slow hidden xl:block">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="80" height="80" stroke="white" strokeWidth="3" rx="10" />
          <rect x="20" y="60" width="15" height="20" fill="white" />
          <rect x="42.5" y="40" width="15" height="40" fill="white" />
          <rect x="65" y="20" width="15" height="60" fill="white" />
        </svg>
      </div>
    </section>
  )
}

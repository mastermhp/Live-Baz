"use client"

import { useEffect, useRef } from "react"
import { TrendingUp, BarChart3, FileText, Zap, Target } from "lucide-react"

export default function HeroSection() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles = []
    const particleCount = 50

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.opacity = Math.random() * 0.5 + 0.2
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
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })
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
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 md:py-32">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />

      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-400/20 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse-slow" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6 animate-bounce-subtle">
              <Zap className="h-4 w-4" />
              Real-Time Sports Analytics
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
              Live Scores &{" "}
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 bg-clip-text text-transparent animate-gradient">
                Smart Predictions
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
              Experience the future of sports analysis with AI-powered predictions, real-time statistics, and expert
              insights all in one place.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-in">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2 animate-count-up">500+</div>
              <div className="text-sm text-gray-600">Live Matches Daily</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2 animate-count-up">95%</div>
              <div className="text-sm text-gray-600">Prediction Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2 animate-count-up">1M+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="group relative p-8 rounded-2xl bg-white border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-slide-up">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-lg">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">AI Win Predictions</h3>
                <p className="text-gray-600 leading-relaxed">
                  Advanced machine learning algorithms analyze thousands of data points to predict match outcomes with
                  incredible accuracy.
                </p>
              </div>
            </div>

            <div className="group relative p-8 rounded-2xl bg-white border-2 border-green-100 hover:border-green-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-slide-up animation-delay-200">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-lg">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Live Statistics</h3>
                <p className="text-gray-600 leading-relaxed">
                  Real-time match stats, player performance metrics, and team analytics updated every second during live
                  games.
                </p>
              </div>
            </div>

            <div className="group relative p-8 rounded-2xl bg-white border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-slide-up animation-delay-400">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-lg">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Expert Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                  In-depth match previews, tactical breakdowns, and post-game analysis from professional sports
                  analysts.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Get Started Free
                <Target className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl hover:scale-105 transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-10 right-20 opacity-10 animate-spin-slow hidden lg:block">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2" className="text-blue-500" />
          <path
            d="M50 10 L60 30 L80 30 L65 45 L70 65 L50 50 L30 65 L35 45 L20 30 L40 30 Z"
            fill="currentColor"
            className="text-blue-500"
          />
        </svg>
      </div>
    </section>
  )
}

"use client"

import { TrendingUp, BarChart3, FileText } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Live Scores & <span className="text-primary">Smart Analytics</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
            Get real-time match updates, win probabilities, and expert analysis. Make informed decisions with
            data-driven insights.
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card border border-border/50 hover:shadow-lg transition-all">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Win Predictions</h3>
              <p className="text-sm text-muted-foreground text-center">AI-powered win probability calculations</p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card border border-border/50 hover:shadow-lg transition-all">
              <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold">Live Statistics</h3>
              <p className="text-sm text-muted-foreground text-center">Real-time match stats and team performance</p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card border border-border/50 hover:shadow-lg transition-all">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold">Expert Analysis</h3>
              <p className="text-sm text-muted-foreground text-center">In-depth articles and match predictions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

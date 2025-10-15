import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import MatchCard from "@/components/match-card";
import { demoMatches, demoArticles } from "@/lib/demo-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Flame,
  TrendingUp,
  Newspaper,
  Sparkles,
  Trophy,
  Badge,
  Calendar,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const liveMatches = demoMatches.filter((m) => m.status === "live");
  const upcomingMatches = demoMatches.filter((m) => m.status === "upcoming");

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* <HeroSection /> */}

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Top Leagues */}
          <aside className="lg:col-span-1">
            <Card className="p-6 sticky top-24 animate-fade-in">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-blue-600" />
                Top Leagues
              </h2>
              <nav className="space-y-2">
                {[
                  { name: "Premier League", country: "England", icon: "⚽" },
                  { name: "La Liga", country: "Spain", icon: "⚽" },
                  { name: "Serie A", country: "Italy", icon: "⚽" },
                  { name: "Bundesliga", country: "Germany", icon: "⚽" },
                  { name: "Ligue 1", country: "France", icon: "⚽" },
                  { name: "Champions League", country: "Europe", icon: "🏆" },
                  { name: "Europa League", country: "Europe", icon: "🏆" },
                ].map((league, index) => (
                  <Link
                    key={league.name}
                    href={`/leagues/${league.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <span className="text-xl">{league.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors">
                        {league.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {league.country}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </nav>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Live Matches Section */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8 animate-slide-up">
                {/* <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 h-8 w-8 bg-green-500 rounded-full blur-xl opacity-50 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                      Live Matches
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Real-time updates and predictions
                    </p>
                  </div>
                </div> */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Flame className="h-7 w-7 text-green-500 animate-pulse-subtle" />
                    <div className="absolute inset-0 h-7 w-7 bg-green-500 rounded-full blur-lg opacity-50 animate-pulse-subtle" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Live Matches
                    </h2>
                    <p className="text-sm text-gray-600">Real-time updates</p>
                  </div>
                  <Badge className="bg-green-500 rounded-full text-white animate-pulse-subtle">
                    {liveMatches.length} LIVE
                  </Badge>
                </div>
                <Link href="/live">
                  <Button className="gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    View All Live
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveMatches.map((match, index) => (
                  <div
                    key={match.id}
                    className="stagger-item animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <MatchCard match={match} />
                  </div>
                ))}
              </div>
            </section>

            {/* Upcoming Matches Section */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8 animate-slide-up">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                    <div className="absolute inset-0 h-8 w-8 bg-blue-500 rounded-full blur-xl opacity-30" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                      Upcoming Matches
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Get ahead with AI predictions
                    </p>
                  </div>
                </div>
                <Link href="/matches">
                  <Button
                    variant="outline"
                    className="gap-2 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 bg-transparent"
                  >
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingMatches.map((match, index) => (
                  <div
                    key={match.id}
                    className="stagger-item animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <MatchCard match={match} />
                  </div>
                ))}
              </div>
            </section>

            {/* Expert Analysis Section */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8 animate-slide-up">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Newspaper className="h-8 w-8 text-blue-600" />
                    <div className="absolute inset-0 h-8 w-8 bg-blue-500 rounded-full blur-xl opacity-30" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                      Expert Analysis
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Insights from professional analysts
                    </p>
                  </div>
                </div>
                <Link href="/blog">
                  <Button
                    variant="outline"
                    className="gap-2 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 bg-transparent"
                  >
                    View All Articles
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {demoArticles.map((article, index) => (
                  <Link key={article.id} href={`/blog/${article.id}`}>
                    <Card
                      className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full border-2 border-gray-100 hover:border-blue-300 group animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-blue-100 to-green-100">
                        <img
                          src={
                            article.image ||
                            "/placeholder.svg?height=300&width=400&query=football analysis"
                          }
                          alt={article.title}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                            {article.category}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            {article.readTime}
                          </span>
                        </div>
                        <h3 className="font-bold text-xl mb-3 line-clamp-2 text-balance text-gray-900 group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                          <span className="font-medium">{article.author}</span>
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="py-16 animate-fade-in">
          <Card className="relative h-[600px] overflow-hidden border-0 shadow-2xl">
            {/* Gradient background with low opacity */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 opacity-70" />

            {/* Image layer between gradient and content */}
            <img
              src="/cta.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
            />

            {/* Animated floating elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-float-delayed" />

            {/* Foreground content */}
            <div className="relative z-10 p-12 md:p-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/25 text-black/60 text-sm font-semibold mb-6 animate-bounce-subtle backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-blue-600" />
                Join 1M+ Sports Fans
              </div>

              {/* Gradient Headline */}
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-800 to-green-700 drop-shadow-[0_0_10px_rgba(0,0,0,0.4)]">
                Never Miss a Match Again
              </h2>

              <p className="text-lg md:text-xl text-black/45 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                Create your free account to get personalized match
                notifications, follow your favorite teams, and access exclusive
                expert analysis and predictions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-gray-100 font-bold px-8 h-14 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Get Started Free
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 h-14 rounded-xl bg-transparent"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <footer className="border-t-2 border-gray-100 bg-gradient-to-br from-gray-50 to-white mt-16">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview%20%281%29-OFuZSfQKZS8jOPIWZsviyv6sNwxUjd.png"
                alt="LIVEBAZ"
                className="h-12 w-auto mb-4"
              />
              <p className="text-sm text-gray-600 leading-relaxed">
                Your ultimate destination for live scores, AI-powered
                predictions, and expert sports analytics.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <Link
                    href="/live"
                    className="hover:text-blue-600 transition-colors flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    Live Matches
                  </Link>
                </li>
                <li>
                  <Link
                    href="/leagues"
                    className="hover:text-blue-600 transition-colors flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    Leagues
                  </Link>
                </li>
                <li>
                  <Link
                    href="/teams"
                    className="hover:text-blue-600 transition-colors flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    Teams
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-blue-600 transition-colors flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-blue-600 transition-colors flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-blue-600 transition-colors flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-blue-600 transition-colors flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-blue-600 transition-colors flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Follow Us</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>
              © 2025 LIVEBAZ. All rights reserved. Made with ❤️ for sports fans
              worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-2xl border-b border-blue-100/50"
          : "bg-white/70 backdrop-blur-lg border-b border-gray-100/50"
      }`}
      style={{
        background: scrolled
          ? "linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))"
          : "linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8))",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Logo with enhanced animation */}
          <Link
            href="/"
            className={`flex items-center gap-2 shrink-0 group transition-all duration-700 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview%20%281%29-OFuZSfQKZS8jOPIWZsviyv6sNwxUjd.png"
                alt="LIVEBAZ"
                className="h-14 w-auto transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                loading="eager"
              />
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500" />
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <nav
            className={`hidden lg:flex items-center gap-1 flex-1 max-w-2xl transition-all duration-700 delay-100 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
            }`}
          >
            <Link
              href="/"
              className="relative px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 group"
            >
              Home
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-500 group-hover:w-3/4 transition-all duration-300" />
            </Link>
            <Link
              href="/live"
              className="relative px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 flex items-center gap-2 group"
            >
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse-subtle" />
              Live
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-500 group-hover:w-3/4 transition-all duration-300" />
            </Link>
            <Link
              href="/leagues"
              className="relative px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 group"
            >
              Leagues
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-500 group-hover:w-3/4 transition-all duration-300" />
            </Link>
            <Link
              href="/teams"
              className="relative px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 group"
            >
              Teams
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-500 group-hover:w-3/4 transition-all duration-300" />
            </Link>
            <Link
              href="/blog"
              className="relative px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 group"
            >
              Analysis
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-500 group-hover:w-3/4 transition-all duration-300" />
            </Link>
          </nav>

          {/* Right side actions */}
          <div
            className={`flex items-center gap-3 transition-all duration-700 delay-200 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative hidden md:block">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                className="relative group hover:bg-blue-50 transition-all duration-300 h-10 w-10 rounded-xl"
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </Button>

              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 animate-slide-down">
                  <div className="bg-white rounded-xl shadow-2xl border-2 border-blue-100 p-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="search"
                        placeholder="Search teams, leagues..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-300 text-sm"
                        autoFocus
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/signin">
              <Button
                className={`hidden md:inline-flex relative overflow-hidden group h-10 px-6 rounded-xl font-semibold text-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
                  isLoaded ? "animate-scale-in" : "opacity-0"
                }`}
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                  boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <User className="h-4 w-4 mr-2 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10">Sign In</span>
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-blue-50 transition-colors h-10 w-10 rounded-xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 animate-slide-down">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all text-sm"
                />
              </div>
            </div>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm font-semibold hover:text-blue-600 transition-colors py-2 px-3 rounded-lg hover:bg-blue-50"
              >
                Home
              </Link>
              <Link
                href="/live"
                className="text-sm font-semibold hover:text-blue-600 transition-colors py-2 px-3 rounded-lg hover:bg-blue-50 flex items-center gap-2"
              >
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse-subtle" />
                Live Matches
              </Link>
              <Link
                href="/leagues"
                className="text-sm font-semibold hover:text-blue-600 transition-colors py-2 px-3 rounded-lg hover:bg-blue-50"
              >
                Leagues
              </Link>
              <Link
                href="/teams"
                className="text-sm font-semibold hover:text-blue-600 transition-colors py-2 px-3 rounded-lg hover:bg-blue-50"
              >
                Teams
              </Link>
              <Link
                href="/blog"
                className="text-sm font-semibold hover:text-blue-600 transition-colors py-2 px-3 rounded-lg hover:bg-blue-50"
              >
                Analysis
              </Link>
              <Link href="/signin">
                <Button
                  className="mt-3 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                  style={{
                    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

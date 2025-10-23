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
      className={`sticky top-0 z-50 w-full transition-all duration-500 overflow-hidden`}
      style={{
        background: scrolled
          ? "linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(20, 30, 50, 0.7) 100%)"
          : "linear-gradient(135deg, rgba(15, 23, 42, 0.65) 0%, rgba(20, 30, 50, 0.65) 100%)",
        backdropFilter: "blur(40px) saturate(180%) brightness(1.1)",
        WebkitBackdropFilter: "blur(40px) saturate(180%) brightness(1.1)",
        borderBottom: "1px solid rgba(59, 130, 246, 0.3)",
        boxShadow: scrolled
          ? "0 8px 40px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.3)"
          : "0 4px 25px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 -1px 0 rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-3 md:px-4 relative z-10">
        <div className="flex h-14 md:h-16 items-center justify-between gap-3 md:gap-6">
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
                className="h-10 md:h-14 w-auto transition-all duration-500 group-hover:scale-110 group-hover:brightness-125 filter drop-shadow-lg"
                loading="eager"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 rounded-full opacity-0 group-hover:opacity-100 blur-3xl transition-all duration-500" />
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
              className="relative px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold text-gray-100 hover:text-blue-200 transition-all duration-300 group"
            >
              Home
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-3/4 transition-all duration-300" />
            </Link>
            <Link
              href="/live"
              className="relative px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold text-gray-100 hover:text-blue-200 transition-all duration-300 flex items-center gap-2 group"
            >
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse-subtle shadow-lg shadow-green-400/50" />
              Live
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-3/4 transition-all duration-300" />
            </Link>
            <Link
              href="/leagues"
              className="relative px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold text-gray-100 hover:text-blue-200 transition-all duration-300 group"
            >
              Leagues
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-3/4 transition-all duration-300" />
            </Link>
            <Link
              href="/teams"
              className="relative px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold text-gray-100 hover:text-blue-200 transition-all duration-300 group"
            >
              Teams
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-3/4 transition-all duration-300" />
            </Link>
            <Link
              href="/blog"
              className="relative px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold text-gray-100 hover:text-blue-200 transition-all duration-300 group"
            >
              Analysis
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-3/4 transition-all duration-300" />
            </Link>
          </nav>

          {/* Right side actions */}
          <div
            className={`flex items-center gap-2 md:gap-3 transition-all duration-700 delay-200 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative hidden sm:block">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                className="relative group hover:bg-white/10 transition-all duration-300 h-9 md:h-10 w-9 md:w-10 rounded-lg md:rounded-xl text-gray-300 hover:text-blue-200"
              >
                <Search className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 h-4 md:h-5 w-4 md:w-5 group-hover:scale-110 transition-all duration-300" />
                <div className="absolute inset-0 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-500/30 to-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
              </Button>

              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 md:w-80 animate-slide-down">
                  <div
                    className="rounded-lg md:rounded-xl shadow-2xl border p-2 md:p-3 backdrop-blur-2xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(20, 30, 50, 0.8) 100%)",
                      borderColor: "rgba(59, 130, 246, 0.4)",
                      boxShadow: "0 8px 32px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="search"
                        placeholder="Search teams, leagues..."
                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-blue-500/30 rounded-lg focus:border-blue-400 focus:bg-white/10 focus:outline-none transition-all duration-300 text-xs md:text-sm text-gray-100 placeholder-gray-500 backdrop-blur-sm"
                        autoFocus
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/signin">
              <Button
                className={`hidden sm:inline-flex relative overflow-hidden group h-9 md:h-10 px-4 md:px-6 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 text-white ${
                  isLoaded ? "animate-scale-in" : "opacity-0"
                }`}
                style={{
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.85) 0%, rgba(34, 197, 233, 0.85) 100%)",
                  boxShadow:
                    "0 4px 20px rgba(59, 130, 246, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(0, 0, 0, 0.2)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />
                <User className="h-3 md:h-4 w-3 md:w-4 mr-1 md:mr-2 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10">Sign In</span>
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-white/10 transition-colors h-9 md:h-10 w-9 md:w-10 rounded-lg md:rounded-xl text-gray-300 hover:text-blue-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 md:h-6 w-5 md:w-6" /> : <Menu className="h-5 md:h-6 w-5 md:w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden py-3 md:py-4 border-t animate-slide-down backdrop-blur-xl"
            style={{
              background: "linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(20, 30, 50, 0.7) 100%)",
              borderColor: "rgba(59, 130, 246, 0.3)",
            }}
          >
            <div className="mb-3 md:mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-blue-500/30 rounded-lg focus:border-blue-400 focus:outline-none transition-all text-xs md:text-sm text-gray-100 placeholder-gray-500 backdrop-blur-sm"
                />
              </div>
            </div>
            <nav className="flex flex-col gap-1 md:gap-2">
              <Link
                href="/"
                className="text-xs md:text-sm font-semibold text-gray-100 hover:text-blue-200 transition-colors py-2 px-3 rounded-lg hover:bg-blue-500/10"
              >
                Home
              </Link>
              <Link
                href="/live"
                className="text-xs md:text-sm font-semibold text-gray-100 hover:text-blue-200 transition-colors py-2 px-3 rounded-lg hover:bg-blue-500/10 flex items-center gap-2"
              >
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse-subtle" />
                Live Matches
              </Link>
              <Link
                href="/leagues"
                className="text-xs md:text-sm font-semibold text-gray-100 hover:text-blue-200 transition-colors py-2 px-3 rounded-lg hover:bg-blue-500/10"
              >
                Leagues
              </Link>
              <Link
                href="/teams"
                className="text-xs md:text-sm font-semibold text-gray-100 hover:text-blue-200 transition-colors py-2 px-3 rounded-lg hover:bg-blue-500/10"
              >
                Teams
              </Link>
              <Link
                href="/blog"
                className="text-xs md:text-sm font-semibold text-gray-100 hover:text-blue-200 transition-colors py-2 px-3 rounded-lg hover:bg-blue-500/10"
              >
                Analysis
              </Link>
              <Link href="/signin">
                <Button
                  className="mt-2 md:mt-3 w-full text-white shadow-lg text-xs md:text-sm"
                  style={{
                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.85) 0%, rgba(34, 197, 233, 0.85) 100%)",
                    boxShadow: "0 4px 20px rgba(59, 130, 246, 0.4)",
                  }}
                >
                  <User className="h-3 md:h-4 w-3 md:w-4 mr-1 md:mr-2" />
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

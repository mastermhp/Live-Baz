"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Menu, X, Globe, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-blue-100"
          : "bg-white/80 backdrop-blur-sm border-b border-gray-100"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo with animation */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview%20%281%29-OFuZSfQKZS8jOPIWZsviyv6sNwxUjd.png"
                alt="LIVEBAZ"
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
            </div>
          </Link>

          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <Input
                type="search"
                placeholder="Search teams, leagues, or matches..."
                className="w-full pl-12 pr-4 h-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white transition-all duration-300 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex relative group hover:bg-blue-50 transition-colors"
            >
              <Bell className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:inline-flex hover:bg-blue-50 transition-colors">
              <Globe className="h-5 w-5 text-gray-600 hover:text-blue-600 transition-colors" />
            </Button>
            <Button className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 h-11 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 py-4 border-t border-gray-100">
          <Link
            href="/"
            className="relative text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors group"
          >
            Home
            <span className="absolute -bottom-4 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/live"
            className="relative text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2 group"
          >
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse-live" />
            Live Matches
            <span className="absolute -bottom-4 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/leagues"
            className="relative text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors group"
          >
            Leagues
            <span className="absolute -bottom-4 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/teams"
            className="relative text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors group"
          >
            Teams
            <span className="absolute -bottom-4 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/blog"
            className="relative text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors group"
          >
            Analysis & News
            <span className="absolute -bottom-4 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-500 group-hover:w-full transition-all duration-300" />
          </Link>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-slide-down">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="w-full pl-10 bg-muted/50" />
              </div>
            </div>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Home
              </Link>
              <Link
                href="/live"
                className="text-sm font-medium hover:text-primary transition-colors py-2 flex items-center gap-2"
              >
                <span className="h-2 w-2 rounded-full bg-success animate-pulse-live" />
                Live Matches
              </Link>
              <Link href="/leagues" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Leagues
              </Link>
              <Link href="/teams" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Teams
              </Link>
              <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Analysis & News
              </Link>
              <Button variant="default" className="mt-2 bg-primary hover:bg-primary/90">
                Sign In
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

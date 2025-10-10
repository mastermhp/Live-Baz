"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview%20%281%29-OFuZSfQKZS8jOPIWZsviyv6sNwxUjd.png"
              alt="LIVEBAZ"
              className="h-10 w-auto"
            />
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search teams, leagues, or matches..."
                className="w-full pl-10 bg-muted/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:inline-flex">
              <Globe className="h-5 w-5" />
            </Button>
            <Button variant="default" className="hidden md:inline-flex bg-primary hover:bg-primary/90">
              Sign In
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 py-3 border-t border-border/50">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link
            href="/live"
            className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
          >
            <span className="h-2 w-2 rounded-full bg-success animate-pulse-live" />
            Live Matches
          </Link>
          <Link href="/leagues" className="text-sm font-medium hover:text-primary transition-colors">
            Leagues
          </Link>
          <Link href="/teams" className="text-sm font-medium hover:text-primary transition-colors">
            Teams
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
            Analysis & News
          </Link>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-slide-up">
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

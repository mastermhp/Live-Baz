"use client"

import { useState } from "react"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LANGUAGES } from "@/lib/i18n"

export default function LanguageSwitcher({ currentLang = "en", onLanguageChange }) {
  const [open, setOpen] = useState(false)

  const handleLanguageChange = (lang) => {
    onLanguageChange?.(lang)
    setOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className="gap-2 text-xs md:text-sm bg-transparent"
        onClick={() => setOpen(!open)}
      >
        <Globe className="h-4 w-4" />
        {LANGUAGES[currentLang]?.code.toUpperCase()}
      </Button>

      {open && (
        <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-lg p-2 animate-slide-down z-10">
          {Object.entries(LANGUAGES).map(([code, config]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`w-full text-left px-4 py-2 rounded transition-colors text-xs md:text-sm font-medium ${
                currentLang === code ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              {config.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

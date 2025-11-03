"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import {
  LayoutDashboard,
  FileText,
  Trophy,
  Settings,
  BarChart3,
  Radio,
  LogOut,
  Plus,
  Search,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const searchParams = useSearchParams()

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { id: "articles", label: "Articles", icon: FileText, href: "/admin/articles" },
    { id: "matches", label: "Matches", icon: Trophy, href: "/admin/matches" },
    { id: "analytics", label: "Analytics", icon: BarChart3, href: "/admin/analytics" },
    { id: "monitoring", label: "Monitoring", icon: Radio, href: "/admin/monitoring" },
    { id: "settings", label: "Settings", icon: Settings, href: "/admin/settings" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full w-64 bg-white border-r border-gray-200 shadow-xl flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-green-500 flex items-center justify-center">
                  <LayoutDashboard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Admin Panel</h2>
                  <p className="text-xs text-gray-500">LIVEBAZ</p>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.id} href={item.href}>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 text-gray-700 hover:bg-gray-100`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                </Link>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-green-500 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@livebaz.com</p>
              </div>
              <Link href="/signin">
                <LogOut className="h-5 w-5 text-gray-400 hover:text-red-600 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <Suspense fallback={<div>Loading...</div>}>
        <div className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : ""}`}>
          {/* Top Bar */}
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                  <p className="text-sm text-gray-500">Manage your sports platform</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="search"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all text-sm w-64"
                  />
                </div>
                <Link href="/admin/articles">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    New Article
                  </Button>
                </Link>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6">{children}</main>
        </div>
      </Suspense>
    </div>
  )
}

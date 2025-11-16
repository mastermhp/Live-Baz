"use client"

import { useState, useEffect } from "react"
import { Save, Globe, Bell, Shield, Database, Mail, Key, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useAdminAuth } from "@/lib/hooks/use-admin-auth"

export default function SettingsPage() {
  const { authenticated, loading: authLoading } = useAdminAuth()
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  
  const [settings, setSettings] = useState({
    siteName: "LiveBaz",
    siteDescription: "Live Football Scores & Analysis",
    siteUrl: "https://livebaz.com",
    adminEmail: "admin@livebaz.com",
    enableNotifications: true,
    enableComments: true,
    maintenanceMode: false,
    apiRateLimit: 100,
    sessionTimeout: 30,
    enableAnalytics: true,
    enableCache: true,
    cacheExpiration: 3600,
    maxUploadSize: 10,
    allowedFileTypes: "jpg,jpeg,png,gif,webp",
    smtpHost: "",
    smtpPort: 587,
    smtpUser: "",
    smtpPassword: "",
    enableEmailNotifications: false,
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    try {
      const res = await fetch("/api/admin/settings")
      if (res.ok) {
        const data = await res.json()
        if (data.settings) {
          setSettings(prev => ({ ...prev, ...data.settings }))
        }
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error)
    }
  }

  async function handleSave() {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })

      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (error) {
      console.error("Failed to save settings:", error)
      alert("Failed to save settings")
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return <div className="text-center py-8">Loading...</div>
  }

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your platform configuration</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
        >
          <Save className="h-4 w-4 mr-2" />
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            <AlertCircle className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-green-800 font-semibold">Settings saved successfully!</p>
        </div>
      )}

      {/* General Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">General Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => updateSetting("siteName", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Email</label>
              <input
                type="email"
                value={settings.adminEmail}
                onChange={(e) => updateSetting("adminEmail", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Site Description</label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => updateSetting("siteDescription", e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Site URL</label>
            <input
              type="url"
              value={settings.siteUrl}
              onChange={(e) => updateSetting("siteUrl", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
            <Bell className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Features</h2>
        </div>

        <div className="space-y-4">
          {[
            { key: "enableNotifications", label: "Enable Notifications" },
            { key: "enableComments", label: "Enable Comments" },
            { key: "enableAnalytics", label: "Enable Analytics" },
            { key: "enableCache", label: "Enable Cache" },
            { key: "maintenanceMode", label: "Maintenance Mode" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="font-semibold text-gray-900">{item.label}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[item.key]}
                  onChange={(e) => updateSetting(item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Security</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">API Rate Limit (per minute)</label>
              <input
                type="number"
                value={settings.apiRateLimit}
                onChange={(e) => updateSetting("apiRateLimit", parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Session Timeout (minutes)</label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => updateSetting("sessionTimeout", parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Database */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
            <Database className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Database & Cache</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Cache Expiration (seconds)</label>
              <input
                type="number"
                value={settings.cacheExpiration}
                onChange={(e) => updateSetting("cacheExpiration", parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Max Upload Size (MB)</label>
              <input
                type="number"
                value={settings.maxUploadSize}
                onChange={(e) => updateSetting("maxUploadSize", parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Allowed File Types (comma-separated)</label>
            <input
              type="text"
              value={settings.allowedFileTypes}
              onChange={(e) => updateSetting("allowedFileTypes", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="jpg,jpeg,png,gif,webp"
            />
          </div>
        </div>
      </div>

      {/* Email Configuration */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
            <Mail className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Email Configuration</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-4">
            <span className="font-semibold text-gray-900">Enable Email Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableEmailNotifications}
                onChange={(e) => updateSetting("enableEmailNotifications", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">SMTP Host</label>
              <input
                type="text"
                value={settings.smtpHost}
                onChange={(e) => updateSetting("smtpHost", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="smtp.gmail.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">SMTP Port</label>
              <input
                type="number"
                value={settings.smtpPort}
                onChange={(e) => updateSetting("smtpPort", parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">SMTP Username</label>
              <input
                type="text"
                value={settings.smtpUser}
                onChange={(e) => updateSetting("smtpUser", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">SMTP Password</label>
              <input
                type="password"
                value={settings.smtpPassword}
                onChange={(e) => updateSetting("smtpPassword", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center">
            <AlertCircle className="h-5 w-5 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-red-900">Danger Zone</h2>
        </div>
        <p className="text-red-700 mb-4">These actions are irreversible. Please be careful.</p>
        <div className="flex gap-3">
          <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
            Clear Cache
          </Button>
          <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
            Reset Settings
          </Button>
        </div>
      </div>
    </div>
  )
}

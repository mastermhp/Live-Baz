"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { Twitter, Facebook, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  const [hoveredLink, setHoveredLink] = useState(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const socialIcons = [
    { name: "Twitter", icon: Twitter, color: "from-blue-400 to-blue-600" },
    { name: "Facebook", icon: Facebook, color: "from-blue-500 to-blue-700" },
    { name: "Instagram", icon: Instagram, color: "from-pink-400 to-purple-600" },
    { name: "YouTube", icon: Youtube, color: "from-red-500 to-red-700" },
  ]

  const quickLinks = [
    { label: "Live Matches", href: "/live" },
    { label: "Leagues", href: "/leagues" },
    { label: "Teams", href: "/teams" },
    { label: "Blog", href: "/blog" },
  ]

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ]

  return (
    <footer className="relative overflow-hidden rounded-t-[10px]">
      <div className="absolute inset-0">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 " />

        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Glass overlay with frosted effect */}
        <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-b from-white/10 via-white/5 to-white/10" />

        {/* Light reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-30" />

        {/* Border glow effect */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="md:col-span-1">
              <div className="mb-6">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview%20%281%29-OFuZSfQKZS8jOPIWZsviyv6sNwxUjd.png"
                  alt="LIVEBAZ"
                  className="h-12 w-auto mb-4 drop-shadow-lg"
                />
              </div>
              <p className="text-sm text-gray-200 leading-relaxed">
                Your ultimate destination for live scores, AI-powered predictions, and expert sports analytics.
              </p>
              <div className="flex gap-3 mt-6">
                {socialIcons.map((social, idx) => {
                  const IconComponent = social.icon
                  return (
                    <motion.a
                      key={idx}
                      href="#"
                      whileHover={{ scale: 1.2, rotate: 5, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${social.color} flex items-center justify-center text-white shadow-lg hover:shadow-2xl transition-all backdrop-blur-sm border border-white/20 hover:border-white/40`}
                      title={social.name}
                    >
                      <IconComponent size={20} />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="font-bold text-white mb-6 text-lg flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-300 to-cyan-300 rounded-full shadow-lg shadow-blue-500/50" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, idx) => (
                  <motion.li
                    key={idx}
                    onHoverStart={() => setHoveredLink(`quick-${idx}`)}
                    onHoverEnd={() => setHoveredLink(null)}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-200 hover:text-cyan-300 transition-colors flex items-center gap-2 group"
                    >
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-300 to-cyan-300 shadow-md shadow-blue-400/50"
                        animate={hoveredLink === `quick-${idx}` ? { scale: 1.5 } : { scale: 1 }}
                      />
                      <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="font-bold text-white mb-6 text-lg flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-green-300 to-emerald-300 rounded-full shadow-lg shadow-green-500/50" />
                Company
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((link, idx) => (
                  <motion.li
                    key={idx}
                    onHoverStart={() => setHoveredLink(`company-${idx}`)}
                    onHoverEnd={() => setHoveredLink(null)}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-200 hover:text-green-300 transition-colors flex items-center gap-2 group"
                    >
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-300 to-emerald-300 shadow-md shadow-green-400/50"
                        animate={hoveredLink === `company-${idx}` ? { scale: 1.5 } : { scale: 1 }}
                      />
                      <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="md:col-span-2">
              <h4 className="font-bold text-white mb-6 text-lg flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-purple-300 to-pink-300 rounded-full shadow-lg shadow-purple-500/50" />
                Stay Updated
              </h4>
              <p className="text-gray-200 text-sm mb-4">
                Subscribe to get the latest predictions and sports insights delivered to your inbox.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:border-cyan-300 focus:bg-white/20 transition-all backdrop-blur-md shadow-lg hover:bg-white/15"
                />
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 211, 238, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg transition-shadow backdrop-blur-sm border border-white/20"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <motion.p variants={itemVariants} className="text-sm text-gray-300">
              © 2025 LIVEBAZ. All rights reserved. Made with passion for sports fans worldwide.
            </motion.p>

            <motion.div variants={itemVariants} className="flex gap-8">
              {[
                { label: "Predictions", value: "10K+" },
                { label: "Matches", value: "50K+" },
                { label: "Users", value: "100K+" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-lg font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

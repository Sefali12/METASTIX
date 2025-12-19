"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { WalletConnect } from "./wallet-connect"
import { Send, Eye, Shield, Home } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/submit", label: "Submit", icon: Send },
    { href: "/viewer", label: "View", icon: Eye },
    { href: "/verify", label: "Verify", icon: Shield },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-[#AC6AFF]/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <Image
                src="/metastix-logo.png"
                alt="MetaStix Logo"
                width={32}
                height={32}
                className="relative rounded-full transition-transform group-hover:scale-110 sm:w-9 sm:h-9"
              />
            </div>
            <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-[#944BFF] to-[#AC6AFF] bg-clip-text text-transparent">
              METASTIX
            </span>
          </Link>

          {/* Navigation Links - Visible on all screen sizes */}
          <div className="flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? "text-white bg-[#944BFF]/20 border border-[#AC6AFF]/30 shadow-[0_0_10px_rgba(172,106,255,0.3)]"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline sm:inline">{link.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Wallet Connect */}
          <div className="flex items-center flex-shrink-0">
            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  )
}

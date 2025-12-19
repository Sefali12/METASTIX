"use client"

import { useState, useEffect, useRef } from "react"
import { Wallet, Check, AlertCircle, LogOut, ChevronDown, Copy, ExternalLink } from "lucide-react"
import { switchToFlowEVM } from "@/lib/contract"

export function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [networkName, setNetworkName] = useState<string>("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window === "undefined" || !isMounted) return

      try {
        const provider = getWalletProvider()
        if (!provider) return

        const accounts = await provider.request({
          method: "eth_accounts",
        }) as string[]

        if (accounts && accounts.length > 0) {
          setAddress(accounts[0])
          await checkNetwork(provider)
        }
      } catch (err) {
        // Silent fail - user hasn't connected yet
        console.debug("No wallet connected yet")
      }
    }

    checkConnection()
  }, [isMounted])

  // Check network
  const checkNetwork = async (provider: any) => {
    try {
      const chainId = await provider.request({ method: "eth_chainId" }) as string
      const chainIdNum = parseInt(chainId, 16)
      if (chainIdNum === 545) {
        setNetworkName("Flow EVM Testnet")
      } else {
        setNetworkName("Wrong Network")
        setError("Please switch to Flow EVM Testnet")
      }
    } catch (err) {
      console.error("Failed to check network:", err)
    }
  }

  // Helper function to get the correct wallet provider
  const getWalletProvider = () => {
    if (typeof window === "undefined") return null

    const win = window as unknown as {
      ethereum?: {
        providers?: Array<{
          isMetaMask?: boolean
          request: (args: { method: string }) => Promise<unknown>
          on?: (event: string, handler: (...args: unknown[]) => void) => void
          removeListener?: (event: string, handler: (...args: unknown[]) => void) => void
        }>
        isMetaMask?: boolean
        request: (args: { method: string }) => Promise<unknown>
        on?: (event: string, handler: (...args: unknown[]) => void) => void
        removeListener?: (event: string, handler: (...args: unknown[]) => void) => void
      }
    }

    // Handle multiple wallet providers
    if (win.ethereum?.providers && Array.isArray(win.ethereum.providers)) {
      // Prioritize MetaMask if available
      const metamask = win.ethereum.providers.find(p => p.isMetaMask)
      return metamask || win.ethereum.providers[0]
    }

    // Single provider case
    return win.ethereum || null
  }

  const connectWallet = async () => {
    if (typeof window === "undefined") {
      setError("Please open in a browser")
      return
    }

    // Prevent multiple simultaneous connection attempts
    if (isConnecting) {
      return
    }

    setIsConnecting(true)
    setError(null)

    try {
      const provider = getWalletProvider()

      if (!provider) {
        setError("No wallet detected. Please install MetaMask.")
        setIsConnecting(false)
        return
      }

      // Add timeout to prevent hanging
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Connection timeout")), 30000)
      })

      const accountsPromise = provider.request({
        method: "eth_requestAccounts",
      }) as Promise<string[]>

      const accounts = await Promise.race([accountsPromise, timeoutPromise])
      
      if (accounts && accounts.length > 0) {
        setAddress(accounts[0])

        // Switch to Flow EVM Testnet
        await switchToFlowEVM()
        await checkNetwork(provider)

        // Set up listener only after successful connection
        if (provider.on) {
          provider.on("accountsChanged", (newAccounts: unknown) => {
            const accts = newAccounts as string[]
            setAddress(accts[0] || null)
          })
          provider.on("chainChanged", () => {
            checkNetwork(provider)
          })
        }
      } else {
        setError("No accounts found. Please unlock your wallet.")
      }
    } catch (err: unknown) {
      console.error("Wallet connection error:", err)
      const errorMessage = err instanceof Error ? err.message : String(err)
      const lowerMsg = errorMessage.toLowerCase()
      
      if (lowerMsg.includes("timeout")) {
        setError("Connection timeout. Please try again.")
      } else if (lowerMsg.includes("unexpected")) {
        setError("Please disable conflicting wallet extensions and refresh.")
      } else if (lowerMsg.includes("rejected") || lowerMsg.includes("denied") || lowerMsg.includes("user rejected")) {
        setError("Connection rejected")
      } else if (lowerMsg.includes("already pending") || lowerMsg.includes("request already pending")) {
        setError("Check your wallet for a pending connection request")
      } else if (lowerMsg.includes("not found") || lowerMsg.includes("unavailable")) {
        setError("Wallet unavailable. Please unlock it.")
      } else if (lowerMsg.includes("failed to connect")) {
        setError("Please unlock MetaMask and check for pending requests")
      } else {
        setError("Connection failed. Please refresh and try again.")
      }
    } finally {
      setIsConnecting(false)
    }
  }

  const formatAddress = (addr: string) => {
    // Shorter format for mobile: 0x12...ab
    return `${addr.slice(0, 4)}...${addr.slice(-2)}`
  }

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const viewOnExplorer = () => {
    if (address) {
      window.open(`https://evm-testnet.flowscan.io/address/${address}`, "_blank")
    }
  }

  const disconnect = () => {
    setAddress(null)
    setNetworkName("")
    setIsDropdownOpen(false)
  }

  if (!isMounted) {
    return (
      <button className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#944BFF] to-[#AC6AFF] text-white font-medium text-[11px] sm:text-sm opacity-50">
        <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        Connect
      </button>
    )
  }

  if (address) {
    return (
      <div className="relative" ref={dropdownRef}>
        {/* Connected Button */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-[#944BFF]/10 to-[#AC6AFF]/10 border border-[#AC6AFF]/50 hover:border-[#AC6AFF] text-white font-medium text-[10px] sm:text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(172,106,255,0.3)]"
        >
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
            <span className="text-white/90 font-mono">{formatAddress(address)}</span>
          </div>
          <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 text-white/60 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full mt-2 right-0 w-64 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden z-50 animate-fade-in">
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/10 bg-gradient-to-r from-[#944BFF]/10 to-[#AC6AFF]/10">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                <span className="text-xs text-green-400 font-medium">Connected</span>
              </div>
              <p className="text-white font-mono text-sm">{formatAddress(address)}</p>
              {networkName && (
                <p className="text-white/50 text-xs mt-1">{networkName}</p>
              )}
            </div>

            {/* Actions */}
            <div className="p-2">
              <button
                onClick={copyAddress}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm"
              >
                <Copy className="w-4 h-4" />
                <span>{copied ? "Copied!" : "Copy Address"}</span>
                {copied && <Check className="w-4 h-4 text-green-400 ml-auto" />}
              </button>

              <button
                onClick={viewOnExplorer}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View on Explorer</span>
              </button>

              <div className="my-2 border-t border-white/10" />

              <button
                onClick={disconnect}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className="group flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#944BFF] to-[#AC6AFF] text-white font-medium text-[11px] sm:text-sm shadow-[0_0_15px_rgba(172,106,255,0.3)] sm:shadow-[0_0_20px_rgba(172,106,255,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(172,106,255,0.6)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <Wallet className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:scale-110" />
        {isConnecting ? (
          <span>...</span>
        ) : (
          <span>Connect</span>
        )}
      </button>
      {error && (
        <div className="absolute top-full mt-3 right-0 flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs whitespace-nowrap z-50 shadow-lg backdrop-blur-xl">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

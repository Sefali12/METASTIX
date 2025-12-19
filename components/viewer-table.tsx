"use client"

import type React from "react"

import { useState } from "react"
import { Search, Loader2, Database, Clock, Hash, AlertCircle } from "lucide-react"
import { getContract, stringToId } from "@/lib/contract"

interface FeedbackEntry {
  hash: string
  timestamp: number
}

export function ViewerTable() {
  const [orgId, setOrgId] = useState("")
  const [feedbackList, setFeedbackList] = useState<FeedbackEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const fetchFeedback = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!orgId.trim()) {
      setError("Please enter a name or organization")
      return
    }

    setIsLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const numericId = stringToId(orgId)
      const contract = await getContract(false)
      const count = await contract.getFeedbackCount(numericId)
      const entries: FeedbackEntry[] = []

      for (let i = 0; i < Number(count); i++) {
        const [hash, timestamp] = await contract.getFeedback(numericId, i)
        entries.push({
          hash: hash,
          timestamp: Number(timestamp),
        })
      }

      setFeedbackList(entries)
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch feedback"
      setError(errorMessage)
      setFeedbackList([])
    } finally {
      setIsLoading(false)
    }
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString()
  }

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`
  }

  const truncateHashMobile = (hash: string) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-0">
      <form onSubmit={fetchFeedback} className="mb-6 sm:mb-8">
        <div className="glass-panel rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-[0_0_40px_rgba(172,106,255,0.2)]">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={orgId}
                onChange={(e) => setOrgId(e.target.value)}
                placeholder="Enter name or organization"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/50 border-2 border-[#AC6AFF]/30 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-white/40 focus:outline-none focus:border-[#AC6AFF] focus:shadow-[0_0_20px_rgba(172,106,255,0.3)] transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#944BFF] to-[#AC6AFF] text-white font-semibold text-sm sm:text-base shadow-[0_0_20px_rgba(172,106,255,0.5)] transition-all hover:shadow-[0_0_40px_rgba(172,106,255,0.8)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> : <Search className="w-4 h-4 sm:w-5 sm:h-5" />}
              <span>Search</span>
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 mb-4 sm:mb-6 bg-red-500/20 border border-red-500/50 rounded-lg sm:rounded-xl text-red-400 text-xs sm:text-sm">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {hasSearched && !error && (
        <div className="glass-panel rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(172,106,255,0.2)]">
          <div className="p-3 sm:p-4 border-b border-[#AC6AFF]/30 flex items-center gap-2">
            <Database className="w-4 h-4 sm:w-5 sm:h-5 text-[#AC6AFF]" />
            <span className="text-white font-medium text-sm sm:text-base">{feedbackList.length} Feedback Entries Found</span>
          </div>

          {feedbackList.length === 0 ? (
            <div className="p-8 sm:p-12 text-center">
              <Database className="w-10 h-10 sm:w-12 sm:h-12 text-white/20 mx-auto mb-3 sm:mb-4" />
              <p className="text-white/60 text-sm sm:text-base">No feedback found for this organization</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#AC6AFF]/30">
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-[#AC6AFF]">
                        <div className="flex items-center gap-2">
                          <Hash className="w-3 h-3 sm:w-4 sm:h-4" />
                          Hash
                        </div>
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-[#AC6AFF]">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          Timestamp
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbackList.map((entry, index) => (
                      <tr key={index} className="border-b border-[#AC6AFF]/10 hover:bg-[#AC6AFF]/5 transition-colors">
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <code className="px-2 sm:px-3 py-1 bg-black/50 rounded-lg text-[#AC6AFF] font-mono text-xs sm:text-sm">
                            {truncateHash(entry.hash)}
                          </code>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-white/70 text-xs sm:text-sm">{formatTimestamp(entry.timestamp)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="sm:hidden divide-y divide-[#AC6AFF]/10">
                {feedbackList.map((entry, index) => (
                  <div key={index} className="p-4 hover:bg-[#AC6AFF]/5 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Hash className="w-3 h-3 text-[#AC6AFF]" />
                      <code className="px-2 py-0.5 bg-black/50 rounded text-[#AC6AFF] font-mono text-xs">
                        {truncateHashMobile(entry.hash)}
                      </code>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-xs">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimestamp(entry.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

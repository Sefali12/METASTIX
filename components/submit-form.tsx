"use client"

import type React from "react"

import { useState } from "react"
import { Send, Loader2, CheckCircle2, AlertCircle, Shield, Download } from "lucide-react"
import { getContract, generateHash, generateSalt, stringToId } from "@/lib/contract"

interface ProofData {
  recipient: string
  message: string
  salt: string
  hash: string
  timestamp: string
  transactionHash?: string
}

export function SubmitForm() {
  const [orgId, setOrgId] = useState("")
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [proofData, setProofData] = useState<ProofData | null>(null)

  const downloadProof = () => {
    if (!proofData) return
    
    const proofContent = JSON.stringify(proofData, null, 2)
    const blob = new Blob([proofContent], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `feedback-proof-${proofData.recipient}-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!orgId || !feedback) {
      setStatus("error")
      setMessage("Please fill in all fields")
      return
    }

    setIsSubmitting(true)
    setStatus("idle")
    setProofData(null)

    try {
      const salt = generateSalt()
      const hash = generateHash(feedback, salt)
      const numericId = stringToId(orgId)

      const contract = await getContract(true)
      const tx = await contract.submitFeedback(numericId, hash)
      const receipt = await tx.wait()

      // Create proof data
      const proof: ProofData = {
        recipient: orgId,
        message: feedback,
        salt: salt,
        hash: hash,
        timestamp: new Date().toISOString(),
        transactionHash: receipt?.hash || tx.hash
      }
      setProofData(proof)

      setStatus("success")
      setMessage("Feedback submitted! Download your proof file below to verify later.")
      setOrgId("")
      setFeedback("")
    } catch (err: unknown) {
      setStatus("error")
      const errorMessage = err instanceof Error ? err.message : "Failed to submit feedback"
      setMessage(errorMessage.includes("user rejected") ? "Transaction was rejected" : errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto px-4 sm:px-0">
      <div className="glass-panel rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_0_40px_rgba(172,106,255,0.2)]">
        <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
          <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#AC6AFF]" />
          <span className="text-white/60 text-xs sm:text-sm">End-to-end encrypted & anonymous</span>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="orgId" className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">
              Recipient Name / Organization
            </label>
            <input
              type="text"
              id="orgId"
              value={orgId}
              onChange={(e) => setOrgId(e.target.value)}
              placeholder="Enter name or organization (e.g., John, Acme Corp)"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/50 border-2 border-[#AC6AFF]/30 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-white/40 focus:outline-none focus:border-[#AC6AFF] focus:shadow-[0_0_20px_rgba(172,106,255,0.3)] transition-all"
            />
          </div>

          <div>
            <label htmlFor="feedback" className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">
              Your Feedback
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter your anonymous feedback..."
              rows={4}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/50 border-2 border-[#AC6AFF]/30 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-white/40 focus:outline-none focus:border-[#AC6AFF] focus:shadow-[0_0_20px_rgba(172,106,255,0.3)] transition-all resize-none"
            />
          </div>

          {status !== "idle" && (
            <div
              className={`flex items-start sm:items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl ${
                status === "success"
                  ? "bg-green-500/20 border border-green-500/50 text-green-400"
                  : "bg-red-500/20 border border-red-500/50 text-red-400"
              }`}
            >
              {status === "success" ? (
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
              ) : (
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
              )}
              <span className="text-xs sm:text-sm">{message}</span>
            </div>
          )}

          {proofData && (
            <button
              type="button"
              onClick={downloadProof}
              className="w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold text-sm sm:text-lg shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all hover:shadow-[0_0_50px_rgba(34,197,94,0.8)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Download Proof File (IMPORTANT!)</span>
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#944BFF] to-[#AC6AFF] text-white font-semibold text-sm sm:text-lg shadow-[0_0_30px_rgba(172,106,255,0.5)] transition-all hover:shadow-[0_0_50px_rgba(172,106,255,0.8)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Submit Feedback</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

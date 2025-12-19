"use client"

import type React from "react"
import { useState } from "react"
import { Upload, CheckCircle2, XCircle, Loader2, FileJson, Shield } from "lucide-react"
import { generateHash, stringToId, getContract } from "@/lib/contract"

interface ProofData {
  recipient: string
  message: string
  salt: string
  hash: string
  timestamp: string
  transactionHash?: string
}

export function VerifyProof() {
  const [proofData, setProofData] = useState<ProofData | null>(null)
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "valid" | "invalid" | "not-found">("idle")
  const [fileName, setFileName] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [inputMode, setInputMode] = useState<"file" | "manual">("file")
  
  // Manual input fields
  const [manualRecipient, setManualRecipient] = useState("")
  const [manualMessage, setManualMessage] = useState("")
  const [manualSalt, setManualSalt] = useState("")
  const [manualHash, setManualHash] = useState("")

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setError(null)
    setVerificationStatus("idle")

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string
        const data = JSON.parse(content) as ProofData
        
        // Validate required fields
        if (!data.recipient || !data.message || !data.salt || !data.hash) {
          setError("Invalid proof file: missing required fields")
          setProofData(null)
          return
        }
        
        setProofData(data)
      } catch (err) {
        setError("Invalid proof file: could not parse JSON")
        setProofData(null)
      }
    }
    reader.readAsText(file)
  }

  const handleManualSubmit = () => {
    if (!manualRecipient || !manualMessage || !manualSalt || !manualHash) {
      setError("Please fill in all fields")
      return
    }
    
    setError(null)
    setProofData({
      recipient: manualRecipient,
      message: manualMessage,
      salt: manualSalt,
      hash: manualHash,
      timestamp: "Unknown (manual entry)"
    })
  }

  const verifyProof = async () => {
    if (!proofData) return

    setVerificationStatus("verifying")
    setError(null)

    try {
      // Step 1: Recalculate hash from message + salt
      const calculatedHash = generateHash(proofData.message, proofData.salt)
      
      // Step 2: Check if hash matches
      if (calculatedHash.toLowerCase() !== proofData.hash.toLowerCase()) {
        setVerificationStatus("invalid")
        return
      }

      // Step 3: Check if hash exists on blockchain
      const numericId = stringToId(proofData.recipient)
      const contract = await getContract(false)
      const count = await contract.getFeedbackCount(numericId)

      let foundOnChain = false
      for (let i = 0; i < Number(count); i++) {
        const [hash] = await contract.getFeedback(numericId, i)
        if (hash.toLowerCase() === proofData.hash.toLowerCase()) {
          foundOnChain = true
          break
        }
      }

      if (foundOnChain) {
        setVerificationStatus("valid")
      } else {
        setVerificationStatus("not-found")
      }
    } catch (err) {
      setError("Failed to verify on blockchain. Please connect your wallet.")
      setVerificationStatus("idle")
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
      <div className="glass-panel rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_0_40px_rgba(172,106,255,0.2)]">
        <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
          <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#AC6AFF]" />
          <span className="text-white/60 text-xs sm:text-sm">Verify feedback proof on blockchain</span>
        </div>

        {/* Input Mode Toggle */}
        <div className="flex mb-4 sm:mb-6 bg-black/30 rounded-lg sm:rounded-xl p-1">
          <button
            type="button"
            onClick={() => { setInputMode("file"); setProofData(null); setVerificationStatus("idle"); }}
            className={`flex-1 py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              inputMode === "file"
                ? "bg-gradient-to-r from-[#944BFF] to-[#AC6AFF] text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => { setInputMode("manual"); setProofData(null); setVerificationStatus("idle"); }}
            className={`flex-1 py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              inputMode === "manual"
                ? "bg-gradient-to-r from-[#944BFF] to-[#AC6AFF] text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            Enter Manually
          </button>
        </div>

        {/* File Upload Mode */}
        {inputMode === "file" && (
          <div className="mb-4 sm:mb-6">
            <label className="block text-xs sm:text-sm font-medium text-white/80 mb-2">
              Upload Proof File
            </label>
            <label className="flex flex-col items-center justify-center w-full h-28 sm:h-32 border-2 border-[#AC6AFF]/30 border-dashed rounded-lg sm:rounded-xl cursor-pointer bg-black/30 hover:bg-black/50 transition-all hover:border-[#AC6AFF]/60">
              <div className="flex flex-col items-center justify-center pt-4 pb-5 sm:pt-5 sm:pb-6">
                <Upload className="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-[#AC6AFF]" />
                <p className="text-xs sm:text-sm text-white/60 text-center px-2">
                  {fileName ? fileName : "Click to upload proof JSON file"}
                </p>
              </div>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        )}

        {/* Manual Input Mode */}
        {inputMode === "manual" && (
          <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">
                Recipient Name / Organization
              </label>
              <input
                type="text"
                value={manualRecipient}
                onChange={(e) => setManualRecipient(e.target.value)}
                placeholder="e.g., John, Acme Corp"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/50 border-2 border-[#AC6AFF]/30 rounded-lg sm:rounded-xl text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#AC6AFF] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">
                Original Message
              </label>
              <textarea
                value={manualMessage}
                onChange={(e) => setManualMessage(e.target.value)}
                placeholder="Enter the original feedback message"
                rows={3}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/50 border-2 border-[#AC6AFF]/30 rounded-lg sm:rounded-xl text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#AC6AFF] transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">
                Salt (secret key)
              </label>
              <input
                type="text"
                value={manualSalt}
                onChange={(e) => setManualSalt(e.target.value)}
                placeholder="0x..."
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/50 border-2 border-[#AC6AFF]/30 rounded-lg sm:rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#AC6AFF] transition-all font-mono text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">
                Hash (from blockchain)
              </label>
              <input
                type="text"
                value={manualHash}
                onChange={(e) => setManualHash(e.target.value)}
                placeholder="0x..."
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/50 border-2 border-[#AC6AFF]/30 rounded-lg sm:rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#AC6AFF] transition-all font-mono text-xs sm:text-sm"
              />
            </div>
            <button
              type="button"
              onClick={handleManualSubmit}
              className="w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-[#AC6AFF]/20 border border-[#AC6AFF]/50 text-white text-sm font-medium transition-all hover:bg-[#AC6AFF]/30"
            >
              Load Proof Data
            </button>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 mb-4 sm:mb-6 bg-red-500/20 border border-red-500/50 rounded-lg sm:rounded-xl text-red-400">
            <XCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="text-xs sm:text-sm">{error}</span>
          </div>
        )}

        {/* Proof Details */}
        {proofData && (
          <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-4 bg-black/30 rounded-lg sm:rounded-xl border border-[#AC6AFF]/20">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <FileJson className="w-4 h-4 sm:w-5 sm:h-5 text-[#AC6AFF]" />
                <span className="text-white font-medium text-sm sm:text-base">Proof Details</span>
              </div>
              
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <div>
                  <span className="text-white/50">Recipient:</span>
                  <span className="ml-2 text-white">{proofData.recipient}</span>
                </div>
                <div>
                  <span className="text-white/50">Message:</span>
                  <p className="mt-1 text-white bg-black/30 p-2 sm:p-3 rounded-lg text-xs sm:text-sm">{proofData.message}</p>
                </div>
                <div className="break-all">
                  <span className="text-white/50">Hash:</span>
                  <span className="ml-2 text-[#AC6AFF] font-mono text-[10px] sm:text-xs">{proofData.hash}</span>
                </div>
                <div>
                  <span className="text-white/50">Submitted:</span>
                  <span className="ml-2 text-white">{new Date(proofData.timestamp).toLocaleString()}</span>
                </div>
                {proofData.transactionHash && (
                  <div className="break-all">
                    <span className="text-white/50">Transaction:</span>
                    <a 
                      href={`https://evm-testnet.flowscan.io/tx/${proofData.transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-[#AC6AFF] hover:underline font-mono text-[10px] sm:text-xs"
                    >
                      {proofData.transactionHash.slice(0, 16)}...
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Verify Button */}
            <button
              onClick={verifyProof}
              disabled={verificationStatus === "verifying"}
              className="w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#944BFF] to-[#AC6AFF] text-white font-semibold text-sm sm:text-lg shadow-[0_0_30px_rgba(172,106,255,0.5)] transition-all hover:shadow-[0_0_50px_rgba(172,106,255,0.8)] hover:scale-[1.02] disabled:opacity-50"
            >
              {verificationStatus === "verifying" ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  <span className="text-xs sm:text-base">Verifying on Blockchain...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                  Verify Proof
                </>
              )}
            </button>
          </div>
        )}

        {/* Verification Result */}
        {verificationStatus === "valid" && (
          <div className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 bg-green-500/20 border border-green-500/50 rounded-lg sm:rounded-xl">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-green-400" />
            <span className="text-green-400 font-semibold text-base sm:text-lg">Proof Verified! ✓</span>
            <p className="text-green-400/80 text-xs sm:text-sm text-center">
              This message was submitted to the blockchain on the specified date.
              The hash matches and exists on-chain.
            </p>
          </div>
        )}

        {verificationStatus === "invalid" && (
          <div className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 bg-red-500/20 border border-red-500/50 rounded-lg sm:rounded-xl">
            <XCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-400" />
            <span className="text-red-400 font-semibold text-base sm:text-lg">Invalid Proof ✗</span>
            <p className="text-red-400/80 text-xs sm:text-sm text-center">
              The message and salt do not match the hash.
              This proof file may have been tampered with.
            </p>
          </div>
        )}

        {verificationStatus === "not-found" && (
          <div className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 bg-yellow-500/20 border border-yellow-500/50 rounded-lg sm:rounded-xl">
            <XCircle className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-base sm:text-lg">Not Found on Blockchain</span>
            <p className="text-yellow-400/80 text-xs sm:text-sm text-center">
              The hash is valid but was not found on the blockchain for this recipient.
              The feedback may not have been submitted yet.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

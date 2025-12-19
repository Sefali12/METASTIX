"use client"

import { Navbar } from "@/components/navbar"
import { SubmitForm } from "@/components/submit-form"
import { Footer } from "@/components/footer"
import { Send } from "lucide-react"

export default function SubmitPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      {/* Header Section */}
      <div className="pt-20 sm:pt-24 md:pt-32 pb-6 sm:pb-8 md:pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#944BFF]/20 to-[#AC6AFF]/20 border-2 border-[#AC6AFF]/50 mb-4 sm:mb-6 shadow-[0_0_30px_rgba(172,106,255,0.3)]">
            <Send className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#AC6AFF]" />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-[#944BFF] to-[#AC6AFF] bg-clip-text text-transparent">
              Submit Anonymous Feedback
            </span>
          </h1>

          <div className="mb-4 sm:mb-6 md:mb-8">
            <div className="h-1 w-32 sm:w-40 md:w-48 mx-auto bg-gradient-to-r from-transparent via-[#AC6AFF] to-transparent rounded-full shadow-[0_0_20px_rgba(172,106,255,0.8)]" />
          </div>

          <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto leading-relaxed px-2">
            Your message is hashed before being stored on the blockchain. 
            Only you can prove what you wrote using the proof file.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="pb-32 sm:pb-24">
        <SubmitForm />
      </div>

      {/* Footer */}
      <Footer />

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 sm:w-96 h-64 sm:h-96 bg-[#944BFF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 sm:w-96 h-64 sm:h-96 bg-[#AC6AFF]/10 rounded-full blur-3xl" />
      </div>
    </main>
  )
}

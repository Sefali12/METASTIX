import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo with enhanced glow */}
          <div className="mb-6 sm:mb-10 flex justify-center animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-[#AC6AFF]/40 blur-[80px] rounded-full scale-150" />
              <div className="absolute inset-0 bg-[#944BFF]/30 blur-[40px] rounded-full" />
              <Image
                src="/metastix-logo.png"
                alt="MetaStix Logo"
                width={180}
                height={180}
                className="relative rounded-full shadow-[0_0_60px_rgba(172,106,255,0.6)] w-32 h-32 sm:w-44 sm:h-44"
                priority
              />
            </div>
          </div>

          {/* Title with better spacing */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-[#944BFF] via-[#AC6AFF] to-[#944BFF] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              METASTIX
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/70 mb-3 sm:mb-4 font-light tracking-wide px-4">
            Anonymous Blockchain Feedback System
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#AC6AFF]/50" />
            <div className="w-2 h-2 rounded-full bg-[#AC6AFF] shadow-[0_0_10px_rgba(172,106,255,0.8)]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#AC6AFF]/50" />
          </div>

          {/* Description */}
          <p className="text-white/50 max-w-2xl mx-auto mb-8 sm:mb-12 text-base sm:text-lg leading-relaxed px-4">
            Submit feedback securely using cryptographic hashing. Your identity stays private, 
            while your voice is recorded immutably on the blockchain.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <Link
              href="/submit"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#944BFF] to-[#AC6AFF] rounded-xl sm:rounded-2xl text-white font-semibold text-base sm:text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(172,106,255,0.4)] hover:shadow-[0_0_60px_rgba(172,106,255,0.6)]"
            >
              <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Submit Feedback
            </Link>
            <Link
              href="/viewer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 border border-[#AC6AFF]/50 rounded-xl sm:rounded-2xl text-white/80 font-semibold text-base sm:text-lg hover:bg-[#AC6AFF]/10 hover:border-[#AC6AFF] transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Feedback
            </Link>
          </div>
        </div>
      </section>

      {/* What Does This Do Section */}
      <section className="px-4 py-16 sm:py-24 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-16">
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#944BFF]/10 border border-[#AC6AFF]/20 text-[#AC6AFF] text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                What Does This Do?
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-sm sm:text-base px-4">
              A privacy-first feedback system powered by blockchain technology
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Card 1 */}
            <div className="group relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#AC6AFF]/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(172,106,255,0.15)]">
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#944BFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-11 h-11 sm:w-14 sm:h-14 bg-gradient-to-br from-[#944BFF] to-[#AC6AFF] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Anonymous Feedback</h3>
                <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                  Submit feedback about anyone or any organization without revealing your identity. Your message stays completely private.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#AC6AFF]/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(172,106,255,0.15)]">
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#944BFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-11 h-11 sm:w-14 sm:h-14 bg-gradient-to-br from-[#944BFF] to-[#AC6AFF] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Blockchain Storage</h3>
                <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                  Your feedback hash is stored permanently on the Flow blockchain. It cannot be deleted, modified, or censored by anyone.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#AC6AFF]/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(172,106,255,0.15)]">
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#944BFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-11 h-11 sm:w-14 sm:h-14 bg-gradient-to-br from-[#944BFF] to-[#AC6AFF] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Provable Later</h3>
                <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                  Download a proof file after submitting. Use it later to prove you wrote the feedback - only when you choose to reveal it.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#AC6AFF]/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(172,106,255,0.15)]">
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#944BFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-11 h-11 sm:w-14 sm:h-14 bg-gradient-to-br from-[#944BFF] to-[#AC6AFF] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Transparent Records</h3>
                <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                  Anyone can see that feedback exists for a recipient, but no one can read the actual message - only hashes are visible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Does It Work Section */}
      <section className="px-4 py-16 sm:py-24 relative">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-16">
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#944BFF]/10 border border-[#AC6AFF]/20 text-[#AC6AFF] text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              Process
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                How Does It Work?
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Simple 5-step process to submit anonymous feedback
            </p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-5 sm:left-7 top-0 bottom-0 w-px bg-gradient-to-b from-[#AC6AFF]/50 via-[#944BFF]/30 to-transparent hidden sm:block" />

            <div className="space-y-4 sm:space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4 sm:gap-6 items-start group">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-[#944BFF] to-[#AC6AFF] rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    1
                  </div>
                </div>
                <div className="flex-1 pb-4 sm:pb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">Write Your Feedback</h3>
                  <p className="text-white/60 text-sm sm:text-base">
                    Enter the recipient&apos;s name (person or organization) and write your anonymous feedback message.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 sm:gap-6 items-start group">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-[#944BFF] to-[#AC6AFF] rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    2
                  </div>
                </div>
                <div className="flex-1 pb-4 sm:pb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">Message Gets Hashed</h3>
                  <p className="text-white/60 text-sm sm:text-base">
                    Your message is converted into a unique cryptographic hash (like a fingerprint). The original message is never stored or sent anywhere.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 sm:gap-6 items-start group">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-[#944BFF] to-[#AC6AFF] rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    3
                  </div>
                </div>
                <div className="flex-1 pb-4 sm:pb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">Hash Stored on Blockchain</h3>
                  <p className="text-white/60 text-sm sm:text-base">
                    Only the hash is stored on the Flow blockchain. This creates an immutable, timestamped record that proves your feedback exists.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4 sm:gap-6 items-start group">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-[#944BFF] to-[#AC6AFF] rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    4
                  </div>
                </div>
                <div className="flex-1 pb-4 sm:pb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">Download Your Proof</h3>
                  <p className="text-white/60 text-sm sm:text-base">
                    You receive a proof file containing your original message, salt, and hash. Keep this safe - it&apos;s the only way to prove you wrote the feedback.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-4 sm:gap-6 items-start group">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-[#944BFF] to-[#AC6AFF] rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    5
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">Verify When Ready</h3>
                  <p className="text-white/60 text-sm sm:text-base">
                    Whenever you want to prove you wrote the feedback, upload your proof file on the Verify page. The system recalculates the hash and confirms it matches the blockchain record.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="px-4 py-16 sm:py-24 pb-24 sm:pb-32 relative">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-16">
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#944BFF]/10 border border-[#AC6AFF]/20 text-[#AC6AFF] text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              Applications
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Use Cases
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Perfect for situations where anonymous feedback matters
            </p>
          </div>

          {/* Use Case Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#AC6AFF]/40 transition-all duration-300 text-center hover:scale-105">
              <span className="text-2xl sm:text-4xl mb-2 sm:mb-3 block">🏢</span>
              <p className="text-white font-medium text-xs sm:text-base">Corporate Whistleblowing</p>
            </div>
            <div className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#AC6AFF]/40 transition-all duration-300 text-center hover:scale-105">
              <span className="text-2xl sm:text-4xl mb-2 sm:mb-3 block">📝</span>
              <p className="text-white font-medium text-xs sm:text-base">Anonymous HR Feedback</p>
            </div>
            <div className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#AC6AFF]/40 transition-all duration-300 text-center hover:scale-105">
              <span className="text-2xl sm:text-4xl mb-2 sm:mb-3 block">🎓</span>
              <p className="text-white font-medium text-xs sm:text-base">Student Course Reviews</p>
            </div>
            <div className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#AC6AFF]/40 transition-all duration-300 text-center hover:scale-105">
              <span className="text-2xl sm:text-4xl mb-2 sm:mb-3 block">⭐</span>
              <p className="text-white font-medium text-xs sm:text-base">Performance Reviews</p>
            </div>
            <div className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#AC6AFF]/40 transition-all duration-300 text-center hover:scale-105">
              <span className="text-2xl sm:text-4xl mb-2 sm:mb-3 block">🏛️</span>
              <p className="text-white font-medium text-xs sm:text-base">Government Transparency</p>
            </div>
            <div className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#AC6AFF]/40 transition-all duration-300 text-center hover:scale-105">
              <span className="text-2xl sm:text-4xl mb-2 sm:mb-3 block">💡</span>
              <p className="text-white font-medium text-xs sm:text-base">Anonymous Suggestions</p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-10 sm:mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#944BFF]/10 to-[#AC6AFF]/10 border border-[#AC6AFF]/20">
              <div className="text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Ready to get started?</h3>
                <p className="text-white/60 text-sm sm:text-base">Submit your first anonymous feedback today.</p>
              </div>
              <Link
                href="/submit"
                className="flex-shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#944BFF] to-[#AC6AFF] rounded-xl sm:rounded-2xl text-white font-semibold text-base sm:text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(172,106,255,0.4)]"
              >
                Get Started
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#944BFF]/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#944BFF]/10 rounded-full blur-3xl" />
        <div className="absolute top-2/3 -right-32 w-96 h-96 bg-[#AC6AFF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#AC6AFF]/5 rounded-full blur-[100px]" />
      </div>
    </main>
  )
}

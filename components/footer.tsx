import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Image
                src="/metastix-logo.png"
                alt="MetaStix"
                width={36}
                height={36}
                className="rounded-full sm:w-10 sm:h-10"
              />
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#944BFF] to-[#AC6AFF] bg-clip-text text-transparent">
                METASTIX
              </span>
            </Link>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed max-w-sm">
              A privacy-first anonymous feedback system built on Flow blockchain. 
              Your voice matters, your identity stays protected.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm sm:text-base mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/submit" className="text-white/50 hover:text-white text-xs sm:text-sm transition-colors">
                  Submit Feedback
                </Link>
              </li>
              <li>
                <Link href="/viewer" className="text-white/50 hover:text-white text-xs sm:text-sm transition-colors">
                  View Feedback
                </Link>
              </li>
              <li>
                <Link href="/verify" className="text-white/50 hover:text-white text-xs sm:text-sm transition-colors">
                  Verify Proof
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-sm sm:text-base mb-3 sm:mb-4">Resources</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a
                  href="https://developers.flow.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white text-xs sm:text-sm transition-colors flex items-center gap-1"
                >
                  Flow Docs
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://evm-testnet.flowscan.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white text-xs sm:text-sm transition-colors flex items-center gap-1"
                >
                  Flow Explorer
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://testnet-faucet.onflow.org/fund-account"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white text-xs sm:text-sm transition-colors flex items-center gap-1"
                >
                  Get Test FLOW
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
            <p className="text-white/40 text-xs sm:text-sm">
              © 2024 MetaStix. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-white/40 text-xs sm:text-sm">
              <span>Developed under</span>
              <span className="text-[#AC6AFF] font-medium">GENVO LABS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

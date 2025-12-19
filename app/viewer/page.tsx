import { Navbar } from "@/components/navbar"
import { ViewerTable } from "@/components/viewer-table"
import { Footer } from "@/components/footer"
import { Eye } from "lucide-react"

export default function ViewerPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      {/* Header Section */}
      <div className="pt-24 sm:pt-32 pb-8 sm:pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#944BFF]/20 to-[#AC6AFF]/20 border-2 border-[#AC6AFF]/50 mb-4 sm:mb-6 shadow-[0_0_30px_rgba(172,106,255,0.3)]">
            <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-[#AC6AFF]" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-[#944BFF] to-[#AC6AFF] bg-clip-text text-transparent">
              View On-Chain Feedback
            </span>
          </h1>

          <div className="mb-6 sm:mb-8">
            <div className="h-1 w-32 sm:w-48 mx-auto bg-gradient-to-r from-transparent via-[#AC6AFF] to-transparent rounded-full shadow-[0_0_20px_rgba(172,106,255,0.8)]" />
          </div>

          <p className="text-white/50 max-w-xl mx-auto leading-relaxed text-sm sm:text-base px-2">
            Query the blockchain to view anonymized feedback hashes for any person or organization. 
            Enter a name to see all feedback submitted for them.
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="px-3 sm:px-4 pb-24 sm:pb-16">
        <ViewerTable />
      </div>

      {/* Footer */}
      <Footer />

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#944BFF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-[#AC6AFF]/10 rounded-full blur-3xl" />
      </div>
    </main>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MetaStix - Anonymous Blockchain Feedback",
  description: "Submit anonymous feedback securely using cryptographic hashing on the blockchain",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script id="suppress-extension-errors" strategy="beforeInteractive">
          {`
            window.onerror = function(message, source, lineno, colno, error) {
              if (typeof source === 'string' && source.includes('chrome-extension://')) {
                return true;
              }
              return false;
            };
            window.addEventListener('unhandledrejection', function(event) {
              var reason = event.reason;
              if (reason && (reason.message === 'Unexpected error' || (reason.stack && reason.stack.includes('chrome-extension://')))) {
                event.preventDefault();
              }
            });
          `}
        </Script>
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

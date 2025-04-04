"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import ScrollAnimations from "./scroll-animations"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body className={inter.className}>
        <ScrollToTop />
        {children}
        <ScrollAnimations />
      </body>
    </html>
  )
}


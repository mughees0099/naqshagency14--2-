import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./clientLayout"

export const metadata: Metadata = {
  title: "Naqsh Agency | Premium Branding & Web Solutions",
  description:
    "Transform your business with Naqsh Agency's premium branding, web design, and SEO services. Elevate your brand, drive growth, and achieve measurable results.",
  generator: "v0.dev",
  keywords: "branding agency, web design, SEO services, brand strategy, website development, digital presence",
  openGraph: {
    title: "Naqsh Agency | Premium Branding & Web Solutions",
    description: "Transform your business with premium branding and web solutions",
    url: "https://naqsh.agency",
    siteName: "Naqsh Agency",
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}

import "./globals.css"

import "./globals.css"



import './globals.css'
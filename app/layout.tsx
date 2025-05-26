import type { Metadata } from "next"
import ClientLayout from "./clientLayout"
import "./globals.css"

export const metadata: Metadata = {
  title: "Naqsh Agency | Premium Branding & Web Solutions",
  description:
    "Transform your business with Naqsh Agency's premium branding, web design, and SEO services. Elevate your brand, drive growth, and achieve measurable results.",
  generator: "v0.dev",
  keywords: [
    "branding agency",
    "web design",
    "SEO services",
    "brand strategy",
    "website development",
    "digital presence",
    "naqsh agency",
    "premium branding",
    "web solutions",
    "business growth",
    "branding agency for startups",
    "Naqsh",
    "naqsh agency branding",
  ],
  authors: [{ name: "Naqsh Agency", url: "https://naqsh.agency" }],
  creator: "Naqsh Agency",
  publisher: "Naqsh Agency",
  metadataBase: new URL("https://naqsh.agency"),
  openGraph: {
    title: "Naqsh Agency | Premium Branding & Web Solutions",
    description:
      "Transform your business with premium branding and web solutions",
    url: "https://naqsh.agency",
    siteName: "Naqsh Agency",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naqsh Agency | Premium Branding & Web Solutions",
    description:
      "Transform your business with premium branding, web design, and SEO services.",
    site: "@naqsh_agency", // Replace with your Twitter handle if available
  },
  icons: {
    icon: "/naqsh-logo.png",
    shortcut: "/naqsh-logo.png",
    apple: "/naqsh-logo.png",
  },
  themeColor: "#ffffff",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
      "noarchive": false,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

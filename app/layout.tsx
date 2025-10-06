import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/hooks/use-language"
import Script from "next/script"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Spicy Town CSG - Pakistani Cuisine | Castel San Giovanni",
  description: "Spicy Town CSG è il miglior ristorante di cucina pakistana halal a Castel San Giovanni. Specialità in piatti tradizionali pakistani e sapori autentici. Vieni a trovarci!",
  keywords: [
    "Spicy Town CSG",
    "cucina pakistana",
    "Castel San Giovanni",
    "Castello",
    "ristorante",
    "piatti pakistani",
    "halal",
    "CSG"
  ],
  authors: [{ name: "Karim El Assali" }],
  creator: "Karim El Assali",
  publisher: "Karim El Assali",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    }
  },
  verification: {
    google: "TFC9KKJST9sPJHv4r0wz0xnmUb09ZFJFC8crGzgUSnk"
  },
  openGraph: {
    title: "Spicy Town CSG | Cucina Pakistana Autentica",
    description: "Prova i nostri piatti tradizionali pakistani e sapori autentici al ristorante Spicy Town CSG!",
    url: "https://spicy-town.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://spicy-town.vercel.app/premuim_logo.png",
        width: 1200,
        height: 630,
        alt: "Spicy Town CSG Logo"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spicy Town CSG | La migliore cucina pakistana della città",
    description: "Piatti pakistani tradizionali, sapori autentici. Visita Spicy Town CSG ora!",
    images: ["https://spicy-town.vercel.app/premuim_logo.png"],
  },
  metadataBase: new URL("https://spicy-town.vercel.app"),
  alternates: {
    canonical: "https://spicy-town.vercel.app/",
  },
  generator: "Next.js",
  applicationName: "Spicy Town CSG",
}

export const viewport = {
  themeColor: "#ffffff",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Spicy Town CSG",
    "image": "https://spicy-town.vercel.app/premuim_logo.png",
    "description": "Spicy Town CSG è un ristorante di cucina pakistana halal a Castel San Giovanni. Piatti tradizionali pakistani, sapori autentici e altro ancora.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Corso Giacomo Matteotti, 44",
      "addressLocality": "Castell San Giovanni",
      "postalCode": "29015",
      "addressCountry": "IT"
    },
    "url": "https://spicy-town.vercel.app",
    "telephone": "+39 3510505298",
    "servesCuisine": [
      "Pakistani Cuisine",
      "Traditional Pakistani Dishes",
      "Halal Food"
    ],
    "priceRange": "$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "11:00",
        "closes": "23:00"
      }
    ],
    "sameAs": [
      "https://instagram.com/spicytown_csg",
      "https://tiktok.com/@spicytown_csg",
      "https://wa.me/3510505298"
    ]
  }

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}

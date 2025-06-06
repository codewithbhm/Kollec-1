import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageTransition } from "@/components/ui/page-transition"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "KOLLEC.AZ - Kollec və Universitet Qəbulu | College Admission Azerbaijan",
    template: "%s | KOLLEC.AZ",
  },
  description:
    "Azərbaycanda kollec və universitet qəbulu, təhsil məsləhətləri, imtahan hazırlığı və akademik proqramlar haqqında məlumat. College admission, education consulting in Azerbaijan.",
  keywords: [
    "kollec",
    "college",
    "universitet",
    "university",
    "qəbul",
    "admission",
    "azerbaijan",
    "azərbaycan",
    "təhsil",
    "education",
    "bakalavr",
    "bachelor",
    "magistr",
    "master",
    "diplom",
    "diploma",
    "imtahan",
    "exam",
    "hazırlıq",
    "preparation",
    "məsləhət",
    "consulting",
    "akademik",
    "academic",
  ],
  authors: [{ name: "KOLLEC.AZ Team" }],
  creator: "KOLLEC.AZ",
  publisher: "KOLLEC.AZ",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kollec.az"),
  alternates: {
    canonical: "/",
    languages: {
      "az-AZ": "/az",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "az_AZ",
    url: "https://kollec.az",
    title: "KOLLEC.AZ - Kollec və Universitet Qəbulu",
    description: "Azərbaycanda kollec və universitet qəbulu, təhsil məsləhətləri və akademik proqramlar",
    siteName: "KOLLEC.AZ",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KOLLEC.AZ - Education Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KOLLEC.AZ - Kollec və Universitet Qəbulu",
    description: "Azərbaycanda kollec və universitet qəbulu, təhsil məsləhətləri və akademik proqramlar",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="az" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1e40af" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "KOLLEC.AZ",
              url: "https://kollec.az",
              description: "Azərbaycanda kollec və universitet qəbulu, təhsil məsləhətləri və akademik proqramlar",
              address: {
                "@type": "PostalAddress",
                addressCountry: "AZ",
                addressLocality: "Baku",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+994-77-273-01-01",
                contactType: "customer service",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}

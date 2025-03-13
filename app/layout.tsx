import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppSidebar } from "./(main)/_components/AppSidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Punk.AI - AI Video Generator",
  description: "Generate punk-style AI videos with customization options",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-background">
          <AppSidebar />
          <main className="flex-1 md:pl-64">{children}</main>
        </div>
      </body>
    </html>
  )
}
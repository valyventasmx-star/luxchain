import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LuxChain — Own the Extraordinary",
  description: "The world's premier crypto luxury marketplace. Purchase supercars, real estate, yachts, private jets and fine timepieces with Bitcoin, Ethereum and USDC.",
  keywords: "crypto luxury marketplace, buy car with bitcoin, buy yacht with ethereum, buy real estate with crypto, luxury assets crypto",
  openGraph: {
    title: "LuxChain — Own the Extraordinary",
    description: "Purchase supercars, real estate, yachts, private jets with Bitcoin, Ethereum & USDC. Worldwide delivery.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col" style={{ background: "var(--black)", color: "var(--white)" }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}

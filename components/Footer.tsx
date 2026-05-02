"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--black-2)",
        borderTop: "1px solid rgba(201,168,76,0.12)",
      }}
    >
      {/* 🔥 MÁS ANCHO + MÁS AIRE */}
      <div className="mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-16 py-20">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand (más ancho visual) */}
          <div className="md:col-span-1 pr-6">
            <div className="flex items-center gap-2 mb-5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #9A7A2E, #C9A84C)",
                }}
              >
                <span className="text-black font-bold text-sm">L</span>
              </div>

              <span className="text-xl font-bold tracking-wide">
                <span className="text-gold">Lux</span>
                <span style={{ color: "var(--white)" }}>Chain</span>
              </span>
            </div>

            <p
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: "var(--gray)" }}
            >
              The world&apos;s premier crypto luxury marketplace. Own the extraordinary with the currency of the future.
            </p>

            <div className="mt-6 flex gap-3">
              {["BTC", "ETH", "USDC"].map((c) => (
                <span
                  key={c}
                  className="px-3 py-1 rounded text-xs font-mono border"
                  style={{
                    borderColor: "rgba(201,168,76,0.3)",
                    color: "var(--gold)",
                    background: "rgba(201,168,76,0.05)",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="pl-2">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gold mb-5">
              Shop
            </h4>

            <ul className="space-y-3">
              {[
                { href: "/catalog?cat=cars", label: "Supercars" },
                { href: "/catalog?cat=watches", label: "Timepieces" },
                { href: "/catalog?cat=real-estate", label: "Real Estate" },
                { href: "/catalog?cat=yachts", label: "Yachts" },
                { href: "/catalog?cat=jets", label: "Private Jets" },
                { href: "/catalog?cat=jewelry", label: "Jewelry" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "var(--gray)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="pl-2">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gold mb-5">
              Info
            </h4>

            <ul className="space-y-3">
              {[
                { href: "/how-it-works", label: "How It Works" },
                { href: "/shipping", label: "Worldwide Shipping" },
                { href: "/escrow", label: "Crypto Escrow" },
                { href: "/kyc", label: "KYC / Compliance" },
                { href: "/faq", label: "FAQ" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "var(--gray)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="pl-2">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gold mb-5">
              Contact
            </h4>

            <ul className="space-y-3 text-sm" style={{ color: "var(--gray)" }}>
              <li>📧 concierge@luxchain.io</li>
              <li>📞 +1 (800) LUX-CHAIN</li>
              <li>🌐 Worldwide Service</li>
              <li>⏰ 24/7 Support</li>
            </ul>

            <div className="mt-6">
              <p
                className="text-xs uppercase tracking-widest mb-3"
                style={{ color: "var(--gray)" }}
              >
                Secure Payments
              </p>

              <div className="flex gap-2">
                <span className="px-2 py-1 rounded text-xs" style={{ background: "rgba(247,147,26,0.1)", color: "#F7931A" }}>
                  ₿ BTC
                </span>
                <span className="px-2 py-1 rounded text-xs" style={{ background: "rgba(98,126,234,0.1)", color: "#627EEA" }}>
                  Ξ ETH
                </span>
                <span className="px-2 py-1 rounded text-xs" style={{ background: "rgba(39,117,202,0.1)", color: "#2775CA" }}>
                  $ USDC
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-gold my-12" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <p className="text-xs" style={{ color: "var(--gray)" }}>
            © 2026 LuxChain. All rights reserved. Crypto prices are indicative only.
          </p>

          <div className="flex gap-6 text-xs" style={{ color: "var(--gray)" }}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

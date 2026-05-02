"use client";

import Link from "next/link";

const containerClass =
  "mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16";

export default function Footer() {
  return (
    <footer
      className="relative z-10"
      style={{
        background: "var(--black-2)",
        borderTop: "1px solid rgba(201,168,76,0.12)",
      }}
    >
      <div className={`${containerClass} py-20`}>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <div className="mb-5 flex items-center gap-2">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{
                  background: "linear-gradient(135deg, #9A7A2E, #C9A84C)",
                }}
              >
                <span className="text-sm font-bold text-black">L</span>
              </div>

              <span className="text-xl font-bold tracking-wide">
                <span className="text-gold">Lux</span>
                <span style={{ color: "var(--white)" }}>Chain</span>
              </span>
            </div>

            <p
              className="max-w-sm text-sm leading-relaxed"
              style={{ color: "var(--gray)" }}
            >
              The world&apos;s premier crypto luxury marketplace. Own the
              extraordinary with the currency of the future.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {["BTC", "ETH", "USDC"].map((c) => (
                <span
                  key={c}
                  className="rounded border px-3 py-1 font-mono text-xs"
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

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-gold">
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

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-gold">
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

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-gold">
              Contact
            </h4>

            <ul className="space-y-3 text-sm" style={{ color: "var(--gray)" }}>
              <li>📧 concierge@luxchain.io</li>
              <li>📞 +1 (800) LUX-CHAIN</li>
              <li>🌐 Worldwide Service</li>
              <li>⏰ 24/7 Support</li>
            </ul>

            <div className="mt-7">
              <p
                className="mb-3 text-xs uppercase tracking-widest"
                style={{ color: "var(--gray)" }}
              >
                Secure Payments
              </p>

              <div className="flex flex-wrap gap-2">
                <span
                  className="rounded px-2 py-1 text-xs"
                  style={{
                    background: "rgba(247,147,26,0.1)",
                    color: "#F7931A",
                    border: "1px solid rgba(247,147,26,0.2)",
                  }}
                >
                  ₿ BTC
                </span>
                <span
                  className="rounded px-2 py-1 text-xs"
                  style={{
                    background: "rgba(98,126,234,0.1)",
                    color: "#627EEA",
                    border: "1px solid rgba(98,126,234,0.2)",
                  }}
                >
                  Ξ ETH
                </span>
                <span
                  className="rounded px-2 py-1 text-xs"
                  style={{
                    background: "rgba(39,117,202,0.1)",
                    color: "#2775CA",
                    border: "1px solid rgba(39,117,202,0.2)",
                  }}
                >
                  $ USDC
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="divider-gold my-12" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs" style={{ color: "var(--gray)" }}>
            © 2026 LuxChain. All rights reserved. Crypto prices are indicative
            only.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-xs">
            <Link href="/privacy" style={{ color: "var(--gray)" }}>
              Privacy Policy
            </Link>
            <Link href="/terms" style={{ color: "var(--gray)" }}>
              Terms of Service
            </Link>
            <Link href="/cookies" style={{ color: "var(--gray)" }}>
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

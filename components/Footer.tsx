"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "var(--black)",
        borderTop: "1px solid rgba(201,168,76,0.14)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 0%, rgba(201,168,76,0.08), transparent 32%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-28">
          {/* Left */}
          <div>
            <div className="mb-8 flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full"
                style={{
                  background: "linear-gradient(135deg, #9A7A2E, #C9A84C)",
                }}
              >
                <span className="text-base font-bold text-black">L</span>
              </div>

              <span className="text-2xl font-bold tracking-wide">
                <span className="text-gold">Lux</span>
                <span style={{ color: "var(--white)" }}>Chain</span>
              </span>
            </div>

            <h3 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              Own the extraordinary with the currency of the future.
            </h3>

            <p
              className="mt-8 max-w-xl text-base leading-relaxed md:text-lg"
              style={{ color: "var(--gray)" }}
            >
              A private crypto luxury marketplace for supercars, real estate,
              yachts, private jets, timepieces, and rare assets.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {["BTC", "ETH", "USDC"].map((c) => (
                <span
                  key={c}
                  className="rounded-full border px-4 py-2 font-mono text-xs transition hover:scale-[1.03]"
                  style={{
                    borderColor: "rgba(201,168,76,0.28)",
                    color: "var(--gold)",
                    background: "rgba(201,168,76,0.05)",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:pt-4">
            <div>
              <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                Explore
              </h4>

              <ul className="space-y-4">
                {[
                  { href: "/catalog", label: "Catalog" },
                  { href: "/catalog?cat=cars", label: "Supercars" },
                  { href: "/catalog?cat=watches", label: "Timepieces" },
                  { href: "/catalog?cat=real-estate", label: "Real Estate" },
                  { href: "/catalog?cat=yachts", label: "Yachts" },
                  { href: "/catalog?cat=jets", label: "Private Jets" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm transition duration-300 hover:translate-x-1 hover:text-gold inline-block"
                      style={{ color: "var(--gray-light)" }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                Concierge
              </h4>

              <ul className="space-y-4">
                {[
                  { href: "/how-it-works", label: "How It Works" },
                  { href: "/consultation", label: "Book Consultation" },
                  { href: "/shipping", label: "Worldwide Shipping" },
                  { href: "/escrow", label: "Crypto Escrow" },
                  { href: "/kyc", label: "KYC / Compliance" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm transition duration-300 hover:translate-x-1 hover:text-gold inline-block"
                      style={{ color: "var(--gray-light)" }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <p
                  className="mb-3 text-xs uppercase tracking-[0.25em]"
                  style={{ color: "var(--gray)" }}
                >
                  Contact
                </p>
                <p className="text-sm" style={{ color: "var(--gray-light)" }}>
                  concierge@luxchain.io
                </p>
                <p className="mt-2 text-sm" style={{ color: "var(--gray)" }}>
                  24/7 private support
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="divider-gold my-16" />

        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="text-xs" style={{ color: "var(--gray)" }}>
            © 2026 LuxChain. All rights reserved. Crypto prices are indicative only.
          </p>

          <div className="flex flex-wrap gap-6 text-xs">
            {[
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms of Service" },
              { href: "/cookies", label: "Cookies" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="transition hover:text-gold"
                style={{ color: "var(--gray)" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

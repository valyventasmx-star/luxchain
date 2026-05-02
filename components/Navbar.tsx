"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Calendar } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [btcPrice, setBtcPrice] = useState<string>("78,463");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    )
      .then((r) => r.json())
      .then((d) => {
        const price = d?.bitcoin?.usd;
        if (price) setBtcPrice(price.toLocaleString());
      })
      .catch(() => null);
  }, []);

  const navLinks = [
    { href: "/catalog", label: "Catalog" },
    { href: "/catalog?cat=cars", label: "Cars" },
    { href: "/catalog?cat=real-estate", label: "Real Estate" },
    { href: "/catalog?cat=yachts", label: "Yachts" },
    { href: "/catalog?cat=jets", label: "Jets" },
    { href: "/how-it-works", label: "How It Works" },
  ];

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50"
      style={{
        background: scrolled ? "rgba(10,10,10,0.97)" : "rgba(10,10,10,0.72)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(201,168,76,0.12)",
      }}
    >
      {/* Ticker - always keeps the same height on desktop */}
      <div
        className="hidden h-7 items-center justify-center gap-6 overflow-hidden px-6 text-xs font-mono md:flex"
        style={{
          background: "rgba(201,168,76,0.06)",
          borderBottom: "1px solid rgba(201,168,76,0.08)",
          color: "var(--gray)",
        }}
      >
        <span>
          ₿ BTC <span className="text-gold">${btcPrice}</span>
        </span>
        <span>
          Ξ ETH <span className="text-gold">~$3,800</span>
        </span>
        <span>
          $ USDC <span className="text-gold">$1.00</span>
        </span>
        <span>
          🌐 Delivery to <span className="text-gold">180+ countries</span>
        </span>
      </div>

      <nav className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
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
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm tracking-wide transition-colors duration-200 hover:text-gold"
              style={{ color: "var(--gray-light)" }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/consultation"
            className="flex items-center gap-1.5 rounded px-4 py-2 text-sm transition-colors hover:bg-[rgba(201,168,76,0.1)]"
            style={{
              color: "var(--gold)",
              border: "1px solid rgba(201,168,76,0.3)",
            }}
          >
            <Calendar size={14} /> Consult
          </Link>

          <Link
            href="/catalog"
            className="btn-gold rounded px-5 py-2.5 text-sm uppercase tracking-widest"
          >
            Browse Assets
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-gold md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="border-t md:hidden"
          style={{
            background: "rgba(10,10,10,0.98)",
            borderColor: "rgba(201,168,76,0.2)",
          }}
        >
          <div className="flex flex-col gap-4 px-6 py-6">
            {[
              { href: "/catalog", label: "All Assets" },
              { href: "/catalog?cat=cars", label: "Supercars" },
              { href: "/catalog?cat=watches", label: "Timepieces" },
              { href: "/catalog?cat=real-estate", label: "Real Estate" },
              { href: "/catalog?cat=yachts", label: "Yachts" },
              { href: "/catalog?cat=jets", label: "Private Jets" },
              { href: "/how-it-works", label: "How It Works" },
              { href: "/consultation", label: "Book Consultation" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="py-1 text-sm tracking-wide text-gold"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}

            <Link
              href="/catalog"
              className="btn-gold mt-2 rounded px-5 py-3 text-center text-sm uppercase"
              onClick={() => setOpen(false)}
            >
              Browse Assets
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

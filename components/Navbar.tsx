"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Calendar } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [btcPrice, setBtcPrice] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
      .then(r => r.json())
      .then(d => setBtcPrice(d?.bitcoin?.usd?.toLocaleString()))
      .catch(() => null);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,10,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.12)" : "none",
      }}
    >
      {/* Live BTC ticker strip */}
      {btcPrice && (
        <div className="hidden md:flex justify-center py-1 text-xs font-mono gap-6"
          style={{ background: "rgba(201,168,76,0.06)", borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
          <span style={{ color: "var(--gray)" }}>₿ BTC <span className="text-gold">${btcPrice}</span></span>
          <span style={{ color: "var(--gray)" }}>Ξ ETH <span className="text-gold">~$3,800</span></span>
          <span style={{ color: "var(--gray)" }}>$ USDC <span className="text-gold">$1.00</span></span>
          <span style={{ color: "var(--gray)" }}>🌐 Delivery to <span className="text-gold">180+ countries</span></span>
        </div>
      )}

      <nav className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #9A7A2E, #C9A84C)" }}>
            <span className="text-black font-bold text-sm">L</span>
          </div>
          <span className="text-xl font-bold tracking-wide">
            <span className="text-gold">Lux</span>
            <span style={{ color: "var(--white)" }}>Chain</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {[
            { href: "/catalog", label: "Catalog" },
            { href: "/catalog?cat=cars", label: "Cars" },
            { href: "/catalog?cat=real-estate", label: "Real Estate" },
            { href: "/catalog?cat=yachts", label: "Yachts" },
            { href: "/catalog?cat=jets", label: "Jets" },
            { href: "/how-it-works", label: "How It Works" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm tracking-wide transition-colors duration-200"
              style={{ color: "var(--gray-light)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--gray-light)")}>
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/consultation"
            className="flex items-center gap-1.5 px-4 py-2 rounded text-sm transition-colors"
            style={{ color: "var(--gold)", border: "1px solid rgba(201,168,76,0.3)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.1)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            <Calendar size={14} /> Consult
          </Link>
          <Link href="/catalog" className="btn-gold px-5 py-2.5 rounded text-sm uppercase tracking-widest">
            Browse Assets
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-gold" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t" style={{ background: "rgba(10,10,10,0.98)", borderColor: "rgba(201,168,76,0.2)" }}>
          <div className="px-6 py-6 flex flex-col gap-4">
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
              <Link key={href} href={href} className="text-gold py-1 text-sm tracking-wide" onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
            <Link href="/catalog" className="btn-gold px-5 py-3 rounded text-sm uppercase text-center mt-2" onClick={() => setOpen(false)}>
              Browse Assets
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

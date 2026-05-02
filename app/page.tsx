import Link from "next/link";
import Image from "next/image";
import { categories, formatUSD, formatCrypto } from "@/lib/data";
import { getProductsFromSheet } from "@/lib/sheets";
import { products as staticProducts } from "@/lib/data";
import { ArrowRight, Shield, Globe, Zap, Lock, ChevronRight } from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  const sheetProducts = await getProductsFromSheet();
  const allProducts = sheetProducts && sheetProducts.length > 0 ? sheetProducts : staticProducts;
  const featured = allProducts.filter(p => p.featured).slice(0, 6);
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.65) 50%, rgba(10,10,10,0.9) 100%)" }} />
        </div>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 left-0 right-0 h-px opacity-15" style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />
          <div className="absolute bottom-1/3 left-0 right-0 h-px opacity-08" style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-semibold uppercase tracking-widest"
            style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "var(--gold)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
            Worldwide Crypto Payments Active — 180+ Countries
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6">
            <span style={{ color: "var(--white)" }}>Own The</span>
            <br />
            <span className="gold-text-gradient">Extraordinary</span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--gray-light)" }}>
            The world&apos;s premier crypto luxury marketplace. Supercars, real estate, yachts and private jets —
            acquired with Bitcoin, Ethereum or USDC. White glove service. Worldwide delivery.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation" className="btn-gold px-8 py-4 rounded text-sm uppercase tracking-widest inline-flex items-center justify-center gap-2">
              Book Private Consultation <ArrowRight size={16} />
            </Link>
            <Link href="/catalog" className="btn-outline-gold px-8 py-4 rounded text-sm uppercase tracking-widest inline-flex items-center justify-center gap-2">
              Browse Listings
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: "$2B+", label: "Assets Available" },
              { value: "180+", label: "Countries Served" },
              { value: "24/7", label: "Concierge Support" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gold">{value}</div>
                <div className="text-xs uppercase tracking-widest mt-1" style={{ color: "var(--gray)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs uppercase tracking-widest text-gold">Scroll</span>
          <div className="w-px h-10" style={{ background: "linear-gradient(180deg, var(--gold), transparent)" }} />
        </div>
      </section>

      {/* Editorial — As seen in */}
      <section className="py-10 px-6" style={{ background: "var(--black-2)", borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-center mb-6" style={{ color: "var(--gray)" }}>Trusted Worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-40">
            {["Forbes", "Bloomberg", "CoinDesk", "Robb Report", "Hypebeast"].map(brand => (
              <span key={brand} className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--gray-light)", fontStyle: "italic" }}>
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-6" style={{ background: "var(--black-2)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-gold mb-3">Browse by Category</p>
            <h2 className="text-3xl md:text-4xl font-bold">The Finest Collection</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(cat => (
              <Link key={cat.id} href={`/catalog?cat=${cat.id}`}
                className="card-luxury hover-glow rounded-xl p-5 text-center flex flex-col items-center gap-3 group">
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <div className="text-sm font-semibold group-hover:text-gold transition-colors">{cat.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--gray)" }}>{cat.count} items</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-24 px-6" style={{ background: "var(--black)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-gold mb-3">Handpicked by Our Concierge</p>
              <h2 className="text-3xl md:text-4xl font-bold">Featured Acquisitions</h2>
            </div>
            <Link href="/catalog" className="btn-outline-gold px-5 py-2.5 rounded text-sm hidden md:flex items-center gap-2">
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(product => (
              <Link key={product.id} href={`/product/${product.id}`} className="card-luxury hover-glow rounded-2xl overflow-hidden group block">
                <div className="relative h-56 overflow-hidden">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded text-xs font-bold tracking-widest"
                      style={{ background: "var(--gold)", color: "var(--black)" }}>
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded text-xs font-mono"
                    style={{ background: "rgba(10,10,10,0.85)", color: "var(--gold)", border: "1px solid rgba(201,168,76,0.3)" }}>
                    {formatCrypto(product.cryptoPrices.BTC, "BTC")}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-widest mb-0.5 text-gold">{product.brand}</p>
                  <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
                  <p className="text-xs mt-1 mb-3" style={{ color: "var(--gray)" }}>📍 {product.location}</p>
                  <div className="divider-gold my-3" />
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-bold text-gold">{formatUSD(product.price)}</div>
                    <div className="text-xs btn-outline-gold px-3 py-1.5 rounded">Inquire</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — editorial */}
      <section className="py-28 px-6" style={{ background: "var(--black-3)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-gold mb-4">The LuxChain Process</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-5">Acquisition in 4 Steps</h2>
            <p className="text-base" style={{ color: "var(--gray)" }}>From first contact to global delivery — our concierge handles everything.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", icon: "🔍", title: "Discover", desc: "Browse or describe what you want. Our team sources off-market assets worldwide." },
              { step: "02", icon: "🤝", title: "Consult", desc: "A senior concierge is assigned within 2 hours to guide your acquisition." },
              { step: "03", icon: "🔐", title: "Secure", desc: "Pay in BTC, ETH or USDC to our audited escrow. Funds protected until delivery." },
              { step: "04", icon: "🌍", title: "Receive", desc: "Your asset is delivered anywhere in the world with full legal documentation." },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="rounded-2xl flex flex-col items-center text-center p-8"
                style={{ background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.12)" }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-5"
                  style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.22)" }}>
                  {icon}
                </div>
                <div className="text-xs font-mono text-gold mb-2 tracking-widest">{step}</div>
                <h3 className="font-bold text-lg mb-3">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--gray)" }}>{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link href="/consultation" className="btn-gold px-10 py-4 rounded text-sm uppercase tracking-widest inline-flex items-center gap-2">
              Book Your Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6" style={{ background: "var(--black)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-gold mb-4">Client Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-bold">Trusted by Ultra-HNW Buyers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "LuxChain made buying my Rolls-Royce with ETH completely seamless. The concierge handled everything — KYC, customs, delivery to Dubai. Impeccable service.",
                name: "A. Al-Rashidi",
                role: "Private Investor, UAE",
                asset: "Rolls-Royce Phantom · $680,000",
              },
              {
                quote: "I was skeptical about buying real estate in Monaco with Bitcoin. LuxChain's legal team and escrow system gave me complete peace of mind. The transaction was flawless.",
                name: "M. Beaumont",
                role: "Tech Entrepreneur, France",
                asset: "Monaco Penthouse · $42M",
              },
              {
                quote: "The Gulfstream G700 acquisition was handled with extraordinary professionalism. LuxChain negotiated a better price and managed the entire ferry flight delivery.",
                name: "J. Okonkwo",
                role: "CEO, Lagos & London",
                asset: "Gulfstream G700 · $78M",
              },
            ].map(({ quote, name, role, asset }) => (
              <div key={name} className="rounded-2xl p-8 flex flex-col relative overflow-hidden"
                style={{ background: "var(--black-2)", border: "1px solid rgba(201,168,76,0.15)" }}>
                <div className="absolute top-4 left-6 text-gold font-serif select-none pointer-events-none"
                  style={{ fontSize: "6rem", lineHeight: 1, opacity: 0.12 }}>&ldquo;</div>
                <p className="text-base leading-relaxed flex-1 pt-6 relative z-10" style={{ color: "var(--gray-light)" }}>{quote}</p>
                <div className="divider-gold my-6" />
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm mt-1" style={{ color: "var(--gray)" }}>{role}</p>
                  <p className="text-sm text-gold mt-2 font-mono">{asset}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-28 px-6" style={{ background: "var(--black-2)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-gold mb-4">Why LuxChain</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Built for the Ultra-Premium Buyer</h2>
            <p className="text-base" style={{ color: "var(--gray)" }}>Every transaction is protected, compliant, and delivered with white-glove precision.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: <Shield size={36} />, title: "Escrow Smart Contract", desc: "Audited escrow holds your funds until confirmed delivery. Zero counterparty risk." },
              { icon: <Globe size={36} />, title: "Worldwide Logistics", desc: "Specialist partners in 180+ countries for any asset type — cars, jets, real estate." },
              { icon: <Zap size={36} />, title: "Instant Settlement", desc: "Crypto payments settle in minutes with zero bank friction or wire delays." },
              { icon: <Lock size={36} />, title: "Full Compliance", desc: "KYC, AML, export/import, title transfer and legal documentation — all handled." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-8 flex flex-col items-center text-center gap-5"
                style={{ background: "var(--black-3)", border: "1px solid rgba(201,168,76,0.12)" }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-gold"
                  style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
                  {icon}
                </div>
                <h3 className="font-bold text-base">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--gray)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: "var(--black)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Acquire<br /><span className="gold-text-gradient">Your Next Trophy Asset?</span>
          </h2>
          <p className="text-lg mb-10" style={{ color: "var(--gray-light)" }}>
            Speak privately with our concierge. No obligation. 100% confidential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation" className="btn-gold px-10 py-5 rounded text-base uppercase tracking-widest inline-flex items-center gap-2">
              Book Consultation <ArrowRight size={18} />
            </Link>
            <Link href="/catalog" className="btn-outline-gold px-10 py-5 rounded text-base uppercase tracking-widest inline-flex items-center gap-2">
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

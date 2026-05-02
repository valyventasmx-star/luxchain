import Link from "next/link";
import Image from "next/image";
import { categories, formatUSD, formatCrypto } from "@/lib/data";
import { getProductsFromSheet } from "@/lib/sheets";
import { products as staticProducts } from "@/lib/data";
import {
  ArrowRight,
  Shield,
  Globe,
  Zap,
  Lock,
  ChevronRight,
} from "lucide-react";

export const revalidate = 60;

const containerClass =
  "mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16";

export default async function HomePage() {
  const sheetProducts = await getProductsFromSheet();
  const allProducts =
    sheetProducts && sheetProducts.length > 0 ? sheetProducts : staticProducts;

  const featured = allProducts.filter((p) => p.featured).slice(0, 6);

  return (
    <div className="w-full overflow-x-hidden" style={{ background: "var(--black)" }}>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-[120px] md:pt-[132px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.68) 50%, rgba(10,10,10,0.94) 100%)",
            }}
          />
        </div>

        <div className={`${containerClass} relative z-10 flex flex-col items-center text-center`}>
          <div
            className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(201,168,76,0.1)",
              border: "1px solid rgba(201,168,76,0.3)",
              color: "var(--gold)",
            }}
          >
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            Worldwide Crypto Payments Active — 180+ Countries
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-none tracking-tight md:text-7xl lg:text-8xl">
            <span style={{ color: "var(--white)" }}>Own The</span>
            <br />
            <span className="gold-text-gradient">Extraordinary</span>
          </h1>

          <p
            className="mx-auto mb-10 max-w-2xl text-center text-lg leading-relaxed md:text-xl"
            style={{ color: "var(--gray-light)" }}
          >
            The world&apos;s premier crypto luxury marketplace. Supercars, real
            estate, yachts and private jets — acquired with Bitcoin, Ethereum or
            USDC. White glove service. Worldwide delivery.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/consultation"
              className="btn-gold inline-flex items-center justify-center gap-2 rounded px-8 py-4 text-sm uppercase tracking-widest"
            >
              Book Private Consultation <ArrowRight size={16} />
            </Link>

            <Link
              href="/catalog"
              className="btn-outline-gold inline-flex items-center justify-center gap-2 rounded px-8 py-4 text-sm uppercase tracking-widest"
            >
              Browse Listings
            </Link>
          </div>

          <div className="mx-auto mt-14 grid w-full max-w-2xl grid-cols-3 gap-6 md:gap-10">
            {[
              { value: "$2B+", label: "Assets Available" },
              { value: "180+", label: "Countries Served" },
              { value: "24/7", label: "Concierge Support" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-gold md:text-3xl">
                  {value}
                </div>
                <div
                  className="mt-1 text-xs uppercase tracking-widest"
                  style={{ color: "var(--gray)" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* As seen in */}
      <section
        className="border-y py-10"
        style={{
          background: "var(--black-2)",
          borderColor: "rgba(201,168,76,0.08)",
        }}
      >
        <div className={containerClass}>
          <p
            className="mb-6 text-center text-xs uppercase tracking-widest"
            style={{ color: "var(--gray)" }}
          >
            Trusted Worldwide
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 opacity-40 md:gap-16">
            {["Forbes", "Bloomberg", "CoinDesk", "Robb Report", "Hypebeast"].map(
              (brand) => (
                <span
                  key={brand}
                  className="text-sm font-bold uppercase tracking-widest"
                  style={{
                    color: "var(--gray-light)",
                    fontStyle: "italic",
                  }}
                >
                  {brand}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24" style={{ background: "var(--black-2)" }}>
        <div className={containerClass}>
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs uppercase tracking-widest text-gold">
              Browse by Category
            </p>
            <h2 className="text-3xl font-bold md:text-5xl">
              The Finest Collection
            </h2>
          </div>

          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalog?cat=${cat.id}`}
                className="card-luxury hover-glow group flex min-h-[140px] flex-col items-center justify-center gap-3 rounded-xl p-5 text-center"
              >
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <div className="text-sm font-semibold transition-colors group-hover:text-gold">
                    {cat.label}
                  </div>
                  <div
                    className="mt-0.5 text-xs"
                    style={{ color: "var(--gray)" }}
                  >
                    {cat.count} items
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-28" style={{ background: "var(--black)" }}>
        <div className={containerClass}>
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs uppercase tracking-widest text-gold">
                Handpicked by Our Concierge
              </p>
              <h2 className="text-3xl font-bold md:text-5xl">
                Featured Acquisitions
              </h2>
            </div>

            <Link
              href="/catalog"
              className="btn-outline-gold hidden items-center gap-2 rounded px-5 py-2.5 text-sm md:flex"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="card-luxury hover-glow group block w-full overflow-hidden rounded-2xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {product.badge && (
                    <span
                      className="absolute left-3 top-3 rounded px-2.5 py-1 text-xs font-bold tracking-widest"
                      style={{
                        background: "var(--gold)",
                        color: "var(--black)",
                      }}
                    >
                      {product.badge}
                    </span>
                  )}

                  <div
                    className="absolute bottom-3 right-3 rounded px-2.5 py-1 font-mono text-xs"
                    style={{
                      background: "rgba(10,10,10,0.85)",
                      color: "var(--gold)",
                      border: "1px solid rgba(201,168,76,0.3)",
                    }}
                  >
                    {formatCrypto(product.cryptoPrices.BTC, "BTC")}
                  </div>
                </div>

                <div className="p-5">
                  <p className="mb-0.5 text-xs uppercase tracking-widest text-gold">
                    {product.brand}
                  </p>
                  <h3 className="text-lg font-semibold leading-tight">
                    {product.name}
                  </h3>
                  <p
                    className="mb-3 mt-1 text-xs"
                    style={{ color: "var(--gray)" }}
                  >
                    📍 {product.location}
                  </p>

                  <div className="divider-gold my-3" />

                  <div className="flex items-center justify-between gap-4">
                    <div className="text-lg font-bold text-gold">
                      {formatUSD(product.price)}
                    </div>
                    <div className="btn-outline-gold rounded px-3 py-1.5 text-xs">
                      Inquire
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-28" style={{ background: "var(--black-3)" }}>
        <div className={containerClass}>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-4 text-xs uppercase tracking-widest text-gold">
              The LuxChain Process
            </p>
            <h2 className="mb-5 text-4xl font-bold md:text-6xl">
              Acquisition in 4 Steps
            </h2>
            <p className="text-base" style={{ color: "var(--gray)" }}>
              From first contact to global delivery — our concierge handles
              everything.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                step: "01",
                icon: "🔍",
                title: "Discover",
                desc: "Browse or describe what you want. Our team sources off-market assets worldwide.",
              },
              {
                step: "02",
                icon: "🤝",
                title: "Consult",
                desc: "A senior concierge is assigned within 2 hours to guide your acquisition.",
              },
              {
                step: "03",
                icon: "🔐",
                title: "Secure",
                desc: "Pay in BTC, ETH or USDC to our audited escrow. Funds protected until delivery.",
              },
              {
                step: "04",
                icon: "🌍",
                title: "Receive",
                desc: "Your asset is delivered anywhere in the world with full legal documentation.",
              },
            ].map(({ step, icon, title, desc }) => (
              <div
                key={step}
                className="flex min-h-[310px] flex-col items-center rounded-2xl p-8 text-center"
                style={{
                  background: "rgba(201,168,76,0.04)",
                  border: "1px solid rgba(201,168,76,0.12)",
                }}
              >
                <div
                  className="mb-5 flex h-20 w-20 items-center justify-center rounded-full text-4xl"
                  style={{
                    background: "rgba(201,168,76,0.08)",
                    border: "1px solid rgba(201,168,76,0.22)",
                  }}
                >
                  {icon}
                </div>

                <div className="mb-2 font-mono text-xs tracking-widest text-gold">
                  {step}
                </div>
                <h3 className="mb-3 text-lg font-bold">{title}</h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--gray)" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/consultation"
              className="btn-gold inline-flex items-center gap-2 rounded px-10 py-4 text-sm uppercase tracking-widest"
            >
              Book Your Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28" style={{ background: "var(--black)" }}>
        <div className={containerClass}>
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs uppercase tracking-widest text-gold">
              Client Testimonials
            </p>
            <h2 className="text-4xl font-bold md:text-6xl">
              Trusted by Ultra-HNW Buyers
            </h2>
          </div>

          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
            {[
              {
                quote:
                  "LuxChain made buying my Rolls-Royce with ETH completely seamless. The concierge handled everything — KYC, customs, delivery to Dubai. Impeccable service.",
                name: "A. Al-Rashidi",
                role: "Private Investor, UAE",
                asset: "Rolls-Royce Phantom · $680,000",
              },
              {
                quote:
                  "I was skeptical about buying real estate in Monaco with Bitcoin. LuxChain's legal team and escrow system gave me complete peace of mind. The transaction was flawless.",
                name: "M. Beaumont",
                role: "Tech Entrepreneur, France",
                asset: "Monaco Penthouse · $42M",
              },
              {
                quote:
                  "The Gulfstream G700 acquisition was handled with extraordinary professionalism. LuxChain negotiated a better price and managed the entire ferry flight delivery.",
                name: "J. Okonkwo",
                role: "CEO, Lagos & London",
                asset: "Gulfstream G700 · $78M",
              },
            ].map(({ quote, name, role, asset }) => (
              <div
                key={name}
                className="relative flex min-h-[300px] flex-col overflow-hidden rounded-2xl p-8"
                style={{
                  background: "var(--black-2)",
                  border: "1px solid rgba(201,168,76,0.15)",
                }}
              >
                <div
                  className="pointer-events-none absolute left-6 top-4 select-none font-serif text-gold"
                  style={{ fontSize: "6rem", lineHeight: 1, opacity: 0.12 }}
                >
                  &ldquo;
                </div>

                <p
                  className="relative z-10 flex-1 pt-6 text-base leading-relaxed"
                  style={{ color: "var(--gray-light)" }}
                >
                  {quote}
                </p>

                <div className="divider-gold my-6" />

                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="mt-1 text-sm" style={{ color: "var(--gray)" }}>
                    {role}
                  </p>
                  <p className="mt-2 font-mono text-sm text-gold">{asset}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-28" style={{ background: "var(--black-2)" }}>
        <div className={containerClass}>
          <div className="mx-auto mb-16 max-w-4xl text-center">
            <p className="mb-4 text-xs uppercase tracking-widest text-gold">
              Why LuxChain
            </p>
            <h2 className="mb-4 text-4xl font-bold md:text-6xl">
              Built for the Ultra-Premium Buyer
            </h2>
            <p className="text-base" style={{ color: "var(--gray)" }}>
              Every transaction is protected, compliant, and delivered with
              white-glove precision.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: <Shield size={36} />,
                title: "Escrow Smart Contract",
                desc: "Audited escrow holds your funds until confirmed delivery. Zero counterparty risk.",
              },
              {
                icon: <Globe size={36} />,
                title: "Worldwide Logistics",
                desc: "Specialist partners in 180+ countries for any asset type — cars, jets, real estate.",
              },
              {
                icon: <Zap size={36} />,
                title: "Instant Settlement",
                desc: "Crypto payments settle in minutes with zero bank friction or wire delays.",
              },
              {
                icon: <Lock size={36} />,
                title: "Full Compliance",
                desc: "KYC, AML, export/import, title transfer and legal documentation — all handled.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="flex min-h-[270px] flex-col items-center gap-5 rounded-2xl p-8 text-center"
                style={{
                  background: "var(--black-3)",
                  border: "1px solid rgba(201,168,76,0.12)",
                }}
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full text-gold"
                  style={{
                    background: "rgba(201,168,76,0.08)",
                    border: "1px solid rgba(201,168,76,0.2)",
                  }}
                >
                  {icon}
                </div>
                <h3 className="text-base font-bold">{title}</h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--gray)" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden py-32 md:py-40"
        style={{ background: "var(--black)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)",
          }}
        />

        <div className={`${containerClass} relative pb-20 text-center md:pb-28`}>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-4xl font-bold md:text-6xl">
              Ready to Acquire
              <br />
              <span className="gold-text-gradient">
                Your Next Trophy Asset?
              </span>
            </h2>

            <p
              className="mb-10 text-lg"
              style={{ color: "var(--gray-light)" }}
            >
              Speak privately with our concierge. No obligation. 100%
              confidential.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/consultation"
                className="btn-gold inline-flex items-center justify-center gap-2 rounded px-10 py-5 text-base uppercase tracking-widest"
              >
                Book Consultation <ArrowRight size={18} />
              </Link>

              <Link
                href="/catalog"
                className="btn-outline-gold inline-flex items-center justify-center gap-2 rounded px-10 py-5 text-base uppercase tracking-widest"
              >
                Browse Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

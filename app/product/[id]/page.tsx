"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products, cryptos, formatUSD, formatCrypto } from "@/lib/data";
import { ArrowLeft, Shield, Globe, ChevronRight, Eye } from "lucide-react";
import InquiryModal from "@/components/InquiryModal";

const containerClass =
  "mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedCrypto, setSelectedCrypto] = useState("ETH");
  const [showInquiry, setShowInquiry] = useState(false);

  const cryptoPrice =
    product.cryptoPrices[selectedCrypto as keyof typeof product.cryptoPrices];

  return (
    <main
      className="min-h-screen overflow-x-hidden pt-[120px] md:pt-[132px]"
      style={{ background: "var(--black)" }}
    >
      {showInquiry && (
        <InquiryModal
          productName={product.name}
          productId={product.id}
          price={formatUSD(product.price)}
          onClose={() => setShowInquiry(false)}
        />
      )}

      {/* Breadcrumb */}
      <section
        style={{
          borderBottom: "1px solid rgba(201,168,76,0.08)",
          background: "var(--black-2)",
        }}
      >
        <div
          className={`${containerClass} flex items-center gap-2 py-4 text-xs`}
          style={{ color: "var(--gray)" }}
        >
          <Link href="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/catalog" className="transition-colors hover:text-gold">
            Catalog
          </Link>
          <ChevronRight size={12} />
          <span className="text-gold">{product.name}</span>
        </div>
      </section>

      <section className={`${containerClass} py-16 md:py-20`}>
        <Link
          href="/catalog"
          className="mb-10 inline-flex items-center gap-2 text-sm text-gold transition-opacity hover:opacity-70"
        >
          <ArrowLeft size={16} /> All Listings
        </Link>

        <div className="grid grid-cols-1 gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(420px,560px)] xl:gap-20">
          {/* Gallery */}
          <div>
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />

              {product.badge && (
                <span
                  className="absolute left-4 top-4 rounded px-3 py-1 text-xs font-bold tracking-widest"
                  style={{
                    background: "var(--gold)",
                    color: "var(--black)",
                  }}
                >
                  {product.badge}
                </span>
              )}

              <div
                className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs"
                style={{
                  background: "rgba(10,10,10,0.85)",
                  color: "var(--gray-light)",
                  border: "1px solid rgba(201,168,76,0.2)",
                }}
              >
                <Eye size={12} className="text-gold" />
                <span>{Math.floor(Math.random() * 12 + 3)} people viewing this</span>
              </div>
            </div>

            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className="relative overflow-hidden rounded-xl transition-all"
                    style={{
                      aspectRatio: "4/3",
                      border:
                        selectedImage === i
                          ? "2px solid var(--gold)"
                          : "2px solid transparent",
                    }}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: <Shield size={14} />, label: "Escrow Protected" },
                { icon: <Globe size={14} />, label: "Worldwide Delivery" },
                { icon: "✅", label: "Seller Verified" },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1 rounded-lg p-3 text-center text-xs"
                  style={{
                    background: "var(--black-2)",
                    color: "var(--gray)",
                    border: "1px solid rgba(201,168,76,0.1)",
                  }}
                >
                  <span className="text-gold">{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <aside className="flex flex-col xl:pt-2">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
              {product.brand}
            </p>

            <h1 className="mb-3 text-4xl font-bold leading-tight md:text-5xl">
              {product.name}
            </h1>

            <p className="mb-6 text-sm" style={{ color: "var(--gray)" }}>
              📍 {product.location}
            </p>

            <p
              className="mb-10 text-base leading-relaxed md:text-lg"
              style={{ color: "var(--gray-light)" }}
            >
              {product.description}
            </p>

            <div
              className="mb-5 rounded-2xl p-6"
              style={{
                background: "var(--black-3)",
                border: "1px solid rgba(201,168,76,0.2)",
              }}
            >
              <div className="mb-2 flex items-center justify-between gap-4">
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "var(--gray)" }}
                >
                  Listed Price
                </span>
                <span className="text-2xl font-bold text-gold">
                  {formatUSD(product.price)}
                </span>
              </div>

              <p className="mb-5 text-right text-xs" style={{ color: "var(--gray)" }}>
                + 0% platform fee · Shipping included
              </p>

              <div className="divider-gold mb-5" />

              <p
                className="mb-3 text-xs uppercase tracking-widest"
                style={{ color: "var(--gray)" }}
              >
                Select Payment Currency
              </p>

              <div className="mb-5 grid grid-cols-3 gap-2">
                {cryptos.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCrypto(c.id)}
                    className="rounded-xl py-3 text-center transition-all"
                    style={
                      selectedCrypto === c.id
                        ? {
                            background: "var(--gold)",
                            color: "var(--black)",
                            fontWeight: 700,
                          }
                        : {
                            background: "var(--black-4)",
                            color: "var(--gray)",
                            border: "1px solid rgba(201,168,76,0.15)",
                          }
                    }
                  >
                    <div
                      className="text-base font-bold"
                      style={{
                        color:
                          selectedCrypto === c.id ? "var(--black)" : c.color,
                      }}
                    >
                      {c.icon}
                    </div>
                    <div className="mt-0.5 text-xs">{c.symbol}</div>
                  </button>
                ))}
              </div>

              <div
                className="mb-6 rounded-lg px-4 py-4 text-center font-mono"
                style={{
                  background: "var(--black-4)",
                  border: "1px solid rgba(201,168,76,0.15)",
                }}
              >
                <span className="text-xl font-bold text-gold">
                  {formatCrypto(cryptoPrice, selectedCrypto)}
                </span>
                <span className="ml-2 text-xs" style={{ color: "var(--gray)" }}>
                  ≈ {formatUSD(product.price)}
                </span>
              </div>

              <button
                onClick={() => setShowInquiry(true)}
                className="mb-3 w-full rounded-xl py-4 text-sm font-bold uppercase tracking-widest transition-all"
                style={{
                  background:
                    "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                  color: "var(--black)",
                  boxShadow: "0 0 30px rgba(201,168,76,0.25)",
                }}
              >
                Request Private Acquisition
              </button>

              <Link
                href={`/checkout/${product.id}?crypto=${selectedCrypto}`}
                className="block w-full rounded-xl py-3 text-center text-sm uppercase tracking-widest transition-all"
                style={{
                  border: "1px solid rgba(201,168,76,0.3)",
                  color: "var(--gold)",
                }}
              >
                Proceed Directly to Checkout
              </Link>

              <p className="mt-4 text-center text-xs" style={{ color: "var(--gray)" }}>
                🔒 Escrow-secured · Private inquiry responded to within 2 hours
              </p>
            </div>

            <div
              className="rounded-xl p-5"
              style={{
                background: "rgba(201,168,76,0.04)",
                border: "1px solid rgba(201,168,76,0.1)",
              }}
            >
              <p className="mb-2 text-sm font-semibold text-gold">
                🤝 White Glove Acquisition Service
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--gray)" }}
              >
                For assets of this calibre, we recommend our private acquisition
                service. A senior concierge will guide you through verification,
                negotiation, legal documentation, and coordinated worldwide delivery.
              </p>
              <button
                onClick={() => setShowInquiry(true)}
                className="mt-3 text-xs text-gold underline underline-offset-2 transition-opacity hover:opacity-70"
              >
                Submit a private inquiry →
              </button>
            </div>
          </aside>
        </div>

        {/* Specs */}
        <section className="mt-24">
          <div className="mb-8 flex items-center gap-4">
            <h2 className="text-2xl font-bold">Specifications</h2>
            <div className="divider-gold flex-1" />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {Object.entries(product.specs).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between rounded-xl px-5 py-4"
                style={{
                  background: "var(--black-2)",
                  border: "1px solid rgba(201,168,76,0.08)",
                }}
              >
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--gray)" }}
                >
                  {key}
                </span>
                <span className="text-sm font-bold text-gold">{value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Why LuxChain */}
        <section
          className="mt-24 grid grid-cols-1 gap-8 rounded-2xl p-8 md:grid-cols-3"
          style={{
            background: "var(--black-2)",
            border: "1px solid rgba(201,168,76,0.1)",
          }}
        >
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-gold">
              Why LuxChain
            </p>
            <h3 className="text-xl font-bold">
              The Safest Way to Buy Luxury with Crypto
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-2">
            {[
              {
                icon: "🔐",
                title: "Escrow Smart Contract",
                desc: "Funds released only on confirmed delivery",
              },
              {
                icon: "🌍",
                title: "180+ Countries",
                desc: "Dedicated logistics partners worldwide",
              },
              {
                icon: "⚖️",
                title: "Legal Team",
                desc: "Title transfer & compliance in every jurisdiction",
              },
              {
                icon: "📞",
                title: "24/7 Concierge",
                desc: "Senior advisor assigned to your acquisition",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title}>
                <div className="mb-1 text-xl">{icon}</div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-0.5 text-xs" style={{ color: "var(--gray)" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Similar listings */}
        <section className="mt-24 pb-16">
          <div className="mb-8 flex items-center gap-4">
            <h2 className="text-2xl font-bold">Similar Listings</h2>
            <div className="divider-gold flex-1" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="card-luxury hover-glow group block overflow-hidden rounded-xl"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-widest text-gold">
                      {p.brand}
                    </p>
                    <p className="text-sm font-semibold">{p.name}</p>
                    <p className="mt-2 text-sm font-bold text-gold">
                      {formatUSD(p.price)}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </section>
    </main>
  );
}

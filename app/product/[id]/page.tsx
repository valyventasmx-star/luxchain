"use client";
import { useState } from "react";
import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products, cryptos, formatUSD, formatCrypto } from "@/lib/data";
import { ArrowLeft, Shield, Globe, ChevronRight, Eye } from "lucide-react";
import InquiryModal from "@/components/InquiryModal";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find(p => p.id === id);
  if (!product) notFound();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedCrypto, setSelectedCrypto] = useState("ETH");
  const [showInquiry, setShowInquiry] = useState(false);

  const cryptoPrice = product.cryptoPrices[selectedCrypto as keyof typeof product.cryptoPrices];

  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--black)" }}>
      {/* Inquiry modal */}
      {showInquiry && (
        <InquiryModal
          productName={product.name}
          productId={product.id}
          price={formatUSD(product.price)}
          onClose={() => setShowInquiry(false)}
        />
      )}

      {/* Breadcrumb */}
      <div className="px-6 py-3" style={{ borderBottom: "1px solid rgba(201,168,76,0.08)", background: "var(--black-2)" }}>
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs" style={{ color: "var(--gray)" }}>
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/catalog" className="hover:text-gold transition-colors">Catalog</Link>
          <ChevronRight size={12} />
          <span className="text-gold">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link href="/catalog" className="inline-flex items-center gap-2 text-sm text-gold mb-8 hover:opacity-70 transition-opacity">
          <ArrowLeft size={16} /> All Listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <Image src={product.images[selectedImage]} alt={product.name} fill className="object-cover" priority />
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded text-xs font-bold tracking-widest"
                  style={{ background: "var(--gold)", color: "var(--black)" }}>
                  {product.badge}
                </span>
              )}
              {/* Interested buyers tag */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                style={{ background: "rgba(10,10,10,0.85)", color: "var(--gray-light)", border: "1px solid rgba(201,168,76,0.2)" }}>
                <Eye size={12} className="text-gold" />
                <span>{Math.floor(Math.random() * 12 + 3)} people viewing this</span>
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-3">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)}
                    className="relative rounded-xl overflow-hidden flex-1 transition-all"
                    style={{ aspectRatio: "4/3", border: selectedImage === i ? "2px solid var(--gold)" : "2px solid transparent" }}>
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust row */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                { icon: <Shield size={14} />, label: "Escrow Protected" },
                { icon: <Globe size={14} />, label: "Worldwide Delivery" },
                { icon: "✅", label: "Seller Verified" },
              ].map(({ icon, label }) => (
                <div key={label} className="rounded-lg p-2.5 text-center text-xs flex flex-col items-center gap-1"
                  style={{ background: "var(--black-2)", color: "var(--gray)", border: "1px solid rgba(201,168,76,0.1)" }}>
                  <span className="text-gold">{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="mb-1">
              <p className="text-sm uppercase tracking-widest text-gold font-semibold">{product.brand}</p>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-sm mb-5" style={{ color: "var(--gray)" }}>📍 {product.location}</p>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--gray-light)" }}>{product.description}</p>

            {/* Price panel */}
            <div className="rounded-2xl p-6 mb-4" style={{ background: "var(--black-3)", border: "1px solid rgba(201,168,76,0.2)" }}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs uppercase tracking-widest" style={{ color: "var(--gray)" }}>Listed Price</span>
                <span className="text-2xl font-bold text-gold">{formatUSD(product.price)}</span>
              </div>
              <p className="text-xs text-right mb-4" style={{ color: "var(--gray)" }}>+ 0% platform fee · Shipping included</p>

              <div className="divider-gold mb-4" />

              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--gray)" }}>Select Payment Currency</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {cryptos.map(c => (
                  <button key={c.id} onClick={() => setSelectedCrypto(c.id)}
                    className="py-3 rounded-xl text-center transition-all"
                    style={selectedCrypto === c.id
                      ? { background: "var(--gold)", color: "var(--black)", fontWeight: 700 }
                      : { background: "var(--black-4)", color: "var(--gray)", border: "1px solid rgba(201,168,76,0.15)" }}>
                    <div className="text-base font-bold" style={{ color: selectedCrypto === c.id ? "var(--black)" : c.color }}>{c.icon}</div>
                    <div className="text-xs mt-0.5">{c.symbol}</div>
                  </button>
                ))}
              </div>

              <div className="rounded-lg px-4 py-3 font-mono text-center mb-5"
                style={{ background: "var(--black-4)", border: "1px solid rgba(201,168,76,0.15)" }}>
                <span className="text-xl font-bold text-gold">{formatCrypto(cryptoPrice, selectedCrypto)}</span>
                <span className="text-xs ml-2" style={{ color: "var(--gray)" }}>≈ {formatUSD(product.price)}</span>
              </div>

              {/* Primary CTA — high ticket: inquiry first */}
              <button
                onClick={() => setShowInquiry(true)}
                className="w-full py-4 rounded-xl text-sm uppercase tracking-widest font-bold mb-3 transition-all"
                style={{
                  background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                  color: "var(--black)",
                  boxShadow: "0 0 30px rgba(201,168,76,0.25)",
                }}
              >
                Request Private Acquisition
              </button>

              {/* Secondary CTA — direct checkout */}
              <Link href={`/checkout/${product.id}?crypto=${selectedCrypto}`}
                className="block w-full py-3 rounded-xl text-sm uppercase tracking-widest text-center transition-all"
                style={{ border: "1px solid rgba(201,168,76,0.3)", color: "var(--gold)" }}>
                Proceed Directly to Checkout
              </Link>

              <p className="text-xs text-center mt-3" style={{ color: "var(--gray)" }}>
                🔒 Escrow-secured · Private inquiry responded to within 2 hours
              </p>
            </div>

            {/* Concierge note */}
            <div className="rounded-xl p-4" style={{ background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.1)" }}>
              <p className="text-sm font-semibold text-gold mb-1">🤝 White Glove Acquisition Service</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--gray)" }}>
                For assets of this calibre, we recommend our private acquisition service. A senior concierge will
                guide you through verification, negotiation, legal documentation, and coordinated worldwide delivery.
              </p>
              <button onClick={() => setShowInquiry(true)}
                className="text-xs text-gold underline underline-offset-2 mt-2 hover:opacity-70 transition-opacity">
                Submit a private inquiry →
              </button>
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-16">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold">Specifications</h2>
            <div className="divider-gold flex-1" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center px-5 py-3.5 rounded-xl"
                style={{ background: "var(--black-2)", border: "1px solid rgba(201,168,76,0.08)" }}>
                <span className="text-sm font-medium" style={{ color: "var(--gray)" }}>{key}</span>
                <span className="text-sm font-bold text-gold">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why LuxChain */}
        <div className="mt-16 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ background: "var(--black-2)", border: "1px solid rgba(201,168,76,0.1)" }}>
          <div className="md:col-span-1">
            <p className="text-xs uppercase tracking-widest text-gold mb-2">Why LuxChain</p>
            <h3 className="text-xl font-bold">The Safest Way to Buy Luxury with Crypto</h3>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {[
              { icon: "🔐", title: "Escrow Smart Contract", desc: "Funds released only on confirmed delivery" },
              { icon: "🌍", title: "180+ Countries", desc: "Dedicated logistics partners worldwide" },
              { icon: "⚖️", title: "Legal Team", desc: "Title transfer & compliance in every jurisdiction" },
              { icon: "📞", title: "24/7 Concierge", desc: "Senior advisor assigned to your acquisition" },
            ].map(({ icon, title, desc }) => (
              <div key={title}>
                <div className="text-xl mb-1">{icon}</div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--gray)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Similar listings */}
        <div className="mt-14">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold">Similar Listings</h2>
            <div className="divider-gold flex-1" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(p => (
                <Link key={p.id} href={`/product/${p.id}`} className="card-luxury hover-glow rounded-xl overflow-hidden group block">
                  <div className="relative h-36 overflow-hidden">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gold uppercase tracking-widest">{p.brand}</p>
                    <p className="text-sm font-semibold">{p.name}</p>
                    <p className="text-sm font-bold text-gold mt-1">{formatUSD(p.price)}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

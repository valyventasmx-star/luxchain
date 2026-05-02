"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ShieldCheck,
  Globe2,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import InquiryModal from "@/components/InquiryModal";
import { formatUSD, formatCrypto, cryptos, type Product } from "@/lib/data";

export default function ProductClient({
  product,
  allProducts,
}: {
  product: Product;
  allProducts?: Product[];
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedCrypto, setSelectedCrypto] = useState("ETH");
  const [showInquiry, setShowInquiry] = useState(false);

  const cryptoPrice =
    product.cryptoPrices[selectedCrypto as keyof typeof product.cryptoPrices];

  return (
    <main
      className="min-h-screen overflow-x-hidden page-top-spacing"
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

      <section className="page-shell pb-28">
        <Link
          href="/catalog"
          className="mb-12 inline-flex items-center gap-2 text-sm text-gold opacity-80 transition hover:opacity-100"
        >
          <ArrowLeft size={16} />
          Back to catalog
        </Link>

        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">
              {product.brand}
            </p>

            <h1 className="max-w-5xl text-5xl font-bold leading-[0.98] tracking-tight md:text-7xl lg:text-8xl">
              {product.name}
            </h1>
          </div>

          <div className="lg:text-right">
            <p className="mb-3 text-sm" style={{ color: "var(--gray)" }}>
              📍 {product.location}
            </p>

            <p className="text-3xl font-bold text-gold md:text-4xl">
              {formatUSD(product.price)}
            </p>

            <p
              className="mt-2 text-xs uppercase tracking-widest"
              style={{ color: "var(--gray)" }}
            >
              Private acquisition available
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-16 xl:grid-cols-[minmax(0,1fr)_430px] xl:gap-20">
          <div>
            <div
              className="relative overflow-hidden rounded-[2rem]"
              style={{
                aspectRatio: "16/10",
                border: "1px solid rgba(201,168,76,0.16)",
                boxShadow: "0 40px 120px rgba(0,0,0,0.55)",
              }}
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              />

              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 48%, rgba(0,0,0,0.38) 100%)",
                }}
              />

              {product.badge && (
                <span
                  className="absolute left-5 top-5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest"
                  style={{
                    background: "rgba(201,168,76,0.95)",
                    color: "var(--black)",
                  }}
                >
                  {product.badge}
                </span>
              )}

              <div
                className="absolute bottom-5 left-5 rounded-full px-4 py-2 text-xs"
                style={{
                  background: "rgba(10,10,10,0.72)",
                  color: "var(--gray-light)",
                  border: "1px solid rgba(201,168,76,0.16)",
                  backdropFilter: "blur(10px)",
                }}
              >
                Private listing · Verified asset
              </div>
            </div>

            {product.images.length > 1 && (
              <div className="mt-5 grid grid-cols-2 gap-5">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setSelectedImage(i)}
                    className="relative overflow-hidden rounded-2xl transition"
                    style={{
                      aspectRatio: "16/10",
                      border:
                        selectedImage === i
                          ? "2px solid var(--gold)"
                          : "1px solid rgba(201,168,76,0.12)",
                      opacity: selectedImage === i ? 1 : 0.65,
                    }}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                { icon: <ShieldCheck size={18} />, title: "Escrow Protected" },
                { icon: <Globe2 size={18} />, title: "Worldwide Delivery" },
                { icon: <LockKeyhole size={18} />, title: "Verified Seller" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-center gap-3 rounded-2xl px-5 py-4 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(201,168,76,0.12)",
                    color: "var(--gray-light)",
                  }}
                >
                  <span className="text-gold">{item.icon}</span>
                  {item.title}
                </div>
              ))}
            </div>
          </div>

          <aside
            className="h-fit rounded-[2rem] p-7 xl:sticky xl:top-32"
            style={{
              background:
                "linear-gradient(180deg, rgba(26,26,26,0.96), rgba(17,17,17,0.96))",
              border: "1px solid rgba(201,168,76,0.18)",
              boxShadow: "0 30px 90px rgba(0,0,0,0.45)",
            }}
          >
            <div className="mb-7 flex items-center gap-2 text-gold">
              <Sparkles size={16} />
              <p className="text-xs uppercase tracking-[0.25em]">
                Concierge acquisition
              </p>
            </div>

            <p
              className="mb-8 text-base leading-relaxed"
              style={{ color: "var(--gray-light)" }}
            >
              {product.description}
            </p>

            <div className="mb-8">
              <p
                className="mb-2 text-xs uppercase tracking-widest"
                style={{ color: "var(--gray)" }}
              >
                Listed price
              </p>

              <p className="text-4xl font-bold text-gold">
                {formatUSD(product.price)}
              </p>

              <p className="mt-2 text-xs" style={{ color: "var(--gray)" }}>
                0% platform fee · Secure escrow · White-glove handling
              </p>
            </div>

            <div className="divider-gold mb-8" />

            <div className="mb-8">
              <p
                className="mb-4 text-xs uppercase tracking-widest"
                style={{ color: "var(--gray)" }}
              >
                Select currency
              </p>

              <div className="grid grid-cols-3 gap-3">
                {cryptos.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCrypto(c.id)}
                    className="rounded-2xl px-4 py-4 text-center transition"
                    style={
                      selectedCrypto === c.id
                        ? {
                            background: "var(--gold)",
                            color: "var(--black)",
                          }
                        : {
                            background: "var(--black-4)",
                            color: "var(--gray-light)",
                            border: "1px solid rgba(201,168,76,0.14)",
                          }
                    }
                  >
                    <div className="text-lg font-bold">{c.icon}</div>
                    <div className="mt-1 text-xs">{c.symbol}</div>
                  </button>
                ))}
              </div>

              <div
                className="mt-4 rounded-2xl px-5 py-4 text-center font-mono"
                style={{
                  background: "rgba(10,10,10,0.55)",
                  border: "1px solid rgba(201,168,76,0.12)",
                }}
              >
                <span className="text-xl font-bold text-gold">
                  {formatCrypto(cryptoPrice, selectedCrypto)}
                </span>
                <span className="ml-2 text-xs" style={{ color: "var(--gray)" }}>
                  ≈ {formatUSD(product.price)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowInquiry(true)}
              className="w-full rounded-2xl py-5 text-sm font-bold uppercase tracking-[0.2em] transition hover:scale-[1.01]"
              style={{
                background:
                  "linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-light))",
                color: "var(--black)",
                boxShadow: "0 20px 60px rgba(201,168,76,0.22)",
              }}
            >
              Request Private Acquisition
            </button>

            <Link
              href={`/checkout/${product.id}?crypto=${selectedCrypto}`}
              className="mt-3 block w-full rounded-2xl py-4 text-center text-sm uppercase tracking-[0.18em] transition hover:bg-[rgba(201,168,76,0.08)]"
              style={{
                border: "1px solid rgba(201,168,76,0.28)",
                color: "var(--gold)",
              }}
            >
              Proceed to checkout
            </Link>

            <p
              className="mt-5 text-center text-xs leading-relaxed"
              style={{ color: "var(--gray)" }}
            >
              Private concierge response within 2 hours. Full KYC, escrow,
              shipping, and legal transfer handled end-to-end.
            </p>
          </aside>
        </div>

        <section className="mt-32">
          <div className="mb-10 flex items-center gap-5">
            <h2 className="text-3xl font-bold">Specifications</h2>
            <div className="divider-gold flex-1" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Object.entries(product.specs).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between rounded-2xl px-6 py-5"
                style={{
                  background: "var(--black-2)",
                  border: "1px solid rgba(201,168,76,0.1)",
                }}
              >
                <span className="text-sm" style={{ color: "var(--gray)" }}>
                  {key}
                </span>
                <span className="text-sm font-bold text-gold">{value}</span>
              </div>
            ))}
          </div>
        </section>

        {allProducts && allProducts.length > 0 && (
          <section className="mt-32 pb-12">
            <div className="mb-10 flex items-center gap-5">
              <h2 className="text-3xl font-bold">Similar Listings</h2>
              <div className="divider-gold flex-1" />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {allProducts
                .filter(
                  (p) => p.category === product.category && p.id !== product.id
                )
                .slice(0, 4)
                .map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    className="card-luxury hover-glow group block overflow-hidden rounded-2xl"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-5">
                      <p className="text-xs uppercase tracking-widest text-gold">
                        {p.brand}
                      </p>
                      <p className="mt-1 text-sm font-semibold">{p.name}</p>
                      <p className="mt-3 text-sm font-bold text-gold">
                        {formatUSD(p.price)}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

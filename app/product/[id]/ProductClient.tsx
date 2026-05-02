"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Globe2, LockKeyhole } from "lucide-react";
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
          className="mb-12 inline-flex items-center gap-2 text-sm text-gold opacity-80 hover:opacity-100"
        >
          <ArrowLeft size={16} />
          Back to catalog
        </Link>

        {/* BIG EDITORIAL TITLE */}
        <div className="mb-12 max-w-5xl">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">
            {product.brand}
          </p>

          <h1 className="text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            {product.name}
          </h1>

          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <p className="text-sm" style={{ color: "var(--gray)" }}>
              📍 {product.location}
            </p>

            <p className="text-3xl font-bold text-gold md:text-5xl">
              {formatUSD(product.price)}
            </p>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div
          className="relative mb-8 overflow-hidden rounded-[2rem]"
          style={{
            height: "min(70vh, 720px)",
            minHeight: "420px",
            border: "1px solid rgba(201,168,76,0.18)",
            boxShadow: "0 40px 120px rgba(0,0,0,0.55)",
          }}
        >
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            fill
            priority
            className="object-cover"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          {product.badge && (
            <span
              className="absolute left-6 top-6 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest"
              style={{
                background: "var(--gold)",
                color: "var(--black)",
              }}
            >
              {product.badge}
            </span>
          )}

          <div className="absolute bottom-6 left-6 flex flex-wrap gap-3">
            {[
              { icon: <ShieldCheck size={16} />, label: "Escrow Protected" },
              { icon: <Globe2 size={16} />, label: "Worldwide Delivery" },
              { icon: <LockKeyhole size={16} />, label: "Verified Seller" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-xs"
                style={{
                  background: "rgba(10,10,10,0.72)",
                  border: "1px solid rgba(201,168,76,0.18)",
                  color: "var(--gray-light)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <span className="text-gold">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* THUMBNAILS */}
        {product.images.length > 1 && (
          <div className="mb-20 grid grid-cols-2 gap-5 md:grid-cols-4">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setSelectedImage(i)}
                className="relative overflow-hidden rounded-2xl"
                style={{
                  aspectRatio: "16/10",
                  border:
                    selectedImage === i
                      ? "2px solid var(--gold)"
                      : "1px solid rgba(201,168,76,0.14)",
                  opacity: selectedImage === i ? 1 : 0.55,
                }}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* DETAILS + PURCHASE */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_440px]">
          <div>
            <p
              className="max-w-3xl text-xl leading-relaxed md:text-2xl"
              style={{ color: "var(--gray-light)" }}
            >
              {product.description}
            </p>

            <div className="mt-20">
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
                    <span className="text-sm font-bold text-gold">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside
            className="h-fit rounded-[2rem] p-7 lg:sticky lg:top-36"
            style={{
              background: "var(--black-2)",
              border: "1px solid rgba(201,168,76,0.18)",
              boxShadow: "0 30px 90px rgba(0,0,0,0.45)",
            }}
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-gold">
              Private acquisition
            </p>

            <p className="mb-6 text-4xl font-bold text-gold">
              {formatUSD(product.price)}
            </p>

            <p className="mb-8 text-sm leading-relaxed" style={{ color: "var(--gray)" }}>
              Secure escrow, white-glove handling, compliance, logistics, and
              transfer support handled end-to-end.
            </p>

            <div className="divider-gold mb-8" />

            <p className="mb-4 text-xs uppercase tracking-widest" style={{ color: "var(--gray)" }}>
              Select currency
            </p>

            <div className="mb-5 grid grid-cols-3 gap-3">
              {cryptos.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCrypto(c.id)}
                  className="rounded-2xl px-4 py-4 text-center"
                  style={
                    selectedCrypto === c.id
                      ? { background: "var(--gold)", color: "var(--black)" }
                      : {
                          background: "var(--black-3)",
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
              className="mb-8 rounded-2xl px-5 py-4 text-center font-mono"
              style={{
                background: "var(--black-3)",
                border: "1px solid rgba(201,168,76,0.12)",
              }}
            >
              <span className="text-xl font-bold text-gold">
                {formatCrypto(cryptoPrice, selectedCrypto)}
              </span>
            </div>

            <button
              onClick={() => setShowInquiry(true)}
              className="btn-gold w-full rounded-2xl py-5 text-sm uppercase tracking-[0.2em]"
            >
              Request Private Acquisition
            </button>

            <Link
              href={`/checkout/${product.id}?crypto=${selectedCrypto}`}
              className="mt-3 block w-full rounded-2xl py-4 text-center text-sm uppercase tracking-[0.18em]"
              style={{
                border: "1px solid rgba(201,168,76,0.28)",
                color: "var(--gold)",
              }}
            >
              Proceed to checkout
            </Link>
          </aside>
        </div>

        {/* SIMILAR */}
        {allProducts && allProducts.length > 0 && (
          <section className="mt-32">
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

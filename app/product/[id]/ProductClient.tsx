
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Shield, Globe, ChevronRight, Eye } from "lucide-react";
import InquiryModal from "@/components/InquiryModal";
import { formatUSD, formatCrypto, cryptos, type Product } from "@/lib/data";

export default function ProductClient({
  product,
  allProducts,
}: {
  product: Product;
  allProducts: Product[];
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedCrypto, setSelectedCrypto] = useState("ETH");
  const [showInquiry, setShowInquiry] = useState(false);

  const cryptoPrice =
    product.cryptoPrices[selectedCrypto as keyof typeof product.cryptoPrices];

  return (
    <main className="min-h-screen" style={{ background: "var(--black)" }}>
      {showInquiry && (
        <InquiryModal
          productName={product.name}
          productId={product.id}
          price={formatUSD(product.price)}
          onClose={() => setShowInquiry(false)}
        />
      )}

      <div className="max-w-[1440px] mx-auto px-6 pt-12 pb-20">
        {/* Back */}
        <Link
          href="/catalog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gold"
        >
          <ArrowLeft size={16} /> All Listings
        </Link>

        {/* TITLE FIX (esto arregla el problema visual) */}
        <div className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-widest text-gold mb-2">
            {product.brand}
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-3">
            {product.name}
          </h1>

          <p className="text-sm text-gray-400">📍 {product.location}</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
          {/* Gallery */}
          <div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex gap-3 mt-4">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}>
                  <div className="relative w-24 h-20 rounded-lg overflow-hidden">
                    <Image src={img} alt="" fill className="object-cover" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div>
            <p className="mb-6 text-gray-400">{product.description}</p>

            <div className="bg-[var(--black-3)] p-6 rounded-2xl border border-gold/20">
              <div className="flex justify-between mb-4">
                <span>Price</span>
                <span className="text-gold font-bold text-xl">
                  {formatUSD(product.price)}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {cryptos.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCrypto(c.id)}
                    className="p-2 border rounded"
                  >
                    {c.symbol}
                  </button>
                ))}
              </div>

              <div className="text-center mb-4">
                {formatCrypto(cryptoPrice, selectedCrypto)}
              </div>

              <button
                onClick={() => setShowInquiry(true)}
                className="w-full btn-gold py-3 rounded"
              >
                Request Private Acquisition
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { formatUSD, formatCrypto, cryptos, type Product } from "@/lib/data";

export default function ProductClient({
  product,
}: {
  product: Product;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedCrypto, setSelectedCrypto] = useState("ETH");

  const cryptoPrice =
    product.cryptoPrices[selectedCrypto as keyof typeof product.cryptoPrices];

  return (
    <main
      className="min-h-screen overflow-x-hidden page-top-spacing"
      style={{ background: "var(--black)" }}
    >
      <div className="page-shell pb-24">
        <Link href="/catalog" className="text-gold mb-10 inline-block">
          ← Back
        </Link>

        <div className="grid gap-16 xl:grid-cols-2">
          {/* IMAGE */}
          <div>
            <div className="relative h-[420px] rounded-2xl overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* INFO */}
          <div>
            <p className="text-gold uppercase text-xs mb-2">
              {product.brand}
            </p>

            <h1 className="text-4xl font-bold mb-4">
              {product.name}
            </h1>

            <p className="mb-6 text-gray-light">
              {product.description}
            </p>

            <p className="text-3xl text-gold mb-6">
              {formatUSD(product.price)}
            </p>

            {/* CRYPTO */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {cryptos.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCrypto(c.id)}
                  className="py-3 rounded"
                  style={
                    selectedCrypto === c.id
                      ? { background: "var(--gold)", color: "black" }
                      : { background: "var(--black-3)" }
                  }
                >
                  {c.symbol}
                </button>
              ))}
            </div>

            <p className="text-gold font-mono mb-6">
              {formatCrypto(cryptoPrice, selectedCrypto)}
            </p>

            <button className="btn-gold w-full py-4 rounded">
              Request Private Acquisition
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

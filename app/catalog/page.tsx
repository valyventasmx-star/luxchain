"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  products,
  categories,
  formatUSD,
  formatCrypto,
  type Category,
} from "@/lib/data";
import { Search, SlidersHorizontal, X } from "lucide-react";

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("cat") as Category | null;

  const [selectedCat, setSelectedCat] = useState<Category | null>(initialCat);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filtered = useMemo(() => {
    let list = [...products];

    if (selectedCat) list = list.filter((p) => p.category === selectedCat);

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "featured") {
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [selectedCat, search, sortBy]);

  return (
    <main
      className="min-h-screen overflow-x-hidden page-top-spacing"
      style={{ background: "var(--black)" }}
    >
      {/* HEADER */}
      <section
        className="border-b"
        style={{
          background: "var(--black-2)",
          borderColor: "rgba(201,168,76,0.1)",
        }}
      >
        <div className="page-shell py-16 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-gold mb-3">
            Catalog
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Luxury Listings
          </h1>

          <p style={{ color: "var(--gray)" }}>
            {filtered.length} listings available worldwide
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="page-shell py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:justify-between">
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-3 rounded"
            style={{
              background: "var(--black-3)",
              border: "1px solid rgba(201,168,76,0.2)",
            }}
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 rounded"
            style={{
              background: "var(--black-3)",
              border: "1px solid rgba(201,168,76,0.2)",
            }}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Low → High</option>
            <option value="price-desc">High → Low</option>
          </select>
        </div>

        {/* GRID */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="card-luxury rounded-2xl overflow-hidden"
            >
              <div className="relative h-64">
                <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
              </div>

              <div className="p-5">
                <p className="text-xs text-gold uppercase">{p.brand}</p>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gold mt-2">{formatUSD(p.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-40">Loading...</div>}>
      <CatalogContent />
    </Suspense>
  );
}

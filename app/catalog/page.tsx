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
  const [showFilters, setShowFilters] = useState(false);

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

  const currentCategoryLabel = selectedCat
    ? categories.find((c) => c.id === selectedCat)?.label
    : "All Categories";

  return (
    <main
      className="min-h-screen"
      style={{
        background: "var(--black)",
        paddingTop: "clamp(120px, 12vw, 150px)",
      }}
    >
      {/* Page Header */}
      <section
        className="border-b"
        style={{
          background: "var(--black-2)",
          borderColor: "rgba(201,168,76,0.1)",
        }}
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16 py-14 md:py-18 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-gold mb-3">
            {currentCategoryLabel}
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            {selectedCat ? currentCategoryLabel : "Luxury Catalog"}
          </h1>

          <p className="text-base md:text-lg" style={{ color: "var(--gray)" }}>
            {filtered.length} listings available worldwide
          </p>
        </div>
      </section>

      {/* Catalog Content */}
      <section className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16 py-12 md:py-16">
        {/* Filters bar */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gold"
            />

            <input
              type="text"
              placeholder="Search listings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded px-9 py-3 text-sm outline-none"
              style={{
                background: "var(--black-3)",
                border: "1px solid rgba(201,168,76,0.2)",
                color: "var(--white)",
              }}
            />
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded px-4 py-3 text-sm outline-none sm:w-auto"
              style={{
                background: "var(--black-3)",
                border: "1px solid rgba(201,168,76,0.2)",
                color: "var(--white)",
              }}
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 rounded px-4 py-3 text-sm md:hidden"
              style={{
                background: "var(--black-3)",
                border: "1px solid rgba(201,168,76,0.2)",
                color: "var(--gold)",
              }}
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>
        </div>

        {/* Category pills */}
        <div className="mb-12 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCat(null)}
            className="rounded-full px-4 py-2 text-sm font-medium transition-all"
            style={
              !selectedCat
                ? { background: "var(--gold)", color: "var(--black)" }
                : {
                    background: "var(--black-3)",
                    color: "var(--gray)",
                    border: "1px solid rgba(201,168,76,0.2)",
                  }
            }
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setSelectedCat(
                  selectedCat === (cat.id as Category)
                    ? null
                    : (cat.id as Category)
                )
              }
              className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all"
              style={
                selectedCat === cat.id
                  ? { background: "var(--gold)", color: "var(--black)" }
                  : {
                      background: "var(--black-3)",
                      color: "var(--gray)",
                      border: "1px solid rgba(201,168,76,0.2)",
                    }
              }
            >
              {cat.icon} {cat.label}
            </button>
          ))}

          {(selectedCat || search) && (
            <button
              onClick={() => {
                setSelectedCat(null);
                setSearch("");
              }}
              className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm"
              style={{
                background: "rgba(201,168,76,0.1)",
                color: "var(--gold)",
                border: "1px solid rgba(201,168,76,0.3)",
              }}
            >
              <X size={12} /> Clear
            </button>
          )}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="mb-3 text-2xl">🔍</p>
            <p className="mb-2 font-semibold">No listings found</p>
            <p style={{ color: "var(--gray)" }}>
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="card-luxury hover-glow group block w-full overflow-hidden rounded-2xl"
              >
                <div className="relative h-64 overflow-hidden md:h-72">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {product.badge && (
                    <span
                      className="absolute left-3 top-3 rounded px-2 py-0.5 text-xs font-bold tracking-wide"
                      style={{
                        background: "var(--gold)",
                        color: "var(--black)",
                      }}
                    >
                      {product.badge}
                    </span>
                  )}

                  <div
                    className="absolute right-3 top-3 rounded px-2 py-0.5 text-xs"
                    style={{
                      background: "rgba(10,10,10,0.8)",
                      color: "var(--gray-light)",
                      border: "1px solid rgba(201,168,76,0.15)",
                    }}
                  >
                    {categories.find((c) => c.id === product.category)?.icon}{" "}
                    {categories.find((c) => c.id === product.category)?.label}
                  </div>
                </div>

                <div className="p-5">
                  <p className="mb-1 text-xs uppercase tracking-widest text-gold">
                    {product.brand}
                  </p>

                  <h3 className="mb-1 text-lg font-semibold leading-tight">
                    {product.name}
                  </h3>

                  <p className="mb-4 text-xs" style={{ color: "var(--gray)" }}>
                    📍 {product.location}
                  </p>

                  <div className="divider-gold mb-4" />

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="text-xl font-bold text-gold">
                        {formatUSD(product.price)}
                      </div>

                      <div
                        className="mt-0.5 font-mono text-xs"
                        style={{ color: "var(--gray)" }}
                      >
                        {formatCrypto(product.cryptoPrices.ETH, "ETH")}
                      </div>
                    </div>

                    <span className="btn-gold rounded px-4 py-1.5 text-xs">
                      View
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-screen items-center justify-center pt-20"
          style={{ background: "var(--black)", color: "var(--gold)" }}
        >
          Loading...
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}

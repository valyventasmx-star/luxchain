"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { products, categories, formatUSD, formatCrypto, type Category } from "@/lib/data";
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
    if (selectedCat) list = list.filter(p => p.category === selectedCat);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    }
    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "featured") list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return list;
  }, [selectedCat, search, sortBy]);

  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--black)" }}>
      {/* Header */}
      <div className="py-16 px-6 text-center" style={{ background: "var(--black-2)", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
        <p className="text-xs uppercase tracking-widest text-gold mb-3">
          {selectedCat ? categories.find(c => c.id === selectedCat)?.label : "All Categories"}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {selectedCat ? categories.find(c => c.id === selectedCat)?.label : "Luxury Catalog"}
        </h1>
        <p style={{ color: "var(--gray)" }}>{filtered.length} listings available worldwide</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Filters bar */}
        <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
          {/* Search */}
          <div className="relative flex-1 min-w-56 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
            <input
              type="text"
              placeholder="Search listings..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded text-sm outline-none"
              style={{ background: "var(--black-3)", border: "1px solid rgba(201,168,76,0.2)", color: "var(--white)" }}
            />
          </div>

          <div className="flex gap-3 items-center">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded text-sm outline-none"
              style={{ background: "var(--black-3)", border: "1px solid rgba(201,168,76,0.2)", color: "var(--white)" }}
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            {/* Filter toggle (mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded text-sm"
              style={{ background: "var(--black-3)", border: "1px solid rgba(201,168,76,0.2)", color: "var(--gold)" }}
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-10">
          <button
            onClick={() => setSelectedCat(null)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={!selectedCat
              ? { background: "var(--gold)", color: "var(--black)" }
              : { background: "var(--black-3)", color: "var(--gray)", border: "1px solid rgba(201,168,76,0.2)" }
            }
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(selectedCat === cat.id as Category ? null : cat.id as Category)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5"
              style={selectedCat === cat.id
                ? { background: "var(--gold)", color: "var(--black)" }
                : { background: "var(--black-3)", color: "var(--gray)", border: "1px solid rgba(201,168,76,0.2)" }
              }
            >
              {cat.icon} {cat.label}
            </button>
          ))}
          {(selectedCat || search) && (
            <button
              onClick={() => { setSelectedCat(null); setSearch(""); }}
              className="px-4 py-2 rounded-full text-sm flex items-center gap-1.5"
              style={{ background: "rgba(201,168,76,0.1)", color: "var(--gold)", border: "1px solid rgba(201,168,76,0.3)" }}
            >
              <X size={12} /> Clear
            </button>
          )}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-2xl mb-3">🔍</p>
            <p className="font-semibold mb-2">No listings found</p>
            <p style={{ color: "var(--gray)" }}>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(product => (
              <Link key={product.id} href={`/product/${product.id}`} className="card-luxury hover-glow rounded-2xl overflow-hidden group block">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.badge && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-bold tracking-wide"
                      style={{ background: "var(--gold)", color: "var(--black)" }}>
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs"
                    style={{ background: "rgba(10,10,10,0.8)", color: "var(--gray-light)", border: "1px solid rgba(201,168,76,0.15)" }}>
                    {categories.find(c => c.id === product.category)?.icon} {categories.find(c => c.id === product.category)?.label}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-widest text-gold mb-0.5">{product.brand}</p>
                  <h3 className="font-semibold leading-tight mb-1">{product.name}</h3>
                  <p className="text-xs mb-3" style={{ color: "var(--gray)" }}>📍 {product.location}</p>
                  <div className="divider-gold mb-3" />
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-base font-bold text-gold">{formatUSD(product.price)}</div>
                      <div className="text-xs mt-0.5 font-mono" style={{ color: "var(--gray)" }}>
                        {formatCrypto(product.cryptoPrices.ETH, "ETH")}
                      </div>
                    </div>
                    <span className="text-xs px-3 py-1.5 rounded btn-gold">View</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center" style={{ background: "var(--black)", color: "var(--gold)" }}>Loading...</div>}>
      <CatalogContent />
    </Suspense>
  );
}

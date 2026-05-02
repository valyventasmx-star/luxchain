"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, categories, formatUSD } from "@/lib/data";
import { Plus, Edit, Eye, TrendingUp, Package, DollarSign, Globe } from "lucide-react";

const mockOrders = [
  { id: "LXC-ABC123", product: "Bugatti Chiron Super Sport", buyer: "0x742d...7890", crypto: "ETH", amount: "1026.315 ETH", status: "pending", date: "2026-05-01" },
  { id: "LXC-DEF456", product: "Monaco Penthouse", buyer: "0x8b3c...4521", crypto: "BTC", amount: "430.769 BTC", status: "confirmed", date: "2026-04-30" },
  { id: "LXC-GHI789", product: "Patek Nautilus 5711", buyer: "0x1a2b...3c4d", crypto: "USDC", amount: "135,000 USDC", status: "shipped", date: "2026-04-29" },
  { id: "LXC-JKL012", product: "Gulfstream G700", buyer: "0x9f8e...7d6c", crypto: "BTC", amount: "800 BTC", status: "delivered", date: "2026-04-28" },
];

const statusColors: Record<string, { bg: string; color: string; label: string }> = {
  pending: { bg: "rgba(245,158,11,0.1)", color: "#F59E0B", label: "Awaiting Payment" },
  confirmed: { bg: "rgba(59,130,246,0.1)", color: "#3B82F6", label: "Payment Confirmed" },
  shipped: { bg: "rgba(139,92,246,0.1)", color: "#8B5CF6", label: "Shipped" },
  delivered: { bg: "rgba(16,185,129,0.1)", color: "#10B981", label: "Delivered" },
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "listings" | "orders">("dashboard");

  const totalValue = products.reduce((s, p) => s + p.price, 0);

  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--black)" }}>
      {/* Admin header */}
      <div className="py-8 px-6" style={{ background: "var(--black-2)", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-gold mb-1">LuxChain</p>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>
          <Link href="/" className="btn-outline-gold px-4 py-2 rounded text-sm">← Back to Site</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 rounded-xl w-fit" style={{ background: "var(--black-3)" }}>
          {[
            { id: "dashboard", label: "Dashboard" },
            { id: "listings", label: "Listings" },
            { id: "orders", label: "Orders" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={activeTab === tab.id
                ? { background: "var(--gold)", color: "var(--black)" }
                : { color: "var(--gray)" }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { icon: <Package size={20} />, label: "Total Listings", value: products.length, suffix: "items" },
                { icon: <DollarSign size={20} />, label: "Total Value", value: formatUSD(totalValue), suffix: "" },
                { icon: <TrendingUp size={20} />, label: "Orders This Month", value: mockOrders.length, suffix: "orders" },
                { icon: <Globe size={20} />, label: "Countries Served", value: "180+", suffix: "" },
              ].map(({ icon, label, value, suffix }) => (
                <div key={label} className="rounded-xl p-5" style={{ background: "var(--black-2)", border: "1px solid rgba(201,168,76,0.12)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-gold">{icon}</span>
                    <span className="text-xs uppercase tracking-widest" style={{ color: "var(--gray)" }}>{label}</span>
                  </div>
                  <div className="text-2xl font-bold text-gold">{value}</div>
                  {suffix && <div className="text-xs mt-0.5" style={{ color: "var(--gray)" }}>{suffix}</div>}
                </div>
              ))}
            </div>

            {/* Recent orders */}
            <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(201,168,76,0.12)" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "var(--black-3)", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
                    {["Order ID", "Product", "Buyer", "Amount", "Status", "Date"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-widest" style={{ color: "var(--gray)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((order, i) => (
                    <tr key={order.id} style={{ background: i % 2 === 0 ? "var(--black-2)" : "var(--black-3)", borderBottom: "1px solid rgba(201,168,76,0.06)" }}>
                      <td className="px-4 py-3 font-mono text-gold">{order.id}</td>
                      <td className="px-4 py-3">{order.product}</td>
                      <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--gray)" }}>{order.buyer}</td>
                      <td className="px-4 py-3 text-xs">{order.amount}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded text-xs font-semibold"
                          style={{ background: statusColors[order.status].bg, color: statusColors[order.status].color }}>
                          {statusColors[order.status].label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--gray)" }}>{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Listings */}
        {activeTab === "listings" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">{products.length} Active Listings</h2>
              <button className="btn-gold px-4 py-2.5 rounded text-sm flex items-center gap-2">
                <Plus size={16} /> Add Listing
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map(p => (
                <div key={p.id} className="rounded-xl overflow-hidden" style={{ background: "var(--black-2)", border: "1px solid rgba(201,168,76,0.12)" }}>
                  <div className="relative h-36 overflow-hidden">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                    {p.badge && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-bold"
                        style={{ background: "var(--gold)", color: "var(--black)" }}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gold uppercase tracking-widest">{p.brand}</p>
                    <p className="text-sm font-semibold leading-tight">{p.name}</p>
                    <p className="text-xs mt-1" style={{ color: "var(--gray)" }}>
                      {categories.find(c => c.id === p.category)?.label} · {p.location}
                    </p>
                    <p className="text-base font-bold text-gold mt-2">{formatUSD(p.price)}</p>
                    <div className="flex gap-2 mt-3">
                      <Link href={`/product/${p.id}`} className="flex-1 py-1.5 rounded text-xs text-center btn-outline-gold flex items-center justify-center gap-1">
                        <Eye size={12} /> View
                      </Link>
                      <button className="flex-1 py-1.5 rounded text-xs btn-gold flex items-center justify-center gap-1">
                        <Edit size={12} /> Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-lg font-bold mb-6">All Orders</h2>
            <div className="space-y-3">
              {mockOrders.map(order => (
                <div key={order.id} className="rounded-xl p-5 flex flex-wrap gap-4 items-center justify-between"
                  style={{ background: "var(--black-2)", border: "1px solid rgba(201,168,76,0.12)" }}>
                  <div>
                    <span className="font-mono font-bold text-gold">{order.id}</span>
                    <p className="text-sm mt-0.5">{order.product}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--gray)" }}>Buyer: {order.buyer} · {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold">{order.amount}</p>
                    <span className="inline-block mt-1 px-3 py-1 rounded text-xs font-semibold"
                      style={{ background: statusColors[order.status].bg, color: statusColors[order.status].color }}>
                      {statusColors[order.status].label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

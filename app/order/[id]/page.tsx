import Link from "next/link";
import { Check, Package, Truck, Globe, CheckCircle } from "lucide-react";

export default function OrderPage({ params }: { params: { id: string } }) {
  const orderId = params.id;

  const steps = [
    { icon: <Check size={16} />, label: "Order Received", desc: "Your order has been submitted", done: true, time: "Just now" },
    { icon: <Globe size={16} />, label: "Payment Confirmed", desc: "Blockchain confirmation received", done: false, time: "Pending" },
    { icon: <Package size={16} />, label: "Processing", desc: "Asset preparation and documentation", done: false, time: "—" },
    { icon: <Truck size={16} />, label: "Shipped", desc: "In transit to your location", done: false, time: "—" },
    { icon: <CheckCircle size={16} />, label: "Delivered", desc: "Asset successfully delivered", done: false, time: "—" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20" style={{ background: "var(--black)" }}>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-gold mb-3">LuxChain</p>
          <h1 className="text-3xl font-bold mb-2">Order Tracking</h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mt-3"
            style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--gray)" }}>Order</span>
            <span className="font-mono font-bold text-gold">{orderId}</span>
          </div>
        </div>

        {/* Status card */}
        <div className="rounded-2xl p-6 mb-8" style={{ background: "var(--black-2)", border: "1px solid rgba(201,168,76,0.15)" }}>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-semibold">Awaiting Payment Confirmation</span>
          </div>
          <p className="text-sm" style={{ color: "var(--gray)" }}>
            We are waiting for your crypto transaction to be confirmed on the blockchain (typically 3–30 minutes depending on network congestion and fees paid).
          </p>
        </div>

        {/* Timeline */}
        <div className="rounded-2xl p-6 mb-8" style={{ background: "var(--black-2)", border: "1px solid rgba(201,168,76,0.15)" }}>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gold mb-6">Delivery Timeline</h2>
          <div className="space-y-0">
            {steps.map((s, i) => (
              <div key={s.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                    style={s.done
                      ? { background: "var(--gold)", color: "var(--black)" }
                      : { background: "var(--black-3)", color: "var(--gray)", border: "1px solid rgba(201,168,76,0.2)" }
                    }
                  >
                    {s.icon}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 my-1" style={{ background: s.done ? "var(--gold)" : "rgba(201,168,76,0.15)", minHeight: "2rem" }} />
                  )}
                </div>
                <div className="pb-6 pt-1.5">
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-sm" style={{ color: s.done ? "var(--white)" : "var(--gray)" }}>{s.label}</p>
                    <span className="text-xs" style={{ color: "var(--gray)" }}>{s.time}</span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "var(--gray)" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping info */}
        <div className="rounded-2xl p-6 mb-8" style={{ background: "var(--black-2)", border: "1px solid rgba(201,168,76,0.15)" }}>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gold mb-4">Worldwide Shipping Info</h2>
          <div className="space-y-3 text-sm" style={{ color: "var(--gray-light)" }}>
            <p>🚢 <strong>Yachts & Large Assets:</strong> Delivered via specialized maritime / heavy logistics partners. 15–45 days.</p>
            <p>✈️ <strong>Private Jets:</strong> Ferry flight or flat-bed transport arranged. 10–30 days for title transfer + delivery.</p>
            <p>🏎️ <strong>Supercars:</strong> Enclosed container shipping with full insurance. 7–21 days.</p>
            <p>⌚ <strong>Watches & Jewelry:</strong> Insured courier (Brinks or equivalent). 3–7 days globally.</p>
            <p>🏛️ <strong>Real Estate:</strong> Legal title transfer coordinated by our notary network. 30–90 days.</p>
          </div>
        </div>

        {/* Support */}
        <div className="rounded-2xl p-5 text-center" style={{ background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.12)" }}>
          <p className="text-sm mb-2" style={{ color: "var(--gray)" }}>Need help? Our concierge team is available 24/7.</p>
          <a href="mailto:concierge@luxchain.io" className="text-gold font-semibold text-sm hover:underline">
            concierge@luxchain.io
          </a>
          <span className="mx-3" style={{ color: "var(--gray)" }}>·</span>
          <a href="tel:+18005892424" className="text-gold font-semibold text-sm hover:underline">
            +1 (800) LUX-CHAIN
          </a>
        </div>

        <div className="text-center mt-8">
          <Link href="/catalog" className="btn-outline-gold px-6 py-3 rounded text-sm uppercase tracking-widest">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

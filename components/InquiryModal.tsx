"use client";
import { useState } from "react";
import { X, Check } from "lucide-react";

interface Props {
  productName: string;
  productId: string;
  price: string;
  onClose: () => void;
}

export default function InquiryModal({ productName, productId, price, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", preferredCrypto: "ETH", budget: price });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }} />
      <div
        className="relative w-full max-w-lg rounded-2xl p-8 z-10"
        style={{ background: "var(--black-2)", border: "1px solid rgba(201,168,76,0.25)" }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gold transition-colors">
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold))" }}>
              <Check size={28} className="text-black" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Inquiry Sent</h3>
            <p style={{ color: "var(--gray)" }}>Your personal concierge will contact you within 2 hours.</p>
            <button onClick={onClose} className="btn-gold px-6 py-3 rounded mt-6 text-sm uppercase tracking-widest">
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest text-gold mb-1">Private Inquiry</p>
              <h3 className="text-2xl font-bold">{productName}</h3>
              <p className="text-sm mt-1" style={{ color: "var(--gray)" }}>
                Our concierge team will personally assist you within 2 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: "var(--gray)" }}>Full Name</label>
                  <input required type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                    style={{ background: "var(--black-3)", border: "1px solid rgba(201,168,76,0.2)", color: "var(--white)" }} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: "var(--gray)" }}>Phone</label>
                  <input required type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                    style={{ background: "var(--black-3)", border: "1px solid rgba(201,168,76,0.2)", color: "var(--white)" }} />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: "var(--gray)" }}>Email</label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={{ background: "var(--black-3)", border: "1px solid rgba(201,168,76,0.2)", color: "var(--white)" }} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: "var(--gray)" }}>Preferred Crypto</label>
                <select value={form.preferredCrypto} onChange={e => setForm(f => ({ ...f, preferredCrypto: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={{ background: "var(--black-3)", border: "1px solid rgba(201,168,76,0.2)", color: "var(--white)" }}>
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="USDC">USD Coin (USDC)</option>
                  <option value="other">Other — discuss with concierge</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: "var(--gray)" }}>Message (optional)</label>
                <textarea rows={3} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Any questions or special requirements..."
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
                  style={{ background: "var(--black-3)", border: "1px solid rgba(201,168,76,0.2)", color: "var(--white)" }} />
              </div>

              <button type="submit" className="btn-gold w-full py-3.5 rounded-lg text-sm uppercase tracking-widest font-bold">
                Send Private Inquiry
              </button>
              <p className="text-xs text-center" style={{ color: "var(--gray)" }}>
                🔒 Confidential · Your information is never shared
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

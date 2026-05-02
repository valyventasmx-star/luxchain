"use client";
import { useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-6 z-50 flex flex-col items-end gap-3">
      {/* Options */}
      {open && (
        <div className="flex flex-col gap-2 items-end">
          <a
            href="https://wa.me/18005892424?text=Hello%2C%20I%27m%20interested%20in%20a%20LuxChain%20listing."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all hover:scale-105"
            style={{ background: "#25D366", color: "#fff" }}
          >
            <MessageCircle size={16} /> WhatsApp Concierge
          </a>
          <a
            href="tel:+18005892424"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all hover:scale-105"
            style={{ background: "var(--black-2)", color: "var(--gold)", border: "1px solid rgba(201,168,76,0.4)" }}
          >
            <Phone size={16} /> Call +1 (800) LUX-CHAIN
          </a>
          <a
            href="/consultation"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all hover:scale-105 btn-gold"
          >
            📅 Book Consultation
          </a>
        </div>
      )}

      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110"
        style={{
          background: open ? "var(--black-3)" : "linear-gradient(135deg, var(--gold-dark), var(--gold))",
          color: open ? "var(--gold)" : "var(--black)",
          border: "2px solid var(--gold)",
          boxShadow: "0 0 30px rgba(201,168,76,0.3)",
        }}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}

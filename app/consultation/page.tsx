"use client";

import { useState } from "react";
import { Check, Shield, Clock, Globe2, ArrowRight } from "lucide-react";

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    budget: "",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main
      className="min-h-screen overflow-x-hidden page-top-spacing"
      style={{ background: "var(--black)" }}
    >
      <section className="page-shell pb-28">
        <div className="grid min-h-[720px] grid-cols-1 overflow-hidden rounded-[2.5rem] lg:grid-cols-[0.9fr_1.1fr]"
          style={{
            border: "1px solid rgba(201,168,76,0.16)",
            background: "var(--black-2)",
            boxShadow: "0 40px 120px rgba(0,0,0,0.55)",
          }}
        >
          {/* LEFT EDITORIAL PANEL */}
          <div
            className="relative flex flex-col justify-between p-8 md:p-12"
            style={{
              background:
                "linear-gradient(135deg, rgba(201,168,76,0.16), rgba(10,10,10,0.98) 45%, rgba(10,10,10,1))",
            }}
          >
            <div>
              <p className="mb-6 text-xs uppercase tracking-[0.35em] text-gold">
                Private Concierge
              </p>

              <h1 className="max-w-xl text-5xl font-bold leading-[0.95] md:text-7xl">
                Secure your next extraordinary asset.
              </h1>

              <p className="mt-8 max-w-md text-base leading-relaxed" style={{ color: "var(--gray-light)" }}>
                A senior LuxChain concierge will guide your acquisition privately — from sourcing and negotiation to crypto escrow, compliance, and worldwide delivery.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-4">
              {[
                { icon: <Clock size={18} />, title: "Response within 2 hours" },
                { icon: <Shield size={18} />, title: "Strictly confidential" },
                { icon: <Globe2 size={18} />, title: "Worldwide acquisition support" },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-3 text-sm" style={{ color: "var(--gray-light)" }}>
                  <span className="text-gold">{item.icon}</span>
                  {item.title}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT FORM PANEL */}
          <div className="p-6 md:p-12 lg:p-14">
            {submitted ? (
              <div className="flex h-full min-h-[520px] flex-col items-center justify-center text-center">
                <div
                  className="mb-7 flex h-20 w-20 items-center justify-center rounded-full"
                  style={{
                    background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                  }}
                >
                  <Check size={34} className="text-black" />
                </div>

                <h2 className="mb-4 text-4xl font-bold">Request received.</h2>

                <p className="max-w-md leading-relaxed" style={{ color: "var(--gray-light)" }}>
                  Your dedicated concierge will reach out within 2 hours. Please check your email, including spam.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-10">
                  <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
                    Request access
                  </p>

                  <h2 className="text-3xl font-bold md:text-4xl">
                    Tell us what you&apos;re looking for.
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {[
                      { key: "name", label: "Full name", type: "text" },
                      { key: "email", label: "Email", type: "email" },
                      { key: "phone", label: "Phone / WhatsApp", type: "tel" },
                      { key: "country", label: "Country", type: "text" },
                    ].map(({ key, label, type }) => (
                      <div key={key}>
                        <label className="mb-2 block text-xs uppercase tracking-widest" style={{ color: "var(--gray)" }}>
                          {label}
                        </label>

                        <input
                          required
                          type={type}
                          value={form[key as keyof typeof form]}
                          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                          className="w-full rounded-2xl px-4 py-4 text-sm outline-none"
                          style={{
                            background: "rgba(10,10,10,0.55)",
                            border: "1px solid rgba(201,168,76,0.16)",
                            color: "var(--white)",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-widest" style={{ color: "var(--gray)" }}>
                      Budget range
                    </label>

                    <select
                      required
                      value={form.budget}
                      onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
                      className="w-full rounded-2xl px-4 py-4 text-sm outline-none"
                      style={{
                        background: "rgba(10,10,10,0.55)",
                        border: "1px solid rgba(201,168,76,0.16)",
                        color: "var(--white)",
                      }}
                    >
                      <option value="">Select budget</option>
                      <option>$50K – $250K</option>
                      <option>$250K – $1M</option>
                      <option>$1M – $5M</option>
                      <option>$5M – $20M</option>
                      <option>$20M+</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-widest" style={{ color: "var(--gray)" }}>
                      Acquisition details
                    </label>

                    <textarea
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Asset type, preferred brands, timeline, delivery location, or special requirements..."
                      className="w-full resize-none rounded-2xl px-4 py-4 text-sm outline-none"
                      style={{
                        background: "rgba(10,10,10,0.55)",
                        border: "1px solid rgba(201,168,76,0.16)",
                        color: "var(--white)",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold flex w-full items-center justify-center gap-2 rounded-2xl py-5 text-sm font-bold uppercase tracking-[0.2em]"
                  >
                    Request Private Consultation <ArrowRight size={16} />
                  </button>

                  <p className="text-center text-xs" style={{ color: "var(--gray)" }}>
                    Strictly confidential · No obligation · Senior concierge only
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

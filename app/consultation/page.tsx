"use client";

import { useState } from "react";
import { Check, Clock, Shield, Globe2, ArrowRight } from "lucide-react";

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    budget: "",
    timeline: "",
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
        {/* CENTERED HERO */}
        <div className="mx-auto max-w-4xl text-center pt-8 pb-16">
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-gold">
            White Glove Service
          </p>

          <h1 className="text-5xl font-bold leading-tight md:text-7xl">
            Book a Private Consultation
          </h1>

          <p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed"
            style={{ color: "var(--gray-light)" }}
          >
            Tell us what you’re looking for. A senior concierge will contact you
            privately and guide the acquisition end-to-end.
          </p>
        </div>

        {/* PREMIUM CENTERED CARD */}
        <div
          className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-[2rem] lg:grid-cols-[0.85fr_1.15fr]"
          style={{
            background: "var(--black-2)",
            border: "1px solid rgba(201,168,76,0.18)",
            boxShadow: "0 40px 120px rgba(0,0,0,0.45)",
          }}
        >
          {/* LEFT INFO */}
          <aside
            className="p-8 md:p-12"
            style={{
              background:
                "linear-gradient(135deg, rgba(201,168,76,0.12), rgba(10,10,10,0.98) 50%)",
              borderRight: "1px solid rgba(201,168,76,0.12)",
            }}
          >
            <h2 className="mb-8 text-3xl font-bold leading-tight">
              Private acquisition support, handled discreetly.
            </h2>

            <div className="space-y-7">
              {[
                {
                  icon: <Clock size={18} />,
                  title: "Response within 2 hours",
                  desc: "A senior concierge contacts you directly.",
                },
                {
                  icon: <Shield size={18} />,
                  title: "Strict confidentiality",
                  desc: "Every inquiry is handled privately.",
                },
                {
                  icon: <Globe2 size={18} />,
                  title: "Worldwide delivery",
                  desc: "Logistics support across 180+ countries.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="mt-1 text-gold">{item.icon}</div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p
                      className="mt-1 text-sm leading-relaxed"
                      style={{ color: "var(--gray)" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* FORM */}
          <div className="p-8 md:p-12">
            {submitted ? (
              <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                <div
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                  }}
                >
                  <Check size={28} className="text-black" />
                </div>

                <h3 className="mb-3 text-3xl font-bold">Request received.</h3>

                <p
                  className="max-w-md leading-relaxed"
                  style={{ color: "var(--gray-light)" }}
                >
                  Your dedicated concierge will reach out within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
                    Request access
                  </p>
                  <h3 className="text-3xl font-bold">
                    Share your acquisition details.
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {[
                    { key: "name", label: "Full Name", type: "text" },
                    { key: "email", label: "Email", type: "email" },
                    { key: "phone", label: "Phone / WhatsApp", type: "tel" },
                    { key: "country", label: "Country", type: "text" },
                  ].map(({ key, label, type }) => (
                    <div key={key}>
                      <label
                        className="mb-2 block text-xs uppercase tracking-widest"
                        style={{ color: "var(--gray)" }}
                      >
                        {label}
                      </label>

                      <input
                        required
                        type={type}
                        value={form[key as keyof typeof form]}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, [key]: e.target.value }))
                        }
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                        style={{
                          background: "var(--black-3)",
                          border: "1px solid rgba(201,168,76,0.18)",
                          color: "var(--white)",
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label
                      className="mb-2 block text-xs uppercase tracking-widest"
                      style={{ color: "var(--gray)" }}
                    >
                      Budget Range
                    </label>

                    <select
                      required
                      value={form.budget}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, budget: e.target.value }))
                      }
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                      style={{
                        background: "var(--black-3)",
                        border: "1px solid rgba(201,168,76,0.18)",
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
                    <label
                      className="mb-2 block text-xs uppercase tracking-widest"
                      style={{ color: "var(--gray)" }}
                    >
                      Timeline
                    </label>

                    <select
                      required
                      value={form.timeline}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, timeline: e.target.value }))
                      }
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                      style={{
                        background: "var(--black-3)",
                        border: "1px solid rgba(201,168,76,0.18)",
                        color: "var(--white)",
                      }}
                    >
                      <option value="">Select timeline</option>
                      <option>Immediately</option>
                      <option>Within 1 month</option>
                      <option>1–3 months</option>
                      <option>3–6 months</option>
                      <option>Just exploring</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    className="mb-2 block text-xs uppercase tracking-widest"
                    style={{ color: "var(--gray)" }}
                  >
                    Acquisition Details
                  </label>

                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="Asset type, preferred brands, delivery location, special requirements..."
                    className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none"
                    style={{
                      background: "var(--black-3)",
                      border: "1px solid rgba(201,168,76,0.18)",
                      color: "var(--white)",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold uppercase tracking-widest"
                >
                  Request Private Consultation <ArrowRight size={16} />
                </button>

                <p
                  className="text-center text-xs"
                  style={{ color: "var(--gray)" }}
                >
                  Strictly confidential · No obligation · Senior concierge only
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

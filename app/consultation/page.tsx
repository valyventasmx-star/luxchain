"use client";

import { useState } from "react";
import { Check, Calendar, Clock, Shield, Globe2, Scale, Handshake } from "lucide-react";

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    interests: [] as string[],
    budget: "",
    timeline: "",
    message: "",
  });

  const interests = ["Supercars", "Real Estate", "Yachts", "Private Jets", "Timepieces", "Jewelry"];
  const budgets = ["$50K – $250K", "$250K – $1M", "$1M – $5M", "$5M – $20M", "$20M+"];
  const timelines = ["Immediately", "Within 1 month", "1–3 months", "3–6 months", "Just exploring"];

  function toggleInterest(i: string) {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(i)
        ? f.interests.filter((x) => x !== i)
        : [...f.interests, i],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main
      className="min-h-screen overflow-x-hidden page-top-spacing"
      style={{ background: "var(--black)" }}
    >
      <section className="relative overflow-hidden border-b" style={{ borderColor: "rgba(201,168,76,0.1)" }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(201,168,76,0.09) 0%, rgba(10,10,10,0) 60%)",
          }}
        />

        <div className="page-shell relative py-20 md:py-28 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">
            White Glove Service
          </p>

          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
            Book a Private Consultation
          </h1>

          <p
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--gray-light)" }}
          >
            A senior concierge will guide your acquisition from first inquiry to secure payment,
            compliance, and worldwide delivery.
          </p>
        </div>
      </section>

      <section className="page-shell py-20 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <aside>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
              What to expect
            </p>

            <h2 className="mb-8 text-3xl font-bold leading-tight md:text-4xl">
              Private support for high-value acquisitions.
            </h2>

            <div className="space-y-6">
              {[
                {
                  icon: <Calendar size={18} />,
                  title: "Response in 2 Hours",
                  desc: "A senior concierge contacts you directly — no bots, no junior staff.",
                },
                {
                  icon: <Clock size={18} />,
                  title: "24/7 Availability",
                  desc: "Our team operates across all time zones for global clientele.",
                },
                {
                  icon: <Shield size={18} />,
                  title: "Full Discretion",
                  desc: "All inquiries are handled with complete confidentiality.",
                },
                {
                  icon: <Globe2 size={18} />,
                  title: "Worldwide Coverage",
                  desc: "Logistics partners in 180+ countries for seamless delivery.",
                },
                {
                  icon: <Handshake size={18} />,
                  title: "Negotiation Support",
                  desc: "We negotiate on your behalf to secure the best possible terms.",
                },
                {
                  icon: <Scale size={18} />,
                  title: "Legal & Compliance",
                  desc: "KYC, AML, customs, and title transfers handled end-to-end.",
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gold"
                    style={{
                      background: "rgba(201,168,76,0.08)",
                      border: "1px solid rgba(201,168,76,0.18)",
                    }}
                  >
                    {icon}
                  </div>

                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--gray)" }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <div>
            {submitted ? (
              <div
                className="rounded-[2rem] p-10 text-center md:p-14"
                style={{
                  background: "var(--black-2)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  boxShadow: "0 30px 90px rgba(0,0,0,0.35)",
                }}
              >
                <div
                  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{
                    background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                  }}
                >
                  <Check size={28} className="text-black" />
                </div>

                <h3 className="mb-3 text-3xl font-bold">Request Received</h3>
                <p style={{ color: "var(--gray-light)" }}>
                  Your dedicated concierge will reach out within 2 hours.
                </p>
                <p className="mt-2 text-sm" style={{ color: "var(--gray)" }}>
                  Please check your email, including your spam folder.
                </p>
              </div>
            ) : (
              <div
                className="rounded-[2rem] p-6 md:p-9"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(26,26,26,0.98), rgba(17,17,17,0.98))",
                  border: "1px solid rgba(201,168,76,0.18)",
                  boxShadow: "0 30px 90px rgba(0,0,0,0.35)",
                }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {[
                      { key: "name", label: "Full Name", type: "text" },
                      { key: "phone", label: "Phone / WhatsApp", type: "tel" },
                      { key: "email", label: "Email Address", type: "email" },
                      { key: "country", label: "Country of Residence", type: "text" },
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
                          value={form[key as keyof typeof form] as string}
                          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
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

                  <div>
                    <label
                      className="mb-3 block text-xs uppercase tracking-widest"
                      style={{ color: "var(--gray)" }}
                    >
                      I&apos;m Interested In
                    </label>

                    <div className="flex flex-wrap gap-2">
                      {interests.map((i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => toggleInterest(i)}
                          className="rounded-full px-4 py-2 text-sm transition"
                          style={
                            form.interests.includes(i)
                              ? {
                                  background: "var(--gold)",
                                  color: "var(--black)",
                                  fontWeight: 700,
                                }
                              : {
                                  background: "var(--black-3)",
                                  color: "var(--gray-light)",
                                  border: "1px solid rgba(201,168,76,0.18)",
                                }
                          }
                        >
                          {i}
                        </button>
                      ))}
                    </div>
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
                        onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                        style={{
                          background: "var(--black-3)",
                          border: "1px solid rgba(201,168,76,0.18)",
                          color: "var(--white)",
                        }}
                      >
                        <option value="">Select range</option>
                        {budgets.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        className="mb-2 block text-xs uppercase tracking-widest"
                        style={{ color: "var(--gray)" }}
                      >
                        Purchase Timeline
                      </label>

                      <select
                        required
                        value={form.timeline}
                        onChange={(e) => setForm((f) => ({ ...f, timeline: e.target.value }))}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                        style={{
                          background: "var(--black-3)",
                          border: "1px solid rgba(201,168,76,0.18)",
                          color: "var(--white)",
                        }}
                      >
                        <option value="">Select timeline</option>
                        {timelines.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      className="mb-2 block text-xs uppercase tracking-widest"
                      style={{ color: "var(--gray)" }}
                    >
                      Tell us more
                    </label>

                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Preferred brands, delivery location, specific asset requirements, custom configurations..."
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
                    className="btn-gold w-full rounded-xl py-4 text-sm font-bold uppercase tracking-widest"
                  >
                    Request Private Consultation
                  </button>

                  <p className="text-center text-xs" style={{ color: "var(--gray)" }}>
                    🔒 Strictly confidential · No obligation · Responded to within 2 hours
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

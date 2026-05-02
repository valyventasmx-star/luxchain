"use client";
import { useState } from "react";
import { Check, Calendar, Clock, Shield } from "lucide-react";

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", country: "",
    interests: [] as string[], budget: "", timeline: "", message: "",
  });

  const interests = ["Supercars", "Real Estate", "Yachts", "Private Jets", "Timepieces", "Jewelry"];
  const budgets = ["$50K – $250K", "$250K – $1M", "$1M – $5M", "$5M – $20M", "$20M+"];
  const timelines = ["Immediately", "Within 1 month", "1–3 months", "3–6 months", "Just exploring"];

  function toggleInterest(i: string) {
    setForm(f => ({
      ...f,
      interests: f.interests.includes(i) ? f.interests.filter(x => x !== i) : [...f.interests, i],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--black)" }}>
      {/* Header */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ background: "var(--black-2)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top, rgba(201,168,76,0.06) 0%, transparent 60%)" }} />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-gold mb-3">White Glove Service</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book a Private<br />Consultation</h1>
          <p className="text-base" style={{ color: "var(--gray-light)" }}>
            Our senior concierge team is available 24/7 to guide you through any acquisition —
            from initial inquiry to worldwide delivery.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Why consult */}
          <div className="space-y-5">
            <h2 className="text-lg font-bold">What to Expect</h2>
            {[
              { icon: <Calendar size={18} />, title: "Response in 2 Hours", desc: "A dedicated senior concierge contacts you directly — no bots, no junior staff." },
              { icon: <Clock size={18} />, title: "24/7 Availability", desc: "Our team operates across all time zones to serve our global clientele." },
              { icon: <Shield size={18} />, title: "Full Discretion", desc: "All inquiries are handled with complete confidentiality." },
              { icon: "🌍", title: "Worldwide Coverage", desc: "We have logistics partners in 180+ countries for seamless delivery." },
              { icon: "💸", title: "Negotiation Support", desc: "We negotiate on your behalf to ensure the best possible terms." },
              { icon: "⚖️", title: "Legal & Compliance", desc: "Our legal team handles KYC, AML, customs, and title transfers." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <div className="text-gold mt-0.5 flex-shrink-0">
                  {typeof icon === "string" ? <span>{icon}</span> : icon}
                </div>
                <div>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--gray)" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="rounded-2xl p-12 text-center" style={{ background: "var(--black-2)", border: "1px solid rgba(201,168,76,0.2)" }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold))" }}>
                  <Check size={28} className="text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Request Received</h3>
                <p className="mb-1" style={{ color: "var(--gray-light)" }}>Your dedicated concierge will reach out within 2 hours.</p>
                <p className="text-sm" style={{ color: "var(--gray)" }}>Check your email — including spam folder.</p>
              </div>
            ) : (
              <div className="rounded-2xl p-8" style={{ background: "var(--black-2)", border: "1px solid rgba(201,168,76,0.15)" }}>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { key: "name", label: "Full Name", type: "text" },
                      { key: "phone", label: "Phone / WhatsApp", type: "tel" },
                      { key: "email", label: "Email Address", type: "email" },
                      { key: "country", label: "Country of Residence", type: "text" },
                    ].map(({ key, label, type }) => (
                      <div key={key}>
                        <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: "var(--gray)" }}>{label}</label>
                        <input required type={type} value={form[key as keyof typeof form] as string}
                          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                          style={{ background: "var(--black-3)", border: "1px solid rgba(201,168,76,0.2)", color: "var(--white)" }} />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "var(--gray)" }}>I&apos;m Interested In</label>
                    <div className="flex flex-wrap gap-2">
                      {interests.map(i => (
                        <button key={i} type="button" onClick={() => toggleInterest(i)}
                          className="px-3 py-1.5 rounded-full text-sm transition-all"
                          style={form.interests.includes(i)
                            ? { background: "var(--gold)", color: "var(--black)", fontWeight: 600 }
                            : { background: "var(--black-3)", color: "var(--gray)", border: "1px solid rgba(201,168,76,0.2)" }
                          }>
                          {i}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: "var(--gray)" }}>Budget Range</label>
                      <select required value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                        style={{ background: "var(--black-3)", border: "1px solid rgba(201,168,76,0.2)", color: "var(--white)" }}>
                        <option value="">Select range</option>
                        {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: "var(--gray)" }}>Purchase Timeline</label>
                      <select required value={form.timeline} onChange={e => setForm(f => ({ ...f, timeline: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                        style={{ background: "var(--black-3)", border: "1px solid rgba(201,168,76,0.2)", color: "var(--white)" }}>
                        <option value="">Select timeline</option>
                        {timelines.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: "var(--gray)" }}>Tell us more (optional)</label>
                    <textarea rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Specific requirements, preferred brands, delivery location, custom configurations..."
                      className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
                      style={{ background: "var(--black-3)", border: "1px solid rgba(201,168,76,0.2)", color: "var(--white)" }} />
                  </div>

                  <button type="submit" className="btn-gold w-full py-4 rounded-lg text-sm uppercase tracking-widest font-bold">
                    Request Private Consultation
                  </button>
                  <p className="text-xs text-center" style={{ color: "var(--gray)" }}>
                    🔒 Strictly confidential · No obligation · Responded to within 2 hours
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight, Shield, Globe, Zap, Lock, FileText, Wallet } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--black)" }}>
      {/* Header */}
      <section className="py-20 px-6 text-center" style={{ background: "var(--black-2)", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
        <p className="text-xs uppercase tracking-widest text-gold mb-3">Complete Guide</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">How LuxChain Works</h1>
        <p className="max-w-xl mx-auto text-base" style={{ color: "var(--gray-light)" }}>
          Buying luxury assets with crypto is simple, secure, and completely transparent. Here&apos;s everything you need to know.
        </p>
      </section>

      {/* Steps */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {[
              {
                step: "01",
                icon: "🔍",
                title: "Browse the Catalog",
                desc: "Our catalog features handpicked ultra-luxury assets from sellers worldwide. Every listing is verified by our team. Browse by category — supercars, real estate, yachts, private jets, watches, and jewelry.",
                detail: "All prices are displayed in USD with real-time crypto equivalents based on live market rates (BTC, ETH, USDC).",
              },
              {
                step: "02",
                icon: <Wallet size={28} />,
                title: "No Account Required",
                desc: "You don't need to create an account. Simply provide your shipping details at checkout. Your crypto wallet IS your identity.",
                detail: "We accept MetaMask, Trust Wallet, Coinbase Wallet, Ledger, and any Web3-compatible wallet.",
              },
              {
                step: "03",
                icon: <Shield size={28} />,
                title: "Escrow-Protected Payment",
                desc: "When you pay, your crypto goes to our audited escrow smart contract — not directly to the seller. Funds are released only when delivery is confirmed.",
                detail: "The escrow contract is immutable and audited by a third-party security firm. No single party (including LuxChain) can unilaterally release funds.",
              },
              {
                step: "04",
                icon: "📋",
                title: "KYC & AML Compliance",
                desc: "For purchases over $10,000, we are required by law to perform identity verification. This protects you and us.",
                detail: "KYC is handled via a secure, encrypted portal. Documents are never stored on our servers beyond the required retention period.",
              },
              {
                step: "05",
                icon: <Globe size={28} />,
                title: "Worldwide Logistics",
                desc: "Once payment is confirmed on-chain, our logistics partners take over. We handle all export/import documentation, insurance, and customs.",
                detail: "For real estate, our partner notary network handles title transfer in 30+ jurisdictions. For vehicles, we use Enclosed Auto Transport and Roro shipping.",
              },
              {
                step: "06",
                icon: <Zap size={28} />,
                title: "Delivery & Escrow Release",
                desc: "Upon confirmed delivery, you release the escrow funds to the seller via a simple confirmation step. If there is a dispute, our mediation team steps in.",
                detail: "Disputes are resolved within 14 business days. In case of non-delivery, 100% of funds are returned to your wallet.",
              },
            ].map(({ step, icon, title, desc, detail }) => (
              <div key={step} className="flex gap-6 md:gap-10">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                    style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "var(--gold)" }}>
                    {typeof icon === "string" ? icon : icon}
                  </div>
                  <div className="w-px flex-1 mt-4" style={{ background: "rgba(201,168,76,0.15)", minHeight: "2rem" }} />
                </div>
                <div className="pb-10">
                  <div className="text-xs font-mono text-gold mb-1">{step}</div>
                  <h3 className="text-xl font-bold mb-3">{title}</h3>
                  <p className="text-base mb-3" style={{ color: "var(--gray-light)" }}>{desc}</p>
                  <p className="text-sm p-4 rounded-lg" style={{ color: "var(--gray)", background: "var(--black-2)", border: "1px solid rgba(201,168,76,0.1)" }}>
                    ℹ️ {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accepted Cryptos */}
      <section className="py-20 px-6" style={{ background: "var(--black-2)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Accepted Cryptocurrencies</h2>
          <p className="mb-10" style={{ color: "var(--gray)" }}>We accept three currencies to maximize accessibility and stability.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "₿", name: "Bitcoin", symbol: "BTC", color: "#F7931A", desc: "The original store of value. Ideal for large purchases." },
              { icon: "Ξ", name: "Ethereum", symbol: "ETH", color: "#627EEA", desc: "Smart contract native. Fastest confirmations." },
              { icon: "$", name: "USD Coin", symbol: "USDC", color: "#2775CA", desc: "Stablecoin pegged 1:1 to USD. No volatility risk." },
            ].map(({ icon, name, symbol, color, desc }) => (
              <div key={symbol} className="rounded-2xl p-6" style={{ background: "var(--black-3)", border: "1px solid rgba(201,168,76,0.12)" }}>
                <div className="text-4xl font-bold mb-3" style={{ color }}>{icon}</div>
                <h3 className="font-bold text-lg mb-1">{name}</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(201,168,76,0.08)", color: "var(--gold)" }}>{symbol}</span>
                <p className="text-sm mt-3" style={{ color: "var(--gray)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is LuxChain legal?", a: "Yes. We operate under the laws of international commerce and comply with AML/KYC regulations. We partner with licensed brokers, notaries, and logistics companies in every jurisdiction." },
              { q: "What happens if the crypto price changes after I pay?", a: "You pay the crypto amount equivalent at the time of checkout. If the price rises before confirmation, no additional payment is needed. If it falls, no refund for the difference — the USD price is fixed." },
              { q: "How do I know the seller is legitimate?", a: "Every seller undergoes an identity and asset verification process before their listing goes live. Physical assets are inspected by a third party before being listed." },
              { q: "Can I buy real estate in any country?", a: "We currently support real estate transactions in 30+ countries. Our notary network handles all local legal requirements. A list of supported jurisdictions is available on request." },
              { q: "What if I want to cancel my order?", a: "Orders can be cancelled before payment confirmation at no cost. After payment confirmation, cancellation is subject to our escrow resolution process (14-day dispute window)." },
              { q: "Is there a minimum purchase amount?", a: "No minimum. However, for purchases under $5,000, crypto gas fees may represent a significant percentage of the total." },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl p-5" style={{ background: "var(--black-2)", border: "1px solid rgba(201,168,76,0.1)" }}>
                <p className="font-semibold mb-2 text-gold">{q}</p>
                <p className="text-sm" style={{ color: "var(--gray-light)" }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center" style={{ background: "var(--black-2)" }}>
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-8" style={{ color: "var(--gray)" }}>Browse the finest luxury assets available for crypto purchase.</p>
        <Link href="/catalog" className="btn-gold px-8 py-4 rounded text-sm uppercase tracking-widest inline-flex items-center gap-2">
          Browse Catalog <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}

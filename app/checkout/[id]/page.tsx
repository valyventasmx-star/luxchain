"use client";
import { useState } from "react";
import { use } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, cryptos, formatUSD, formatCrypto } from "@/lib/data";
import { Shield, ChevronRight, Check, Copy, ArrowLeft } from "lucide-react";

const ESCROW_WALLETS: Record<string, string> = {
  BTC: process.env.NEXT_PUBLIC_WALLET_BTC || "bc1q_SET_YOUR_BTC_ADDRESS_IN_ENV",
  ETH: process.env.NEXT_PUBLIC_WALLET_ETH || "0x_SET_YOUR_ETH_ADDRESS_IN_ENV",
  USDC: process.env.NEXT_PUBLIC_WALLET_USDC || "0x_SET_YOUR_ETH_ADDRESS_IN_ENV",
};

function CheckoutContent({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cryptoParam = searchParams.get("crypto") || "ETH";

  const product = products.find(p => p.id === id);
  if (!product) notFound();

  const [step, setStep] = useState(1);
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoParam);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", country: "", zip: "",
    walletAddress: "",
  });

  const cryptoPrice = product.cryptoPrices[selectedCrypto as keyof typeof product.cryptoPrices];
  const escrowWallet = ESCROW_WALLETS[selectedCrypto];
  const orderId = `LXC-${Date.now().toString(36).toUpperCase()}`;

  function copyAddress() {
    navigator.clipboard.writeText(escrowWallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep(3);
  }

  const steps = [
    { n: 1, label: "Shipping" },
    { n: 2, label: "Payment" },
    { n: 3, label: "Confirm" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20" style={{ background: "var(--black)" }}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Link href={`/product/${product.id}`} className="inline-flex items-center gap-2 text-sm text-gold mb-8 hover:opacity-70 transition-opacity">
          <ArrowLeft size={16} /> Back to Product
        </Link>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-12">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                  style={step >= s.n
                    ? { background: "var(--gold)", color: "var(--black)" }
                    : { background: "var(--black-3)", color: "var(--gray)", border: "1px solid rgba(201,168,76,0.2)" }
                  }
                >
                  {step > s.n ? <Check size={16} /> : s.n}
                </div>
                <span className="text-xs mt-1 uppercase tracking-widest" style={{ color: step >= s.n ? "var(--gold)" : "var(--gray)" }}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="h-px flex-1 -mt-5" style={{ background: step > s.n ? "var(--gold)" : "rgba(201,168,76,0.2)" }} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2">

            {/* Step 1: Shipping */}
            {step === 1 && (
              <div className="rounded-2xl p-6" style={{ background: "var(--black-2)", border: "1px solid rgba(201,168,76,0.15)" }}>
                <h2 className="text-xl font-bold mb-6">Shipping Details</h2>
                <form onSubmit={e => { e.preventDefault(); setStep(2); }}>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {[
                      { key: "firstName", label: "First Name", type: "text", span: 1 },
                      { key: "lastName", label: "Last Name", type: "text", span: 1 },
                      { key: "email", label: "Email Address", type: "email", span: 2 },
                      { key: "phone", label: "Phone Number", type: "tel", span: 2 },
                      { key: "address", label: "Delivery Address", type: "text", span: 2 },
                      { key: "city", label: "City", type: "text", span: 1 },
                      { key: "zip", label: "Postal / ZIP Code", type: "text", span: 1 },
                      { key: "country", label: "Country", type: "text", span: 2 },
                      { key: "walletAddress", label: "Your Wallet Address (for refunds)", type: "text", span: 2 },
                    ].map(({ key, label, type, span }) => (
                      <div key={key} className={span === 2 ? "col-span-2" : "col-span-1"}>
                        <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "var(--gray)" }}>{label}</label>
                        <input
                          type={type}
                          required
                          value={form[key as keyof typeof form]}
                          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                          className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                          style={{ background: "var(--black-3)", border: "1px solid rgba(201,168,76,0.2)", color: "var(--white)" }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-4 rounded-lg text-sm" style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.15)" }}>
                    <p className="font-semibold text-gold mb-1">📦 Worldwide Shipping</p>
                    <p style={{ color: "var(--gray)" }}>
                      We ship to 180+ countries. Estimated delivery: 5–30 business days depending on location and item type.
                      Large assets (cars, yachts, jets) include dedicated logistics coordination.
                    </p>
                  </div>

                  <button type="submit" className="btn-gold w-full py-4 rounded-lg mt-6 text-sm uppercase tracking-widest font-bold">
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="rounded-2xl p-6" style={{ background: "var(--black-2)", border: "1px solid rgba(201,168,76,0.15)" }}>
                <h2 className="text-xl font-bold mb-6">Crypto Payment</h2>

                {/* Crypto selector */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {cryptos.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCrypto(c.id)}
                      className="py-4 rounded-xl text-center transition-all"
                      style={selectedCrypto === c.id
                        ? { background: "var(--gold)", color: "var(--black)", border: "2px solid var(--gold)" }
                        : { background: "var(--black-3)", border: "2px solid rgba(201,168,76,0.15)" }
                      }
                    >
                      <div className="text-2xl font-bold" style={{ color: selectedCrypto === c.id ? "var(--black)" : c.color }}>{c.icon}</div>
                      <div className="text-sm font-bold mt-1">{c.name}</div>
                      <div className="text-xs" style={{ color: selectedCrypto === c.id ? "rgba(0,0,0,0.6)" : "var(--gray)" }}>{c.symbol}</div>
                    </button>
                  ))}
                </div>

                {/* Amount */}
                <div className="rounded-xl p-5 mb-6 text-center"
                  style={{ background: "var(--black-3)", border: "1px solid rgba(201,168,76,0.2)" }}>
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--gray)" }}>Send Exactly</p>
                  <p className="text-3xl font-bold text-gold font-mono">{formatCrypto(cryptoPrice, selectedCrypto)}</p>
                  <p className="text-sm mt-1" style={{ color: "var(--gray)" }}>≈ {formatUSD(product.price)}</p>
                </div>

                {/* Escrow wallet */}
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--gray)" }}>Escrow Wallet Address</p>
                  <div className="flex items-center gap-2 rounded-xl px-4 py-3"
                    style={{ background: "var(--black-3)", border: "1px solid rgba(201,168,76,0.2)" }}>
                    <code className="text-xs font-mono flex-1 break-all" style={{ color: "var(--gold)" }}>{escrowWallet}</code>
                    <button onClick={copyAddress} className="flex-shrink-0 p-2 rounded-lg transition-all"
                      style={{ background: copied ? "var(--gold)" : "rgba(201,168,76,0.1)", color: copied ? "var(--black)" : "var(--gold)" }}>
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  <p className="text-xs mt-2" style={{ color: "var(--gray)" }}>⚠️ Only send {selectedCrypto} to this address. Funds are held in escrow until delivery.</p>
                </div>

                {/* Instructions */}
                <div className="rounded-xl p-4 mb-6" style={{ background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.12)" }}>
                  <p className="text-sm font-semibold text-gold mb-3">Payment Instructions</p>
                  <ol className="space-y-2 text-sm" style={{ color: "var(--gray-light)" }}>
                    <li>1. Copy the escrow wallet address above</li>
                    <li>2. Open your {selectedCrypto} wallet (MetaMask, Trust Wallet, Coinbase, etc.)</li>
                    <li>3. Send exactly <strong className="text-gold">{formatCrypto(cryptoPrice, selectedCrypto)}</strong></li>
                    <li>4. Include your order reference: <strong className="text-gold font-mono">{orderId}</strong> in memo/note if possible</li>
                    <li>5. Once confirmed on-chain, click &ldquo;I&apos;ve Sent Payment&rdquo; below</li>
                  </ol>
                </div>

                <form onSubmit={handleSubmit}>
                  <button type="submit" className="btn-gold w-full py-4 rounded-lg text-sm uppercase tracking-widest font-bold">
                    I&apos;ve Sent Payment →
                  </button>
                </form>

                <button onClick={() => setStep(1)} className="w-full py-3 mt-3 text-sm text-center"
                  style={{ color: "var(--gray)" }}>
                  ← Back to Shipping
                </button>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="rounded-2xl p-8 text-center" style={{ background: "var(--black-2)", border: "1px solid rgba(201,168,76,0.2)" }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold))" }}>
                  <Check size={28} className="text-black" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Order Submitted!</h2>
                <p className="mb-1" style={{ color: "var(--gray-light)" }}>We&apos;re waiting for your payment confirmation on the blockchain.</p>
                <div className="my-6 py-3 px-6 rounded-xl inline-block"
                  style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.25)" }}>
                  <span className="text-xs uppercase tracking-widest" style={{ color: "var(--gray)" }}>Order ID </span>
                  <span className="text-lg font-bold font-mono text-gold ml-2">{orderId}</span>
                </div>
                <p className="text-sm mb-8" style={{ color: "var(--gray)" }}>
                  A confirmation will be sent to <strong style={{ color: "var(--white)" }}>{form.email}</strong> within 15 minutes of blockchain confirmation.
                  Typical delivery: 5–30 business days.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href={`/order/${orderId}`} className="btn-gold px-6 py-3 rounded text-sm uppercase tracking-widest">
                    Track My Order
                  </Link>
                  <Link href="/catalog" className="btn-outline-gold px-6 py-3 rounded text-sm uppercase tracking-widest">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div>
            <div className="rounded-2xl p-5 sticky top-28" style={{ background: "var(--black-2)", border: "1px solid rgba(201,168,76,0.15)" }}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gold mb-4">Order Summary</h3>
              <div className="relative rounded-xl overflow-hidden mb-4" style={{ aspectRatio: "16/9" }}>
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
              </div>
              <p className="text-xs text-gold uppercase tracking-widest">{product.brand}</p>
              <p className="font-semibold mb-1">{product.name}</p>
              <p className="text-xs mb-4" style={{ color: "var(--gray)" }}>📍 {product.location}</p>
              <div className="divider-gold mb-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: "var(--gray)" }}>Asset Price</span>
                  <span>{formatUSD(product.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--gray)" }}>Platform Fee</span>
                  <span>0%</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--gray)" }}>Shipping</span>
                  <span>Included</span>
                </div>
              </div>
              <div className="divider-gold my-4" />
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="text-lg font-bold text-gold">{formatUSD(product.price)}</span>
              </div>
              <div className="mt-3 text-center font-mono text-sm text-gold">
                {formatCrypto(cryptoPrice, selectedCrypto)}
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs" style={{ color: "var(--gray)" }}>
                <Shield size={14} className="text-gold flex-shrink-0" />
                Protected by LuxChain Escrow
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center" style={{ background: "var(--black)", color: "var(--gold)" }}>Loading...</div>}>
      <CheckoutContent id={id} />
    </Suspense>
  );
}

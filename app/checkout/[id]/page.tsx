"use client";

import { useState, use, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, cryptos, formatUSD, formatCrypto } from "@/lib/data";
import { Shield, Check, Copy, ArrowLeft } from "lucide-react";

const ESCROW_WALLETS: Record<string, string> = {
  BTC: process.env.NEXT_PUBLIC_WALLET_BTC || "bc1q_SET_YOUR_BTC_ADDRESS_IN_ENV",
  ETH: process.env.NEXT_PUBLIC_WALLET_ETH || "0x_SET_YOUR_ETH_ADDRESS_IN_ENV",
  USDC: process.env.NEXT_PUBLIC_WALLET_USDC || "0x_SET_YOUR_ETH_ADDRESS_IN_ENV",
};

function CheckoutContent({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const cryptoParam = searchParams.get("crypto") || "ETH";

  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const [step, setStep] = useState(1);
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoParam);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    walletAddress: "",
  });

  const cryptoPrice =
    product.cryptoPrices[selectedCrypto as keyof typeof product.cryptoPrices];

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
    <main
      className="min-h-screen overflow-x-hidden page-top-spacing"
      style={{ background: "var(--black)" }}
    >
      <section className="page-shell pb-28">
        <Link
          href={`/product/${product.id}`}
          className="mb-10 inline-flex items-center gap-2 text-sm text-gold opacity-80 transition hover:opacity-100"
        >
          <ArrowLeft size={16} /> Back to Product
        </Link>

        <div className="mx-auto mb-14 max-w-4xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">
            Secure Crypto Checkout
          </p>

          <h1 className="text-5xl font-bold leading-tight md:text-7xl">
            Complete Your Acquisition
          </h1>

          <p
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--gray-light)" }}
          >
            Your payment is routed through LuxChain escrow. Funds are protected
            until delivery and verification are complete.
          </p>
        </div>

        <div className="mx-auto mb-14 flex max-w-3xl items-center justify-center">
          {steps.map((s, i) => (
            <div key={s.n} className="flex flex-1 items-center">
              <div className="flex flex-1 flex-col items-center">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold"
                  style={
                    step >= s.n
                      ? { background: "var(--gold)", color: "var(--black)" }
                      : {
                          background: "var(--black-3)",
                          color: "var(--gray)",
                          border: "1px solid rgba(201,168,76,0.2)",
                        }
                  }
                >
                  {step > s.n ? <Check size={16} /> : s.n}
                </div>

                <span
                  className="mt-3 text-xs uppercase tracking-widest"
                  style={{ color: step >= s.n ? "var(--gold)" : "var(--gray)" }}
                >
                  {s.label}
                </span>
              </div>

              {i < steps.length - 1 && (
                <div
                  className="-mt-7 h-px flex-1"
                  style={{
                    background:
                      step > s.n ? "var(--gold)" : "rgba(201,168,76,0.2)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-14">
          <div
            className="rounded-[2rem] p-6 md:p-9"
            style={{
              background:
                "linear-gradient(180deg, rgba(26,26,26,0.98), rgba(17,17,17,0.98))",
              border: "1px solid rgba(201,168,76,0.18)",
              boxShadow: "0 30px 90px rgba(0,0,0,0.35)",
            }}
          >
            {step === 1 && (
              <>
                <div className="mb-8">
                  <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
                    Step 01
                  </p>
                  <h2 className="text-3xl font-bold">Shipping Details</h2>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep(2);
                  }}
                >
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {[
                      {
                        key: "firstName",
                        label: "First Name",
                        type: "text",
                        span: false,
                      },
                      {
                        key: "lastName",
                        label: "Last Name",
                        type: "text",
                        span: false,
                      },
                      {
                        key: "email",
                        label: "Email Address",
                        type: "email",
                        span: true,
                      },
                      {
                        key: "phone",
                        label: "Phone Number",
                        type: "tel",
                        span: true,
                      },
                      {
                        key: "address",
                        label: "Delivery Address",
                        type: "text",
                        span: true,
                      },
                      {
                        key: "city",
                        label: "City",
                        type: "text",
                        span: false,
                      },
                      {
                        key: "zip",
                        label: "Postal / ZIP Code",
                        type: "text",
                        span: false,
                      },
                      {
                        key: "country",
                        label: "Country",
                        type: "text",
                        span: true,
                      },
                      {
                        key: "walletAddress",
                        label: "Wallet Address For Refunds",
                        type: "text",
                        span: true,
                      },
                    ].map(({ key, label, type, span }) => (
                      <div
                        key={key}
                        className={span ? "md:col-span-2" : ""}
                      >
                        <label
                          className="mb-2 block text-xs uppercase tracking-widest"
                          style={{ color: "var(--gray)" }}
                        >
                          {label}
                        </label>

                        <input
                          type={type}
                          required
                          value={form[key as keyof typeof form]}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              [key]: e.target.value,
                            }))
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

                  <div
                    className="mt-6 rounded-2xl p-5 text-sm"
                    style={{
                      background: "rgba(201,168,76,0.05)",
                      border: "1px solid rgba(201,168,76,0.14)",
                    }}
                  >
                    <p className="mb-2 font-semibold text-gold">
                      Worldwide Shipping
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{ color: "var(--gray)" }}
                    >
                      We ship to 180+ countries. Large assets include dedicated
                      logistics coordination and white-glove handoff.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="btn-gold mt-7 w-full rounded-xl py-4 text-sm font-bold uppercase tracking-widest"
                  >
                    Continue to Payment
                  </button>
                </form>
              </>
            )}

            {step === 2 && (
              <>
                <div className="mb-8">
                  <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
                    Step 02
                  </p>
                  <h2 className="text-3xl font-bold">Crypto Payment</h2>
                </div>

                <div className="mb-7 grid grid-cols-3 gap-3">
                  {cryptos.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCrypto(c.id)}
                      className="rounded-2xl py-4 text-center transition"
                      style={
                        selectedCrypto === c.id
                          ? {
                              background: "var(--gold)",
                              color: "var(--black)",
                            }
                          : {
                              background: "var(--black-3)",
                              color: "var(--gray-light)",
                              border: "1px solid rgba(201,168,76,0.14)",
                            }
                      }
                    >
                      <div className="text-lg font-bold">{c.icon}</div>
                      <div className="mt-1 text-xs">{c.symbol}</div>
                    </button>
                  ))}
                </div>

                <div
                  className="mb-7 rounded-2xl p-6 text-center"
                  style={{
                    background: "var(--black-3)",
                    border: "1px solid rgba(201,168,76,0.18)",
                  }}
                >
                  <p
                    className="mb-3 text-xs uppercase tracking-widest"
                    style={{ color: "var(--gray)" }}
                  >
                    Send Exactly
                  </p>

                  <p className="font-mono text-3xl font-bold text-gold">
                    {formatCrypto(cryptoPrice, selectedCrypto)}
                  </p>

                  <p className="mt-2 text-sm" style={{ color: "var(--gray)" }}>
                    ≈ {formatUSD(product.price)}
                  </p>
                </div>

                <div className="mb-7">
                  <p
                    className="mb-2 text-xs uppercase tracking-widest"
                    style={{ color: "var(--gray)" }}
                  >
                    Escrow Wallet Address
                  </p>

                  <div
                    className="flex items-center gap-2 rounded-2xl px-4 py-3"
                    style={{
                      background: "var(--black-3)",
                      border: "1px solid rgba(201,168,76,0.18)",
                    }}
                  >
                    <code className="flex-1 break-all font-mono text-xs text-gold">
                      {escrowWallet}
                    </code>

                    <button
                      onClick={copyAddress}
                      className="rounded-xl p-2"
                      style={{
                        background: copied
                          ? "var(--gold)"
                          : "rgba(201,168,76,0.1)",
                        color: copied ? "var(--black)" : "var(--gold)",
                      }}
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <button
                    type="submit"
                    className="btn-gold w-full rounded-xl py-4 text-sm font-bold uppercase tracking-widest"
                  >
                    I&apos;ve Sent Payment
                  </button>
                </form>

                <button
                  onClick={() => setStep(1)}
                  className="mt-4 w-full py-3 text-sm"
                  style={{ color: "var(--gray)" }}
                >
                  ← Back to Shipping
                </button>
              </>
            )}

            {step === 3 && (
              <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                <div
                  className="mb-7 flex h-20 w-20 items-center justify-center rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                  }}
                >
                  <Check size={34} className="text-black" />
                </div>

                <h2 className="mb-3 text-4xl font-bold">Order Submitted</h2>

                <p
                  className="max-w-md leading-relaxed"
                  style={{ color: "var(--gray-light)" }}
                >
                  We&apos;re waiting for your payment confirmation on the
                  blockchain.
                </p>

                <div
                  className="my-8 rounded-2xl px-6 py-4"
                  style={{
                    background: "rgba(201,168,76,0.08)",
                    border: "1px solid rgba(201,168,76,0.25)",
                  }}
                >
                  <span
                    className="text-xs uppercase tracking-widest"
                    style={{ color: "var(--gray)" }}
                  >
                    Order ID
                  </span>
                  <span className="ml-3 font-mono text-lg font-bold text-gold">
                    {orderId}
                  </span>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/order/${orderId}`}
                    className="btn-gold rounded-xl px-6 py-3 text-sm uppercase tracking-widest"
                  >
                    Track My Order
                  </Link>

                  <Link
                    href="/catalog"
                    className="btn-outline-gold rounded-xl px-6 py-3 text-sm uppercase tracking-widest"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            )}
          </div>

          <aside
            className="h-fit rounded-[2rem] p-5 lg:sticky lg:top-36"
            style={{
              background: "var(--black-2)",
              border: "1px solid rgba(201,168,76,0.18)",
              boxShadow: "0 30px 90px rgba(0,0,0,0.35)",
            }}
          >
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">
              Order Summary
            </p>

            <div className="relative mb-5 overflow-hidden rounded-2xl aspect-[16/10]">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <p className="text-xs uppercase tracking-widest text-gold">
              {product.brand}
            </p>

            <p className="mt-1 text-lg font-semibold">{product.name}</p>

            <p className="mt-1 text-xs" style={{ color: "var(--gray)" }}>
              📍 {product.location}
            </p>

            <div className="divider-gold my-5" />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span style={{ color: "var(--gray)" }}>Asset Price</span>
                <span>{formatUSD(product.price)}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span style={{ color: "var(--gray)" }}>Platform Fee</span>
                <span>0%</span>
              </div>

              <div className="flex justify-between gap-4">
                <span style={{ color: "var(--gray)" }}>Shipping</span>
                <span>Included</span>
              </div>
            </div>

            <div className="divider-gold my-5" />

            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-bold text-gold">
                {formatUSD(product.price)}
              </span>
            </div>

            <div className="mt-3 text-center font-mono text-sm text-gold">
              {formatCrypto(cryptoPrice, selectedCrypto)}
            </div>

            <div
              className="mt-6 flex items-center gap-2 text-xs"
              style={{ color: "var(--gray)" }}
            >
              <Shield size={14} className="shrink-0 text-gold" />
              Protected by LuxChain Escrow
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-screen items-center justify-center page-top-spacing"
          style={{ background: "var(--black)", color: "var(--gold)" }}
        >
          Loading...
        </div>
      }
    >
      <CheckoutContent id={id} />
    </Suspense>
  );
}

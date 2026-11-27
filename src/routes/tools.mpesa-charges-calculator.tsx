import { createFileRoute } from "@tanstack/react-router";
import { useId, useMemo, useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { COMPANY, SITE_URL, breadcrumbSchema, pageHead } from "@/lib/seo";
import {
  calculateMpesaCharge,
  formatKes,
  MPESA_MAX_DAILY,
  MPESA_MAX_PER_TX,
  MPESA_TARIFF_BANDS,
  type MpesaTransactionType,
} from "@/lib/calculators";
import { ToolPageLayout, type ToolFaq } from "@/components/tools/ToolPageLayout";

const MPESA_FAQS: ToolFaq[] = [
  {
    q: "How much does it cost to send Ksh 100 or less on M-Pesa?",
    a: "Sending between Ksh 1 and Ksh 100 to a registered M-Pesa user is free (Ksh 0). From Ksh 101 upwards, tiered fees apply up to a cap of Ksh 108 for amounts from Ksh 20,001 to Ksh 250,000.",
  },
  {
    q: "What is the maximum M-Pesa transaction limit?",
    a: "Safaricom's single-transaction limit is Ksh 250,000, with a daily transaction limit of Ksh 500,000 and maximum wallet balance of Ksh 500,000.",
  },
  {
    q: "How much extra should I send if I want the recipient to withdraw the exact amount in cash?",
    a: "When Send Money is selected, this calculator automatically shows the recipient's agent withdrawal fee and the combined total so you can cover their cash-out cost cleanly.",
  },
];

const QUICK_AMOUNTS = [500, 1000, 2500, 5000, 10000, 25000, 50000];

export const Route = createFileRoute("/tools/mpesa-charges-calculator")({
  component: MpesaChargesCalculatorPage,
  head: () => {
    const head = pageHead({
      title: `M-Pesa Transaction Charges Calculator Kenya (KES) | ${COMPANY}`,
      description:
        "Check Safaricom M-Pesa Send Money and Agent Withdrawal fees in KES up to Ksh 250,000, including full tariff bands and cash-out fee coverage.",
      path: "/tools/mpesa-charges-calculator",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: `M-Pesa Transaction Charges Calculator | ${COMPANY}`,
            url: `${SITE_URL}/tools/mpesa-charges-calculator`,
            applicationCategory: "FinanceApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "KES" },
            provider: { "@type": "Organization", name: COMPANY, url: SITE_URL },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Free Tools", path: "/tools" },
              { name: "M-Pesa Charges Calculator", path: "/tools/mpesa-charges-calculator" },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: MPESA_FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
});

function MpesaChargesCalculatorPage() {
  const id = useId();
  const [amount, setAmount] = useState(5000);
  const [txType, setTxType] = useState<MpesaTransactionType>("send-registered");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => calculateMpesaCharge(amount, txType), [amount, txType]);

  async function copySummary() {
    if (!result.allowed) return;
    const label = txType === "send-registered" ? "M-Pesa Send Money" : "M-Pesa Agent Withdrawal";
    const lines = [
      label,
      `Amount: ${formatKes(result.amount)}`,
      `M-Pesa Fee: ${formatKes(result.fee)}`,
      `Total Debited: ${formatKes(result.totalDebited)}`,
    ];
    if (txType === "send-registered" && result.recipientWithdrawFee !== null) {
      lines.push(`Recipient Agent Withdrawal Fee: ${formatKes(result.recipientWithdrawFee)}`);
    }
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <ToolPageLayout
      breadcrumbLabel="M-Pesa Charges Calculator"
      title="M-Pesa Transaction Charges Calculator"
      subtitle="Look up Safaricom M-Pesa Send Money and Agent Withdrawal charges in KES instantly, plus see the exact extra amount needed to cover recipient withdrawal fees."
      guideBlocks={[
        {
          heading: "Send Money vs Agent Withdrawal fees",
          body: "Sending money to a registered M-Pesa number is free up to Ksh 100 and caps at Ksh 108 for transfers from Ksh 20,001 to Ksh 250,000. Cash withdrawals at M-Pesa agents start at Ksh 50 minimum and scale up to Ksh 309 for amounts above Ksh 50,000. Buy Goods Till payments remain free for customers.",
        },
        {
          heading: "Transaction limits to keep in mind",
          body: `Single M-Pesa transfers support up to Ksh ${MPESA_MAX_PER_TX.toLocaleString("en-KE")} per transaction and Ksh ${MPESA_MAX_DAILY.toLocaleString("en-KE")} per day. Confirm official updates on Safaricom's tariff guide for business Paybill agreements.`,
        },
      ]}
      relatedEyebrow="Accept M-Pesa Automatically"
      relatedHeading="M-Pesa Daraja STK Push & B2C integrations"
      relatedSummary="Automate customer STK Push checkouts, C2B Paybill callbacks, and B2C supplier/payroll payouts directly inside your web app or POS."
      relatedPrimarySlug="mpesa-integrations"
      relatedPrimaryLabel="Explore M-Pesa Integrations"
      faqTitle="Questions about M-Pesa charges"
      faqs={MPESA_FAQS}
    >
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left: Controls & Result */}
        <div className="lg:col-span-5 space-y-5">
          <div className="glass rounded-2xl p-6 border border-border space-y-5">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-accent mb-2">
                Transaction Type
              </span>
              <div
                className="grid grid-cols-2 rounded-lg border border-border bg-secondary/40 p-1"
                role="radiogroup"
                aria-label="M-Pesa transaction type"
              >
                {(
                  [
                    { id: "send-registered", label: "Send Money" },
                    { id: "withdraw-agent", label: "Withdraw at Agent" },
                  ] as const
                ).map((opt) => {
                  const active = txType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setTxType(opt.id)}
                      className={`cursor-pointer rounded-md py-2 px-3 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor={`${id}-amount`}
                className="block text-xs font-medium text-muted-foreground mb-1"
              >
                Amount (KES, max 250,000)
              </label>
              <input
                id={`${id}-amount`}
                type="number"
                min={0}
                max={MPESA_MAX_PER_TX}
                step="any"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-border bg-background/70 px-3 py-2.5 text-base font-mono font-semibold tabular-nums text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {QUICK_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className={`cursor-pointer rounded-md border px-2.5 py-1 text-xs font-mono transition ${
                      amount === amt
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="glass rounded-2xl p-6 border border-primary/35 space-y-4">
            {!result.allowed ? (
              <div role="alert" className="flex items-start gap-3 text-sm text-destructive">
                <AlertCircle className="size-5 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="font-semibold">Transaction not allowed in this band</div>
                  <p className="mt-1 text-xs text-muted-foreground">{result.reason}</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                      M-Pesa Charge
                    </div>
                    <div className="mt-1 text-3xl sm:text-4xl font-bold font-mono tabular-nums">
                      {result.fee === 0 ? "Free (Ksh 0)" : formatKes(result.fee)}
                    </div>
                    {result.band && (
                      <div className="mt-1 text-xs text-muted-foreground">
                        Band: Ksh {result.band.min.toLocaleString()} to{" "}
                        {result.band.max.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={copySummary}
                    className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary transition"
                  >
                    {copied ? (
                      <>
                        <Check className="size-3.5 text-emerald-400" aria-hidden="true" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" aria-hidden="true" /> Copy
                      </>
                    )}
                  </button>
                </div>

                <dl className="divide-y divide-border/70 text-sm">
                  <div className="flex justify-between py-2.5">
                    <dt className="text-muted-foreground">Transaction amount</dt>
                    <dd className="font-mono tabular-nums">{formatKes(result.amount)}</dd>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <dt className="text-muted-foreground">M-Pesa fee</dt>
                    <dd className="font-mono tabular-nums text-accent">{formatKes(result.fee)}</dd>
                  </div>
                  <div className="flex justify-between py-2.5 font-bold">
                    <dt>Total deducted from wallet</dt>
                    <dd className="font-mono tabular-nums">{formatKes(result.totalDebited)}</dd>
                  </div>
                </dl>

                {txType === "send-registered" &&
                  result.recipientWithdrawFee !== null &&
                  result.sendPlusWithdrawTotal !== null && (
                    <div className="rounded-xl border border-border bg-secondary/25 p-3.5 text-xs space-y-1">
                      <div className="font-semibold text-foreground">
                        Covering recipient&apos;s cash withdrawal fee?
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Send{" "}
                        <strong className="font-mono text-foreground">
                          {formatKes(result.amount + result.recipientWithdrawFee)}
                        </strong>{" "}
                        (adds {formatKes(result.recipientWithdrawFee)} withdrawal fee). Total
                        deducted from your M-Pesa wallet:{" "}
                        <strong className="font-mono text-foreground">
                          {formatKes(result.sendPlusWithdrawTotal)}
                        </strong>
                        .
                      </p>
                    </div>
                  )}
              </>
            )}
          </div>
        </div>

        {/* Right: Highlighted Tariff Table */}
        <div className="lg:col-span-7 glass rounded-2xl p-5 sm:p-6 border border-border">
          <div className="flex items-center justify-between gap-2 mb-4">
            <h2 className="text-base font-bold tracking-tight">M-Pesa Kenya Tariff Bands (KES)</h2>
            <span className="text-xs text-muted-foreground">Active band highlighted</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2 pr-3 font-semibold">Amount Range (KES)</th>
                  <th className="py-2 px-2 font-semibold text-right">Send Money</th>
                  <th className="py-2 pl-2 font-semibold text-right">Withdraw at Agent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 font-mono tabular-nums">
                {MPESA_TARIFF_BANDS.map((band) => {
                  const isActive = result.band?.min === band.min && result.band?.max === band.max;
                  return (
                    <tr
                      key={`${band.min}-${band.max}`}
                      className={isActive ? "bg-primary/15 text-foreground font-semibold" : ""}
                    >
                      <td className="py-2 pr-3">
                        {band.min.toLocaleString()} - {band.max.toLocaleString()}
                      </td>
                      <td className="py-2 px-2 text-right">
                        {band.sendRegistered === 0 ? "Free" : `Ksh ${band.sendRegistered}`}
                      </td>
                      <td className="py-2 pl-2 text-right">
                        {band.withdrawAgent === null ? "N/A" : `Ksh ${band.withdrawAgent}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}

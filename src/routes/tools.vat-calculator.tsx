import { createFileRoute, Link } from "@tanstack/react-router";
import { useId, useMemo, useState } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";
import { COMPANY, SITE_URL, breadcrumbSchema, pageHead } from "@/lib/seo";
import { calculateVat, formatKes, VAT_PRESETS, type VatDirection } from "@/lib/calculators";
import { ToolPageLayout, type ToolFaq } from "@/components/tools/ToolPageLayout";

const VAT_FAQS: ToolFaq[] = [
  {
    q: "What is the standard VAT rate in Kenya?",
    a: "Kenya's standard Value Added Tax (VAT) rate is 16% on taxable goods and services. Certain exports and essential supplies are zero-rated (0%) or VAT-exempt.",
  },
  {
    q: "How do I extract 16% VAT from a VAT-inclusive price?",
    a: "Divide the inclusive price by 1.16 to get the net (VAT-exclusive) price, then subtract the net price from the inclusive total. For example, Ksh 11,600 inclusive equals Ksh 10,000 net plus Ksh 1,600 VAT.",
  },
  {
    q: "Can I use this for Uganda, Tanzania, or custom VAT rates?",
    a: "Yes. Click any regional preset (Uganda 18%, Tanzania 18%, Rwanda 18%, UK 20%) or type any custom VAT percentage.",
  },
];

export const Route = createFileRoute("/tools/vat-calculator")({
  component: VatCalculatorPage,
  head: () => {
    const head = pageHead({
      title: `Kenya VAT Calculator (16% Exclusive & Inclusive) | ${COMPANY}`,
      description:
        "Add 16% Kenya VAT to a net price or extract VAT from a VAT-inclusive amount in KES. Includes Uganda, Tanzania, Rwanda, and custom VAT rate presets.",
      path: "/tools/vat-calculator",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: `Kenya VAT Calculator (16%) | ${COMPANY}`,
            url: `${SITE_URL}/tools/vat-calculator`,
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
              { name: "Kenya VAT Calculator", path: "/tools/vat-calculator" },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: VAT_FAQS.map((f) => ({
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

function VatCalculatorPage() {
  const id = useId();
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(16);
  const [direction, setDirection] = useState<VatDirection>("exclusive");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => calculateVat(amount, rate, direction), [amount, rate, direction]);

  async function copyResult() {
    const text = [
      `VAT Calculation (${result.rate}% ${direction === "exclusive" ? "Exclusive" : "Inclusive"})`,
      `Net Amount (Excl. VAT): ${formatKes(result.netAmount)}`,
      `VAT (${result.rate}%): ${formatKes(result.vatAmount)}`,
      `Gross Total (Incl. VAT): ${formatKes(result.grossAmount)}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <ToolPageLayout
      breadcrumbLabel="Kenya VAT Calculator"
      title="Kenya VAT Calculator (16%)"
      subtitle="Add 16% Kenya VAT to a net price or extract VAT from a VAT-inclusive total in seconds. Includes presets for East Africa and custom tax rates."
      guideBlocks={[
        {
          heading: "Adding VAT vs extracting VAT",
          body: "Choose Add VAT (Exclusive) when quoting a net price and adding 16% tax on top (Net x 1.16). Choose Extract VAT (Inclusive) when a retail shelf price or receipt already includes VAT and you need the pre-tax value (Gross / 1.16) for KRA eTIMS or bookkeeping.",
        },
        {
          heading: "Ready to send a VAT invoice?",
          body: "Once you verify your net and tax figures, open our free KES Invoice Generator to produce an A4 PDF or 80mm receipt with line-item VAT and automatic amount in words.",
        },
      ]}
      relatedEyebrow="eTIMS & POS Billing"
      relatedHeading="Automate VAT & receipts in your POS"
      relatedSummary="We build retail POS and billing systems with automatic 16% VAT rules, stock valuation, and M-Pesa reconciliation."
      relatedPrimarySlug="pos-systems"
      relatedPrimaryLabel="Explore POS & Billing Systems"
      faqTitle="Questions about Kenya VAT calculation"
      faqs={VAT_FAQS}
    >
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 glass rounded-2xl p-6 border border-border space-y-5">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-accent mb-2">
              Calculation Mode
            </span>
            <div
              className="grid grid-cols-2 rounded-lg border border-border bg-secondary/40 p-1"
              role="radiogroup"
              aria-label="VAT direction"
            >
              {(
                [
                  { id: "exclusive", label: "Add VAT (Exclusive)" },
                  { id: "inclusive", label: "Extract VAT (Inclusive)" },
                ] as const
              ).map((opt) => {
                const active = direction === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setDirection(opt.id)}
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

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`${id}-amount`}
                className="block text-xs font-medium text-muted-foreground mb-1"
              >
                {direction === "exclusive"
                  ? "Net amount before VAT (KES)"
                  : "Gross amount including VAT (KES)"}
              </label>
              <input
                id={`${id}-amount`}
                type="number"
                min={0}
                step="any"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-border bg-background/70 px-3 py-2.5 text-base font-mono font-semibold tabular-nums text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div>
              <label
                htmlFor={`${id}-rate`}
                className="block text-xs font-medium text-muted-foreground mb-1"
              >
                VAT rate (%)
              </label>
              <input
                id={`${id}-rate`}
                type="number"
                min={0}
                max={100}
                step="any"
                inputMode="decimal"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-border bg-background/70 px-3 py-2.5 text-base font-mono font-semibold tabular-nums text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div>
            <div className="text-xs font-medium text-muted-foreground mb-2">Quick rate presets</div>
            <div className="flex flex-wrap gap-2">
              {VAT_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setRate(p.rate)}
                  className={`cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition ${
                    rate === p.rate
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 glass rounded-2xl p-6 border border-primary/35 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                {direction === "exclusive" ? "Gross Total (Incl. VAT)" : "Net Price (Excl. VAT)"}
              </div>
              <div className="mt-1.5 text-3xl sm:text-4xl font-bold font-mono tabular-nums">
                {formatKes(direction === "exclusive" ? result.grossAmount : result.netAmount)}
              </div>
            </div>
            <button
              type="button"
              onClick={copyResult}
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3.5 py-2 text-xs font-medium text-foreground hover:bg-secondary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
            <div className="flex justify-between py-3">
              <dt className="text-muted-foreground">Net amount (excl. VAT)</dt>
              <dd className="font-mono tabular-nums font-semibold">
                {formatKes(result.netAmount)}
              </dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="text-muted-foreground">VAT amount ({result.rate}%)</dt>
              <dd className="font-mono tabular-nums font-semibold text-accent">
                {formatKes(result.vatAmount)}
              </dd>
            </div>
            <div className="flex justify-between py-3 text-base font-bold">
              <dt>Gross total (incl. VAT)</dt>
              <dd className="font-mono tabular-nums">{formatKes(result.grossAmount)}</dd>
            </div>
          </dl>

          <div className="rounded-xl border border-border bg-secondary/25 p-3.5 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-3">
            <span>Need a client-ready VAT invoice or 80mm receipt?</span>
            <Link
              to="/tools/invoice-generator"
              className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
            >
              Invoice Generator <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}

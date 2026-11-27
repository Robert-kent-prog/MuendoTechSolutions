import { createFileRoute } from "@tanstack/react-router";
import { useId, useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { COMPANY, SITE_URL, breadcrumbSchema, pageHead } from "@/lib/seo";
import {
  calculateProfitMargin,
  calculateSellingPriceFromMargin,
  calculateSellingPriceFromMarkup,
  formatKes,
} from "@/lib/calculators";
import { ToolPageLayout, type ToolFaq } from "@/components/tools/ToolPageLayout";

const MARGIN_FAQS: ToolFaq[] = [
  {
    q: "What is the difference between profit margin and markup?",
    a: "Profit margin is profit divided by the selling price. Markup is profit divided by the buying cost. For example, buying at Ksh 800 and selling at Ksh 1,000 gives Ksh 200 profit, which is a 20% gross margin and a 25% markup.",
  },
  {
    q: "Why does confusing margin with markup hurt retail profits?",
    a: "If you want a 30% gross margin on an item costing Ksh 1,000, adding a 30% markup gives Ksh 1,300 (only a 23.1% margin). To hit a true 30% margin, you need to price at Ksh 1,428.57 (a 42.9% markup).",
  },
  {
    q: "Can I reverse-calculate a selling price from my target margin?",
    a: "Yes. Switch to Target Margin or Target Markup mode above and enter your buying cost plus desired percentage to get the exact KES selling price.",
  },
];

export const Route = createFileRoute("/tools/profit-margin-calculator")({
  component: ProfitMarginCalculatorPage,
  head: () => {
    const head = pageHead({
      title: `Profit Margin & Markup Calculator (KES) | ${COMPANY}`,
      description:
        "Calculate gross profit margin %, markup %, profit per unit, and target selling prices in Kenyan Shillings for retail shops, wholesalers, and e-commerce.",
      path: "/tools/profit-margin-calculator",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: `Profit Margin & Markup Calculator | ${COMPANY}`,
            url: `${SITE_URL}/tools/profit-margin-calculator`,
            applicationCategory: "BusinessApplication",
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
              { name: "Profit Margin Calculator", path: "/tools/profit-margin-calculator" },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: MARGIN_FAQS.map((f) => ({
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

const inputClass =
  "w-full rounded-lg border border-border bg-background/70 px-3 py-2.5 text-base font-mono font-semibold tabular-nums text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function ProfitMarginCalculatorPage() {
  const id = useId();
  const [mode, setMode] = useState<"prices" | "target-margin" | "target-markup">("prices");
  const [cost, setCost] = useState(800);
  const [sellingPrice, setSellingPrice] = useState(1200);
  const [targetPercent, setTargetPercent] = useState(30);
  const [copied, setCopied] = useState(false);

  const effectiveSell = useMemo(() => {
    if (mode === "target-margin") return calculateSellingPriceFromMargin(cost, targetPercent);
    if (mode === "target-markup") return calculateSellingPriceFromMarkup(cost, targetPercent);
    return sellingPrice;
  }, [mode, cost, sellingPrice, targetPercent]);

  const result = useMemo(() => calculateProfitMargin(cost, effectiveSell), [cost, effectiveSell]);

  async function copyBreakdown() {
    const text = [
      "Profit Margin & Markup Breakdown",
      `Buying Cost: ${formatKes(result.cost)}`,
      `Selling Price: ${formatKes(result.sellingPrice)}`,
      `Gross Profit: ${formatKes(result.profit)}`,
      `Gross Margin: ${result.marginPercent}%`,
      `Markup: ${result.markupPercent}%`,
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
      breadcrumbLabel="Profit Margin & Markup"
      title="Profit Margin & Markup Calculator"
      subtitle="Calculate gross margin %, markup %, and KES profit per unit from buying cost and selling price, or solve for your ideal retail price from a target margin."
      guideBlocks={[
        {
          heading: "Margin vs markup for Kenyan retail & wholesale",
          body: "Use Cost & Selling Price mode when checking an existing product price. Switch to Target Margin or Target Markup mode when pricing new stock batches so you never underprice after factoring in rent, delivery, and M-Pesa charges.",
        },
        {
          heading: "Track real product margins automatically",
          body: "When you manage hundreds of SKUs across branches, manual spreadsheets fall behind supplier price changes. Our custom POS systems track weighted average cost and live gross profit per sale.",
        },
      ]}
      relatedEyebrow="Retail Stock & Profit Control"
      relatedHeading="POS software with live gross margin tracking"
      relatedSummary="Track buying cost, selling prices, stock valuation, and cashier discounts across one or multiple branches in real time."
      relatedPrimarySlug="pos-systems"
      relatedPrimaryLabel="Explore POS Systems"
      faqTitle="Questions about profit margin and markup"
      faqs={MARGIN_FAQS}
    >
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 glass rounded-2xl p-6 border border-border space-y-5">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-accent mb-2">
              Calculation Mode
            </span>
            <div
              className="grid grid-cols-3 rounded-lg border border-border bg-secondary/40 p-1"
              role="radiogroup"
              aria-label="Profit calculation mode"
            >
              {(
                [
                  { id: "prices", label: "Cost & Price" },
                  { id: "target-margin", label: "Target Margin" },
                  { id: "target-markup", label: "Target Markup" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={mode === opt.id}
                  onClick={() => setMode(opt.id)}
                  className={`cursor-pointer rounded-md py-2 px-2 text-xs font-medium transition ${
                    mode === opt.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`${id}-cost`}
                className="block text-xs font-medium text-muted-foreground mb-1"
              >
                Buying cost (KES)
              </label>
              <input
                id={`${id}-cost`}
                type="number"
                min={0}
                step="any"
                inputMode="decimal"
                value={cost}
                onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
                className={inputClass}
              />
            </div>

            {mode === "prices" ? (
              <div>
                <label
                  htmlFor={`${id}-sell`}
                  className="block text-xs font-medium text-muted-foreground mb-1"
                >
                  Selling price (KES)
                </label>
                <input
                  id={`${id}-sell`}
                  type="number"
                  min={0}
                  step="any"
                  inputMode="decimal"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                  className={inputClass}
                />
              </div>
            ) : (
              <div>
                <label
                  htmlFor={`${id}-target`}
                  className="block text-xs font-medium text-muted-foreground mb-1"
                >
                  {mode === "target-margin" ? "Target gross margin (%)" : "Target markup (%)"}
                </label>
                <input
                  id={`${id}-target`}
                  type="number"
                  min={0}
                  max={mode === "target-margin" ? 99 : 1000}
                  step="any"
                  inputMode="decimal"
                  value={targetPercent}
                  onChange={(e) => setTargetPercent(parseFloat(e.target.value) || 0)}
                  className={inputClass}
                />
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-6 glass rounded-2xl p-6 border border-primary/35 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                {mode === "prices" ? "Profit per Unit" : "Recommended Selling Price"}
              </div>
              <div className="mt-1.5 text-3xl sm:text-4xl font-bold font-mono tabular-nums">
                {formatKes(mode === "prices" ? result.profit : result.sellingPrice)}
              </div>
            </div>
            <button
              type="button"
              onClick={copyBreakdown}
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3.5 py-2 text-xs font-medium text-foreground hover:bg-secondary transition"
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

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-border bg-secondary/25 p-3.5">
              <div className="text-muted-foreground">Gross Margin</div>
              <div className="mt-1 font-mono tabular-nums text-xl font-bold text-accent">
                {result.marginPercent}%
              </div>
            </div>
            <div className="rounded-xl border border-border bg-secondary/25 p-3.5">
              <div className="text-muted-foreground">Markup on Cost</div>
              <div className="mt-1 font-mono tabular-nums text-xl font-bold">
                {result.markupPercent}%
              </div>
            </div>
          </div>

          <dl className="divide-y divide-border/70 text-sm">
            <div className="flex justify-between py-2.5">
              <dt className="text-muted-foreground">Buying cost</dt>
              <dd className="font-mono tabular-nums">{formatKes(result.cost)}</dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-muted-foreground">Selling price</dt>
              <dd className="font-mono tabular-nums font-semibold">
                {formatKes(result.sellingPrice)}
              </dd>
            </div>
            <div className="flex justify-between py-2.5 font-bold">
              <dt>Gross profit per unit</dt>
              <dd
                className={`font-mono tabular-nums ${result.profit < 0 ? "text-destructive" : "text-foreground"}`}
              >
                {formatKes(result.profit)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </ToolPageLayout>
  );
}

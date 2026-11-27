import { createFileRoute } from "@tanstack/react-router";
import { useId, useMemo, useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { COMPANY, SITE_URL, breadcrumbSchema, pageHead } from "@/lib/seo";
import { calculateBreakEven, formatKes } from "@/lib/calculators";
import { ToolPageLayout, type ToolFaq } from "@/components/tools/ToolPageLayout";

const BE_FAQS: ToolFaq[] = [
  {
    q: "What is the break-even point?",
    a: "Your break-even point is the exact number of units (and total revenue) you must sell in a month so your profit covers all fixed overhead (rent, staff salaries, utilities, software) and variable unit costs, leaving zero loss.",
  },
  {
    q: "What is contribution margin per unit?",
    a: "Contribution margin is Selling Price minus Variable Cost per unit. Every unit sold contributes that amount toward paying off your monthly fixed costs; once fixed costs are covered, each additional unit generates pure operating profit.",
  },
];

export const Route = createFileRoute("/tools/break-even-calculator")({
  component: BreakEvenCalculatorPage,
  head: () => {
    const head = pageHead({
      title: `Break-Even Point Calculator for Kenyan SMEs (KES) | ${COMPANY}`,
      description:
        "Find how many units and how much KES monthly revenue your business needs to cover fixed costs, salaries, rent, and unit costs.",
      path: "/tools/break-even-calculator",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: `Break-Even Calculator | ${COMPANY}`,
            url: `${SITE_URL}/tools/break-even-calculator`,
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
              { name: "Break-Even Calculator", path: "/tools/break-even-calculator" },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: BE_FAQS.map((f) => ({
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

function BreakEvenCalculatorPage() {
  const id = useId();
  const [fixedCosts, setFixedCosts] = useState(180000);
  const [variableCost, setVariableCost] = useState(650);
  const [sellingPrice, setSellingPrice] = useState(1400);
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => calculateBreakEven(fixedCosts, variableCost, sellingPrice),
    [fixedCosts, variableCost, sellingPrice],
  );

  async function copySummary() {
    if (!result.viable) return;
    const text = [
      "Monthly Break-Even Analysis",
      `Fixed Costs: ${formatKes(result.fixedCosts)}`,
      `Variable Cost / Unit: ${formatKes(result.variableCostPerUnit)}`,
      `Selling Price / Unit: ${formatKes(result.sellingPricePerUnit)}`,
      `Contribution Margin / Unit: ${formatKes(result.contributionMarginPerUnit)} (${result.contributionMarginRatioPercent}%)`,
      `Break-Even Units: ${result.breakEvenUnits.toLocaleString()} units`,
      `Break-Even Revenue: ${formatKes(result.breakEvenRevenue)}`,
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
      breadcrumbLabel="Break-Even Calculator"
      title="Break-Even Calculator"
      subtitle="See exactly how many units and how much KES monthly revenue your business needs to cover rent, salaries, utilities, and per-unit costs."
      guideBlocks={[
        {
          heading: "Stress-test pricing before launching a product or branch",
          body: "Include monthly rent, staff payroll, power, internet, and licenses under Fixed Costs, and wholesale purchase price, packaging, and delivery under Variable Cost per unit.",
        },
        {
          heading: "Need real-time branch P&L dashboards?",
          body: "We build custom business management platforms that combine daily POS sales, supplier bills, and expense ledgers into live monthly profitability dashboards.",
        },
      ]}
      relatedEyebrow="SME Operations Software"
      relatedHeading="Custom dashboards for sales, stock & expenses"
      relatedSummary="Replace end-of-month guesswork with live web dashboards showing daily sales targets, expenses, and break-even progress."
      relatedPrimarySlug="web-applications"
      relatedPrimaryLabel="Explore Custom Web Apps"
      faqTitle="Questions about break-even analysis"
      faqs={BE_FAQS}
    >
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 glass rounded-2xl p-6 border border-border space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
            Cost & Price Inputs
          </h2>
          <div>
            <label
              htmlFor={`${id}-fixed`}
              className="block text-xs font-medium text-muted-foreground mb-1"
            >
              Monthly fixed costs (rent, salaries, utilities) (KES)
            </label>
            <input
              id={`${id}-fixed`}
              type="number"
              min={0}
              step="any"
              inputMode="decimal"
              value={fixedCosts}
              onChange={(e) => setFixedCosts(parseFloat(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
          <div>
            <label
              htmlFor={`${id}-var`}
              className="block text-xs font-medium text-muted-foreground mb-1"
            >
              Variable cost per unit (buying, packaging, delivery) (KES)
            </label>
            <input
              id={`${id}-var`}
              type="number"
              min={0}
              step="any"
              inputMode="decimal"
              value={variableCost}
              onChange={(e) => setVariableCost(parseFloat(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
          <div>
            <label
              htmlFor={`${id}-price`}
              className="block text-xs font-medium text-muted-foreground mb-1"
            >
              Selling price per unit (KES)
            </label>
            <input
              id={`${id}-price`}
              type="number"
              min={0}
              step="any"
              inputMode="decimal"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="lg:col-span-7 glass rounded-2xl p-6 border border-primary/35 space-y-5">
          {!result.viable ? (
            <div role="alert" className="flex items-start gap-3 text-sm text-destructive">
              <AlertCircle className="size-5 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <div className="font-semibold">Selling price must exceed variable unit cost</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  At {formatKes(result.sellingPricePerUnit)} selling price vs{" "}
                  {formatKes(result.variableCostPerUnit)} variable cost, each unit loses money and
                  cannot break even. Raise your selling price or lower unit cost.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    Monthly Break-Even Point
                  </div>
                  <div className="mt-1.5 text-3xl sm:text-4xl font-bold font-mono tabular-nums">
                    {result.breakEvenUnits.toLocaleString()} units
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Equivalent to{" "}
                    <strong className="font-mono text-foreground">
                      {formatKes(result.breakEvenRevenue)}
                    </strong>{" "}
                    in monthly sales revenue (about{" "}
                    <strong className="font-mono text-foreground">
                      {Math.ceil(result.breakEvenUnits / 26).toLocaleString()} units/day
                    </strong>{" "}
                    over 26 trading days)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={copySummary}
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

              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                <div className="rounded-xl border border-border bg-secondary/25 p-3.5">
                  <div className="text-muted-foreground">Contribution / unit</div>
                  <div className="mt-1 font-mono tabular-nums text-base font-bold text-accent">
                    {formatKes(result.contributionMarginPerUnit)}
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-secondary/25 p-3.5">
                  <div className="text-muted-foreground">Contribution ratio</div>
                  <div className="mt-1 font-mono tabular-nums text-base font-bold">
                    {result.contributionMarginRatioPercent}%
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-secondary/25 p-3.5">
                  <div className="text-muted-foreground">Break-even revenue</div>
                  <div className="mt-1 font-mono tabular-nums text-base font-bold">
                    {formatKes(result.breakEvenRevenue)}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}

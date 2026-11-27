import { createFileRoute } from "@tanstack/react-router";
import { useId, useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { COMPANY, SITE_URL, breadcrumbSchema, pageHead } from "@/lib/seo";
import { calculateDiscount, formatKes } from "@/lib/calculators";
import { ToolPageLayout, type ToolFaq } from "@/components/tools/ToolPageLayout";

const DISCOUNT_FAQS: ToolFaq[] = [
  {
    q: "How do I calculate a percentage discount off a price?",
    a: "Multiply the original price by the discount percentage divided by 100 to find your savings, then subtract the savings from the original price. For example, 20% off Ksh 4,500 saves Ksh 900 for a final price of Ksh 3,600.",
  },
  {
    q: "Can I also enter a fixed KES discount instead of a percentage?",
    a: "Yes. Switch the discount type to Fixed (KES) to see the final sale price and the equivalent percentage discount automatically.",
  },
];

const QUICK_DISCOUNTS = [5, 10, 15, 20, 25, 30, 50];

export const Route = createFileRoute("/tools/discount-calculator")({
  component: DiscountCalculatorPage,
  head: () => {
    const head = pageHead({
      title: `Discount & Sale Price Calculator (KES) | ${COMPANY}`,
      description:
        "Find the final KES sale price, customer savings, and effective percentage off from any percentage or fixed amount discount.",
      path: "/tools/discount-calculator",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: `Discount & Sale Price Calculator | ${COMPANY}`,
            url: `${SITE_URL}/tools/discount-calculator`,
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
              { name: "Discount Calculator", path: "/tools/discount-calculator" },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: DISCOUNT_FAQS.map((f) => ({
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

function DiscountCalculatorPage() {
  const id = useId();
  const [originalPrice, setOriginalPrice] = useState(4500);
  const [mode, setMode] = useState<"percent" | "fixed">("percent");
  const [discountValue, setDiscountValue] = useState(15);
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => calculateDiscount(originalPrice, mode, discountValue),
    [originalPrice, mode, discountValue],
  );

  async function copySummary() {
    const text = [
      `Original Price: ${formatKes(result.originalPrice)}`,
      `Discount (${result.effectivePercent}%): -${formatKes(result.discountAmount)}`,
      `Final Sale Price: ${formatKes(result.finalPrice)}`,
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
      breadcrumbLabel="Discount Calculator"
      title="Discount & Sale Price Calculator"
      subtitle="Calculate the exact sale price, shilling savings, and effective percentage discount for shop promotions, bulk quotes, and seasonal offers."
      guideBlocks={[
        {
          heading: "Quick retail & quote discounting",
          body: "Toggle between percentage off and fixed KES off to verify discounted shelf tags or customer negotiations in seconds.",
        },
        {
          heading: "Running online store promotions?",
          body: "We build e-commerce websites with scheduled coupon codes, tiered wholesale discounts, and M-Pesa checkout built in.",
        },
      ]}
      relatedEyebrow="Online Store & Retail"
      relatedHeading="E-commerce websites with promo codes & M-Pesa"
      relatedSummary="Launch a fast online catalog with automated discount codes, delivery zones, and instant M-Pesa STK Push payments."
      relatedPrimarySlug="ecommerce-websites"
      relatedPrimaryLabel="Explore E-Commerce Websites"
      faqTitle="Questions about discount calculations"
      faqs={DISCOUNT_FAQS}
    >
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 glass rounded-2xl p-6 border border-border space-y-5">
          <div>
            <label
              htmlFor={`${id}-orig`}
              className="block text-xs font-medium text-muted-foreground mb-1"
            >
              Original price (KES)
            </label>
            <input
              id={`${id}-orig`}
              type="number"
              min={0}
              step="any"
              inputMode="decimal"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-background/70 px-3 py-2.5 text-base font-mono font-semibold tabular-nums text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <span className="block text-xs font-medium text-muted-foreground mb-1">
                Discount type
              </span>
              <div
                className="grid grid-cols-2 rounded-lg border border-border bg-secondary/40 p-1"
                role="radiogroup"
                aria-label="Discount type"
              >
                {(
                  [
                    { id: "percent", label: "Percent (%)" },
                    { id: "fixed", label: "Fixed (KES)" },
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

            <div>
              <label
                htmlFor={`${id}-val`}
                className="block text-xs font-medium text-muted-foreground mb-1"
              >
                {mode === "percent" ? "Discount (%)" : "Discount amount (KES)"}
              </label>
              <input
                id={`${id}-val`}
                type="number"
                min={0}
                max={mode === "percent" ? 100 : undefined}
                step="any"
                inputMode="decimal"
                value={discountValue}
                onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-border bg-background/70 px-3 py-2.5 text-base font-mono font-semibold tabular-nums text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          {mode === "percent" && (
            <div className="flex flex-wrap gap-1.5">
              {QUICK_DISCOUNTS.map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDiscountValue(pct)}
                  className={`cursor-pointer rounded-md border px-2.5 py-1 text-xs font-mono transition ${
                    discountValue === pct
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {pct}% off
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-6 glass rounded-2xl p-6 border border-primary/35 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Final Sale Price
              </div>
              <div className="mt-1.5 text-3xl sm:text-4xl font-bold font-mono tabular-nums">
                {formatKes(result.finalPrice)}
              </div>
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

          <dl className="divide-y divide-border/70 text-sm">
            <div className="flex justify-between py-2.5">
              <dt className="text-muted-foreground">Original price</dt>
              <dd className="font-mono tabular-nums">{formatKes(result.originalPrice)}</dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-muted-foreground">Customer saves ({result.effectivePercent}%)</dt>
              <dd className="font-mono tabular-nums font-semibold text-accent">
                -{formatKes(result.discountAmount)}
              </dd>
            </div>
            <div className="flex justify-between py-2.5 font-bold">
              <dt>Final price</dt>
              <dd className="font-mono tabular-nums">{formatKes(result.finalPrice)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </ToolPageLayout>
  );
}

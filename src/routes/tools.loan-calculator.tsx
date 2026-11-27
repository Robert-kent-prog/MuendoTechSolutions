import { createFileRoute } from "@tanstack/react-router";
import { useId, useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { COMPANY, SITE_URL, breadcrumbSchema, pageHead } from "@/lib/seo";
import { calculateLoan, formatKes, type LoanInterestMethod } from "@/lib/calculators";
import { ToolPageLayout, type ToolFaq } from "@/components/tools/ToolPageLayout";

const LOAN_FAQS: ToolFaq[] = [
  {
    q: "What is the difference between Reducing Balance and Flat Rate in Kenyan SACCOs and banks?",
    a: "On a reducing balance loan, interest is calculated each month only on the remaining unpaid principal, so your interest drops over time. On a flat rate loan, interest is calculated on the original full principal for the entire term, which costs significantly more at the same advertised percentage.",
  },
  {
    q: "How do I enter a monthly interest rate like 1% per month?",
    a: "Multiply the monthly rate by 12 to enter the annual rate. For example, a SACCO loan at 1% per month on reducing balance equals 12% per year.",
  },
  {
    q: "Does this include bank processing fees or excise duty on fees?",
    a: "No. This calculates pure principal and interest repayment schedules. Always check your lender's KBRR / risk-based pricing sheet for appraisal fees, credit life insurance, and excise duty.",
  },
];

export const Route = createFileRoute("/tools/loan-calculator")({
  component: LoanCalculatorPage,
  head: () => {
    const head = pageHead({
      title: `Kenya Loan & SACCO Repayment Calculator (Reducing vs Flat) | ${COMPANY}`,
      description:
        "Compare Kenyan bank and SACCO monthly loan repayments on reducing balance vs flat rate, total interest paid, and full month-by-month amortization schedule in KES.",
      path: "/tools/loan-calculator",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: `Kenya Loan & SACCO Repayment Calculator | ${COMPANY}`,
            url: `${SITE_URL}/tools/loan-calculator`,
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
              { name: "Loan & SACCO Calculator", path: "/tools/loan-calculator" },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: LOAN_FAQS.map((f) => ({
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
  "w-full rounded-lg border border-border bg-background/70 px-3 py-2.5 text-sm font-mono font-semibold tabular-nums text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const labelClass = "block text-xs font-medium text-muted-foreground mb-1";

function LoanCalculatorPage() {
  const id = useId();
  const [principal, setPrincipal] = useState(500000);
  const [annualRate, setAnnualRate] = useState(14);
  const [months, setMonths] = useState(24);
  const [method, setMethod] = useState<LoanInterestMethod>("reducing");
  const [showFullSchedule, setShowFullSchedule] = useState(false);
  const [copied, setCopied] = useState(false);

  const reducing = useMemo(
    () => calculateLoan({ principal, annualRatePercent: annualRate, months, method: "reducing" }),
    [principal, annualRate, months],
  );
  const flat = useMemo(
    () => calculateLoan({ principal, annualRatePercent: annualRate, months, method: "flat" }),
    [principal, annualRate, months],
  );

  const active = method === "reducing" ? reducing : flat;
  const interestDiff = Math.max(0, flat.totalInterest - reducing.totalInterest);
  const visibleRows = showFullSchedule ? active.schedule : active.schedule.slice(0, 12);

  async function copySummary() {
    const text = [
      `Loan Repayment Summary (${method === "reducing" ? "Reducing Balance" : "Flat Rate"})`,
      `Loan Amount: ${formatKes(active.principal)}`,
      `Interest Rate: ${active.annualRatePercent}% p.a.`,
      `Term: ${active.months} months`,
      `Monthly Installment: ${formatKes(active.monthlyInstallment)}`,
      `Total Interest: ${formatKes(active.totalInterest)}`,
      `Total Repayment: ${formatKes(active.totalRepayment)}`,
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
      breadcrumbLabel="Loan & SACCO Calculator"
      title="Loan & SACCO Repayment Calculator"
      subtitle="Compare reducing balance vs flat-rate monthly installments, total interest cost, and a complete amortization schedule in Kenyan Shillings."
      guideBlocks={[
        {
          heading: "Why compare Reducing Balance against Flat Rate?",
          body: "Many Kenyan SACCOs advertise 1% per month on reducing balance (12% p.a.), while some microfinance and asset-finance lenders quote flat-rate percentages. Seeing both side by side makes the real shilling difference immediately clear before signing a loan offer.",
        },
        {
          heading: "Month-by-month repayment schedule",
          body: "Every row shows how much of each monthly payment goes to interest vs principal reduction, ending cleanly at a zero balance in the final month.",
        },
      ]}
      relatedEyebrow="SACCO & Lending Software"
      relatedHeading="Custom SACCO, Chama & microfinance portals"
      relatedSummary="Need member portals, automated loan schedules, guarantor tracking, and M-Pesa repayment reconciliation? We engineer secure lending platforms."
      relatedPrimarySlug="web-applications"
      relatedPrimaryLabel="Explore Custom Web Apps"
      faqTitle="Questions about Kenyan loans & SACCO repayments"
      faqs={LOAN_FAQS}
    >
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left: Inputs */}
        <div className="lg:col-span-5 glass rounded-2xl p-6 border border-border space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
            Loan Terms
          </h2>

          <div>
            <label htmlFor={`${id}-principal`} className={labelClass}>
              Loan amount / principal (KES)
            </label>
            <input
              id={`${id}-principal`}
              type="number"
              min={0}
              step="any"
              inputMode="decimal"
              value={principal}
              onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
              className={inputClass}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor={`${id}-rate`} className={labelClass}>
                Annual interest rate (% p.a.)
              </label>
              <input
                id={`${id}-rate`}
                type="number"
                min={0}
                max={200}
                step="any"
                inputMode="decimal"
                value={annualRate}
                onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor={`${id}-months`} className={labelClass}>
                Repayment period (months)
              </label>
              <input
                id={`${id}-months`}
                type="number"
                min={1}
                max={360}
                step={1}
                inputMode="numeric"
                value={months}
                onChange={(e) => setMonths(parseInt(e.target.value, 10) || 1)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <span className={labelClass}>Schedule calculation method</span>
            <div
              className="grid grid-cols-2 rounded-lg border border-border bg-secondary/40 p-1"
              role="radiogroup"
              aria-label="Interest calculation method"
            >
              {(
                [
                  { id: "reducing", label: "Reducing Balance" },
                  { id: "flat", label: "Flat Rate" },
                ] as const
              ).map((opt) => {
                const isSelected = method === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setMethod(opt.id)}
                    className={`cursor-pointer rounded-md py-2 px-3 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      isSelected
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

          {/* Side-by-side comparison */}
          <div className="pt-3 border-t border-border/60 space-y-2 text-xs">
            <div className="font-semibold text-foreground">Reducing vs Flat comparison</div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-border bg-secondary/25 p-3">
                <div className="text-muted-foreground">Reducing total interest</div>
                <div className="mt-1 font-mono tabular-nums text-sm font-semibold">
                  {formatKes(reducing.totalInterest)}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-secondary/25 p-3">
                <div className="text-muted-foreground">Flat-rate total interest</div>
                <div className="mt-1 font-mono tabular-nums text-sm font-semibold">
                  {formatKes(flat.totalInterest)}
                </div>
              </div>
            </div>
            {interestDiff > 0 && (
              <p className="text-muted-foreground leading-relaxed">
                Reducing balance saves{" "}
                <strong className="font-mono text-accent">{formatKes(interestDiff)}</strong> in
                interest compared to a flat rate at {annualRate}% p.a.
              </p>
            )}
          </div>
        </div>

        {/* Right: Summary & Schedule */}
        <div className="lg:col-span-7 space-y-5">
          <div className="glass rounded-2xl p-6 border border-primary/35">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  Monthly Installment ({method === "reducing" ? "Reducing Balance" : "Flat Rate"})
                </div>
                <div className="mt-1.5 text-3xl sm:text-4xl font-bold font-mono tabular-nums">
                  {formatKes(active.monthlyInstallment)}
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
                    <Copy className="size-3.5" aria-hidden="true" /> Copy summary
                  </>
                )}
              </button>
            </div>

            <div className="mt-5 grid sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl border border-border bg-secondary/25 p-3">
                <div className="text-muted-foreground">Principal borrowed</div>
                <div className="mt-1 font-mono tabular-nums text-sm font-semibold">
                  {formatKes(active.principal)}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-secondary/25 p-3">
                <div className="text-muted-foreground">Total interest</div>
                <div className="mt-1 font-mono tabular-nums text-sm font-semibold text-accent">
                  {formatKes(active.totalInterest)}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-secondary/25 p-3">
                <div className="text-muted-foreground">Total repayment</div>
                <div className="mt-1 font-mono tabular-nums text-sm font-bold">
                  {formatKes(active.totalRepayment)}
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-5 sm:p-6 border border-border">
            <div className="flex items-center justify-between gap-2 mb-3">
              <h2 className="text-base font-bold tracking-tight">
                Repayment Schedule ({active.months} months)
              </h2>
              {active.schedule.length > 12 && (
                <button
                  type="button"
                  onClick={() => setShowFullSchedule((v) => !v)}
                  className="cursor-pointer text-xs font-medium text-accent hover:underline"
                >
                  {showFullSchedule
                    ? "Show first 12 months"
                    : `Show all ${active.schedule.length} months`}
                </button>
              )}
            </div>

            {active.schedule.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                Enter a loan principal greater than 0 to see the monthly repayment schedule.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="py-2 pr-2 font-semibold">Mo</th>
                      <th className="py-2 px-2 font-semibold text-right">Payment</th>
                      <th className="py-2 px-2 font-semibold text-right">Principal</th>
                      <th className="py-2 px-2 font-semibold text-right">Interest</th>
                      <th className="py-2 pl-2 font-semibold text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 font-mono tabular-nums">
                    {visibleRows.map((row) => (
                      <tr key={row.month}>
                        <td className="py-2 pr-2 text-muted-foreground">{row.month}</td>
                        <td className="py-2 px-2 text-right font-medium">
                          {formatKes(row.payment, false)}
                        </td>
                        <td className="py-2 px-2 text-right">
                          {formatKes(row.principalPaid, false)}
                        </td>
                        <td className="py-2 px-2 text-right text-muted-foreground">
                          {formatKes(row.interestPaid, false)}
                        </td>
                        <td className="py-2 pl-2 text-right font-semibold">
                          {formatKes(row.endingBalance, false)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}

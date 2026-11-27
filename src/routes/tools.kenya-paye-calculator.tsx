import { createFileRoute } from "@tanstack/react-router";
import { useId, useMemo, useState } from "react";
import { Check, Copy, RotateCcw } from "lucide-react";
import { COMPANY, SITE_URL, breadcrumbSchema, pageHead } from "@/lib/seo";
import { calculateKenyaPaye, formatKes } from "@/lib/calculators";
import { ToolPageLayout, type ToolFaq } from "@/components/tools/ToolPageLayout";

const PAYE_FAQS: ToolFaq[] = [
  {
    q: "Are SHIF and the Affordable Housing Levy tax-deductible before PAYE?",
    a: "Yes. Under the Tax Laws (Amendment) Act 2024, employee contributions to SHIF (2.75%), the Affordable Housing Levy (1.5%), and NSSF are treated as allowable deductions and subtracted from gross salary before KRA PAYE tax bands are applied.",
  },
  {
    q: "What NSSF limits does this calculator use?",
    a: "It uses NSSF Act 2013 Year 4 limits: 6% employee contribution on Tier I (up to Ksh 9,000, max Ksh 540) and Tier II (Ksh 9,001 to Ksh 108,000), capping employee NSSF at Ksh 6,480 per month, matched equally by the employer.",
  },
  {
    q: "How much is Personal Relief in Kenya?",
    a: "Resident employees receive a monthly Personal Relief of Ksh 2,400 (Ksh 28,800 per year), subtracted directly from gross PAYE.",
  },
  {
    q: "Is my salary data sent to any server?",
    a: "No. Every calculation runs locally in your browser with zero network calls or server storage.",
  },
];

const PRESET_SALARIES = [30000, 50000, 100000, 150000, 250000];

export const Route = createFileRoute("/tools/kenya-paye-calculator")({
  component: KenyaPayeCalculatorPage,
  head: () => {
    const head = pageHead({
      title: `Kenya PAYE, SHIF, NSSF & Housing Levy Calculator (2026) | ${COMPANY}`,
      description:
        "Calculate Kenya net salary, KRA PAYE tax bands, SHIF (2.75%), NSSF Tier I & II (cap Ksh 6,480), Affordable Housing Levy (1.5%), and employer payroll cost.",
      path: "/tools/kenya-paye-calculator",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: `Kenya PAYE, SHIF, NSSF & Housing Levy Calculator | ${COMPANY}`,
            url: `${SITE_URL}/tools/kenya-paye-calculator`,
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
              { name: "Kenya PAYE Calculator", path: "/tools/kenya-paye-calculator" },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: PAYE_FAQS.map((f) => ({
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
  "w-full rounded-lg border border-border bg-background/70 px-3 py-2 text-sm font-mono tabular-nums text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const labelClass = "block text-xs font-medium text-muted-foreground mb-1";

function KenyaPayeCalculatorPage() {
  const id = useId();
  const [grossMonthly, setGrossMonthly] = useState(100000);
  const [includeNssf, setIncludeNssf] = useState(true);
  const [includeShif, setIncludeShif] = useState(true);
  const [includeHousingLevy, setIncludeHousingLevy] = useState(true);
  const [mortgageInterest, setMortgageInterest] = useState(0);
  const [postRetirementMedical, setPostRetirementMedical] = useState(0);
  const [insurancePremium, setInsurancePremium] = useState(0);
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () =>
      calculateKenyaPaye({
        grossMonthly,
        includeNssf,
        includeShif,
        includeHousingLevy,
        mortgageInterest,
        postRetirementMedical,
        insuranceReliefPremium: insurancePremium,
      }),
    [
      grossMonthly,
      includeNssf,
      includeShif,
      includeHousingLevy,
      mortgageInterest,
      postRetirementMedical,
      insurancePremium,
    ],
  );

  const netPct =
    result.grossMonthly > 0
      ? Math.min(100, Math.round((result.netPay / result.grossMonthly) * 100))
      : 0;

  async function copyBreakdown() {
    const lines = [
      "Kenya Monthly Payroll Breakdown",
      `Gross Salary: ${formatKes(result.grossMonthly)}`,
      `NSSF (Tier I + II): -${formatKes(result.nssfTotal)}`,
      `SHIF (2.75%): -${formatKes(result.shif)}`,
      `Housing Levy (1.5%): -${formatKes(result.housingLevy)}`,
      `Taxable Income: ${formatKes(result.taxableIncome)}`,
      `PAYE (after relief): -${formatKes(result.netPaye)}`,
      `Total Deductions: -${formatKes(result.totalDeductions)}`,
      `Net Take-Home Pay: ${formatKes(result.netPay)}`,
      `Total Employer Cost: ${formatKes(result.totalEmployerCost)}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(lines);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  function resetAll() {
    setGrossMonthly(100000);
    setIncludeNssf(true);
    setIncludeShif(true);
    setIncludeHousingLevy(true);
    setMortgageInterest(0);
    setPostRetirementMedical(0);
    setInsurancePremium(0);
  }

  return (
    <ToolPageLayout
      breadcrumbLabel="Kenya PAYE Calculator"
      title="Kenya PAYE, SHIF, NSSF & Housing Levy Calculator"
      subtitle="Calculate monthly net take-home pay, KRA PAYE bands, SHIF (2.75%), NSSF Tier I & II, Affordable Housing Levy (1.5%), and total employer cost in Kenyan Shillings."
      guideBlocks={[
        {
          heading: "How Kenyan net salary is calculated",
          body: "Statutory deductions (NSSF, SHIF at 2.75%, and Affordable Housing Levy at 1.5%) plus qualifying mortgage interest and post-retirement medical contributions are deducted from gross salary first to get taxable income. KRA progressive PAYE rates (10%, 25%, 30%, 32.5%, 35%) are then applied, and Ksh 2,400 monthly personal relief is subtracted.",
        },
        {
          heading: "Employer payroll cost",
          body: "In addition to the employee's gross salary, employers match both NSSF (6%, up to Ksh 6,480 per employee) and the Affordable Housing Levy (1.5% of gross). SHIF is deducted from the employee only. Always confirm final filings against KRA iTax.",
        },
      ]}
      relatedEyebrow="Need Payroll & HR Automation?"
      relatedHeading="Custom Kenyan payroll & ERP software"
      relatedSummary="Automate monthly payslips, KRA P10 CSV exports, NSSF/SHIF schedules, and M-Pesa bulk disbursements in one system built for your team."
      relatedPrimarySlug="web-applications"
      relatedPrimaryLabel="Explore Custom Web Apps"
      faqTitle="Questions about Kenya PAYE & statutory deductions"
      faqs={PAYE_FAQS}
    >
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left: Inputs */}
        <div className="lg:col-span-5 space-y-5">
          <div className="glass rounded-2xl p-5 sm:p-6 border border-border space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                Monthly Earnings
              </h2>
              <button
                type="button"
                onClick={resetAll}
                className="cursor-pointer inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition"
              >
                <RotateCcw className="size-3.5" aria-hidden="true" /> Reset
              </button>
            </div>

            <div>
              <label htmlFor={`${id}-gross`} className={labelClass}>
                Gross monthly salary (KES)
              </label>
              <input
                id={`${id}-gross`}
                type="number"
                min={0}
                step="any"
                inputMode="decimal"
                value={grossMonthly}
                onChange={(e) => setGrossMonthly(parseFloat(e.target.value) || 0)}
                className={`${inputClass} text-base font-semibold`}
              />
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {PRESET_SALARIES.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setGrossMonthly(amt)}
                    className={`cursor-pointer rounded-md border px-2.5 py-1 text-xs font-mono transition ${
                      grossMonthly === amt
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {(amt / 1000).toLocaleString()}k
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-border/60 space-y-2.5">
              <div className="text-xs font-semibold text-foreground">Statutory deductions</div>
              <label className="flex items-center gap-2.5 text-xs text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeNssf}
                  onChange={(e) => setIncludeNssf(e.target.checked)}
                  className="size-4 rounded border-border accent-primary"
                />
                <span>NSSF Tier I & II (6%, cap Ksh 6,480)</span>
              </label>
              <label className="flex items-center gap-2.5 text-xs text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeShif}
                  onChange={(e) => setIncludeShif(e.target.checked)}
                  className="size-4 rounded border-border accent-primary"
                />
                <span>SHIF (2.75% of gross, min Ksh 300)</span>
              </label>
              <label className="flex items-center gap-2.5 text-xs text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeHousingLevy}
                  onChange={(e) => setIncludeHousingLevy(e.target.checked)}
                  className="size-4 rounded border-border accent-primary"
                />
                <span>Affordable Housing Levy (1.5%)</span>
              </label>
            </div>
          </div>

          <details className="glass rounded-2xl border border-border p-5">
            <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Optional Reliefs & Allowable Deductions
            </summary>
            <div className="mt-4 space-y-3">
              <div>
                <label htmlFor={`${id}-mortgage`} className={labelClass}>
                  Owner-occupied mortgage interest / month (max Ksh 30,000)
                </label>
                <input
                  id={`${id}-mortgage`}
                  type="number"
                  min={0}
                  step="any"
                  inputMode="decimal"
                  value={mortgageInterest}
                  onChange={(e) => setMortgageInterest(parseFloat(e.target.value) || 0)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor={`${id}-medical`} className={labelClass}>
                  Post-retirement medical fund / month (max Ksh 15,000)
                </label>
                <input
                  id={`${id}-medical`}
                  type="number"
                  min={0}
                  step="any"
                  inputMode="decimal"
                  value={postRetirementMedical}
                  onChange={(e) => setPostRetirementMedical(parseFloat(e.target.value) || 0)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor={`${id}-ins`} className={labelClass}>
                  Qualifying insurance / education policy premium (15% relief, max Ksh 5,000)
                </label>
                <input
                  id={`${id}-ins`}
                  type="number"
                  min={0}
                  step="any"
                  inputMode="decimal"
                  value={insurancePremium}
                  onChange={(e) => setInsurancePremium(parseFloat(e.target.value) || 0)}
                  className={inputClass}
                />
              </div>
            </div>
          </details>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-7 space-y-5">
          {/* Primary Take-Home Summary */}
          <div className="glass rounded-2xl p-6 border border-primary/35">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  Estimated Monthly Net Pay
                </div>
                <div className="mt-1.5 text-3xl sm:text-4xl font-bold font-mono tabular-nums text-foreground">
                  {formatKes(result.netPay)}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Take-home share: <strong className="text-foreground">{netPct}%</strong> of gross
                  salary (effective deductions: {result.effectiveTaxRatePercent}%)
                </p>
              </div>
              <button
                type="button"
                onClick={copyBreakdown}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3.5 py-2 text-xs font-medium text-foreground hover:bg-secondary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-emerald-400" aria-hidden="true" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" aria-hidden="true" /> Copy breakdown
                  </>
                )}
              </button>
            </div>

            {/* Proportion Bar */}
            <div
              className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-secondary"
              aria-hidden="true"
            >
              <div className="h-full bg-primary transition-all" style={{ width: `${netPct}%` }} />
            </div>

            {/* Key Deduction Rows */}
            <dl className="mt-5 divide-y divide-border/70 text-sm">
              <div className="flex justify-between py-2.5">
                <dt className="text-muted-foreground">Gross monthly salary</dt>
                <dd className="font-mono tabular-nums font-semibold">
                  {formatKes(result.grossMonthly)}
                </dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-muted-foreground">
                  NSSF (Tier I: {formatKes(result.nssfTier1, false)} + Tier II:{" "}
                  {formatKes(result.nssfTier2, false)})
                </dt>
                <dd className="font-mono tabular-nums text-foreground">
                  -{formatKes(result.nssfTotal)}
                </dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-muted-foreground">SHIF (2.75%)</dt>
                <dd className="font-mono tabular-nums text-foreground">
                  -{formatKes(result.shif)}
                </dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-muted-foreground">Affordable Housing Levy (1.5%)</dt>
                <dd className="font-mono tabular-nums text-foreground">
                  -{formatKes(result.housingLevy)}
                </dd>
              </div>
              <div className="flex justify-between py-2.5 bg-secondary/20 px-2 -mx-2 rounded">
                <dt className="font-medium text-foreground">Taxable income</dt>
                <dd className="font-mono tabular-nums font-semibold">
                  {formatKes(result.taxableIncome)}
                </dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-muted-foreground">Gross PAYE before relief</dt>
                <dd className="font-mono tabular-nums">{formatKes(result.grossPaye)}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-muted-foreground">
                  Personal relief
                  {result.insuranceRelief > 0 ? " + insurance relief" : ""}
                </dt>
                <dd className="font-mono tabular-nums text-accent">
                  -{formatKes(result.personalRelief + result.insuranceRelief)}
                </dd>
              </div>
              <div className="flex justify-between py-2.5 font-semibold">
                <dt>Net PAYE payable to KRA</dt>
                <dd className="font-mono tabular-nums">-{formatKes(result.netPaye)}</dd>
              </div>
              <div className="flex justify-between py-2.5 text-muted-foreground">
                <dt>Total employee deductions</dt>
                <dd className="font-mono tabular-nums">-{formatKes(result.totalDeductions)}</dd>
              </div>
            </dl>
          </div>

          {/* KRA Tax Band Breakdown */}
          <div className="glass rounded-2xl p-5 sm:p-6 border border-border">
            <h2 className="text-base font-bold tracking-tight mb-3">KRA PAYE Tax Band Breakdown</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="py-2 pr-3 font-semibold">Monthly Band</th>
                    <th className="py-2 px-2 font-semibold text-right">Rate</th>
                    <th className="py-2 px-2 font-semibold text-right">Taxable Slice</th>
                    <th className="py-2 pl-2 font-semibold text-right">Tax (KES)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 font-mono tabular-nums">
                  {result.bands.map((b) => (
                    <tr key={b.label} className={b.taxableSlice > 0 ? "" : "opacity-45"}>
                      <td className="py-2 pr-3 font-sans text-foreground">{b.label}</td>
                      <td className="py-2 px-2 text-right">{b.ratePercent}%</td>
                      <td className="py-2 px-2 text-right">{formatKes(b.taxableSlice, false)}</td>
                      <td className="py-2 pl-2 text-right font-semibold">
                        {formatKes(b.tax, false)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Employer Cost Summary */}
          <div className="glass rounded-2xl p-5 border border-border">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent mb-3">
              Employer Monthly Cost
            </h2>
            <div className="grid sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl border border-border bg-secondary/25 p-3">
                <div className="text-muted-foreground">Employer NSSF (6%)</div>
                <div className="mt-1 font-mono tabular-nums text-sm font-semibold">
                  {formatKes(result.employerNssf)}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-secondary/25 p-3">
                <div className="text-muted-foreground">Employer Housing Levy (1.5%)</div>
                <div className="mt-1 font-mono tabular-nums text-sm font-semibold">
                  {formatKes(result.employerHousingLevy)}
                </div>
              </div>
              <div className="rounded-xl border border-primary/35 bg-primary/10 p-3">
                <div className="text-muted-foreground">Total Employer Cost</div>
                <div className="mt-1 font-mono tabular-nums text-sm font-bold text-foreground">
                  {formatKes(result.totalEmployerCost)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}

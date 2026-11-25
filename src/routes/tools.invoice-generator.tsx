import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { COMPANY, SITE_URL, breadcrumbSchema, pageHead } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { InvoiceGenerator } from "@/components/tools/InvoiceGenerator";
import { CTA } from "@/components/sections/CTASection";

const INVOICE_FAQS = [
  {
    q: "How do I save my invoice as a PDF?",
    a: "Click Print A4 / Save PDF (or Print 80mm for a thermal receipt). In your browser's print dialog, pick Save as PDF as the destination. The website navbar, editor, and buttons are automatically hidden.",
  },
  {
    q: "Can I use my own company name, logo, and payment details?",
    a: "Yes. Click Use my business at the top of the editor to clear the Muendo Software Labs defaults, upload your own PNG/JPG/WebP logo, and type your business and payment details. Your browser remembers them locally for your next invoice.",
  },
  {
    q: "Does this support Kenyan Shillings (Ksh) and 16% VAT?",
    a: "Yes. Kenyan Shillings (KES / Ksh) is the default currency, and you can switch to USD, UGX, TZS, EUR, or GBP anytime. You can leave VAT off, add 16% exclusive VAT, or extract 16% VAT from inclusive prices.",
  },
  {
    q: "Is any of my invoice data uploaded to a server?",
    a: "No. Every calculation, logo preview, and PDF print runs 100% locally in your browser. Drafts are saved only in your browser's localStorage on your own device.",
  },
  {
    q: "Can I remove the Powered by Muendo Software Labs footer?",
    a: "Yes. Uncheck the Show Powered by Muendo Software Labs footer box under Payment Details & Notes whenever you want a completely unbranded invoice.",
  },
  {
    q: "Can this replace a full POS or invoicing system?",
    a: "This tool is great for quick invoices, quotes, and receipts, but it does not track customer balances, stock levels, staff roles, or automatic M-Pesa reconciliation. When you outgrow manual PDFs, we can build a dedicated POS or billing system for your business.",
  },
];

export const Route = createFileRoute("/tools/invoice-generator")({
  component: InvoiceGeneratorPage,
  head: () => {
    const head = pageHead({
      title: `Free KES Invoice & 80mm Receipt Generator | ${COMPANY}`,
      description:
        "Create free A4 PDF invoices, quotations, proformas, and 80mm receipts in KES with 16% Kenya VAT, M-Pesa payment details, and amount in words.",
      path: "/tools/invoice-generator",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: `Free KES Invoice & 80mm Receipt Generator | ${COMPANY}`,
            url: `${SITE_URL}/tools/invoice-generator`,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "KES",
            },
            provider: {
              "@type": "Organization",
              name: COMPANY,
              url: SITE_URL,
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Free Tools", path: "/tools" },
              { name: "Invoice Generator", path: "/tools/invoice-generator" },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: INVOICE_FAQS.map((f) => ({
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

function InvoiceGeneratorPage() {
  return (
    <>
      <section className="no-print bg-hero-gradient py-10 sm:py-14 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Free Tools", to: "/tools" }, { label: "Invoice Generator" }]}
          />
          <div className="mt-5 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Invoice, Quote & 80mm Receipt Generator
            </h1>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              Generate clean A4 PDF invoices or 80mm POS receipts in Kenyan Shillings (Ksh) or other
              currencies. Add line items, 16% VAT, discounts, and M-Pesa payment details with live
              preview.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 print:py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 print:max-w-none print:px-0">
          <InvoiceGenerator />
        </div>
      </section>

      {/* Guide & Related Software */}
      <section className="no-print py-12 sm:py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass rounded-2xl p-6 sm:p-8 border border-border space-y-5">
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                A4 invoice and 80mm receipt modes
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Use the A4 layout for formal client invoices, quotations, and proforma invoices.
                Switch to 80mm mode when you need a compact shop receipt for thermal printers or
                WhatsApp confirmation. Both layouts update in real time as you type.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Built for Kenyan workflows</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Defaults to Kenyan Shillings (Ksh), supports exclusive or inclusive 16% VAT, prints
                the amount in words automatically, and lets you include M-Pesa Paybill, Till, phone,
                or bank transfer details right on the document.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/tools"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
              >
                Explore all free tools <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <aside className="glass rounded-2xl p-6 sm:p-8 border border-border flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                Outgrown Manual PDFs?
              </div>
              <h2 className="mt-2 text-xl font-bold tracking-tight">
                Automate invoicing, stock & M-Pesa
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                When you need numbered invoices saved to a database, customer balances, inventory
                tracking, and automatic M-Pesa Daraja reconciliation, we build custom POS and
                billing systems tailored to your business.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-2.5">
              <Link
                to="/services/$slug"
                params={{ slug: "pos-systems" }}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
              >
                Explore POS & Billing Systems <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                to="/services/$slug"
                params={{ slug: "mpesa-integrations" }}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/50 transition"
              >
                M-Pesa Daraja Integrations
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQs */}
      <section className="no-print py-12 sm:py-16 border-t border-border bg-sidebar/35">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-2">
            FAQs
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
            Questions about the Invoice Generator
          </h2>
          <div className="space-y-3">
            {INVOICE_FAQS.map((faq) => (
              <details key={faq.q} className="glass rounded-xl border border-border group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm sm:text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
                  {faq.q}
                  <ChevronDown
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="no-print">
        <CTA />
      </div>
    </>
  );
}

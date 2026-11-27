import { Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, FileText, QrCode, Smartphone } from "lucide-react";

const FEATURED_TOOLS = [
  {
    title: "Invoice & 80mm Receipt Generator",
    summary:
      "Create clean A4 PDF invoices, quotes, or 80mm thermal receipts in KES with 16% VAT and M-Pesa payment details.",
    href: "/tools/invoice-generator" as const,
    tag: "Flagship",
    icon: FileText,
  },
  {
    title: "Kenya PAYE, SHIF & NSSF Calculator",
    summary:
      "Calculate 2026 Kenyan net salary, KRA PAYE bands, SHIF (2.75%), NSSF Tier I & II, and Housing Levy.",
    href: "/tools/kenya-paye-calculator" as const,
    tag: "2026 Rates",
    icon: Calculator,
  },
  {
    title: "M-Pesa Charges Calculator",
    summary:
      "Check Send Money and Agent Withdrawal fees in KES up to Ksh 250,000 plus cash-out fee coverage.",
    href: "/tools/mpesa-charges-calculator" as const,
    tag: "KES Tariffs",
    icon: Smartphone,
  },
  {
    title: "QR Code Generator",
    summary:
      "Generate permanent PNG and SVG QR codes for websites, WhatsApp chats, digital menus, and shop Wi-Fi.",
    href: "/tools/qr-code-generator" as const,
    tag: "PNG & SVG",
    icon: QrCode,
  },
];

export function FreeToolsSection() {
  return (
    <section
      id="free-tools"
      className="py-20 sm:py-24 border-y border-border bg-sidebar/35"
      aria-labelledby="free-tools-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-2">
              Free Kenyan Business Utilities
            </div>
            <h2 id="free-tools-heading" className="text-3xl sm:text-4xl font-bold tracking-tight">
              Everyday Tools Built for Kenyan SMEs
            </h2>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              Generate A4 and 80mm KES invoices, verify KRA PAYE and 16% VAT, check M-Pesa tariffs,
              or create QR codes right in your browser with no account required.
            </p>
          </div>
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 self-start md:self-auto rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0"
          >
            Browse all 13 free tools <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURED_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                to={tool.href}
                className="group glass rounded-2xl p-5 border border-border card-hover flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="size-10 rounded-xl bg-primary/15 text-primary grid place-items-center">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <span className="rounded-full border border-accent/35 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                      {tool.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold leading-snug group-hover:text-accent transition-colors">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {tool.summary}
                  </p>
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
                  Open tool{" "}
                  <ArrowRight
                    className="size-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

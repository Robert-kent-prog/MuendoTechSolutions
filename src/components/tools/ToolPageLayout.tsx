import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTA } from "@/components/sections/CTASection";

export interface ToolFaq {
  q: string;
  a: string;
}

export interface ToolGuideBlock {
  heading: string;
  body: string;
}

interface ToolPageLayoutProps {
  breadcrumbLabel: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  guideBlocks: ToolGuideBlock[];
  relatedEyebrow: string;
  relatedHeading: string;
  relatedSummary: string;
  relatedPrimarySlug: string;
  relatedPrimaryLabel: string;
  relatedSecondaryTo?: "/tools/invoice-generator" | "/quote" | "/contact";
  relatedSecondaryLabel?: string;
  faqTitle: string;
  faqs: ToolFaq[];
}

export function ToolPageLayout({
  breadcrumbLabel,
  title,
  subtitle,
  children,
  guideBlocks,
  relatedEyebrow,
  relatedHeading,
  relatedSummary,
  relatedPrimarySlug,
  relatedPrimaryLabel,
  relatedSecondaryTo = "/tools/invoice-generator",
  relatedSecondaryLabel = "Open Invoice Generator",
  faqTitle,
  faqs,
}: ToolPageLayoutProps) {
  return (
    <>
      <section className="bg-hero-gradient py-10 sm:py-14 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Free Tools", to: "/tools" }, { label: breadcrumbLabel }]}
          />
          <div className="mt-5 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">{title}</h1>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">{subtitle}</p>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </section>

      <section className="py-12 sm:py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass rounded-2xl p-6 sm:p-8 border border-border space-y-5">
            {guideBlocks.map((block) => (
              <div key={block.heading}>
                <h2 className="text-xl font-bold tracking-tight">{block.heading}</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{block.body}</p>
              </div>
            ))}
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
                {relatedEyebrow}
              </div>
              <h2 className="mt-2 text-xl font-bold tracking-tight">{relatedHeading}</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{relatedSummary}</p>
            </div>
            <div className="mt-6 flex flex-col gap-2.5">
              <Link
                to="/services/$slug"
                params={{ slug: relatedPrimarySlug }}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
              >
                {relatedPrimaryLabel} <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                to={relatedSecondaryTo}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/50 transition"
              >
                {relatedSecondaryLabel}
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-t border-border bg-sidebar/35">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-2">
            FAQs
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">{faqTitle}</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
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

      <CTA />
    </>
  );
}

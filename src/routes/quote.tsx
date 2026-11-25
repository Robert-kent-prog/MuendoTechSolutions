import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, breadcrumbSchema, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { QuoteCalculator } from "@/components/sections/QuoteCalculator";

export const Route = createFileRoute("/quote")({
  component: QuotePage,
  head: () => {
    const head = pageHead({
      title: `Project Quote Guide | ${COMPANY}`,
      description:
        "Answer quick questions to estimate a rough KES budget band for your website, web app, mobile app, POS, or AI project, then send a brief.",
      path: "/quote",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Quote Guide", path: "/quote" },
            ]),
          ),
        },
      ],
    };
  },
});

function QuotePage() {
  return (
    <PageShell>
      <main className="pt-16">
        <PageHeader
          eyebrow="Quote Guide"
          title="Find your rough budget in a few clicks"
          subtitle="Pick what you are building, add any extras and tell us your timeline. You get an indicative KES band and can send it to us as a prefilled brief."
        />
        <QuoteCalculator />
      </main>
    </PageShell>
  );
}

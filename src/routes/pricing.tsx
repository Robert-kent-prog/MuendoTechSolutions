import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { ServicePackages } from "@/components/sections/ServicePackagesSection";
import { PricingBands, PricingFactors } from "@/components/sections/PricingSection";
import { CTA } from "@/components/sections/CTASection";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () =>
    pageHead({
      title: `Software Development Pricing in Kenya | ${COMPANY}`,
      description:
        "See how Muendo Software Labs prices websites, web apps, mobile apps, POS systems and maintenance in Kenya, with starting points in KES and what affects the final quote.",
      path: "/pricing",
    }),
});

function PricingPage() {
  return (
    <PageShell>
      <main className="pt-16">
        <PageHeader
          eyebrow="Pricing"
          title="Clear starting points, quoted properly"
          subtitle="Websites start from KES 25,000 and custom systems are scoped after a short discovery conversation. Here is how we think about budget, in KES."
        />
        <ServicePackages />
        <PricingBands />
        <PricingFactors />
        <CTA />
      </main>
    </PageShell>
  );
}

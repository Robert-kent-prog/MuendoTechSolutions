import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, breadcrumbSchema, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Industries, IndustrySolutions } from "@/components/sections/IndustriesSection";
import { CTA } from "@/components/sections/CTASection";

export const Route = createFileRoute("/industries")({
  component: IndustriesPage,
  head: () => {
    const head = pageHead({
      title: `Software for Kenyan Industries | ${COMPANY}`,
      description:
        "Custom software built around Kenyan workflows: retail POS, schools, logistics fleets, clinics, NGOs, and professional service teams.",
      path: "/industries",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Industries", path: "/industries" },
            ]),
          ),
        },
      ],
    };
  },
});

function IndustriesPage() {
  return (
    <PageShell>
      <main className="pt-16">
        <PageHeader
          eyebrow="Industries"
          title="Software shaped around how your industry works"
          subtitle="Retail floors, classrooms, clinics, fleets and field teams all have different defaults. These are the workflows we prioritise in a first release."
        />
        <Industries />
        <IndustrySolutions />
        <CTA />
      </main>
    </PageShell>
  );
}

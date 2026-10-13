import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Industries, IndustrySolutions } from "@/components/sections/IndustriesSection";
import { CTA } from "@/components/sections/CTASection";
import { PhotoBand } from "@/components/ui/PhotoBand";

export const Route = createFileRoute("/industries")({
  component: IndustriesPage,
  head: () =>
    pageHead({
      title: `Software for Kenyan Industries | ${COMPANY}`,
      description:
        "Software built around Kenyan workflows: retail and POS, schools, logistics and fleet, clinics, NGOs and professional services. See the systems Muendo Software Labs builds for each.",
      path: "/industries",
    }),
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
        <PhotoBand
          id="nairobi-skyline"
          caption="Built in Nairobi for Kenyan businesses."
          position="object-[50%_60%]"
        />
        <Industries />
        <IndustrySolutions />
        <CTA />
      </main>
    </PageShell>
  );
}

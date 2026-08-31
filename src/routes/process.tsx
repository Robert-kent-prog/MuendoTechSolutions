import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { Process } from "@/components/sections/ProcessSection";
import { Why } from "@/components/sections/ServicePackagesSection";
import { CTA } from "@/components/sections/CTASection";

export const Route = createFileRoute("/process")({
  component: ProcessPage,
  head: () =>
    pageHead({
      title: `Software Development Process | ${COMPANY}`,
      description:
        "Learn how Muendo Software Labs plans, designs, builds, tests, deploys, and supports reliable software products for businesses, schools, startups, and SMEs.",
      path: "/process",
    }),
});

function ProcessPage() {
  return (
    <PageShell>
      <main className="pt-16">
        <Process />
        <Why />
        <CTA />
      </main>
    </PageShell>
  );
}

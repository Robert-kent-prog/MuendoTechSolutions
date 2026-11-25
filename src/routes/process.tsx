import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, breadcrumbSchema, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { Process } from "@/components/sections/ProcessSection";
import { Why } from "@/components/sections/ServicePackagesSection";
import { CTA } from "@/components/sections/CTASection";

export const Route = createFileRoute("/process")({
  component: ProcessPage,
  head: () => {
    const head = pageHead({
      title: `Software Development Process | ${COMPANY}`,
      description:
        "Learn how Muendo Software Labs plans, designs, builds, tests, deploys, and supports reliable software products for businesses, schools, startups, and SMEs.",
      path: "/process",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Process", path: "/process" },
            ]),
          ),
        },
      ],
    };
  },
});

function ProcessPage() {
  return (
    <PageShell>
      <main className="pt-16">
        <Process headingAs="h1" />
        <Why />
        <CTA />
      </main>
    </PageShell>
  );
}

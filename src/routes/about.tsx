import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, breadcrumbSchema, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { About } from "@/components/sections/AboutSection";
import { Team } from "@/components/sections/TeamSection";
import { Why } from "@/components/sections/ServicePackagesSection";
import { CTA } from "@/components/sections/CTASection";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => {
    const head = pageHead({
      title: `About ${COMPANY} | Nairobi Software Development Team`,
      description:
        "Meet Muendo Software Labs in Nairobi: a software engineering team building web apps, mobile apps, backend APIs, M-Pesa integrations, and business systems.",
      path: "/about",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]),
          ),
        },
      ],
    };
  },
});

function AboutPage() {
  return (
    <PageShell>
      <main className="pt-16">
        <About headingAs="h1" />
        <Team />
        <Why />
        <CTA />
      </main>
    </PageShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { Services } from "@/components/sections/ServicesSection";
import { ServicePackages, ServicePagePreview, Solutions } from "@/components/sections/ServicePackagesSection";
import { Technologies } from "@/components/sections/TechStackSection";
import { Industries, IndustrySolutions } from "@/components/sections/IndustriesSection";
import { CTA } from "@/components/sections/CTASection";

export const Route = createFileRoute("/services/")({
  component: ServicesIndexPage,
  head: () =>
    pageHead({
      title: `Software Development Services | ${COMPANY}`,
      description:
        "Explore Muendo Tech Solutions services: business websites, e-commerce websites, SEO setup, web app development, mobile apps, backend APIs, POS systems, Laravel, Django, Spring Boot, AI integrations, and maintenance.",
      path: "/services",
    }),
});

function ServicesIndexPage() {
  return (
    <PageShell>
      <main className="pt-16">
        <Services />
        <ServicePackages />
        <ServicePagePreview />
        <Solutions />
        <Technologies />
        <Industries />
        <IndustrySolutions />
        <CTA />
      </main>
    </PageShell>
  );
}

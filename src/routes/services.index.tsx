import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, breadcrumbSchema, pageHead } from "@/lib/seo";
import { Services } from "@/components/sections/ServicesSection";
import {
  ServicePackages,
  ServicePagePreview,
  Solutions,
} from "@/components/sections/ServicePackagesSection";
import { Technologies } from "@/components/sections/TechStackSection";
import { Industries, IndustrySolutions } from "@/components/sections/IndustriesSection";
import { CTA } from "@/components/sections/CTASection";

export const Route = createFileRoute("/services/")({
  component: ServicesIndexPage,
  head: () => {
    const head = pageHead({
      title: `Software Development Services | ${COMPANY}`,
      description:
        "Software services in Kenya: business websites, e-commerce, web apps, mobile apps, backend APIs, POS systems, M-Pesa Daraja, AI, and maintenance.",
      path: "/services",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
            ]),
          ),
        },
      ],
    };
  },
});

function ServicesIndexPage() {
  return (
    <>
      <Services headingAs="h1" />
      <ServicePackages />
      <ServicePagePreview />
      <Solutions />
      <Technologies />
      <Industries />
      <IndustrySolutions />
      <CTA />
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";

import { COMPANY, pageHead } from "@/lib/seo";
import {
  Industries,
  IndustrySolutions,
  ServicePackages,
  ServicePagePreview,
  Services,
  Solutions,
  Technologies,
} from "./index";

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
    <>
      <Services />
      <ServicePackages />
      <ServicePagePreview />
      <Solutions />
      <Technologies />
      <Industries />
      <IndustrySolutions />
    </>
  );
}

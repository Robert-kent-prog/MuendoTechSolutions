import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, organizationSchema, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/sections/Hero";
import { Counters } from "@/components/sections/CountersSection";
import { About } from "@/components/sections/AboutSection";
import { Team } from "@/components/sections/TeamSection";
import { Services } from "@/components/sections/ServicesSection";
import {
  ServicePackages,
  ServicePagePreview,
  Solutions,
  Why,
} from "@/components/sections/ServicePackagesSection";
import { Process } from "@/components/sections/ProcessSection";
import { Projects } from "@/components/sections/ProjectsSection";
import { Technologies } from "@/components/sections/TechStackSection";
import { Industries, IndustrySolutions } from "@/components/sections/IndustriesSection";
import { Testimonials, TrustedPartners } from "@/components/sections/TestimonialsSection";
import { Insights } from "@/components/sections/InsightsSection";
import { FAQ } from "@/components/sections/FAQSection";
import { CTA } from "@/components/sections/CTASection";
import { Contact } from "@/components/sections/ContactSection";

// Re-export domain data and components for clean backwards compatibility
export * from "@/data/nav";
export * from "@/data/stats";
export * from "@/data/testimonials";
export * from "@/data/team";
export * from "@/data/faqs";
export * from "@/data/insights";
export * from "@/data/services";
export * from "@/data/technologies";
export * from "@/data/projects";
export * from "@/data/industries";

export {
  PageShell,
  Hero,
  Counters,
  About,
  Team,
  Services,
  ServicePackages,
  ServicePagePreview,
  Solutions,
  Why,
  Process,
  Projects,
  Technologies,
  Industries,
  IndustrySolutions,
  Testimonials,
  TrustedPartners,
  Insights,
  FAQ,
  CTA,
  Contact,
};

const HOME_HEAD = pageHead({
  title: `${COMPANY} — Software Development Company in Nairobi, Kenya`,
  description:
    "Nairobi-based software development company building reliable web apps, mobile apps, backend APIs, AI integrations, POS systems, and business software for startups, SMEs, schools, and enterprises across Kenya.",
  path: "/",
});

export const Route = createFileRoute("/")({
  component: IndexPage,
  head: () => ({
    ...HOME_HEAD,
    meta: [
      ...HOME_HEAD.meta,
      {
        name: "keywords",
        content:
          "software development Nairobi, web development Kenya, mobile app development Kenya, POS systems Kenya, business software Kenya, M-Pesa integration, backend APIs, AI integration Kenya, React, Laravel, Django, Spring Boot",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationSchema),
      },
    ],
  }),
});

function IndexPage() {
  return (
    <PageShell>
      <main>
        <Hero />
        <Counters />
        <About />
        <Team />
        <Services />
        <ServicePackages />
        <ServicePagePreview />
        <Solutions />
        <Why />
        <Process />
        <Projects />
        <Technologies />
        <Industries />
        <IndustrySolutions />
        <Testimonials />
        <TrustedPartners />
        <Insights />
        <FAQ />
        <CTA />
        <Contact />
      </main>
    </PageShell>
  );
}

export default IndexPage;

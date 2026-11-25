import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, organizationSchema, pageHead, websiteSchema } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/sections/Hero";
import { Counters } from "@/components/sections/CountersSection";
import { About } from "@/components/sections/AboutSection";
import { Services } from "@/components/sections/ServicesSection";
import { Process } from "@/components/sections/ProcessSection";
import { Projects } from "@/components/sections/ProjectsSection";
import { Testimonials, TrustedPartners } from "@/components/sections/TestimonialsSection";
import { Insights } from "@/components/sections/InsightsSection";
import { FAQ } from "@/components/sections/FAQSection";
import { CTA } from "@/components/sections/CTASection";

const HOME_HEAD = pageHead({
  title: `${COMPANY} | Software Development Company in Nairobi, Kenya`,
  description:
    "Nairobi software development company building web apps, mobile apps, backend APIs, M-Pesa integrations, POS systems, and AI software for Kenyan businesses.",
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
      {
        type: "application/ld+json",
        children: JSON.stringify(websiteSchema),
      },
    ],
  }),
});

function IndexPage() {
  return (
    <PageShell>
      <main>
        {/* 1. High-Impact Asymmetric Hero */}
        <Hero />

        {/* 2. Key Track Record Metrics */}
        <Counters />

        {/* 3. Company Capability Teaser */}
        <About showViewAll />

        {/* 4. Core Software Development Services */}
        <Services showViewAll />

        {/* 5. Proven Software Engineering Process */}
        <Process showViewAll />

        {/* 6. Featured Client Case Studies */}
        <Projects showViewAll />

        {/* 7. Client Reviews & Delivery Proof */}
        <Testimonials />
        <TrustedPartners />

        {/* 8. Workshop Field Notes & Insights */}
        <Insights showViewAll />

        {/* 9. Frequently Asked Questions */}
        <FAQ showViewAll />

        {/* 10. High-Conversion Project CTA Driving to /contact */}
        <CTA />
      </main>
    </PageShell>
  );
}

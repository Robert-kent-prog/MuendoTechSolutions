import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, organizationSchema, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/sections/Hero";
import { Counters } from "@/components/sections/CountersSection";
import { About } from "@/components/sections/AboutSection";
import { Services } from "@/components/sections/ServicesSection";
import { Process } from "@/components/sections/ProcessSection";
import { Projects } from "@/components/sections/ProjectsSection";
import { Testimonials, TrustedPartners } from "@/components/sections/TestimonialsSection";
import { Insights } from "@/components/sections/InsightsSection";
import { CTA } from "@/components/sections/CTASection";

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
        {/* 1. High-Impact Asymmetric Hero */}
        <Hero />

        {/* 2. Key Track Record Metrics */}
        <Counters />

        {/* 3. Company Capability Teaser */}
        <About />

        {/* 4. Core Software Development Services */}
        <Services />

        {/* 5. Proven Software Engineering Process */}
        <Process />

        {/* 6. Featured Client Case Studies */}
        <Projects />

        {/* 7. Client Reviews & Delivery Proof */}
        <Testimonials />
        <TrustedPartners />

        {/* 8. Workshop Field Notes & Insights */}
        <Insights />

        {/* 9. High-Conversion Project CTA Driving to /contact */}
        <CTA />
      </main>
    </PageShell>
  );
}

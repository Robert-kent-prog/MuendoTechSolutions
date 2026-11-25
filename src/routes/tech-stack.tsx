import { createFileRoute, Link } from "@tanstack/react-router";
import { COMPANY, breadcrumbSchema, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/SectionHeading";
import { Technologies } from "@/components/sections/TechStackSection";
import { CTA } from "@/components/sections/CTASection";

export const Route = createFileRoute("/tech-stack")({
  component: TechStackPage,
  head: () => {
    const head = pageHead({
      title: `Technology Stack | ${COMPANY}`,
      description:
        "Languages, frameworks, databases, and cloud tools Muendo Software Labs uses for web apps, mobile apps, APIs, M-Pesa, and AI integrations.",
      path: "/tech-stack",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Technology Stack", path: "/tech-stack" },
            ]),
          ),
        },
      ],
    };
  },
});

const PRINCIPLES = [
  {
    title: "Fit the team and the budget",
    desc: "A stack your business can afford to host, maintain and hire for matters more than the newest framework.",
  },
  {
    title: "Prefer proven tools",
    desc: "React, Node.js, Django, Laravel, Spring Boot and PostgreSQL have large communities, long support and plenty of developers.",
  },
  {
    title: "Secure by default",
    desc: "Input validation, role-based access, rate limiting and safe credential handling are part of every build, not an add-on.",
  },
];

function TechStackPage() {
  return (
    <PageShell>
      <main className="pt-16">
        <PageHeader
          eyebrow="Technology"
          title="The tools we build with, and why"
          subtitle="We choose technology around your workflow, budget and the people who will maintain the system, not around trends."
        />
        <Technologies />
        <Section
          id="how-we-choose"
          eyebrow="How We Choose"
          title="Three rules behind every stack decision"
          className="border-y border-border bg-sidebar/35"
        >
          <div className="grid md:grid-cols-3 gap-5">
            {PRINCIPLES.map((p) => (
              <article key={p.title} className="glass rounded-2xl p-6">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Want the longer version? Read{" "}
            <Link
              to="/blog/$slug"
              params={{ slug: "choosing-between-mern-and-spring-boot-for-kenyan-smes" }}
              className="text-accent font-medium hover:underline"
            >
              choosing between MERN and Spring Boot for Kenyan SMEs
            </Link>
            .
          </p>
        </Section>
        <CTA />
      </main>
    </PageShell>
  );
}

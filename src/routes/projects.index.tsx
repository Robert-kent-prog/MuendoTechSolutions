import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, breadcrumbSchema, pageHead } from "@/lib/seo";
import { Projects } from "@/components/sections/ProjectsSection";
import { Testimonials } from "@/components/sections/TestimonialsSection";
import { CTA } from "@/components/sections/CTASection";

export const Route = createFileRoute("/projects/")({
  component: ProjectsIndexPage,
  head: () => {
    const head = pageHead({
      title: `Software Projects and Case Studies | ${COMPANY}`,
      description:
        "View Muendo Software Labs case studies across marketplaces, fleet tracking, document systems, AI tools, health tracking, bookkeeping, and e-commerce.",
      path: "/projects",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
            ]),
          ),
        },
      ],
    };
  },
});

function ProjectsIndexPage() {
  return (
    <>
      <Projects filterable headingAs="h1" />
      <Testimonials />
      <CTA />
    </>
  );
}

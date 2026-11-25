import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, breadcrumbSchema, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { Contact, type ContactPrefill } from "@/components/sections/ContactSection";
import { FAQ } from "@/components/sections/FAQSection";

function sanitizeParam(value: unknown): string | undefined {
  if (typeof value !== "string" && typeof value !== "number") return undefined;
  const text = String(value);
  return text.length > 2000 ? text.slice(0, 2000) : text;
}

function validateContactSearch(search: Record<string, unknown>): ContactPrefill {
  return {
    service: sanitizeParam(search.service),
    budget: sanitizeParam(search.budget),
    project: sanitizeParam(search.project),
    source: sanitizeParam(search.source),
    message: sanitizeParam(search.message),
    timeline: sanitizeParam(search.timeline),
    features: sanitizeParam(search.features),
  };
}

export const Route = createFileRoute("/contact")({
  validateSearch: validateContactSearch,
  component: ContactPage,
  head: () => {
    const head = pageHead({
      title: `Contact ${COMPANY} | Request a Software Project Quote`,
      description:
        "Contact Muendo Software Labs in Nairobi to discuss a website, mobile app, backend API, POS system, AI integration, or software support.",
      path: "/contact",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ]),
          ),
        },
      ],
    };
  },
});

function ContactPage() {
  const search = Route.useSearch();
  return (
    <PageShell>
      <main className="pt-16">
        <Contact prefill={search} headingAs="h1" />
        <FAQ showViewAll />
      </main>
    </PageShell>
  );
}

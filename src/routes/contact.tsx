import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { COMPANY, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { Contact } from "@/components/sections/ContactSection";
import { FAQ } from "@/components/sections/FAQSection";

const optionalText = z.preprocess(
  (v) => (typeof v === "string" || typeof v === "number" ? String(v) : undefined),
  z.string().max(2000).optional(),
);

const contactSearchSchema = z.object({
  service: optionalText,
  budget: optionalText,
  project: optionalText,
  source: optionalText,
  message: optionalText,
  timeline: optionalText,
  features: optionalText,
});

export const Route = createFileRoute("/contact")({
  validateSearch: (search) => contactSearchSchema.parse(search),
  component: ContactPage,
  head: () =>
    pageHead({
      title: `Contact ${COMPANY} | Request a Software Project Quote`,
      description:
        "Contact Muendo Software Labs in Nairobi to discuss a website, mobile app, backend API, POS system, business platform, AI integration, or deployment support.",
      path: "/contact",
    }),
});

function ContactPage() {
  const search = Route.useSearch();
  return (
    <PageShell>
      <main className="pt-16">
        <Contact prefill={search} />
        <FAQ showViewAll />
      </main>
    </PageShell>
  );
}

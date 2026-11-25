import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, breadcrumbSchema, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { FAQ } from "@/components/sections/FAQSection";
import { CTA } from "@/components/sections/CTASection";
import { FAQS } from "@/data/faqs";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
  head: () => ({
    ...pageHead({
      title: `Software Development FAQ | ${COMPANY}`,
      description:
        "Answers on Muendo Software Labs pricing, timelines, M-Pesa integration, source-code ownership, retainers, deployment, training, and ongoing support.",
      path: "/faq",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        ),
      },
    ],
  }),
});

function FAQPage() {
  return (
    <PageShell>
      <main className="pt-16">
        <FAQ headingAs="h1" />
        <CTA />
      </main>
    </PageShell>
  );
}

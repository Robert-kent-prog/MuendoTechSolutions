import { createFileRoute } from "@tanstack/react-router";

import { COMPANY, pageHead } from "@/lib/seo";
import { FAQ, FAQS, PageShell } from "./index";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
  head: () => ({
    ...pageHead({
      title: `Software Development FAQ | ${COMPANY}`,
      description:
        "Answers to common questions about Muendo Tech Solutions pricing, timelines, M-Pesa integration, source-code ownership, retainers, deployment, training, and support.",
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
    ],
  }),
});

function FAQPage() {
  return (
    <PageShell>
      <main className="pt-16">
        <FAQ />
      </main>
    </PageShell>
  );
}

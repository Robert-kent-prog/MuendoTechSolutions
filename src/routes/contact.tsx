import { createFileRoute } from "@tanstack/react-router";

import { COMPANY, pageHead } from "@/lib/seo";
import { Contact, PageShell } from "./index";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () =>
    pageHead({
      title: `Contact ${COMPANY} | Request a Software Project Quote`,
      description:
        "Contact Muendo Tech Solutions in Nairobi to discuss a website, mobile app, backend API, POS system, business platform, AI integration, or deployment support.",
      path: "/contact",
    }),
});

function ContactPage() {
  return (
    <PageShell>
      <main className="pt-16">
        <Contact />
      </main>
    </PageShell>
  );
}

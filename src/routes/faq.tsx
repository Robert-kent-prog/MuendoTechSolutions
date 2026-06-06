import { createFileRoute } from "@tanstack/react-router";

import { FAQ, PageShell } from "./index";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
  head: () => ({
    meta: [{ title: "FAQ | Muendo Tech Solutions" }],
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

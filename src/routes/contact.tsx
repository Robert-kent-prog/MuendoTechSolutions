import { createFileRoute } from "@tanstack/react-router";

import { Contact, PageShell } from "./index";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [{ title: "Contact | Muendo Tech Solutions" }],
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

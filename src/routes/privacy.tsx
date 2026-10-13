import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, EMAIL, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { LegalPage, type LegalSection } from "@/components/layout/LegalPage";
import { WHATSAPP_DISPLAY } from "@/data/nav";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () =>
    pageHead({
      title: `Privacy Policy | ${COMPANY}`,
      description:
        "How Muendo Software Labs collects, uses and protects personal information shared through this website, in line with the Kenya Data Protection Act, 2019.",
      path: "/privacy",
    }),
});

const SECTIONS: LegalSection[] = [
  {
    heading: "Who we are",
    body: (
      <p>
        {COMPANY} is a software development company based in Nairobi, Kenya. This policy explains
        how we handle personal information when you use this website or contact us. You can reach us
        at {EMAIL} or on WhatsApp at {WHATSAPP_DISPLAY}.
      </p>
    ),
  },
  {
    heading: "What we collect",
    body: (
      <>
        <p>
          When you use the project brief form we ask for your name and email address, and optionally
          your phone number, company, the service you need, your budget range and a description of
          your project. We only receive this information when you choose to send it to us.
        </p>
        <p>
          If you message us on WhatsApp or by email directly, we receive whatever you choose to
          include in that message.
        </p>
      </>
    ),
  },
  {
    heading: "How the contact form works",
    body: (
      <p>
        The form on this site does not save your details on our servers. When you submit it, your
        brief is prepared in your browser and opened in WhatsApp, or copied and opened in your email
        app, so you send it to us yourself. After that, the message is handled by WhatsApp or your
        email provider under their own policies.
      </p>
    ),
  },
  {
    heading: "How we use your information",
    body: (
      <p>
        We use what you send us to reply to your enquiry, understand your project, prepare a quote
        and, if you become a client, deliver the work. We do not sell your information or use it for
        unrelated marketing.
      </p>
    ),
  },
  {
    heading: "Cookies, local storage and analytics",
    body: (
      <>
        <p>
          This site stores one preference in your browser, your light or dark theme choice, so the
          page looks the way you left it. It is not used to track you.
        </p>
        <p>
          We use Vercel Web Analytics to count visits and see which pages are read. It does not use
          cookies and does not follow you across other websites. It records anonymous details such
          as the page address, the page you came from, your country, and your device and browser
          type, and it identifies a visit with a hash that is discarded after 24 hours. We remove
          anything after a question mark in the page address before it is sent, so details prefilled
          in a contact link are not included. We use this only to understand which pages help
          visitors.
        </p>
      </>
    ),
  },
  {
    heading: "Third-party services",
    body: (
      <p>
        Links on this site to WhatsApp, GitHub and LinkedIn take you to services we do not control.
        Their own privacy policies apply once you leave this site.
      </p>
    ),
  },
  {
    heading: "How long we keep information",
    body: (
      <p>
        We keep enquiry messages for as long as needed to respond and to keep a record of work we
        have discussed or delivered. You can ask us to delete your messages at any time, unless we
        need to keep them for a legal or contractual reason.
      </p>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <p>
        Under the Kenya Data Protection Act, 2019 you may ask to see the personal data we hold about
        you, correct it, or have it deleted, and you may object to how it is used. Email {EMAIL} and
        we will respond. You also have the right to complain to the Office of the Data Protection
        Commissioner.
      </p>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <p>
        We may update this policy as the site changes. The date at the top of the page shows when it
        was last revised.
      </p>
    ),
  },
];

function PrivacyPage() {
  return (
    <PageShell>
      <main className="pt-16">
        <LegalPage
          title="Privacy Policy"
          subtitle="What we collect through this website, why, and the choices you have."
          updated="12 October 2026"
          sections={SECTIONS}
        />
      </main>
    </PageShell>
  );
}

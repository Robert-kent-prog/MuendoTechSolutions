import { createFileRoute } from "@tanstack/react-router";
import { COMPANY, EMAIL, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { LegalPage, type LegalSection } from "@/components/layout/LegalPage";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () =>
    pageHead({
      title: `Terms of Service | ${COMPANY}`,
      description:
        "The general terms that apply to quotes, projects and website use with Muendo Software Labs, including scope, payment, ownership of source code and support.",
      path: "/terms",
    }),
});

const SECTIONS: LegalSection[] = [
  {
    heading: "About these terms",
    body: (
      <p>
        These terms apply to your use of this website and to quotes and projects with {COMPANY}. For
        each project we also issue a written quote or agreement, and where it differs from these
        terms, the written quote or agreement applies.
      </p>
    ),
  },
  {
    heading: "Quotes and scope",
    body: (
      <p>
        Prices shown on this website and in the quote guide are indicative starting points, not
        offers. A binding price is only given in a written quote after we understand your scope.
        Work outside the agreed scope is quoted separately before we begin it.
      </p>
    ),
  },
  {
    heading: "Payment",
    body: (
      <p>
        The payment amounts and schedule for each project are set out in its written quote or
        agreement. Payments are made in Kenyan shillings unless agreed otherwise. We may pause work
        while an agreed payment is overdue.
      </p>
    ),
  },
  {
    heading: "Your responsibilities",
    body: (
      <p>
        To deliver on time we need accurate information, content and feedback from you promptly.
        Delays in providing these can move delivery dates. You confirm that content you give us
        (text, images, logos, data) is yours to use or that you have permission to use it.
      </p>
    ),
  },
  {
    heading: "Ownership of work",
    body: (
      <p>
        Once the agreed payment terms are completed, you own the delivered source code, assets,
        documentation and deployment access listed in the project scope. Third-party libraries and
        services remain under their own licences. We may mention the project in our portfolio unless
        you ask us not to.
      </p>
    ),
  },
  {
    heading: "Support and maintenance",
    body: (
      <p>
        Support after launch is covered by the period stated in your quote or by a monthly retainer
        agreement. Ongoing hosting, domain, third-party and licence costs are paid by you unless the
        quote says otherwise.
      </p>
    ),
  },
  {
    heading: "Liability",
    body: (
      <p>
        We build and test carefully, but software can fail for reasons outside our control, such as
        third-party outages or changes to external APIs. To the extent the law allows, our liability
        for a project is limited to the amount you paid us for it, and we are not liable for
        indirect or consequential losses.
      </p>
    ),
  },
  {
    heading: "Confidentiality",
    body: (
      <p>
        We treat the business information you share with us as confidential and use it only to
        deliver your project.
      </p>
    ),
  },
  {
    heading: "Using this website",
    body: (
      <p>
        You may use this website for lawful purposes only. The content here is provided for general
        information and may change without notice.
      </p>
    ),
  },
  {
    heading: "Governing law and contact",
    body: (
      <p>
        These terms are governed by the laws of Kenya. Questions about them can be sent to {EMAIL}.
      </p>
    ),
  },
];

function TermsPage() {
  return (
    <PageShell>
      <main className="pt-16">
        <LegalPage
          title="Terms of Service"
          subtitle="The general terms behind our quotes and projects."
          updated="12 October 2026"
          sections={SECTIONS}
        />
      </main>
    </PageShell>
  );
}

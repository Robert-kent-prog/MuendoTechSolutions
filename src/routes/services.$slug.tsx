import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, MessageCircle } from "lucide-react";
import { contactProjectHref } from "@/lib/contact-project";
import { COMPANY, SITE_URL, WHATSAPP, breadcrumbSchema, pageHead } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { SERVICE_DETAIL_PAGES, SERVICE_EXTRAS } from "@/data/services";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PhotoBand } from "@/components/ui/PhotoBand";
import { SERVICE_PHOTOS } from "@/data/credits";
import { CTA } from "@/components/sections/CTASection";

export const Route = createFileRoute("/services/$slug")({
  component: ServiceDetailRoute,
  head: ({ params }) => {
    const service = SERVICE_DETAIL_PAGES.find((item) => item.slug === params.slug);

    if (!service) {
      return {
        meta: [
          { title: `Service Not Found | ${COMPANY}` },
          { name: "robots", content: "noindex,follow" },
        ],
      };
    }

    const head = pageHead({
      title: `${service.title} | ${COMPANY}`,
      description: service.summary,
      path: `/services/${service.slug}`,
    });

    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.summary,
            provider: {
              "@type": "Organization",
              name: COMPANY,
              url: SITE_URL,
            },
            areaServed: {
              "@type": "Country",
              name: "Kenya",
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "KES",
              description: service.price,
              availability: "https://schema.org/InStock",
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: service.eyebrow, path: `/services/${service.slug}` },
            ]),
          ),
        },
        ...(SERVICE_EXTRAS[service.slug]
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: SERVICE_EXTRAS[service.slug].faqs.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  },
});

function ServiceDetailRoute() {
  return (
    <PageShell>
      <ServiceDetailPage />
    </PageShell>
  );
}

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const service = SERVICE_DETAIL_PAGES.find((item) => item.slug === slug);

  if (!service) {
    return (
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">Service not found</h1>
          <p className="mt-3 text-muted-foreground">
            The service page you opened may have moved or been removed.
          </p>
          <a
            href="/services"
            className="mt-6 inline-flex items-center gap-2 text-sm text-accent font-medium"
          >
            <ArrowLeft className="size-4" /> Back to services
          </a>
        </div>
      </section>
    );
  }

  const contactService =
    {
      "business-websites": "Business Website",
      "ecommerce-websites": "E-commerce Website",
      "pos-systems": "Point of Sale / Retail System",
      "website-maintenance": "Website Maintenance",
      "mpesa-integrations": "M-Pesa Integration",
      "web-applications": "Web Application",
      "mobile-apps": "Mobile App",
      "ai-integration": "AI Integration / AI System",
      "school-management-systems": "Business System",
      "health-and-clinic-systems": "Business System",
      "fleet-management-systems": "Fleet Management System",
    }[service.slug] || "Business System";
  const contactHref = contactProjectHref({
    title: service.title,
    service: contactService,
    source: `/services/${service.slug}`,
    message: [
      `I am interested in ${service.title}.`,
      "",
      `Project fit: ${service.bestFor}`,
      `Expected outcome: ${service.outcomes[0]}`,
      `Pricing note: ${service.price}`,
      "",
      "Business context:",
      "",
      "Features I need:",
      "",
      "Timeline:",
      "",
      "Other notes:",
    ].join("\n"),
  });
  const extras = SERVICE_EXTRAS[service.slug];
  const whatsappText = `Hello ${COMPANY}, I would like to discuss ${service.title}.`;

  return (
    <>
      <section className="relative overflow-hidden bg-hero-gradient py-20 sm:py-28">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Services", to: "/services" }, { label: service.eyebrow }]}
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                {service.eyebrow}
              </div>
              <h1 className="mt-4 text-4xl sm:text-6xl font-bold tracking-tight leading-tight">
                {service.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-muted-foreground leading-relaxed">
                {service.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={contactHref}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground shadow-lg shadow-primary/30 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Start This Project <ArrowRight className="size-4" />
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 font-medium text-foreground transition hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <MessageCircle className="size-4" /> Ask on WhatsApp
                </a>
              </div>
            </div>
            <aside className="glass rounded-2xl p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                Project Fit
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {service.bestFor}
              </p>
              <div className="mt-5 rounded-xl border border-border bg-secondary/35 p-4">
                <div className="text-xs text-muted-foreground">Pricing</div>
                <div className="mt-1 text-lg font-semibold text-foreground">{service.price}</div>
              </div>
              <p className="mt-5 text-sm text-foreground/85 leading-relaxed">{service.proof}</p>
            </aside>
          </div>
        </div>
      </section>

      {SERVICE_PHOTOS[service.slug] && <PhotoBand id={SERVICE_PHOTOS[service.slug]} />}

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">
                Outcomes
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                What the business should gain
              </h2>
              <div className="mt-8 grid gap-3">
                {service.outcomes.map((outcome) => (
                  <div key={outcome} className="glass rounded-xl p-4 flex gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
                    <span className="text-sm text-foreground/90">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">
                Features
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">What we can include</h2>
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {service.features.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-xl border border-border bg-background/55 p-4 text-sm text-muted-foreground"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 border-y border-border bg-sidebar/35">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">
              Delivery Process
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Clear steps from idea to launch
            </h2>
          </div>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.process.map((step, index) => (
              <div key={step} className="glass rounded-2xl p-6 card-hover">
                <div className="text-3xl font-bold text-primary mb-3">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {extras && (
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">
                Technology
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                What we build it with
              </h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {extras.stack.map((t) => (
                  <li
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-md bg-secondary border border-border text-secondary-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <a
                href="/tech-stack"
                className="mt-6 inline-flex items-center gap-1.5 text-sm text-accent font-medium hover:gap-2.5 transition-all"
              >
                See the full tech stack <ArrowRight className="size-4" />
              </a>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">
                FAQ
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Questions about this service
              </h2>
              <div className="mt-6 space-y-3">
                {extras.faqs.map((f) => (
                  <details key={f.q} className="glass rounded-xl group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm sm:text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
                      {f.q}
                      <ChevronDown
                        className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}

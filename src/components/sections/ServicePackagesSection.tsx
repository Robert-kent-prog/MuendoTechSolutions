import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import { Section } from "@/components/ui/SectionHeading";
import {
  SERVICE_PACKAGES,
  SERVICE_PACKAGE_CONTACT_DETAILS,
  SERVICE_DETAIL_PAGES,
  SOLUTIONS,
  WHY,
} from "@/data/services";
import { contactProjectHref } from "@/lib/contact-project";
import { COMPANY, WHATSAPP } from "@/lib/seo";

export function ServicePackages() {
  return (
    <Section id="packages" eyebrow="Starting Points" title="Common Project Packages">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        {SERVICE_PACKAGES.map((pkg, index) => {
          const contactDetails = SERVICE_PACKAGE_CONTACT_DETAILS[pkg.title];
          const Icon = pkg.icon;

          return (
            <article
              key={pkg.title}
              className={`glass rounded-2xl p-6 card-hover flex flex-col ${
                index === 1 ? "border-primary/60 shadow-lg shadow-primary/10" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="size-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 grid place-items-center">
                  <Icon className="size-5 text-foreground" />
                </div>
                {index === 1 && (
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                    Most custom
                  </span>
                )}
              </div>
              <h3 className="mt-5 text-lg font-semibold">{pkg.title}</h3>
              <p className="mt-2 text-sm font-medium text-accent">{pkg.price}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{pkg.desc}</p>
              <p className="mt-4 rounded-lg border border-border bg-secondary/35 p-3 text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Best for: </span>
                {pkg.bestFor}
              </p>
              <ul className="mt-5 space-y-2 flex-1">
                {pkg.items.map((item) => (
                  <li key={item} className="flex gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-2">
                <a
                  href={contactProjectHref({
                    title: pkg.title,
                    service: contactDetails?.service,
                    budget: contactDetails?.budget,
                    source: "Service package card",
                    message: contactDetails?.message,
                  })}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {pkg.cta} <ArrowRight className="size-4" />
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello ${COMPANY}, I would like to discuss the ${pkg.title} package.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <MessageCircle className="size-4" /> Ask on WhatsApp
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

export function ServicePagePreview() {
  return (
    <Section
      id="service-pages"
      eyebrow="Dedicated Services"
      title="Explore Focused Service Pages"
      subtitle="Each page explains the outcome, features, process, and fit for a specific service so clients can choose the right starting point."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICE_DETAIL_PAGES.map((service) => (
          <article key={service.slug} className="glass rounded-2xl p-6 card-hover flex flex-col">
            <div className="text-xs font-semibold uppercase tracking-wider text-accent">
              {service.eyebrow}
            </div>
            <h3 className="mt-3 text-xl font-semibold leading-snug">{service.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
              {service.summary}
            </p>
            <div className="mt-5 rounded-lg border border-border bg-secondary/35 p-3 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Best for: </span>
              {service.bestFor}
            </div>
            <a
              href={`/services/${service.slug}`}
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-accent font-medium hover:gap-2.5 transition-all"
            >
              View service page <ArrowRight className="size-4" />
            </a>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Solutions() {
  return (
    <Section
      id="solutions"
      eyebrow="Solutions"
      title="Solutions We Can Build"
      subtitle="Production-ready building blocks we've delivered — and can shape to fit your workflow."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SOLUTIONS.map((s, i) => (
          <div key={s} className="glass rounded-xl p-5 card-hover flex items-start gap-3">
            <div className="size-8 rounded-lg bg-primary/15 text-primary grid place-items-center shrink-0 text-xs font-bold">
              {String(i + 1).padStart(2, "0")}
            </div>
            <span className="text-sm font-medium pt-1">{s}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Why() {
  return (
    <Section
      id="why"
      eyebrow="Why Choose Us"
      title="Built Around Clean Architecture & Clear Communication"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {WHY.map((w) => (
          <div key={w.title} className="glass rounded-2xl p-6 card-hover">
            <div className="size-9 rounded-lg bg-accent/15 text-accent grid place-items-center mb-4">
              <CheckCircle2 className="size-5" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{w.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

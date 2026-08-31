import { Quote, Award } from "lucide-react";
import { Section } from "@/components/ui/SectionHeading";
import { TESTIMONIALS, TRUSTED_PARTNERS } from "@/data/testimonials";

export function Testimonials() {
  return (
    <Section
      id="testimonials"
      eyebrow="Trust"
      title="What Clients Say"
      subtitle="Honest feedback from the people we've shipped systems for."
    >
      <div className="grid md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="glass rounded-2xl p-7 card-hover flex flex-col">
            <Quote className="size-7 text-accent mb-4" />
            <blockquote className="text-sm text-foreground/90 leading-relaxed flex-1">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-5 pt-5 border-t border-border">
              <div className="font-semibold text-sm">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
              <div className="mt-3 inline-flex rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                {t.result}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

export function TrustedPartners() {
  return (
    <section className="py-14 sm:py-18 border-y border-border bg-sidebar/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.5fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-muted-foreground">
              <Award className="size-3.5 text-accent" />
              Delivery proof
            </div>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">
              Trusted on practical business systems.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              A quick view of the business platforms, agency websites, logistics tools, and
              verification systems already shaped by our delivery process.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TRUSTED_PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="rounded-xl border border-border bg-background/55 p-4 transition hover:border-accent/40 hover:bg-secondary/35"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground grid place-items-center text-xs font-bold">
                    {partner.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{partner.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{partner.type}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

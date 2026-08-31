import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { contactProjectHref } from "@/lib/contact-project";
import { HERO_HIGHLIGHTS } from "@/data/services";

export function Hero() {
  return (
    <section
      id="home"
      className="relative scroll-mt-16 pt-28 pb-20 sm:pt-36 sm:pb-28 bg-hero-gradient overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground mb-6">
            <Sparkles className="size-3.5 text-accent" />
            Software Development Company · Nairobi, Kenya
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            Build <span className="text-gradient">Reliable Software</span>
            <br className="hidden sm:block" /> for Your Business
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            We design and develop modern web applications, mobile apps, backend systems, APIs, and
            database-driven platforms for businesses, startups, schools, retail operations, and
            service providers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={contactProjectHref({
                title: "New business software project",
                service: "Business System",
                source: "Homepage hero",
                message:
                  "I would like to build reliable software for my business.\n\nBusiness type:\n\nProblem to solve:\n\nFeatures needed:\n\nTimeline:\n\nBudget range:",
              })}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-lg shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Start a Project <ArrowRight className="size-4" />
            </a>
            <a
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg glass text-foreground font-medium hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              View Our Services
            </a>
            <a
              href={contactProjectHref({
                title: "General project enquiry",
                service: "Other",
                source: "Homepage contact button",
                message:
                  "I would like to discuss a project.\n\nWhat I need:\n\nCurrent challenge:\n\nTimeline:\n\nOther notes:",
              })}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-white/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Contact Us
            </a>
          </div>
        </div>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-3">
          {HERO_HIGHLIGHTS.map((h) => (
            <div
              key={h}
              className="glass card-hover rounded-xl px-4 py-3 flex items-center gap-2 text-sm"
            >
              <CheckCircle2 className="size-4 text-accent shrink-0" />
              <span className="text-foreground/90">{h}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

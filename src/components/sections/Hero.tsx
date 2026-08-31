import { Sparkles, ArrowRight, CheckCircle2, Terminal, Code2, ShieldCheck, Database, Server } from "lucide-react";
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
        <div className="grid lg:grid-cols-12 gap-12 lg:items-center">
          {/* Left Column: Asymmetric 7-cols */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 text-xs text-muted-foreground">
              <Sparkles className="size-3.5 text-accent" />
              Software Development Company · Nairobi, Kenya
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
              Build <span className="text-gradient">Reliable Software</span>
              <br className="hidden sm:block" /> for Your Business
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              We design and develop modern web applications, mobile apps, backend systems, APIs, and
              database-driven platforms for businesses, startups, schools, retail operations, and
              service providers across Kenya and beyond.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={contactProjectHref({
                  title: "New business software project",
                  service: "Business System",
                  source: "Homepage hero",
                  message:
                    "I would like to build reliable software for my business.\n\nBusiness type:\n\nProblem to solve:\n\nFeatures needed:\n\nTimeline:\n\nBudget range:",
                })}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-lg shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Start a Project <ArrowRight className="size-4" />
              </a>
              <a
                href="/services"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg glass text-foreground font-medium hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                View Services
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

          {/* Right Column: Asymmetric 5-cols Live Architecture Spotlight */}
          <div className="lg:col-span-5">
            <div className="glass rounded-2xl p-6 border border-border shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-destructive/60" />
                  <div className="size-3 rounded-full bg-accent/60" />
                  <div className="size-3 rounded-full bg-primary/60" />
                </div>
                <div className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                  <Terminal className="size-3.5 text-accent" /> muendo-tech-stack.ts
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs text-muted-foreground leading-relaxed">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <Code2 className="size-4 text-primary shrink-0" /> Full-Stack Architecture
                </div>
                <p className="text-muted-foreground pl-6">
                  React 19 · React Native · Node.js · Express · TypeScript · Python · Django · Spring Boot
                </p>

                <div className="flex items-center gap-2 text-foreground font-semibold pt-2">
                  <Database className="size-4 text-accent shrink-0" /> Database & Storage
                </div>
                <p className="text-muted-foreground pl-6">
                  MongoDB · PostgreSQL · MySQL · Redis · Cloud Storage
                </p>

                <div className="flex items-center gap-2 text-foreground font-semibold pt-2">
                  <ShieldCheck className="size-4 text-emerald-400 shrink-0" /> Security & Production Baseline
                </div>
                <p className="text-muted-foreground pl-6">
                  M-Pesa Daraja · JWT RBAC · Zod Validation · Audit Logging · Linux VPS / Vercel
                </p>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Server className="size-3.5 text-accent" /> 100% Production Ready
                </span>
                <span className="text-accent font-medium">Verified Built in Kenya</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Banner */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {HERO_HIGHLIGHTS.map((h) => (
            <div
              key={h}
              className="glass card-hover rounded-xl px-3.5 py-2.5 flex items-center gap-2 text-xs"
            >
              <CheckCircle2 className="size-3.5 text-accent shrink-0" />
              <span className="text-foreground/90 font-medium truncate">{h}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

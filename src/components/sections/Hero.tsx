import { Sparkles, ArrowRight, CheckCircle2, Terminal, Code2, ShieldCheck, Database, Server } from "lucide-react";
import { contactProjectHref } from "@/lib/contact-project";
import { HERO_HIGHLIGHTS } from "@/data/services";

export function Hero() {
  return (
    <section
      id="home"
      className="relative scroll-mt-16 pt-28 pb-20 sm:pt-36 sm:pb-28 bg-hero-gradient overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:items-center">
          {/* Left Column: Asymmetric 7-cols */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 text-xs text-muted-foreground tracking-wide uppercase font-semibold">
              <span className="size-2 rounded-full bg-accent animate-pulse" />
              Software Development Company · Nairobi, Kenya
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
              Build <span className="text-gradient">Reliable Software</span>
              <br className="hidden sm:block" /> for Your Business
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              We design and build custom software that replaces manual workflows, connects your
              operations, and gives your business reliable digital systems to operate and scale with confidence.
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
                  <Terminal className="size-3.5 text-accent" /> muendo-architecture.ts
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs text-muted-foreground leading-relaxed">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <Code2 className="size-4 text-primary shrink-0" /> Full-Stack Architecture
                </div>
                <p className="text-muted-foreground pl-6">
                  React 19 · React Native · TypeScript · Node.js · Express · Python FastAPI
                </p>

                <div className="flex items-center gap-2 text-foreground font-semibold pt-2">
                  <Database className="size-4 text-accent shrink-0" /> Database & Storage
                </div>
                <p className="text-muted-foreground pl-6">
                  PostgreSQL · MongoDB · MySQL · Redis · Cloud Storage
                </p>

                <div className="flex items-center gap-2 text-foreground font-semibold pt-2">
                  <ShieldCheck className="size-4 text-emerald-400 shrink-0" /> Security & Integrations
                </div>
                <p className="text-muted-foreground pl-6">
                  M-Pesa Daraja · JWT Auth & RBAC · Zod Validation · Audit Logging · Linux / Vercel
                </p>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Server className="size-3.5 text-accent" /> Production-Focused Engineering
                </span>
                <span className="text-accent font-medium">Engineered in Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        {/* Capability Strip */}
        <div className="mt-14 pt-8 border-t border-border/60">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-muted-foreground font-medium">
            <span className="flex items-center gap-2 text-foreground">
              <span className="size-1.5 rounded-full bg-accent" /> Web Applications
            </span>
            <span className="flex items-center gap-2 text-foreground">
              <span className="size-1.5 rounded-full bg-accent" /> Mobile Apps
            </span>
            <span className="flex items-center gap-2 text-foreground">
              <span className="size-1.5 rounded-full bg-accent" /> Backend APIs
            </span>
            <span className="flex items-center gap-2 text-foreground">
              <span className="size-1.5 rounded-full bg-accent" /> Business Systems
            </span>
            <span className="flex items-center gap-2 text-foreground">
              <span className="size-1.5 rounded-full bg-accent" /> M-Pesa & Integrations
            </span>
            <span className="flex items-center gap-2 text-foreground">
              <span className="size-1.5 rounded-full bg-accent" /> Deployment & Maintenance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

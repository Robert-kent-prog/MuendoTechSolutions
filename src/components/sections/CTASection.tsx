import { ArrowRight, MessageCircle } from "lucide-react";
import { contactProjectHref } from "@/lib/contact-project";
import { WHATSAPP } from "@/lib/seo";

export function CTA() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-10 sm:p-14 overflow-hidden bg-hero-gradient border border-border">
          <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-3xl">
              Ready to <span className="text-gradient">Build Your Software?</span>
            </h2>
            <p className="mt-5 text-muted-foreground max-w-2xl text-lg">
              Whether you need a company website, mobile app, backend API, business system, or full
              digital platform — we'll help you plan, build, deploy, and improve it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={contactProjectHref({
                  title: "New software project",
                  service: "Business System",
                  source: "Section CTA",
                  message:
                    "I am ready to build software for my business.\n\nBusiness goal:\n\nProject type:\n\nFeatures needed:\n\nTimeline:\n\nBudget range:",
                })}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Start a Project <ArrowRight className="size-4" />
              </a>
              <a
                href={contactProjectHref({
                  title: "Project quote request",
                  service: "Other",
                  source: "Section quote CTA",
                  message:
                    "I would like to request a project quote.\n\nWhat I need built:\n\nCurrent status:\n\nImportant features:\n\nTimeline:\n\nBudget range:",
                })}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg glass text-foreground font-medium hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Request a Quote
              </a>
              <a
                href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-white/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <MessageCircle className="size-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

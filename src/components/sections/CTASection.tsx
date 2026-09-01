import { ArrowRight, MessageCircle } from "lucide-react";
import { contactProjectHref } from "@/lib/contact-project";
import { WHATSAPP } from "@/lib/seo";

export function CTA() {
  return (
    <section className="pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl p-8 sm:p-12 overflow-hidden glass border border-border shadow-xl">
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight max-w-3xl leading-tight">
              Let's Build Something Your Business{" "}
              <span className="text-gradient">Can Rely On.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl text-base sm:text-lg leading-relaxed">
              Tell us what you're trying to improve, automate, or build. We'll help turn your idea
              into a reliable digital system — from architecture and development to deployment and support.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={contactProjectHref({
                  title: "Discuss a new software project",
                  service: "Business System",
                  source: "Section CTA",
                  message:
                    "I would like to discuss a software project for my business.\n\nBusiness goal:\n\nSystem type:\n\nFeatures needed:\n\nTimeline:\n\nBudget range:",
                })}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Discuss Your Project <ArrowRight className="size-4" />
              </a>
              <a
                href={contactProjectHref({
                  title: "Project quote request",
                  service: "Other",
                  source: "Section quote CTA",
                  message:
                    "I would like to request a project quote.\n\nWhat I need built:\n\nCurrent status:\n\nImportant features:\n\nTimeline:\n\nBudget range:",
                })}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border glass text-foreground font-medium hover:bg-secondary/60 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Request a Quote
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-border/50 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <span>Prefer WhatsApp?</span>
              <a
                href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Muendo Software Labs on WhatsApp"
                className="inline-flex items-center gap-1.5 font-medium text-emerald-400 hover:underline"
              >
                <MessageCircle className="size-4 shrink-0" /> Chat with us on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

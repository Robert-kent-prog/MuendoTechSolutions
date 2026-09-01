import { useState } from "react";
import { HelpCircle, ChevronDown, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/SectionHeading";
import { FAQS } from "@/data/faqs";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Frequently Asked Questions"
      subtitle="Quick answers to the things clients ask us most often."
    >
      <div className="max-w-3xl space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className={`glass rounded-xl overflow-hidden ${
                i >= 5 ? "hidden md:block" : "block"
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-secondary/40 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="font-medium text-sm sm:text-base flex items-center gap-3">
                  <HelpCircle className="size-4 text-accent shrink-0" />
                  {f.q}
                </span>
                <ChevronDown
                  className={`size-4 text-muted-foreground shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <a
          href="/faq"
          className="inline-flex items-center justify-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg border border-border bg-secondary/40 text-foreground hover:bg-secondary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          View All FAQs <ArrowRight className="size-4" />
        </a>
      </div>
    </Section>
  );
}

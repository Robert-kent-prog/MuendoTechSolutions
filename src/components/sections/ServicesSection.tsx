import { CheckCircle2, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/SectionHeading";
import { SERVICES, WEB_PRESENCE_SERVICES } from "@/data/services";
import { contactProjectHref } from "@/lib/contact-project";

export function Services({ showViewAll = false }: { showViewAll?: boolean } = {}) {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="Complete Software & Web Capabilities"
      subtitle="From core business software and mobile tools to web presence, SEO, and hosting support — we cover every layer needed to ship and operate modern software."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className={`glass rounded-2xl p-6 card-hover flex-col ${
                showViewAll && idx >= 6 ? "hidden" : "flex"
              }`}
            >
              <div className="size-11 rounded-xl bg-primary/15 text-primary grid place-items-center mb-4">
                <Icon className="size-5" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{s.desc}</p>
              <ul className="space-y-1.5 mt-auto pt-4 border-t border-border/50 text-xs text-muted-foreground">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3 text-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {showViewAll && (
        <div className="mt-8 text-center sm:text-left">
          <a
            href="/services"
            className="inline-flex items-center justify-center gap-2 text-sm font-medium px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-sm"
          >
            View All Services <ArrowRight className="size-4" />
          </a>
        </div>
      )}

      <div className="mt-16 pt-12 border-t border-border">
        <div className="max-w-3xl mb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-2">
            Web & Growth
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Web Presence, SEO & Maintenance
          </h3>
          <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
            For businesses that need a clean company website, landing pages, e-commerce, Google
            visibility, or maintenance support without building a full enterprise app first.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {WEB_PRESENCE_SERVICES.map((item, idx) => (
            <div
              key={item.title}
              className={`glass rounded-xl p-5 card-hover ${
                showViewAll && idx >= 4 ? "hidden" : "block"
              }`}
            >
              <h4 className="font-semibold text-sm text-foreground mb-1.5">{item.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
              <a
                href={contactProjectHref({
                  title: `Enquiry about ${item.title}`,
                  service: item.title,
                  source: "Web & Growth Services",
                  message: `I would like to discuss ${item.title}.\n\nBusiness type:\n\nMain goals:\n\nTimeline:\n\nOther notes:`,
                })}
                className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              >
                Discuss {item.title} <ArrowRight className="size-3" />
              </a>
            </div>
          ))}
        </div>

        {showViewAll && (
          <div className="mt-10 text-center sm:text-left">
            <a
              href="/services"
              className="inline-flex items-center justify-center gap-2 text-sm font-medium px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-sm"
            >
              View All Web & Maintenance Services <ArrowRight className="size-4" />
            </a>
          </div>
        )}
      </div>
    </Section>
  );
}

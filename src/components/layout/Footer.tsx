import { Github, Linkedin, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { FileRouteTypes } from "@/routeTree.gen";
import { COMPANY, EMAIL, GITHUB, LINKEDIN, SITE_URL, WHATSAPP } from "@/lib/seo";
import { BUSINESS_HOURS, NAV_COMPANY, WHATSAPP_DISPLAY } from "@/data/nav";
import { SERVICE_DETAIL_PAGES } from "@/data/services";
import { Logo } from "@/components/ui/Logo";

const ROUTES: readonly string[] = [
  "/",
  "/about",
  "/services",
  "/projects",
  "/process",
  "/blog",
  "/faq",
  "/contact",
  "/sitemap",
  "/pricing",
  "/quote",
  "/industries",
  "/tech-stack",
  "/privacy",
  "/terms",
  "/credits",
];

const FOOTER_SERVICE_SLUGS = [
  "web-applications",
  "mobile-apps",
  "ai-integration",
  "pos-systems",
  "mpesa-integrations",
  "business-websites",
  "ecommerce-websites",
  "website-maintenance",
];

function isRoute(href: string): href is FileRouteTypes["to"] {
  return ROUTES.includes(href);
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="font-semibold mb-4 text-sm tracking-wide text-foreground">{title}</h4>
      <ul className="space-y-2.5 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.label}>
            {l.href.startsWith("/services/") ? (
              <Link
                to="/services/$slug"
                params={{ slug: l.href.replace("/services/", "") }}
                className="hover:text-foreground transition"
              >
                {l.label}
              </Link>
            ) : isRoute(l.href) ? (
              <Link to={l.href} className="hover:text-foreground transition">
                {l.label}
              </Link>
            ) : (
              <a href={l.href} className="hover:text-foreground transition">
                {l.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2" aria-label={COMPANY}>
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Software development company based in Nairobi, Kenya. Building web apps, mobile
              products, backend APIs, POS systems, business platforms, AI integrations, and
              payment-ready systems.
            </p>
            <div className="flex items-center gap-3 text-muted-foreground pt-2">
              <a
                href={`https://github.com/${GITHUB}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="size-9 rounded-lg border border-border grid place-items-center hover:text-foreground hover:bg-secondary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Github className="size-4" />
              </a>
              <a
                href={`https://linkedin.com/in/${LINKEDIN}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="size-9 rounded-lg border border-border grid place-items-center hover:text-foreground hover:bg-secondary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp contact"
                className="size-9 rounded-lg border border-border grid place-items-center hover:text-foreground hover:bg-secondary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <MessageCircle className="size-4" />
              </a>
            </div>
          </div>
          <FooterCol
            title="Company"
            links={[
              { label: "Home", href: "/" },
              ...NAV_COMPANY.map((l) => ({ label: l.label, href: l.href as string })),
              { label: "Projects", href: "/projects" },
              { label: "Contact", href: "/contact" },
            ]}
          />
          <FooterCol
            title="Services"
            links={[
              ...FOOTER_SERVICE_SLUGS.flatMap((slug) => {
                const s = SERVICE_DETAIL_PAGES.find((p) => p.slug === slug);
                return s ? [{ label: s.eyebrow, href: `/services/${s.slug}` }] : [];
              }),
              { label: "All services", href: "/services" },
            ]}
          />
          <FooterCol
            title="Resources"
            links={[
              { label: "Pricing", href: "/pricing" },
              { label: "Quote guide", href: "/quote" },
              { label: "Blog & Insights", href: "/blog" },
              { label: "FAQ", href: "/faq" },
              { label: "Sitemap", href: "/sitemap" },
            ]}
          />
          <div>
            <FooterCol
              title="Contact"
              links={[
                { label: EMAIL, href: `mailto:${EMAIL}` },
                { label: WHATSAPP_DISPLAY, href: `https://wa.me/${WHATSAPP.replace(/\D/g, "")}` },
                { label: "Nairobi, Kenya", href: "/contact" },
              ]}
            />
            {BUSINESS_HOURS && (
              <dl className="mt-5 space-y-1 text-xs text-muted-foreground">
                {BUSINESS_HOURS.map((h) => (
                  <div key={h.days} className="flex justify-between gap-3">
                    <dt>{h.days}</dt>
                    <dd className="text-foreground">{h.hours}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <div>
            © {new Date().getFullYear()} {COMPANY}. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-foreground transition">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition">
              Terms
            </Link>
            <Link to="/credits" className="hover:text-foreground transition">
              Credits
            </Link>
            <Link to="/sitemap" className="hover:text-foreground transition">
              Sitemap
            </Link>
            <Link to="/faq" className="hover:text-foreground transition">
              FAQ
            </Link>
            <Link to="/contact" className="hover:text-foreground transition">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

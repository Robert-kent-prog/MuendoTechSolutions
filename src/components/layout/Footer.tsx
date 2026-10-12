import { Github, Linkedin, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { FileRouteTypes } from "@/routeTree.gen";
import { COMPANY, EMAIL, GITHUB, LINKEDIN, SITE_URL, WHATSAPP } from "@/lib/seo";
import { WHATSAPP_DISPLAY } from "@/data/nav";
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
  "/privacy",
  "/terms",
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
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
            title="Navigation"
            links={[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Services", href: "/services" },
              { label: "Projects", href: "/projects" },
              { label: "Process", href: "/process" },
              { label: "Pricing", href: "/pricing" },
              { label: "Industries", href: "/industries" },
              { label: "Blog & Insights", href: "/blog" },
              { label: "FAQ", href: "/faq" },
              { label: "Contact", href: "/contact" },
            ]}
          />
          <FooterCol
            title="Services"
            links={[
              { label: "Web Application Dev", href: "/services/web-applications" },
              { label: "Mobile App Dev", href: "/services/mobile-apps" },
              { label: "Backend API Dev", href: "/services#backend-apis" },
              { label: "Business Systems", href: "/services#business-systems" },
              { label: "POS & Retail Systems", href: "/services#pos-systems" },
              { label: "AI Integrations", href: "/services/ai-integration" },
              { label: "PHP & Laravel Work", href: "/services#php-laravel" },
              { label: "Deployment & Support", href: "/services#deployment" },
            ]}
          />
          <FooterCol
            title="Contact"
            links={[
              { label: EMAIL, href: `mailto:${EMAIL}` },
              { label: WHATSAPP_DISPLAY, href: `https://wa.me/${WHATSAPP.replace(/\D/g, "")}` },
              { label: "Nairobi, Kenya", href: "/contact" },
            ]}
          />
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

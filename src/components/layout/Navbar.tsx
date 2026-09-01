import { useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { COMPANY } from "@/lib/seo";
import { contactProjectHref } from "@/lib/contact-project";
import { NAV, LOGO_SRC } from "@/data/nav";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 inset-x-0 z-50 nav-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="flex min-w-0 items-center gap-2 group" aria-label={COMPANY}>
          <Logo />
        </a>
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
          {NAV.map((n) => {
            const isActive = location.pathname === n.href;
            return (
              <a
                key={n.href}
                href={n.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative text-sm px-3 py-2 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
                <span
                  className={`absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                    isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <a
            href={contactProjectHref({
              title: "New software project",
              service: "Business System",
              source: "Navbar CTA",
              message:
                "I would like to start a software project.\n\nBusiness goal:\n\nService or system needed:\n\nMain features:\n\nTimeline:\n\nOther notes:",
            })}
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Start a Project <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="text-foreground p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV.map((n) => {
              const isActive = location.pathname === n.href;
              return (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm py-2 px-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-secondary text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {n.label}
                </a>
              );
            })}
            <a
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-primary text-primary-foreground"
            >
              Start a Project <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

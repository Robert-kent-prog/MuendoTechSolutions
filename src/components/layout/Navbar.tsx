import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { COMPANY } from "@/lib/seo";
import { NAV_COMPANY, NAV_RESOURCES, NAV_TOP, type NavLink } from "@/data/nav";
import { SERVICE_DETAIL_PAGES } from "@/data/services";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "@/components/ui/Logo";

const NAVBAR_CTA_SEARCH = {
  project: "New software project",
  service: "Business System",
  source: "Navbar CTA",
  message:
    "I would like to start a software project.\n\nBusiness goal:\n\nService or system needed:\n\nMain features:\n\nTimeline:\n\nOther notes:",
};

type MenuId = "services" | "company" | "resources";

const linkBase =
  "relative text-sm px-2.5 py-2 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function Underline({ active }: { active: boolean }) {
  return (
    <span
      className={`absolute left-2.5 right-2.5 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
        active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
      }`}
    />
  );
}

function DropdownButton({
  id,
  label,
  active,
  openMenu,
  onToggle,
  children,
  panelClass,
}: {
  id: MenuId;
  label: string;
  active: boolean;
  openMenu: MenuId | null;
  onToggle: (id: MenuId) => void;
  children: ReactNode;
  panelClass: string;
}) {
  const isOpen = openMenu === id;
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        aria-controls={`menu-${id}`}
        className={`${linkBase} inline-flex items-center gap-1 cursor-pointer ${
          active || isOpen
            ? "text-foreground font-medium"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {label}
        <ChevronDown
          className={`size-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
        <Underline active={active} />
      </button>
      {isOpen && (
        <div
          id={`menu-${id}`}
          className={`absolute top-full mt-2 rounded-xl border border-border bg-background p-2 shadow-lg ${panelClass}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function SimpleMenuLinks({ links, onNavigate }: { links: NavLink[]; onNavigate: () => void }) {
  return (
    <ul>
      {links.map((l) => (
        <li key={l.href}>
          <Link
            to={l.href}
            onClick={onNavigate}
            className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const location = useLocation();
  const path = location.pathname;
  const navRef = useRef<HTMLElement>(null);

  const closeAll = () => {
    setMobileOpen(false);
    setOpenMenu(null);
  };

  useEffect(() => {
    if (!mobileOpen && !openMenu) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    const onPointerDown = (e: MouseEvent) => {
      if (openMenu && navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
    };
  }, [mobileOpen, openMenu]);

  useEffect(() => {
    closeAll();
  }, [path]);

  const toggleMenu = (id: MenuId) => setOpenMenu((cur) => (cur === id ? null : id));
  const isIn = (links: NavLink[]) =>
    links.some((l) => path === l.href || path.startsWith(`${l.href}/`));
  const servicesActive = path === "/services" || path.startsWith("/services/");
  const companyActive = isIn(NAV_COMPANY);
  const resourcesActive = isIn(NAV_RESOURCES) || path.startsWith("/blog");

  return (
    <header className="fixed top-0 inset-x-0 z-50 nav-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2 group" aria-label={COMPANY}>
          <Logo />
        </Link>

        <nav
          ref={navRef}
          className="hidden lg:flex items-center gap-1"
          aria-label="Main Navigation"
        >
          <DropdownButton
            id="services"
            label="Services"
            active={servicesActive}
            openMenu={openMenu}
            onToggle={toggleMenu}
            panelClass="left-0 w-[36rem]"
          >
            <ul className="grid grid-cols-2 gap-1">
              {SERVICE_DETAIL_PAGES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    onClick={closeAll}
                    className="block rounded-lg px-3 py-2.5 hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="block text-sm font-medium text-foreground">{s.eyebrow}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground line-clamp-2">
                      {s.bestFor}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/services"
              onClick={closeAll}
              className="mt-1 flex items-center justify-between rounded-lg border-t border-border px-3 py-2.5 text-sm font-medium text-accent hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              View all services <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </DropdownButton>

          {NAV_TOP.map((n) => {
            const isActive = path === n.href || path.startsWith(`${n.href}/`);
            return (
              <Link
                key={n.href}
                to={n.href}
                aria-current={path === n.href ? "page" : undefined}
                className={`${linkBase} ${
                  isActive
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
                <Underline active={isActive} />
              </Link>
            );
          })}

          <DropdownButton
            id="company"
            label="Company"
            active={companyActive}
            openMenu={openMenu}
            onToggle={toggleMenu}
            panelClass="left-0 w-48"
          >
            <SimpleMenuLinks links={NAV_COMPANY} onNavigate={closeAll} />
          </DropdownButton>

          <DropdownButton
            id="resources"
            label="Resources"
            active={resourcesActive}
            openMenu={openMenu}
            onToggle={toggleMenu}
            panelClass="left-0 w-48"
          >
            <SimpleMenuLinks links={NAV_RESOURCES} onNavigate={closeAll} />
          </DropdownButton>

          <Link
            to="/contact"
            aria-current={path === "/contact" ? "page" : undefined}
            className={`${linkBase} ${
              path === "/contact"
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Contact
            <Underline active={path === "/contact"} />
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/contact"
            search={NAVBAR_CTA_SEARCH}
            className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Start a Project <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="text-foreground size-10 grid place-items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-border bg-background max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          <div className="px-4 py-4 flex flex-col gap-4">
            <MobileGroup title="Services">
              {SERVICE_DETAIL_PAGES.map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  onClick={closeAll}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  {s.eyebrow}
                </Link>
              ))}
              <Link
                to="/services"
                onClick={closeAll}
                className="rounded-md px-3 py-2 text-sm font-medium text-accent"
              >
                View all services
              </Link>
            </MobileGroup>
            <MobileGroup title="Explore">
              {[...NAV_TOP, { label: "Contact", href: "/contact" as const }].map((n) => (
                <MobileLink key={n.href} link={n} active={path === n.href} onNavigate={closeAll} />
              ))}
            </MobileGroup>
            <MobileGroup title="Company">
              {NAV_COMPANY.map((n) => (
                <MobileLink key={n.href} link={n} active={path === n.href} onNavigate={closeAll} />
              ))}
            </MobileGroup>
            <MobileGroup title="Resources">
              {NAV_RESOURCES.map((n) => (
                <MobileLink key={n.href} link={n} active={path === n.href} onNavigate={closeAll} />
              ))}
            </MobileGroup>
            <Link
              to="/contact"
              search={NAVBAR_CTA_SEARCH}
              onClick={closeAll}
              className="inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-3 rounded-lg bg-primary text-primary-foreground"
            >
              Start a Project <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function MobileGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
        {title}
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

function MobileLink({
  link,
  active,
  onNavigate,
}: {
  link: NavLink;
  active: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      to={link.href}
      onClick={onNavigate}
      className={`rounded-md px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-secondary text-foreground font-medium"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {link.label}
    </Link>
  );
}

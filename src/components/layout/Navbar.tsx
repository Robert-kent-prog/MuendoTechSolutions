import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, LayoutGrid, Menu, X, type LucideIcon } from "lucide-react";
import { COMPANY } from "@/lib/seo";
import {
  NAV_COMPANY,
  NAV_RESOURCES,
  NAV_TOP,
  SERVICE_NAV,
  SERVICE_NAV_ORDER,
  type NavLink,
} from "@/data/nav";
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

const tileClass =
  "group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const SERVICES_IN_ORDER = SERVICE_NAV_ORDER.flatMap((slug) => {
  const page = SERVICE_DETAIL_PAGES.find((p) => p.slug === slug);
  return page ? [{ slug, label: page.eyebrow, ...SERVICE_NAV[slug] }] : [];
});

const PROMOS: Record<
  MenuId,
  { label: string; title: string; text: string; cta: string; to: "/quote" | "/contact" | "/blog" }
> = {
  services: {
    label: "Quote guide",
    title: "Not sure what you need?",
    text: "Answer a few quick questions and get a rough KES budget band for your project.",
    cta: "Get a rough budget",
    to: "/quote",
  },
  company: {
    label: "Let's talk",
    title: "Have a project in mind?",
    text: "Send us a short brief by WhatsApp or email and we will help you scope it.",
    cta: "Contact us",
    to: "/contact",
  },
  resources: {
    label: "Latest guides",
    title: "What does it really cost?",
    text: "Plain-language cost guides for POS systems, mobile apps, web apps and M-Pesa.",
    cta: "Read the blog",
    to: "/blog",
  },
};

function Underline({ active }: { active: boolean }) {
  return (
    <span
      className={`absolute left-2.5 right-2.5 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
        active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
      }`}
    />
  );
}

function MenuTile({
  icon: Icon,
  title,
  desc,
  children,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  children?: ReactNode;
}) {
  return (
    <>
      <span className="size-10 shrink-0 rounded-lg bg-secondary text-accent grid place-items-center transition-colors group-hover:bg-background">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-foreground">{title}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground leading-snug">{desc}</span>
        {children}
      </span>
    </>
  );
}

function PromoCard({ id, onNavigate }: { id: MenuId; onNavigate: () => void }) {
  const p = PROMOS[id];
  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-white">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="relative flex h-full flex-col">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
          {p.label}
        </span>
        <h3 className="mt-3 text-xl font-bold leading-tight">{p.title}</h3>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">{p.text}</p>
        <Link
          to={p.to}
          onClick={onNavigate}
          className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          {p.cta} <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const location = useLocation();
  const path = location.pathname;
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedByHover = useRef<MenuId | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);
  const closeAll = useCallback(() => {
    cancelClose();
    openedByHover.current = null;
    setMobileOpen(false);
    setOpenMenu(null);
  }, [cancelClose]);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      openedByHover.current = null;
      setOpenMenu(null);
    }, 180);
  };
  const hoverOpen = (id: MenuId) => {
    cancelClose();
    openedByHover.current = id;
    setOpenMenu(id);
  };

  useEffect(() => {
    if (!mobileOpen && !openMenu) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const id = openMenu;
      closeAll();
      if (id) document.querySelector<HTMLElement>(`[aria-controls="menu-${id}"]`)?.focus();
    };
    const onPointerDown = (e: MouseEvent) => {
      if (openMenu && headerRef.current && !headerRef.current.contains(e.target as Node)) {
        closeAll();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
    };
  }, [mobileOpen, openMenu, closeAll]);

  useEffect(() => {
    closeAll();
  }, [path, closeAll]);

  useEffect(() => cancelClose, [cancelClose]);

  const onButtonClick = (id: MenuId) => {
    cancelClose();
    if (openedByHover.current === id) {
      // opened by hover a moment ago: a click keeps it open instead of closing it
      openedByHover.current = null;
      setOpenMenu(id);
      return;
    }
    setOpenMenu((cur) => (cur === id ? null : id));
  };

  const isIn = (links: NavLink[]) =>
    links.some((l) => path === l.href || path.startsWith(`${l.href}/`));
  const active: Record<MenuId, boolean> = {
    services: path === "/services" || path.startsWith("/services/"),
    company: isIn(NAV_COMPANY),
    resources: isIn(NAV_RESOURCES) || path.startsWith("/blog"),
  };

  const menuButton = (id: MenuId, label: string) => {
    const isOpen = openMenu === id;
    return (
      <button
        type="button"
        onClick={() => onButtonClick(id)}
        onPointerEnter={(e) => e.pointerType === "mouse" && hoverOpen(id)}
        aria-expanded={isOpen}
        aria-controls={`menu-${id}`}
        className={`${linkBase} inline-flex items-center gap-1 cursor-pointer ${
          active[id] || isOpen
            ? "text-foreground font-medium"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {label}
        <ChevronDown
          className={`size-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
        <Underline active={active[id]} />
      </button>
    );
  };

  const simpleLink = (to: NavLink["href"], label: string, isActive: boolean, exact = false) => (
    <Link
      key={to}
      to={to}
      onPointerEnter={(e) => e.pointerType === "mouse" && scheduleClose()}
      aria-current={exact ? "page" : undefined}
      className={`${linkBase} ${
        isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
      <Underline active={isActive} />
    </Link>
  );

  const panel = (id: MenuId, children: ReactNode) =>
    openMenu === id ? (
      <div
        id={`menu-${id}`}
        className="hidden lg:block absolute inset-x-0 top-full border-b border-border bg-background shadow-xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid gap-8 lg:grid-cols-[1fr_20rem]">
          {children}
          <PromoCard id={id} onNavigate={closeAll} />
        </div>
      </div>
    ) : null;

  return (
    <header
      ref={headerRef}
      onPointerEnter={cancelClose}
      onPointerLeave={(e) => e.pointerType === "mouse" && scheduleClose()}
      className="fixed top-0 inset-x-0 z-50 nav-glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2 group" aria-label={COMPANY}>
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
          {menuButton("services", "Services")}
          {NAV_TOP.map((n) =>
            simpleLink(
              n.href,
              n.label,
              path === n.href || path.startsWith(`${n.href}/`),
              path === n.href,
            ),
          )}
          {menuButton("company", "Company")}
          {menuButton("resources", "Resources")}
          {simpleLink("/contact", "Contact", path === "/contact", path === "/contact")}
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

      {panel(
        "services",
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1 content-start">
          {SERVICES_IN_ORDER.map((s) => (
            <li key={s.slug}>
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                onClick={closeAll}
                className={tileClass}
              >
                <MenuTile icon={s.icon} title={s.label} desc={s.blurb} />
              </Link>
            </li>
          ))}
          <li>
            <Link to="/services" onClick={closeAll} className={tileClass}>
              <MenuTile
                icon={LayoutGrid}
                title="View all services"
                desc="Everything we build, in one place"
              />
            </Link>
          </li>
        </ul>,
      )}
      {panel(
        "company",
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1 content-start">
          {NAV_COMPANY.map((n) => (
            <li key={n.href}>
              <Link to={n.href} onClick={closeAll} className={tileClass}>
                <MenuTile icon={n.icon} title={n.label} desc={n.desc} />
              </Link>
            </li>
          ))}
        </ul>,
      )}
      {panel(
        "resources",
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1 content-start">
          {NAV_RESOURCES.map((n) => (
            <li key={n.href}>
              <Link to={n.href} onClick={closeAll} className={tileClass}>
                <MenuTile icon={n.icon} title={n.label} desc={n.desc} />
              </Link>
            </li>
          ))}
        </ul>,
      )}

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-border bg-background max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          <div className="px-4 py-4 flex flex-col gap-4">
            <MobileGroup title="Services">
              {SERVICES_IN_ORDER.map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  onClick={closeAll}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  {s.label}
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

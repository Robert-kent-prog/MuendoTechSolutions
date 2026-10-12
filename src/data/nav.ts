import type { FileRouteTypes } from "@/routeTree.gen";

export const WHATSAPP_DISPLAY = "+254 793 587 026";
export const LOGO_SRC = "/logo.png";

export const EMPTY_CONTACT_PREFILL = {
  service: "",
  budget: "",
  message: "",
  project: "",
};

export type NavLink = { label: string; href: FileRouteTypes["to"] };

export const NAV_TOP: NavLink[] = [
  { label: "Projects", href: "/projects" },
  { label: "Pricing", href: "/pricing" },
];

export const NAV_COMPANY: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Industries", href: "/industries" },
  { label: "Tech stack", href: "/tech-stack" },
];

export const NAV_RESOURCES: NavLink[] = [
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Quote guide", href: "/quote" },
  { label: "Sitemap", href: "/sitemap" },
];

/**
 * Fill these in to show them on the contact page and footer. They stay hidden while null so the
 * site never promises hours or reply times you have not confirmed.
 */
export const BUSINESS_HOURS: { days: string; hours: string }[] | null = null;
export const RESPONSE_PROMISE: string | null = null;

import {
  BookOpen,
  Brain,
  Building2,
  Calculator,
  Factory,
  Globe,
  GraduationCap,
  HeartPulse,
  HelpCircle,
  LayoutDashboard,
  Layers,
  Map,
  ShoppingCart,
  Smartphone,
  Store,
  Truck,
  Wallet,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
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

export type NavMenuItem = NavLink & { desc: string; icon: LucideIcon };

export const NAV_TOP: NavLink[] = [
  { label: "Projects", href: "/projects" },
  { label: "Pricing", href: "/pricing" },
];

export const NAV_COMPANY: NavMenuItem[] = [
  { label: "About", href: "/about", desc: "Our story, team and approach", icon: Building2 },
  {
    label: "Process",
    href: "/process",
    desc: "How a project runs from idea to launch",
    icon: Workflow,
  },
  {
    label: "Industries",
    href: "/industries",
    desc: "Software for retail, schools, clinics, fleets and NGOs",
    icon: Factory,
  },
  { label: "Tech stack", href: "/tech-stack", desc: "What we build with, and why", icon: Layers },
];

export const NAV_RESOURCES: NavMenuItem[] = [
  {
    label: "Blog & Insights",
    href: "/blog",
    desc: "Field notes and Kenya cost guides",
    icon: BookOpen,
  },
  { label: "Quote guide", href: "/quote", desc: "Get a rough KES budget band", icon: Calculator },
  {
    label: "FAQ",
    href: "/faq",
    desc: "Pricing, timelines and ownership answered",
    icon: HelpCircle,
  },
  { label: "Sitemap", href: "/sitemap", desc: "Every page on the site, searchable", icon: Map },
];

/** Icon and one-line blurb for each service in the Services menu, keyed by service slug. */
export const SERVICE_NAV: Record<string, { icon: LucideIcon; blurb: string }> = {
  "web-applications": { icon: LayoutDashboard, blurb: "Dashboards, portals and internal systems" },
  "mobile-apps": { icon: Smartphone, blurb: "Android and iOS apps with a secure backend" },
  "ai-integration": { icon: Brain, blurb: "Assistants, document AI and automation" },
  "business-websites": { icon: Globe, blurb: "Fast, SEO-ready company websites" },
  "ecommerce-websites": { icon: ShoppingCart, blurb: "Online shops with M-Pesa checkout" },
  "pos-systems": { icon: Store, blurb: "Stock, sales and reports for shops" },
  "mpesa-integrations": { icon: Wallet, blurb: "STK Push, callbacks and reconciliation" },
  "website-maintenance": { icon: Wrench, blurb: "Updates, backups and monitoring" },
  "school-management-systems": {
    icon: GraduationCap,
    blurb: "Records, fees, attendance and exams",
  },
  "health-and-clinic-systems": {
    icon: HeartPulse,
    blurb: "Patient records and vaccination tracking",
  },
  "fleet-management-systems": { icon: Truck, blurb: "Vehicles, trips, fuel and maintenance" },
};

/** Order the Services menu is shown in. */
export const SERVICE_NAV_ORDER = Object.keys(SERVICE_NAV);

/**
 * Fill these in to show them on the contact page and footer. They stay hidden while null so the
 * site never promises hours or reply times you have not confirmed.
 */
export const BUSINESS_HOURS: { days: string; hours: string }[] | null = null;
export const RESPONSE_PROMISE: string | null = null;

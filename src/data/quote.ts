import { BUDGET_OPTIONS } from "@/data/budget";

/**
 * Rough-guide inputs for the /quote calculator. Edit the numbers here to tune the guide;
 * `band` values are indexes into BUDGET_OPTIONS (0 = "Under KES 25,000" ... 5 = "KES 1,000,000+").
 * The result is only ever a band from that list, never an exact price.
 */
export interface QuoteService {
  id: string;
  label: string;
  contactService: string;
  hint: string;
  band: number;
}

export interface QuoteAddon {
  id: string;
  label: string;
  hint: string;
}

export const QUOTE_SERVICES: QuoteService[] = [
  {
    id: "website",
    label: "Business website",
    contactService: "Business Website",
    hint: "Company site with service pages, SEO basics and enquiry paths.",
    band: 1,
  },
  {
    id: "ecommerce",
    label: "E-commerce website",
    contactService: "E-commerce Website",
    hint: "Online shop with catalogue, cart and checkout.",
    band: 2,
  },
  {
    id: "webapp",
    label: "Web app or dashboard",
    contactService: "Web Application",
    hint: "Logins, records, reports and workflows for a team or customers.",
    band: 3,
  },
  {
    id: "mobile",
    label: "Mobile app",
    contactService: "Mobile App",
    hint: "Android and iOS app with a backend behind it.",
    band: 3,
  },
  {
    id: "pos",
    label: "POS or retail system",
    contactService: "Point of Sale / Retail System",
    hint: "Stock, sales, receipts, expenses and owner reports.",
    band: 2,
  },
  {
    id: "ai",
    label: "AI integration",
    contactService: "AI Integration / AI System",
    hint: "AI features added to a system you already run, or a new one.",
    band: 2,
  },
];

export const QUOTE_ADDONS: QuoteAddon[] = [
  { id: "mpesa", label: "M-Pesa payments", hint: "STK Push, callbacks and reconciliation." },
  {
    id: "roles",
    label: "User roles and approvals",
    hint: "Admin, staff and customer access levels.",
  },
  { id: "reports", label: "Reports and exports", hint: "Dashboards, PDF or Excel output." },
  {
    id: "integrations",
    label: "Third-party integrations",
    hint: "SMS, email, accounting or other APIs.",
  },
  {
    id: "migration",
    label: "Data migration",
    hint: "Moving records from spreadsheets or an old system.",
  },
];

export const TIMELINES = [
  "As soon as possible",
  "Within 1 to 2 months",
  "Within 3 months",
  "Flexible",
] as const;

export interface QuoteOption {
  id: string;
  label: string;
  hint: string;
  /** Points added to the guide. Every POINTS_PER_BAND points move the band up one step. */
  points: number;
}

export const QUOTE_SIZES: QuoteOption[] = [
  {
    id: "small",
    label: "Small",
    hint: "A focused first version or a single main flow.",
    points: 0,
  },
  { id: "medium", label: "Medium", hint: "Several features working together.", points: 1 },
  {
    id: "large",
    label: "Large",
    hint: "Many roles, modules or a high-traffic platform.",
    points: 3,
  },
];

export const QUOTE_DESIGNS: QuoteOption[] = [
  {
    id: "template",
    label: "Template-based",
    hint: "Clean, polished, from a proven layout.",
    points: 0,
  },
  { id: "custom", label: "Custom design", hint: "A bespoke look for your brand.", points: 1 },
  { id: "premium", label: "Premium UX", hint: "User research, prototypes and testing.", points: 3 },
];

export const QUOTE_SUPPORT: QuoteOption[] = [
  {
    id: "launch",
    label: "Launch support only",
    hint: "Help at go-live, then you take over.",
    points: 0,
  },
  {
    id: "care3",
    label: "Care plan, 3 months",
    hint: "Monitoring, fixes and small updates.",
    points: 1,
  },
  {
    id: "care12",
    label: "Care plan, 12 months",
    hint: "Managed support and maintenance for a year.",
    points: 2,
  },
];

export const DEFAULT_SIZE = "medium";
export const DEFAULT_DESIGN = "template";
export const DEFAULT_SUPPORT = "launch";

/** Every three points move the guide up one band. */
export const POINTS_PER_BAND = 3;

export interface QuoteSelection {
  serviceId: string;
  addonCount: number;
  sizeId: string;
  designId: string;
  supportId: string;
}

function pointsFor(options: QuoteOption[], id: string) {
  return options.find((o) => o.id === id)?.points ?? 0;
}

export function estimateBand(sel: QuoteSelection): string | null {
  const service = QUOTE_SERVICES.find((s) => s.id === sel.serviceId);
  if (!service) return null;
  const points =
    sel.addonCount +
    pointsFor(QUOTE_SIZES, sel.sizeId) +
    pointsFor(QUOTE_DESIGNS, sel.designId) +
    pointsFor(QUOTE_SUPPORT, sel.supportId);
  const lastRealBand = BUDGET_OPTIONS.length - 2; // exclude "Not sure yet"
  const index = Math.min(service.band + Math.floor(points / POINTS_PER_BAND), lastRealBand);
  return BUDGET_OPTIONS[index];
}

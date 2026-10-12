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
  { id: "maintenance", label: "Ongoing support", hint: "Monthly updates, fixes and monitoring." },
];

export const TIMELINES = [
  "As soon as possible",
  "Within 1 to 2 months",
  "Within 3 months",
  "Flexible",
] as const;

/** Every three add-ons move the guide up one band. */
export const ADDONS_PER_BAND = 3;

export function estimateBand(serviceId: string, addonCount: number): string | null {
  const service = QUOTE_SERVICES.find((s) => s.id === serviceId);
  if (!service) return null;
  const lastRealBand = BUDGET_OPTIONS.length - 2; // exclude "Not sure yet"
  const index = Math.min(service.band + Math.floor(addonCount / ADDONS_PER_BAND), lastRealBand);
  return BUDGET_OPTIONS[index];
}

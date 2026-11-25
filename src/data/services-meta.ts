export interface ServiceMeta {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  price: string;
}

export const SERVICE_META: ServiceMeta[] = [
  {
    slug: "business-websites",
    title: "Business Website Design and Development in Kenya",
    eyebrow: "Business Websites",
    summary:
      "Fast, responsive company websites for Kenyan SMEs that need trust, clear service pages, WhatsApp-ready enquiries, SEO basics, and a professional first impression.",
    price: "Starts from KES 25,000",
  },
  {
    slug: "ecommerce-websites",
    title: "E-Commerce Website Development for Kenyan Online Shops",
    eyebrow: "E-Commerce",
    summary:
      "Online shop builds for businesses that need product catalogs, carts, checkout planning, customer details, admin controls, and M-Pesa-ready payment workflows.",
    price: "Scoped after catalog and checkout discovery",
  },
  {
    slug: "pos-systems",
    title: "POS System Development for Kenyan Retail Businesses",
    eyebrow: "POS Systems",
    summary:
      "Custom point-of-sale and retail systems for shops that need cleaner sales, stock, expenses, staff roles, receipts, and daily reports.",
    price: "Scoped after workflow discovery",
  },
  {
    slug: "website-maintenance",
    title: "Website Maintenance Services for Kenyan Businesses",
    eyebrow: "Maintenance",
    summary:
      "Ongoing website support for businesses that need content updates, form checks, bug fixes, uptime reviews, SEO edits, backups, and performance improvements.",
    price: "Monthly retainer or task-based support",
  },
  {
    slug: "mpesa-integrations",
    title: "M-Pesa Daraja Integration for Kenyan Business Systems",
    eyebrow: "M-Pesa Integrations",
    summary:
      "Payment integrations for web apps, mobile apps, portals, POS systems, and dashboards that need STK Push, callbacks, transaction status, and reconciliation.",
    price: "Scoped by payment flow and reconciliation needs",
  },
  {
    slug: "web-applications",
    title: "Custom Web Application Development in Kenya",
    eyebrow: "Web Applications",
    summary:
      "Dashboards, portals and internal systems for Kenyan businesses that have outgrown spreadsheets: logins, roles, records, reports and workflows built around how your team actually works.",
    price: "Typical range KES 150,000+",
  },
  {
    slug: "mobile-apps",
    title: "Mobile App Development in Kenya (Android and iOS)",
    eyebrow: "Mobile Apps",
    summary:
      "Cross-platform Android and iOS apps with a secure backend, built for the way Kenyan users actually pay, chat and find services.",
    price: "Scoped after discovery",
  },
  {
    slug: "ai-integration",
    title: "AI Integration for Business Software in Kenya",
    eyebrow: "AI Integration",
    summary:
      "Practical AI features added to systems you already run: document understanding, customer support assistants, smart search and workflow automation, with clear limits and human review where it matters.",
    price: "Scoped after discovery",
  },
  {
    slug: "school-management-systems",
    title: "School Management System Development in Kenya",
    eyebrow: "School Systems",
    summary:
      "Student records, fees, attendance, exams and reports for Kenyan schools and colleges, built in stages so staff can adopt the system without disrupting the term.",
    price: "Scoped after discovery",
  },
  {
    slug: "health-and-clinic-systems",
    title: "Clinic and Health Records Software in Kenya",
    eyebrow: "Health and Clinic Systems",
    summary:
      "Patient records, vaccination schedules, appointment follow-ups and stock visibility for clinics and health teams that want to move away from fragile paper processes.",
    price: "Scoped after discovery",
  },
  {
    slug: "fleet-management-systems",
    title: "Fleet Management Software for Kenyan Logistics Teams",
    eyebrow: "Fleet Management",
    summary:
      "Vehicle and driver records, fuel, trips, maintenance schedules and expense reports in one platform, so managers see costs and risks before they become problems.",
    price: "Scoped after discovery",
  },
];

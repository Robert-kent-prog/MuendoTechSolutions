export interface ProjectCaseStudyMeta {
  slug: string;
  title: string;
  tag: string;
  summary: string;
  metrics: string[];
}

export const PROJECT_CASE_STUDY_META: ProjectCaseStudyMeta[] = [
  {
    slug: "retail-bookkeeping-platform",
    title: "Retail Bookkeeping Platform",
    tag: "FinTech / Retail",
    summary:
      "A bookkeeping platform that replaced notebook and spreadsheet tracking with role-based sales, expense, and profit visibility for a Kenyan retail business.",
    metrics: ["KES reporting", "3 user roles", "Daily profit view"],
  },
  {
    slug: "fleet-management-system",
    title: "Fleet Management System",
    tag: "Logistics / Fleet",
    summary:
      "A fleet operations platform for tracking vehicles, drivers, maintenance schedules, fuel, trips, and expense reporting.",
    metrics: ["Vehicle records", "Trip logs", "Maintenance alerts"],
  },
  {
    slug: "vaccination-tracker-system",
    title: "Vaccination Tracker System",
    tag: "HealthTech / Tracking",
    summary:
      "A health-record tracker for vaccination schedules, patient records, appointment follow-ups, stock visibility, dose history, and reports.",
    metrics: ["Dose history", "Stock visibility", "Admin reports"],
  },
  {
    slug: "digital-file-document-management-system",
    title: "Digital File & Document Management System",
    tag: "DocTech / Compliance",
    summary:
      "A secure digital filing system for KRA documents, certificates, policies, licences, permits, expiry reminders, and role-based access.",
    metrics: ["Expiry alerts", "Secure storage", "Role-based access"],
  },
  {
    slug: "linkfy-service-marketplace-app",
    title: "Linkfy Service Marketplace App",
    tag: "Mobile / Marketplace",
    summary:
      "A mobile marketplace connecting customers with verified service providers across Kenya with chat, calls, maps, ratings, and M-Pesa flows.",
    metrics: ["Mobile-first", "Provider matching", "M-Pesa ready"],
  },
];

import {
  Store,
  GraduationCap,
  Rocket,
  Wrench,
  Building2,
  Globe,
  Briefcase,
  Users,
  Workflow,
  Truck,
  type LucideIcon,
} from "lucide-react";

export interface IndustryItem {
  icon: LucideIcon;
  label: string;
}

export interface IndustrySolutionItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  outcomes: string[];
}

export const INDUSTRIES: IndustryItem[] = [
  { icon: Store, label: "Retail Businesses" },
  { icon: GraduationCap, label: "Schools & Colleges" },
  { icon: Rocket, label: "Startups" },
  { icon: Wrench, label: "Service Providers" },
  { icon: Building2, label: "SMEs" },
  { icon: Globe, label: "E-Commerce" },
  { icon: Briefcase, label: "Professional Firms" },
  { icon: Users, label: "Community Orgs" },
  { icon: Workflow, label: "Internal Ops Teams" },
];

export const INDUSTRY_SOLUTIONS: IndustrySolutionItem[] = [
  {
    icon: Store,
    title: "Retail and POS",
    desc: "Sales, stock, receipts, expenses, staff roles, M-Pesa records, and daily reports for shops and service counters.",
    outcomes: ["Cleaner sales records", "Stock visibility", "Owner reports"],
  },
  {
    icon: GraduationCap,
    title: "Schools and Colleges",
    desc: "Student records, fees, attendance, exams, portals, document workflows, and parent or staff communication.",
    outcomes: ["Student records", "Exam workflows", "Admin visibility"],
  },
  {
    icon: Truck,
    title: "Logistics and Fleet",
    desc: "Vehicles, drivers, fuel, trips, maintenance, expenses, documents, and operational reporting for transport teams.",
    outcomes: ["Trip logs", "Maintenance tracking", "Cost control"],
  },
  {
    icon: Building2,
    title: "Clinics and Health Teams",
    desc: "Patient records, vaccination schedules, stock visibility, appointments, follow-ups, and reporting dashboards.",
    outcomes: ["Follow-up tracking", "Dose history", "Stock reports"],
  },
  {
    icon: Users,
    title: "NGOs and Community Teams",
    desc: "Beneficiary records, donor reporting, field data, document tracking, dashboards, and approval workflows.",
    outcomes: ["Field records", "Donor reports", "Workflow control"],
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    desc: "Websites, CRMs, booking flows, client portals, document workflows, billing, and local SEO support.",
    outcomes: ["Lead capture", "Client records", "Service clarity"],
  },
];

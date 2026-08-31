export interface TeamMember {
  initials: string;
  name: string;
  role: string;
  bio: string;
  focus: string[];
}

export const TEAM: TeamMember[] = [
  {
    initials: "RM",
    name: "Robert Muendo",
    role: "Founder & Lead Engineer",
    bio: "Shipping production code since 2023. Leads architecture, backend systems, deployment, and client delivery across retail bookkeeping, fleet operations, document workflows, AI integrations, and agency websites.",
    focus: ["Architecture", "Backend APIs", "Client delivery"],
  },
  {
    initials: "CK",
    name: "Cynthia Kavetha",
    role: "Product & Frontend Engineer",
    bio: "Product-focused engineer shaping clean application interfaces, customer journeys, dashboards, forms, and mobile-ready experiences that make business systems easier to use.",
    focus: ["Frontend UX", "Product flows", "Dashboards"],
  },
  {
    initials: "DN",
    name: "Daniel Nzioka",
    role: "Backend & Integrations Engineer",
    bio: "Backend engineer focused on reliable APIs, payment integrations, notifications, queues, database design, deployment workflows, and the infrastructure behind production systems.",
    focus: ["Backend APIs", "Integrations", "Infrastructure"],
  },
];

export const VALUES = [
  "Reliability",
  "Clean architecture",
  "Security-first development",
  "Practical delivery",
  "Long-term maintainability",
  "User-friendly design",
  "Clear communication",
];

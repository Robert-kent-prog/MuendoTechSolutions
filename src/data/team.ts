export interface TeamMember {
  initials: string;
  name: string;
  role: string;
  bio: string;
  focus: string[];
  experience?: string;
  featuredQuote?: string;
}

export const TEAM: TeamMember[] = [
  {
    initials: "RM",
    name: "Robert Muendo",
    role: "Founder & Lead Software Architect",
    experience: "Lead Engineer · Production Systems Since 2023",
    bio: "Software architect and engineering lead directing overall technical strategy, client solutions, and core application development at Muendo Tech Solutions. Specializes in full-stack web and mobile architecture, backend systems (Node.js, Python/Django, Spring Boot), database design, M-Pesa payment gateways, and cloud deployment pipelines. Works directly with business founders and operations leads to translate complex requirements into scalable, production-ready software.",
    featuredQuote: "Software should be simple for users, resilient in production, and built to solve real business bottlenecks.",
    focus: [
      "Full-Stack Architecture",
      "Systems Engineering",
      "M-Pesa & Payment APIs",
      "Technical Leadership",
      "Database Design",
    ],
  },
  {
    initials: "CK",
    name: "Cynthia Kavetha",
    role: "Lead Product & Frontend UI/UX Engineer",
    experience: "Product & UI/UX Specialist",
    bio: "Frontend specialist and product engineer dedicated to building intuitive, accessible, and high-conversion visual interfaces. Expert in React 19, TypeScript, Tailwind CSS, responsive design systems, customer portals, interactive dashboards, and mobile-first user journeys. Ensures every web application and internal tool is fast, accessible, and seamless for non-technical users.",
    featuredQuote: "Great UI design is invisible — it lets business users accomplish tasks without friction or guesswork.",
    focus: [
      "Design Systems & UI/UX",
      "React & Frontend Architecture",
      "Interactive Dashboards",
      "Accessibility (WCAG AA)",
    ],
  },
  {
    initials: "CM",
    name: "Caleb Mumo",
    role: "Backend & Systems Infrastructure Engineer",
    experience: "Backend & Integrations Lead",
    bio: "Systems and backend infrastructure engineer focusing on high-performance RESTful APIs, microservices, database optimization (PostgreSQL, MongoDB, MySQL), automated payment callback handlers, background queues, and Linux VPS cloud deployments. Ensures backend services remain rock-solid, secure, and ready for high transaction volumes.",
    featuredQuote: "Reliable backends are built on strict validation, zero-downtime deployments, and defensive error logging.",
    focus: [
      "Backend APIs & Microservices",
      "M-Pesa Daraja Callbacks",
      "Database Architecture & SQL",
      "DevOps & VPS Infrastructure",
    ],
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

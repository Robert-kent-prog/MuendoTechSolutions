export interface ProjectItem {
  tag: string;
  title: string;
  desc: string;
  stack: string[];
}

export interface ProjectCaseStudy {
  slug: string;
  title: string;
  tag: string;
  client: string;
  summary: string;
  problem: string;
  solution: string;
  outcome: string;
  metrics: string[];
  features: string[];
  stack: string[];
}

export const PROJECTS: ProjectItem[] = [
  {
    tag: "Mobile / Marketplace",
    title: "Linkfy — Service Marketplace App",
    desc: "A mobile application that connects service seekers with verified service providers across Kenya — plumbing, electrical, laundry, cleaning, repairs and more. Includes in-app chat, calls, location maps, ratings, and M-Pesa Daraja payments.",
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "M-Pesa Daraja",
      "Maps",
      "JWT",
    ],
  },
  {
    tag: "Logistics / Fleet",
    title: "Fleet Management System",
    desc: "Vehicle and fleet management platform for tracking vehicles, drivers, fuel, maintenance schedules, trip logs, and expense reporting — built for Kenyan transport and logistics operators.",
    stack: ["React", "Vite", "Node.js", "Express", "MongoDB", "Maps", "JWT", "Reports"],
  },
  {
    tag: "DocTech / Compliance",
    title: "Digital File & Document Management System",
    desc: "Custom digital filing system built for a Kenyan client to organise company documents — KRA filings, fire safety certificates, insurance policies, licences and permits — with expiry reminders, role-based access, and secure storage.",
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Cloud Storage",
      "Expiry Alerts",
      "RBAC",
    ],
  },
  {
    tag: "AI / Automation",
    title: "AI Integrations & Custom AI Systems",
    desc: "Built and integrated AI features into business platforms — including AI chat assistants, document understanding, smart search, and workflow automation powered by LLMs (OpenAI, Gemini).",
    stack: ["OpenAI", "Gemini", "LangChain", "Node.js", "Python", "FastAPI", "RAG", "Vector DB"],
  },
  {
    tag: "International / Agency Web",
    title: "Xelvora — Digital Agency Website",
    desc: "Built Xelvora's corporate website for a Pakistan-based digital agency offering websites, web apps, mobile products, AI systems, SEO, digital marketing, graphic design, and branding. The site includes About, Services, Products, Portfolio, Blogs, Contact, Book Call flows, launch metrics, and positioning for startups, SMEs, agencies, and enterprise teams.",
    stack: ["React", "Vite", "Tailwind", "Responsive UI", "SEO", "Branding", "Blog Pages"],
  },
  {
    tag: "Mobility / MERN",
    title: "Carpool & Ride-Share Platform",
    desc: "Ride-share web platform that lets private car owners register as drivers and offset fuel costs by carrying passengers travelling in the same direction — with route matching, booking, ratings, and secure auth.",
    stack: ["MongoDB", "Express", "React", "Node.js", "JWT", "Route Matching", "Ratings"],
  },
  {
    tag: "Political / Web",
    title: "Chama Cha Uzalendo (CCU) — Party Website",
    desc: "Designed and built the official-style web presence for Chama Cha Uzalendo (CCU), a registered Kenyan political party founded in 2004 — featuring party history, leadership, news updates, and member engagement sections.",
    stack: ["React", "Vite", "Tailwind", "Responsive UI", "SEO", "Content Sections"],
  },
  {
    tag: "HealthTech / Tracking",
    title: "Vaccination Tracker System",
    desc: "Health-record tracking system for managing vaccination schedules, patient records, appointment follow-ups, vaccine stock visibility, dose history, and admin reporting for clinic-style workflows.",
    stack: [
      "Python",
      "Django",
      "FastAPI",
      "PostgreSQL",
      "SQLite",
      "Dashboards",
      "Reports",
      "Admin Roles",
    ],
  },
  {
    tag: "EdTech / Security",
    title: "Exam Administration Verification System",
    desc: "Secure university exam-card and attendance verification platform with eligibility checks, barcode verification, JWT role access, offline-first attendance capture, audit logging, PDF reports, Redis caching, and MongoDB optimization.",
    stack: ["MongoDB", "Node.js", "Express", "JWT", "Redis", "PDF", "Barcode", "Audit Logs"],
  },
  {
    tag: "FinTech / Retail",
    title: "Retail Bookkeeping Platform",
    desc: "Full-stack bookkeeping system for a Machakos retail business with admin, accountant, and sales workflows — KES-based reporting, daily sales, expenses, and profit tracking.",
    stack: ["React", "Vite", "Express", "MongoDB", "Zod", "Role Access", "KES Reports"],
  },
  {
    tag: "Education",
    title: "Institutional Website",
    desc: "College site with course information, student access, admin updates, authentication flows, responsive UI, and CRUD features.",
    stack: ["React", "Node.js", "Express", "MySQL", "Auth", "CRUD", "Responsive UI"],
  },
  {
    tag: "E-Commerce",
    title: "E-Commerce Platform",
    desc: "Boutique commerce platform with product uploads, category management, shopping cart, customer details, and KES-priced catalog browsing.",
    stack: ["React", "Express", "MongoDB", "Cart", "Product Admin", "KES Pricing", "Checkout"],
  },
];

export const PROJECT_CASE_STUDIES: ProjectCaseStudy[] = [
  {
    slug: "retail-bookkeeping-platform",
    title: "Retail Bookkeeping Platform",
    tag: "FinTech / Retail",
    client: "Machakos Retail SME",
    summary:
      "A bookkeeping platform that replaced notebook and spreadsheet tracking with role-based sales, expense, and profit visibility for a Kenyan retail business.",
    problem:
      "The business needed a clearer way to track daily sales, expenses, and profit without waiting for manual spreadsheet consolidation or scattered paper records.",
    solution:
      "We built a full-stack bookkeeping system with admin, accountant, and sales workflows, KES-based reporting, protected routes, validation, and practical dashboards.",
    outcome:
      "The owner can now review daily sales, expenses, and profit from one place, while staff work through cleaner role-based workflows.",
    metrics: ["KES reporting", "3 user roles", "Daily profit view"],
    features: [
      "Sales and expense capture",
      "Admin, accountant, and sales workflows",
      "KES-based reports",
      "Role-based access",
      "Validation and protected routes",
      "Dashboard summaries",
    ],
    stack: ["React", "Vite", "Express", "MongoDB", "Zod", "Role Access", "KES Reports"],
  },
  {
    slug: "fleet-management-system",
    title: "Fleet Management System",
    tag: "Logistics / Fleet",
    client: "Kenyan logistics operator",
    summary:
      "A fleet operations platform for tracking vehicles, drivers, maintenance schedules, fuel, trips, and expense reporting.",
    problem:
      "Fleet records were split across manual logs and separate documents, making it hard to see vehicle status, maintenance risk, and operating costs quickly.",
    solution:
      "We designed a web platform with vehicle records, driver assignment, fuel entries, trip logs, maintenance schedules, expense reporting, and map-ready structures.",
    outcome:
      "Managers gained a clearer operating picture across vehicles, drivers, costs, and maintenance events.",
    metrics: ["Vehicle records", "Trip logs", "Maintenance alerts"],
    features: [
      "Vehicle and driver records",
      "Fuel and maintenance tracking",
      "Trip logs and expense reports",
      "Document visibility",
      "Map-ready workflow planning",
      "Admin dashboard",
    ],
    stack: ["React", "Vite", "Node.js", "Express", "MongoDB", "Maps", "JWT", "Reports"],
  },
  {
    slug: "vaccination-tracker-system",
    title: "Vaccination Tracker System",
    tag: "HealthTech / Tracking",
    client: "Clinic-style health workflow",
    summary:
      "A health-record tracker for vaccination schedules, patient records, appointment follow-ups, stock visibility, dose history, and reports.",
    problem:
      "Clinic teams need reliable visibility into patient schedules, vaccine history, appointment follow-ups, and stock without depending on fragile paper processes.",
    solution:
      "We shaped a tracker around patient records, dose schedules, appointment follow-ups, vaccine stock visibility, admin roles, and reporting workflows.",
    outcome:
      "The system gives health teams clearer follow-up visibility and a cleaner way to manage vaccination records.",
    metrics: ["Dose history", "Stock visibility", "Admin reports"],
    features: [
      "Patient and dose records",
      "Appointment follow-ups",
      "Vaccine stock visibility",
      "Admin roles",
      "Reports and dashboards",
      "Clinic-style workflows",
    ],
    stack: [
      "Python",
      "Django",
      "FastAPI",
      "PostgreSQL",
      "SQLite",
      "Dashboards",
      "Reports",
      "Admin Roles",
    ],
  },
  {
    slug: "digital-file-document-management-system",
    title: "Digital File & Document Management System",
    tag: "DocTech / Compliance",
    client: "Kenyan business client",
    summary:
      "A secure digital filing system for KRA documents, certificates, policies, licences, permits, expiry reminders, and role-based access.",
    problem:
      "Important company documents were difficult to organize, monitor, and renew before expiry, creating compliance and operational risk.",
    solution:
      "We built a digital filing workflow with secure storage, categories, expiry reminders, role-based access, and document visibility.",
    outcome:
      "The business gained a more dependable way to track critical documents and reduce expiry surprises.",
    metrics: ["Expiry alerts", "Secure storage", "Role-based access"],
    features: [
      "Document categories",
      "Expiry reminders",
      "Role-based access",
      "Secure file storage",
      "Searchable records",
      "Compliance-oriented dashboard",
    ],
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Cloud Storage",
      "Expiry Alerts",
      "RBAC",
    ],
  },
  {
    slug: "linkfy-service-marketplace-app",
    title: "Linkfy Service Marketplace App",
    tag: "Mobile / Marketplace",
    client: "Service marketplace product",
    summary:
      "A mobile marketplace connecting customers with verified service providers across Kenya with chat, calls, maps, ratings, and M-Pesa flows.",
    problem:
      "Customers needed a cleaner way to find trusted service providers, while providers needed a digital channel for jobs, communication, and payments.",
    solution:
      "We built a mobile-first marketplace architecture with provider profiles, customer flows, chat/call actions, location maps, ratings, and M-Pesa Daraja planning.",
    outcome:
      "The product creates a structured flow for service discovery, contact, booking, trust, and payment readiness.",
    metrics: ["Mobile-first", "Provider matching", "M-Pesa ready"],
    features: [
      "Provider and customer flows",
      "In-app communication paths",
      "Maps and location support",
      "Ratings and trust signals",
      "JWT authentication",
      "M-Pesa Daraja payment planning",
    ],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "M-Pesa Daraja",
      "Maps",
      "JWT",
    ],
  },
];

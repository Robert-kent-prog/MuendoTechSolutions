import {
  Globe,
  Smartphone,
  Server,
  Database,
  LayoutDashboard,
  Cpu,
  Code2,
  Building2,
  Store,
  Briefcase,
  Workflow,
  Wrench,
  Brain,
  Rocket,
  type LucideIcon,
} from "lucide-react";

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  items: string[];
}

export interface WebPresenceService {
  title: string;
  desc: string;
}

export interface ServicePackage {
  icon: LucideIcon;
  title: string;
  price: string;
  desc: string;
  bestFor: string;
  items: string[];
  cta: string;
}

export interface ServiceDetailPage {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  bestFor: string;
  price: string;
  outcomes: string[];
  features: string[];
  process: string[];
  proof: string;
}

export interface WhyItem {
  title: string;
  desc: string;
}

export interface ProcessItem {
  n: string;
  title: string;
  desc: string;
}

export const HERO_HIGHLIGHTS = [
  "Web Application Development",
  "Mobile App Development",
  "Backend API Development",
  "Business Management Systems",
  "AI Integrations & AI Systems",
  "Deployment & Maintenance",
];

export const SERVICES: ServiceItem[] = [
  {
    icon: Globe,
    title: "Web Application Development",
    desc: "Responsive, fast, and scalable web applications for businesses, institutions, and startups.",
    items: [
      "Admin dashboards",
      "Customer portals",
      "Booking platforms",
      "Business management systems",
      "E-commerce systems",
      "SaaS platforms",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Android-ready and cross-platform mobile apps with clean flows and reliable backend integration.",
    items: [
      "Service marketplace apps",
      "Fleet & logistics apps",
      "Business mobile tools",
      "Customer self-service apps",
      "Field operation apps",
    ],
  },
  {
    icon: Server,
    title: "Backend API Development",
    desc: "Secure and maintainable backend systems that power web and mobile applications.",
    items: [
      "REST APIs",
      "Authentication systems",
      "Role-based access control",
      "M-Pesa & payment integrations",
      "File uploads",
      "Notification systems",
    ],
  },
  {
    icon: Briefcase,
    title: "Business Management Systems",
    desc: "Custom systems that help Kenyan companies manage daily operations more efficiently.",
    items: [
      "Inventory systems",
      "Bookkeeping platforms",
      "Sales management",
      "Staff management",
      "Attendance systems",
      "School/exam platforms",
    ],
  },
  {
    icon: Store,
    title: "POS & Retail Systems",
    desc: "Point of sale and retail operations software for shops, supermarkets, pharmacies, and SMEs.",
    items: [
      "Point of sale systems",
      "Inventory & stock control",
      "Barcode sales workflows",
      "Receipts & invoices",
      "Supplier management",
      "Daily sales reports",
    ],
  },
  {
    icon: Cpu,
    title: "Desktop Application Development",
    desc: "Offline-capable desktop software for internal workflows, records, reporting, and local business operations.",
    items: [
      "Windows desktop apps",
      "Offline-first tools",
      "Local database apps",
      "Printer integrations",
      "File processing tools",
      "Admin utility software",
    ],
  },
  {
    icon: Building2,
    title: "Industry-Specific Systems",
    desc: "Purpose-built applications for schools, clinics, retail teams, logistics operators, and service businesses.",
    items: [
      "Clinic & vaccination systems",
      "School management systems",
      "HR & payroll tools",
      "CRM platforms",
      "Fleet operations systems",
      "Document tracking systems",
    ],
  },
  {
    icon: Workflow,
    title: "Billing, CRM & Automation",
    desc: "Systems that help teams track customers, subscriptions, invoices, support, and recurring workflows.",
    items: [
      "Customer relationship management",
      "Subscription billing",
      "Invoice management",
      "SMS & email automation",
      "Support ticket workflows",
      "Approval workflows",
    ],
  },
  {
    icon: Brain,
    title: "AI Integrations & AI Systems",
    desc: "We integrate AI into existing platforms and build AI-powered systems tailored to business workflows.",
    items: [
      "AI chatbots & assistants",
      "Document & KYC AI processing",
      "AI-powered search",
      "Recommendation engines",
      "Workflow automation with AI",
      "LLM API integrations (OpenAI, Gemini)",
    ],
  },
  {
    icon: Database,
    title: "Database Design & Integration",
    desc: "Reliable database structures using SQL and NoSQL technologies tailored to product needs.",
    items: [
      "MongoDB systems",
      "MySQL databases",
      "Data modeling",
      "Search optimization",
      "Reporting structures",
      "Backup planning",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "UI/UX & Frontend Development",
    desc: "Clean, responsive interfaces that work smoothly across phones, tablets, and desktops.",
    items: [
      "Landing pages",
      "Dashboards",
      "Client portals",
      "Admin panels",
      "Mobile-first interfaces",
    ],
  },
  {
    icon: Rocket,
    title: "Deployment & Maintenance",
    desc: "Deploy, monitor, update, and maintain software so it remains reliable after launch.",
    items: [
      "Linux server deployment",
      "cPanel deployment",
      "API hosting",
      "Bug fixing",
      "Feature updates",
      "Performance optimization",
    ],
  },
  {
    icon: Code2,
    title: "PHP, Laravel & Legacy Support",
    desc: "Development and improvement work for Laravel, PHP, and existing business systems that need reliable updates.",
    items: [
      "Laravel dashboards",
      "PHP website upgrades",
      "API integrations",
      "Bug fixing",
      "Database migrations",
      "Feature extensions",
    ],
  },
];

export const WEB_PRESENCE_SERVICES: WebPresenceService[] = [
  {
    title: "Business Websites",
    desc: "Clean company websites for SMEs, consultants, schools, clinics, agencies, salons, and service providers.",
  },
  {
    title: "Landing Pages",
    desc: "Focused pages for campaigns, product launches, lead capture, and WhatsApp-first conversion.",
  },
  {
    title: "E-Commerce Websites",
    desc: "Product catalogs, carts, customer details, checkout flows, M-Pesa-ready planning, and admin controls.",
  },
  {
    title: "SEO Setup",
    desc: "Page titles, descriptions, sitemap, local search structure, headings, internal links, and performance basics.",
  },
  {
    title: "Google Business Profile",
    desc: "Local visibility support so customers can find your services, location, phone, photos, and reviews faster.",
  },
  {
    title: "Business Email Setup",
    desc: "Professional email planning and setup guidance for teams that need credible brand communication.",
  },
  {
    title: "Website Redesigns",
    desc: "Refresh outdated websites, fix weak mobile layouts, improve content structure, and sharpen calls to action.",
  },
  {
    title: "Website Maintenance",
    desc: "Ongoing updates, form checks, backups, technical fixes, SEO edits, and performance improvements.",
  },
];

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    icon: Globe,
    title: "Business Website Launch",
    price: "Starts from KES 25,000",
    desc: "For businesses that need a credible online presence, clear service pages, fast mobile performance, and direct enquiry paths.",
    bestFor: "SMEs, consultants, schools, clinics, salons, agencies, and local service providers.",
    items: [
      "Responsive website pages",
      "Basic SEO and analytics setup",
      "WhatsApp and contact CTAs",
      "Deployment and launch support",
    ],
    cta: "Plan a Website",
  },
  {
    icon: LayoutDashboard,
    title: "Web App / Dashboard",
    price: "Typical range KES 150,000+",
    desc: "For teams that need logins, records, dashboards, reports, roles, approvals, payments, or workflow automation.",
    bestFor: "Internal systems, portals, admin dashboards, and customer self-service platforms.",
    items: [
      "Authentication and roles",
      "Database design",
      "Admin dashboard workflows",
      "Reports, exports, and deployment",
    ],
    cta: "Scope an App",
  },
  {
    icon: Store,
    title: "POS and Retail System",
    price: "Scoped after discovery",
    desc: "For retail teams moving from notebooks and spreadsheets into cleaner stock, sales, expense, and staff workflows.",
    bestFor: "Shops, pharmacies, mini marts, hardware stores, boutiques, and service counters.",
    items: [
      "Products, stock, and sales",
      "Receipts, expenses, and reports",
      "Staff roles and admin controls",
      "Optional M-Pesa planning",
    ],
    cta: "Build Retail Tools",
  },
  {
    icon: Wrench,
    title: "Maintenance and Growth",
    price: "Monthly retainer",
    desc: "For businesses that need consistent updates, bug fixes, uptime checks, SEO edits, backups, and small improvements.",
    bestFor: "Live websites, business systems, dashboards, and growing digital products.",
    items: [
      "Content and SEO updates",
      "Bug fixes and small features",
      "Security and uptime checks",
      "Performance improvements",
    ],
    cta: "Get Support",
  },
];

export const SERVICE_PACKAGE_CONTACT_DETAILS: Record<
  string,
  { service: string; budget?: string; message: string }
> = {
  "Business Website Launch": {
    service: "Business Website",
    budget: "KES 25,000 – 100,000",
    message:
      "I am interested in a business website launch.\n\nBusiness type:\n\nPages needed:\n\nMain goals:\n\nTimeline:\n\nOther notes:",
  },
  "Web App / Dashboard": {
    service: "Web Application",
    budget: "KES 150,000 – 400,000",
    message:
      "I am interested in scoping a web app or dashboard.\n\nUsers and roles:\n\nMain workflows:\n\nReports or integrations needed:\n\nTimeline:\n\nOther notes:",
  },
  "POS and Retail System": {
    service: "Point of Sale / Retail System",
    message:
      "I am interested in a POS or retail system.\n\nBusiness type:\n\nProducts or stock workflow:\n\nSales and reporting needs:\n\nPayment needs:\n\nOther notes:",
  },
  "Maintenance and Growth": {
    service: "Website Maintenance",
    message:
      "I am interested in website or system maintenance support.\n\nCurrent website/system:\n\nUpdates needed:\n\nIssues to fix:\n\nPreferred support arrangement:\n\nOther notes:",
  },
};

export const SERVICE_DETAIL_PAGES: ServiceDetailPage[] = [
  {
    slug: "business-websites",
    title: "Business Website Design and Development in Kenya",
    eyebrow: "Business Websites",
    summary:
      "Fast, responsive company websites for Kenyan SMEs that need trust, clear service pages, WhatsApp-ready enquiries, SEO basics, and a professional first impression.",
    bestFor:
      "Consultants, agencies, clinics, schools, salons, real estate firms, NGOs, and local service businesses.",
    price: "Starts from KES 25,000",
    outcomes: [
      "A credible online presence clients can trust",
      "Clear service pages that explain what you offer",
      "Mobile-first contact paths through WhatsApp, phone, and forms",
      "SEO-ready structure for Kenyan search intent",
    ],
    features: [
      "Homepage and core service pages",
      "Responsive UI for phone, tablet, and desktop",
      "Contact forms and WhatsApp CTA setup",
      "Basic SEO metadata, sitemap, and analytics",
      "Deployment and launch support",
      "Optional maintenance retainer",
    ],
    process: [
      "Clarify services, target customers, and page structure",
      "Design the content flow and primary calls to action",
      "Build, test, optimize, and deploy the website",
      "Handover access and support future updates",
    ],
    proof:
      "This is the right first build when visibility and trust are the bottleneck, not complex internal workflow automation.",
  },
  {
    slug: "ecommerce-websites",
    title: "E-Commerce Website Development for Kenyan Online Shops",
    eyebrow: "E-Commerce",
    summary:
      "Online shop builds for businesses that need product catalogs, carts, checkout planning, customer details, admin controls, and M-Pesa-ready payment workflows.",
    bestFor:
      "Boutiques, electronics shops, food vendors, school uniform suppliers, hardware shops, and product-led SMEs.",
    price: "Scoped after catalog and checkout discovery",
    outcomes: [
      "Customers can browse products clearly on mobile",
      "Admins can manage products, categories, stock, and orders",
      "Checkout flow matches the way the business sells",
      "Payment and delivery records are easier to reconcile",
    ],
    features: [
      "Product catalog and categories",
      "Cart and checkout flow",
      "Admin product and order management",
      "Customer details and order notes",
      "M-Pesa or WhatsApp-order planning",
      "Stock and fulfillment reporting",
    ],
    process: [
      "Map products, delivery, payment, and fulfillment flow",
      "Choose lightweight catalog or full checkout",
      "Build the storefront and admin dashboard",
      "Test ordering, notifications, and payment records",
    ],
    proof:
      "We keep e-commerce practical: start with the checkout model the business can operate, then expand into deeper automation as sales volume grows.",
  },
  {
    slug: "pos-systems",
    title: "POS System Development for Kenyan Retail Businesses",
    eyebrow: "POS Systems",
    summary:
      "Custom point-of-sale and retail systems for shops that need cleaner sales, stock, expenses, staff roles, receipts, and daily reports.",
    bestFor:
      "Mini marts, pharmacies, hardware shops, boutiques, salons, service counters, and retail SMEs.",
    price: "Scoped after workflow discovery",
    outcomes: [
      "Faster sales and receipt workflows",
      "Clear stock movement and low-stock visibility",
      "Daily sales, expense, and profit reporting",
      "Better control through staff roles and audit trails",
    ],
    features: [
      "Product and price management",
      "Sales, receipts, returns, and expenses",
      "Stock control and supplier records",
      "Cashier and admin roles",
      "Daily, weekly, and monthly reports",
      "Optional M-Pesa reconciliation planning",
    ],
    process: [
      "Study current shop workflow and reporting pain points",
      "Define cashier, admin, and owner roles",
      "Build sales, stock, reports, and permissions",
      "Train users and iterate after real shop usage",
    ],
    proof:
      "A good POS system should make everyday shop work faster while giving the owner a reliable financial picture.",
  },
  {
    slug: "website-maintenance",
    title: "Website Maintenance Services for Kenyan Businesses",
    eyebrow: "Maintenance",
    summary:
      "Ongoing website support for businesses that need content updates, form checks, bug fixes, uptime reviews, SEO edits, backups, and performance improvements.",
    bestFor:
      "Live company websites, e-commerce websites, business portals, and lead-generation pages.",
    price: "Monthly retainer or task-based support",
    outcomes: [
      "Contact forms, WhatsApp links, and CTAs keep working",
      "Content remains current as services change",
      "SEO and performance issues are handled early",
      "Technical problems are fixed without waiting for a full rebuild",
    ],
    features: [
      "Content and page updates",
      "Form, link, and CTA checks",
      "Performance and accessibility improvements",
      "Backup and deployment checks",
      "SEO metadata and sitemap updates",
      "Bug fixes and small feature improvements",
    ],
    process: [
      "Audit the current website and deployment setup",
      "Agree on monthly or task-based support scope",
      "Handle fixes, updates, checks, and reports",
      "Recommend larger improvements only when needed",
    ],
    proof:
      "Maintenance protects the business value of a website after launch, especially when the site is used for leads, orders, or customer support.",
  },
  {
    slug: "mpesa-integrations",
    title: "M-Pesa Daraja Integration for Kenyan Business Systems",
    eyebrow: "M-Pesa Integrations",
    summary:
      "Payment integrations for web apps, mobile apps, portals, POS systems, and dashboards that need STK Push, callbacks, transaction status, and reconciliation.",
    bestFor:
      "E-commerce platforms, billing systems, portals, booking apps, POS systems, and subscription workflows.",
    price: "Scoped by payment flow and reconciliation needs",
    outcomes: [
      "Customers can pay through guided M-Pesa flows",
      "Admins can see payment status and receipt records",
      "Orders or invoices are connected to transactions",
      "Delayed, failed, and duplicate callbacks are handled safely",
    ],
    features: [
      "STK Push integration",
      "Callback handling and validation",
      "Transaction status checks",
      "Payment states and duplicate protection",
      "Admin reconciliation views",
      "Secure credentials and environment setup",
    ],
    process: [
      "Map the payment event to order, invoice, or account logic",
      "Integrate Daraja endpoints and secure callbacks",
      "Build payment records and admin reconciliation",
      "Test sandbox, production credentials, and edge cases",
    ],
    proof:
      "The goal is not only accepting payment; it is giving the business a reliable way to verify, reconcile, and support payment events.",
  },
];

export const SOLUTIONS = [
  "Point of sale (POS) systems",
  "Retail and bookkeeping systems",
  "Desktop applications for internal teams",
  "CRM and customer management platforms",
  "HR, payroll, and attendance systems",
  "Billing and subscription management systems",
  "School and institution management systems",
  "Clinic and vaccination tracker systems",
  "Exam verification and attendance systems",
  "Service marketplace platforms",
  "Fleet & vehicle management systems",
  "Digital document management systems",
  "Warehouse and stock control systems",
  "AI-powered business assistants",
  "E-commerce websites",
  "Inventory management systems",
  "Booking and appointment platforms",
  "M-Pesa-integrated payment platforms",
  "Laravel and PHP business portals",
  "Admin dashboards & mobile apps",
];

export const WHY: WhyItem[] = [
  {
    title: "Practical business understanding",
    desc: "We focus on software that solves real problems, not just designs that look good.",
  },
  {
    title: "Full-stack capability",
    desc: "Frontend, mobile, backend, APIs, databases, and deployment — handled end-to-end.",
  },
  {
    title: "Maintainable architecture",
    desc: "Clean structure so systems can grow and be updated long after launch.",
  },
  {
    title: "Security awareness",
    desc: "Authentication, validation, access control, and hardening baked into every build.",
  },
  {
    title: "Modern technologies",
    desc: "React, Vite, React Native, Node.js, Express, MongoDB, MySQL, Spring Boot, Linux.",
  },
  {
    title: "Clear communication",
    desc: "Clients stay involved from idea planning through delivery and beyond.",
  },
];

export const PROCESS: ProcessItem[] = [
  {
    n: "01",
    title: "Discovery",
    desc: "Understand your business, workflow, users, and software goals.",
  },
  {
    n: "02",
    title: "Planning",
    desc: "Define features, user roles, database needs, and development roadmap.",
  },
  {
    n: "03",
    title: "UI/UX Design",
    desc: "Design clean screens and user flows before development begins.",
  },
  {
    n: "04",
    title: "Development",
    desc: "Build the frontend, backend, APIs, database, and integrations.",
  },
  {
    n: "05",
    title: "Testing",
    desc: "Test features, forms, authentication, responsiveness, and workflows.",
  },
  { n: "06", title: "Deployment", desc: "Launch on the right hosting or server environment." },
  {
    n: "07",
    title: "Support & Improvements",
    desc: "Maintenance, bug fixes, updates, and new feature development.",
  },
];

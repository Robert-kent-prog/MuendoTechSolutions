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

export interface ServiceExtras {
  stack: string[];
  faqs: { q: string; a: string }[];
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
  {
    slug: "web-applications",
    title: "Custom Web Application Development in Kenya",
    eyebrow: "Web Applications",
    summary:
      "Dashboards, portals and internal systems for Kenyan businesses that have outgrown spreadsheets: logins, roles, records, reports and workflows built around how your team actually works.",
    bestFor:
      "Operations teams, schools, clinics, logistics firms, NGOs and growing SMEs that need one reliable system instead of scattered files.",
    price: "Typical range KES 150,000+",
    outcomes: [
      "One source of truth for records that used to live in spreadsheets",
      "Role-based access so staff only see what they should",
      "Reports and exports the owner or manager can trust",
      "A system that can grow with new modules after launch",
    ],
    features: [
      "Authentication, roles and permissions",
      "Database design and data validation",
      "Admin dashboards and approval workflows",
      "Reports, exports and audit trails",
      "Optional M-Pesa and third-party integrations",
      "Deployment, backups and handover",
    ],
    process: [
      "Map the current workflow, users and the records that matter",
      "Design the data model, screens and permissions",
      "Build in short cycles with reviews you can click through",
      "Test, deploy, train your team and plan support",
    ],
    proof:
      "Our fleet management, bookkeeping and document systems follow this approach: start from the real workflow, then build only what the team will use.",
  },
  {
    slug: "mobile-apps",
    title: "Mobile App Development in Kenya (Android and iOS)",
    eyebrow: "Mobile Apps",
    summary:
      "Cross-platform Android and iOS apps with a secure backend, built for the way Kenyan users actually pay, chat and find services.",
    bestFor:
      "Startups, service marketplaces, field teams and businesses that need customers or staff to work from their phones.",
    price: "Scoped after discovery",
    outcomes: [
      "One codebase that ships to both Android and iOS",
      "A backend and admin panel to manage users and content",
      "Payment, location and notification flows that work on real networks",
      "A release plan for the Play Store and App Store",
    ],
    features: [
      "React Native app with TypeScript",
      "Secure API, authentication and data storage",
      "Push notifications, chat and location features",
      "M-Pesa Daraja payment flows",
      "Admin dashboard for managing the app",
      "Store submission and post-launch support",
    ],
    process: [
      "Define the core user journey and what version one must include",
      "Prototype the key screens and confirm them with real users",
      "Build the app and backend together, testing on real devices",
      "Release to the stores and support early feedback",
    ],
    proof:
      "Linkfy, a service marketplace app, combines chat, calls, maps, ratings and M-Pesa payments on one backend.",
  },
  {
    slug: "ai-integration",
    title: "AI Integration for Business Software in Kenya",
    eyebrow: "AI Integration",
    summary:
      "Practical AI features added to systems you already run: document understanding, customer support assistants, smart search and workflow automation, with clear limits and human review where it matters.",
    bestFor:
      "Businesses with documents, support requests or repetitive admin work that a well-scoped AI feature could reduce.",
    price: "Scoped after discovery",
    outcomes: [
      "Less manual reading, sorting and data entry",
      "Faster first responses to common customer questions",
      "Search that finds the right record or document",
      "Predictable usage costs and clear fallback behaviour",
    ],
    features: [
      "AI chat assistants connected to your own data",
      "Document understanding and data extraction",
      "Smart search across records and files",
      "Workflow automation with approval steps",
      "Provider integration (OpenAI, Gemini)",
      "Usage limits, logging and cost monitoring",
    ],
    process: [
      "Pick one high-value task and define what a good result looks like",
      "Prototype with real examples and measure accuracy",
      "Integrate into your system with review steps and fallbacks",
      "Monitor cost and quality, then expand carefully",
    ],
    proof:
      "We have built AI chat assistants, document understanding and workflow automation into business platforms, always starting with one narrow task.",
  },
  {
    slug: "school-management-systems",
    title: "School Management System Development in Kenya",
    eyebrow: "School Systems",
    summary:
      "Student records, fees, attendance, exams and reports for Kenyan schools and colleges, built in stages so staff can adopt the system without disrupting the term.",
    bestFor:
      "Primary and secondary schools, colleges and training institutions that run on registers, spreadsheets and paper files.",
    price: "Scoped after discovery",
    outcomes: [
      "One reliable record for every student, class and stream",
      "Fee balances and payment records the bursar can trust",
      "Attendance and exam marks captured once and reported on easily",
      "Role-based access for teachers, finance staff, admins and leadership",
    ],
    features: [
      "Student records and class streams",
      "Fee tracking and balances",
      "Attendance capture",
      "Exam marks and report outputs",
      "Roles and permissions per department",
      "Optional parent portal and SMS reminders in a later phase",
    ],
    process: [
      "Agree the first release: records, fees, attendance, exams and reports",
      "Import existing student and fee data from spreadsheets",
      "Train staff on the screens they use every day",
      "Add parent communication and online applications once the core is stable",
    ],
    proof:
      "We have built a university exam administration system with eligibility checks, barcode verification, role access and audit logging, and we advise starting a school system small. See our field notes on what to build first.",
  },
  {
    slug: "health-and-clinic-systems",
    title: "Clinic and Health Records Software in Kenya",
    eyebrow: "Health and Clinic Systems",
    summary:
      "Patient records, vaccination schedules, appointment follow-ups and stock visibility for clinics and health teams that want to move away from fragile paper processes.",
    bestFor: "Clinics, community health teams, vaccination programmes and small health facilities.",
    price: "Scoped after discovery",
    outcomes: [
      "Clear dose history and follow-up dates for every patient",
      "Fewer missed appointments through visible schedules",
      "Vaccine and supply stock the team can see at a glance",
      "Reports for managers without manual counting",
    ],
    features: [
      "Patient and dose records",
      "Appointment and follow-up tracking",
      "Vaccine stock visibility",
      "Admin roles and access control",
      "Reports and dashboards",
      "Secure hosting and backups",
    ],
    process: [
      "Map how patients, doses and appointments are handled today",
      "Design the records, schedules and roles around that workflow",
      "Build, test with real examples and train the team",
      "Deploy with backups and support during the first rollout",
    ],
    proof:
      "Our Vaccination Tracker System covers patient records, dose schedules, follow-ups, stock visibility and admin reporting. Health data needs careful access control, so roles are designed in from the start.",
  },
  {
    slug: "fleet-management-systems",
    title: "Fleet Management Software for Kenyan Logistics Teams",
    eyebrow: "Fleet Management",
    summary:
      "Vehicle and driver records, fuel, trips, maintenance schedules and expense reports in one platform, so managers see costs and risks before they become problems.",
    bestFor:
      "Transport and logistics operators, delivery businesses and companies running their own vehicles.",
    price: "Scoped after discovery",
    outcomes: [
      "One view of every vehicle, driver and trip",
      "Maintenance reminders so service is not missed",
      "Fuel and expense records that show real operating costs",
      "Documents and compliance dates visible in one place",
    ],
    features: [
      "Vehicle and driver records",
      "Fuel and maintenance tracking",
      "Trip logs and expense reports",
      "Document and expiry visibility",
      "Map-ready workflow planning",
      "Admin dashboard and reports",
    ],
    process: [
      "List the vehicles, drivers and records that matter most today",
      "Design trips, fuel, maintenance and expense workflows",
      "Build the dashboard and reports managers will actually open",
      "Deploy, train the team and plan optional tracking integrations",
    ],
    proof:
      "Our Fleet Management System replaced scattered manual logs and documents with vehicle, driver, fuel, trip, maintenance and expense records for a Kenyan logistics operator.",
  },
];

export const SERVICE_EXTRAS: Record<string, ServiceExtras> = {
  "business-websites": {
    stack: ["React.js", "Vite", "HTML", "CSS", "JavaScript"],
    faqs: [
      {
        q: "Can I update the website content myself?",
        a: "Yes, if you want that. We can build the site content-managed with an admin area and run a handover session. Simple sites can also be updated by us under a maintenance plan.",
      },
      {
        q: "Will the site rank on Google?",
        a: "We set up the foundations: page titles, descriptions, a sitemap, structured data and fast mobile performance. Rankings depend on competition and content over time, so nobody can honestly guarantee a position.",
      },
      {
        q: "Do I own the website?",
        a: "Yes. Once the agreed payment terms are completed, you receive the delivered source code, assets and deployment access listed in the scope.",
      },
    ],
  },
  "ecommerce-websites": {
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "M-Pesa Daraja"],
    faqs: [
      {
        q: "Can customers pay with M-Pesa?",
        a: "Yes. We integrate M-Pesa Daraja (STK Push) with callback handling, so each order is linked to its payment record.",
      },
      {
        q: "Who manages products and orders?",
        a: "An admin dashboard lets your team manage products, stock and orders, with separate access levels for staff.",
      },
      {
        q: "Can I move products from a spreadsheet?",
        a: "Yes. Product lists can be imported during setup. Data migration is scoped in your written quote.",
      },
    ],
  },
  "pos-systems": {
    stack: ["React.js", "Node.js", "PostgreSQL", "MongoDB", "M-Pesa Daraja"],
    faqs: [
      {
        q: "Does it work when the internet drops?",
        a: "That depends on the design. If your shop has unreliable internet, tell us during discovery and we will scope offline-capable sales capture that syncs later.",
      },
      {
        q: "Can different staff have different access?",
        a: "Yes. Staff roles control who can sell, edit stock, see reports or change prices.",
      },
      {
        q: "Can I bring in my existing stock list?",
        a: "Yes. We can import products and stock from spreadsheets during setup.",
      },
    ],
  },
  "website-maintenance": {
    stack: ["Linux", "cPanel", "Git & GitHub", "Vercel"],
    faqs: [
      {
        q: "What does maintenance cover?",
        a: "Content and SEO updates, bug fixes, small features, security and uptime checks, backups and performance improvements, as set out in your plan.",
      },
      {
        q: "Do I need a monthly retainer?",
        a: "No, but we recommend one for live sites that bring in leads or orders. One-off fixes can be quoted separately.",
      },
    ],
  },
  "mpesa-integrations": {
    stack: ["M-Pesa Daraja", "Node.js", "Python", "Django", "Laravel"],
    faqs: [
      {
        q: "What do I need to start?",
        a: "A Safaricom Daraja developer account to begin in the sandbox. For live payments you will need a paybill or till number and Safaricom's go-live approval. We guide you through testing and the switch to production.",
      },
      {
        q: "How do you handle failed or duplicate callbacks?",
        a: "Payment states and duplicate protection are built in, so delayed, failed or repeated callbacks do not create double records, and admins can reconcile them.",
      },
    ],
  },
  "web-applications": {
    stack: ["React.js", "Node.js", "Django", "Laravel", "Spring Boot", "PostgreSQL"],
    faqs: [
      {
        q: "How long does a web app take?",
        a: "Most MVPs ship in 4 to 10 weeks depending on scope. Complex platforms with payments, AI and dashboards take longer. You get a timeline in your written quote.",
      },
      {
        q: "Can you start from our spreadsheets or old system?",
        a: "Yes. We map the current records and workflow, then import existing data as part of the build.",
      },
      {
        q: "Can the system grow later?",
        a: "Yes. We design around a first release and add modules afterwards, so you only pay for what you need now.",
      },
    ],
  },
  "mobile-apps": {
    stack: ["React Native", "Expo Router", "TypeScript", "Node.js", "PostgreSQL"],
    faqs: [
      {
        q: "Do you build for both Android and iOS?",
        a: "Yes, from one React Native codebase. Store accounts (Google Play and Apple Developer) are created in your name.",
      },
      {
        q: "Do you also build the backend?",
        a: "Yes. The app, the secure API and an admin dashboard are built together.",
      },
    ],
  },
  "ai-integration": {
    stack: ["OpenAI API", "Gemini API", "LangChain", "RAG pipelines", "Python", "FastAPI"],
    faqs: [
      {
        q: "Will AI replace my staff?",
        a: "That is not the aim. We scope AI to narrow tasks, keep a human review step where mistakes matter, and measure accuracy before expanding.",
      },
      {
        q: "How do you control costs?",
        a: "We add usage limits, logging and cost monitoring, so spending on AI providers stays predictable.",
      },
      {
        q: "Is my data sent to AI providers?",
        a: "Only what the feature needs. We decide with you what is sent, minimise personal data, and tell you which provider processes it.",
      },
    ],
  },
  "school-management-systems": {
    stack: ["React.js", "Node.js", "PostgreSQL", "MongoDB", "Redis"],
    faqs: [
      {
        q: "Can you import our existing student lists?",
        a: "Yes. Student and fee data can be imported from Excel or CSV files during setup.",
      },
      {
        q: "Do parents get access?",
        a: "A parent portal and SMS reminders are best added in a later phase, once the core records are stable.",
      },
      {
        q: "Is student data kept secure?",
        a: "Role-based access means teachers, finance staff and admins only see what they need, and finance records are controlled separately.",
      },
    ],
  },
  "health-and-clinic-systems": {
    stack: ["Python", "Django", "FastAPI", "PostgreSQL"],
    faqs: [
      {
        q: "Is patient data secure?",
        a: "Access is role-based and the system is built with backups and secure hosting. Health data carries legal duties under Kenya's Data Protection Act, so we recommend your clinic confirms its obligations with a qualified adviser.",
      },
      {
        q: "Can it remind patients about follow-ups?",
        a: "Follow-up tracking is built in. Patient reminders by SMS can be added through an SMS provider as an integration.",
      },
    ],
  },
  "fleet-management-systems": {
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    faqs: [
      {
        q: "Does it track vehicles live on a map?",
        a: "The system is map-ready. Live GPS tracking needs a GPS device or provider integration, which we scope separately.",
      },
      {
        q: "Can we record fuel, trips and maintenance?",
        a: "Yes. Vehicles, drivers, fuel, trips, maintenance schedules and expenses are all tracked, with reports for managers.",
      },
    ],
  },
};

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
    desc: "Frontend, mobile, backend, APIs, databases, and deployment, handled end-to-end.",
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

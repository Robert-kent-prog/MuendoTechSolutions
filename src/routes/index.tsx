import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useState, useEffect, useRef, type FormEvent } from "react";
import {
  Globe,
  Smartphone,
  Server,
  Database,
  LayoutDashboard,
  ShieldCheck,
  Rocket,
  Cpu,
  Code2,
  GitBranch,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
  MessageCircle,
  Sparkles,
  Building2,
  GraduationCap,
  Store,
  Users,
  Briefcase,
  Workflow,
  Layers,
  Wrench,
  Brain,
  Truck,
  FolderLock,
  Sun,
  Moon,
  Quote,
  HelpCircle,
  ChevronDown,
  BookOpen,
  Award,
  Calendar,
} from "lucide-react";
import {
  COMPANY,
  EMAIL,
  GITHUB,
  LINKEDIN,
  SITE_URL,
  WHATSAPP,
  organizationSchema,
  pageHead,
} from "@/lib/seo";

const WHATSAPP_DISPLAY = "+254 793 587 026";
const LOGO_SRC = "/logo.png";
const HOME_HEAD = pageHead({
  title: `${COMPANY} — Software Development Company in Nairobi, Kenya`,
  description:
    "Nairobi-based software development company building reliable web apps, mobile apps, backend APIs, AI integrations, POS systems, and business software for startups, SMEs, schools, and enterprises across Kenya.",
  path: "/",
});

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    ...HOME_HEAD,
    meta: [
      ...HOME_HEAD.meta,
      {
        name: "keywords",
        content:
          "software development Nairobi, web development Kenya, mobile app development Kenya, POS systems Kenya, business software Kenya, M-Pesa integration, backend APIs, AI integration Kenya, React, Laravel, Django, Spring Boot",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationSchema),
      },
    ],
  }),
});

const NAV = [
  { label: "Home", href: "/", mobileHref: "/#home" },
  { label: "About", href: "/about", mobileHref: "/#about" },
  { label: "Services", href: "/services", mobileHref: "/#services" },
  { label: "Projects", href: "/projects", mobileHref: "/#projects" },
  { label: "Process", href: "/process", mobileHref: "/#process" },
  { label: "Blog", href: "/blog", mobileHref: "/#insights" },
  { label: "FAQ", href: "/faq", mobileHref: "/#faq" },
  { label: "Contact", href: "/contact", mobileHref: "/#contact" },
];

const STATS = [
  { value: 12, suffix: "+", label: "Projects Shipped" },
  { value: 8, suffix: "+", label: "Industries Served" },
  { value: 100, suffix: "%", label: "Kenyan-Built" },
  { value: 3, suffix: "+", label: "Years Experience" },
];

const TESTIMONIALS = [
  {
    name: "John Muasya",
    role: "Founder, Machakos Retail SME",
    quote:
      "Muendo Tech rebuilt our bookkeeping flow into a clean web platform. Daily sales, expenses, and profit are now one click away. Easy to work with and very responsive.",
  },
  {
    name: "Yvonne Wanjiru",
    role: "Operations Manager, Logistics Firm",
    quote:
      "The fleet management system replaced three spreadsheets. We finally have visibility on every vehicle, driver, and trip. Worth every shilling.",
  },
  {
    name: "Xelvora Team",
    role: "Digital Agency Client",
    quote:
      "Muendo Tech helped shape Xelvora's website into a clear digital agency platform with services, products, portfolio, blogs, and a strong booking flow. The execution was practical and reliable.",
  },
];

const TEAM = [
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

export const FAQS = [
  {
    q: "How long does it take to build an MVP?",
    a: "Most MVPs ship in 4–10 weeks depending on scope. Simple web apps and mobile apps land closer to 4–6 weeks; complex platforms with payments, AI, and dashboards land in 8–12 weeks.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes. We're happy to sign a mutual NDA before discussing sensitive product details, business workflows, or proprietary data.",
  },
  {
    q: "Do you offer monthly retainers?",
    a: "Yes. After launch, many clients move to a monthly retainer for ongoing maintenance, feature work, bug fixing, and performance optimisation.",
  },
  {
    q: "What does it cost to build a system in Kenya?",
    a: "Pricing depends on scope. Small business websites start from KES 50,000. Custom systems and mobile apps typically range from KES 150,000 to KES 1,000,000+. We always provide a written estimate after the discovery call.",
  },
  {
    q: "Can you integrate M-Pesa?",
    a: "Yes. We integrate M-Pesa Daraja (STK Push, C2B, B2C, transaction status) into web and mobile platforms, with proper logging and reconciliation.",
  },
  {
    q: "Do you work with clients outside Kenya?",
    a: "Yes. We've built systems for clients in the region and beyond — including Xelvora in Pakistan — over async communication (email, WhatsApp, calls).",
  },
  {
    q: "Can you deploy the project for me?",
    a: "Yes. We can deploy to Vercel, Cloudflare, cPanel, VPS, or other hosting platforms depending on the project needs, budget, and expected traffic.",
  },
  {
    q: "Will I own the source code?",
    a: "Yes. Once the agreed payment terms are completed, the client receives ownership of the delivered source code, assets, documentation, and deployment access agreed in the scope.",
  },
  {
    q: "Can you improve an existing website or system?",
    a: "Yes. We can audit, redesign, optimize, add features, fix bugs, improve SEO, connect APIs, or rebuild weak parts without forcing a full restart unless it is technically necessary.",
  },
  {
    q: "Do you provide training after launch?",
    a: "Yes. For admin dashboards, business systems, and content-managed websites, we can provide handover sessions, usage notes, and support during the first rollout period.",
  },
];

export const BLOG_CATEGORIES = [
  "All Posts",
  "Software Development",
  "Payments",
  "AI & Automation",
  "Deployment",
  "Product & Design",
  "Security",
];

export const INSIGHTS = [
  {
    slug: "choosing-between-mern-and-spring-boot-for-kenyan-smes",
    tag: "Backend",
    category: "Software Development",
    date: "Dec 2025",
    publishedAt: "2025-12-10",
    readTime: "8 min read",
    title: "Choosing Between MERN and Spring Boot for Kenyan SMEs",
    excerpt:
      "A practical breakdown of when MongoDB + Express + React + Node beats a Java/Spring Boot stack for African SMEs — cost, hiring, hosting, and scaling considerations.",
    details:
      "MERN works well when the business needs fast iteration, dashboards, APIs, and a JavaScript-first team. Spring Boot is a better fit when the project needs stricter enterprise patterns, complex transactions, and long-term Java maintainability.",
    article: [
      {
        heading: "Start With The Business Workflow",
        paragraphs: [
          "The stack decision should begin with the actual workflow, not with a trend. A retail dashboard, booking platform, school portal, delivery tracker, or subscription system has different pressure points. Some need quick feature iteration and flexible data structures, while others need strict domain rules, transaction boundaries, and predictable enterprise maintenance.",
          "For many Kenyan SMEs, MERN is attractive because the same language can cover the frontend, API layer, and a large share of the tooling. That reduces handoff time and can make smaller teams faster. Spring Boot becomes more compelling when the system is expected to support complex finance logic, heavy integrations, long-lived enterprise controls, or teams that already operate Java infrastructure.",
        ],
      },
      {
        heading: "Cost, Hiring, And Maintenance",
        paragraphs: [
          "A good technical choice is one the business can afford to maintain after launch. MERN talent is widely available across startup and freelance circles, and hosting a Node API with a React frontend can be economical. It is often a practical fit for MVPs, admin dashboards, customer portals, and internal systems where speed matters.",
          "Spring Boot may cost more at the beginning, but that cost can be justified when the business needs strong typing, mature security conventions, background workers, formal service boundaries, and deep database transaction handling. The tradeoff is not about which tool is better in general; it is about which tool keeps the product understandable six months after launch.",
        ],
      },
      {
        heading: "A Practical Rule For New Builds",
        paragraphs: [
          "If the product needs fast validation, frequent interface changes, a smaller budget, and a small engineering team, MERN is usually a strong default. If the product is closer to core banking logic, high-volume account operations, insurance workflows, regulated data, or complex internal approvals, Spring Boot deserves serious consideration.",
          "At Muendo Tech Solutions, we also look at the client team. If the person who will support the product is more comfortable with JavaScript, a Java stack can become expensive even when it is technically solid. If the client already has Java developers or enterprise systems, forcing a JavaScript stack can create avoidable operational friction.",
        ],
      },
    ],
    takeaways: [
      "Choose MERN for fast iteration, flexible dashboards, and JavaScript-first teams.",
      "Choose Spring Boot for stricter enterprise workflows, deeper transaction logic, and Java maintainability.",
      "The best stack is the one the client can support, extend, and pay for after launch.",
    ],
  },
  {
    slug: "integrating-mpesa-daraja-the-right-way",
    tag: "Payments",
    category: "Payments",
    date: "Jan 2026",
    publishedAt: "2026-01-14",
    readTime: "9 min read",
    title: "Integrating M-Pesa Daraja the Right Way",
    excerpt:
      "STK Push, callbacks, reconciliation, security, and the production gotchas nobody tells you about until your first failed transaction.",
    details:
      "A strong M-Pesa integration needs callback validation, transaction status checks, duplicate protection, clear logs, and a reconciliation view for admins. The payment flow should assume network delays and failed callbacks from day one.",
    article: [
      {
        heading: "Treat Payments As A State Machine",
        paragraphs: [
          "M-Pesa Daraja integrations become fragile when a payment is treated as a single request and response. In production, a customer can start STK Push, delay entering the PIN, enter the wrong PIN, lose network, pay successfully while your callback arrives late, or retry because the interface did not update quickly enough.",
          "The safer model is to treat every payment as a state machine. A transaction can be pending, successful, failed, cancelled, expired, reversed, or awaiting manual reconciliation. Your database should store those states clearly, and the user interface should not assume the payment has succeeded until the right confirmation has been received and verified.",
        ],
      },
      {
        heading: "Callbacks, Reconciliation, And Admin Visibility",
        paragraphs: [
          "The callback endpoint should validate incoming data, protect against duplicate updates, and write useful logs. It should not silently fail, because the finance team will eventually need to answer a direct question from a customer: did this payment reach us, and what order or invoice did it settle?",
          "A reconciliation screen is not optional for serious business systems. Admins need to search by phone number, checkout request ID, receipt number, customer, invoice, date, and payment status. That visibility prevents support teams from depending on developers every time a transaction looks unusual.",
        ],
      },
      {
        heading: "Production Gotchas To Design Around",
        paragraphs: [
          "Timeouts and delayed callbacks are normal. The system should be able to query transaction status, retry safe operations, and prevent duplicate fulfillment. For example, a paid order should not create two deliveries just because a callback was resent or a user clicked the payment button twice.",
          "Security also matters. Credentials should live in environment variables, callback URLs should use HTTPS, sensitive logs should avoid exposing secrets, and access to payment records should be restricted by role. Payment code is business-critical code, so it needs deliberate handling from the first implementation.",
        ],
      },
    ],
    takeaways: [
      "Model M-Pesa transactions with clear payment states instead of one-off responses.",
      "Build reconciliation tools for admins before the first real customer dispute.",
      "Protect callbacks, credentials, logs, and duplicate fulfillment paths from day one.",
    ],
  },
  {
    slug: "adding-ai-to-business-software-without-burning-budget",
    tag: "AI",
    category: "AI & Automation",
    date: "Feb 2026",
    publishedAt: "2026-02-11",
    readTime: "8 min read",
    title: "Adding AI to Business Software Without Burning Budget",
    excerpt:
      "How to wire OpenAI/Gemini into existing systems for document understanding, customer support, and workflow automation — and where to draw the line.",
    details:
      "The best AI features start with a narrow workflow: document extraction, customer support drafts, search, or report summaries. Keeping prompts, limits, and fallbacks explicit protects budget and makes the feature easier to support.",
    article: [
      {
        heading: "Use AI Where It Removes Real Friction",
        paragraphs: [
          "AI should not be added because it looks impressive on a feature list. It should remove a repeatable bottleneck: reading long documents, summarizing reports, drafting customer replies, classifying tickets, extracting fields from PDFs, or helping staff find internal information faster.",
          "The strongest first AI feature is usually narrow. Instead of building a broad assistant that tries to do everything, start with one workflow where the input, expected output, and failure cases are easy to define. That makes the feature easier to test, cheaper to run, and simpler for users to trust.",
        ],
      },
      {
        heading: "Budget Control Is A Product Requirement",
        paragraphs: [
          "Every AI call has a cost, so the product needs limits. A business system should know which users can access AI features, how much text can be submitted, how often the feature can be used, and what happens when the provider is unavailable. Without those guardrails, a useful prototype can become an expensive production surprise.",
          "Prompt design should also be treated like software design. Prompts need versioning, test examples, fallback messages, and clear boundaries about what the model should not do. For sensitive workflows, the system should keep humans in the approval loop instead of allowing AI to make irreversible business decisions.",
        ],
      },
      {
        heading: "Where AI Fits In Existing Systems",
        paragraphs: [
          "AI works well beside existing dashboards and portals when it is connected to the right data. A support dashboard can draft replies using customer history. A document system can extract invoice fields. A school portal can summarize performance trends. A sales system can produce lead notes from call records.",
          "The implementation should still respect privacy, roles, and auditability. Users should know when content is AI-assisted, admins should be able to review outputs, and the business should avoid sending unnecessary sensitive data to third-party services. Practical AI is less about magic and more about disciplined integration.",
        ],
      },
    ],
    takeaways: [
      "Start with one narrow AI workflow that saves measurable time.",
      "Add usage limits, prompt versions, fallbacks, and review points before launch.",
      "Keep AI connected to business data while respecting privacy and access control.",
    ],
  },
  {
    slug: "choosing-vercel-cloudflare-vps-or-cpanel",
    tag: "Deployment",
    category: "Deployment",
    date: "Mar 2026",
    publishedAt: "2026-03-12",
    readTime: "7 min read",
    title: "Choosing Vercel, Cloudflare, VPS, or cPanel",
    excerpt:
      "A practical note on matching hosting choices to the app's traffic, server needs, budget, and maintenance expectations.",
    details:
      "Vercel is strong for React and SSR workflows, Cloudflare is excellent for edge delivery, a VPS gives more control for custom backends, and cPanel can be enough for smaller business websites. The right answer depends on operations, not hype.",
    article: [
      {
        heading: "Match Hosting To The System Shape",
        paragraphs: [
          "A marketing site, dashboard, API, queue worker, file processing service, and database-backed business platform do not all need the same hosting setup. Choosing the wrong environment can make a simple project expensive or make a complex project hard to operate.",
          "Vercel is a strong fit for modern frontend apps, server-rendered React, preview deployments, and teams that want fast delivery without managing servers. Cloudflare is excellent for global delivery, DNS, caching, security rules, and edge workloads. A VPS is useful when the backend needs long-running processes, custom services, scheduled jobs, or direct server control.",
        ],
      },
      {
        heading: "When cPanel Still Makes Sense",
        paragraphs: [
          "cPanel is not always the wrong answer. For a small brochure website, simple PHP app, email-linked business presence, or low-budget organization that already has hosting, cPanel can be enough. The risk appears when a project quietly grows into something that needs queues, deployment automation, environment isolation, or reliable background work.",
          "The decision should include who will maintain the deployment. A platform that is technically elegant but unfamiliar to the support team can create avoidable downtime. Good hosting is not only about performance; it is also about backups, logs, rollback, monitoring, domain setup, SSL, and predictable monthly costs.",
        ],
      },
      {
        heading: "Our Deployment Checklist",
        paragraphs: [
          "Before choosing infrastructure, we check the framework, backend runtime, database needs, file uploads, expected traffic, admin access, payment callbacks, email or SMS integrations, and whether background jobs are required. Those details quickly reveal whether a managed platform or a controlled server is the better fit.",
          "For many Muendo Tech Solutions projects, the best answer is a hybrid: Vercel for the frontend, a managed database, Cloudflare for DNS and protection, and a separate backend environment when the API needs more control. The goal is to keep deployment reliable without overbuilding the operations layer.",
        ],
      },
    ],
    takeaways: [
      "Use Vercel for modern frontend velocity and preview deployments.",
      "Use VPS or dedicated backend hosting when the app needs deeper server control.",
      "Choose hosting around maintenance, logs, backups, callbacks, and monthly cost.",
    ],
  },
  {
    slug: "what-to-put-in-an-mvp-and-what-to-leave-out",
    tag: "Product",
    category: "Product & Design",
    date: "Apr 2026",
    publishedAt: "2026-04-09",
    readTime: "8 min read",
    title: "What to Put in an MVP and What to Leave Out",
    excerpt:
      "How to reduce launch risk by separating core workflows from nice-to-have features before development starts.",
    details:
      "A focused MVP should cover the user's main job, the admin's main control flow, authentication, data safety, and payment or reporting only where required. Extra dashboards, automation, and advanced settings can come after real usage confirms demand.",
    article: [
      {
        heading: "An MVP Is A Complete First Workflow",
        paragraphs: [
          "A useful MVP is not a broken version of the final product. It is the smallest complete version of the core workflow. The user should be able to arrive, understand what to do, complete the main action, and receive the expected result without manual developer intervention.",
          "For a booking product, that might mean service selection, availability, customer details, payment, and admin confirmation. For an internal dashboard, it might mean login, role-based access, records, status changes, exports, and basic reports. The MVP should prove the business process, not every future idea.",
        ],
      },
      {
        heading: "What To Leave Out Early",
        paragraphs: [
          "Advanced analytics, complex automation, multi-level settings, secondary integrations, deep personalization, and decorative screens are often better after launch. They can be valuable, but they also increase delivery time before the team has real usage data.",
          "Leaving features out is not a downgrade; it is a way to protect the launch. Every added feature introduces design work, edge cases, testing, support notes, and maintenance. If the feature is not essential to the first business outcome, it should earn its place in a later iteration.",
        ],
      },
      {
        heading: "How We Scope A First Release",
        paragraphs: [
          "We usually split features into must-launch, should-follow, and later. Must-launch features support the core user action, admin operation, data safety, and business acceptance. Should-follow features improve convenience after the workflow is proven. Later features are ideas that need evidence from real users.",
          "This approach keeps the team honest. It also makes estimates clearer because everyone can see which items are required for launch and which items are part of growth. A smaller first release with a strong workflow is usually better than a large first release that takes too long to meet customers.",
        ],
      },
    ],
    takeaways: [
      "An MVP should be small, but the main workflow must still feel complete.",
      "Delay advanced dashboards, automation, and secondary integrations until usage proves demand.",
      "Scope launch features around user action, admin control, and business acceptance.",
    ],
  },
  {
    slug: "security-basics-every-business-system-needs",
    tag: "Security",
    category: "Security",
    date: "May 2026",
    publishedAt: "2026-05-13",
    readTime: "8 min read",
    title: "Security Basics Every Business System Needs",
    excerpt:
      "The minimum security practices we bake into admin dashboards, portals, APIs, and database-backed systems.",
    details:
      "Start with role-based access, input validation, secure password handling, protected API routes, audit logs for sensitive actions, and backups. These basics prevent many common failures before adding advanced security layers.",
    article: [
      {
        heading: "Security Starts With The Everyday Paths",
        paragraphs: [
          "Most business systems do not fail because they lacked exotic security tooling. They fail because basic paths were left open: weak passwords, unprotected admin routes, missing validation, exposed files, poor backup habits, or users having access to records they should not see.",
          "The first security layer is clarity. The system should know who the user is, what role they have, which records they can access, and which actions should be logged. That foundation matters whether the product is a school portal, inventory system, e-commerce site, payment dashboard, or customer support platform.",
        ],
      },
      {
        heading: "The Minimum Baseline",
        paragraphs: [
          "Authentication should use secure password hashing and session handling. APIs should validate input on the server, not only in the browser. Admin pages should be protected by role, and sensitive actions such as refunds, user deletion, password resets, or status overrides should produce audit logs.",
          "Backups should be tested, not assumed. A backup that cannot be restored is only a false comfort. For database-backed systems, the business should know how often backups run, where they are stored, who can access them, and how quickly the system can recover after a mistake or outage.",
        ],
      },
      {
        heading: "Security That Teams Can Actually Maintain",
        paragraphs: [
          "Security practices should fit the team that will operate the product. Clear admin roles, predictable logs, simple permission screens, environment variables, HTTPS, limited production access, and dependency updates are practical controls that teams can keep using.",
          "As the product grows, stronger measures can be added: two-factor authentication, anomaly alerts, stricter rate limits, formal vulnerability scans, data retention policies, and deeper monitoring. The important point is to build the baseline early so the system does not need a painful security rewrite later.",
        ],
      },
    ],
    takeaways: [
      "Protect admin routes, API routes, sensitive actions, and data access from the beginning.",
      "Use audit logs and tested backups so operational mistakes are recoverable.",
      "Add stronger controls over time, but do not skip the basic security baseline.",
    ],
  },
];

const HERO_HIGHLIGHTS = [
  "Web Application Development",
  "Mobile App Development",
  "Backend API Development",
  "Business Management Systems",
  "AI Integrations & AI Systems",
  "Deployment & Maintenance",
];

const SERVICES = [
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

const SOLUTIONS = [
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

const WHY = [
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

const PROCESS = [
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

const TECH = [
  { group: "Frontend", items: ["React.js", "Vite", "HTML", "CSS", "JavaScript"] },
  { group: "Mobile", items: ["React Native", "Expo Router", "Android APK"] },
  {
    group: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "Python",
      "Django",
      "FastAPI",
      "PHP",
      "Laravel",
      "Java",
      "Spring Boot",
      "C",
      "C++",
      "REST APIs",
      "MVC Architecture",
    ],
  },
  {
    group: "Databases",
    items: ["MongoDB", "PostgreSQL", "MySQL", "SQLite", "Redis", "Vector databases"],
  },
  {
    group: "AI & Integrations",
    items: [
      "OpenAI API",
      "Gemini API",
      "LangChain",
      "RAG pipelines",
      "M-Pesa Daraja",
      "Vector databases",
    ],
  },
  {
    group: "Security & Tools",
    items: [
      "JWT",
      "Zod",
      "Helmet",
      "Rate limiting",
      "Mongo sanitization",
      "HPP",
      "Git & GitHub",
      "Linux",
      "cPanel",
    ],
  },
];

const PROJECTS = [
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

const TRUSTED_PARTNERS = [
  { initials: "LF", name: "Linkfy", type: "Service marketplace" },
  { initials: "XV", name: "Xelvora", type: "Digital agency website" },
  { initials: "MR", name: "Machakos Retail", type: "Bookkeeping platform" },
  { initials: "EA", name: "Exam Admin", type: "Verification system" },
  { initials: "FM", name: "Fleet Manager", type: "Logistics software" },
  { initials: "CC", name: "CCU", type: "Public web platform" },
];

const INDUSTRIES = [
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

const VALUES = [
  "Reliability",
  "Clean architecture",
  "Security-first development",
  "Practical delivery",
  "Long-term maintainability",
  "User-friendly design",
  "Clear communication",
];

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids.join(",")]);
  return active;
}

function useIsCompactLayout() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsCompact(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isCompact;
}

function ThemeToggle({ className = "" }: { className?: string }) {
  const [isLight, setIsLight] = useState(false);
  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);
  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {
      // Theme persistence is optional when storage is unavailable.
    }
  };
  return (
    <button
      onClick={toggle}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      className={`size-9 grid place-items-center rounded-lg border border-border text-foreground hover:bg-secondary transition ${className}`}
    >
      {isLight ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </button>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  return (
    <header className="fixed top-0 inset-x-0 z-50 nav-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="flex min-w-0 items-center gap-2 group" aria-label={COMPANY}>
          <img
            src={LOGO_SRC}
            alt={`${COMPANY} logo`}
            className="h-10 w-auto max-w-[190px] rounded-md object-contain bg-white/95 px-1.5 py-1 sm:h-11 sm:max-w-[240px]"
          />
        </a>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => {
            const isActive = location.pathname === n.href;
            return (
              <a
                key={n.href}
                href={n.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative text-sm px-3 py-2 rounded-md transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
                <span
                  className={`absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                    isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            Start a Project <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV.map((n) => {
              const mobileHref = n.mobileHref ?? n.href;
              const isActive = location.pathname === n.href;
              return (
                <a
                  key={n.href}
                  href={mobileHref}
                  onClick={() => setOpen(false)}
                  className={`text-sm py-2 px-3 rounded-md ${
                    isActive
                      ? "bg-secondary text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {n.label}
                </a>
              );
            })}
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-primary text-primary-foreground"
            >
              Start a Project <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative scroll-mt-16 pt-28 pb-20 sm:pt-36 sm:pb-28 bg-hero-gradient overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground mb-6">
            <Sparkles className="size-3.5 text-accent" />
            Software Development Company · Nairobi, Kenya
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            Build <span className="text-gradient">Reliable Software</span>
            <br className="hidden sm:block" /> for Your Business
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            We design and develop modern web applications, mobile apps, backend systems, APIs, and
            database-driven platforms for businesses, startups, schools, retail operations, and
            service providers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-lg shadow-primary/30"
            >
              Start a Project <ArrowRight className="size-4" />
            </a>
            <a
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg glass text-foreground font-medium hover:bg-white/10 transition"
            >
              View Our Services
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-white/5 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-3">
          {HERO_HIGHLIGHTS.map((h) => (
            <div
              key={h}
              className="glass card-hover rounded-xl px-4 py-3 flex items-center gap-2 text-sm"
            >
              <CheckCircle2 className="size-4 text-accent shrink-0" />
              <span className="text-foreground/90">{h}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          {eyebrow && (
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">
              {eyebrow}
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">{title}</h2>
          {subtitle && (
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About Us"
      title="Software Built for Real Business Needs"
      subtitle="We are a software development company based in Nairobi, Kenya, focused on building practical digital systems that solve real operational problems. Our work covers web platforms, mobile apps, backend services, APIs, business dashboards, authentication systems, database solutions, and deployment support."
    >
      <p className="text-muted-foreground max-w-3xl -mt-6 mb-12 leading-relaxed">
        We believe good software should be secure, maintainable, easy to use, and built around the
        client's actual workflow.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="glass rounded-2xl p-7 card-hover">
          <div className="size-10 rounded-lg bg-primary/15 text-primary grid place-items-center mb-4">
            <Rocket className="size-5" />
          </div>
          <h3 className="font-semibold text-xl mb-2">Mission</h3>
          <p className="text-muted-foreground leading-relaxed">
            To help businesses and organizations move from manual, inefficient processes to reliable
            digital systems that improve speed, control, visibility, and growth.
          </p>
        </div>
        <div className="glass rounded-2xl p-7 card-hover">
          <div className="size-10 rounded-lg bg-accent/15 text-accent grid place-items-center mb-4">
            <Sparkles className="size-5" />
          </div>
          <h3 className="font-semibold text-xl mb-2">Vision</h3>
          <p className="text-muted-foreground leading-relaxed">
            To become a trusted software partner for businesses, institutions, and startups across
            Kenya and beyond.
          </p>
        </div>
      </div>
      <div className="glass rounded-2xl p-7">
        <h3 className="font-semibold text-xl mb-4">Core Values</h3>
        <div className="flex flex-wrap gap-2">
          {VALUES.map((v) => (
            <span
              key={v}
              className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border"
            >
              <CheckCircle2 className="size-3.5 text-accent" />
              {v}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function Team() {
  return (
    <Section
      id="team"
      eyebrow="The Team"
      title="Three Engineers. Direct to Client."
      subtitle="No account-manager layers. You speak directly with the people planning the architecture, writing the code, testing the workflows, and shipping your application."
    >
      <div className="grid lg:grid-cols-3 gap-5">
        {TEAM.map((member) => (
          <article key={member.name} className="glass rounded-2xl p-7 card-hover flex flex-col">
            <div className="flex items-start gap-4">
              <div className="size-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground grid place-items-center text-lg font-bold shadow-lg shadow-primary/20">
                {member.initials}
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold tracking-tight">{member.name}</h3>
                <p className="mt-1 text-sm text-accent font-medium">{member.role}</p>
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed flex-1">
              {member.bio}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {member.focus.map((item) => (
                <span
                  key={item}
                  className="text-xs px-2.5 py-1 rounded-md bg-secondary border border-border text-secondary-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 glass rounded-2xl p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-semibold text-lg">Built for application work, not handoffs.</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-3xl">
            The same engineers who scope the system stay close to implementation, testing, launch,
            and improvements. That keeps decisions practical and communication clear.
          </p>
        </div>
        <a
          href="/contact"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
        >
          Work With Us <ArrowRight className="size-4" />
        </a>
      </div>
    </Section>
  );
}

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="What We Do"
      title="Our Software Development Services"
      subtitle="End-to-end engineering across web, mobile, backend, and infrastructure — built for the way your business actually operates."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SERVICES.map((s) => (
          <div key={s.title} className="glass rounded-2xl p-6 card-hover group">
            <div className="size-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 grid place-items-center mb-4 group-hover:from-primary/40 group-hover:to-accent/40 transition">
              <s.icon className="size-5 text-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
            <ul className="space-y-1.5">
              {s.items.map((i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="size-1 rounded-full bg-accent" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Solutions() {
  return (
    <Section
      id="solutions"
      eyebrow="Solutions"
      title="Solutions We Can Build"
      subtitle="Production-ready building blocks we've delivered — and can shape to fit your workflow."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SOLUTIONS.map((s, i) => (
          <div key={s} className="glass rounded-xl p-5 card-hover flex items-start gap-3">
            <div className="size-8 rounded-lg bg-primary/15 text-primary grid place-items-center shrink-0 text-xs font-bold">
              {String(i + 1).padStart(2, "0")}
            </div>
            <span className="text-sm font-medium pt-1">{s}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Why() {
  return (
    <Section
      id="why"
      eyebrow="Why Us"
      title="Why Work With Us?"
      subtitle="A software partner that thinks like an engineer and operates like a business."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {WHY.map((w, i) => (
          <div key={w.title} className="glass rounded-2xl p-6 card-hover">
            <div className="text-xs font-bold text-accent mb-3">0{i + 1}</div>
            <h3 className="font-semibold text-lg mb-2">{w.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Process() {
  return (
    <Section
      id="process"
      eyebrow="Our Process"
      title="How We Work"
      subtitle="A clear, repeatable engineering process from first conversation to long-term support."
    >
      <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {PROCESS.map((p) => (
          <div key={p.n} className="glass rounded-2xl p-6 card-hover relative">
            <div className="text-3xl font-bold text-gradient mb-2">{p.n}</div>
            <h3 className="font-semibold mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Case Studies"
      title="Experience Behind Our Solutions"
      subtitle="A look at production systems we've designed, engineered, and deployed for real operational use."
    >
      <div className="grid md:grid-cols-2 gap-5">
        {PROJECTS.map((p) => (
          <article key={p.title} className="glass rounded-2xl p-7 card-hover">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                {p.tag}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-3">{p.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-md bg-secondary border border-border text-secondary-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Technologies() {
  return (
    <Section
      id="technologies"
      eyebrow="Stack"
      title="Technologies We Use"
      subtitle="Modern, reliable technologies chosen for performance, maintainability, and long-term support."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TECH.map((g) => (
          <div key={g.group} className="glass rounded-2xl p-6 card-hover">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="size-4 text-accent" />
              <h3 className="font-semibold">{g.group}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-md bg-secondary border border-border"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Industries() {
  return (
    <Section
      id="industries"
      eyebrow="Industries"
      title="Industries We Serve"
      subtitle="From retail floors to lecture halls, we build the systems that keep operations running."
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {INDUSTRIES.map((i) => (
          <div
            key={i.label}
            className="glass rounded-xl p-5 card-hover text-center flex flex-col items-center gap-3"
          >
            <div className="size-11 rounded-xl bg-primary/15 text-primary grid place-items-center">
              <i.icon className="size-5" />
            </div>
            <span className="text-sm font-medium">{i.label}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function CTA() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-10 sm:p-14 overflow-hidden bg-hero-gradient border border-border">
          <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-3xl">
              Ready to <span className="text-gradient">Build Your Software?</span>
            </h2>
            <p className="mt-5 text-muted-foreground max-w-2xl text-lg">
              Whether you need a company website, mobile app, backend API, business system, or full
              digital platform — we'll help you plan, build, deploy, and improve it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
              >
                Start a Project <ArrowRight className="size-4" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg glass text-foreground font-medium hover:bg-white/10 transition"
              >
                Request a Quote
              </a>
              <a
                href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-white/5 transition"
              >
                <MessageCircle className="size-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const message = [
      `Hello ${COMPANY}, I have a new project brief.`,
      "",
      `Name: ${f.get("name") || "Not provided"}`,
      `Email: ${f.get("email") || "Not provided"}`,
      `Phone: ${f.get("phone") || "Not provided"}`,
      `Company: ${f.get("company") || "Not provided"}`,
      `Service: ${f.get("service") || "Not selected"}`,
      `Budget: ${f.get("budget") || "Not selected"}`,
      "",
      "Project message:",
      `${f.get("message")}`,
    ].join("\n");
    window.open(
      `https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  }

  return (
    <Section
      id="contact"
      eyebrow="Get In Touch"
      title="Let's Discuss Your Project"
      subtitle="Send a short project brief and we'll help you understand the best approach, features, technology stack, timeline, and development direction."
    >
      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <a
            href={`mailto:${EMAIL}`}
            className="glass card-hover rounded-xl p-5 flex items-start gap-4 block"
          >
            <div className="size-10 rounded-lg bg-primary/15 text-primary grid place-items-center">
              <Mail className="size-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Email</div>
              <div className="font-medium break-all">{EMAIL}</div>
            </div>
          </a>
          <a
            href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass card-hover rounded-xl p-5 flex items-start gap-4 block"
          >
            <div className="size-10 rounded-lg bg-accent/15 text-accent grid place-items-center">
              <Phone className="size-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">WhatsApp</div>
              <div className="font-medium">{WHATSAPP_DISPLAY}</div>
            </div>
          </a>
          <a
            href={`https://github.com/${GITHUB}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass card-hover rounded-xl p-5 flex items-start gap-4 block"
          >
            <div className="size-10 rounded-lg bg-secondary text-foreground grid place-items-center">
              <Github className="size-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">GitHub</div>
              <div className="font-medium">{GITHUB}</div>
            </div>
          </a>
          <a
            href={`https://linkedin.com/in/${LINKEDIN}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass card-hover rounded-xl p-5 flex items-start gap-4 block"
          >
            <div className="size-10 rounded-lg bg-secondary text-foreground grid place-items-center">
              <Linkedin className="size-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">LinkedIn</div>
              <div className="font-medium">{LINKEDIN}</div>
            </div>
          </a>
          <div className="glass rounded-xl p-5 flex items-start gap-4">
            <div className="size-10 rounded-lg bg-secondary text-foreground grid place-items-center">
              <MapPin className="size-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Location</div>
              <div className="font-medium">Nairobi, Kenya</div>
            </div>
          </div>
        </div>
        <form onSubmit={onSubmit} className="lg:col-span-3 glass rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Name" name="name" required />
            <Field label="Email Address" name="email" type="email" required />
            <Field label="Phone Number" name="phone" type="tel" />
            <Field label="Company / Organization" name="company" />
            <SelectField
              label="Service Needed"
              name="service"
              options={[
                "Web Application",
                "Mobile App",
                "Backend / API",
                "Business System",
                "AI Integration / AI System",
                "Fleet Management System",
                "Document Management System",
                "Database Design",
                "UI/UX & Frontend",
                "Deployment & Maintenance",
                "Other",
              ]}
            />
            <SelectField
              label="Project Budget (KES)"
              name="budget"
              options={[
                "Under KES 50,000",
                "KES 50,000 – 150,000",
                "KES 150,000 – 400,000",
                "KES 400,000 – 1,000,000",
                "KES 1,000,000+",
                "Not sure yet",
              ]}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={5}
              maxLength={2000}
              className="w-full rounded-lg bg-background/50 border border-border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Tell us about your project, goals, and timeline..."
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-lg shadow-primary/30"
          >
            Send Project Brief <ArrowRight className="size-4" />
          </button>
          {sent && (
            <p className="text-sm text-accent">
              Opening WhatsApp with your project brief… If nothing happens, message us at{" "}
              {WHATSAPP_DISPLAY}.
            </p>
          )}
        </form>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
        {label}
        {required && " *"}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={200}
        className="w-full rounded-lg bg-background/50 border border-border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      <select
        name={name}
        className="w-full rounded-lg bg-background/50 border border-border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-sidebar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={LOGO_SRC}
                alt={`${COMPANY} logo`}
                className="h-16 w-auto max-w-full rounded-lg object-contain bg-white/95 px-2 py-1.5"
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building reliable web, mobile, backend, and business software solutions from Nairobi,
              Kenya.
            </p>
          </div>
          <FooterCol
            title="Company"
            links={[
              { label: "About", href: "/about" },
              { label: "Services", href: "/services" },
              { label: "Process", href: "/process" },
              { label: "Projects", href: "/projects" },
              { label: "Contact", href: "/contact" },
            ]}
          />
          <FooterCol
            title="Services"
            links={[
              { label: "Web Development", href: "/services" },
              { label: "Mobile App Development", href: "/services" },
              { label: "Backend APIs", href: "/services" },
              { label: "Business Systems", href: "/services" },
              { label: "Deployment Support", href: "/services" },
            ]}
          />
          <div>
            <h4 className="font-semibold mb-4 text-sm">Contact</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="hover:text-foreground inline-flex items-center gap-2"
                >
                  <Mail className="size-4" /> Email
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground inline-flex items-center gap-2"
                >
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`https://github.com/${GITHUB}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground inline-flex items-center gap-2"
                >
                  <Github className="size-4" /> GitHub
                </a>
              </li>
              <li>
                <a
                  href={`https://linkedin.com/in/${LINKEDIN}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground inline-flex items-center gap-2"
                >
                  <Linkedin className="size-4" /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© 2026 {COMPANY}. All rights reserved. Built with a software-first mindset.</p>
          <p className="flex items-center gap-2">
            <Cpu className="size-3.5" /> Nairobi · Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="font-semibold mb-4 text-sm">{title}</h4>
      <ul className="space-y-2.5 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="hover:text-foreground transition">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function useCountUp(target: number, duration = 1500) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min((t - start) / duration, 1);
              setVal(Math.floor(p * target));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return { val, ref };
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { val, ref } = useCountUp(value);
  return (
    <div className="glass rounded-2xl p-6 text-center card-hover">
      <div className="text-4xl sm:text-5xl font-bold text-gradient">
        <span ref={ref}>{val}</span>
        {suffix}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function Counters() {
  return (
    <section className="py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <StatItem key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <Section
      id="testimonials"
      eyebrow="Trust"
      title="What Clients Say"
      subtitle="Honest feedback from the people we've shipped systems for."
    >
      <div className="grid md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="glass rounded-2xl p-7 card-hover flex flex-col">
            <Quote className="size-7 text-accent mb-4" />
            <blockquote className="text-sm text-foreground/90 leading-relaxed flex-1">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-5 pt-5 border-t border-border">
              <div className="font-semibold text-sm">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

function TrustedPartners() {
  return (
    <section className="py-14 sm:py-18 border-y border-border bg-sidebar/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.5fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-muted-foreground">
              <Award className="size-3.5 text-accent" />
              Delivery proof
            </div>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">
              Trusted on practical business systems.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              A quick view of the business platforms, agency websites, logistics tools, and
              verification systems already shaped by our delivery process.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TRUSTED_PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="rounded-xl border border-border bg-background/55 p-4 transition hover:border-accent/40 hover:bg-secondary/35"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground grid place-items-center text-xs font-bold">
                    {partner.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{partner.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{partner.type}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Insights() {
  const [openNote, setOpenNote] = useState<string | null>(null);

  return (
    <Section
      id="insights"
      eyebrow="Insights"
      title="Notes from the Workshop"
      subtitle="Short, practical write-ups on the tools and decisions behind the systems we build."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {INSIGHTS.map((p) => {
          const isOpen = openNote === p.title;
          return (
            <article key={p.title} className="glass rounded-2xl p-7 card-hover flex flex-col">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="text-accent font-semibold uppercase tracking-wider">{p.tag}</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="size-3" /> {p.date} · {p.readTime}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-3 leading-snug">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.excerpt}</p>
              {isOpen && (
                <p className="mt-4 border-t border-border pt-4 text-sm text-foreground/85 leading-relaxed">
                  {p.details}
                </p>
              )}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setOpenNote(isOpen ? null : p.title)}
                  aria-expanded={isOpen}
                  className="inline-flex items-center gap-1.5 text-sm text-accent font-medium hover:gap-2.5 transition-all"
                >
                  {isOpen ? "Show less" : "View note"}
                  <ChevronDown
                    className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <a
                  href={`/blog/${p.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Read article <ArrowRight className="size-4" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Frequently Asked Questions"
      subtitle="Quick answers to the things clients ask us most often."
    >
      <div className="max-w-3xl space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="glass rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-secondary/40 transition"
              >
                <span className="font-medium text-sm sm:text-base flex items-center gap-3">
                  <HelpCircle className="size-4 text-accent shrink-0" />
                  {f.q}
                </span>
                <ChevronDown
                  className={`size-4 text-muted-foreground shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 size-14 rounded-full grid place-items-center shadow-2xl bg-[#25D366] text-white hover:scale-110 transition-transform"
    >
      <MessageCircle className="size-7" />
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
    </a>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      {children}
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

function Index() {
  const isCompact = useIsCompactLayout();

  useEffect(() => {
    if (!isCompact) return;
    const id = window.location.hash.replace("#", "");
    if (!id) return;

    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [isCompact]);

  return (
    <PageShell>
      <main>
        <Hero />
        <Counters />
        {isCompact ? (
          <>
            <About />
            <Team />
            <Services />
            <Solutions />
            <Process />
            <Projects />
            <Testimonials />
            <TrustedPartners />
            <Technologies />
            <Industries />
            <Why />
            <Insights />
            <FAQ />
            <CTA />
            <Contact />
          </>
        ) : (
          <>
            <Services />
            <Solutions />
            <Projects />
            <Testimonials />
            <TrustedPartners />
            <CTA />
          </>
        )}
      </main>
    </PageShell>
  );
}

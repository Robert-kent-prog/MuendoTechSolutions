export interface InsightMeta {
  slug: string;
  tag: string;
  category: string;
  date: string;
  publishedAt: string;
  readTime: string;
  title: string;
  excerpt: string;
  details: string;
}

export const BLOG_CATEGORIES = [
  "All Posts",
  "Software Development",
  "Websites & SEO",
  "Business Automation",
  "Payments",
  "AI & Automation",
  "Deployment",
  "Product & Design",
  "Security",
];

export const INSIGHTS_META: InsightMeta[] = [
  {
    slug: "choosing-between-mern-and-spring-boot-for-kenyan-smes",
    tag: "Backend",
    category: "Software Development",
    date: "Dec 2025",
    publishedAt: "2025-12-10",
    readTime: "8 min read",
    title: "Choosing Between MERN and Spring Boot for Kenyan SMEs",
    excerpt:
      "A practical breakdown of when MongoDB + Express + React + Node beats a Java/Spring Boot stack for African SMEs: cost, hiring, hosting, and scaling considerations.",
    details:
      "MERN works well when the business needs fast iteration, dashboards, APIs, and a JavaScript-first team. Spring Boot is a better fit when the project needs stricter enterprise patterns, complex transactions, and long-term Java maintainability.",
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
      "How to wire OpenAI/Gemini into existing systems for document understanding, customer support, and workflow automation, and where to draw the line.",
    details:
      "The best AI features start with a narrow workflow: document extraction, customer support drafts, search, or report summaries. Keeping prompts, limits, and fallbacks explicit protects budget and makes the feature easier to support.",
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
  },
  {
    slug: "how-much-does-a-business-website-cost-in-kenya-in-2026",
    tag: "Websites",
    category: "Websites & SEO",
    date: "Jun 2026",
    publishedAt: "2026-06-22",
    readTime: "10 min read",
    title: "How Much Does a Business Website Cost in Kenya in 2026?",
    excerpt:
      "A practical pricing guide for Kenyan SMEs comparing simple business websites, e-commerce builds, custom portals, SEO setup, hosting, and ongoing maintenance.",
    details:
      "Website pricing depends on the job the site must do. A small brochure website costs less than an e-commerce store, booking platform, customer portal, or payment-ready business system because each layer adds design, data, integrations, testing, and support needs.",
  },
  {
    slug: "website-maintenance-checklist-for-kenyan-businesses",
    tag: "Maintenance",
    category: "Websites & SEO",
    date: "Jun 2026",
    publishedAt: "2026-06-22",
    readTime: "9 min read",
    title: "Website Maintenance Checklist for Kenyan Businesses",
    excerpt:
      "The monthly checks every business website should run: backups, security, forms, speed, SEO basics, analytics, uptime, content updates, and conversion paths.",
    details:
      "Website maintenance protects visibility, leads, and customer trust. The goal is to catch broken forms, slow pages, expired content, security issues, and tracking problems before they quietly cost the business money.",
  },
  {
    slug: "website-vs-web-app-what-should-your-business-build-first",
    tag: "Product",
    category: "Business Automation",
    date: "Jun 2026",
    publishedAt: "2026-06-22",
    readTime: "10 min read",
    title: "Website vs Web App: What Should Your Business Build First?",
    excerpt:
      "A decision guide for SMEs choosing between a marketing website, e-commerce site, customer portal, internal dashboard, POS system, or fully custom web application.",
    details:
      "A website explains the business and captures attention. A web app runs a workflow. Many businesses need both eventually, but the first build should match the most urgent business problem.",
  },
  {
    slug: "pos-system-features-every-kenyan-retail-shop-needs",
    tag: "Retail",
    category: "Business Automation",
    date: "Jun 2026",
    publishedAt: "2026-06-18",
    readTime: "9 min read",
    title: "POS System Features Every Kenyan Retail Shop Needs",
    excerpt:
      "A practical checklist for shops, pharmacies, boutiques, mini marts, and hardware stores planning a POS system in Kenya.",
    details:
      "A useful POS system should reduce daily mistakes, make stock easier to control, and give the owner a clear view of sales, expenses, and profit without depending on notebooks or scattered spreadsheets.",
  },
  {
    slug: "google-business-profile-and-local-seo-basics-for-kenyan-smes",
    tag: "Local SEO",
    category: "Websites & SEO",
    date: "May 2026",
    publishedAt: "2026-05-20",
    readTime: "8 min read",
    title: "Google Business Profile and Local SEO Basics for Kenyan SMEs",
    excerpt:
      "How Kenyan businesses can improve local visibility with accurate business details, reviews, service pages, photos, and website links.",
    details:
      "Local SEO is about being found when nearby customers search for services. A good website helps, but Google Business Profile, consistent contact details, reviews, and local content also matter.",
  },
  {
    slug: "mpesa-payment-reconciliation-for-kenyan-business-systems",
    tag: "Payments",
    category: "Payments",
    date: "Apr 2026",
    publishedAt: "2026-04-17",
    readTime: "9 min read",
    title: "M-Pesa Payment Reconciliation for Kenyan Business Systems",
    excerpt:
      "Why STK Push alone is not enough, and how admins should reconcile receipts, invoices, orders, failed callbacks, and duplicate attempts.",
    details:
      "Payment reconciliation is the difference between accepting M-Pesa and operating M-Pesa confidently. Admins need clear records that connect receipts to customers, invoices, orders, and business actions.",
  },
  {
    slug: "school-management-systems-in-kenya-what-to-build-first",
    tag: "EdTech",
    category: "Business Automation",
    date: "Mar 2026",
    publishedAt: "2026-03-19",
    readTime: "9 min read",
    title: "School Management Systems in Kenya: What to Build First",
    excerpt:
      "A practical first-release roadmap for Kenyan schools: admissions, students, fees, attendance, exams, parent communication, and admin roles.",
    details:
      "Schools often need many modules, but the first useful system should focus on the records and workflows that create the most daily pressure for administrators, teachers, parents, and finance teams.",
  },
  {
    slug: "clinic-and-vaccination-tracker-features-for-kenyan-health-teams",
    tag: "HealthTech",
    category: "Business Automation",
    date: "Feb 2026",
    publishedAt: "2026-02-18",
    readTime: "8 min read",
    title: "Clinic and Vaccination Tracker Features for Kenyan Health Teams",
    excerpt:
      "How clinics can manage patients, vaccine schedules, dose history, stock visibility, reminders, and admin reports in one practical system.",
    details:
      "Healthcare software should reduce missed follow-ups and improve record visibility without making the clinic team fight complicated screens during patient care.",
  },
  {
    slug: "website-redesign-checklist-for-kenyan-companies",
    tag: "Redesign",
    category: "Websites & SEO",
    date: "Jan 2026",
    publishedAt: "2026-01-21",
    readTime: "8 min read",
    title: "Website Redesign Checklist for Kenyan Companies",
    excerpt:
      "What to review before redesigning a company website: content, mobile experience, SEO, forms, speed, analytics, redirects, and calls to action.",
    details:
      "A redesign should improve business results, not just visual style. Before changing the look, the team should understand what currently works, what breaks, and which pages bring enquiries.",
  },
  {
    slug: "business-email-setup-for-kenyan-smes",
    tag: "Email",
    category: "Websites & SEO",
    date: "Dec 2025",
    publishedAt: "2025-12-18",
    readTime: "7 min read",
    title: "Business Email Setup for Kenyan SMEs",
    excerpt:
      "Why professional email matters, what to prepare before setup, and how DNS, SPF, DKIM, DMARC, aliases, and staff access fit together.",
    details:
      "Professional email helps a business look credible, but the setup should be planned properly so messages deliver reliably and staff accounts remain controlled.",
  },
  {
    slug: "ecommerce-website-features-for-kenyan-online-shops",
    tag: "E-Commerce",
    category: "Websites & SEO",
    date: "Nov 2025",
    publishedAt: "2025-11-20",
    readTime: "9 min read",
    title: "E-Commerce Website Features for Kenyan Online Shops",
    excerpt:
      "A practical feature checklist for online shops: product catalog, cart, checkout, M-Pesa planning, delivery, admin controls, stock, and customer communication.",
    details:
      "A good e-commerce website should make products easy to browse, orders easy to place, payments easy to verify, and admin work simple enough for the shop owner to maintain.",
  },
  {
    slug: "fleet-management-software-for-kenyan-logistics-teams",
    tag: "Logistics",
    category: "Business Automation",
    date: "Oct 2025",
    publishedAt: "2025-10-16",
    readTime: "8 min read",
    title: "Fleet Management Software for Kenyan Logistics Teams",
    excerpt:
      "What transport operators should track first: vehicles, drivers, trips, fuel, maintenance, expenses, documents, and reports.",
    details:
      "Fleet software should give transport managers visibility into vehicles and costs without forcing drivers and admins into complicated workflows that slow operations.",
  },
  {
    slug: "pos-system-cost-in-kenya-what-shop-owners-should-budget-for",
    tag: "POS",
    category: "Business Automation",
    date: "Oct 2026",
    publishedAt: "2026-10-13",
    readTime: "8 min read",
    title: "POS System Cost in Kenya: What Shop Owners Should Budget For",
    excerpt:
      "A practical guide to what drives the cost of a point of sale system for a Kenyan shop: branches, hardware, stock, M-Pesa, offline needs, staff roles, data import and support.",
    details:
      "There is no single price for a POS system because a one-till kiosk and a multi-branch pharmacy need very different software. Understanding the cost drivers helps you ask for a quote that is complete and comparable.",
  },
  {
    slug: "mobile-app-development-cost-in-kenya-android-and-ios",
    tag: "Mobile",
    category: "Software Development",
    date: "Oct 2026",
    publishedAt: "2026-10-13",
    readTime: "8 min read",
    title: "Mobile App Development Cost in Kenya: Android and iOS",
    excerpt:
      "What shapes the budget for a mobile app in Kenya: one codebase or two, the backend and admin panel behind it, payments, maps, chat, store accounts, testing and ongoing updates.",
    details:
      "A mobile app is rarely just a mobile app. Most of the cost sits in the backend, the admin dashboard and the testing that make the screens useful in real conditions.",
  },
  {
    slug: "custom-web-application-cost-in-kenya-what-affects-the-budget",
    tag: "Web Apps",
    category: "Software Development",
    date: "Oct 2026",
    publishedAt: "2026-10-13",
    readTime: "8 min read",
    title: "Custom Web Application Cost in Kenya: What Affects the Budget",
    excerpt:
      "Why custom web apps and dashboards are priced differently from websites, and how roles, workflows, reports, integrations and data migration shape the budget.",
    details:
      "A custom web application is software that models how your business works. Its cost follows the amount of logic it carries, not the number of pages it shows.",
  },
  {
    slug: "website-and-system-maintenance-cost-in-kenya-retainers-explained",
    tag: "Maintenance",
    category: "Websites & SEO",
    date: "Oct 2026",
    publishedAt: "2026-10-13",
    readTime: "7 min read",
    title: "Website and System Maintenance Cost in Kenya: Retainers Explained",
    excerpt:
      "What a maintenance plan should cover, how retainers differ from hourly fixes, and which running costs such as hosting, domains and SSL are separate from development.",
    details:
      "Launching a website or system is not the end of the cost. Maintenance keeps it secure, fast and accurate, and a clear plan avoids expensive emergencies.",
  },
  {
    slug: "mpesa-daraja-integration-cost-in-kenya-what-to-expect",
    tag: "M-Pesa",
    category: "Payments",
    date: "Oct 2026",
    publishedAt: "2026-10-13",
    readTime: "8 min read",
    title: "M-Pesa Daraja Integration Cost in Kenya: What to Expect",
    excerpt:
      "What shapes the cost of integrating M-Pesa into a website, app or POS: payment flows, callbacks, reconciliation, Safaricom approvals, testing and the fees that are not development costs.",
    details:
      "Accepting an M-Pesa payment is only the visible part. The cost sits in making payments reliable: handling callbacks, matching money to orders and giving your team a way to check what happened.",
  },
];

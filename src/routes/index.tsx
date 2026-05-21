import { createFileRoute } from "@tanstack/react-router";
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
import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";

const COMPANY = "MuendoTech Solutions";
const EMAIL = "muendotechsolutions@gmail.com";
const WHATSAPP = "+254793587026";
const WHATSAPP_DISPLAY = "+254 793 587 026";
const GITHUB = "Robert-kent-prog";
const LINKEDIN = "robert-muendo-0329a0285";
const SITE_URL = "https://muendotechsolutions.com";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: `${COMPANY} — Software Development Company in Nairobi, Kenya` },
      {
        name: "description",
        content:
          "Nairobi-based software development company building reliable web apps, mobile apps, backend APIs, AI integrations, and business systems for startups, SMEs, schools, and enterprises across Kenya.",
      },
      {
        name: "keywords",
        content:
          "software development Nairobi, web development Kenya, mobile app development Kenya, backend APIs, business systems, AI integration Kenya, M-Pesa integration, React, Node.js, MongoDB",
      },
      { name: "author", content: COMPANY },
      { property: "og:title", content: `${COMPANY} — Build Reliable Software for Your Business` },
      {
        property: "og:description",
        content:
          "We design and build modern web platforms, mobile apps, backend APIs, AI systems, and database-driven business solutions from Nairobi, Kenya.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:site_name", content: COMPANY },
      { property: "og:locale", content: "en_KE" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: `${COMPANY} — Software Development Company in Nairobi, Kenya`,
      },
      {
        name: "twitter:description",
        content: "Web, mobile, backend, AI and business software built from Nairobi, Kenya.",
      },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: COMPANY,
          url: SITE_URL,
          email: EMAIL,
          telephone: WHATSAPP,
          founder: { "@type": "Person", name: "Robert Muendo" },
          address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
          areaServed: "KE",
          sameAs: [`https://github.com/${GITHUB}`, `https://linkedin.com/in/${LINKEDIN}`],
        }),
      },
    ],
  }),
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Insights", href: "#insights" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { value: 12, suffix: "+", label: "Projects Shipped" },
  { value: 8, suffix: "+", label: "Industries Served" },
  { value: 100, suffix: "%", label: "Kenyan-Built" },
  { value: 5, suffix: "+", label: "Years Coding" },
];

const TESTIMONIALS = [
  {
    name: "James Otieno",
    role: "Founder, Nairobi Retail SME",
    quote:
      "MuendoTech rebuilt our bookkeeping flow into a clean web platform. Daily sales, expenses, and profit are now one click away. Easy to work with and very responsive.",
  },
  {
    name: "Faith Wanjiru",
    role: "Operations Manager, Logistics Firm",
    quote:
      "The fleet management system replaced three spreadsheets. We finally have visibility on every vehicle, driver, and trip. Worth every shilling.",
  },
  {
    name: "Dr. Mwangi",
    role: "Clinic Director",
    quote:
      "Our vaccination tracking system handles patient records and reminders without drama. Robert understood the workflow before writing a single line of code.",
  },
];

const FAQS = [
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
];

const INSIGHTS = [
  {
    tag: "Backend",
    date: "Jan 2026",
    title: "Choosing Between MERN and Spring Boot for Kenyan SMEs",
    excerpt:
      "A practical breakdown of when MongoDB + Express + React + Node beats a Java/Spring Boot stack for African SMEs — cost, hiring, hosting, and scaling considerations.",
  },
  {
    tag: "Payments",
    date: "Feb 2026",
    title: "Integrating M-Pesa Daraja the Right Way",
    excerpt:
      "STK Push, callbacks, reconciliation, security, and the production gotchas nobody tells you about until your first failed transaction.",
  },
  {
    tag: "AI",
    date: "Mar 2026",
    title: "Adding AI to Business Software Without Burning Budget",
    excerpt:
      "How to wire OpenAI/Gemini into existing systems for document understanding, customer support, and workflow automation — and where to draw the line.",
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
];

const SOLUTIONS = [
  "Retail and bookkeeping systems",
  "School and institution management systems",
  "Exam verification and attendance systems",
  "Service marketplace platforms",
  "Fleet & vehicle management systems",
  "Digital document management systems",
  "AI-powered business assistants",
  "E-commerce websites",
  "Inventory management systems",
  "Booking and appointment platforms",
  "M-Pesa-integrated payment platforms",
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
    items: ["Node.js", "Express.js", "Spring Boot", "REST APIs", "MVC Architecture"],
  },
  { group: "Databases", items: ["MongoDB", "MySQL", "SQLite"] },
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
    stack: ["React Native", "Expo", "Node.js", "MongoDB", "M-Pesa Daraja"],
  },
  {
    tag: "Logistics / Fleet",
    title: "Fleet Management System",
    desc: "Vehicle and fleet management platform for tracking vehicles, drivers, fuel, maintenance schedules, trip logs, and expense reporting — built for Kenyan transport and logistics operators.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Maps"],
  },
  {
    tag: "DocTech / Compliance",
    title: "Digital File & Document Management System",
    desc: "Custom digital filing system built for a Kenyan client to organise company documents — KRA filings, fire safety certificates, insurance policies, licences and permits — with expiry reminders, role-based access, and secure storage.",
    stack: ["React", "Node.js", "MongoDB", "JWT", "Cloud Storage"],
  },
  {
    tag: "AI / Automation",
    title: "AI Integrations & Custom AI Systems",
    desc: "Built and integrated AI features into business platforms — including AI chat assistants, document understanding, smart search, and workflow automation powered by LLMs (OpenAI, Gemini).",
    stack: ["OpenAI", "Gemini", "LangChain", "Node.js", "RAG"],
  },
  {
    tag: "HealthTech / MERN",
    title: "Vaccination Tracking System",
    desc: "Web application for hospitals and clinics to monitor and track childhood vaccinations — patient records, immunisation schedules, due-date reminders, and reporting dashboards for healthcare workers.",
    stack: ["MongoDB", "Express", "React", "Node.js", "JWT"],
  },
  {
    tag: "Mobility / MERN",
    title: "Carpool & Ride-Share Platform",
    desc: "Ride-share web platform that lets private car owners register as drivers and offset fuel costs by carrying passengers travelling in the same direction — with route matching, booking, ratings, and secure auth.",
    stack: ["MongoDB", "Express", "React", "Node.js", "JWT"],
  },
  {
    tag: "Political / Web",
    title: "Chama Cha Uzalendo (CCU) — Party Website",
    desc: "Designed and built the official-style web presence for Chama Cha Uzalendo (CCU), a registered Kenyan political party founded in 2004 — featuring party history, leadership, news updates, and member engagement sections.",
    stack: ["React", "Tailwind", "Responsive", "SEO"],
  },
  {
    tag: "International / Agency Web",
    title: "Xelvora — Pakistan Digital Agency Website",
    desc: "Built the corporate website for Xelvora, a Pakistan-based digital agency offering web, mobile, AI, SEO, and branding services — with services, products, portfolio, blogs, and contact sections.",
    stack: ["React", "Tailwind", "Responsive", "SEO"],
  },
  {
    tag: "EdTech / Security",
    title: "Exam Administration Verification System",
    desc: "Secure university exam-card and attendance verification platform with eligibility checks, barcode verification, JWT role access, offline-first attendance capture, audit logging, PDF reports, Redis caching, and MongoDB optimization.",
    stack: ["MongoDB", "Node.js", "JWT", "Redis", "PDF"],
  },
  {
    tag: "FinTech / Retail",
    title: "Retail Bookkeeping Platform",
    desc: "Full-stack bookkeeping system for a Kenyan phone retail business with admin, accountant, and sales workflows — KES-based reporting, daily sales, expenses, and profit tracking.",
    stack: ["React", "Vite", "Express", "MongoDB", "Zod"],
  },
  {
    tag: "Education",
    title: "Institutional Website",
    desc: "College site with course information, student access, admin updates, authentication flows, responsive UI, and CRUD features.",
    stack: ["React", "Node.js", "MySQL"],
  },
  {
    tag: "E-Commerce",
    title: "E-Commerce Platform",
    desc: "Boutique commerce platform with product uploads, category management, shopping cart, customer details, and KES-priced catalog browsing.",
    stack: ["React", "Express", "MongoDB"],
  },
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
  const ids = NAV.map((n) => n.href.replace("#", ""));
  const active = useActiveSection(ids);
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <img src={logoDark} alt={`${COMPANY} logo`} className="h-9 w-auto dark-logo" />
          <img src={logoLight} alt={`${COMPANY} logo`} className="h-9 w-auto light-logo" />
          <span className="font-bold tracking-tight text-foreground hidden sm:inline">
            {COMPANY}
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => {
            const id = n.href.replace("#", "");
            const isActive = active === id;
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
            href="#contact"
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
              const id = n.href.replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={n.href}
                  href={n.href}
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
              href="#contact"
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
      className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 bg-hero-gradient overflow-hidden"
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
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-lg shadow-primary/30"
            >
              Start a Project <ArrowRight className="size-4" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg glass text-foreground font-medium hover:bg-white/10 transition"
            >
              View Our Services
            </a>
            <a
              href="#contact"
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
    <section id={id} className="py-20 sm:py-28">
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

function About() {
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

function Services() {
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

function Solutions() {
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

function Why() {
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

function Process() {
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

function Projects() {
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

function Technologies() {
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

function Industries() {
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

function CTA() {
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
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
              >
                Start a Project <ArrowRight className="size-4" />
              </a>
              <a
                href="#contact"
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

function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      `Name: ${f.get("name")}`,
      `Email: ${f.get("email")}`,
      `Phone: ${f.get("phone")}`,
      `Company: ${f.get("company")}`,
      `Service: ${f.get("service")}`,
      `Budget: ${f.get("budget")}`,
      "",
      `Message:`,
      `${f.get("message")}`,
    ].join("\n");
    const subject = `New Project Inquiry — ${f.get("name") || "Website Lead"}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
              Opening your email client… If nothing happens, email us at {EMAIL}.
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
            <div className="flex items-center gap-2 mb-4">
              <img src={logoDark} alt={`${COMPANY} logo`} className="h-9 w-auto dark-logo" />
              <img src={logoLight} alt={`${COMPANY} logo`} className="h-9 w-auto light-logo" />
              <span className="font-bold">{COMPANY}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building reliable web, mobile, backend, and business software solutions from Nairobi,
              Kenya.
            </p>
          </div>
          <FooterCol
            title="Company"
            links={[
              { label: "About", href: "#about" },
              { label: "Services", href: "#services" },
              { label: "Process", href: "#process" },
              { label: "Projects", href: "#projects" },
              { label: "Contact", href: "#contact" },
            ]}
          />
          <FooterCol
            title="Services"
            links={[
              { label: "Web Development", href: "#services" },
              { label: "Mobile App Development", href: "#services" },
              { label: "Backend APIs", href: "#services" },
              { label: "Business Systems", href: "#services" },
              { label: "Deployment Support", href: "#services" },
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

function Testimonials() {
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

function Insights() {
  return (
    <Section
      id="insights"
      eyebrow="Insights"
      title="Notes from the Workshop"
      subtitle="Short, practical write-ups on the tools and decisions behind the systems we build."
    >
      <div className="grid md:grid-cols-3 gap-5">
        {INSIGHTS.map((p) => (
          <article key={p.title} className="glass rounded-2xl p-7 card-hover flex flex-col">
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <span className="text-accent font-semibold uppercase tracking-wider">{p.tag}</span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="size-3" /> {p.date}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-3 leading-snug">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.excerpt}</p>
            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-accent font-medium hover:gap-2.5 transition-all"
            >
              Discuss this topic <ArrowRight className="size-4" />
            </a>
          </article>
        ))}
      </div>
    </Section>
  );
}

function FAQ() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
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

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Counters />
        <About />
        <Services />
        <Solutions />
        <Why />
        <Process />
        <Projects />
        <Testimonials />
        <Technologies />
        <Industries />
        <Insights />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

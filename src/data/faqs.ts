export interface FAQItem {
  q: string;
  a: string;
}

export const FAQS: FAQItem[] = [
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
    a: "Pricing depends on scope. Small business websites start from KES 25,000. Custom systems and mobile apps typically range from KES 150,000 to KES 1,000,000+. We always provide a written estimate after the discovery call.",
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

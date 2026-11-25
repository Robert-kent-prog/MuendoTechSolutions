import {
  FileText,
  Calculator,
  Percent,
  Smartphone,
  TrendingUp,
  Scale,
  Landmark,
  MessageCircle,
  QrCode,
  Mail,
  KeyRound,
  Tag,
  type LucideIcon,
} from "lucide-react";

export type ToolCategory = "All" | "Billing & Tax" | "Retail & Finance" | "Web & Utilities";

export const TOOL_CATEGORIES: ToolCategory[] = [
  "All",
  "Billing & Tax",
  "Retail & Finance",
  "Web & Utilities",
];

export interface FreeToolItem {
  slug: string;
  title: string;
  category: Exclude<ToolCategory, "All">;
  summary: string;
  href?: "/tools/invoice-generator" | "/quote";
  status: "live" | "coming-soon";
  badge?: string;
  icon: LucideIcon;
  keywords: string[];
}

export const FREE_TOOLS: FreeToolItem[] = [
  {
    slug: "invoice-generator",
    title: "Invoice, Quote & 80mm Receipt Generator",
    category: "Billing & Tax",
    summary:
      "Create professional A4 PDF invoices, quotations, proformas, or 80mm thermal receipts in KES or other currencies with 16% VAT and automatic amount in words.",
    href: "/tools/invoice-generator",
    status: "live",
    badge: "Flagship",
    icon: FileText,
    keywords: ["invoice", "receipt", "80mm", "pdf", "ksh", "kes", "quotation", "proforma", "vat"],
  },
  {
    slug: "project-quote-guide",
    title: "Software Project Budget Guide",
    category: "Billing & Tax",
    summary:
      "Estimate an indicative KES budget band for a business website, web app, mobile app, POS system, or AI integration in a few clicks.",
    href: "/quote",
    status: "live",
    badge: "Interactive",
    icon: Calculator,
    keywords: ["quote", "budget", "kes", "website cost", "software price"],
  },
  {
    slug: "kenya-paye-calculator",
    title: "Kenya PAYE, SHIF, NSSF & Housing Levy Calculator",
    category: "Billing & Tax",
    summary:
      "Calculate Kenyan net pay, KRA PAYE bands, SHIF (2.75%), NSSF, and Affordable Housing Levy (1.5%) from monthly gross salary.",
    status: "coming-soon",
    icon: Calculator,
    keywords: ["paye", "kra", "shif", "nssf", "housing levy", "salary", "payroll", "kenya"],
  },
  {
    slug: "vat-calculator",
    title: "Kenya VAT Calculator (16%)",
    category: "Billing & Tax",
    summary:
      "Add 16% Kenya VAT to a net price or extract VAT from a VAT-inclusive figure, with quick presets for Uganda, Tanzania, and custom rates.",
    status: "coming-soon",
    icon: Percent,
    keywords: ["vat", "tax", "16%", "kra", "inclusive", "exclusive"],
  },
  {
    slug: "mpesa-charges-calculator",
    title: "M-Pesa Transaction Charges Calculator",
    category: "Billing & Tax",
    summary:
      "Check M-Pesa Send Money, Agent Withdrawal, and Paybill tariff bands in KES before paying suppliers or pricing customer orders.",
    status: "coming-soon",
    icon: Smartphone,
    keywords: ["mpesa", "m-pesa", "safaricom", "tariffs", "charges", "send money", "withdraw"],
  },
  {
    slug: "profit-margin-calculator",
    title: "Profit Margin & Markup Calculator",
    category: "Retail & Finance",
    summary:
      "Compute gross margin %, markup %, and KES profit per unit from buying cost and selling price for retail and wholesale stock.",
    status: "coming-soon",
    icon: TrendingUp,
    keywords: ["margin", "markup", "profit", "retail", "pos", "pricing"],
  },
  {
    slug: "discount-calculator",
    title: "Discount & Sale Price Calculator",
    category: "Retail & Finance",
    summary:
      "Find the final KES sale price and customer savings from any percentage or fixed discount.",
    status: "coming-soon",
    icon: Tag,
    keywords: ["discount", "sale", "percent off", "retail"],
  },
  {
    slug: "loan-calculator",
    title: "Loan & SACCO Repayment Calculator",
    category: "Retail & Finance",
    summary:
      "Compare reducing balance vs flat-rate monthly installments, total interest, and payoff schedule for Kenyan loans and asset finance.",
    status: "coming-soon",
    icon: Landmark,
    keywords: ["loan", "sacco", "interest", "emi", "reducing balance", "repayment"],
  },
  {
    slug: "break-even-calculator",
    title: "Break-Even Calculator",
    category: "Retail & Finance",
    summary:
      "See how many units and how much KES monthly revenue your business needs to cover rent, salaries, and unit costs.",
    status: "coming-soon",
    icon: Scale,
    keywords: ["break even", "fixed costs", "unit economics", "sme"],
  },
  {
    slug: "whatsapp-link-generator",
    title: "WhatsApp Click-to-Chat Link Generator",
    category: "Web & Utilities",
    summary:
      "Build a Kenyan +254 WhatsApp link with a prefilled customer message, live preview, and ready-to-share URL.",
    status: "coming-soon",
    icon: MessageCircle,
    keywords: ["whatsapp", "wa.me", "chat link", "marketing"],
  },
  {
    slug: "qr-code-generator",
    title: "QR Code Generator",
    category: "Web & Utilities",
    summary:
      "Generate crisp downloadable QR codes for websites, WhatsApp chats, menus, and shop Wi-Fi directly in your browser.",
    status: "coming-soon",
    icon: QrCode,
    keywords: ["qr", "barcode", "wifi", "menu", "png"],
  },
  {
    slug: "email-signature-generator",
    title: "Email Signature Generator",
    category: "Web & Utilities",
    summary:
      "Create a clean HTML business email signature with phone, WhatsApp, and website links ready to paste into Gmail or Outlook.",
    status: "coming-soon",
    icon: Mail,
    keywords: ["email", "signature", "gmail", "outlook", "branding"],
  },
  {
    slug: "password-generator",
    title: "Password Generator & Strength Checker",
    category: "Web & Utilities",
    summary:
      "Generate strong random passwords using browser cryptography with instant strength feedback and zero network calls.",
    status: "coming-soon",
    icon: KeyRound,
    keywords: ["password", "security", "random", "generator"],
  },
];

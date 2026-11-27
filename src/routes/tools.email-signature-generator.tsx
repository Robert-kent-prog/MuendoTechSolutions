import { createFileRoute } from "@tanstack/react-router";
import { useId, useMemo, useState } from "react";
import { Check, Code2, Copy } from "lucide-react";
import { COMPANY, SITE_URL, breadcrumbSchema, pageHead } from "@/lib/seo";
import {
  buildEmailSignatureHtml,
  normalizeKenyanPhone,
  type EmailSignatureInput,
} from "@/lib/calculators";
import { ToolPageLayout, type ToolFaq } from "@/components/tools/ToolPageLayout";

const SIG_FAQS: ToolFaq[] = [
  {
    q: "How do I paste this signature into Gmail or Outlook?",
    a: "Click Copy for Gmail / Outlook above, open Gmail Settings -> Signature (or Outlook Mail -> Compose and reply -> Email signature), and press Ctrl+V (or Cmd+V). All links and styling stay intact.",
  },
  {
    q: "Why does the signature use an HTML table layout?",
    a: "Email clients like Outlook desktop, Apple Mail, and Gmail mobile strip modern CSS flexbox and grid rules. Inline-styled HTML tables render consistently across every email app.",
  },
];

export const Route = createFileRoute("/tools/email-signature-generator")({
  component: EmailSignatureGeneratorPage,
  head: () => {
    const head = pageHead({
      title: `Free Email Signature Generator for Gmail & Outlook | ${COMPANY}`,
      description:
        "Create a clean, mobile-friendly business email signature with phone, WhatsApp, email, and website links ready to paste into Gmail, Outlook, or Apple Mail.",
      path: "/tools/email-signature-generator",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: `Free Email Signature Generator | ${COMPANY}`,
            url: `${SITE_URL}/tools/email-signature-generator`,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "KES" },
            provider: { "@type": "Organization", name: COMPANY, url: SITE_URL },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Free Tools", path: "/tools" },
              { name: "Email Signature Generator", path: "/tools/email-signature-generator" },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: SIG_FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
});

const inputClass =
  "w-full rounded-lg border border-border bg-background/70 px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const labelClass = "block text-xs font-medium text-muted-foreground mb-1";

function EmailSignatureGeneratorPage() {
  const id = useId();
  const [form, setForm] = useState<EmailSignatureInput>({
    fullName: "",
    jobTitle: "",
    company: "",
    phone: "",
    whatsapp: "",
    email: "",
    website: "",
    location: "Nairobi, Kenya",
    accentHex: "#1d4ed8",
  });
  const [copyMode, setCopyMode] = useState<"idle" | "rich" | "html">("idle");

  const html = useMemo(() => buildEmailSignatureHtml(form), [form]);
  const waDigits = useMemo(() => normalizeKenyanPhone(form.whatsapp), [form.whatsapp]);
  const titleLine = [form.jobTitle.trim(), form.company.trim()].filter(Boolean).join(" | ");
  const siteDisplay = form.website.trim().replace(/^https?:\/\//i, "");

  function patch<K extends keyof EmailSignatureInput>(key: K, value: EmailSignatureInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function copyRichSignature() {
    try {
      if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
        const htmlBlob = new Blob([html], { type: "text/html" });
        const plainLines = [
          form.fullName.trim() || "Your Name",
          titleLine,
          [form.phone.trim(), form.email.trim(), siteDisplay].filter(Boolean).join(" | "),
          form.location.trim(),
        ].filter(Boolean);
        const textBlob = new Blob([plainLines.join("\n")], { type: "text/plain" });
        await navigator.clipboard.write([
          new ClipboardItem({ "text/html": htmlBlob, "text/plain": textBlob }),
        ]);
      } else {
        await navigator.clipboard.writeText(html);
      }
      setCopyMode("rich");
      setTimeout(() => setCopyMode("idle"), 2500);
    } catch {
      setCopyMode("idle");
    }
  }

  async function copyHtmlSource() {
    try {
      await navigator.clipboard.writeText(html);
      setCopyMode("html");
      setTimeout(() => setCopyMode("idle"), 2500);
    } catch {
      setCopyMode("idle");
    }
  }

  return (
    <ToolPageLayout
      breadcrumbLabel="Email Signature Generator"
      title="Email Signature Generator"
      subtitle="Build a clean business email signature with clickable phone, WhatsApp, and website links ready to paste straight into Gmail, Outlook, or Apple Mail."
      guideBlocks={[
        {
          heading: "Designed for business emails that convert",
          body: "Adding a direct WhatsApp link alongside your phone number and website makes it effortless for Kenyan clients to reach you from any email thread.",
        },
        {
          heading: "Need a matching company domain and website?",
          body: "We build fast business websites with custom domain email setup, contact workflows, and Google Business Profile optimization.",
        },
      ]}
      relatedEyebrow="Company Brand & Web Presence"
      relatedHeading="Business websites & custom domain setup"
      relatedSummary="Launch a sharp company website with matching branded email addresses, SEO foundations, and WhatsApp lead routing."
      relatedPrimarySlug="business-websites"
      relatedPrimaryLabel="Explore Business Websites"
      faqTitle="Questions about email signatures"
      faqs={SIG_FAQS}
    >
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 glass rounded-2xl p-6 border border-border space-y-3.5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
            Your Details
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor={`${id}-name`} className={labelClass}>
                Full name
              </label>
              <input
                id={`${id}-name`}
                type="text"
                value={form.fullName}
                onChange={(e) => patch("fullName", e.target.value)}
                placeholder="e.g. Wanjiku Kamau"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor={`${id}-title`} className={labelClass}>
                Job title / role
              </label>
              <input
                id={`${id}-title`}
                type="text"
                value={form.jobTitle}
                onChange={(e) => patch("jobTitle", e.target.value)}
                placeholder="e.g. Managing Director"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor={`${id}-company`} className={labelClass}>
                Company name
              </label>
              <input
                id={`${id}-company`}
                type="text"
                value={form.company}
                onChange={(e) => patch("company", e.target.value)}
                placeholder="e.g. Rift Valley Logistics"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor={`${id}-loc`} className={labelClass}>
                Location (optional)
              </label>
              <input
                id={`${id}-loc`}
                type="text"
                value={form.location}
                onChange={(e) => patch("location", e.target.value)}
                placeholder="Nairobi, Kenya"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor={`${id}-phone`} className={labelClass}>
                Phone
              </label>
              <input
                id={`${id}-phone`}
                type="tel"
                value={form.phone}
                onChange={(e) => patch("phone", e.target.value)}
                placeholder="+254 7XX XXX XXX"
                className={`${inputClass} font-mono`}
              />
            </div>
            <div>
              <label htmlFor={`${id}-wa`} className={labelClass}>
                WhatsApp number (optional)
              </label>
              <input
                id={`${id}-wa`}
                type="tel"
                value={form.whatsapp}
                onChange={(e) => patch("whatsapp", e.target.value)}
                placeholder="+254 7XX XXX XXX"
                className={`${inputClass} font-mono`}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor={`${id}-email`} className={labelClass}>
                Email address
              </label>
              <input
                id={`${id}-email`}
                type="email"
                value={form.email}
                onChange={(e) => patch("email", e.target.value)}
                placeholder="name@company.co.ke"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor={`${id}-web`} className={labelClass}>
                Website
              </label>
              <input
                id={`${id}-web`}
                type="text"
                value={form.website}
                onChange={(e) => patch("website", e.target.value)}
                placeholder="www.company.co.ke"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor={`${id}-accent`} className={labelClass}>
              Brand accent color
            </label>
            <div className="flex items-center gap-2.5">
              <input
                id={`${id}-accent`}
                type="color"
                value={form.accentHex}
                onChange={(e) => patch("accentHex", e.target.value)}
                className="h-9 w-11 cursor-pointer rounded border border-border bg-transparent p-0.5"
              />
              <span className="font-mono text-xs text-muted-foreground">{form.accentHex}</span>
            </div>
          </div>
        </div>

        {/* Right: Safe JSX Preview + Copy Actions */}
        <div className="lg:col-span-6 glass rounded-2xl p-6 border border-primary/35 space-y-5">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Live Email Preview
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm">
            <div className="text-xs text-slate-400 mb-4 pb-3 border-b border-slate-100">
              Best regards,
            </div>
            <div className="pl-3.5" style={{ borderLeft: `3px solid ${form.accentHex}` }}>
              <div className="text-[15px] font-bold text-slate-950">
                {form.fullName.trim() || "Your Name"}
              </div>
              {titleLine && <div className="text-xs text-slate-600 mt-0.5">{titleLine}</div>}
              <div className="text-xs text-slate-700 mt-2 flex flex-wrap gap-x-2 gap-y-1">
                {form.phone.trim() && <span>Tel: {form.phone.trim()}</span>}
                {waDigits && (
                  <span style={{ color: form.accentHex }} className="font-semibold">
                    WhatsApp
                  </span>
                )}
                {form.email.trim() && <span>{form.email.trim()}</span>}
                {siteDisplay && <span style={{ color: form.accentHex }}>{siteDisplay}</span>}
              </div>
              {form.location.trim() && (
                <div className="text-[11px] text-slate-500 mt-1">{form.location.trim()}</div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={copyRichSignature}
              className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition"
            >
              {copyMode === "rich" ? (
                <>
                  <Check className="size-3.5" aria-hidden="true" /> Signature copied!
                </>
              ) : (
                <>
                  <Copy className="size-3.5" aria-hidden="true" /> Copy for Gmail / Outlook
                </>
              )}
            </button>
            <button
              type="button"
              onClick={copyHtmlSource}
              className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-xs font-medium text-foreground hover:bg-secondary transition"
            >
              {copyMode === "html" ? (
                <>
                  <Check className="size-3.5 text-emerald-400" aria-hidden="true" /> HTML copied
                </>
              ) : (
                <>
                  <Code2 className="size-3.5" aria-hidden="true" /> Copy HTML source
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}

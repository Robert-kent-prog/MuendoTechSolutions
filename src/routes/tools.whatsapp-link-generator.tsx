import { createFileRoute } from "@tanstack/react-router";
import { useId, useMemo, useState } from "react";
import { Check, Copy, ExternalLink, MessageCircle } from "lucide-react";
import { COMPANY, SITE_URL, breadcrumbSchema, pageHead } from "@/lib/seo";
import { buildWhatsAppChatUrl, normalizeKenyanPhone } from "@/lib/calculators";
import { encodeQrMatrix, qrMatrixToSvg } from "@/lib/qr";
import { ToolPageLayout, type ToolFaq } from "@/components/tools/ToolPageLayout";

const WA_FAQS: ToolFaq[] = [
  {
    q: "How do I format a Kenyan phone number for a WhatsApp link?",
    a: "You can type either local Kenyan format (like 0793 587 026 or 0112 345 678) or international format (+254793587026). This tool automatically converts Kenyan numbers to 254 format required by wa.me.",
  },
  {
    q: "Where can I use my generated WhatsApp link and QR code?",
    a: "Paste the link in your Instagram/TikTok bio, website Contact button, Google Business Profile, or email signature, and print the QR code on receipts, shop counters, and delivery flyers.",
  },
];

export const Route = createFileRoute("/tools/whatsapp-link-generator")({
  component: WhatsAppLinkGeneratorPage,
  head: () => {
    const head = pageHead({
      title: `WhatsApp Click-to-Chat Link & QR Generator (Kenya +254) | ${COMPANY}`,
      description:
        "Create a free WhatsApp wa.me click-to-chat link with a prefilled customer message, automatic Kenya +254 formatting, live chat preview, and scannable QR code.",
      path: "/tools/whatsapp-link-generator",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: `WhatsApp Click-to-Chat Link Generator | ${COMPANY}`,
            url: `${SITE_URL}/tools/whatsapp-link-generator`,
            applicationCategory: "UtilitiesApplication",
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
              { name: "WhatsApp Link Generator", path: "/tools/whatsapp-link-generator" },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: WA_FAQS.map((f) => ({
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
  "w-full rounded-lg border border-border bg-background/70 px-3 py-2.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function WhatsAppLinkGeneratorPage() {
  const id = useId();
  const [phone, setPhone] = useState("+254 793 587 026");
  const [message, setMessage] = useState(
    "Hello, I would like to inquire about your products and pricing.",
  );
  const [copied, setCopied] = useState(false);

  const normalized = useMemo(() => normalizeKenyanPhone(phone), [phone]);
  const url = useMemo(() => buildWhatsAppChatUrl(phone, message), [phone, message]);
  const qrSvgDataUrl = useMemo(() => {
    if (!url) return null;
    const matrix = encodeQrMatrix(url, "M");
    if (!matrix) return null;
    const svg = qrMatrixToSvg(matrix, { fg: "#0f172a", bg: "#ffffff" });
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }, [url]);

  async function copyUrl() {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <ToolPageLayout
      breadcrumbLabel="WhatsApp Link Generator"
      title="WhatsApp Click-to-Chat Link Generator"
      subtitle="Build a clean wa.me link with automatic Kenyan +254 formatting, a prefilled customer greeting, live chat preview, and an instant scannable QR code."
      guideBlocks={[
        {
          heading: "Turn social visitors into WhatsApp conversations",
          body: "Instead of asking buyers to save your phone number manually, a prefilled WhatsApp link opens a chat straight to your business line with their question already typed.",
        },
        {
          heading: "Ready for automated WhatsApp order bots?",
          body: "We build WhatsApp Cloud API integrations that send automated order confirmations, M-Pesa payment receipts, and AI-assisted customer replies 24/7.",
        },
      ]}
      relatedEyebrow="WhatsApp Automation"
      relatedHeading="Business websites & WhatsApp Cloud API bots"
      relatedSummary="Connect your website, POS, or CRM directly to WhatsApp for automatic receipts, delivery alerts, and smart customer support."
      relatedPrimarySlug="ai-integration"
      relatedPrimaryLabel="Explore AI & Automation"
      faqTitle="Questions about WhatsApp click-to-chat links"
      faqs={WA_FAQS}
    >
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6 glass rounded-2xl p-6 border border-border space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
            Link Details
          </h2>
          <div>
            <label
              htmlFor={`${id}-phone`}
              className="block text-xs font-medium text-muted-foreground mb-1"
            >
              WhatsApp phone number (e.g. 0712 345 678 or +254 712 345 678)
            </label>
            <input
              id={`${id}-phone`}
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+254 7XX XXX XXX"
              className={`${inputClass} font-mono`}
            />
            {normalized && (
              <p className="mt-1 text-xs text-muted-foreground">
                Normalized international format:{" "}
                <strong className="font-mono text-foreground">+{normalized}</strong>
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={`${id}-msg`}
              className="block text-xs font-medium text-muted-foreground mb-1"
            >
              Prefilled customer message (optional)
            </label>
            <textarea
              id={`${id}-msg`}
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi, I'd like to place an order..."
              className={inputClass}
            />
          </div>

          {url ? (
            <div className="space-y-3 pt-2 border-t border-border/60">
              <div className="rounded-xl border border-border bg-secondary/30 p-3 font-mono text-xs break-all text-foreground">
                {url}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={copyUrl}
                  className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition"
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5" aria-hidden="true" /> Link copied
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" aria-hidden="true" /> Copy WhatsApp link
                    </>
                  )}
                </button>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-4 py-2 text-xs font-semibold text-slate-950 hover:opacity-90 transition"
                >
                  <MessageCircle className="size-3.5" aria-hidden="true" /> Test in WhatsApp
                  <ExternalLink className="size-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              Enter a phone number above to generate your WhatsApp link and QR code.
            </p>
          )}
        </div>

        {/* Right: Chat Preview & QR */}
        <div className="lg:col-span-6 glass rounded-2xl p-6 border border-primary/35 space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
            Live Chat Preview & QR Code
          </h2>

          <div className="rounded-xl border border-border bg-background/80 p-4 space-y-3">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-border/60">
              <div className="size-8 rounded-full bg-[#25D366]/20 text-[#25D366] grid place-items-center">
                <MessageCircle className="size-4" aria-hidden="true" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-foreground">
                  {normalized ? `+${normalized}` : "Enter phone number"}
                </div>
                <div className="text-muted-foreground">WhatsApp Business Chat</div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-xl rounded-tr-none bg-[#25D366]/15 border border-[#25D366]/35 px-3.5 py-2.5 text-xs text-foreground leading-relaxed whitespace-pre-line">
                {message.trim() || "Customer opens a blank chat directly with your number."}
              </div>
            </div>
          </div>

          {qrSvgDataUrl && (
            <div className="flex flex-col sm:flex-row items-center gap-5 rounded-xl border border-border bg-secondary/20 p-4">
              <img
                src={qrSvgDataUrl}
                alt="WhatsApp chat QR code"
                className="size-36 rounded-lg border border-slate-200 bg-white p-1.5 shrink-0"
              />
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="text-sm font-semibold text-foreground">Scan to start chat</div>
                <p className="leading-relaxed">
                  Print this QR on shop posters, counter tents, or packaging so customers open your
                  WhatsApp with one camera scan.
                </p>
                <a
                  href={qrSvgDataUrl}
                  download={`whatsapp-${normalized || "chat"}.svg`}
                  className="inline-flex items-center gap-1.5 font-semibold text-accent hover:underline"
                >
                  Download QR SVG
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}

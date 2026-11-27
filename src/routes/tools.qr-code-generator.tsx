import { createFileRoute } from "@tanstack/react-router";
import { useId, useMemo, useState } from "react";
import { AlertCircle, Download } from "lucide-react";
import { COMPANY, SITE_URL, breadcrumbSchema, pageHead } from "@/lib/seo";
import { buildWhatsAppChatUrl } from "@/lib/calculators";
import { buildWifiQrPayload, encodeQrMatrix, qrMatrixToSvg, type QrEccLevel } from "@/lib/qr";
import { ToolPageLayout, type ToolFaq } from "@/components/tools/ToolPageLayout";

const QR_FAQS: ToolFaq[] = [
  {
    q: "Do QR codes created here expire or track scans?",
    a: "Never. These are static QR codes generated directly in your browser using ISO/IEC 18004 encoding. There are no redirect servers, no scan limits, and no expiration dates.",
  },
  {
    q: "Should I download PNG or SVG?",
    a: "Choose SVG for print shops, banners, business cards, and menus because it scales cleanly to any size. Choose PNG for quick sharing on WhatsApp, social media, or slides.",
  },
  {
    q: "Can I create a Wi-Fi QR code for my cafe, salon, or office?",
    a: "Yes. Switch to the Wi-Fi tab, type your network name (SSID) and password, and print the QR code so guests connect instantly by pointing their phone camera.",
  },
];

export const Route = createFileRoute("/tools/qr-code-generator")({
  component: QrCodeGeneratorPage,
  head: () => {
    const head = pageHead({
      title: `Free QR Code Generator (URL, WhatsApp & Wi-Fi PNG/SVG) | ${COMPANY}`,
      description:
        "Generate permanent, scannable QR codes for websites, WhatsApp chats, menus, and shop Wi-Fi directly in your browser. Download crisp PNG or SVG with zero watermarks.",
      path: "/tools/qr-code-generator",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: `Free QR Code Generator | ${COMPANY}`,
            url: `${SITE_URL}/tools/qr-code-generator`,
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
              { name: "QR Code Generator", path: "/tools/qr-code-generator" },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: QR_FAQS.map((f) => ({
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

function QrCodeGeneratorPage() {
  const id = useId();
  const [mode, setMode] = useState<"url" | "whatsapp" | "wifi">("url");
  const [urlText, setUrlText] = useState("https://www.muendosoftwarelabs.co.ke");
  const [waPhone, setWaPhone] = useState("+254 793 587 026");
  const [waMessage, setWaMessage] = useState("Hello, I scanned your QR code.");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPass, setWifiPass] = useState("");
  const [wifiSec, setWifiSec] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [fgColor, setFgColor] = useState("#0f172a");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [ecc, setEcc] = useState<QrEccLevel>("M");

  const payload = useMemo(() => {
    if (mode === "whatsapp") return buildWhatsAppChatUrl(waPhone, waMessage);
    if (mode === "wifi") {
      if (!wifiSsid.trim()) return "";
      return buildWifiQrPayload(wifiSsid.trim(), wifiPass, wifiSec);
    }
    return urlText.trim();
  }, [mode, urlText, waPhone, waMessage, wifiSsid, wifiPass, wifiSec]);

  const matrix = useMemo(() => (payload ? encodeQrMatrix(payload, ecc) : null), [payload, ecc]);
  const svgString = useMemo(
    () => (matrix ? qrMatrixToSvg(matrix, { fg: fgColor, bg: bgColor }) : null),
    [matrix, fgColor, bgColor],
  );
  const svgDataUrl = useMemo(
    () => (svgString ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}` : null),
    [svgString],
  );

  function downloadPng() {
    if (!matrix) return;
    const scale = 16;
    const qz = 4;
    const dim = (matrix.size + qz * 2) * scale;
    const canvas = document.createElement("canvas");
    canvas.width = dim;
    canvas.height = dim;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, dim, dim);
    ctx.fillStyle = fgColor;
    for (let r = 0; r < matrix.size; r += 1) {
      for (let c = 0; c < matrix.size; c += 1) {
        if (matrix.modules[r][c]) {
          ctx.fillRect((c + qz) * scale, (r + qz) * scale, scale, scale);
        }
      }
    }
    const link = document.createElement("a");
    link.download = `qr-${mode}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <ToolPageLayout
      breadcrumbLabel="QR Code Generator"
      title="QR Code Generator"
      subtitle="Generate permanent, high-contrast QR codes for websites, digital menus, WhatsApp chats, or shop Wi-Fi directly in your browser. Download crisp PNG or print-ready SVG."
      guideBlocks={[
        {
          heading: "Built for print menus, flyers, and shop counters",
          body: "Keep strong contrast between foreground and background (dark ink on pure white scans fastest under dim indoor lighting). Higher error correction (Q or H) keeps codes readable even if paper gets creased.",
        },
        {
          heading: "Need dynamic QR menus or scan analytics?",
          body: "We build restaurant QR ordering menus, event ticket check-in scanners, and inventory barcode/QR workflows tailored to Kenyan venues and warehouses.",
        },
      ]}
      relatedEyebrow="Digital Menus & QR Systems"
      relatedHeading="Custom QR ordering, ticketing & asset tracking"
      relatedSummary="Turn QR codes into full customer experiences with live menus, M-Pesa table payments, or serialized product verification."
      relatedPrimarySlug="business-websites"
      relatedPrimaryLabel="Explore Business Websites"
      faqTitle="Questions about QR code generation"
      faqs={QR_FAQS}
    >
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 glass rounded-2xl p-6 border border-border space-y-5">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-accent mb-2">
              QR Content Type
            </span>
            <div
              className="grid grid-cols-3 rounded-lg border border-border bg-secondary/40 p-1"
              role="radiogroup"
              aria-label="QR content type"
            >
              {(
                [
                  { id: "url", label: "URL / Text" },
                  { id: "whatsapp", label: "WhatsApp Chat" },
                  { id: "wifi", label: "Shop Wi-Fi" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={mode === opt.id}
                  onClick={() => setMode(opt.id)}
                  className={`cursor-pointer rounded-md py-2 px-2 text-xs font-medium transition ${
                    mode === opt.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {mode === "url" && (
            <div>
              <label
                htmlFor={`${id}-url`}
                className="block text-xs font-medium text-muted-foreground mb-1"
              >
                Website URL or plain text (up to ~210 characters)
              </label>
              <textarea
                id={`${id}-url`}
                rows={3}
                value={urlText}
                onChange={(e) => setUrlText(e.target.value)}
                placeholder="https://yourbusiness.co.ke"
                className={inputClass}
              />
            </div>
          )}

          {mode === "whatsapp" && (
            <div className="space-y-3">
              <div>
                <label
                  htmlFor={`${id}-waphone`}
                  className="block text-xs font-medium text-muted-foreground mb-1"
                >
                  WhatsApp number
                </label>
                <input
                  id={`${id}-waphone`}
                  type="tel"
                  value={waPhone}
                  onChange={(e) => setWaPhone(e.target.value)}
                  className={`${inputClass} font-mono`}
                />
              </div>
              <div>
                <label
                  htmlFor={`${id}-wamsg`}
                  className="block text-xs font-medium text-muted-foreground mb-1"
                >
                  Prefilled message
                </label>
                <input
                  id={`${id}-wamsg`}
                  type="text"
                  value={waMessage}
                  onChange={(e) => setWaMessage(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {mode === "wifi" && (
            <div className="space-y-3">
              <div>
                <label
                  htmlFor={`${id}-ssid`}
                  className="block text-xs font-medium text-muted-foreground mb-1"
                >
                  Wi-Fi network name (SSID)
                </label>
                <input
                  id={`${id}-ssid`}
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  placeholder="e.g. Cafe_Guest_WiFi"
                  className={inputClass}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor={`${id}-wsec`}
                    className="block text-xs font-medium text-muted-foreground mb-1"
                  >
                    Security
                  </label>
                  <select
                    id={`${id}-wsec`}
                    value={wifiSec}
                    onChange={(e) => setWifiSec(e.target.value as "WPA" | "WEP" | "nopass")}
                    className={inputClass}
                  >
                    <option value="WPA">WPA / WPA2 / WPA3</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">Open (No password)</option>
                  </select>
                </div>
                {wifiSec !== "nopass" && (
                  <div>
                    <label
                      htmlFor={`${id}-wpass`}
                      className="block text-xs font-medium text-muted-foreground mb-1"
                    >
                      Wi-Fi password
                    </label>
                    <input
                      id={`${id}-wpass`}
                      type="text"
                      value={wifiPass}
                      onChange={(e) => setWifiPass(e.target.value)}
                      className={`${inputClass} font-mono`}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-border/60 grid sm:grid-cols-3 gap-3">
            <div>
              <label
                htmlFor={`${id}-fg`}
                className="block text-xs font-medium text-muted-foreground mb-1"
              >
                QR ink color
              </label>
              <div className="flex items-center gap-2">
                <input
                  id={`${id}-fg`}
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="h-9 w-11 cursor-pointer rounded border border-border bg-transparent p-0.5"
                />
                <span className="font-mono text-xs text-muted-foreground">{fgColor}</span>
              </div>
            </div>
            <div>
              <label
                htmlFor={`${id}-bg`}
                className="block text-xs font-medium text-muted-foreground mb-1"
              >
                Background
              </label>
              <div className="flex items-center gap-2">
                <input
                  id={`${id}-bg`}
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-9 w-11 cursor-pointer rounded border border-border bg-transparent p-0.5"
                />
                <span className="font-mono text-xs text-muted-foreground">{bgColor}</span>
              </div>
            </div>
            <div>
              <label
                htmlFor={`${id}-ecc`}
                className="block text-xs font-medium text-muted-foreground mb-1"
              >
                Error correction
              </label>
              <select
                id={`${id}-ecc`}
                value={ecc}
                onChange={(e) => setEcc(e.target.value as QrEccLevel)}
                className={inputClass}
              >
                <option value="L">L (7% - max data)</option>
                <option value="M">M (15% - balanced)</option>
                <option value="Q">Q (25% - durable)</option>
                <option value="H">H (30% - print-safe)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right: Live QR Preview & Downloads */}
        <div className="lg:col-span-5 glass rounded-2xl p-6 border border-primary/35 flex flex-col items-center text-center space-y-4">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Scannable QR Preview
          </div>

          {!payload ? (
            <div className="py-12 text-xs text-muted-foreground">
              Enter a URL, WhatsApp number, or Wi-Fi name to generate your QR code.
            </div>
          ) : !svgDataUrl || !matrix ? (
            <div role="alert" className="flex items-start gap-2 text-left text-xs text-destructive">
              <AlertCircle className="size-4 shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                Content is too long for this error correction level. Shorten the text or switch
                Error correction to L (7%).
              </span>
            </div>
          ) : (
            <>
              <img
                src={svgDataUrl}
                alt="Generated QR code preview"
                className="w-56 h-56 rounded-xl border border-slate-200 bg-white p-2 shadow-sm"
              />
              <div className="text-[11px] font-mono text-muted-foreground">
                Version {matrix.version} ({matrix.size}x{matrix.size} modules) - ECC {ecc}
              </div>
              <div className="flex flex-wrap justify-center gap-2.5 w-full pt-1">
                <button
                  type="button"
                  onClick={downloadPng}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition"
                >
                  <Download className="size-3.5" aria-hidden="true" /> Download PNG
                </button>
                <a
                  href={svgDataUrl}
                  download={`qr-${mode}.svg`}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-secondary transition"
                >
                  <Download className="size-3.5" aria-hidden="true" /> Download SVG
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}

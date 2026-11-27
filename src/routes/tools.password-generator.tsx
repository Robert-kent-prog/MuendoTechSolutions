import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useId, useMemo, useState } from "react";
import { Check, Copy, RefreshCw, ShieldCheck } from "lucide-react";
import { COMPANY, SITE_URL, breadcrumbSchema, pageHead } from "@/lib/seo";
import {
  evaluatePasswordStrength,
  generateSecurePassword,
  type PasswordOptions,
} from "@/lib/calculators";
import { ToolPageLayout, type ToolFaq } from "@/components/tools/ToolPageLayout";

const PW_FAQS: ToolFaq[] = [
  {
    q: "Are passwords generated here ever sent over the internet?",
    a: "Never. Passwords are created directly inside your browser using the Web Cryptography API (crypto.getRandomValues) with zero network requests or storage.",
  },
  {
    q: "How long should a strong business password be?",
    a: "Use at least 16 characters mixing uppercase, lowercase, numbers, and symbols for admin panels, email accounts, and banking portals, and store them in a dedicated password manager.",
  },
];

export const Route = createFileRoute("/tools/password-generator")({
  component: PasswordGeneratorPage,
  head: () => {
    const head = pageHead({
      title: `Secure Password Generator & Strength Checker (Offline) | ${COMPANY}`,
      description:
        "Generate cryptographically random passwords in your browser using Web Crypto with instant entropy and strength analysis. Zero server calls or logging.",
      path: "/tools/password-generator",
    });
    return {
      ...head,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: `Secure Password Generator & Strength Checker | ${COMPANY}`,
            url: `${SITE_URL}/tools/password-generator`,
            applicationCategory: "SecurityApplication",
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
              { name: "Password Generator", path: "/tools/password-generator" },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: PW_FAQS.map((f) => ({
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

function PasswordGeneratorPage() {
  const id = useId();
  const [options, setOptions] = useState<PasswordOptions>({
    length: 18,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
  });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPassword(generateSecurePassword(options));
  }, [options]);

  const strength = useMemo(() => evaluatePasswordStrength(password), [password]);

  function regenerate() {
    setPassword(generateSecurePassword(options));
  }

  async function copyPassword() {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <ToolPageLayout
      breadcrumbLabel="Password Generator"
      title="Password Generator & Strength Checker"
      subtitle="Generate cryptographically strong passwords locally using browser Web Crypto (crypto.getRandomValues) or type any password below to check its entropy."
      guideBlocks={[
        {
          heading: "100% browser-side cryptographic randomness",
          body: "We use rejection sampling over crypto.getRandomValues so every character in your selected pool has an equal probability with zero modulo bias and zero network transmission.",
        },
        {
          heading: "Securing business web applications",
          body: "Beyond strong passwords, production business systems need MFA, role-based access control, rate limiting, and audit logs. We engineer security baselines into every platform we ship.",
        },
      ]}
      relatedEyebrow="Application Security"
      relatedHeading="Secure web apps, APIs & maintenance retainers"
      relatedSummary="Need authentication hardening, role-based permissions, or ongoing security maintenance for your business platform?"
      relatedPrimarySlug="website-maintenance"
      relatedPrimaryLabel="Explore Maintenance & Security"
      faqTitle="Questions about password security"
      faqs={PW_FAQS}
    >
      <div className="max-w-3xl mx-auto space-y-5">
        <div className="glass rounded-2xl p-6 border border-primary/35 space-y-4">
          <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 font-semibold text-accent uppercase tracking-[0.14em]">
              <ShieldCheck className="size-4" aria-hidden="true" /> Generated or Custom Password
            </span>
            <span className="font-mono">
              {strength.label} ({strength.entropyBits} bits)
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <label htmlFor={`${id}-pw`} className="sr-only">
              Password
            </label>
            <input
              id={`${id}-pw`}
              type="text"
              spellCheck={false}
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 rounded-xl border border-border bg-background/80 px-4 py-3 text-base sm:text-lg font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={copyPassword}
                className="cursor-pointer inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-3 text-xs font-semibold text-primary-foreground hover:opacity-90 transition"
              >
                {copied ? (
                  <>
                    <Check className="size-4" aria-hidden="true" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-4" aria-hidden="true" /> Copy
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={regenerate}
                aria-label="Generate new password"
                className="cursor-pointer inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-secondary/50 px-3.5 py-3 text-xs font-medium text-foreground hover:bg-secondary transition"
              >
                <RefreshCw className="size-4" aria-hidden="true" /> New
              </button>
            </div>
          </div>

          {/* 5-segment Strength Meter */}
          <div className="grid grid-cols-5 gap-1.5" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`h-2 rounded-full transition-colors ${
                  step <= strength.score
                    ? strength.score <= 2
                      ? "bg-destructive"
                      : strength.score === 3
                        ? "bg-amber-400"
                        : "bg-primary"
                    : "bg-secondary"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6 border border-border space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <label htmlFor={`${id}-len`} className="font-medium text-muted-foreground">
                Password length
              </label>
              <span className="font-mono font-bold text-foreground">
                {options.length} characters
              </span>
            </div>
            <input
              id={`${id}-len`}
              type="range"
              min={8}
              max={64}
              value={options.length}
              onChange={(e) =>
                setOptions((prev) => ({ ...prev, length: parseInt(e.target.value, 10) }))
              }
              className="w-full accent-primary cursor-pointer"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
            {(
              [
                { key: "uppercase", label: "Uppercase letters (A-Z)" },
                { key: "lowercase", label: "Lowercase letters (a-z)" },
                { key: "numbers", label: "Numbers (0-9)" },
                { key: "symbols", label: "Symbols (!@#$%^&*)" },
                { key: "excludeAmbiguous", label: "Exclude ambiguous characters (I, l, 1, O, 0)" },
              ] as const
            ).map((opt) => (
              <label key={opt.key} className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={options[opt.key]}
                  onChange={(e) => setOptions((prev) => ({ ...prev, [opt.key]: e.target.checked }))}
                  className="size-4 rounded border-border accent-primary"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}

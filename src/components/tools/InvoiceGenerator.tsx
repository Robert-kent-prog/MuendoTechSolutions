import { useEffect, useId, useMemo, useRef, useState, type ChangeEvent } from "react";
import {
  Check,
  Copy,
  FilePlus2,
  ImagePlus,
  MessageCircle,
  Plus,
  Printer,
  RotateCcw,
  Trash2,
  UserRoundPen,
  X,
} from "lucide-react";
import {
  addDays,
  amountToWords,
  buildWhatsAppInvoiceSummary,
  calculateInvoiceTotals,
  createInitialInvoice,
  CURRENCIES,
  DEFAULT_COMPANY_PARTY,
  DEFAULT_PAYMENT_DETAILS,
  DOC_PREFIX,
  formatDisplayDate,
  formatMoney,
  generateDocumentNumber,
  getCurrency,
  getWhatsAppShareUrl,
  type DiscountType,
  type DocumentType,
  type InvoiceDocument,
  type InvoiceLineItem,
  type InvoiceParty,
  type PaperSize,
  type TaxMode,
} from "@/lib/invoice";
import { COMPANY } from "@/lib/seo";

const STORAGE_KEY = "msl_invoice_draft_v1";
const ALLOWED_LOGO_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);
const MAX_LOGO_BYTES = 2 * 1024 * 1024;
const DOC_TYPES: DocumentType[] = ["Invoice", "Quotation", "Proforma Invoice", "Receipt"];

const inputClass =
  "w-full rounded-lg border border-border bg-background/70 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const labelClass = "block text-xs font-medium text-muted-foreground mb-1";

function loadSavedDraft(): InvoiceDocument | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<InvoiceDocument>;
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.items)) return null;
    const base = createInitialInvoice();
    return {
      ...base,
      ...parsed,
      from: { ...base.from, ...(parsed.from ?? {}) },
      billTo: { ...base.billTo, ...(parsed.billTo ?? {}) },
      items: parsed.items.length > 0 ? parsed.items : base.items,
    };
  } catch {
    return null;
  }
}

export function InvoiceGenerator() {
  const [doc, setDoc] = useState<InvoiceDocument>(() =>
    createInitialInvoice(new Date(2026, 0, 1), true),
  );
  const [hydrated, setHydrated] = useState(false);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formId = useId();

  useEffect(() => {
    const saved = loadSavedDraft();
    setDoc(saved ?? createInitialInvoice());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(doc));
    } catch {
      // Ignore quota or private-browsing storage errors.
    }
  }, [doc, hydrated]);

  const totals = useMemo(() => calculateInvoiceTotals(doc), [doc]);
  const currency = useMemo(() => getCurrency(doc.currencyCode), [doc.currencyCode]);
  const words = useMemo(
    () => amountToWords(totals.total, doc.currencyCode),
    [totals.total, doc.currencyCode],
  );
  const activeLogoSrc = doc.logoDataUrl ?? (doc.useDefaultLogo ? "/logo-mark.png" : null);
  const isUsingMuendoDefaults =
    doc.from.name === DEFAULT_COMPANY_PARTY.name &&
    doc.from.email === DEFAULT_COMPANY_PARTY.email &&
    doc.useDefaultLogo &&
    !doc.logoDataUrl;

  function updateField<K extends keyof InvoiceDocument>(key: K, value: InvoiceDocument[K]) {
    setDoc((prev) => ({ ...prev, [key]: value }));
  }

  function updateDocType(nextType: DocumentType) {
    setDoc((prev) => {
      const oldPrefix = DOC_PREFIX[prev.docType];
      const nextPrefix = DOC_PREFIX[nextType];
      const nextNumber = prev.number.startsWith(`${oldPrefix}-`)
        ? `${nextPrefix}${prev.number.slice(oldPrefix.length)}`
        : prev.number;
      return { ...prev, docType: nextType, number: nextNumber };
    });
  }

  function updateParty(side: "from" | "billTo", key: keyof InvoiceParty, value: string) {
    setDoc((prev) => ({
      ...prev,
      [side]: { ...prev[side], [key]: value },
    }));
  }

  function updateItem(id: string, patch: Partial<InvoiceLineItem>) {
    setDoc((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  }

  function addItem() {
    const id = `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setDoc((prev) => ({
      ...prev,
      items: [...prev.items, { id, description: "", quantity: 1, unitPrice: 0 }],
    }));
  }

  function removeItem(id: string) {
    setDoc((prev) => {
      if (prev.items.length <= 1) {
        return {
          ...prev,
          items: [{ id: "item-1", description: "", quantity: 1, unitPrice: 0 }],
        };
      }
      return { ...prev, items: prev.items.filter((item) => item.id !== id) };
    });
  }

  function handleLogoUpload(e: ChangeEvent<HTMLInputElement>) {
    setLogoError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ALLOWED_LOGO_TYPES.has(file.type)) {
      setLogoError("Please choose a PNG, JPG, or WebP image.");
      return;
    }
    if (file.size > MAX_LOGO_BYTES) {
      setLogoError("Logo file must be under 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setDoc((prev) => ({
          ...prev,
          logoDataUrl: reader.result as string,
          useDefaultLogo: false,
        }));
      }
    };
    reader.onerror = () => setLogoError("Could not read that image file. Try another image.");
    reader.readAsDataURL(file);
  }

  function clearForClientBusiness() {
    setLogoError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setDoc((prev) => ({
      ...prev,
      logoDataUrl: null,
      useDefaultLogo: false,
      from: { name: "", address: "", phone: "", email: "", taxPin: "" },
      paymentDetails: "",
    }));
  }

  function restoreMuendoDefaults() {
    setLogoError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setDoc((prev) => ({
      ...prev,
      logoDataUrl: null,
      useDefaultLogo: true,
      from: { ...DEFAULT_COMPANY_PARTY },
      paymentDetails: DEFAULT_PAYMENT_DETAILS,
    }));
  }

  function handleNewDocument() {
    const fresh = createInitialInvoice();
    setDoc((prev) => ({
      ...fresh,
      docType: prev.docType,
      number: generateDocumentNumber(prev.docType),
      currencyCode: prev.currencyCode,
      paperSize: prev.paperSize,
      logoDataUrl: prev.logoDataUrl,
      useDefaultLogo: prev.useDefaultLogo,
      from: { ...prev.from },
      paymentDetails: prev.paymentDetails,
      showPoweredBy: prev.showPoweredBy,
    }));
  }

  function triggerPrint(size: PaperSize) {
    setDoc((prev) => ({ ...prev, paperSize: size }));
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.print();
      });
    });
  }

  async function copySummary() {
    const text = buildWhatsAppInvoiceSummary(doc, totals);
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2500);
    } catch {
      setCopyStatus("failed");
      setTimeout(() => setCopyStatus("idle"), 2500);
    }
  }

  const whatsappUrl = getWhatsAppShareUrl(
    doc.billTo.phone,
    buildWhatsAppInvoiceSummary(doc, totals),
  );

  return (
    <div className="invoice-workbench">
      {/* Sticky Top Action Toolbar */}
      <div className="no-print glass rounded-2xl p-4 sm:p-5 border border-border mb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Paper
            </span>
            <div
              className="inline-flex rounded-lg border border-border bg-secondary/40 p-1"
              role="radiogroup"
              aria-label="Paper size"
            >
              {(
                [
                  { id: "a4", label: "A4 Invoice" },
                  { id: "80mm", label: "80mm Receipt" },
                ] as const
              ).map((opt) => {
                const active = doc.paperSize === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => updateField("paperSize", opt.id)}
                    className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => triggerPrint("a4")}
              className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Printer className="size-4" aria-hidden="true" /> Print A4 / Save PDF
            </button>
            <button
              type="button"
              onClick={() => triggerPrint("80mm")}
              className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3.5 py-2 text-sm font-medium text-foreground hover:bg-secondary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Printer className="size-4" aria-hidden="true" /> Print 80mm
            </button>
            <button
              type="button"
              onClick={addItem}
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-sm font-medium text-foreground hover:bg-secondary/50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Plus className="size-4" aria-hidden="true" /> Add item
            </button>
            <button
              type="button"
              onClick={handleNewDocument}
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <FilePlus2 className="size-4" aria-hidden="true" /> New
            </button>
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Prints only the document below (no website navbar or buttons). In the print dialog, choose{" "}
          <strong className="text-foreground">Save as PDF</strong> to download. Everything stays in
          your browser.
        </p>

        {/* Mobile Edit / Preview Switcher */}
        <div className="mt-4 flex lg:hidden rounded-lg border border-border bg-secondary/40 p-1">
          <button
            type="button"
            onClick={() => setMobileTab("edit")}
            className={`flex-1 rounded-md py-2 text-xs font-medium transition ${
              mobileTab === "edit" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            Edit Details
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("preview")}
            className={`flex-1 rounded-md py-2 text-xs font-medium transition ${
              mobileTab === "preview"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground"
            }`}
          >
            Live Preview ({formatMoney(totals.total, doc.currencyCode)})
          </button>
        </div>
      </div>

      {/* Main 5/7 Split Workbench */}
      <div className="invoice-workbench-grid grid grid-cols-1 lg:grid-cols-12 gap-6 items-start print:block">
        {/* Left: Form Editor */}
        <div
          className={`no-print lg:col-span-5 space-y-5 ${
            mobileTab === "preview" ? "hidden lg:block" : "block"
          }`}
        >
          {/* Business Identity Quick Switch */}
          <div className="glass rounded-2xl p-4 border border-border flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-muted-foreground leading-relaxed">
              {isUsingMuendoDefaults ? (
                <>
                  Using <strong className="text-foreground">{COMPANY}</strong> defaults. Sending for
                  your own business?
                </>
              ) : (
                <>Using your custom business details. Saved locally in this browser.</>
              )}
            </div>
            <div className="flex shrink-0 gap-2">
              {isUsingMuendoDefaults ? (
                <button
                  type="button"
                  onClick={clearForClientBusiness}
                  className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <UserRoundPen className="size-3.5" aria-hidden="true" /> Use my business
                </button>
              ) : (
                <button
                  type="button"
                  onClick={restoreMuendoDefaults}
                  className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <RotateCcw className="size-3.5" aria-hidden="true" /> Muendo defaults
                </button>
              )}
            </div>
          </div>

          {/* Document Metadata */}
          <fieldset className="glass rounded-2xl p-5 border border-border space-y-4">
            <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-accent px-1">
              Document & Currency
            </legend>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor={`${formId}-doctype`} className={labelClass}>
                  Document type
                </label>
                <select
                  id={`${formId}-doctype`}
                  value={doc.docType}
                  onChange={(e) => updateDocType(e.target.value as DocumentType)}
                  className={inputClass}
                >
                  {DOC_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={`${formId}-number`} className={labelClass}>
                  Number
                </label>
                <input
                  id={`${formId}-number`}
                  type="text"
                  value={doc.number}
                  onChange={(e) => updateField("number", e.target.value)}
                  className={`${inputClass} font-mono`}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor={`${formId}-date`} className={labelClass}>
                  Date
                </label>
                <input
                  id={`${formId}-date`}
                  type="date"
                  value={doc.issueDate}
                  onChange={(e) => {
                    const nextDate = e.target.value;
                    setDoc((prev) => ({
                      ...prev,
                      issueDate: nextDate,
                      dueDate: nextDate ? addDays(nextDate, 14) : prev.dueDate,
                    }));
                  }}
                  className={inputClass}
                />
              </div>
              {doc.docType !== "Receipt" && (
                <div>
                  <label htmlFor={`${formId}-due`} className={labelClass}>
                    Due date
                  </label>
                  <input
                    id={`${formId}-due`}
                    type="date"
                    value={doc.dueDate}
                    onChange={(e) => updateField("dueDate", e.target.value)}
                    className={inputClass}
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor={`${formId}-currency`} className={labelClass}>
                Currency
              </label>
              <select
                id={`${formId}-currency`}
                value={doc.currencyCode}
                onChange={(e) => updateField("currencyCode", e.target.value)}
                className={inputClass}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol}) - {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Logo Upload */}
            <div className="pt-2 border-t border-border/60">
              <span className={labelClass}>Business logo</span>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleLogoUpload}
                  className="sr-only"
                  id={`${formId}-logo`}
                />
                <label
                  htmlFor={`${formId}-logo`}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary transition"
                >
                  <ImagePlus className="size-3.5" aria-hidden="true" />
                  {doc.logoDataUrl ? "Change logo" : "Upload logo"}
                </label>
                {activeLogoSrc && (
                  <button
                    type="button"
                    onClick={() => {
                      if (fileInputRef.current) fileInputRef.current.value = "";
                      setDoc((prev) => ({ ...prev, logoDataUrl: null, useDefaultLogo: false }));
                    }}
                    className="cursor-pointer inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-2 text-xs text-muted-foreground hover:text-foreground transition"
                  >
                    <X className="size-3.5" aria-hidden="true" /> Remove logo
                  </button>
                )}
                {!doc.logoDataUrl && !doc.useDefaultLogo && (
                  <button
                    type="button"
                    onClick={() => updateField("useDefaultLogo", true)}
                    className="cursor-pointer rounded-lg border border-border px-2.5 py-2 text-xs text-accent hover:bg-secondary/50 transition"
                  >
                    Use Muendo logo
                  </button>
                )}
              </div>
              {logoError && (
                <p role="alert" className="mt-2 text-xs text-destructive">
                  {logoError}
                </p>
              )}
            </div>
          </fieldset>

          {/* From Party */}
          <fieldset className="glass rounded-2xl p-5 border border-border space-y-3">
            <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-accent px-1">
              From (Your Business)
            </legend>
            <div>
              <label htmlFor={`${formId}-from-name`} className={labelClass}>
                Business name
              </label>
              <input
                id={`${formId}-from-name`}
                type="text"
                value={doc.from.name}
                placeholder="Your company name"
                onChange={(e) => updateParty("from", "name", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor={`${formId}-from-addr`} className={labelClass}>
                Address / website
              </label>
              <textarea
                id={`${formId}-from-addr`}
                rows={2}
                value={doc.from.address}
                placeholder="Street, city, website"
                onChange={(e) => updateParty("from", "address", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor={`${formId}-from-phone`} className={labelClass}>
                  Phone
                </label>
                <input
                  id={`${formId}-from-phone`}
                  type="tel"
                  inputMode="tel"
                  value={doc.from.phone}
                  placeholder="+254 7XX XXX XXX"
                  onChange={(e) => updateParty("from", "phone", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor={`${formId}-from-email`} className={labelClass}>
                  Email
                </label>
                <input
                  id={`${formId}-from-email`}
                  type="email"
                  inputMode="email"
                  value={doc.from.email}
                  placeholder="billing@company.co.ke"
                  onChange={(e) => updateParty("from", "email", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label htmlFor={`${formId}-from-pin`} className={labelClass}>
                KRA PIN / Tax ID (optional)
              </label>
              <input
                id={`${formId}-from-pin`}
                type="text"
                value={doc.from.taxPin}
                placeholder="e.g. P051234567X"
                onChange={(e) => updateParty("from", "taxPin", e.target.value)}
                className={`${inputClass} font-mono`}
              />
            </div>
          </fieldset>

          {/* Bill To Party */}
          <fieldset className="glass rounded-2xl p-5 border border-border space-y-3">
            <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-accent px-1">
              Bill To (Client)
            </legend>
            <div>
              <label htmlFor={`${formId}-to-name`} className={labelClass}>
                Client or company name
              </label>
              <input
                id={`${formId}-to-name`}
                type="text"
                value={doc.billTo.name}
                placeholder="Client or organization"
                onChange={(e) => updateParty("billTo", "name", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor={`${formId}-to-addr`} className={labelClass}>
                Address (optional)
              </label>
              <textarea
                id={`${formId}-to-addr`}
                rows={2}
                value={doc.billTo.address}
                placeholder="Client address or location"
                onChange={(e) => updateParty("billTo", "address", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor={`${formId}-to-phone`} className={labelClass}>
                  Phone (used for WhatsApp share)
                </label>
                <input
                  id={`${formId}-to-phone`}
                  type="tel"
                  inputMode="tel"
                  value={doc.billTo.phone}
                  placeholder="+254 7XX XXX XXX"
                  onChange={(e) => updateParty("billTo", "phone", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor={`${formId}-to-email`} className={labelClass}>
                  Email
                </label>
                <input
                  id={`${formId}-to-email`}
                  type="email"
                  inputMode="email"
                  value={doc.billTo.email}
                  placeholder="client@company.co.ke"
                  onChange={(e) => updateParty("billTo", "email", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </fieldset>

          {/* Line Items */}
          <fieldset className="glass rounded-2xl p-5 border border-border space-y-3">
            <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-accent px-1">
              Line Items
            </legend>
            <div className="space-y-3">
              {doc.items.map((item, idx) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-border bg-secondary/25 p-3 space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-muted-foreground">Item #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove item ${idx + 1}`}
                      className="cursor-pointer rounded-md p-1 text-muted-foreground hover:text-destructive transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Trash2 className="size-3.5" aria-hidden="true" />
                    </button>
                  </div>
                  <div>
                    <label htmlFor={`${formId}-desc-${item.id}`} className={labelClass}>
                      Description
                    </label>
                    <input
                      id={`${formId}-desc-${item.id}`}
                      type="text"
                      value={item.description}
                      placeholder="e.g. Custom business website design & deployment"
                      onChange={(e) => updateItem(item.id, { description: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label htmlFor={`${formId}-qty-${item.id}`} className={labelClass}>
                        Quantity
                      </label>
                      <input
                        id={`${formId}-qty-${item.id}`}
                        type="number"
                        min={0}
                        step="any"
                        inputMode="decimal"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(item.id, { quantity: parseFloat(e.target.value) || 0 })
                        }
                        className={`${inputClass} font-mono tabular-nums`}
                      />
                    </div>
                    <div>
                      <label htmlFor={`${formId}-price-${item.id}`} className={labelClass}>
                        Unit price ({currency.symbol})
                      </label>
                      <input
                        id={`${formId}-price-${item.id}`}
                        type="number"
                        min={0}
                        step="any"
                        inputMode="decimal"
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(item.id, { unitPrice: parseFloat(e.target.value) || 0 })
                        }
                        className={`${inputClass} font-mono tabular-nums`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addItem}
              className="cursor-pointer w-full inline-flex items-center justify-center gap-2 rounded-lg border border-dashed border-border py-2.5 text-xs font-medium text-accent hover:bg-secondary/40 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Plus className="size-4" aria-hidden="true" /> Add another line item
            </button>
          </fieldset>

          {/* Tax, Discount & Shipping */}
          <fieldset className="glass rounded-2xl p-5 border border-border space-y-4">
            <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-accent px-1">
              VAT, Discount & Extras
            </legend>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor={`${formId}-tax-mode`} className={labelClass}>
                  VAT / Tax
                </label>
                <select
                  id={`${formId}-tax-mode`}
                  value={doc.taxMode}
                  onChange={(e) => updateField("taxMode", e.target.value as TaxMode)}
                  className={inputClass}
                >
                  <option value="none">No VAT / Tax</option>
                  <option value="exclusive">Add VAT (Exclusive)</option>
                  <option value="inclusive">Prices include VAT (Inclusive)</option>
                </select>
              </div>
              {doc.taxMode !== "none" && (
                <div>
                  <label htmlFor={`${formId}-tax-rate`} className={labelClass}>
                    Tax rate (%)
                  </label>
                  <input
                    id={`${formId}-tax-rate`}
                    type="number"
                    min={0}
                    max={100}
                    step="any"
                    inputMode="decimal"
                    value={doc.taxRate}
                    onChange={(e) => updateField("taxRate", parseFloat(e.target.value) || 0)}
                    className={`${inputClass} font-mono tabular-nums`}
                  />
                </div>
              )}
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor={`${formId}-disc-type`} className={labelClass}>
                  Discount type
                </label>
                <select
                  id={`${formId}-disc-type`}
                  value={doc.discountType}
                  onChange={(e) => updateField("discountType", e.target.value as DiscountType)}
                  className={inputClass}
                >
                  <option value="percent">Percent (%)</option>
                  <option value="fixed">Fixed ({currency.symbol})</option>
                </select>
              </div>
              <div>
                <label htmlFor={`${formId}-disc-val`} className={labelClass}>
                  Discount
                </label>
                <input
                  id={`${formId}-disc-val`}
                  type="number"
                  min={0}
                  step="any"
                  inputMode="decimal"
                  value={doc.discountValue}
                  onChange={(e) => updateField("discountValue", parseFloat(e.target.value) || 0)}
                  className={`${inputClass} font-mono tabular-nums`}
                />
              </div>
              <div>
                <label htmlFor={`${formId}-shipping`} className={labelClass}>
                  Delivery / extra
                </label>
                <input
                  id={`${formId}-shipping`}
                  type="number"
                  min={0}
                  step="any"
                  inputMode="decimal"
                  value={doc.shipping}
                  onChange={(e) => updateField("shipping", parseFloat(e.target.value) || 0)}
                  className={`${inputClass} font-mono tabular-nums`}
                />
              </div>
            </div>
          </fieldset>

          {/* Payment Details, Notes & Branding Toggle */}
          <fieldset className="glass rounded-2xl p-5 border border-border space-y-4">
            <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-accent px-1">
              Payment Details & Notes
            </legend>
            <div>
              <label htmlFor={`${formId}-payment`} className={labelClass}>
                Payment instructions (M-Pesa, Paybill, Till, or Bank)
              </label>
              <textarea
                id={`${formId}-payment`}
                rows={3}
                value={doc.paymentDetails}
                placeholder="e.g. M-Pesa / Phone: +254 7XX XXX XXX"
                onChange={(e) => updateField("paymentDetails", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor={`${formId}-notes`} className={labelClass}>
                Notes / terms
              </label>
              <textarea
                id={`${formId}-notes`}
                rows={2}
                value={doc.notes}
                placeholder="Payment terms or thank-you note"
                onChange={(e) => updateField("notes", e.target.value)}
                className={inputClass}
              />
            </div>
            <label className="flex items-center gap-2.5 text-xs text-muted-foreground cursor-pointer select-none">
              <input
                type="checkbox"
                checked={doc.showPoweredBy}
                onChange={(e) => updateField("showPoweredBy", e.target.checked)}
                className="size-4 rounded border-border accent-primary"
              />
              <span>Show "Powered by {COMPANY}" footer on document</span>
            </label>

            <div className="pt-2 border-t border-border/60 flex flex-wrap gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-3.5 py-2 text-xs font-semibold text-slate-950 hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <MessageCircle className="size-3.5" aria-hidden="true" /> Share summary on WhatsApp
              </a>
              <button
                type="button"
                onClick={copySummary}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-xs font-medium text-foreground hover:bg-secondary/50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {copyStatus === "copied" ? (
                  <>
                    <Check className="size-3.5 text-emerald-400" aria-hidden="true" /> Summary
                    copied
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" aria-hidden="true" /> Copy summary
                  </>
                )}
              </button>
            </div>
          </fieldset>
        </div>

        {/* Right: Live Print Preview */}
        <div
          className={`print-preview-col lg:col-span-7 lg:sticky lg:top-20 print:block print:static ${
            mobileTab === "edit" ? "hidden lg:block" : "block"
          }`}
        >
          <div className="no-print mb-2.5 flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">
              Live preview ({doc.paperSize === "a4" ? "A4 Sheet" : "80mm Thermal Receipt"})
            </span>
            <span>Exact output when printed or saved as PDF</span>
          </div>

          <div className="rounded-2xl border border-border bg-secondary/25 p-3 sm:p-6 overflow-x-auto print-reset-shell">
            {doc.paperSize === "a4" ? (
              <A4PreviewSheet doc={doc} totals={totals} words={words} logoSrc={activeLogoSrc} />
            ) : (
              <Receipt80mmPreviewSheet
                doc={doc}
                totals={totals}
                words={words}
                logoSrc={activeLogoSrc}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface PreviewProps {
  doc: InvoiceDocument;
  totals: ReturnType<typeof calculateInvoiceTotals>;
  words: string;
  logoSrc: string | null;
}

function A4PreviewSheet({ doc, totals, words, logoSrc }: PreviewProps) {
  const fromName = doc.from.name.trim() || "Your Business";
  return (
    <div
      id="invoice-print-sheet"
      data-paper="a4"
      className="mx-auto w-full max-w-[794px] min-h-[760px] bg-white text-slate-900 rounded-lg border border-slate-200 shadow-sm p-7 sm:p-10 flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="flex items-start gap-3.5">
            {logoSrc && (
              <img
                src={logoSrc}
                alt={`${fromName} logo`}
                className="size-12 shrink-0 object-contain rounded"
              />
            )}
            <div>
              <div className="text-lg font-bold tracking-tight text-slate-950">{fromName}</div>
              {doc.from.taxPin.trim() && (
                <div className="mt-0.5 text-xs font-mono text-slate-500">
                  PIN: {doc.from.taxPin.trim()}
                </div>
              )}
            </div>
          </div>

          <div className="sm:text-right">
            <div className="text-2xl font-extrabold tracking-tight text-slate-950 uppercase">
              {doc.docType}
            </div>
            <dl className="mt-2.5 space-y-1 text-xs">
              <div className="flex sm:justify-end gap-4">
                <dt className="text-slate-500">No.</dt>
                <dd className="font-mono font-semibold text-slate-900">{doc.number || "-"}</dd>
              </div>
              <div className="flex sm:justify-end gap-4">
                <dt className="text-slate-500">Date</dt>
                <dd className="font-medium text-slate-900">{formatDisplayDate(doc.issueDate)}</dd>
              </div>
              {doc.docType !== "Receipt" && (
                <div className="flex sm:justify-end gap-4">
                  <dt className="text-slate-500">Due</dt>
                  <dd className="font-medium text-slate-900">{formatDisplayDate(doc.dueDate)}</dd>
                </div>
              )}
              <div className="flex sm:justify-end gap-4">
                <dt className="text-slate-500">Currency</dt>
                <dd className="font-mono font-semibold text-slate-900">{doc.currencyCode}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* From / Bill To */}
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              From
            </div>
            <div className="mt-1.5 text-sm font-semibold text-slate-950">{fromName}</div>
            {doc.from.address.trim() && (
              <div className="mt-1 text-xs text-slate-600 whitespace-pre-line leading-relaxed">
                {doc.from.address.trim()}
              </div>
            )}
            <div className="mt-1.5 space-y-0.5 text-xs text-slate-600">
              {doc.from.phone.trim() && <div>{doc.from.phone.trim()}</div>}
              {doc.from.email.trim() && <div>{doc.from.email.trim()}</div>}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Bill To
            </div>
            <div className="mt-1.5 text-sm font-semibold text-slate-950">
              {doc.billTo.name.trim() || "-"}
            </div>
            {doc.billTo.address.trim() && (
              <div className="mt-1 text-xs text-slate-600 whitespace-pre-line leading-relaxed">
                {doc.billTo.address.trim()}
              </div>
            )}
            <div className="mt-1.5 space-y-0.5 text-xs text-slate-600">
              {doc.billTo.phone.trim() && <div>{doc.billTo.phone.trim()}</div>}
              {doc.billTo.email.trim() && <div>{doc.billTo.email.trim()}</div>}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-slate-950 text-white">
                <th className="py-2.5 pl-3 pr-2 font-semibold w-9 rounded-tl-md">#</th>
                <th className="py-2.5 px-2 font-semibold">Description</th>
                <th className="py-2.5 px-2 font-semibold text-right w-16">Qty</th>
                <th className="py-2.5 px-2 font-semibold text-right w-28">Unit price</th>
                <th className="py-2.5 pl-2 pr-3 font-semibold text-right w-32 rounded-tr-md">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 border-b border-slate-300">
              {doc.items.map((item, idx) => {
                const lineTotal =
                  Math.max(0, item.quantity || 0) * Math.max(0, item.unitPrice || 0);
                return (
                  <tr key={item.id}>
                    <td className="py-3 pl-3 pr-2 font-mono text-slate-500">{idx + 1}</td>
                    <td className="py-3 px-2 text-slate-900 font-medium">
                      {item.description.trim() || "-"}
                    </td>
                    <td className="py-3 px-2 text-right font-mono tabular-nums text-slate-700">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-2 text-right font-mono tabular-nums text-slate-700">
                      {formatMoney(item.unitPrice, doc.currencyCode, false)}
                    </td>
                    <td className="py-3 pl-2 pr-3 text-right font-mono tabular-nums font-semibold text-slate-950">
                      {formatMoney(lineTotal, doc.currencyCode, false)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="mt-5 flex justify-end">
          <dl className="w-full sm:w-72 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <dt>Subtotal</dt>
              <dd className="font-mono tabular-nums font-medium text-slate-900">
                {formatMoney(totals.subtotal, doc.currencyCode, false)}
              </dd>
            </div>
            {totals.discountAmount > 0 && (
              <div className="flex justify-between text-slate-600">
                <dt>
                  Discount
                  {doc.discountType === "percent" ? ` (${doc.discountValue}%)` : ""}
                </dt>
                <dd className="font-mono tabular-nums font-medium text-slate-900">
                  -{formatMoney(totals.discountAmount, doc.currencyCode, false)}
                </dd>
              </div>
            )}
            {doc.taxMode !== "none" && doc.taxRate > 0 && (
              <div className="flex justify-between text-slate-600">
                <dt>
                  {doc.taxMode === "inclusive"
                    ? `Includes VAT (${doc.taxRate}%)`
                    : `VAT (${doc.taxRate}%)`}
                </dt>
                <dd className="font-mono tabular-nums font-medium text-slate-900">
                  {formatMoney(totals.taxAmount, doc.currencyCode, false)}
                </dd>
              </div>
            )}
            {totals.shipping > 0 && (
              <div className="flex justify-between text-slate-600">
                <dt>Delivery / extra</dt>
                <dd className="font-mono tabular-nums font-medium text-slate-900">
                  {formatMoney(totals.shipping, doc.currencyCode, false)}
                </dd>
              </div>
            )}
            <div className="flex justify-between items-baseline border-t-2 border-slate-950 pt-2.5 text-sm font-bold text-slate-950">
              <dt>Total ({doc.currencyCode})</dt>
              <dd className="font-mono tabular-nums text-base">
                {formatMoney(totals.total, doc.currencyCode)}
              </dd>
            </div>
          </dl>
        </div>

        {/* Amount in Words */}
        <div className="mt-5 rounded-md bg-slate-50 border border-slate-200 px-3.5 py-2.5 text-xs text-slate-700">
          <span className="font-semibold text-slate-900">Amount in words: </span>
          {words}
        </div>

        {/* Payment Details & Notes */}
        {(doc.paymentDetails.trim() || doc.notes.trim()) && (
          <div className="mt-6 grid sm:grid-cols-2 gap-4 pt-5 border-t border-slate-200 text-xs">
            {doc.paymentDetails.trim() && (
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Payment Details
                </div>
                <div className="mt-1.5 text-slate-700 whitespace-pre-line leading-relaxed">
                  {doc.paymentDetails.trim()}
                </div>
              </div>
            )}
            {doc.notes.trim() && (
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Notes
                </div>
                <div className="mt-1.5 text-slate-700 whitespace-pre-line leading-relaxed">
                  {doc.notes.trim()}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Optional Powered By Footer */}
      {doc.showPoweredBy && (
        <div className="mt-10 pt-4 border-t border-slate-200 text-center text-[11px] text-slate-500">
          Powered by <strong className="font-semibold text-slate-800">{COMPANY}</strong>
        </div>
      )}
    </div>
  );
}

function Receipt80mmPreviewSheet({ doc, totals, words, logoSrc }: PreviewProps) {
  const fromName = doc.from.name.trim() || "Your Business";
  return (
    <div
      id="invoice-print-sheet"
      data-paper="80mm"
      className="mx-auto w-[302px] bg-white text-slate-950 rounded-md border border-slate-300 shadow-sm p-4 font-mono text-[11px] leading-snug"
    >
      <div className="text-center pb-3 border-b border-dashed border-slate-400">
        {logoSrc && (
          <img
            src={logoSrc}
            alt={`${fromName} logo`}
            className="mx-auto mb-2 size-10 object-contain"
          />
        )}
        <div className="text-sm font-bold uppercase">{fromName}</div>
        {doc.from.address.trim() && (
          <div className="mt-0.5 text-[10px] text-slate-600 whitespace-pre-line">
            {doc.from.address.trim()}
          </div>
        )}
        {doc.from.phone.trim() && <div className="text-[10px]">{doc.from.phone.trim()}</div>}
        {doc.from.taxPin.trim() && <div className="text-[10px]">PIN: {doc.from.taxPin.trim()}</div>}
      </div>

      <div className="py-2.5 border-b border-dashed border-slate-400 space-y-0.5">
        <div className="text-center font-bold uppercase tracking-wider">{doc.docType}</div>
        <div className="flex justify-between">
          <span>No:</span>
          <span className="font-semibold">{doc.number || "-"}</span>
        </div>
        <div className="flex justify-between">
          <span>Date:</span>
          <span>{formatDisplayDate(doc.issueDate)}</span>
        </div>
        {doc.billTo.name.trim() && (
          <div className="flex justify-between gap-2">
            <span>Client:</span>
            <span className="text-right font-semibold">{doc.billTo.name.trim()}</span>
          </div>
        )}
      </div>

      <div className="py-2.5 border-b border-dashed border-slate-400 space-y-2">
        {doc.items.map((item) => {
          const lineTotal = Math.max(0, item.quantity || 0) * Math.max(0, item.unitPrice || 0);
          return (
            <div key={item.id}>
              <div className="font-semibold">{item.description.trim() || "Item"}</div>
              <div className="flex justify-between text-slate-700 tabular-nums">
                <span>
                  {item.quantity} x {formatMoney(item.unitPrice, doc.currencyCode, false)}
                </span>
                <span className="font-semibold text-slate-950">
                  {formatMoney(lineTotal, doc.currencyCode, false)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="py-2.5 border-b border-dashed border-slate-400 space-y-1 tabular-nums">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatMoney(totals.subtotal, doc.currencyCode, false)}</span>
        </div>
        {totals.discountAmount > 0 && (
          <div className="flex justify-between">
            <span>Discount</span>
            <span>-{formatMoney(totals.discountAmount, doc.currencyCode, false)}</span>
          </div>
        )}
        {doc.taxMode !== "none" && doc.taxRate > 0 && (
          <div className="flex justify-between">
            <span>VAT ({doc.taxRate}%)</span>
            <span>{formatMoney(totals.taxAmount, doc.currencyCode, false)}</span>
          </div>
        )}
        {totals.shipping > 0 && (
          <div className="flex justify-between">
            <span>Extra</span>
            <span>{formatMoney(totals.shipping, doc.currencyCode, false)}</span>
          </div>
        )}
        <div className="flex justify-between text-xs font-bold pt-1.5 border-t border-slate-300">
          <span>TOTAL</span>
          <span>{formatMoney(totals.total, doc.currencyCode)}</span>
        </div>
      </div>

      <div className="pt-2.5 text-[10px] text-slate-700 space-y-1.5">
        <div>{words}</div>
        {doc.paymentDetails.trim() && (
          <div className="whitespace-pre-line pt-1 border-t border-dashed border-slate-300">
            {doc.paymentDetails.trim()}
          </div>
        )}
        {doc.notes.trim() && <div className="text-center pt-1">{doc.notes.trim()}</div>}
        {doc.showPoweredBy && (
          <div className="text-center pt-2 border-t border-dashed border-slate-300 text-slate-500">
            Powered by {COMPANY}
          </div>
        )}
      </div>
    </div>
  );
}

import { COMPANY, EMAIL, WHATSAPP } from "./seo";

const DEFAULT_PHONE_DISPLAY = "+254 793 587 026";

export type DocumentType = "Invoice" | "Quotation" | "Proforma Invoice" | "Receipt";
export type PaperSize = "a4" | "80mm";
export type TaxMode = "none" | "exclusive" | "inclusive";
export type DiscountType = "percent" | "fixed";

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  majorSingular: string;
  majorPlural: string;
  minorSingular: string;
  minorPlural: string;
  decimals: number;
}

export const CURRENCIES: CurrencyConfig[] = [
  {
    code: "KES",
    symbol: "Ksh",
    name: "Kenyan Shilling",
    majorSingular: "Kenya Shilling",
    majorPlural: "Kenya Shillings",
    minorSingular: "Cent",
    minorPlural: "Cents",
    decimals: 2,
  },
  {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    majorSingular: "US Dollar",
    majorPlural: "US Dollars",
    minorSingular: "Cent",
    minorPlural: "Cents",
    decimals: 2,
  },
  {
    code: "UGX",
    symbol: "UGX",
    name: "Ugandan Shilling",
    majorSingular: "Ugandan Shilling",
    majorPlural: "Ugandan Shillings",
    minorSingular: "Cent",
    minorPlural: "Cents",
    decimals: 0,
  },
  {
    code: "TZS",
    symbol: "TZS",
    name: "Tanzanian Shilling",
    majorSingular: "Tanzanian Shilling",
    majorPlural: "Tanzanian Shillings",
    minorSingular: "Cent",
    minorPlural: "Cents",
    decimals: 0,
  },
  {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    majorSingular: "Euro",
    majorPlural: "Euros",
    minorSingular: "Cent",
    minorPlural: "Cents",
    decimals: 2,
  },
  {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    majorSingular: "Pound Sterling",
    majorPlural: "Pounds Sterling",
    minorSingular: "Penny",
    minorPlural: "Pence",
    decimals: 2,
  },
];

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceParty {
  name: string;
  address: string;
  phone: string;
  email: string;
  taxPin: string;
}

export interface InvoiceDocument {
  docType: DocumentType;
  number: string;
  issueDate: string;
  dueDate: string;
  currencyCode: string;
  paperSize: PaperSize;
  logoDataUrl: string | null;
  useDefaultLogo: boolean;
  from: InvoiceParty;
  billTo: InvoiceParty;
  items: InvoiceLineItem[];
  taxMode: TaxMode;
  taxRate: number;
  discountType: DiscountType;
  discountValue: number;
  shipping: number;
  paymentDetails: string;
  notes: string;
  showPoweredBy: boolean;
}

export interface InvoiceTotals {
  subtotal: number;
  discountAmount: number;
  taxableAmount: number;
  taxAmount: number;
  shipping: number;
  total: number;
}

export const DRAFT_TTL_MS = 2 * 60 * 60 * 1000;

export const EMPTY_PARTY: InvoiceParty = {
  name: "",
  address: "",
  phone: "",
  email: "",
  taxPin: "",
};

export const DEFAULT_COMPANY_PARTY: InvoiceParty = {
  name: COMPANY,
  address: "Nairobi, Kenya\nwww.muendosoftwarelabs.co.ke",
  phone: DEFAULT_PHONE_DISPLAY,
  email: EMAIL,
  taxPin: "",
};

export const DEFAULT_PAYMENT_DETAILS = `M-Pesa / Phone: ${DEFAULT_PHONE_DISPLAY}\nName: ${COMPANY}`;

export const DOC_PREFIX: Record<DocumentType, string> = {
  Invoice: "INV",
  Quotation: "QUO",
  "Proforma Invoice": "PRO",
  Receipt: "REC",
};

export function getCurrency(code: string): CurrencyConfig {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}

export function formatISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(isoDate: string, days: number): string {
  const parts = isoDate.split("-").map(Number);
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return isoDate;
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  date.setDate(date.getDate() + days);
  return formatISODate(date);
}

export function formatDisplayDate(isoDate: string): string {
  if (!isoDate) return "-";
  const parts = isoDate.split("-").map(Number);
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return isoDate;
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function generateDocumentNumber(
  docType: DocumentType,
  now = new Date(),
  suffix?: string,
): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const code = suffix ?? String(Math.floor(1000 + Math.random() * 9000));
  return `${DOC_PREFIX[docType]}-${y}${m}${d}-${code}`;
}

export function createInitialInvoice(now = new Date(), deterministic = false): InvoiceDocument {
  const issueDate = formatISODate(now);
  return {
    docType: "Invoice",
    number: generateDocumentNumber("Invoice", now, deterministic ? "0001" : undefined),
    issueDate,
    dueDate: addDays(issueDate, 14),
    currencyCode: "KES",
    paperSize: "a4",
    logoDataUrl: null,
    useDefaultLogo: false,
    from: { ...EMPTY_PARTY },
    billTo: { ...EMPTY_PARTY },
    items: [
      {
        id: "item-1",
        description: "",
        quantity: 1,
        unitPrice: 0,
      },
    ],
    taxMode: "none",
    taxRate: 16,
    discountType: "percent",
    discountValue: 0,
    shipping: 0,
    paymentDetails: "",
    notes: "",
    showPoweredBy: true,
  };
}

export function applyOwnerCompanyDetails(doc: InvoiceDocument): InvoiceDocument {
  return {
    ...doc,
    logoDataUrl: null,
    useDefaultLogo: true,
    from: { ...DEFAULT_COMPANY_PARTY },
    paymentDetails: DEFAULT_PAYMENT_DETAILS,
    notes: doc.notes.trim() ? doc.notes : "Thank you for your business.",
  };
}

export function clearBusinessDetails(doc: InvoiceDocument): InvoiceDocument {
  return {
    ...doc,
    logoDataUrl: null,
    useDefaultLogo: false,
    from: { ...EMPTY_PARTY },
    paymentDetails: "",
    notes: doc.notes === "Thank you for your business." ? "" : doc.notes,
  };
}

export interface StoredInvoiceDraft {
  savedAt: number;
  doc: InvoiceDocument;
}

export function serializeInvoiceDraft(doc: InvoiceDocument, nowMs = Date.now()): string {
  const payload: StoredInvoiceDraft = { savedAt: nowMs, doc };
  return JSON.stringify(payload);
}

export function parseValidInvoiceDraft(
  raw: string | null,
  nowMs = Date.now(),
  ttlMs = DRAFT_TTL_MS,
): { doc: InvoiceDocument; savedAt: number } | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<StoredInvoiceDraft>;
    if (
      !parsed ||
      typeof parsed !== "object" ||
      typeof parsed.savedAt !== "number" ||
      !Number.isFinite(parsed.savedAt) ||
      !parsed.doc ||
      typeof parsed.doc !== "object" ||
      !Array.isArray(parsed.doc.items)
    ) {
      return null;
    }
    if (nowMs - parsed.savedAt > ttlMs || parsed.savedAt > nowMs + 60_000) {
      return null;
    }
    const base = createInitialInvoice(new Date(nowMs));
    const doc: InvoiceDocument = {
      ...base,
      ...parsed.doc,
      from: { ...base.from, ...(parsed.doc.from ?? {}) },
      billTo: { ...base.billTo, ...(parsed.doc.billTo ?? {}) },
      items: parsed.doc.items.length > 0 ? parsed.doc.items : base.items,
    };
    return { doc, savedAt: parsed.savedAt };
  } catch {
    return null;
  }
}

function clampNonNegative(n: number): number {
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function calculateInvoiceTotals(
  doc: Pick<
    InvoiceDocument,
    "items" | "taxMode" | "taxRate" | "discountType" | "discountValue" | "shipping"
  >,
): InvoiceTotals {
  const rawSubtotal = doc.items.reduce((sum, item) => {
    const qty = clampNonNegative(item.quantity);
    const price = clampNonNegative(item.unitPrice);
    return sum + qty * price;
  }, 0);

  const safeDiscountVal = clampNonNegative(doc.discountValue);
  const rawDiscount =
    doc.discountType === "percent"
      ? rawSubtotal * (Math.min(safeDiscountVal, 100) / 100)
      : Math.min(safeDiscountVal, rawSubtotal);

  const afterDiscount = Math.max(0, rawSubtotal - rawDiscount);
  const rate = clampNonNegative(doc.taxRate);
  const safeShipping = clampNonNegative(doc.shipping);

  let taxableAmount = afterDiscount;
  let taxAmount = 0;
  let total = afterDiscount + safeShipping;

  if (doc.taxMode === "exclusive" && rate > 0) {
    taxAmount = afterDiscount * (rate / 100);
    total = afterDiscount + taxAmount + safeShipping;
  } else if (doc.taxMode === "inclusive" && rate > 0) {
    taxableAmount = afterDiscount / (1 + rate / 100);
    taxAmount = afterDiscount - taxableAmount;
    total = afterDiscount + safeShipping;
  }

  return {
    subtotal: roundMoney(rawSubtotal),
    discountAmount: roundMoney(rawDiscount),
    taxableAmount: roundMoney(taxableAmount),
    taxAmount: roundMoney(taxAmount),
    shipping: roundMoney(safeShipping),
    total: roundMoney(total),
  };
}

function roundMoney(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function formatMoney(amount: number, currencyCode: string, includeSymbol = true): string {
  const currency = getCurrency(currencyCode);
  const safe = Number.isFinite(amount) ? amount : 0;
  const formatted = safe.toLocaleString("en-KE", {
    minimumFractionDigits: currency.decimals,
    maximumFractionDigits: currency.decimals,
  });
  return includeSymbol ? `${currency.symbol} ${formatted}` : formatted;
}

const ONES = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const SCALES = ["", "Thousand", "Million", "Billion", "Trillion"];

function chunkToWords(num: number): string {
  const parts: string[] = [];
  const hundreds = Math.floor(num / 100);
  const remainder = num % 100;

  if (hundreds > 0) {
    parts.push(`${ONES[hundreds]} Hundred`);
  }
  if (remainder > 0) {
    if (hundreds > 0) parts.push("and");
    if (remainder < 20) {
      parts.push(ONES[remainder]);
    } else {
      const ten = Math.floor(remainder / 10);
      const one = remainder % 10;
      parts.push(one > 0 ? `${TENS[ten]}-${ONES[one]}` : TENS[ten]);
    }
  }
  return parts.join(" ");
}

export function integerToWords(n: number): string {
  const whole = Math.floor(Math.abs(Number.isFinite(n) ? n : 0));
  if (whole === 0) return "Zero";

  const chunks: string[] = [];
  let remaining = whole;
  let scaleIndex = 0;

  while (remaining > 0 && scaleIndex < SCALES.length) {
    const chunk = remaining % 1000;
    if (chunk > 0) {
      const words = chunkToWords(chunk);
      const scale = SCALES[scaleIndex];
      chunks.unshift(scale ? `${words} ${scale}` : words);
    }
    remaining = Math.floor(remaining / 1000);
    scaleIndex += 1;
  }

  return chunks.join(" ");
}

export function amountToWords(amount: number, currencyCode: string): string {
  const currency = getCurrency(currencyCode);
  const safe = Math.max(0, roundMoney(Number.isFinite(amount) ? amount : 0));
  const whole = Math.floor(safe);
  const minor = currency.decimals > 0 ? Math.round((safe - whole) * 100) : 0;

  const majorLabel = whole === 1 ? currency.majorSingular : currency.majorPlural;
  const wholeWords = integerToWords(whole);

  if (minor > 0) {
    const minorLabel = minor === 1 ? currency.minorSingular : currency.minorPlural;
    const minorWords = integerToWords(minor);
    return `${majorLabel} ${wholeWords} and ${minorWords} ${minorLabel} only`;
  }

  return `${majorLabel} ${wholeWords} only`;
}

export function buildWhatsAppInvoiceSummary(doc: InvoiceDocument, totals: InvoiceTotals): string {
  const senderName = doc.from.name.trim();
  const clientName = doc.billTo.name.trim();
  const lines = [
    `${doc.docType.toUpperCase()} ${doc.number}`,
    ...(senderName ? [`From: ${senderName}`] : []),
    ...(clientName ? [`To: ${clientName}`] : []),
    `Date: ${formatDisplayDate(doc.issueDate)}`,
    ...(doc.dueDate && doc.docType !== "Receipt" ? [`Due: ${formatDisplayDate(doc.dueDate)}`] : []),
    `Total: ${formatMoney(totals.total, doc.currencyCode)}`,
    ...(doc.paymentDetails.trim() ? ["", "Payment Details:", doc.paymentDetails.trim()] : []),
  ];
  return lines.join("\n");
}

export function getWhatsAppShareUrl(phone: string, text: string): string {
  const digits = phone.replace(/\D/g, "");
  const base = digits ? `https://wa.me/${digits}` : `https://wa.me/${WHATSAPP.replace(/\D/g, "")}`;
  return `${base}?text=${encodeURIComponent(text)}`;
}

import { describe, it, expect } from "vitest";
import {
  addDays,
  amountToWords,
  applyOwnerCompanyDetails,
  buildWhatsAppInvoiceSummary,
  calculateInvoiceTotals,
  clearBusinessDetails,
  createInitialInvoice,
  DEFAULT_COMPANY_PARTY,
  DEFAULT_PAYMENT_DETAILS,
  DRAFT_TTL_MS,
  formatMoney,
  integerToWords,
  parseValidInvoiceDraft,
  serializeInvoiceDraft,
} from "./invoice";

describe("invoice engine", () => {
  it("defaults to KES currency with blank client details and Powered by footer", () => {
    const doc = createInitialInvoice(new Date(2026, 10, 25));
    expect(doc.currencyCode).toBe("KES");
    expect(doc.from.name).toBe("");
    expect(doc.from.email).toBe("");
    expect(doc.useDefaultLogo).toBe(false);
    expect(doc.paymentDetails).toBe("");
    expect(doc.notes).toBe("");
    expect(doc.showPoweredBy).toBe(true);
    expect(doc.issueDate).toBe("2026-11-25");
    expect(doc.dueDate).toBe("2026-12-09");
    expect(doc.number).toMatch(/^INV-20261125-\d{4}$/);
  });

  it("loads owner Muendo details on demand and clears cleanly back to blank", () => {
    const blank = createInitialInvoice(new Date(2026, 10, 25), true);
    const ownerDoc = applyOwnerCompanyDetails(blank);
    expect(ownerDoc.from.name).toBe(DEFAULT_COMPANY_PARTY.name);
    expect(ownerDoc.useDefaultLogo).toBe(true);
    expect(ownerDoc.paymentDetails).toBe(DEFAULT_PAYMENT_DETAILS);

    const cleared = clearBusinessDetails(ownerDoc);
    expect(cleared.from.name).toBe("");
    expect(cleared.useDefaultLogo).toBe(false);
    expect(cleared.paymentDetails).toBe("");
  });

  it("restores drafts within TTL and expires drafts after TTL", () => {
    const baseMs = new Date(2026, 10, 25, 10, 0, 0).getTime();
    const doc = createInitialInvoice(new Date(baseMs), true);
    doc.billTo.name = "Savannah Hardware";
    const serialized = serializeInvoiceDraft(doc, baseMs);

    const fresh = parseValidInvoiceDraft(serialized, baseMs + DRAFT_TTL_MS - 1000);
    expect(fresh?.doc.billTo.name).toBe("Savannah Hardware");

    const expired = parseValidInvoiceDraft(serialized, baseMs + DRAFT_TTL_MS + 1000);
    expect(expired).toBeNull();

    // Legacy payloads without savedAt must be rejected so old drafts clear immediately
    const legacy = parseValidInvoiceDraft(JSON.stringify(doc), baseMs);
    expect(legacy).toBeNull();
  });

  it("computes subtotal, percentage discount, exclusive 16% VAT, and shipping accurately", () => {
    const totals = calculateInvoiceTotals({
      items: [
        { id: "1", description: "Web App", quantity: 1, unitPrice: 100000 },
        { id: "2", description: "M-Pesa Integration", quantity: 2, unitPrice: 15000 },
      ],
      discountType: "percent",
      discountValue: 10,
      taxMode: "exclusive",
      taxRate: 16,
      shipping: 2000,
    });

    expect(totals.subtotal).toBe(130000);
    expect(totals.discountAmount).toBe(13000);
    expect(totals.taxableAmount).toBe(117000);
    expect(totals.taxAmount).toBe(18720);
    expect(totals.total).toBe(137720);
  });

  it("extracts 16% VAT cleanly in inclusive mode without inflating total", () => {
    const totals = calculateInvoiceTotals({
      items: [{ id: "1", description: "POS Setup", quantity: 1, unitPrice: 116000 }],
      discountType: "fixed",
      discountValue: 0,
      taxMode: "inclusive",
      taxRate: 16,
      shipping: 0,
    });

    expect(totals.subtotal).toBe(116000);
    expect(totals.taxableAmount).toBe(100000);
    expect(totals.taxAmount).toBe(16000);
    expect(totals.total).toBe(116000);
  });

  it("guards against negative or NaN values in line items and discounts", () => {
    const totals = calculateInvoiceTotals({
      items: [{ id: "1", description: "Bad row", quantity: -5, unitPrice: Number.NaN }],
      discountType: "fixed",
      discountValue: 500,
      taxMode: "exclusive",
      taxRate: -10,
      shipping: -100,
    });

    expect(totals.subtotal).toBe(0);
    expect(totals.discountAmount).toBe(0);
    expect(totals.taxAmount).toBe(0);
    expect(totals.total).toBe(0);
  });

  it("converts amounts to accurate Kenya Shillings and USD words", () => {
    expect(integerToWords(0)).toBe("Zero");
    expect(integerToWords(45250)).toBe("Forty-Five Thousand Two Hundred and Fifty");
    expect(amountToWords(0, "KES")).toBe("Kenya Shillings Zero only");
    expect(amountToWords(1, "KES")).toBe("Kenya Shilling One only");
    expect(amountToWords(45250.5, "KES")).toBe(
      "Kenya Shillings Forty-Five Thousand Two Hundred and Fifty and Fifty Cents only",
    );
    expect(amountToWords(1250000, "USD")).toBe(
      "US Dollars One Million Two Hundred and Fifty Thousand only",
    );
  });

  it("formats currency and adds calendar days safely", () => {
    expect(formatMoney(25000, "KES")).toBe("Ksh 25,000.00");
    expect(formatMoney(1500, "UGX")).toBe("UGX 1,500");
    expect(addDays("2026-11-25", 14)).toBe("2026-12-09");
  });

  it("builds a clean WhatsApp invoice summary", () => {
    const doc = applyOwnerCompanyDetails(createInitialInvoice(new Date(2026, 10, 25)));
    doc.billTo.name = "Machakos Retail SME";
    doc.items = [{ id: "1", description: "Website", quantity: 1, unitPrice: 35000 }];
    const totals = calculateInvoiceTotals(doc);
    const summary = buildWhatsAppInvoiceSummary(doc, totals);

    expect(summary).toContain("INVOICE INV-20261125-");
    expect(summary).toContain("From: Muendo Software Labs");
    expect(summary).toContain("To: Machakos Retail SME");
    expect(summary).toContain("Total: Ksh 35,000.00");
    expect(summary).toContain("M-Pesa / Phone: +254 793 587 026");
  });
});

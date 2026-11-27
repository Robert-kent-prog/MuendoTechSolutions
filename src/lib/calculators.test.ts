import { describe, it, expect } from "vitest";
import {
  buildEmailSignatureHtml,
  buildWhatsAppChatUrl,
  calculateBreakEven,
  calculateDiscount,
  calculateKenyaPaye,
  calculateLoan,
  calculateMpesaCharge,
  calculateProfitMargin,
  calculateSellingPriceFromMargin,
  calculateSellingPriceFromMarkup,
  calculateVat,
  evaluatePasswordStrength,
  formatKes,
  generateSecurePassword,
  normalizeKenyanPhone,
} from "./calculators";

describe("Kenya PAYE calculator", () => {
  it("computes NSSF (2026 Tier I/II), SHIF 2.75%, Housing Levy 1.5%, allowable deductions, and PAYE for Ksh 100,000 gross", () => {
    const res = calculateKenyaPaye({ grossMonthly: 100000 });
    // NSSF: Tier I = 6% of 9,000 = 540; Tier II = 6% of (100,000 - 9,000) = 5,460; Total = 6,000
    expect(res.nssfTier1).toBe(540);
    expect(res.nssfTier2).toBe(5460);
    expect(res.nssfTotal).toBe(6000);
    // SHIF: 2.75% of 100,000 = 2,750
    expect(res.shif).toBe(2750);
    // Housing Levy: 1.5% of 100,000 = 1,500
    expect(res.housingLevy).toBe(1500);
    // Taxable income: 100,000 - (6,000 + 2,750 + 1,500) = 89,750
    expect(res.taxableIncome).toBe(89750);
    // PAYE bands on 89,750:
    // 24,000 * 10% = 2,400
    // 8,333 * 25% = 2,083.25
    // (89,750 - 32,333) = 57,417 * 30% = 17,225.10
    // Gross PAYE = 21,708.35; minus 2,400 relief = 19,308.35
    expect(res.grossPaye).toBe(21708.35);
    expect(res.netPaye).toBe(19308.35);
    expect(res.netPay).toBe(70441.65);
    expect(res.totalEmployerCost).toBe(107500);
  });

  it("caps NSSF at Ksh 6,480 above Ksh 108,000 and applies SHIF minimum Ksh 300 for low earners", () => {
    const high = calculateKenyaPaye({ grossMonthly: 200000 });
    expect(high.nssfTotal).toBe(6480);

    const low = calculateKenyaPaye({ grossMonthly: 10000 });
    expect(low.shif).toBe(300);
    expect(low.netPaye).toBe(0);
  });

  it("handles zero or negative gross salary safely", () => {
    const res = calculateKenyaPaye({ grossMonthly: -5000 });
    expect(res.netPay).toBe(0);
    expect(res.shif).toBe(0);
    expect(res.netPaye).toBe(0);
  });
});

describe("Kenya VAT calculator", () => {
  it("adds 16% exclusive VAT accurately", () => {
    const res = calculateVat(10000, 16, "exclusive");
    expect(res.netAmount).toBe(10000);
    expect(res.vatAmount).toBe(1600);
    expect(res.grossAmount).toBe(11600);
  });

  it("extracts 16% inclusive VAT accurately", () => {
    const res = calculateVat(11600, 16, "inclusive");
    expect(res.netAmount).toBe(10000);
    expect(res.vatAmount).toBe(1600);
    expect(res.grossAmount).toBe(11600);
  });
});

describe("M-Pesa charges calculator", () => {
  it("returns free send money up to Ksh 100 and accurate bands above", () => {
    expect(calculateMpesaCharge(100, "send-registered").fee).toBe(0);
    expect(calculateMpesaCharge(1000, "send-registered").fee).toBe(13);
    expect(calculateMpesaCharge(5000, "send-registered").fee).toBe(57);
    expect(calculateMpesaCharge(50000, "send-registered").fee).toBe(108);
    expect(calculateMpesaCharge(250000, "send-registered").fee).toBe(108);
  });

  it("returns accurate agent withdrawal fees and enforces Ksh 50 minimum and Ksh 250,000 max", () => {
    expect(calculateMpesaCharge(40, "withdraw-agent").allowed).toBe(false);
    expect(calculateMpesaCharge(100, "withdraw-agent").fee).toBe(11);
    expect(calculateMpesaCharge(2500, "withdraw-agent").fee).toBe(29);
    expect(calculateMpesaCharge(10000, "withdraw-agent").fee).toBe(115);
    expect(calculateMpesaCharge(100000, "withdraw-agent").fee).toBe(309);
    expect(calculateMpesaCharge(260000, "send-registered").allowed).toBe(false);
  });
});

describe("Loan & SACCO calculator", () => {
  it("computes reducing balance and flat rate loans cleanly with zero ending balance", () => {
    const reducing = calculateLoan({
      principal: 100000,
      annualRatePercent: 12,
      months: 12,
      method: "reducing",
    });
    expect(reducing.monthlyInstallment).toBe(8884.88);
    expect(reducing.schedule).toHaveLength(12);
    expect(reducing.schedule[11].endingBalance).toBe(0);
    expect(reducing.totalInterest).toBeLessThan(12000);

    const flat = calculateLoan({
      principal: 100000,
      annualRatePercent: 12,
      months: 12,
      method: "flat",
    });
    expect(flat.totalInterest).toBe(12000);
    expect(flat.totalRepayment).toBe(112000);
    expect(flat.schedule[11].endingBalance).toBe(0);
    expect(formatKes(flat.totalRepayment)).toBe("Ksh 112,000.00");
  });
});

describe("Phase 3 business & web utility engines", () => {
  it("computes profit margin, markup, and target selling prices accurately", () => {
    const res = calculateProfitMargin(800, 1000);
    expect(res.profit).toBe(200);
    expect(res.marginPercent).toBe(20);
    expect(res.markupPercent).toBe(25);
    expect(calculateSellingPriceFromMarkup(800, 25)).toBe(1000);
    expect(calculateSellingPriceFromMargin(800, 20)).toBe(1000);
  });

  it("computes percentage and fixed discounts cleanly", () => {
    const pct = calculateDiscount(5000, "percent", 15);
    expect(pct.discountAmount).toBe(750);
    expect(pct.finalPrice).toBe(4250);

    const fixed = calculateDiscount(5000, "fixed", 1000);
    expect(fixed.finalPrice).toBe(4000);
    expect(fixed.effectivePercent).toBe(20);
  });

  it("computes break-even units and guards non-viable unit pricing", () => {
    const ok = calculateBreakEven(150000, 500, 1250);
    expect(ok.viable).toBe(true);
    expect(ok.contributionMarginPerUnit).toBe(750);
    expect(ok.breakEvenUnits).toBe(200);
    expect(ok.breakEvenRevenue).toBe(250000);

    const bad = calculateBreakEven(150000, 1500, 1000);
    expect(bad.viable).toBe(false);
    expect(bad.breakEvenUnits).toBe(0);
  });

  it("normalizes Kenyan phone numbers for WhatsApp links", () => {
    expect(normalizeKenyanPhone("0793 587 026")).toBe("254793587026");
    expect(normalizeKenyanPhone("+254 712-345-678")).toBe("254712345678");
    expect(buildWhatsAppChatUrl("0793587026", "Hello team")).toBe(
      "https://wa.me/254793587026?text=Hello%20team",
    );
  });

  it("escapes HTML in email signatures and rejects javascript: URLs", () => {
    const html = buildEmailSignatureHtml({
      fullName: "Amina <script>alert(1)</script>",
      jobTitle: "Operations Lead",
      company: "Rift Logistics",
      phone: "+254 700 000 000",
      whatsapp: "0700000000",
      email: "amina@rift.co.ke",
      website: "javascript:alert(1)",
      location: "Nairobi, Kenya",
      accentHex: "#1d4ed8",
    });
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("javascript:");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("https://wa.me/254700000000");
  });

  it("generates CSPRNG passwords meeting requested constraints and computes entropy", () => {
    const pw = generateSecurePassword({
      length: 20,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
      excludeAmbiguous: true,
    });
    expect(pw).toHaveLength(20);
    expect(/[Il1O0o]/.test(pw)).toBe(false);
    expect(evaluatePasswordStrength(pw).score).toBeGreaterThanOrEqual(4);
    expect(evaluatePasswordStrength("1234").label).toBe("Weak");
  });
});

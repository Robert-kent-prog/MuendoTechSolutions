// Pure, browser-side calculation engines for Kenyan business tools (Phase 2).

function clampNonNegative(n: number): number {
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function formatKes(amount: number, includeSymbol = true): string {
  const safe = Number.isFinite(amount) ? amount : 0;
  const formatted = safe.toLocaleString("en-KE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return includeSymbol ? `Ksh ${formatted}` : formatted;
}

// ---------------------------------------------------------------------------
// 1. Kenya PAYE, SHIF, NSSF & Affordable Housing Levy Calculator (2026 rates)
// ---------------------------------------------------------------------------

export interface KenyaPayeInput {
  grossMonthly: number;
  includeNssf?: boolean;
  includeShif?: boolean;
  includeHousingLevy?: boolean;
  mortgageInterest?: number; // capped at KES 30,000/month
  postRetirementMedical?: number; // capped at KES 15,000/month
  insuranceReliefPremium?: number; // 15% of qualifying premiums, capped at KES 5,000/month
}

export interface PayeBandBreakdown {
  label: string;
  ratePercent: number;
  taxableSlice: number;
  tax: number;
}

export interface KenyaPayeResult {
  grossMonthly: number;
  nssfTier1: number;
  nssfTier2: number;
  nssfTotal: number;
  shif: number;
  housingLevy: number;
  allowableMortgage: number;
  allowableMedicalFund: number;
  totalAllowableDeductions: number;
  taxableIncome: number;
  grossPaye: number;
  personalRelief: number;
  insuranceRelief: number;
  netPaye: number;
  totalDeductions: number;
  netPay: number;
  effectiveTaxRatePercent: number;
  employerNssf: number;
  employerHousingLevy: number;
  totalEmployerCost: number;
  bands: PayeBandBreakdown[];
}

export const KENYA_PAYE_CONSTANTS = {
  personalReliefMonthly: 2400,
  nssfRate: 0.06,
  nssfLowerLimit: 9000, // NSSF Act 2013 Year 4 (effective Feb 2026)
  nssfUpperLimit: 108000, // Max employee NSSF = 6% of 108,000 = KES 6,480
  shifRate: 0.0275,
  shifMinimum: 300,
  housingLevyRate: 0.015,
  mortgageMonthlyCap: 30000,
  postRetirementMedicalMonthlyCap: 15000,
  insuranceReliefRate: 0.15,
  insuranceReliefMonthlyCap: 5000,
} as const;

const PAYE_BRACKETS: { label: string; width: number; rate: number }[] = [
  { label: "First Ksh 24,000", width: 24000, rate: 0.1 },
  { label: "Next Ksh 8,333 (24,001 to 32,333)", width: 8333, rate: 0.25 },
  { label: "Next Ksh 467,667 (32,334 to 500,000)", width: 467667, rate: 0.3 },
  { label: "Next Ksh 300,000 (500,001 to 800,000)", width: 300000, rate: 0.325 },
  { label: "Above Ksh 800,000", width: Number.POSITIVE_INFINITY, rate: 0.35 },
];

export function calculateKenyaPaye(input: KenyaPayeInput): KenyaPayeResult {
  const gross = clampNonNegative(input.grossMonthly);
  const includeNssf = input.includeNssf ?? true;
  const includeShif = input.includeShif ?? true;
  const includeHousingLevy = input.includeHousingLevy ?? true;

  // NSSF Tier I (up to 9,000) & Tier II (9,001 to 108,000)
  const tier1Base = includeNssf ? Math.min(gross, KENYA_PAYE_CONSTANTS.nssfLowerLimit) : 0;
  const tier2Base = includeNssf
    ? Math.max(
        0,
        Math.min(gross, KENYA_PAYE_CONSTANTS.nssfUpperLimit) - KENYA_PAYE_CONSTANTS.nssfLowerLimit,
      )
    : 0;
  const nssfTier1 = round2(tier1Base * KENYA_PAYE_CONSTANTS.nssfRate);
  const nssfTier2 = round2(tier2Base * KENYA_PAYE_CONSTANTS.nssfRate);
  const nssfTotal = round2(nssfTier1 + nssfTier2);

  // SHIF: 2.75% of gross, min KES 300 when gross > 0
  const shif =
    includeShif && gross > 0
      ? round2(Math.max(KENYA_PAYE_CONSTANTS.shifMinimum, gross * KENYA_PAYE_CONSTANTS.shifRate))
      : 0;

  // Affordable Housing Levy: 1.5% of gross
  const housingLevy = includeHousingLevy ? round2(gross * KENYA_PAYE_CONSTANTS.housingLevyRate) : 0;

  // Optional allowable deductions
  const allowableMortgage = round2(
    Math.min(
      clampNonNegative(input.mortgageInterest ?? 0),
      KENYA_PAYE_CONSTANTS.mortgageMonthlyCap,
    ),
  );
  const allowableMedicalFund = round2(
    Math.min(
      clampNonNegative(input.postRetirementMedical ?? 0),
      KENYA_PAYE_CONSTANTS.postRetirementMedicalMonthlyCap,
    ),
  );

  // Under Tax Laws (Amendment) Act 2024, NSSF, SHIF, and Housing Levy are allowable deductions before PAYE
  const totalAllowableDeductions = round2(
    nssfTotal + shif + housingLevy + allowableMortgage + allowableMedicalFund,
  );
  const taxableIncome = round2(Math.max(0, gross - totalAllowableDeductions));

  let remaining = taxableIncome;
  let rawPaye = 0;
  const bands: PayeBandBreakdown[] = PAYE_BRACKETS.map((b) => {
    const slice = remaining > 0 ? Math.min(remaining, b.width) : 0;
    const tax = round2(slice * b.rate);
    remaining = Math.max(0, remaining - slice);
    rawPaye += tax;
    return {
      label: b.label,
      ratePercent: b.rate * 100,
      taxableSlice: round2(slice),
      tax,
    };
  });

  const grossPaye = round2(rawPaye);
  const personalRelief = gross > 0 ? KENYA_PAYE_CONSTANTS.personalReliefMonthly : 0;
  const insuranceRelief =
    gross > 0
      ? round2(
          Math.min(
            clampNonNegative(input.insuranceReliefPremium ?? 0) *
              KENYA_PAYE_CONSTANTS.insuranceReliefRate,
            KENYA_PAYE_CONSTANTS.insuranceReliefMonthlyCap,
          ),
        )
      : 0;
  const netPaye = round2(Math.max(0, grossPaye - personalRelief - insuranceRelief));

  const totalDeductions = round2(nssfTotal + shif + housingLevy + netPaye);
  const netPay = round2(Math.max(0, gross - totalDeductions));
  const effectiveTaxRatePercent = gross > 0 ? round2((totalDeductions / gross) * 100) : 0;

  const employerNssf = nssfTotal;
  const employerHousingLevy = housingLevy;
  const totalEmployerCost = round2(gross + employerNssf + employerHousingLevy);

  return {
    grossMonthly: round2(gross),
    nssfTier1,
    nssfTier2,
    nssfTotal,
    shif,
    housingLevy,
    allowableMortgage,
    allowableMedicalFund,
    totalAllowableDeductions,
    taxableIncome,
    grossPaye,
    personalRelief,
    insuranceRelief,
    netPaye,
    totalDeductions,
    netPay,
    effectiveTaxRatePercent,
    employerNssf,
    employerHousingLevy,
    totalEmployerCost,
    bands,
  };
}

// ---------------------------------------------------------------------------
// 2. Kenya VAT Calculator (16% & Regional Presets)
// ---------------------------------------------------------------------------

export type VatDirection = "exclusive" | "inclusive";

export interface VatPreset {
  id: string;
  label: string;
  country: string;
  rate: number;
}

export const VAT_PRESETS: VatPreset[] = [
  { id: "ke-standard", label: "Kenya Standard (16%)", country: "Kenya", rate: 16 },
  { id: "ke-zero", label: "Zero-rated / Exempt (0%)", country: "Kenya", rate: 0 },
  { id: "ug-standard", label: "Uganda (18%)", country: "Uganda", rate: 18 },
  { id: "tz-standard", label: "Tanzania (18%)", country: "Tanzania", rate: 18 },
  { id: "rw-standard", label: "Rwanda (18%)", country: "Rwanda", rate: 18 },
  { id: "uk-standard", label: "UK (20%)", country: "United Kingdom", rate: 20 },
];

export interface VatResult {
  direction: VatDirection;
  rate: number;
  netAmount: number;
  vatAmount: number;
  grossAmount: number;
}

export function calculateVat(
  amount: number,
  ratePercent: number,
  direction: VatDirection,
): VatResult {
  const safeAmount = clampNonNegative(amount);
  const safeRate = clampNonNegative(ratePercent);
  const multiplier = safeRate / 100;

  if (direction === "exclusive") {
    const vatAmount = round2(safeAmount * multiplier);
    const grossAmount = round2(safeAmount + vatAmount);
    return {
      direction,
      rate: safeRate,
      netAmount: round2(safeAmount),
      vatAmount,
      grossAmount,
    };
  }

  const netAmount = safeRate > 0 ? round2(safeAmount / (1 + multiplier)) : round2(safeAmount);
  const vatAmount = round2(safeAmount - netAmount);
  return {
    direction,
    rate: safeRate,
    netAmount,
    vatAmount,
    grossAmount: round2(safeAmount),
  };
}

// ---------------------------------------------------------------------------
// 3. M-Pesa Transaction Charges Calculator (Safaricom Kenya KES Tariffs)
// ---------------------------------------------------------------------------

export type MpesaTransactionType = "send-registered" | "withdraw-agent";

export interface MpesaTariffBand {
  min: number;
  max: number;
  sendRegistered: number;
  withdrawAgent: number | null; // null = not allowed
}

export const MPESA_MAX_PER_TX = 250000;
export const MPESA_MAX_DAILY = 500000;

export const MPESA_TARIFF_BANDS: MpesaTariffBand[] = [
  { min: 1, max: 49, sendRegistered: 0, withdrawAgent: null },
  { min: 50, max: 100, sendRegistered: 0, withdrawAgent: 11 },
  { min: 101, max: 500, sendRegistered: 7, withdrawAgent: 29 },
  { min: 501, max: 1000, sendRegistered: 13, withdrawAgent: 29 },
  { min: 1001, max: 1500, sendRegistered: 23, withdrawAgent: 29 },
  { min: 1501, max: 2500, sendRegistered: 33, withdrawAgent: 29 },
  { min: 2501, max: 3500, sendRegistered: 52, withdrawAgent: 52 },
  { min: 3501, max: 5000, sendRegistered: 57, withdrawAgent: 69 },
  { min: 5001, max: 7500, sendRegistered: 78, withdrawAgent: 87 },
  { min: 7501, max: 10000, sendRegistered: 90, withdrawAgent: 115 },
  { min: 10001, max: 15000, sendRegistered: 100, withdrawAgent: 167 },
  { min: 15001, max: 20000, sendRegistered: 105, withdrawAgent: 185 },
  { min: 20001, max: 35000, sendRegistered: 108, withdrawAgent: 197 },
  { min: 35001, max: 50000, sendRegistered: 108, withdrawAgent: 278 },
  { min: 50001, max: 250000, sendRegistered: 108, withdrawAgent: 309 },
];

export interface MpesaChargeResult {
  amount: number;
  type: MpesaTransactionType;
  allowed: boolean;
  reason?: string;
  band: MpesaTariffBand | null;
  fee: number;
  totalDebited: number;
  // Extra helper: if sending money so the recipient can withdraw exact `amount` in cash
  recipientWithdrawFee: number | null;
  sendPlusWithdrawTotal: number | null;
}

export function findMpesaBand(amount: number): MpesaTariffBand | null {
  const rounded = Math.round(amount);
  if (!Number.isFinite(rounded) || rounded < 1 || rounded > MPESA_MAX_PER_TX) return null;
  return MPESA_TARIFF_BANDS.find((b) => rounded >= b.min && rounded <= b.max) ?? null;
}

export function calculateMpesaCharge(
  amount: number,
  type: MpesaTransactionType,
): MpesaChargeResult {
  const safe = clampNonNegative(amount);
  if (safe < 1) {
    return {
      amount: 0,
      type,
      allowed: false,
      reason: "Enter an amount of at least Ksh 1.",
      band: null,
      fee: 0,
      totalDebited: 0,
      recipientWithdrawFee: null,
      sendPlusWithdrawTotal: null,
    };
  }
  if (safe > MPESA_MAX_PER_TX) {
    return {
      amount: round2(safe),
      type,
      allowed: false,
      reason: `M-Pesa single-transaction limit is Ksh ${MPESA_MAX_PER_TX.toLocaleString("en-KE")}. Split into multiple transfers.`,
      band: null,
      fee: 0,
      totalDebited: round2(safe),
      recipientWithdrawFee: null,
      sendPlusWithdrawTotal: null,
    };
  }

  const band = findMpesaBand(safe);
  if (!band) {
    return {
      amount: round2(safe),
      type,
      allowed: false,
      reason: "Amount is outside supported M-Pesa tariff bands.",
      band: null,
      fee: 0,
      totalDebited: round2(safe),
      recipientWithdrawFee: null,
      sendPlusWithdrawTotal: null,
    };
  }

  if (type === "withdraw-agent" && band.withdrawAgent === null) {
    return {
      amount: round2(safe),
      type,
      allowed: false,
      reason: "Minimum cash withdrawal at an M-Pesa agent is Ksh 50.",
      band,
      fee: 0,
      totalDebited: round2(safe),
      recipientWithdrawFee: null,
      sendPlusWithdrawTotal: null,
    };
  }

  const fee = type === "send-registered" ? band.sendRegistered : (band.withdrawAgent ?? 0);
  const recipientWithdrawFee = band.withdrawAgent;
  let sendPlusWithdrawTotal: number | null = null;
  if (type === "send-registered" && recipientWithdrawFee !== null) {
    const amountToSend = safe + recipientWithdrawFee;
    const expandedBand = findMpesaBand(amountToSend);
    const expandedSendFee = expandedBand ? expandedBand.sendRegistered : fee;
    sendPlusWithdrawTotal = round2(amountToSend + expandedSendFee);
  }

  return {
    amount: round2(safe),
    type,
    allowed: true,
    band,
    fee,
    totalDebited: round2(safe + fee),
    recipientWithdrawFee,
    sendPlusWithdrawTotal,
  };
}

// ---------------------------------------------------------------------------
// 4. Loan & SACCO Repayment Calculator (Reducing Balance vs Flat Rate)
// ---------------------------------------------------------------------------

export type LoanInterestMethod = "reducing" | "flat";

export interface LoanInput {
  principal: number;
  annualRatePercent: number;
  months: number;
  method: LoanInterestMethod;
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  endingBalance: number;
}

export interface LoanResult {
  principal: number;
  annualRatePercent: number;
  months: number;
  method: LoanInterestMethod;
  monthlyInstallment: number;
  totalInterest: number;
  totalRepayment: number;
  schedule: AmortizationRow[];
}

export function calculateLoan(input: LoanInput): LoanResult {
  const principal = clampNonNegative(input.principal);
  const annualRatePercent = clampNonNegative(input.annualRatePercent);
  const months = Math.max(1, Math.min(360, Math.round(clampNonNegative(input.months) || 1)));

  if (principal === 0) {
    return {
      principal: 0,
      annualRatePercent,
      months,
      method: input.method,
      monthlyInstallment: 0,
      totalInterest: 0,
      totalRepayment: 0,
      schedule: [],
    };
  }

  const monthlyRate = annualRatePercent / 100 / 12;
  const schedule: AmortizationRow[] = [];

  if (input.method === "flat") {
    const years = months / 12;
    const totalInterest = round2(principal * (annualRatePercent / 100) * years);
    const totalRepayment = round2(principal + totalInterest);
    const monthlyInstallment = round2(totalRepayment / months);
    const monthlyPrincipal = round2(principal / months);
    const monthlyInterest = round2(totalInterest / months);

    let balance = principal;
    for (let m = 1; m <= months; m += 1) {
      const principalPaid = m === months ? round2(balance) : monthlyPrincipal;
      const interestPaid =
        m === months ? round2(totalInterest - monthlyInterest * (months - 1)) : monthlyInterest;
      balance = Math.max(0, round2(balance - principalPaid));
      schedule.push({
        month: m,
        payment: round2(principalPaid + interestPaid),
        principalPaid,
        interestPaid,
        endingBalance: balance,
      });
    }

    return {
      principal: round2(principal),
      annualRatePercent,
      months,
      method: "flat",
      monthlyInstallment,
      totalInterest,
      totalRepayment,
      schedule,
    };
  }

  // Reducing balance (standard amortization)
  const monthlyInstallment =
    monthlyRate === 0
      ? round2(principal / months)
      : round2(
          (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
            (Math.pow(1 + monthlyRate, months) - 1),
        );

  let balance = principal;
  let totalInterestAcc = 0;

  for (let m = 1; m <= months; m += 1) {
    const interestPaid = round2(balance * monthlyRate);
    let principalPaid = round2(monthlyInstallment - interestPaid);
    if (m === months || principalPaid > balance) {
      principalPaid = round2(balance);
    }
    const payment = round2(principalPaid + interestPaid);
    balance = Math.max(0, round2(balance - principalPaid));
    totalInterestAcc = round2(totalInterestAcc + interestPaid);
    schedule.push({
      month: m,
      payment,
      principalPaid,
      interestPaid,
      endingBalance: balance,
    });
  }

  const totalRepayment = round2(principal + totalInterestAcc);
  return {
    principal: round2(principal),
    annualRatePercent,
    months,
    method: "reducing",
    monthlyInstallment,
    totalInterest: totalInterestAcc,
    totalRepayment,
    schedule,
  };
}

// ---------------------------------------------------------------------------
// 5. Profit Margin & Markup Calculator
// ---------------------------------------------------------------------------

export interface ProfitMarginResult {
  cost: number;
  sellingPrice: number;
  profit: number;
  marginPercent: number;
  markupPercent: number;
}

export function calculateProfitMargin(cost: number, sellingPrice: number): ProfitMarginResult {
  const safeCost = clampNonNegative(cost);
  const safeSell = clampNonNegative(sellingPrice);
  const profit = round2(safeSell - safeCost);
  const marginPercent = safeSell > 0 ? round2((profit / safeSell) * 100) : 0;
  const markupPercent = safeCost > 0 ? round2((profit / safeCost) * 100) : 0;
  return {
    cost: round2(safeCost),
    sellingPrice: round2(safeSell),
    profit,
    marginPercent,
    markupPercent,
  };
}

export function calculateSellingPriceFromMarkup(cost: number, markupPercent: number): number {
  const safeCost = clampNonNegative(cost);
  const safeMarkup = clampNonNegative(markupPercent);
  return round2(safeCost * (1 + safeMarkup / 100));
}

export function calculateSellingPriceFromMargin(cost: number, marginPercent: number): number {
  const safeCost = clampNonNegative(cost);
  const safeMargin = Math.min(99.9, clampNonNegative(marginPercent));
  return round2(safeCost / (1 - safeMargin / 100));
}

// ---------------------------------------------------------------------------
// 6. Discount & Sale Price Calculator
// ---------------------------------------------------------------------------

export interface DiscountResult {
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
  effectivePercent: number;
}

export function calculateDiscount(
  originalPrice: number,
  mode: "percent" | "fixed",
  discountValue: number,
): DiscountResult {
  const safePrice = clampNonNegative(originalPrice);
  const safeVal = clampNonNegative(discountValue);
  const discountAmount =
    mode === "percent"
      ? round2(safePrice * (Math.min(100, safeVal) / 100))
      : round2(Math.min(safePrice, safeVal));
  const finalPrice = round2(Math.max(0, safePrice - discountAmount));
  const effectivePercent = safePrice > 0 ? round2((discountAmount / safePrice) * 100) : 0;
  return {
    originalPrice: round2(safePrice),
    discountAmount,
    finalPrice,
    effectivePercent,
  };
}

// ---------------------------------------------------------------------------
// 7. Break-Even Calculator
// ---------------------------------------------------------------------------

export interface BreakEvenResult {
  fixedCosts: number;
  variableCostPerUnit: number;
  sellingPricePerUnit: number;
  contributionMarginPerUnit: number;
  contributionMarginRatioPercent: number;
  viable: boolean;
  breakEvenUnits: number;
  breakEvenRevenue: number;
}

export function calculateBreakEven(
  fixedCosts: number,
  variableCostPerUnit: number,
  sellingPricePerUnit: number,
): BreakEvenResult {
  const fixed = clampNonNegative(fixedCosts);
  const variable = clampNonNegative(variableCostPerUnit);
  const price = clampNonNegative(sellingPricePerUnit);
  const cm = round2(price - variable);
  const cmRatio = price > 0 ? round2((cm / price) * 100) : 0;
  const viable = cm > 0;
  const breakEvenUnits = viable ? Math.ceil(fixed / cm) : 0;
  const breakEvenRevenue = viable ? round2((fixed / cm) * price) : 0;

  return {
    fixedCosts: round2(fixed),
    variableCostPerUnit: round2(variable),
    sellingPricePerUnit: round2(price),
    contributionMarginPerUnit: cm,
    contributionMarginRatioPercent: cmRatio,
    viable,
    breakEvenUnits,
    breakEvenRevenue,
  };
}

// ---------------------------------------------------------------------------
// 8. WhatsApp Click-to-Chat Link Generator (Kenya +254 aware)
// ---------------------------------------------------------------------------

export function normalizeKenyanPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("0") && digits.length === 10) {
    return `254${digits.slice(1)}`;
  }
  if ((digits.startsWith("7") || digits.startsWith("1")) && digits.length === 9) {
    return `254${digits}`;
  }
  return digits;
}

export function buildWhatsAppChatUrl(phone: string, message: string): string {
  const normalized = normalizeKenyanPhone(phone);
  if (!normalized) return "";
  const trimmed = message.trim();
  return trimmed
    ? `https://wa.me/${normalized}?text=${encodeURIComponent(trimmed)}`
    : `https://wa.me/${normalized}`;
}

// ---------------------------------------------------------------------------
// 9. HTML Email Signature Builder (XSS-safe escaped table markup)
// ---------------------------------------------------------------------------

export interface EmailSignatureInput {
  fullName: string;
  jobTitle: string;
  company: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  location: string;
  accentHex: string;
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeSafeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(trimmed)) return `https://${trimmed}`;
  return "";
}

export function buildEmailSignatureHtml(input: EmailSignatureInput): string {
  const color = /^#[0-9a-fA-F]{6}$/.test(input.accentHex) ? input.accentHex : "#1d4ed8";
  const name = escapeHtml(input.fullName.trim() || "Your Name");
  const titleParts = [input.jobTitle.trim(), input.company.trim()].filter(Boolean);
  const titleLine = escapeHtml(titleParts.join(" | "));
  const phone = input.phone.trim();
  const phoneHref = phone.replace(/[^+\d]/g, "");
  const waDigits = normalizeKenyanPhone(input.whatsapp.trim());
  const email = input.email.trim();
  const siteUrl = sanitizeSafeUrl(input.website);
  const siteDisplay = escapeHtml(input.website.trim().replace(/^https?:\/\//i, ""));
  const location = escapeHtml(input.location.trim());

  const rows: string[] = [];
  if (phone) {
    rows.push(
      `<span>Tel: <a href="tel:${escapeHtml(phoneHref)}" style="color:#0f172a;text-decoration:none;">${escapeHtml(phone)}</a></span>`,
    );
  }
  if (waDigits) {
    rows.push(
      `<span><a href="https://wa.me/${escapeHtml(waDigits)}" style="color:${color};text-decoration:none;font-weight:600;">WhatsApp</a></span>`,
    );
  }
  if (email) {
    rows.push(
      `<span><a href="mailto:${escapeHtml(email)}" style="color:#0f172a;text-decoration:none;">${escapeHtml(email)}</a></span>`,
    );
  }
  if (siteUrl) {
    rows.push(
      `<span><a href="${escapeHtml(siteUrl)}" style="color:${color};text-decoration:none;">${siteDisplay}</a></span>`,
    );
  }

  return [
    `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:#0f172a;border-collapse:collapse;">`,
    `  <tr>`,
    `    <td style="border-left:3px solid ${color};padding-left:14px;">`,
    `      <div style="font-size:15px;font-weight:700;color:#0f172a;">${name}</div>`,
    titleLine
      ? `      <div style="font-size:12px;color:#475569;margin-top:2px;">${titleLine}</div>`
      : "",
    rows.length > 0
      ? `      <div style="font-size:12px;color:#334155;margin-top:8px;">${rows.join(" &middot; ")}</div>`
      : "",
    location
      ? `      <div style="font-size:11px;color:#64748b;margin-top:4px;">${location}</div>`
      : "",
    `    </td>`,
    `  </tr>`,
    `</table>`,
  ]
    .filter(Boolean)
    .join("\n");
}

// ---------------------------------------------------------------------------
// 10. Password Generator & Strength Checker (CSPRNG, zero network calls)
// ---------------------------------------------------------------------------

export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{}:;,.?";
const AMBIGUOUS = /[Il1O0o]/g;

function randomIndex(max: number): number {
  if (max <= 1) return 0;
  const buf = new Uint32Array(1);
  const limit = Math.floor(0x100000000 / max) * max;
  let val = 0;
  do {
    crypto.getRandomValues(buf);
    val = buf[0];
  } while (val >= limit);
  return val % max;
}

export function generateSecurePassword(options: PasswordOptions): string {
  const length = Math.max(6, Math.min(64, Math.round(options.length)));
  const clean = (s: string) => (options.excludeAmbiguous ? s.replace(AMBIGUOUS, "") : s);

  const pools: string[] = [];
  if (options.uppercase) pools.push(clean(UPPER));
  if (options.lowercase) pools.push(clean(LOWER));
  if (options.numbers) pools.push(clean(DIGITS));
  if (options.symbols) pools.push(SYMBOLS);
  if (pools.length === 0) pools.push(clean(LOWER), clean(DIGITS));

  const combined = pools.join("");
  const chars: string[] = [];
  // Guarantee at least one character from each active pool
  for (const pool of pools) {
    if (chars.length < length) {
      chars.push(pool[randomIndex(pool.length)]);
    }
  }
  while (chars.length < length) {
    chars.push(combined[randomIndex(combined.length)]);
  }
  // Fisher-Yates shuffle using CSPRNG
  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = randomIndex(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

export interface PasswordStrengthResult {
  entropyBits: number;
  label: "Weak" | "Fair" | "Good" | "Strong" | "Very Strong";
  score: 1 | 2 | 3 | 4 | 5;
  poolSize: number;
}

export function evaluatePasswordStrength(password: string): PasswordStrengthResult {
  if (!password) {
    return { entropyBits: 0, label: "Weak", score: 1, poolSize: 0 };
  }
  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/\d/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

  const entropyBits = poolSize > 0 ? round2(password.length * Math.log2(poolSize)) : 0;
  if (entropyBits < 36) return { entropyBits, label: "Weak", score: 1, poolSize };
  if (entropyBits < 52) return { entropyBits, label: "Fair", score: 2, poolSize };
  if (entropyBits < 72) return { entropyBits, label: "Good", score: 3, poolSize };
  if (entropyBits < 96) return { entropyBits, label: "Strong", score: 4, poolSize };
  return { entropyBits, label: "Very Strong", score: 5, poolSize };
}

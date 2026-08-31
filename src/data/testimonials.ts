export interface Testimonial {
  name: string;
  role: string;
  result: string;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "John Muasya",
    role: "Founder, Machakos Retail SME",
    result: "Cleaner sales and profit visibility",
    quote:
      "Muendo Tech rebuilt our bookkeeping flow into a clean web platform. Daily sales, expenses, and profit are now one click away. Easy to work with and very responsive.",
  },
  {
    name: "Yvonne Wanjiru",
    role: "Operations Manager, Logistics Firm",
    result: "Fleet records moved out of spreadsheets",
    quote:
      "The fleet management system replaced three spreadsheets. We finally have visibility on every vehicle, driver, and trip. Worth every shilling.",
  },
  {
    name: "Xelvora Team",
    role: "Digital Agency Client",
    result: "Clearer agency website and booking flow",
    quote:
      "Muendo Tech helped shape Xelvora's website into a clear digital agency platform with services, products, portfolio, blogs, and a strong booking flow. The execution was practical and reliable.",
  },
];

export interface TrustedPartner {
  initials: string;
  name: string;
  type: string;
}

export const TRUSTED_PARTNERS: TrustedPartner[] = [
  { initials: "LF", name: "Linkfy", type: "Service marketplace" },
  { initials: "XV", name: "Xelvora", type: "Digital agency website" },
  { initials: "MR", name: "Machakos Retail", type: "Bookkeeping platform" },
  { initials: "EA", name: "Exam Admin", type: "Verification system" },
  { initials: "FM", name: "Fleet Manager", type: "Logistics software" },
  { initials: "CC", name: "CCU", type: "Public web platform" },
];

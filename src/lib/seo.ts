export const COMPANY = "Muendo Software Labs";
export const SITE_URL = "https://www.muendosoftwarelabs.co.ke";
export const SITE_IMAGE = `${SITE_URL}/og-image.png`;
export const EMAIL = "muendosoftwarelabs@gmail.com";
export const WHATSAPP = "+254793587026";
export const GITHUB = "Robert-kent-prog";
export const LINKEDIN = "robert-muendo-0329a0285";

export const defaultDescription =
  "Muendo Software Labs is a Nairobi-based software development company building reliable web apps, mobile apps, backend APIs, AI integrations, POS systems, and business software for SMEs and institutions in Kenya.";

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

export function pageHead({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}) {
  const url = absoluteUrl(path);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:image", content: SITE_IMAGE },
      { property: "og:image:alt", content: `${COMPANY} logo and brand card` },
      { property: "og:site_name", content: COMPANY },
      { property: "og:locale", content: "en_KE" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: SITE_IMAGE },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: COMPANY,
  legalName: COMPANY,
  alternateName: ["Muendo Labs", "Muendo Tech Solutions", "Muendo Software", "Muendo Software Labs Kenya"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.png`,
    caption: `${COMPANY} Logo`,
  },
  image: {
    "@type": "ImageObject",
    url: SITE_IMAGE,
    caption: `${COMPANY} — Software Development Company in Nairobi, Kenya`,
  },
  description: defaultDescription,
  email: EMAIL,
  telephone: WHATSAPP,
  priceRange: "$$",
  founder: {
    "@type": "Person",
    name: "Robert Muendo",
    jobTitle: "Founder & Lead Software Engineer",
    url: `https://github.com/${GITHUB}`,
    sameAs: [`https://github.com/${GITHUB}`, `https://linkedin.com/in/${LINKEDIN}`],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi County",
    addressCountry: "KE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "-1.286389",
    longitude: "36.817223",
  },
  areaServed: [
    { "@type": "Country", name: "Kenya" },
    { "@type": "City", name: "Nairobi" },
    { "@type": "Place", name: "East Africa" },
  ],
  sameAs: [`https://github.com/${GITHUB}`, `https://linkedin.com/in/${LINKEDIN}`],
  knowsAbout: [
    "Muendo Software Labs",
    "Software Development Company in Nairobi Kenya",
    "Web Application Engineering",
    "Mobile App Development (iOS & Android)",
    "Backend API Development",
    "M-Pesa Daraja Payment Integration",
    "Point of Sale (POS) Systems",
    "Business Management Software",
    "Artificial Intelligence & LLM Integration",
    "Cloud Infrastructure & DevOps",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: WHATSAPP,
    contactType: "customer service",
    email: EMAIL,
    availableLanguage: ["English", "Swahili"],
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software Engineering Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Web Application Development",
          description: "Production-ready web applications built with React, TanStack, Laravel, and Spring Boot.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mobile App Development",
          description: "Cross-platform Android and iOS mobile applications with secure backend integration.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "M-Pesa Daraja & Payment Systems",
          description: "STK push, C2B, B2C payment integration and automated transaction reconciliation.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Point of Sale (POS) & ERP Systems",
          description: "Inventory, stock, sales, and retail management software for Kenyan businesses.",
        },
      },
    ],
  },
};

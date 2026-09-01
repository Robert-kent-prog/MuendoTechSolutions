export const COMPANY = "Muendo Software Labs";
export const SITE_URL = "https://muendosoftwarelabs.co.ke";
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
  name: COMPANY,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: SITE_IMAGE,
  email: EMAIL,
  telephone: WHATSAPP,
  founder: { "@type": "Person", name: "Robert Muendo" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  areaServed: [
    { "@type": "Country", name: "Kenya" },
    { "@type": "Place", name: "East Africa" },
  ],
  sameAs: [`https://github.com/${GITHUB}`, `https://linkedin.com/in/${LINKEDIN}`],
  knowsAbout: [
    "Software development",
    "Web application development",
    "Mobile app development",
    "Backend API development",
    "M-Pesa integration",
    "Point of sale systems",
    "AI automation",
    "Database design",
  ],
};

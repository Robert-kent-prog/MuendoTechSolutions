export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  /** Pages where the photo appears, for the Credits page. */
  usedOn: { label: string; href: string }[];
}

export const PHOTOS = {
  "nairobi-skyline": {
    src: "/photos/nairobi-skyline.webp",
    width: 1920,
    height: 1280,
    alt: "The Nairobi skyline seen from Nairobi National Park",
    author: "Shadychiri",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:A_clash_of_worlds_-_Nairobi_skyline_from_the_Nairobi_National_park.jpg",
    usedOn: [
      { label: "About", href: "/about" },
      { label: "Industries", href: "/industries" },
    ],
  },
  "supermarket-produce": {
    src: "/photos/supermarket-produce.webp",
    width: 1920,
    height: 887,
    alt: "Fresh fruit and vegetables on shelves in a supermarket",
    author: "Queen Asali",
    license: "CC0 (public domain dedication)",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Fruits_and_vegetables_in_supermarket.jpg",
    usedOn: [{ label: "POS Systems", href: "/services/pos-systems" }],
  },
  "health-worker-dispensary": {
    src: "/photos/health-worker-dispensary.webp",
    width: 1920,
    height: 1440,
    alt: "A health worker at Miritini Dispensary in Mombasa preparing for work",
    author: "President's Malaria Initiative",
    license: "Public domain",
    licenseUrl: "https://commons.wikimedia.org/wiki/Template:PD-USGov",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:A_health_worker_at_Miritini_Dispensary_preparing_for_work_(14593012461).jpg",
    usedOn: [{ label: "Health and Clinic Systems", href: "/services/health-and-clinic-systems" }],
  },
  "trucks-kenya-road": {
    src: "/photos/trucks-kenya-road.webp",
    width: 1920,
    height: 1281,
    alt: "Trucks and traffic on Murang'a Road in Kenya",
    author: "Bahnfrend",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Murang%27a_Road,_2025_(01).jpg",
    usedOn: [{ label: "Fleet Management", href: "/services/fleet-management-systems" }],
  },
} satisfies Record<string, Photo>;

export type PhotoId = keyof typeof PHOTOS;

/** Which photo, if any, appears on each service page. */
export const SERVICE_PHOTOS: Record<string, PhotoId> = {
  "pos-systems": "supermarket-produce",
  "health-and-clinic-systems": "health-worker-dispensary",
  "fleet-management-systems": "trucks-kenya-road",
};

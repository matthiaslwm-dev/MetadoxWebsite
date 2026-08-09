/**
 * Central site configuration — metadata, navigation, contact.
 * Kept framework-agnostic so it can feed layout, navbar and footer.
 */

export const siteConfig = {
  name: "Metadox",
  legalName: "Metadox Pte. Ltd.",
  tagline: "Digital Transformation Consultancy",
  promise: "Helping Businesses & People Become AI Ready.",
  description:
    "Metadox is a digital transformation consultancy helping businesses adopt AI and modernise their technology — from workflow automation and software development to systems integration, data and workforce upskilling.",
  url: "https://www.metadox.ai",
  locale: "en_SG",
  contact: {
    email: "hello@metadox.ai",
    phone: "+65 8182 0759",
    /** Digits only, country code first — used to build wa.me links. */
    whatsapp: "6581820759",
    address: "Singapore",
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/metadox",
    x: "https://x.com/metadox",
    youtube: "https://youtube.com/@metadox",
  },
} as const;

/** Primary CTA reused across the site. */
export const primaryCta = {
  label: "Book a Free Discovery Call",
  href: "/booking",
} as const;

/** Calendly event that powers the booking page. */
export const calendlyUrl = "https://calendly.com/matthiaslwm/30min";

/**
 * Top-level navigation. Query params (not `#`) scroll to page sections.
 *
 * `Services` points at the archived homepage until the new landing page grows
 * its own solutions section.
 */
export const navItems = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/legacy-home?section=solutions" },
  { label: "GEO", href: "/geo" },
  { label: "Pricing", href: "/pricing" },
  { label: "Projects", href: "/projects" },
] as const;

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
    phone: "+65 6000 0000",
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
  label: "Book Free Consultation",
  href: "/?section=contact",
} as const;

/** Top-level navigation. Query params (not `#`) scroll to homepage sections. */
export const navItems = [
  { label: "About", href: "/about" },
  { label: "Framework", href: "/?section=framework" },
  { label: "Services", href: "/?section=solutions" },
  { label: "Projects", href: "/projects" },
  { label: "Grants", href: "/grants" },
] as const;

/** Footer link groups. */
export const footerNav = [
  {
    title: "Company",
    links: [
      { label: "About Metadox", href: "/about" },
      { label: "Our Framework", href: "#framework" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "AI Workflow Automation", href: "#solutions" },
      { label: "Cloud Data Migration", href: "#solutions" },
      { label: "AI Agents and Chatbots", href: "#solutions" },
      { label: "Software Development", href: "#solutions" },
      { label: "Systems Integration", href: "#solutions" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Grants & Funding", href: "/grants" },
      { label: "AI Readiness Assessment", href: "#readiness" },
      { label: "Resources", href: "#" },
    ],
  },
] as const;

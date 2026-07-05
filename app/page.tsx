import { Hero } from "@/components/sections/hero";
import { Readiness } from "@/components/sections/readiness";
import { CostOfWaiting } from "@/components/sections/cost-of-waiting";
import { Framework } from "@/components/sections/framework";
import { Solutions } from "@/components/sections/solutions";
import { CaseStudies } from "@/components/sections/case-studies";
import { Technologies } from "@/components/sections/technologies";
import { CTA } from "@/components/sections/cta";
import { siteConfig } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.legalName,
      alternateName: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      slogan: siteConfig.tagline,
      email: siteConfig.contact.email,
      areaServed: ["SG", "Asia"],
      knowsAbout: [
        "Artificial Intelligence",
        "AI Consulting",
        "AI Implementation",
        "Workforce Upskilling",
        "Digital Transformation",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { "@id": `${siteConfig.url}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Readiness />
      <CostOfWaiting />
      <Framework />
      <Solutions />
      <CaseStudies />
      <Technologies />
      <CTA />
    </>
  );
}

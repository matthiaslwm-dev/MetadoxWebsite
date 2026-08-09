import { LandingHeader } from "@/components/landing/header";
import { LandingHero } from "@/components/landing/hero";
import { LandingWhatWeBuild } from "@/components/landing/what-we-build";
import { LandingProcess } from "@/components/landing/process";
import { LandingTestimonials } from "@/components/landing/testimonials";
import { LandingCtaBanner } from "@/components/landing/cta-banner";
import { LandingFooter } from "@/components/landing/footer";
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
    <div className="lp-root relative min-h-screen bg-lp-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingHeader />
      <div>
        <LandingHero />
        <LandingWhatWeBuild />
        <LandingProcess />
        <LandingTestimonials />
        <LandingCtaBanner />
      </div>
      <LandingFooter />
    </div>
  );
}

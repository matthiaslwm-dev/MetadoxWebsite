import type { Metadata } from "next";
import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";
import { LegalPage } from "@/components/sections/legal-page";
import { legalLastUpdated, termsOfService } from "@/lib/legal-content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your access to and use of the Metadox website and services.",
  alternates: { canonical: "/terms-of-service" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/terms-of-service`,
    title: `Terms of Service | ${siteConfig.name}`,
    description:
      "The terms that govern your access to and use of the Metadox website and services.",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="lp-root relative min-h-screen bg-lp-background">
      <LandingHeader />
      <LegalPage
        title="Terms of Service"
        lastUpdated={legalLastUpdated}
        sections={termsOfService}
      />
      <LandingFooter />
    </div>
  );
}

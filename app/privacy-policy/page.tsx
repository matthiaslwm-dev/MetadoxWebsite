import type { Metadata } from "next";
import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";
import { LegalPage } from "@/components/sections/legal-page";
import { legalLastUpdated, privacyPolicy } from "@/lib/legal-content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Metadox collects, uses, discloses, and protects information when you visit our website or use our services.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/privacy-policy`,
    title: `Privacy Policy | ${siteConfig.name}`,
    description:
      "How Metadox collects, uses, discloses, and protects information when you visit our website or use our services.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="lp-root relative min-h-screen bg-lp-background">
      <LandingHeader />
      <LegalPage
        title="Privacy Policy"
        lastUpdated={legalLastUpdated}
        sections={privacyPolicy}
      />
      <LandingFooter />
    </div>
  );
}

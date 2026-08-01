import type { Metadata } from "next";
import { PricingHero } from "@/components/sections/pricing-hero";
import { PricingPlans } from "@/components/sections/pricing-plans";
import { PricingGrantBanner } from "@/components/sections/pricing-grant-banner";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent project pricing from Metadox — from $500 for focused builds to $5,000 for larger systems, plus enterprise engagements scoped on a call.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/pricing`,
    title: `Pricing — ${siteConfig.name}`,
    description:
      "Every project is scoped into a clear, fixed proposal before any work begins. One-time project fees, no monthly charges, and you own everything.",
  },
};

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingPlans />
      <PricingGrantBanner />
    </>
  );
}

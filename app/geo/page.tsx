import type { Metadata } from "next";
import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";
import { GeoHero } from "@/components/landing/geo-hero";
import { GeoDefinition } from "@/components/landing/geo-definition";
import { GeoProblem } from "@/components/landing/geo-problem";
import { GeoScore } from "@/components/landing/geo-score";
import { GeoCta } from "@/components/landing/geo-cta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Generative Engine Optimisation (GEO)",
  description:
    "Your customers are asking ChatGPT, Gemini, Perplexity and Copilot who to hire. Metadox makes sure the answer includes you, through audits, entity setup, answer-ready content and ongoing AI visibility tracking.",
  alternates: { canonical: "/geo" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/geo`,
    title: `Generative Engine Optimisation | ${siteConfig.name}`,
    description:
      "GEO makes your business visible inside AI assistants. See where you stand today and what it takes to be the business the models recommend.",
  },
};

export default function GeoPage() {
  // `lp-root` switches headings off the Space Grotesk display face onto Inter,
  // which is what makes this page read as part of the landing design.
  return (
    <div className="lp-root relative min-h-screen bg-lp-background">
      <LandingHeader />
      <GeoHero />
      <GeoDefinition />
      <GeoProblem />
      <GeoScore />
      <GeoCta />
      <LandingFooter />
    </div>
  );
}

import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about-hero";
import { About } from "@/components/sections/about";
import { Mission } from "@/components/sections/mission";
import { Team } from "@/components/sections/team";
import { PartnerWall } from "@/components/sections/partner-wall";
import { CTA } from "@/components/sections/cta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Metadox",
  description:
    "Founded in 2026, Metadox helps businesses embrace digital transformation through practical solutions — modern websites, custom software, AI automation, system integration and process optimisation.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/about`,
    title: `About Metadox — ${siteConfig.name}`,
    description:
      "Our story, mission and the team helping businesses transform with technology that is practical, scalable and built for real-world impact.",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <About />
      <Mission />
      <Team />
      <PartnerWall />
      <CTA />
    </>
  );
}

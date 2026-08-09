import type { Metadata } from "next";
import { LandingHeader } from "@/components/landing/header";
import { LandingAboutHero } from "@/components/landing/about-hero";
import { LandingAboutStory } from "@/components/landing/about-story";
import { LandingAboutFoundation } from "@/components/landing/about-foundation";
import { LandingAboutTeam } from "@/components/landing/about-team";
import { LandingFooter } from "@/components/landing/footer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Metadox",
  description:
    "Founded in 2026, Metadox helps businesses embrace digital transformation through practical solutions: modern websites, custom software, AI automation, system integration and process optimisation.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/about`,
    title: `About Metadox | ${siteConfig.name}`,
    description:
      "Our story, mission and the team helping businesses transform with technology that is practical, scalable and built for real-world impact.",
  },
};

export default function AboutPage() {
  // `lp-root` switches headings off the Space Grotesk display face onto Inter,
  // which is what makes this page read as part of the landing design rather
  // than the legacy site.
  return (
    <div className="lp-root relative min-h-screen bg-lp-background">
      <LandingHeader />
      <LandingAboutHero />
      <LandingAboutStory />
      <LandingAboutFoundation />
      <LandingAboutTeam />
      <LandingFooter />
    </div>
  );
}

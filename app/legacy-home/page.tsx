import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Readiness } from "@/components/sections/readiness";
import { CostOfWaiting } from "@/components/sections/cost-of-waiting";
import { Framework } from "@/components/sections/framework";
import { Solutions } from "@/components/sections/solutions";
import { CaseStudies } from "@/components/sections/case-studies";
import { Technologies } from "@/components/sections/technologies";
import { CTA } from "@/components/sections/cta";

/**
 * Archived original landing page.
 *
 * Kept intact and reachable so its sections stay reviewable while the new
 * homepage is in flight. Excluded from search and from the sitemap — the
 * canonical entry point is `/`.
 */
export const metadata: Metadata = {
  title: "Archived Homepage",
  robots: { index: false, follow: false },
};

export default function LegacyHome() {
  return (
    <>
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

import type { Metadata } from "next";
import { PortfolioHero } from "@/components/sections/portfolio-hero";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { CTA } from "@/components/sections/cta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Real business problems Metadox has solved for clients — workflow automation, web development, data migration, systems integration and more.",
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/projects`,
    title: `Projects — ${siteConfig.name}`,
    description:
      "Real business problems Metadox has solved for clients.",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioGrid />
      <CTA />
    </>
  );
}

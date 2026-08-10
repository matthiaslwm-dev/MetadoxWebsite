import type { Metadata } from "next";
import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";
import { LandingCtaBanner } from "@/components/landing/cta-banner";
import { ProjectsHero } from "@/components/landing/projects-hero";
import { ProjectsShowcase } from "@/components/landing/projects-showcase";
import { siteConfig } from "@/lib/site";
import { projectsCta } from "@/lib/projects-content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Real business problems Metadox has solved for clients: workflow automation, web development, data migration, systems integration and more.",
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/projects`,
    title: `Projects | ${siteConfig.name}`,
    description: "Real business problems Metadox has solved for clients.",
  },
};

export default function ProjectsPage() {
  return (
    <div className="lp-root relative min-h-screen bg-lp-background">
      <LandingHeader />
      <ProjectsHero />
      <ProjectsShowcase />
      <LandingCtaBanner content={projectsCta} wide />
      <LandingFooter />
    </div>
  );
}

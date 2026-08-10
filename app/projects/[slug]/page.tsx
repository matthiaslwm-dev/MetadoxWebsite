import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { portfolioProjects } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";
import { LandingCtaBanner } from "@/components/landing/cta-banner";
import { CaseStudyHero } from "@/components/landing/case-study/hero";
import { CaseStudyChallenge } from "@/components/landing/case-study/challenge";
import { CaseStudySolution } from "@/components/landing/case-study/solution";
import { CaseStudyWorkflow } from "@/components/landing/case-study/workflow";
import { CaseStudyGallery } from "@/components/landing/case-study/gallery";
import { CaseStudyImpact } from "@/components/landing/case-study/impact";
import { projectsCta } from "@/lib/projects-content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}/projects/${project.slug}`,
      title: `${project.name} | ${siteConfig.name}`,
      description: project.description,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="lp-root relative min-h-screen bg-lp-background">
      <LandingHeader />
      <CaseStudyHero project={project} />
      <CaseStudyChallenge project={project} />
      <CaseStudySolution project={project} />
      <CaseStudyWorkflow project={project} />
      <CaseStudyGallery project={project} />
      <CaseStudyImpact project={project} />
      <LandingCtaBanner content={projectsCta} wide />
      <LandingFooter />
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { portfolioProjects } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { CaseStudyHero } from "@/components/sections/case-study/hero";
import { Challenge } from "@/components/sections/case-study/challenge";
import { Solution } from "@/components/sections/case-study/solution";
import { Workflow } from "@/components/sections/case-study/workflow";
import { KeyFeatures } from "@/components/sections/case-study/features";
import { BusinessImpact } from "@/components/sections/case-study/business-impact";
import { Gallery } from "@/components/sections/case-study/gallery";
import { CTA } from "@/components/sections/cta";

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
      title: `${project.name} — ${siteConfig.name}`,
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
    <>
      <CaseStudyHero project={project} />
      <Challenge project={project} />
      <Solution project={project} />
      <Workflow project={project} />
      <KeyFeatures project={project} />
      <BusinessImpact project={project} />
      <Gallery project={project} />
      <CTA />
    </>
  );
}

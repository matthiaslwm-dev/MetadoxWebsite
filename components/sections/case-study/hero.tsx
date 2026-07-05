import Link from "next/link";
import { ArrowLeft, ArrowRight, Building2, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/motion";
import type { PortfolioProject } from "@/lib/content";

export function CaseStudyHero({ project }: { project: PortfolioProject }) {
  return (
    <section className="relative overflow-hidden bg-brand-gradient pb-20 pt-[calc(var(--header-h)+2.5rem)] text-white sm:pb-28">
      <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-40" />
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-blue/25 blur-[130px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-blue-bright/15 blur-[110px]" />

      <Container className="relative">
        <div className="max-w-2xl">
          <FadeIn>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Back to Projects
            </Link>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge tone="dark">
                <Sparkles className="size-3.5 text-blue-bright" />
                {project.category}
              </Badge>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60">
                <Building2 className="size-3.5" />
                {project.industry}
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.16}>
            <h1 className="mt-6 font-heading text-[2.6rem] font-bold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {project.name}
            </h1>
          </FadeIn>

          <FadeIn delay={0.24}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              {project.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.32}>
            <div className="mt-8">
              <Button href="/#contact" size="lg">
                Contact Metadox
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

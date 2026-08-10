import Link from "next/link";
import { ArrowLeft, Building2, ExternalLink } from "lucide-react";
import { LpButton } from "../lp-button";
import { FadeIn } from "@/components/ui/motion";
import type { PortfolioProject } from "@/lib/content";

export function CaseStudyHero({ project }: { project: PortfolioProject }) {
  return (
    <section className="relative overflow-hidden bg-lp-background px-5 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 md:pt-36">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(1,94,232,0.08),transparent_60%)]" />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <FadeIn>
          <Link
            href="/projects"
            // Negative margin cancels the padding optically, so the target
            // grows to a tappable height without moving the baseline.
            className="-my-2 inline-flex items-center gap-1.5 py-2 text-sm font-medium text-lp-muted-foreground transition-colors hover:text-lp-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-lp-border bg-lp-card px-3.5 py-1.5 text-xs font-medium text-lp-primary shadow-sm">
              {project.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-lp-muted-foreground sm:text-sm">
              <Building2 className="h-3.5 w-3.5" />
              {project.industry}
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.16}>
          <h1 className="mt-6 text-balance text-3xl font-extrabold leading-tight text-lp-foreground sm:text-4xl md:text-5xl">
            {project.name}
          </h1>
        </FadeIn>

        <FadeIn delay={0.24}>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-lp-muted-foreground">
            {project.description}
          </p>
        </FadeIn>

        {project.demo.liveUrl ? (
          <FadeIn delay={0.32}>
            <div className="mt-8">
              <LpButton href={project.demo.liveUrl} variant="hero">
                Try the Live Demo
                <ExternalLink className="h-4 w-4" />
              </LpButton>
            </div>
          </FadeIn>
        ) : null}
      </div>
    </section>
  );
}

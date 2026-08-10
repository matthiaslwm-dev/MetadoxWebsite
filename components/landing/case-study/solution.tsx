import { Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/motion";
import type { PortfolioProject } from "@/lib/content";

export function CaseStudySolution({ project }: { project: PortfolioProject }) {
  return (
    <section className="relative scroll-mt-24 bg-lp-muted/30 px-5 py-14 sm:px-6 sm:py-16 lg:py-20">
      <Reveal className="mx-auto w-full max-w-3xl rounded-[1.25rem] border border-lp-border bg-lp-card p-10 text-center shadow-sm">
        <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-lp-border bg-lp-muted text-lp-primary">
          <Sparkles className="h-5 w-5" />
        </span>
        <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-lp-primary">
          Our Solution
        </span>
        <h2 className="mb-4 text-balance text-2xl font-extrabold text-lp-foreground sm:text-3xl">
          How Metadox solved it
        </h2>
        <p className="text-lg leading-relaxed text-lp-muted-foreground">
          {project.solution.description}
        </p>
      </Reveal>
    </section>
  );
}

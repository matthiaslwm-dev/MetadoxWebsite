"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { LpButton } from "./lp-button";
import { Reveal } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { showcaseProjects } from "@/lib/projects-content";

const ALL = "All";

/**
 * Filter pills plus one split-layout project card: category and impact on
 * the left, challenge and solution on the right. Styled after a reference
 * "past projects" page, carried over into the `lp-*` palette.
 *
 * Only one project ships today, so the filter list is derived rather than
 * hardcoded: it stays correct the day a second project is added instead of
 * silently going stale.
 */
export function ProjectsShowcase() {
  const filters = useMemo(
    () => [ALL, ...Array.from(new Set(showcaseProjects.map((p) => p.filterGroup)))],
    [],
  );
  const [activeFilter, setActiveFilter] = useState(ALL);

  const visibleProjects =
    activeFilter === ALL
      ? showcaseProjects
      : showcaseProjects.filter((p) => p.filterGroup === activeFilter);

  return (
    <section className="relative bg-lp-background px-6 pb-24 pt-4">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal className="mb-10 flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold transition-colors duration-200",
                activeFilter === filter
                  ? "border-lp-primary bg-lp-primary text-lp-primary-foreground shadow-lp-soft"
                  : "border-lp-border bg-lp-card text-lp-foreground hover:border-lp-primary/40",
              )}
            >
              {filter}
            </button>
          ))}
        </Reveal>

        <div className="flex flex-col gap-6">
          {visibleProjects.map((project) => (
            <Reveal
              key={project.slug}
              className="overflow-hidden rounded-[1.25rem] border border-lp-border bg-lp-card shadow-sm"
            >
              <div className="grid gap-8 p-8 md:grid-cols-[320px_1fr] md:gap-0 md:divide-x md:divide-lp-border">
                <div className="md:pr-8">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold text-lp-foreground">
                      {project.name}
                    </h3>
                    <span className="shrink-0 rounded-full bg-lp-muted px-3 py-1 text-[0.7rem] font-medium text-lp-muted-foreground">
                      {project.category}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-lp-muted-foreground">
                    {project.industry}
                  </p>

                  <div className="mt-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-lp-muted-foreground">
                      {project.impactLabel}
                    </span>
                    <p className="mt-1 text-2xl font-extrabold leading-snug text-lp-foreground">
                      {project.impactHeadline}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag.name}
                        className="inline-flex items-center gap-1.5 rounded-full bg-lp-muted px-3 py-1 text-xs font-medium text-lp-foreground"
                      >
                        <tag.icon className={`h-3.5 w-3.5 ${tag.colorClassName}`} />
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6">
                    <LpButton
                      href={project.ctaHref}
                      variant="hero"
                      className="h-10 px-5 text-xs"
                    >
                      {project.ctaLabel}
                      <ArrowRight className="h-4 w-4" />
                    </LpButton>
                  </div>
                </div>

                <div className="md:pl-8">
                  <h4 className="text-sm font-bold text-lp-foreground">
                    Challenge
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-lp-muted-foreground">
                    {project.challenge}
                  </p>

                  <h4 className="mt-6 text-sm font-bold text-lp-foreground">
                    Solution
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-lp-muted-foreground">
                    {project.solution}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

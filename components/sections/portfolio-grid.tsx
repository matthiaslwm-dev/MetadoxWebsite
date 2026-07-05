"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Globe2, Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { portfolioProjects, externalPortfolioProjects } from "@/lib/content";

const ALL = "All";

const bannerByFilterGroup: Record<string, { icon: typeof Zap; className: string }> = {
  "AI Automation": { icon: Zap, className: "bg-brand-gradient" },
  "Web Development": { icon: Globe2, className: "bg-gradient-to-br from-emerald-600 to-teal-800" },
};

type Card = {
  key: string;
  filterGroup: string;
  category: string;
  industry?: string;
  name: string;
  description: string;
  ctaLabel: string;
  href: string;
};

const cards: Card[] = [
  ...portfolioProjects.map((project) => ({
    key: project.slug,
    filterGroup: project.filterGroup,
    category: project.category,
    industry: project.industry,
    name: project.name,
    description: project.description,
    ctaLabel: "View Case Study",
    href: `/projects/${project.slug}`,
  })),
  ...externalPortfolioProjects.map((project) => ({
    key: project.name,
    filterGroup: project.filterGroup,
    category: project.category,
    name: project.name,
    description: project.description,
    ctaLabel: "View Website",
    href: project.url,
  })),
];

export function PortfolioGrid() {
  const filters = useMemo(
    () => [ALL, ...Array.from(new Set(cards.map((card) => card.filterGroup)))],
    [],
  );
  const [activeFilter, setActiveFilter] = useState(ALL);

  const visibleCards =
    activeFilter === ALL ? cards : cards.filter((card) => card.filterGroup === activeFilter);

  return (
    <section id="work" className="section-pad relative scroll-mt-24 bg-canvas">
      <Container>
        <SectionHeading
          align="left"
          eyebrow="Our Work"
          title={
            <>
              Problems we&apos;ve <span className="text-gradient">solved for clients</span>
            </>
          }
          description="Every project here started as a real business challenge — this is how we solved it."
        />

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors duration-200",
                activeFilter === filter
                  ? "border-blue bg-blue text-white shadow-soft"
                  : "border-line bg-white text-muted hover:border-blue/40 hover:text-navy",
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <Stagger key={activeFilter} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCards.map((card) => {
            const banner = bannerByFilterGroup[card.filterGroup];
            const BannerIcon = banner?.icon ?? Zap;

            return (
              <StaggerItem key={card.key} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                  <div
                    className={cn(
                      "relative flex h-36 items-center justify-center",
                      banner?.className ?? "bg-brand-gradient",
                    )}
                  >
                    <span className="absolute left-4 top-4 w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                      {card.category}
                    </span>
                    <BannerIcon className="size-10 text-white/40" />
                  </div>

                  <div className="flex flex-1 flex-col p-8">
                    {card.industry ? (
                      <span className="text-xs font-medium uppercase tracking-wide text-muted">
                        {card.industry}
                      </span>
                    ) : null}
                    <h3 className="mt-2 font-heading text-2xl font-bold text-navy">
                      {card.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {card.description}
                    </p>
                    <div className="mt-7">
                      <Button href={card.href} variant="outline">
                        {card.ctaLabel}
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                      </Button>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}

import { ArrowRight, Clock } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import type { PortfolioProject } from "@/lib/content";

export function CaseStudyChallenge({ project }: { project: PortfolioProject }) {
  const { challenge } = project;

  return (
    <section className="relative scroll-mt-24 bg-lp-background px-5 py-14 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-lp-primary">
            The Challenge
          </span>
          <h2 className="mb-4 text-balance text-2xl font-extrabold text-lp-foreground sm:text-3xl md:text-4xl">
            {challenge.title} {challenge.highlight}
          </h2>
          <p className="text-lg text-lp-muted-foreground">{challenge.description}</p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mx-auto mt-8 flex max-w-2xl items-start gap-3 rounded-2xl border border-lp-border bg-lp-card p-5 shadow-sm"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lp-muted text-lp-primary">
            <Clock className="h-4 w-4" />
          </span>
          <p className="text-sm leading-relaxed text-lp-muted-foreground">
            {challenge.calloutTitle}{" "}
            <span className="font-semibold text-lp-foreground">
              {challenge.calloutHighlight}
            </span>
          </p>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {challenge.painPoints.map((point) => (
            <StaggerItem key={point.label} className="h-full">
              <div className="flex h-full items-center gap-2.5 rounded-xl border border-lp-border bg-lp-card px-3.5 py-3 shadow-sm transition-colors hover:border-lp-primary/30">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-lp-muted text-lp-primary">
                  <point.icon className="h-3.5 w-3.5" />
                </span>
                <p className="text-sm font-semibold leading-snug text-lp-foreground">
                  {point.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal
          delay={0.1}
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {challenge.flow.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-lp-border bg-lp-card px-3.5 py-1.5 text-xs font-medium text-lp-foreground shadow-sm">
                <step.icon className={`h-4 w-4 ${step.colorClassName}`} />
                {step.label}
              </span>
              {i < challenge.flow.length - 1 ? (
                <ArrowRight className="h-4 w-4 shrink-0 text-lp-border" />
              ) : null}
            </div>
          ))}
        </Reveal>
        <p className="mt-4 text-center text-sm font-medium text-lp-muted-foreground">
          {challenge.flowWarning}
        </p>
      </div>
    </section>
  );
}

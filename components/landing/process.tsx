import { ArrowRight } from "lucide-react";
import { LpButton } from "./lp-button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { processSteps } from "@/lib/landing-content";
import { primaryCta } from "@/lib/site";

export function LandingProcess() {
  return (
    <section id="process" className="relative bg-lp-background px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="mb-16 text-center">
          <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-lp-primary">
            How We Work
          </span>
          <h2 className="mb-4 text-2xl font-bold text-lp-foreground sm:text-3xl md:text-4xl">
            Our Process
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-lp-muted-foreground">
            A methodical, low-risk approach that starts with understanding your
            business, not jumping straight into tools.
          </p>
        </Reveal>

        <div className="relative">
          {/* Connective rail: horizontal across the cards on desktop. */}
          <div className="absolute left-0 right-0 top-24 hidden h-0.5 bg-lp-border lg:block" />

          {/* Steps arrive left to right, which matches the order you read the
              process in and the direction of the connective rail. */}
          <Stagger className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6">
            {processSteps.map((step, index) => (
              <StaggerItem key={step.number} className="relative">
                {index < processSteps.length - 1 && (
                  <div className="absolute left-6 top-16 -z-10 h-[calc(100%+2rem)] w-0.5 bg-lp-border lg:hidden" />
                )}

                <div className="h-full rounded-2xl border border-lp-border bg-lp-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-lp-primary/30 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none">
                  <div className="relative mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-lp-primary bg-lp-primary/10">
                      <step.icon className="h-5 w-5 text-lp-primary" />
                    </div>
                    <span className="absolute -right-2 -top-2 rounded-full border border-lp-primary/30 bg-lp-background px-2 py-0.5 text-xs font-bold text-lp-primary">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-lp-foreground">
                    {step.title}
                  </h3>
                  <p className="mb-4 text-sm font-medium text-lp-primary">
                    {step.benefit}
                  </p>

                  <ul className="space-y-3">
                    {step.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-lp-muted-foreground"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lp-primary/60" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal className="mt-16 text-center">
          <p className="mb-6 text-lp-muted-foreground">
            Ready to see where AI can help your business?
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <LpButton href={primaryCta.href}>
              {primaryCta.label}
              <ArrowRight className="h-5 w-5" />
            </LpButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

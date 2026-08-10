import { CheckCircle2 } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import type { PortfolioProject } from "@/lib/content";

export function CaseStudyImpact({ project }: { project: PortfolioProject }) {
  const { businessImpact, businessValue } = project;

  return (
    <section className="relative scroll-mt-24 bg-lp-background px-6 py-20">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-lp-primary">
            Business Impact
          </span>
          <h2 className="mb-4 text-balance text-2xl font-extrabold text-lp-foreground sm:text-3xl md:text-4xl">
            What this means day to day
          </h2>
          <p className="text-lg text-lp-muted-foreground">
            {businessImpact.description}
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {businessImpact.stats.map((stat) => (
            <StaggerItem key={stat.label} className="h-full">
              <div className="flex h-full flex-col gap-4 rounded-[1.25rem] border border-lp-border bg-lp-card p-7 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-lp-muted text-lp-primary">
                  <stat.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-lp-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold leading-tight text-lp-foreground sm:text-3xl">
                    {stat.value}
                  </p>
                  {stat.detail ? (
                    <p className="mt-1 text-sm font-medium text-lp-muted-foreground">
                      {stat.detail}
                    </p>
                  ) : null}
                  {stat.note ? (
                    <p className="mt-1 text-sm font-semibold text-lp-primary">
                      {stat.note}
                    </p>
                  ) : null}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {businessValue.length ? (
          <Reveal
            delay={0.1}
            className="mx-auto mt-10 max-w-3xl rounded-[1.25rem] border border-lp-border bg-lp-card p-8 shadow-sm"
          >
            <h3 className="mb-5 text-center text-sm font-bold uppercase tracking-wider text-lp-foreground">
              Why it matters
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {businessValue.map((value) => (
                <li
                  key={value}
                  className="flex items-start gap-2.5 text-sm text-lp-muted-foreground"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-lp-primary" />
                  {value}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

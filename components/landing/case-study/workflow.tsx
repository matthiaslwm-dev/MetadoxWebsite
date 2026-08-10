import { ArrowRight, Check, X } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import type { PortfolioProject } from "@/lib/content";

const kpiTone = {
  red: "text-red-500",
  green: "text-emerald-600",
  brand: "text-lp-primary",
} as const;

export function CaseStudyWorkflow({ project }: { project: PortfolioProject }) {
  const { workflow, name, beforeAfterTable } = project;

  return (
    <section className="relative scroll-mt-24 bg-lp-background px-6 py-20">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-lp-primary">
            Workflow
          </span>
          <h2 className="mb-4 text-balance text-2xl font-extrabold text-lp-foreground sm:text-3xl md:text-4xl">
            Before vs after
          </h2>
          <p className="text-lg text-lp-muted-foreground">
            From manual admin to an automated {name} workflow.
          </p>
        </Reveal>

        <Stagger className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {workflow.kpis.map((kpi, i) => (
            <div key={kpi.label} className="flex items-center gap-3">
              <StaggerItem>
                <div className="flex w-40 flex-col gap-2 rounded-2xl border border-lp-border bg-lp-card p-4 shadow-sm">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 text-lg font-bold",
                      kpiTone[kpi.tone],
                    )}
                  >
                    <kpi.icon className="h-4 w-4" />
                    {kpi.value}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-lp-foreground">
                      {kpi.label}
                    </p>
                    <p className="text-xs text-lp-muted-foreground">{kpi.detail}</p>
                  </div>
                </div>
              </StaggerItem>
              {i < workflow.kpis.length - 1 ? (
                <ArrowRight className="h-5 w-5 shrink-0 text-lp-border" />
              ) : null}
            </div>
          ))}
        </Stagger>

        {beforeAfterTable.length ? (
          <Reveal
            delay={0.1}
            className="mt-12 overflow-hidden rounded-[1.25rem] border border-lp-border bg-lp-card shadow-sm"
          >
            <div className="grid grid-cols-2 divide-x divide-lp-border border-b border-lp-border text-sm font-semibold">
              <div className="flex items-center gap-2 px-6 py-3 text-lp-muted-foreground">
                <X className="h-4 w-4 text-red-500" />
                Before
              </div>
              <div className="flex items-center gap-2 px-6 py-3 text-lp-foreground">
                <Check className="h-4 w-4 text-emerald-600" />
                After
              </div>
            </div>
            {beforeAfterTable.map((row, i) => (
              <div
                key={row.before}
                className={cn(
                  "grid grid-cols-2 divide-x divide-lp-border text-sm",
                  i > 0 && "border-t border-lp-border",
                )}
              >
                <div className="px-6 py-4 text-lp-muted-foreground">{row.before}</div>
                <div className="px-6 py-4 font-medium text-lp-foreground">
                  {row.after}
                </div>
              </div>
            ))}
          </Reveal>
        ) : null}

        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {workflow.stats.map((stat) => (
            <StaggerItem key={stat.label} className="h-full">
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-lp-border bg-lp-card p-5 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-lp-muted text-lp-primary">
                  <stat.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xl font-bold text-lp-foreground">{stat.value}</p>
                  <p className="text-sm font-semibold text-lp-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-sm leading-snug text-lp-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

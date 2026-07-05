import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { WorkflowBefore } from "@/components/sections/case-study/workflow-before";
import { WorkflowAfter } from "@/components/sections/case-study/workflow-after";
import { cn } from "@/lib/utils";
import type { PortfolioProject } from "@/lib/content";

const kpiTone = {
  red: { border: "border-red-100", icon: "text-red-500", value: "text-red-500" },
  green: { border: "border-emerald-100", icon: "text-emerald-500", value: "text-emerald-500" },
  brand: { border: "border-blue/15 bg-blue-soft", icon: "text-blue", value: "text-blue" },
} as const;

const statTone = {
  blue: "bg-blue-soft text-blue",
  green: "bg-emerald-50 text-emerald-600",
  purple: "bg-violet-50 text-violet-600",
  orange: "bg-amber-50 text-amber-600",
} as const;

export function Workflow({ project }: { project: PortfolioProject }) {
  const { workflow, name } = project;

  return (
    <section className="section-pad relative scroll-mt-24 bg-canvas">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Workflow"
            title={
              <>
                Before <span className="text-gradient">vs After</span>
              </>
            }
            description="From manual admin to automated workflow."
            className="lg:max-w-md"
          />

          <Stagger className="flex flex-wrap items-center gap-3">
            {workflow.kpis.map((kpi, i) => (
              <div key={kpi.label} className="flex items-center gap-3">
                <StaggerItem>
                  <div
                    className={cn(
                      "flex w-40 flex-col gap-2 rounded-2xl border bg-white p-4",
                      kpiTone[kpi.tone].border,
                    )}
                  >
                    <span className={cn("inline-flex items-center gap-1.5 text-lg font-bold", kpiTone[kpi.tone].value)}>
                      <kpi.icon className="size-4" />
                      {kpi.value}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-navy">{kpi.label}</p>
                      <p className="text-xs text-muted">{kpi.detail}</p>
                    </div>
                  </div>
                </StaggerItem>
                {i < workflow.kpis.length - 1 ? (
                  <ArrowRight className="size-5 shrink-0 text-line" />
                ) : null}
              </div>
            ))}
          </Stagger>
        </div>

        <div className="mt-12 flex flex-col gap-6">
          <WorkflowBefore before={workflow.before} />
          <WorkflowAfter after={workflow.after} projectName={name} />
        </div>

        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {workflow.stats.map((stat) => (
            <StaggerItem key={stat.label} className="h-full">
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-5">
                <span
                  className={cn(
                    "inline-flex size-11 items-center justify-center rounded-xl",
                    statTone[stat.tone],
                  )}
                >
                  <stat.icon className="size-5" />
                </span>
                <div>
                  <p className="font-heading text-xl font-bold text-navy">{stat.value}</p>
                  <p className="text-sm font-semibold text-navy">{stat.label}</p>
                  <p className="mt-1 text-sm leading-snug text-muted">{stat.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

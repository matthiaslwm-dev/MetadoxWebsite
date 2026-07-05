import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import type { PortfolioProject } from "@/lib/content";

export function WorkflowAfter({
  after,
  projectName,
}: {
  after: PortfolioProject["workflow"]["after"];
  projectName: string;
}) {
  return (
    <div className="rounded-3xl border border-blue/15 bg-gradient-to-br from-blue-soft/60 to-white p-6 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[13rem_1fr] lg:gap-10">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue">After</p>
          <h3 className="font-heading text-xl font-bold text-navy">With {projectName}</h3>

          <div className="rounded-2xl border border-blue/15 bg-white p-4">
            <p className="text-2xl font-bold text-blue">{after.timeValue}</p>
            <p className="text-sm text-muted">{after.timeLabel}</p>
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl border border-blue/15 bg-white p-4">
            <CheckCircle2 className="size-4 shrink-0 text-blue" />
            <p className="text-sm font-medium leading-snug text-ink/80">{after.badge}</p>
          </div>
        </div>

        <div className="min-w-0">
          <div className="-mx-1 overflow-x-auto px-1 pb-2">
            <div className="flex min-w-[900px] items-center gap-3 lg:min-w-0">
              <div className="flex w-40 shrink-0 flex-col items-center gap-2 rounded-2xl border border-blue/15 bg-white p-4 text-center">
                <span className="flex size-11 items-center justify-center rounded-xl bg-blue-soft text-blue">
                  <after.customerStep.icon className="size-5" />
                </span>
                <p className="text-sm font-semibold leading-snug text-navy">
                  {after.customerStep.title}
                </p>
                <p className="text-xs leading-snug text-muted">
                  {after.customerStep.description}
                </p>
              </div>

              <ArrowRight className="size-5 shrink-0 text-blue/40" />

              <div className="flex-1 rounded-2xl border border-dashed border-blue/30 bg-white/60 p-4">
                <p className="mb-4 flex items-center justify-center gap-1.5 text-sm font-semibold text-blue">
                  <Sparkles className="size-4" />
                  {after.automationLabel}
                </p>
                <Stagger className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {after.automationSteps.map((step) => (
                    <StaggerItem key={step.title}>
                      <div className="flex h-full flex-col items-center gap-2 rounded-xl bg-canvas p-3 text-center">
                        <span className="flex size-10 items-center justify-center rounded-full bg-blue-soft text-blue">
                          <step.icon className="size-4" />
                        </span>
                        <p className="text-xs font-semibold leading-snug text-navy">
                          {step.title}
                        </p>
                        <p className="text-[11px] leading-snug text-muted">
                          {step.description}
                        </p>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>

              <ArrowRight className="size-5 shrink-0 text-blue/40" />

              <div className="flex w-40 shrink-0 flex-col items-center gap-2 rounded-2xl border border-blue/15 bg-white p-4 text-center">
                <span className="flex size-11 items-center justify-center rounded-full bg-blue-soft text-blue">
                  <after.reviewStep.icon className="size-5" />
                </span>
                <p className="text-sm font-semibold leading-snug text-navy">
                  {after.reviewStep.title}
                </p>
                <p className="text-xs leading-snug text-muted">
                  {after.reviewStep.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { AlertTriangle, RefreshCw } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import type { PortfolioProject } from "@/lib/content";

type Step = { title: string; description: string; icon: LucideIcon | IconType };

export function WorkflowBefore({
  before,
}: {
  before: PortfolioProject["workflow"]["before"];
}) {
  const n = before.steps.length;
  const toX = (i: number) => ((i + 0.5) / n) * 1000;
  const firstX = toX(0);
  const lastX = toX(n - 1);

  return (
    <div className="rounded-3xl border border-red-100 bg-gradient-to-br from-red-50/70 to-white p-6 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[13rem_1fr] lg:gap-10">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">Before</p>
          <h3 className="font-heading text-xl font-bold text-navy">Manual Process</h3>

          <div className="rounded-2xl border border-red-100 bg-white p-4">
            <p className="text-2xl font-bold text-red-500">{before.timeValue}</p>
            <p className="text-sm text-muted">{before.timeLabel}</p>
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl border border-red-100 bg-white p-4">
            <AlertTriangle className="size-4 shrink-0 text-red-500" />
            <p className="text-sm font-medium leading-snug text-ink/80">{before.warning}</p>
          </div>
        </div>

        <div className="min-w-0">
          <div className="-mx-1 overflow-x-auto px-1 pb-2">
            <div className="flex min-w-[860px] items-stretch gap-0 lg:min-w-0">
              {before.steps.map((step: Step, i) => (
                <div key={step.title} className="flex flex-1 items-stretch">
                  <Stagger className="flex-1">
                    <StaggerItem>
                      <div className="flex h-full flex-col items-center gap-2 rounded-2xl border border-red-100 bg-white p-4 text-center">
                        <span className="text-xs font-bold text-red-500">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
                          <step.icon className="size-5" />
                        </span>
                        <p className="text-sm font-semibold leading-snug text-navy">
                          {step.title}
                        </p>
                        <p className="text-xs leading-snug text-muted">{step.description}</p>
                      </div>
                    </StaggerItem>
                  </Stagger>
                  {i < n - 1 ? (
                    <svg
                      className="mx-1 mt-10 h-3 w-6 shrink-0 self-start text-red-300"
                      viewBox="0 0 32 12"
                      fill="none"
                    >
                      <line
                        x1="0"
                        y1="6"
                        x2="24"
                        y2="6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />
                      <path
                        d="M21 2 L27 6 L21 10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="relative mt-6 min-w-[860px] lg:min-w-0">
              <svg
                className="pointer-events-none absolute inset-x-0 top-0 h-6 w-full text-red-300"
                viewBox="0 0 1000 24"
                preserveAspectRatio="none"
                fill="none"
              >
                <line
                  x1={firstX}
                  y1="12"
                  x2={lastX}
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                <polygon points={`${firstX - 6},10 ${firstX + 6},10 ${firstX},1`} fill="currentColor" />
                <polygon points={`${lastX - 6},10 ${lastX + 6},10 ${lastX},1`} fill="currentColor" />
              </svg>

              <div className="relative mt-6 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 sm:text-sm">
                  <RefreshCw className="size-3.5" />
                  {before.loopLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

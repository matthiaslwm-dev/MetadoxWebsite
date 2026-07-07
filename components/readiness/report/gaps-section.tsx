import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReadinessGap } from "@/lib/readiness/types";

const priorityTone: Record<ReadinessGap["priority"], string> = {
  High: "text-red-600 bg-red-50",
  Medium: "text-amber-600 bg-amber-50",
  Low: "text-blue bg-blue-soft",
};

export function GapsSection({ gaps }: { gaps: ReadinessGap[] }) {
  return (
    <Card className="p-7 sm:p-8">
      <h2 className="font-heading text-xl font-bold text-navy">Key Readiness Gaps</h2>
      <p className="mt-2 text-sm text-muted">The top opportunities holding back your AI readiness.</p>
      <div className="mt-6 flex flex-col gap-4">
        {gaps.map((gap) => (
          <div key={gap.issue} className="flex gap-4 rounded-2xl border border-line p-5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-soft text-blue">
              <AlertTriangle className="size-4" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-navy">{gap.issue}</h3>
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", priorityTone[gap.priority])}>
                  {gap.priority} priority
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{gap.whyItMatters}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

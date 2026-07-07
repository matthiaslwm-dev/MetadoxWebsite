import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { SkillInsight } from "@/lib/skills-readiness/types";

export function InsightList({
  title,
  description,
  items,
  tone,
}: {
  title: string;
  description: string;
  items: SkillInsight[];
  tone: "positive" | "negative";
}) {
  const Icon = tone === "positive" ? CheckCircle2 : AlertTriangle;
  const iconTone = tone === "positive" ? "bg-emerald-50 text-emerald-600" : "bg-blue-soft text-blue";

  return (
    <Card className="p-7 sm:p-8">
      <h2 className="font-heading text-xl font-bold text-navy">{title}</h2>
      <p className="mt-2 text-sm text-muted">{description}</p>
      <div className="mt-6 flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.label} className="flex gap-4 rounded-2xl border border-line p-5">
            <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl", iconTone)}>
              <Icon className="size-4" />
            </span>
            <div>
              <h3 className="font-semibold text-navy">{item.label}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

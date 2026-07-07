import { Lightbulb } from "lucide-react";
import type { QuickWin } from "@/lib/readiness/types";

export function QuickWinSection({ quickWin }: { quickWin: QuickWin }) {
  return (
    <div className="ring-gradient relative overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-white to-blue-soft/50 p-7 shadow-lift sm:p-9">
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue text-white">
          <Lightbulb className="size-5" />
        </span>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue">Your Top Quick Win</p>
      </div>
      <h2 className="mt-4 font-heading text-2xl font-bold text-navy">{quickWin.title}</h2>

      <dl className="mt-6 grid gap-5 sm:grid-cols-3">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-navy/40">Why this first</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-ink/80">{quickWin.whyFirst}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-navy/40">Potential impact</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-ink/80">{quickWin.potentialImpact}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-navy/40">Difficulty</dt>
          <dd className="mt-1.5 text-sm font-semibold text-navy">{quickWin.difficulty}</dd>
        </div>
      </dl>

      <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
        <span className="font-semibold text-navy">How Metadox can help: </span>
        {quickWin.metadoxHelp}
      </p>
    </div>
  );
}

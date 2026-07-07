import { Lightbulb } from "lucide-react";
import type { NextSkillRecommendation } from "@/lib/skills-readiness/types";

export function RecommendedSkillSection({ nextSkill }: { nextSkill: NextSkillRecommendation }) {
  return (
    <div className="ring-gradient relative overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-white to-blue-soft/50 p-7 shadow-lift sm:p-9">
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue text-white">
          <Lightbulb className="size-5" />
        </span>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue">Your Recommended Next Skill</p>
      </div>
      <h2 className="mt-4 font-heading text-2xl font-bold text-navy">{nextSkill.title}</h2>

      <dl className="mt-6 grid gap-5 sm:grid-cols-3">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-navy/40">Why this first</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-ink/80">{nextSkill.why}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-navy/40">Productivity impact</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-ink/80">{nextSkill.productivityImpact}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-navy/40">Difficulty</dt>
          <dd className="mt-1.5 text-sm font-semibold text-navy">{nextSkill.difficulty}</dd>
        </div>
      </dl>
    </div>
  );
}

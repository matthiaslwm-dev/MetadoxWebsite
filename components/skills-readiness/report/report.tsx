import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/motion";
import { ScoreGauge, type ScoreTone } from "@/components/readiness/report/score-gauge";
import { SkillsBreakdown } from "@/components/skills-readiness/report/skills-breakdown";
import { InsightList } from "@/components/skills-readiness/report/insight-list";
import { RecommendedSkillSection } from "@/components/skills-readiness/report/recommended-skill-section";
import { ComingSoonSection } from "@/components/skills-readiness/report/coming-soon-section";
import type { SkillsLevel, SkillsResult } from "@/lib/skills-readiness/types";

const levelTone: Record<SkillsLevel, ScoreTone> = {
  Beginner: "red",
  Explorer: "amber",
  Practitioner: "blue",
  "AI Power User": "green",
};

export function SkillsReport({ name, result }: { name: string; result: SkillsResult }) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">AI Skills Readiness Report</p>
        <h1 className="mt-3 font-heading text-2xl font-bold text-navy sm:text-3xl">
          {name ? `${name}'s` : "Your"} AI Skills Readiness Results
        </h1>
      </Reveal>

      <Reveal delay={0.05}>
        <Card className="flex flex-col items-center gap-6 p-7 text-center sm:flex-row sm:text-left sm:p-8">
          <ScoreGauge score={result.overallScore} label={result.level} tone={levelTone[result.level]} />
          <div>
            <h2 className="font-heading text-xl font-bold text-navy">Executive Summary</h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{result.summary}</p>
          </div>
        </Card>
      </Reveal>

      <Reveal delay={0.1}>
        <SkillsBreakdown result={result} />
      </Reveal>

      <Reveal delay={0.15}>
        <InsightList
          title="Strengths"
          description="What you're already doing well."
          items={result.strengths}
          tone="positive"
        />
      </Reveal>

      <Reveal delay={0.2}>
        <InsightList
          title="Areas for Improvement"
          description="The top opportunities to build your AI skills further."
          items={result.improvements}
          tone="negative"
        />
      </Reveal>

      <Reveal delay={0.25}>
        <RecommendedSkillSection nextSkill={result.nextSkill} />
      </Reveal>

      <Reveal delay={0.3}>
        <ComingSoonSection />
      </Reveal>
    </div>
  );
}

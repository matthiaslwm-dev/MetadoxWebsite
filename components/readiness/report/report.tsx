import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/motion";
import { ScoreGauge, type ScoreTone } from "@/components/readiness/report/score-gauge";
import { BenchmarkSection } from "@/components/readiness/report/benchmark-section";
import { GapsSection } from "@/components/readiness/report/gaps-section";
import { QuickWinSection } from "@/components/readiness/report/quick-win-section";
import { ReportCta } from "@/components/readiness/report/report-cta";
import type { ReadinessResult, ReadinessStage } from "@/lib/readiness/types";

const stageTone: Record<ReadinessStage, ScoreTone> = {
  "Not Ready": "red",
  "Foundation Needed": "amber",
  "Emerging AI Ready": "blue",
  "AI Ready": "green",
};

export function Report({ companyName, result }: { companyName: string; result: ReadinessResult }) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
          Business AI Readiness Report
        </p>
        <h1 className="mt-3 font-heading text-2xl font-bold text-navy sm:text-3xl">
          {companyName ? `${companyName}'s` : "Your"} AI Readiness Results
        </h1>
      </Reveal>

      <Reveal delay={0.05}>
        <Card className="flex flex-col items-center gap-6 p-7 text-center sm:flex-row sm:text-left sm:p-8">
          <ScoreGauge score={result.overallScore} label={result.stage} tone={stageTone[result.stage]} />
          <div>
            <h2 className="font-heading text-xl font-bold text-navy">Executive Summary</h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{result.summary}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm sm:justify-start">
              <span className="text-navy/70">
                Foundation <span className="font-semibold text-navy">{result.foundationScore}</span>
              </span>
              <span className="text-navy/70">
                Automation <span className="font-semibold text-navy">{result.automationScore}</span>
              </span>
              <span className="text-navy/70">
                AI Adoption <span className="font-semibold text-navy">{result.adoptionScore}</span>
              </span>
            </div>
          </div>
        </Card>
      </Reveal>

      <Reveal delay={0.1}>
        <BenchmarkSection benchmark={result.benchmark} />
      </Reveal>

      <Reveal delay={0.15}>
        <GapsSection gaps={result.gaps} />
      </Reveal>

      <Reveal delay={0.2}>
        <QuickWinSection quickWin={result.quickWin} />
      </Reveal>

      <Reveal delay={0.25}>
        <ReportCta />
      </Reveal>
    </div>
  );
}

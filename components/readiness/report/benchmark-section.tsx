import { Card } from "@/components/ui/card";
import { nationalAiAdoptionContext } from "@/lib/readiness/benchmarks";
import type { ReadinessResult } from "@/lib/readiness/types";

function BenchmarkBar({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between text-sm">
        <span className="font-medium text-ink/80">{label}</span>
        <span className="font-semibold text-navy">{value}</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-line">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function BenchmarkSection({ benchmark }: { benchmark: ReadinessResult["benchmark"] }) {
  return (
    <Card className="p-7 sm:p-8">
      <h2 className="font-heading text-xl font-bold text-navy">Industry Benchmark</h2>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{benchmark.percentileText}</p>
      <div className="mt-6 flex flex-col gap-5">
        <BenchmarkBar label="Your Company" value={benchmark.company} tone="bg-blue" />
        <BenchmarkBar label="Singapore Industry Average" value={benchmark.industryAverage} tone="bg-navy/40" />
        <BenchmarkBar label="Top Performers" value={benchmark.topPerformers} tone="bg-emerald-500" />
      </div>
      <p className="mt-5 text-xs leading-relaxed text-muted">
        For context: only {nationalAiAdoptionContext.smeAdoptionRate}% of Singapore SMEs had adopted AI as of{" "}
        {nationalAiAdoptionContext.year}, up from {nationalAiAdoptionContext.smeAdoptionRatePrior}% the year
        before, versus {nationalAiAdoptionContext.enterpriseAdoptionRate}% of larger enterprises (
        <a
          href={nationalAiAdoptionContext.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-navy"
        >
          {nationalAiAdoptionContext.source}
        </a>
        ). The industry average and top-performer figures above are Metadox&apos;s own modeled estimate,
        calibrated to that data, rather than an official government per-industry score.
      </p>
    </Card>
  );
}

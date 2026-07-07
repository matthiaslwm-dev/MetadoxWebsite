import { Card } from "@/components/ui/card";
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
    </Card>
  );
}

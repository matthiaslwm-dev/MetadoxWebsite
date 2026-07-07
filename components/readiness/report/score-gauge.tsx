import { cn } from "@/lib/utils";

export type ScoreTone = "red" | "amber" | "blue" | "green";

const toneClasses: Record<ScoreTone, string> = {
  red: "text-red-600 bg-red-50",
  amber: "text-amber-600 bg-amber-50",
  blue: "text-blue bg-blue-soft",
  green: "text-emerald-600 bg-emerald-50",
};

export function ScoreGauge({ score, label, tone }: { score: number; label: string; tone: ScoreTone }) {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference * (1 - score / 100);

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex size-40 items-center justify-center">
        <svg className="size-40 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="var(--color-line)" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="var(--color-blue)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-heading text-4xl font-bold text-navy">{score}</span>
          <span className="text-xs font-medium uppercase tracking-wide text-muted">/ 100</span>
        </div>
      </div>
      <span className={cn("mt-5 rounded-full px-4 py-1.5 text-sm font-semibold", toneClasses[tone])}>{label}</span>
    </div>
  );
}

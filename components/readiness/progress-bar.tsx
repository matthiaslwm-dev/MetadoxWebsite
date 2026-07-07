export function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-muted">
        <span>
          Step {step} of {total}
        </span>
        <span>{Math.round((step / total) * 100)}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-blue transition-all duration-500 ease-out"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

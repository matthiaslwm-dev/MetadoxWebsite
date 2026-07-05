import { AlertTriangle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

export function ChallengeFlow({
  steps,
  warning,
}: {
  steps: { label: string; icon: LucideIcon | IconType; colorClassName: string }[];
  warning: string;
}) {
  const n = steps.length;
  const toX = (i: number) => ((i + 0.5) / n) * 1000;
  const tile1X = toX(0);
  const tileLastX = toX(n - 1);
  const bannerLeftX = toX(0.9);
  const bannerRightX = toX(n - 1.4);
  const bannerLeftPct = bannerLeftX / 10;
  const bannerRightPct = (1000 - bannerRightX) / 10;

  return (
    <div className="mx-auto w-full max-w-xl lg:max-w-none">
      <div className="flex items-start justify-between">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center">
            <div className="flex w-16 flex-col items-center gap-2 text-center sm:w-20">
              <span className="flex size-12 items-center justify-center rounded-xl border border-line bg-white shadow-sm sm:size-14">
                <step.icon className={`size-5 sm:size-6 ${step.colorClassName}`} />
              </span>
              <p className="text-[11px] font-medium leading-tight text-ink/70 sm:text-xs">
                {step.label}
              </p>
            </div>
            {i < n - 1 ? (
              <svg
                className="mx-0.5 mt-6 h-3 w-5 shrink-0 text-blue/50 sm:mt-7 sm:w-7"
                viewBox="0 0 32 12"
                fill="none"
              >
                <line
                  x1="0"
                  y1="6"
                  x2="24"
                  y2="6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                <path
                  d="M21 2 L27 6 L21 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : null}
          </div>
        ))}
      </div>

      <div className="relative mt-14 sm:mt-16">
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-full h-14 w-full text-blue/40 sm:h-16"
          viewBox="0 0 1000 64"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d={`M ${bannerLeftX} 60 H ${tile1X} V 8`}
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <polygon
            points={`${tile1X - 6},10 ${tile1X + 6},10 ${tile1X},1`}
            fill="currentColor"
          />
          <path
            d={`M ${tileLastX} 8 V 60 H ${bannerRightX}`}
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <polygon
            points={`${bannerRightX + 10},54 ${bannerRightX + 10},63 ${bannerRightX},58.5`}
            fill="currentColor"
          />
        </svg>

        <div
          className="relative flex items-center gap-2.5 rounded-xl border border-red-100 bg-red-50 px-4 py-3"
          style={{ marginLeft: `${bannerLeftPct}%`, marginRight: `${bannerRightPct}%` }}
        >
          <AlertTriangle className="size-4 shrink-0 text-red-500" />
          <p className="text-xs font-medium text-red-700 sm:text-sm">{warning}</p>
        </div>
      </div>
    </div>
  );
}

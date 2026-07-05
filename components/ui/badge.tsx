import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Small uppercase section label. */
export function Eyebrow({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em]",
        tone === "dark" ? "text-blue-bright" : "text-blue",
        className,
      )}
    >
      <span
        className={cn(
          "h-px w-6",
          tone === "dark" ? "bg-blue-bright/60" : "bg-blue/50",
        )}
      />
      {children}
    </span>
  );
}

/** Pill badge — e.g. the hero tag or feature chips. */
export function Badge({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium",
        tone === "dark"
          ? "border-white/15 bg-white/10 text-white/90 backdrop-blur"
          : "border-line bg-white text-navy shadow-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}

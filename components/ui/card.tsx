import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

/** Base surface card. Add `hover` for an interactive lift. */
export function Card({
  className,
  hover = false,
  children,
  ...props
}: ComponentProps<"div"> & { hover?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-line bg-white p-6 shadow-soft",
        hover &&
          "transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-blue/30 hover:shadow-lift",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

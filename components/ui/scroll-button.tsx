"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

type ScrollButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: ReactNode;
  targetId: string;
};

export function ScrollButton({
  className,
  variant,
  size,
  targetId,
  children,
}: ScrollButtonProps) {
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, size }), "cursor-pointer", className)}
      onClick={() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {children}
    </button>
  );
}

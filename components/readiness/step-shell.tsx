"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";

export function StepShell({
  eyebrow,
  title,
  description,
  children,
  onBack,
  onNext,
  nextDisabled,
  nextLabel = "Continue",
  isFirst = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  isFirst?: boolean;
}) {
  return (
    <FadeIn className="mx-auto w-full max-w-2xl" key={title}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">{eyebrow}</p>
      <h1 className="mt-3 font-heading text-2xl font-bold text-navy sm:text-3xl">{title}</h1>
      {description ? <p className="mt-3 text-muted">{description}</p> : null}

      <div className="mt-8 flex flex-col gap-4">{children}</div>

      <div className="mt-10 flex items-center justify-between gap-4">
        {isFirst ? (
          <span />
        ) : (
          <Button variant="ghost" size="md" onClick={onBack} type="button">
            <ArrowLeft className="size-4" />
            Back
          </Button>
        )}
        <Button variant="primary" size="lg" onClick={onNext} disabled={nextDisabled} type="button">
          {nextLabel}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </FadeIn>
  );
}

"use client";

import { StepShell } from "@/components/readiness/step-shell";
import { TextAreaField } from "@/components/readiness/fields";
import type { ReadinessAnswers } from "@/lib/readiness/types";

export function PainPointStep({
  answers,
  update,
  onNext,
  onBack,
}: {
  answers: ReadinessAnswers;
  update: (patch: Partial<ReadinessAnswers>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const valid = Boolean(answers.biggestPainPoint.trim());

  return (
    <StepShell
      eyebrow="Section 5 of 5"
      title="Biggest Pain Point"
      description="Last step — tell us what's costing you the most time right now."
      onBack={onBack}
      onNext={onNext}
      nextDisabled={!valid}
      nextLabel="See My Results"
    >
      <TextAreaField
        label="What's the most time-consuming or frustrating process in your business?"
        value={answers.biggestPainPoint}
        onChange={(v) => update({ biggestPainPoint: v })}
        placeholder="e.g. Chasing overdue invoices every month takes hours"
      />
      <TextAreaField
        label="If you could improve one thing immediately, what would it be?"
        value={answers.oneThingToImprove}
        onChange={(v) => update({ oneThingToImprove: v })}
        placeholder="e.g. Have all our customer data in one place"
      />
    </StepShell>
  );
}

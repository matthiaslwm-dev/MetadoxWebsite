"use client";

import { StepShell } from "@/components/readiness/step-shell";
import { MultiChoiceGroup } from "@/components/readiness/fields";
import { workplaceUsageOptions } from "@/lib/skills-readiness/options";
import type { SkillsAnswers } from "@/lib/skills-readiness/types";

export function WorkplaceAiUsageStep({
  answers,
  update,
  onNext,
  onBack,
}: {
  answers: SkillsAnswers;
  update: (patch: Partial<SkillsAnswers>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const valid = answers.workplaceUsage.length > 0;

  return (
    <StepShell
      eyebrow="Section 4 of 7"
      title="Workplace AI Usage"
      description="Do you currently use AI for any of the following?"
      onBack={onBack}
      onNext={onNext}
      nextDisabled={!valid}
    >
      <MultiChoiceGroup
        options={workplaceUsageOptions}
        values={answers.workplaceUsage}
        onChange={(v) => update({ workplaceUsage: v })}
      />
    </StepShell>
  );
}

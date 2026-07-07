"use client";

import { StepShell } from "@/components/readiness/step-shell";
import { MultiChoiceGroup } from "@/components/readiness/fields";
import { learningGoalOptions } from "@/lib/skills-readiness/options";
import type { SkillsAnswers } from "@/lib/skills-readiness/types";

export function LearningGoalsStep({
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
  const valid = answers.learningGoals.length > 0;

  return (
    <StepShell
      eyebrow="Section 6 of 7"
      title="Learning Goals"
      description="What would you like AI to help you with?"
      onBack={onBack}
      onNext={onNext}
      nextDisabled={!valid}
    >
      <MultiChoiceGroup options={learningGoalOptions} values={answers.learningGoals} onChange={(v) => update({ learningGoals: v })} />
    </StepShell>
  );
}

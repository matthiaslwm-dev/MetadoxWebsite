"use client";

import { StepShell } from "@/components/readiness/step-shell";
import { TextAreaField } from "@/components/readiness/fields";
import type { SkillsAnswers } from "@/lib/skills-readiness/types";

export function BiggestChallengeStep({
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
  const valid = Boolean(answers.biggestFrustration.trim());

  return (
    <StepShell
      eyebrow="Section 7 of 7"
      title="Biggest Challenge"
      description="Last step — tell us what's holding you back with AI today."
      onBack={onBack}
      onNext={onNext}
      nextDisabled={!valid}
      nextLabel="See My Results"
    >
      <TextAreaField
        label="What's your biggest frustration when using AI?"
        value={answers.biggestFrustration}
        onChange={(v) => update({ biggestFrustration: v })}
        placeholder="e.g. I never know if the output is accurate"
      />
      <TextAreaField
        label="What prevents you from using AI more often?"
        value={answers.usageBlocker}
        onChange={(v) => update({ usageBlocker: v })}
        placeholder="e.g. Not sure which tool to use for what"
      />
      <TextAreaField
        label="What AI skill would you most like to learn?"
        value={answers.skillToLearn}
        onChange={(v) => update({ skillToLearn: v })}
        placeholder="e.g. Automating reports with AI"
      />
    </StepShell>
  );
}

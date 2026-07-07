"use client";

import { StepShell } from "@/components/readiness/step-shell";
import { ChoiceGroup, MultiChoiceGroup } from "@/components/readiness/fields";
import { aiToolsOptions, usageFrequencyOptions } from "@/lib/skills-readiness/options";
import type { SkillsAnswers } from "@/lib/skills-readiness/types";

export function CurrentAiUsageStep({
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
  const valid = Boolean(answers.toolsUsed.length > 0 && answers.usageFrequency);

  return (
    <StepShell
      eyebrow="Section 2 of 7"
      title="Current AI Usage"
      description="Which AI tools have you used, and how often?"
      onBack={onBack}
      onNext={onNext}
      nextDisabled={!valid}
    >
      <div>
        <span className="mb-2 block text-sm font-semibold text-navy">Which AI tools have you used?</span>
        <MultiChoiceGroup options={aiToolsOptions} values={answers.toolsUsed} onChange={(v) => update({ toolsUsed: v })} />
      </div>
      <div>
        <span className="mb-2 block text-sm font-semibold text-navy">How often do you use AI tools?</span>
        <ChoiceGroup
          options={usageFrequencyOptions}
          value={answers.usageFrequency}
          onChange={(v) => update({ usageFrequency: v })}
          columns={2}
        />
      </div>
    </StepShell>
  );
}

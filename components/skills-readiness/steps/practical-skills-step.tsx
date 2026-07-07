"use client";

import { StepShell } from "@/components/readiness/step-shell";
import { ChoiceGroup } from "@/components/readiness/fields";
import { confidenceRatingOptions } from "@/lib/skills-readiness/options";
import type { SkillsAnswers } from "@/lib/skills-readiness/types";

const practicalFields: { key: keyof SkillsAnswers; label: string }[] = [
  { key: "writingPrompts", label: "Writing prompts" },
  { key: "improvingPrompts", label: "Improving prompts" },
  { key: "factChecking", label: "Fact-checking AI responses" },
  { key: "usingMultipleTools", label: "Using multiple AI tools" },
  { key: "automatingWorkflows", label: "Automating workflows" },
  { key: "creatingCustomGpts", label: "Creating custom GPTs" },
  { key: "aiImageGeneration", label: "AI image generation" },
];

export function PracticalSkillsStep({
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
  const valid = practicalFields.every((field) => Boolean(answers[field.key]));

  return (
    <StepShell
      eyebrow="Section 5 of 7"
      title="Practical Skills"
      description="How confident are you with each of these?"
      onBack={onBack}
      onNext={onNext}
      nextDisabled={!valid}
    >
      {practicalFields.map((field) => (
        <div key={field.key}>
          <span className="mb-2 block text-sm font-semibold text-navy">{field.label}</span>
          <ChoiceGroup
            options={confidenceRatingOptions}
            value={answers[field.key] as string}
            onChange={(v) => update({ [field.key]: v } as Partial<SkillsAnswers>)}
            columns={2}
          />
        </div>
      ))}
    </StepShell>
  );
}

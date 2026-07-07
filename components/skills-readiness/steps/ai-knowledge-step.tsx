"use client";

import { StepShell } from "@/components/readiness/step-shell";
import { ChoiceGroup } from "@/components/readiness/fields";
import { knowledgeRatingOptions } from "@/lib/skills-readiness/options";
import type { SkillsAnswers } from "@/lib/skills-readiness/types";

const knowledgeFields: { key: keyof SkillsAnswers; label: string }[] = [
  { key: "promptEngineeringKnowledge", label: "Prompt Engineering" },
  { key: "generativeAiKnowledge", label: "Generative AI" },
  { key: "aiEthicsKnowledge", label: "AI Ethics" },
  { key: "llmKnowledge", label: "Large Language Models" },
  { key: "aiLimitationsKnowledge", label: "AI Limitations" },
  { key: "aiPrivacyKnowledge", label: "AI Privacy" },
  { key: "aiHallucinationsKnowledge", label: "AI Hallucinations" },
];

export function AiKnowledgeStep({
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
  const valid = knowledgeFields.every((field) => Boolean(answers[field.key]));

  return (
    <StepShell
      eyebrow="Section 3 of 7"
      title="AI Knowledge"
      description="Rate your understanding of each of these AI concepts."
      onBack={onBack}
      onNext={onNext}
      nextDisabled={!valid}
    >
      {knowledgeFields.map((field) => (
        <div key={field.key}>
          <span className="mb-2 block text-sm font-semibold text-navy">{field.label}</span>
          <ChoiceGroup
            options={knowledgeRatingOptions}
            value={answers[field.key] as string}
            onChange={(v) => update({ [field.key]: v } as Partial<SkillsAnswers>)}
            columns={2}
          />
        </div>
      ))}
    </StepShell>
  );
}

"use client";

import { StepShell } from "@/components/readiness/step-shell";
import { ChoiceGroup, MultiChoiceGroup } from "@/components/readiness/fields";
import { aiPolicyOptions, aiToolsOptions, aiTrainingOptions, staffAiUsageOptions } from "@/lib/readiness/options";
import type { ReadinessAnswers } from "@/lib/readiness/types";

export function AiAdoptionStep({
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
  const valid = Boolean(
    answers.aiToolsUsed.length > 0 && answers.staffAiUsage && answers.aiTraining && answers.aiPolicy,
  );

  return (
    <StepShell
      eyebrow="Section 4 of 5"
      title="AI Adoption"
      description="Where does AI currently sit in your business?"
      onBack={onBack}
      onNext={onNext}
      nextDisabled={!valid}
    >
      <div>
        <span className="mb-2 block text-sm font-semibold text-navy">Which AI tools does your business currently use?</span>
        <MultiChoiceGroup options={aiToolsOptions} values={answers.aiToolsUsed} onChange={(v) => update({ aiToolsUsed: v })} />
      </div>
      <div>
        <span className="mb-2 block text-sm font-semibold text-navy">How often do staff use AI tools in their work?</span>
        <ChoiceGroup options={staffAiUsageOptions} value={answers.staffAiUsage} onChange={(v) => update({ staffAiUsage: v })} columns={2} />
      </div>
      <div>
        <span className="mb-2 block text-sm font-semibold text-navy">Has your team received any AI training?</span>
        <ChoiceGroup options={aiTrainingOptions} value={answers.aiTraining} onChange={(v) => update({ aiTraining: v })} />
      </div>
      <div>
        <span className="mb-2 block text-sm font-semibold text-navy">Does your business have an AI usage policy?</span>
        <ChoiceGroup options={aiPolicyOptions} value={answers.aiPolicy} onChange={(v) => update({ aiPolicy: v })} />
      </div>
    </StepShell>
  );
}

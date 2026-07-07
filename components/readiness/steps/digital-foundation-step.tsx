"use client";

import { StepShell } from "@/components/readiness/step-shell";
import { ChoiceGroup, MultiChoiceGroup } from "@/components/readiness/fields";
import { cloudUsageOptions, dataCentralisationOptions, reportingReliabilityOptions, systemsUsedOptions } from "@/lib/readiness/options";
import type { ReadinessAnswers } from "@/lib/readiness/types";

export function DigitalFoundationStep({
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
    answers.systemsUsed.length > 0 &&
      answers.cloudUsage &&
      answers.dataCentralisation &&
      answers.reportingReliability,
  );

  return (
    <StepShell
      eyebrow="Section 2 of 5"
      title="Digital Foundation"
      description="Tell us about the systems and data your business runs on today."
      onBack={onBack}
      onNext={onNext}
      nextDisabled={!valid}
    >
      <div>
        <span className="mb-2 block text-sm font-semibold text-navy">Which systems does your business currently use?</span>
        <MultiChoiceGroup
          options={systemsUsedOptions}
          values={answers.systemsUsed}
          onChange={(v) => update({ systemsUsed: v })}
        />
      </div>
      <div>
        <span className="mb-2 block text-sm font-semibold text-navy">How much of your business runs on cloud storage?</span>
        <ChoiceGroup options={cloudUsageOptions} value={answers.cloudUsage} onChange={(v) => update({ cloudUsage: v })} />
      </div>
      <div>
        <span className="mb-2 block text-sm font-semibold text-navy">How centralised is your business data?</span>
        <ChoiceGroup
          options={dataCentralisationOptions}
          value={answers.dataCentralisation}
          onChange={(v) => update({ dataCentralisation: v })}
        />
      </div>
      <div>
        <span className="mb-2 block text-sm font-semibold text-navy">How reliable is your reporting today?</span>
        <ChoiceGroup
          options={reportingReliabilityOptions}
          value={answers.reportingReliability}
          onChange={(v) => update({ reportingReliability: v })}
        />
      </div>
    </StepShell>
  );
}

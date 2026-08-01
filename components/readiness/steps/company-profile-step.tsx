"use client";

import { StepShell } from "@/components/readiness/step-shell";
import { SelectField, TextField, ChoiceGroup } from "@/components/readiness/fields";
import { employeeBrackets, industries } from "@/lib/readiness/options";
import type { ReadinessAnswers } from "@/lib/readiness/types";

export function CompanyProfileStep({
  answers,
  update,
  onNext,
}: {
  answers: ReadinessAnswers;
  update: (patch: Partial<ReadinessAnswers>) => void;
  onNext: () => void;
}) {
  const valid = Boolean(
    answers.companyName && answers.industry && answers.employees && answers.websiteUrl.trim(),
  );

  return (
    <StepShell
      eyebrow="Section 1 of 5"
      title="Company Profile"
      description="A quick snapshot of your business so we can benchmark you accurately."
      onBack={() => {}}
      onNext={onNext}
      nextDisabled={!valid}
      isFirst
    >
      <TextField
        label="Company name"
        value={answers.companyName}
        onChange={(v) => update({ companyName: v })}
        placeholder="e.g. Acme Pte Ltd"
      />
      <TextField
        label="Company website"
        value={answers.websiteUrl}
        onChange={(v) => update({ websiteUrl: v })}
        placeholder="e.g. www.acme.com"
      />
      <SelectField
        label="Industry"
        value={answers.industry}
        onChange={(v) => update({ industry: v })}
        options={industries}
      />
      <div>
        <span className="mb-2 block text-sm font-semibold text-navy">Number of employees</span>
        <ChoiceGroup
          options={employeeBrackets}
          value={answers.employees}
          onChange={(v) => update({ employees: v })}
          columns={2}
        />
      </div>
    </StepShell>
  );
}

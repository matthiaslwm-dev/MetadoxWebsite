"use client";

import { StepShell } from "@/components/readiness/step-shell";
import { ChoiceGroup } from "@/components/readiness/fields";
import {
  integrationOptions,
  manualProcessLevelOptions,
  weeklyAdminHoursOptions,
  yesSomeNoOptions,
} from "@/lib/readiness/options";
import type { ReadinessAnswers } from "@/lib/readiness/types";

export function WorkflowAutomationStep({
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
    answers.manualProcessLevel &&
      answers.followUpsManual &&
      answers.reportsManual &&
      answers.systemsIntegrated &&
      answers.weeklyAdminHours,
  );

  return (
    <StepShell
      eyebrow="Section 3 of 5"
      title="Workflow & Automation"
      description="Help us understand how manual your day-to-day operations are."
      onBack={onBack}
      onNext={onNext}
      nextDisabled={!valid}
    >
      <div>
        <span className="mb-2 block text-sm font-semibold text-navy">How manual are your key business processes?</span>
        <ChoiceGroup
          options={manualProcessLevelOptions}
          value={answers.manualProcessLevel}
          onChange={(v) => update({ manualProcessLevel: v })}
        />
      </div>
      <div>
        <span className="mb-2 block text-sm font-semibold text-navy">Are follow-ups (sales, customer, invoices) manual?</span>
        <ChoiceGroup options={yesSomeNoOptions} value={answers.followUpsManual} onChange={(v) => update({ followUpsManual: v })} columns={2} />
      </div>
      <div>
        <span className="mb-2 block text-sm font-semibold text-navy">Are your reports manually compiled?</span>
        <ChoiceGroup options={yesSomeNoOptions} value={answers.reportsManual} onChange={(v) => update({ reportsManual: v })} columns={2} />
      </div>
      <div>
        <span className="mb-2 block text-sm font-semibold text-navy">Are your systems integrated with each other?</span>
        <ChoiceGroup
          options={integrationOptions}
          value={answers.systemsIntegrated}
          onChange={(v) => update({ systemsIntegrated: v })}
        />
      </div>
      <div>
        <span className="mb-2 block text-sm font-semibold text-navy">How many hours a week does your team spend on repetitive admin?</span>
        <ChoiceGroup
          options={weeklyAdminHoursOptions}
          value={answers.weeklyAdminHours}
          onChange={(v) => update({ weeklyAdminHours: v })}
          columns={2}
        />
      </div>
    </StepShell>
  );
}

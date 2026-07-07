"use client";

import { StepShell } from "@/components/readiness/step-shell";
import { ChoiceGroup, SelectField, TextField } from "@/components/readiness/fields";
import { currentRoleOptions, departmentOptions, industries, yearsExperienceOptions } from "@/lib/skills-readiness/options";
import type { SkillsAnswers } from "@/lib/skills-readiness/types";

export function PersonalProfileStep({
  answers,
  update,
  onNext,
}: {
  answers: SkillsAnswers;
  update: (patch: Partial<SkillsAnswers>) => void;
  onNext: () => void;
}) {
  const valid = Boolean(
    answers.name && answers.jobTitle && answers.industry && answers.yearsExperience && answers.department && answers.currentRole,
  );

  return (
    <StepShell
      eyebrow="Section 1 of 7"
      title="Personal Profile"
      description="A quick snapshot of you so we can tailor your results."
      onBack={() => {}}
      onNext={onNext}
      nextDisabled={!valid}
      isFirst
    >
      <TextField label="Name" value={answers.name} onChange={(v) => update({ name: v })} placeholder="e.g. Jamie Tan" />
      <TextField
        label="Job title"
        value={answers.jobTitle}
        onChange={(v) => update({ jobTitle: v })}
        placeholder="e.g. Marketing Manager"
      />
      <SelectField label="Industry" value={answers.industry} onChange={(v) => update({ industry: v })} options={industries} />
      <div>
        <span className="mb-2 block text-sm font-semibold text-navy">Years of experience</span>
        <ChoiceGroup
          options={yearsExperienceOptions}
          value={answers.yearsExperience}
          onChange={(v) => update({ yearsExperience: v })}
          columns={2}
        />
      </div>
      <SelectField
        label="Department"
        value={answers.department}
        onChange={(v) => update({ department: v })}
        options={departmentOptions}
      />
      <div>
        <span className="mb-2 block text-sm font-semibold text-navy">Current role</span>
        <ChoiceGroup
          options={currentRoleOptions}
          value={answers.currentRole}
          onChange={(v) => update({ currentRole: v })}
          columns={2}
        />
      </div>
    </StepShell>
  );
}

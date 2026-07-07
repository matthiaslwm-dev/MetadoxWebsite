"use client";

import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ImageLogo } from "@/components/layout/logo";
import { ProgressBar } from "@/components/readiness/progress-bar";
import { LoadingScreen } from "@/components/readiness/loading-screen";
import { PersonalProfileStep } from "@/components/skills-readiness/steps/personal-profile-step";
import { CurrentAiUsageStep } from "@/components/skills-readiness/steps/current-ai-usage-step";
import { AiKnowledgeStep } from "@/components/skills-readiness/steps/ai-knowledge-step";
import { WorkplaceAiUsageStep } from "@/components/skills-readiness/steps/workplace-ai-usage-step";
import { PracticalSkillsStep } from "@/components/skills-readiness/steps/practical-skills-step";
import { LearningGoalsStep } from "@/components/skills-readiness/steps/learning-goals-step";
import { BiggestChallengeStep } from "@/components/skills-readiness/steps/biggest-challenge-step";
import { SkillsReport } from "@/components/skills-readiness/report/report";
import { computeSkillsReadiness } from "@/lib/skills-readiness/scoring";
import { emptySkillsAnswers, type SkillsAnswers } from "@/lib/skills-readiness/types";

const TOTAL_STEPS = 7;

const loadingMessages = [
  "Reviewing your AI experience...",
  "Analysing your practical AI skills...",
  "Assessing workplace AI adoption...",
  "Evaluating prompt engineering ability...",
  "Generating your AI Skills Report...",
];

type Phase = "form" | "loading" | "report";

export function SkillsAssessmentFlow() {
  const [phase, setPhase] = useState<Phase>("form");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<SkillsAnswers>(emptySkillsAnswers);

  const update = (patch: Partial<SkillsAnswers>) => setAnswers((prev) => ({ ...prev, ...patch }));

  const result = useMemo(() => computeSkillsReadiness(answers), [answers]);

  const goNext = () => {
    if (stepIndex === TOTAL_STEPS - 1) {
      setPhase("loading");
      return;
    }
    setStepIndex((i) => i + 1);
  };
  const goBack = () => setStepIndex((i) => Math.max(0, i - 1));

  return (
    <div className="bg-brand-gradient-soft min-h-dvh">
      <Container className="relative flex flex-col items-center py-8 sm:py-10">
        <ImageLogo tone="dark" className="absolute left-5 top-8 sm:left-8" />
        <div className="mb-10 mt-12 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy/50 sm:mt-2">
          <Sparkles className="size-3.5 text-blue" />
          AI Skills Readiness Assessment · Powered by Metadox NexusAI
        </div>

        {phase === "form" ? (
          <>
            <div className="mb-10 w-full">
              <ProgressBar step={stepIndex + 1} total={TOTAL_STEPS} />
            </div>
            {stepIndex === 0 && <PersonalProfileStep answers={answers} update={update} onNext={goNext} />}
            {stepIndex === 1 && (
              <CurrentAiUsageStep answers={answers} update={update} onNext={goNext} onBack={goBack} />
            )}
            {stepIndex === 2 && <AiKnowledgeStep answers={answers} update={update} onNext={goNext} onBack={goBack} />}
            {stepIndex === 3 && (
              <WorkplaceAiUsageStep answers={answers} update={update} onNext={goNext} onBack={goBack} />
            )}
            {stepIndex === 4 && (
              <PracticalSkillsStep answers={answers} update={update} onNext={goNext} onBack={goBack} />
            )}
            {stepIndex === 5 && (
              <LearningGoalsStep answers={answers} update={update} onNext={goNext} onBack={goBack} />
            )}
            {stepIndex === 6 && (
              <BiggestChallengeStep answers={answers} update={update} onNext={goNext} onBack={goBack} />
            )}
          </>
        ) : null}

        {phase === "loading" ? (
          <LoadingScreen
            onDone={() => setPhase("report")}
            title="Analysing Your AI Skills"
            messages={loadingMessages}
          />
        ) : null}

        {phase === "report" ? <SkillsReport name={answers.name} result={result} /> : null}
      </Container>
    </div>
  );
}

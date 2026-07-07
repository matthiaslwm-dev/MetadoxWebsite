"use client";

import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ImageLogo } from "@/components/layout/logo";
import { ProgressBar } from "@/components/readiness/progress-bar";
import { CompanyProfileStep } from "@/components/readiness/steps/company-profile-step";
import { DigitalFoundationStep } from "@/components/readiness/steps/digital-foundation-step";
import { WorkflowAutomationStep } from "@/components/readiness/steps/workflow-automation-step";
import { AiAdoptionStep } from "@/components/readiness/steps/ai-adoption-step";
import { PainPointStep } from "@/components/readiness/steps/pain-point-step";
import { LoadingScreen } from "@/components/readiness/loading-screen";
import { Report } from "@/components/readiness/report/report";
import { computeReadiness } from "@/lib/readiness/scoring";
import { emptyReadinessAnswers, type ReadinessAnswers } from "@/lib/readiness/types";

const TOTAL_STEPS = 5;

type Phase = "form" | "loading" | "report";

export function AssessmentFlow() {
  const [phase, setPhase] = useState<Phase>("form");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<ReadinessAnswers>(emptyReadinessAnswers);

  const update = (patch: Partial<ReadinessAnswers>) => setAnswers((prev) => ({ ...prev, ...patch }));

  const result = useMemo(() => computeReadiness(answers), [answers]);

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
          Business AI Readiness Assessment · Powered by Metadox Nexus
        </div>

        {phase === "form" ? (
          <>
            <div className="mb-10 w-full">
              <ProgressBar step={stepIndex + 1} total={TOTAL_STEPS} />
            </div>
            {stepIndex === 0 && <CompanyProfileStep answers={answers} update={update} onNext={goNext} />}
            {stepIndex === 1 && (
              <DigitalFoundationStep answers={answers} update={update} onNext={goNext} onBack={goBack} />
            )}
            {stepIndex === 2 && (
              <WorkflowAutomationStep answers={answers} update={update} onNext={goNext} onBack={goBack} />
            )}
            {stepIndex === 3 && (
              <AiAdoptionStep answers={answers} update={update} onNext={goNext} onBack={goBack} />
            )}
            {stepIndex === 4 && (
              <PainPointStep answers={answers} update={update} onNext={goNext} onBack={goBack} />
            )}
          </>
        ) : null}

        {phase === "loading" ? <LoadingScreen onDone={() => setPhase("report")} /> : null}

        {phase === "report" ? <Report companyName={answers.companyName} result={result} /> : null}
      </Container>
    </div>
  );
}

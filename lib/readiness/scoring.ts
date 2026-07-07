import type { ActionKey, ReadinessAnswers, ReadinessGap, ReadinessResult, ReadinessStage } from "./types";
import { getIndustryBenchmark, percentileText } from "./benchmarks";
import { actionLibrary } from "./actions";

type SubMetric = {
  key: string;
  label: string;
  score: number;
  category: "foundation" | "automation" | "adoption";
  action: ActionKey;
};

const scale3 = (value: string, low: string, mid: string, high: string) => {
  if (value === low) return 0;
  if (value === mid) return 50;
  if (value === high) return 100;
  return 0;
};

function stageForScore(score: number): ReadinessStage {
  if (score <= 25) return "Not Ready";
  if (score <= 50) return "Foundation Needed";
  if (score <= 75) return "Emerging AI Ready";
  return "AI Ready";
}

function priorityForScore(score: number): ReadinessGap["priority"] {
  if (score < 40) return "High";
  if (score < 65) return "Medium";
  return "Low";
}

const average = (values: number[]) => Math.round(values.reduce((a, b) => a + b, 0) / values.length);

export function computeReadiness(answers: ReadinessAnswers): ReadinessResult {
  const cloudScore = scale3(answers.cloudUsage, "none", "partial", "full");
  const centralisationScore = scale3(answers.dataCentralisation, "scattered", "partial", "centralised");
  const reportingScore = scale3(answers.reportingReliability, "unreliable", "manual-ok", "reliable-automated");
  const foundationScore = average([cloudScore, centralisationScore, reportingScore]);

  const processScore = scale3(answers.manualProcessLevel, "fully-manual", "mixed", "mostly-automated");
  const followupScore = scale3(answers.followUpsManual, "yes", "some", "no");
  const reportsManualScore = scale3(answers.reportsManual, "yes", "some", "no");
  const integrationScore = scale3(answers.systemsIntegrated, "no", "partial", "yes");
  const adminHoursScore =
    { "20+": 0, "10-20": 33, "5-10": 66, "<5": 100 }[answers.weeklyAdminHours as "20+" | "10-20" | "5-10" | "<5"] ?? 0;
  const automationScore = average([processScore, followupScore, reportsManualScore, integrationScore, adminHoursScore]);

  const aiUsageScore = answers.aiToolsUsed.includes("none") || answers.aiToolsUsed.length === 0
    ? 0
    : Math.min(100, answers.aiToolsUsed.length * 34);
  const staffUsageScore =
    { never: 0, rarely: 33, sometimes: 66, daily: 100 }[answers.staffAiUsage as "never" | "rarely" | "sometimes" | "daily"] ?? 0;
  const trainingScore = scale3(answers.aiTraining, "none", "informal", "formal");
  const policyScore = scale3(answers.aiPolicy, "none", "informal", "documented");
  const adoptionScore = average([aiUsageScore, staffUsageScore, trainingScore, policyScore]);

  const overallScore = Math.round(foundationScore * 0.4 + automationScore * 0.35 + adoptionScore * 0.25);
  const stage = stageForScore(overallScore);

  const subMetrics: SubMetric[] = [
    { key: "cloud", label: "Cloud & Data Storage", score: cloudScore, category: "foundation", action: "migrate-to-cloud" },
    { key: "centralisation", label: "Data Centralisation", score: centralisationScore, category: "foundation", action: "centralise-data" },
    { key: "reporting", label: "Reporting Reliability", score: reportingScore, category: "foundation", action: "reporting-dashboard" },
    { key: "process", label: "Process Automation", score: processScore, category: "automation", action: "automate-repetitive" },
    { key: "followups", label: "Follow-up Automation", score: followupScore, category: "automation", action: "automate-repetitive" },
    { key: "reportsManual", label: "Reporting Automation", score: reportsManualScore, category: "automation", action: "reporting-dashboard" },
    { key: "integration", label: "Systems Integration", score: integrationScore, category: "automation", action: "integrate-systems" },
    { key: "adminHours", label: "Repetitive Admin Load", score: adminHoursScore, category: "automation", action: "automate-repetitive" },
    { key: "aiUsage", label: "AI Tool Usage", score: aiUsageScore, category: "adoption", action: "apply-ai" },
    { key: "training", label: "AI Training", score: trainingScore, category: "adoption", action: "train-staff" },
    { key: "policy", label: "AI Policy", score: policyScore, category: "adoption", action: "ai-policy" },
  ];

  const sorted = [...subMetrics].sort((a, b) => a.score - b.score);
  const gaps: ReadinessGap[] = sorted.slice(0, 3).map((m) => ({
    issue: m.label,
    whyItMatters: gapReason(m.key),
    priority: priorityForScore(m.score),
  }));

  const foundationOrAutomationWeak = foundationScore < 60 || automationScore < 60;
  const quickWinPool = foundationOrAutomationWeak
    ? subMetrics.filter((m) => m.category !== "adoption")
    : subMetrics;
  const quickWinMetric = [...quickWinPool].sort((a, b) => a.score - b.score)[0];
  const quickWin = actionLibrary[quickWinMetric.action];

  const benchmarkData = getIndustryBenchmark(answers.industry);
  const summary = buildSummary(stage, overallScore, foundationOrAutomationWeak);

  return {
    overallScore,
    foundationScore,
    automationScore,
    adoptionScore,
    stage,
    summary,
    benchmark: {
      company: overallScore,
      industryAverage: benchmarkData.average,
      topPerformers: benchmarkData.topPerformers,
      percentileText: percentileText(overallScore, benchmarkData.average, benchmarkData.topPerformers),
    },
    gaps,
    quickWin,
  };
}

function gapReason(key: string): string {
  const reasons: Record<string, string> = {
    cloud: "Without reliable cloud storage, data is harder to access, back up and build on.",
    centralisation: "Scattered data makes it harder to get a single, trustworthy view of the business.",
    reporting: "Unreliable reporting makes it difficult to act on accurate, up-to-date information.",
    process: "Highly manual processes slow teams down and increase the risk of errors.",
    followups: "Manual follow-ups are easy to delay or forget, which can affect customer experience.",
    reportsManual: "Manually compiled reports take time and are prone to inconsistency.",
    integration: "Disconnected systems force staff to re-enter the same data more than once.",
    adminHours: "High repetitive admin load leaves less time for higher-value work.",
    aiUsage: "Limited AI tool usage means the business isn't yet capturing available productivity gains.",
    training: "Without training, staff are less likely to use AI tools effectively or confidently.",
    policy: "Without a clear policy, AI use across the business can become inconsistent or risky.",
  };
  return reasons[key] ?? "This is currently holding back your overall AI readiness.";
}

function buildSummary(stage: ReadinessStage, score: number, foundationFirst: boolean): string {
  const base: Record<ReadinessStage, string> = {
    "Not Ready":
      "Your business isn't yet set up to benefit from AI. The systems, data and workflows that AI depends on need to be put in place first.",
    "Foundation Needed":
      "Your business has some digital foundations in place, but key gaps in data, systems or workflow are limiting how much value AI could realistically deliver today.",
    "Emerging AI Ready":
      "Your business has a reasonably solid foundation. With a few targeted improvements, you'll be well positioned to start applying AI in a focused, high-impact way.",
    "AI Ready":
      "Your business has strong digital foundations and workflow maturity, and is well positioned to apply AI directly to high-value processes.",
  };
  const foundationNote = foundationFirst
    ? " The recommended next step is to strengthen your foundation before layering on more AI."
    : "";
  return `${base[stage]}${foundationNote} Overall readiness score: ${score}/100.`;
}

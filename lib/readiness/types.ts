/** Answers collected across the 5 assessment sections. */
export type ReadinessAnswers = {
  companyName: string;
  industry: string;
  employees: string;
  businessModel: string;

  systemsUsed: string[];
  cloudUsage: string;
  dataCentralisation: string;
  reportingReliability: string;

  manualProcessLevel: string;
  followUpsManual: string;
  reportsManual: string;
  systemsIntegrated: string;
  weeklyAdminHours: string;

  aiToolsUsed: string[];
  staffAiUsage: string;
  aiTraining: string;
  aiPolicy: string;

  biggestPainPoint: string;
  oneThingToImprove: string;
};

export const emptyReadinessAnswers: ReadinessAnswers = {
  companyName: "",
  industry: "",
  employees: "",
  businessModel: "",

  systemsUsed: [],
  cloudUsage: "",
  dataCentralisation: "",
  reportingReliability: "",

  manualProcessLevel: "",
  followUpsManual: "",
  reportsManual: "",
  systemsIntegrated: "",
  weeklyAdminHours: "",

  aiToolsUsed: [],
  staffAiUsage: "",
  aiTraining: "",
  aiPolicy: "",

  biggestPainPoint: "",
  oneThingToImprove: "",
};

export type ReadinessStage =
  | "Not Ready"
  | "Foundation Needed"
  | "Emerging AI Ready"
  | "AI Ready";

export type Priority = "High" | "Medium" | "Low";

export type ActionKey =
  | "centralise-data"
  | "migrate-to-cloud"
  | "integrate-systems"
  | "automate-repetitive"
  | "reporting-dashboard"
  | "train-staff"
  | "ai-policy"
  | "apply-ai";

export type ReadinessGap = {
  issue: string;
  whyItMatters: string;
  priority: Priority;
};

export type QuickWin = {
  title: string;
  whyFirst: string;
  potentialImpact: string;
  difficulty: "Low" | "Medium" | "High";
  metadoxHelp: string;
};

export type ReadinessResult = {
  overallScore: number;
  foundationScore: number;
  automationScore: number;
  adoptionScore: number;
  stage: ReadinessStage;
  summary: string;
  benchmark: {
    company: number;
    industryAverage: number;
    topPerformers: number;
    percentileText: string;
  };
  gaps: ReadinessGap[];
  quickWin: QuickWin;
};

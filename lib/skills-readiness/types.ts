/** Answers collected across the 7 AI Skills Readiness sections. */
export type SkillsAnswers = {
  name: string;
  jobTitle: string;
  industry: string;
  yearsExperience: string;
  department: string;
  currentRole: string;

  toolsUsed: string[];
  usageFrequency: string;

  promptEngineeringKnowledge: string;
  generativeAiKnowledge: string;
  aiEthicsKnowledge: string;
  llmKnowledge: string;
  aiLimitationsKnowledge: string;
  aiPrivacyKnowledge: string;
  aiHallucinationsKnowledge: string;

  workplaceUsage: string[];

  writingPrompts: string;
  improvingPrompts: string;
  factChecking: string;
  usingMultipleTools: string;
  automatingWorkflows: string;
  creatingCustomGpts: string;
  aiImageGeneration: string;

  learningGoals: string[];

  biggestFrustration: string;
  usageBlocker: string;
  skillToLearn: string;
};

export const emptySkillsAnswers: SkillsAnswers = {
  name: "",
  jobTitle: "",
  industry: "",
  yearsExperience: "",
  department: "",
  currentRole: "",

  toolsUsed: [],
  usageFrequency: "",

  promptEngineeringKnowledge: "",
  generativeAiKnowledge: "",
  aiEthicsKnowledge: "",
  llmKnowledge: "",
  aiLimitationsKnowledge: "",
  aiPrivacyKnowledge: "",
  aiHallucinationsKnowledge: "",

  workplaceUsage: [],

  writingPrompts: "",
  improvingPrompts: "",
  factChecking: "",
  usingMultipleTools: "",
  automatingWorkflows: "",
  creatingCustomGpts: "",
  aiImageGeneration: "",

  learningGoals: [],

  biggestFrustration: "",
  usageBlocker: "",
  skillToLearn: "",
};

export type SkillsLevel = "Beginner" | "Explorer" | "Practitioner" | "AI Power User";

export type SkillInsight = { label: string; reason: string };

export type NextSkillRecommendation = {
  title: string;
  why: string;
  productivityImpact: string;
  difficulty: "Low" | "Medium" | "High";
};

export type SkillsResult = {
  overallScore: number;
  knowledgeScore: number;
  practicalScore: number;
  promptEngineeringScore: number;
  adoptionScore: number;
  confidenceScore: number;
  level: SkillsLevel;
  summary: string;
  strengths: SkillInsight[];
  improvements: SkillInsight[];
  nextSkill: NextSkillRecommendation;
};

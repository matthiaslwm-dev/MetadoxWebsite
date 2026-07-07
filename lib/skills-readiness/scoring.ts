import type { SkillsAnswers, SkillsLevel, SkillsResult } from "./types";
import { skillActionLibrary, type SkillActionKey } from "./actions";

type SkillSubMetric = {
  key: string;
  label: string;
  score: number;
  action: SkillActionKey;
  strengthReason: string;
  improvementReason: string;
};

const knowledgeScale = (value: string) => ({ none: 0, basic: 50, strong: 100 })[value as "none" | "basic" | "strong"] ?? 0;
const confidenceScale = (value: string) => ({ low: 0, medium: 50, high: 100 })[value as "low" | "medium" | "high"] ?? 0;
const frequencyScale = (value: string) =>
  ({ never: 0, monthly: 33, weekly: 66, daily: 100 })[value as "never" | "monthly" | "weekly" | "daily"] ?? 0;

const average = (values: number[]) => Math.round(values.reduce((a, b) => a + b, 0) / values.length);

function levelForScore(score: number): SkillsLevel {
  if (score <= 25) return "Beginner";
  if (score <= 50) return "Explorer";
  if (score <= 75) return "Practitioner";
  return "AI Power User";
}

export function computeSkillsReadiness(answers: SkillsAnswers): SkillsResult {
  const knowledgeMetrics = {
    promptEngineeringKnowledge: knowledgeScale(answers.promptEngineeringKnowledge),
    generativeAiKnowledge: knowledgeScale(answers.generativeAiKnowledge),
    aiEthicsKnowledge: knowledgeScale(answers.aiEthicsKnowledge),
    llmKnowledge: knowledgeScale(answers.llmKnowledge),
    aiLimitationsKnowledge: knowledgeScale(answers.aiLimitationsKnowledge),
    aiPrivacyKnowledge: knowledgeScale(answers.aiPrivacyKnowledge),
    aiHallucinationsKnowledge: knowledgeScale(answers.aiHallucinationsKnowledge),
  };
  const knowledgeScore = average(Object.values(knowledgeMetrics));

  const practicalMetrics = {
    factChecking: confidenceScale(answers.factChecking),
    usingMultipleTools: confidenceScale(answers.usingMultipleTools),
    automatingWorkflows: confidenceScale(answers.automatingWorkflows),
    creatingCustomGpts: confidenceScale(answers.creatingCustomGpts),
    aiImageGeneration: confidenceScale(answers.aiImageGeneration),
  };
  const practicalScore = average(Object.values(practicalMetrics));

  const writingPromptsScore = confidenceScale(answers.writingPrompts);
  const improvingPromptsScore = confidenceScale(answers.improvingPrompts);
  const promptEngineeringScore = average([writingPromptsScore, improvingPromptsScore]);

  const frequencyScore = frequencyScale(answers.usageFrequency);
  const toolsUsedScore = Math.min(100, Math.round((answers.toolsUsed.length / 5) * 100));
  const workplaceUsageScore = Math.min(100, Math.round((answers.workplaceUsage.length / 10) * 100));
  const adoptionScore = average([frequencyScore, toolsUsedScore, workplaceUsageScore]);

  const confidenceScore = average([practicalScore, promptEngineeringScore, frequencyScore]);

  const overallScore = Math.round(
    knowledgeScore * 0.2 + practicalScore * 0.25 + promptEngineeringScore * 0.15 + adoptionScore * 0.25 + confidenceScore * 0.15,
  );
  const level = levelForScore(overallScore);

  const subMetrics: SkillSubMetric[] = [
    {
      key: "promptEngineeringKnowledge",
      label: "Prompt Engineering Knowledge",
      score: knowledgeMetrics.promptEngineeringKnowledge,
      action: "prompt-engineering",
      strengthReason: "You understand prompt engineering concepts well.",
      improvementReason: "Limited understanding of prompt engineering fundamentals.",
    },
    {
      key: "generativeAiKnowledge",
      label: "Generative AI Knowledge",
      score: knowledgeMetrics.generativeAiKnowledge,
      action: "ai-fundamentals",
      strengthReason: "You have a solid grasp of how generative AI works.",
      improvementReason: "Limited understanding of how generative AI works.",
    },
    {
      key: "aiEthicsKnowledge",
      label: "AI Ethics Awareness",
      score: knowledgeMetrics.aiEthicsKnowledge,
      action: "ai-ethics-safety",
      strengthReason: "You're aware of key AI ethics considerations.",
      improvementReason: "Limited awareness of AI ethics and responsible use.",
    },
    {
      key: "llmKnowledge",
      label: "Large Language Model Knowledge",
      score: knowledgeMetrics.llmKnowledge,
      action: "ai-fundamentals",
      strengthReason: "You understand how large language models work.",
      improvementReason: "Limited understanding of how large language models work.",
    },
    {
      key: "aiLimitationsKnowledge",
      label: "Understanding of AI Limitations",
      score: knowledgeMetrics.aiLimitationsKnowledge,
      action: "ai-ethics-safety",
      strengthReason: "You have a clear sense of where AI falls short.",
      improvementReason: "Limited understanding of AI's current limitations.",
    },
    {
      key: "aiPrivacyKnowledge",
      label: "AI Privacy Awareness",
      score: knowledgeMetrics.aiPrivacyKnowledge,
      action: "ai-ethics-safety",
      strengthReason: "You're conscious of data privacy when using AI.",
      improvementReason: "Limited awareness of AI privacy and data risks.",
    },
    {
      key: "aiHallucinationsKnowledge",
      label: "Awareness of AI Hallucinations",
      score: knowledgeMetrics.aiHallucinationsKnowledge,
      action: "ai-ethics-safety",
      strengthReason: "You know how to spot and handle AI hallucinations.",
      improvementReason: "Limited awareness of AI hallucinations and how to catch them.",
    },
    {
      key: "writingPrompts",
      label: "Prompt Writing",
      score: writingPromptsScore,
      action: "prompt-engineering",
      strengthReason: "You write clear, effective AI prompts.",
      improvementReason: "Limited confidence writing effective AI prompts.",
    },
    {
      key: "improvingPrompts",
      label: "Prompt Refinement",
      score: improvingPromptsScore,
      action: "prompt-engineering",
      strengthReason: "You're skilled at refining prompts to get better results.",
      improvementReason: "Limited experience refining prompts for better results.",
    },
    {
      key: "factChecking",
      label: "Fact-Checking AI Output",
      score: practicalMetrics.factChecking,
      action: "ai-ethics-safety",
      strengthReason: "You consistently verify AI-generated information.",
      improvementReason: "Limited habit of fact-checking AI responses.",
    },
    {
      key: "usingMultipleTools",
      label: "Multi-Tool Fluency",
      score: practicalMetrics.usingMultipleTools,
      action: "multi-tool-fluency",
      strengthReason: "You're comfortable working across multiple AI tools.",
      improvementReason: "Little experience working across multiple AI tools.",
    },
    {
      key: "automatingWorkflows",
      label: "Workflow Automation",
      score: practicalMetrics.automatingWorkflows,
      action: "workflow-automation",
      strengthReason: "You're able to automate parts of your workflow with AI.",
      improvementReason: "Limited experience automating workflows with AI.",
    },
    {
      key: "creatingCustomGpts",
      label: "Building Custom AI Assistants",
      score: practicalMetrics.creatingCustomGpts,
      action: "workflow-automation",
      strengthReason: "You're able to build and configure custom AI assistants.",
      improvementReason: "Little experience building custom AI assistants or GPTs.",
    },
    {
      key: "aiImageGeneration",
      label: "AI Image Generation",
      score: practicalMetrics.aiImageGeneration,
      action: "content-creation-ai",
      strengthReason: "You're confident generating images with AI tools.",
      improvementReason: "Limited experience with AI image generation.",
    },
    {
      key: "frequency",
      label: "Regular AI Usage",
      score: frequencyScore,
      action: "ai-fundamentals",
      strengthReason: "You use AI tools regularly in your day-to-day work.",
      improvementReason: "AI tools aren't yet part of your regular routine.",
    },
    {
      key: "toolsUsed",
      label: "AI Tool Variety",
      score: toolsUsedScore,
      action: "multi-tool-fluency",
      strengthReason: "You've explored a good range of AI tools.",
      improvementReason: "Little experience beyond a single AI tool.",
    },
    {
      key: "workplaceUsage",
      label: "Workplace AI Adoption",
      score: workplaceUsageScore,
      action: "data-analysis-ai",
      strengthReason: "You've applied AI across a wide range of work tasks.",
      improvementReason: "AI is only applied to a narrow slice of your work today.",
    },
  ];

  const sortedDesc = [...subMetrics].sort((a, b) => b.score - a.score);
  const sortedAsc = [...subMetrics].sort((a, b) => a.score - b.score);

  const strengths = sortedDesc.slice(0, 3).map((m) => ({ label: m.label, reason: m.strengthReason }));
  const improvements = sortedAsc.slice(0, 3).map((m) => ({ label: m.label, reason: m.improvementReason }));

  const nextSkillMetric = sortedAsc[0];
  const nextSkill = skillActionLibrary[nextSkillMetric.action];

  const summary = buildSummary(level, overallScore, answers.name);

  return {
    overallScore,
    knowledgeScore,
    practicalScore,
    promptEngineeringScore,
    adoptionScore,
    confidenceScore,
    level,
    summary,
    strengths,
    improvements,
    nextSkill,
  };
}

function buildSummary(level: SkillsLevel, score: number, name: string): string {
  const descriptions: Record<SkillsLevel, string> = {
    Beginner:
      "you're just getting started with AI. With a bit of structured learning, you'll quickly build the confidence to use it in your day-to-day work.",
    Explorer:
      "you've started using AI, but there's still a lot of untapped potential. Building a few core skills will make a noticeable difference to how you work.",
    Practitioner:
      "you're using AI with reasonable confidence across your work. A few targeted improvements will help you get meaningfully more value from it.",
    "AI Power User":
      "you're using AI confidently and effectively across your work. You're well positioned to go deeper into advanced, high-leverage AI skills.",
  };
  const lead = name ? `${name}, ` : "Overall, ";
  return `${lead}${descriptions[level]} Overall AI Skills Readiness score: ${score}/100.`;
}

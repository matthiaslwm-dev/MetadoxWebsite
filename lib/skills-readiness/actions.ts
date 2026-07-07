import type { NextSkillRecommendation } from "./types";

export type SkillActionKey =
  | "prompt-engineering"
  | "ai-fundamentals"
  | "ai-ethics-safety"
  | "workflow-automation"
  | "microsoft-365-ai"
  | "data-analysis-ai"
  | "content-creation-ai"
  | "multi-tool-fluency";

export const skillActionLibrary: Record<SkillActionKey, NextSkillRecommendation> = {
  "prompt-engineering": {
    title: "Master Prompt Engineering",
    why: "Writing and refining prompts is the single skill that unlocks better results from every AI tool you use — it's the foundation everything else builds on.",
    productivityImpact: "Faster, more accurate AI output with far less trial and error.",
    difficulty: "Low",
  },
  "ai-fundamentals": {
    title: "Learn AI Fundamentals & Generative AI",
    why: "A clearer understanding of how generative AI and large language models actually work will help you use them more effectively and with more confidence.",
    productivityImpact: "More confident, informed decisions about when and how to use AI.",
    difficulty: "Low",
  },
  "ai-ethics-safety": {
    title: "Learn AI Ethics, Privacy & Risk Awareness",
    why: "Understanding AI's limitations, hallucination risks and privacy considerations is essential before relying on it more heavily in your work.",
    productivityImpact: "Safer, more responsible AI use with fewer costly mistakes.",
    difficulty: "Low",
  },
  "workflow-automation": {
    title: "Learn AI Workflow Automation",
    why: "You're comfortable using AI tools individually — the next step is connecting them into repeatable workflows that save time automatically.",
    productivityImpact: "Hours saved every week on repetitive, multi-step tasks.",
    difficulty: "Medium",
  },
  "microsoft-365-ai": {
    title: "Learn AI for Microsoft 365",
    why: "Microsoft Copilot is already available inside the tools you use daily — learning it properly turns everyday tasks into quick, AI-assisted work.",
    productivityImpact: "Faster document drafting, meeting notes and data work inside tools you already use.",
    difficulty: "Low",
  },
  "data-analysis-ai": {
    title: "Learn AI Data Analysis",
    why: "You're not yet using AI for data or reporting work — this is one of the highest-value applications available for most roles.",
    productivityImpact: "Faster insights and reporting without manual number-crunching.",
    difficulty: "Medium",
  },
  "content-creation-ai": {
    title: "Learn AI Content Creation",
    why: "Building stronger AI content skills — writing, visuals and formats — will speed up a large share of day-to-day communication work.",
    productivityImpact: "Faster, more consistent content output across formats.",
    difficulty: "Low",
  },
  "multi-tool-fluency": {
    title: "Build Multi-Tool AI Fluency",
    why: "You're relying on a single AI tool today — different tools have different strengths, and broadening your toolkit will improve your results.",
    productivityImpact: "Better results by matching the right AI tool to the right task.",
    difficulty: "Low",
  },
};

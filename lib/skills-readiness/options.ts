import type { Choice } from "@/lib/readiness/options";

export { industries } from "@/lib/readiness/options";

export const yearsExperienceOptions: Choice[] = [
  { value: "0-2", label: "0 – 2 years" },
  { value: "3-5", label: "3 – 5 years" },
  { value: "6-10", label: "6 – 10 years" },
  { value: "10+", label: "10+ years" },
];

export const departmentOptions: Choice[] = [
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
  { value: "operations", label: "Operations" },
  { value: "finance", label: "Finance" },
  { value: "hr", label: "Human Resources" },
  { value: "it", label: "IT / Engineering" },
  { value: "customer-service", label: "Customer Service" },
  { value: "product", label: "Product" },
  { value: "other", label: "Other" },
];

export const currentRoleOptions: Choice[] = [
  { value: "individual-contributor", label: "Individual Contributor" },
  { value: "manager", label: "Team Lead / Manager" },
  { value: "head-of-department", label: "Head of Department" },
  { value: "executive", label: "C-Level / Founder" },
];

export const aiToolsOptions: Choice[] = [
  { value: "chatgpt", label: "ChatGPT" },
  { value: "claude", label: "Claude" },
  { value: "copilot", label: "Microsoft Copilot" },
  { value: "gemini", label: "Gemini" },
  { value: "other", label: "Other AI tools" },
];

export const usageFrequencyOptions: Choice[] = [
  { value: "never", label: "Never" },
  { value: "monthly", label: "Monthly" },
  { value: "weekly", label: "Weekly" },
  { value: "daily", label: "Daily" },
];

export const knowledgeRatingOptions: Choice[] = [
  { value: "none", label: "Not familiar" },
  { value: "basic", label: "Basic understanding" },
  { value: "strong", label: "Strong understanding" },
];

export const confidenceRatingOptions: Choice[] = [
  { value: "low", label: "Not confident" },
  { value: "medium", label: "Somewhat confident" },
  { value: "high", label: "Very confident" },
];

export const workplaceUsageOptions: Choice[] = [
  { value: "email-writing", label: "Email writing" },
  { value: "research", label: "Research" },
  { value: "data-analysis", label: "Data analysis" },
  { value: "meeting-summaries", label: "Meeting summaries" },
  { value: "content-creation", label: "Content creation" },
  { value: "coding", label: "Coding" },
  { value: "presentations", label: "Presentations" },
  { value: "customer-support", label: "Customer support" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export const learningGoalOptions: Choice[] = [
  { value: "save-time", label: "Save time" },
  { value: "productivity", label: "Become more productive" },
  { value: "learn-ai", label: "Learn AI" },
  { value: "work-quality", label: "Improve work quality" },
  { value: "automate-repetitive", label: "Automate repetitive work" },
  { value: "career-progression", label: "Career progression" },
  { value: "leadership", label: "Leadership" },
  { value: "coding", label: "Coding" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "other", label: "Other" },
];

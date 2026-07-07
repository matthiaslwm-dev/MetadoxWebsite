export type Choice = { value: string; label: string; description?: string };

export const industries: Choice[] = [
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail-ecommerce", label: "Retail & E-commerce" },
  { value: "professional-services", label: "Professional Services" },
  { value: "construction-realestate", label: "Construction & Real Estate" },
  { value: "logistics-distribution", label: "Logistics & Distribution" },
  { value: "food-hospitality", label: "F&B / Hospitality" },
  { value: "healthcare", label: "Healthcare" },
  { value: "financial-services", label: "Financial Services" },
  { value: "technology", label: "Technology" },
  { value: "other", label: "Other" },
];

export const employeeBrackets: Choice[] = [
  { value: "1-10", label: "1 – 10" },
  { value: "11-50", label: "11 – 50" },
  { value: "51-200", label: "51 – 200" },
  { value: "201-500", label: "201 – 500" },
  { value: "500+", label: "500+" },
];

export const businessModels: Choice[] = [
  { value: "b2b", label: "B2B" },
  { value: "b2c", label: "B2C" },
  { value: "b2b-b2c", label: "Both B2B & B2C" },
  { value: "other", label: "Other" },
];

export const systemsUsedOptions: Choice[] = [
  { value: "spreadsheets", label: "Spreadsheets (Excel / Google Sheets)" },
  { value: "accounting", label: "Accounting software" },
  { value: "crm", label: "CRM" },
  { value: "erp", label: "ERP" },
  { value: "custom", label: "Custom-built software" },
  { value: "paper", label: "Paper-based / manual records" },
];

export const cloudUsageOptions: Choice[] = [
  { value: "none", label: "No cloud storage", description: "Everything is local, paper-based or offline" },
  { value: "partial", label: "Partially on the cloud", description: "A mix of cloud, local files and paper" },
  { value: "full", label: "Fully cloud-based", description: "Our systems and data run in the cloud" },
];

export const dataCentralisationOptions: Choice[] = [
  { value: "scattered", label: "Scattered", description: "Data lives across many disconnected files and tools" },
  { value: "partial", label: "Partially centralised", description: "Some systems share data, others don't" },
  { value: "centralised", label: "Centralised", description: "One source of truth most teams work from" },
];

export const reportingReliabilityOptions: Choice[] = [
  { value: "unreliable", label: "Unreliable", description: "Reports are inconsistent or hard to trust" },
  { value: "manual-ok", label: "Manual, but workable", description: "Someone pulls it together by hand each time" },
  { value: "reliable-automated", label: "Reliable & automated", description: "Reports are accurate and generate themselves" },
];

export const manualProcessLevelOptions: Choice[] = [
  { value: "fully-manual", label: "Fully manual", description: "Almost every step is done by hand" },
  { value: "mixed", label: "A mix", description: "Some steps are automated, most aren't" },
  { value: "mostly-automated", label: "Mostly automated", description: "Systems handle most of the work already" },
];

export const yesSomeNoOptions: Choice[] = [
  { value: "yes", label: "Yes, entirely manual" },
  { value: "some", label: "Some are, some aren't" },
  { value: "no", label: "No, they're automated" },
];

export const integrationOptions: Choice[] = [
  { value: "no", label: "No", description: "Our systems don't talk to each other" },
  { value: "partial", label: "Partially", description: "A few systems are connected" },
  { value: "yes", label: "Yes", description: "Our systems are well integrated" },
];

export const weeklyAdminHoursOptions: Choice[] = [
  { value: "20+", label: "20+ hours a week" },
  { value: "10-20", label: "10 – 20 hours a week" },
  { value: "5-10", label: "5 – 10 hours a week" },
  { value: "<5", label: "Under 5 hours a week" },
];

export const aiToolsOptions: Choice[] = [
  { value: "chatgpt-claude-gemini", label: "ChatGPT / Claude / Gemini" },
  { value: "copilot", label: "Microsoft Copilot" },
  { value: "custom-ai", label: "Custom AI tools" },
  { value: "embedded-ai", label: "AI features inside existing software" },
  { value: "none", label: "None yet" },
];

export const staffAiUsageOptions: Choice[] = [
  { value: "never", label: "Never" },
  { value: "rarely", label: "Rarely" },
  { value: "sometimes", label: "Sometimes" },
  { value: "daily", label: "Daily" },
];

export const aiTrainingOptions: Choice[] = [
  { value: "none", label: "No training given" },
  { value: "informal", label: "Informal, ad-hoc guidance" },
  { value: "formal", label: "Formal training programme" },
];

export const aiPolicyOptions: Choice[] = [
  { value: "none", label: "No policy in place" },
  { value: "informal", label: "Informal guidelines" },
  { value: "documented", label: "Documented policy" },
];

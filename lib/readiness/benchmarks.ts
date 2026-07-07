/** Mock Singapore industry benchmark data for overall AI readiness score (0-100). */
export const industryBenchmarks: Record<string, { average: number; topPerformers: number }> = {
  manufacturing: { average: 38, topPerformers: 74 },
  "retail-ecommerce": { average: 44, topPerformers: 78 },
  "professional-services": { average: 41, topPerformers: 76 },
  "construction-realestate": { average: 33, topPerformers: 68 },
  "logistics-distribution": { average: 40, topPerformers: 75 },
  "food-hospitality": { average: 35, topPerformers: 70 },
  healthcare: { average: 37, topPerformers: 72 },
  "financial-services": { average: 48, topPerformers: 82 },
  technology: { average: 52, topPerformers: 86 },
  other: { average: 39, topPerformers: 73 },
};

export function getIndustryBenchmark(industry: string) {
  return industryBenchmarks[industry] ?? industryBenchmarks.other;
}

export function percentileText(company: number, average: number, topPerformers: number) {
  if (company >= topPerformers) {
    return "You're performing at the level of top AI-ready businesses in your industry.";
  }
  if (company >= average) {
    return "You're ahead of the Singapore industry average, but behind top performers in your industry.";
  }
  return "You're currently behind the Singapore industry average for your sector.";
}

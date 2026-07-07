import type { Metadata } from "next";
import { SkillsAssessmentFlow } from "@/components/skills-readiness/assessment-flow";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Skills Readiness Assessment",
  description:
    "Take Metadox's free AI Skills Readiness Assessment to see how AI-ready you are professionally, and what to learn next.",
  alternates: { canonical: "/ai-skills-readiness" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/ai-skills-readiness`,
    title: `AI Skills Readiness Assessment — ${siteConfig.name}`,
    description: "See how AI-ready you are professionally, and what to learn next.",
  },
};

export default function AiSkillsReadinessPage() {
  return <SkillsAssessmentFlow />;
}

import type { Metadata } from "next";
import { AssessmentFlow } from "@/components/readiness/assessment-flow";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Business AI Readiness Assessment",
  description:
    "Take Metadox's free 5-minute Business AI Readiness Assessment to see your AI readiness score, benchmark against Singapore industry peers, and get your top quick win.",
  alternates: { canonical: "/business-ai-readiness" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/business-ai-readiness`,
    title: `Business AI Readiness Assessment — ${siteConfig.name}`,
    description:
      "See exactly where your business stands on AI readiness — and what to fix first.",
  },
};

export default function BusinessAiReadinessPage() {
  return <AssessmentFlow />;
}

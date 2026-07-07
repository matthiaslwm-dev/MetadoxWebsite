import { Card } from "@/components/ui/card";
import type { SkillsResult } from "@/lib/skills-readiness/types";

export function SkillsBreakdown({ result }: { result: SkillsResult }) {
  const cards = [
    { label: "AI Knowledge", value: result.knowledgeScore },
    { label: "Practical Skills", value: result.practicalScore },
    { label: "Prompt Engineering", value: result.promptEngineeringScore },
    { label: "AI Adoption", value: result.adoptionScore },
    { label: "AI Confidence", value: result.confidenceScore },
  ];

  return (
    <Card className="p-7 sm:p-8">
      <h2 className="font-heading text-xl font-bold text-navy">Skills Breakdown</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-line p-5 text-center">
            <p className="font-heading text-2xl font-bold text-navy">{card.value}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">{card.label}</p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-blue" style={{ width: `${card.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

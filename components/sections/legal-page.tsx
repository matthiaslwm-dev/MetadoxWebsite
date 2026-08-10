import type { LegalSection } from "@/lib/legal-content";

export function LegalPage({
  title,
  lastUpdated,
  sections,
}: {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}) {
  return (
    <section className="relative bg-lp-background px-6 pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-[62ch]">
        <h1 className="text-balance font-heading text-3xl font-bold leading-tight tracking-tight text-lp-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-lp-muted-foreground">
          Last updated: {lastUpdated}
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-semibold tracking-tight text-lp-foreground sm:text-2xl">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-4 text-base leading-relaxed text-lp-muted-foreground sm:text-lg">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

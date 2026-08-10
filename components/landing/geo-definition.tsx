import { Reveal } from "@/components/ui/motion";
import { geoDefinition } from "@/lib/geo-content";

/**
 * "What is GEO" — the explainer the rest of the page depends on, so it comes
 * first and reads as prose rather than cards.
 *
 * Two-column split with the heading on the left rail, matching the about
 * page's story section. Tinted ground bands it against the white hero.
 */
export function GeoDefinition() {
  return (
    <section
      id="what-is-geo"
      className="relative scroll-mt-24 bg-lp-muted/60 px-5 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] md:gap-16 lg:gap-24">
        <Reveal>
          <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-lp-primary">
            {geoDefinition.eyebrow}
          </span>
          <h2 className="text-balance text-2xl font-bold leading-tight text-lp-foreground sm:text-3xl md:text-4xl">
            {geoDefinition.heading}
          </h2>
        </Reveal>

        <div>
          <Reveal delay={0.1}>
            <div className="space-y-6 text-pretty text-base leading-relaxed text-lp-muted-foreground sm:text-lg">
              {geoDefinition.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

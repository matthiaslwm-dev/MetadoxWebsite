import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { geoWhy } from "@/lib/geo-content";

/**
 * The case for GEO, as numbered editorial rows.
 *
 * Deliberately not a card grid: the services section further down already is
 * one, and these six items are an argument that builds, so a list that reads
 * top to bottom suits them better than six equal tiles.
 */
export function GeoWhy() {
  return (
    <section
      id="why-geo"
      className="relative scroll-mt-24 bg-lp-muted/60 px-5 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-5xl">
        <Reveal className="mb-12 text-center">
          <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-lp-primary">
            {geoWhy.eyebrow}
          </span>
          <h2 className="mb-4 text-balance text-2xl font-bold text-lp-foreground sm:text-3xl md:text-4xl">
            {geoWhy.heading}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-lp-muted-foreground">
            {geoWhy.subhead}
          </p>
        </Reveal>

        <Stagger className="border-t border-lp-border">
          {geoWhy.reasons.map((reason, index) => (
            <StaggerItem
              key={reason.title}
              className="group grid gap-x-8 gap-y-3 border-b border-lp-border py-8 sm:grid-cols-[auto_minmax(0,13rem)_minmax(0,1fr)] sm:items-baseline sm:py-9"
            >
              <span className="font-mono text-sm tabular-nums text-lp-primary/60 transition-colors group-hover:text-lp-primary">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="flex items-center gap-3 text-lg font-bold leading-tight text-lp-foreground">
                <reason.icon className="h-4 w-4 shrink-0 text-lp-primary sm:hidden" />
                {reason.title}
              </h3>

              <p className="text-pretty text-base leading-relaxed text-lp-muted-foreground">
                {reason.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

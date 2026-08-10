import { ListOrdered, Sparkles } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { geoComparison } from "@/lib/geo-content";

/**
 * SEO vs GEO, side by side.
 *
 * Built as a CSS grid rather than a `<table>`: the row label has to move above
 * the two cells on mobile, which a real table cannot do without losing its
 * semantics. Nothing here is tabular data being read across, it is six paired
 * statements, so the grid costs nothing.
 */
export function GeoComparison() {
  return (
    <section
      id="seo-vs-geo"
      className="relative scroll-mt-24 bg-lp-background px-5 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-5xl">
        <Reveal className="mb-14 text-center">
          <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-lp-primary">
            {geoComparison.eyebrow}
          </span>
          <h2 className="mb-4 text-balance text-2xl font-bold text-lp-foreground sm:text-3xl md:text-4xl">
            {geoComparison.heading}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-lp-muted-foreground">
            {geoComparison.subhead}
          </p>
        </Reveal>

        <div className="overflow-hidden rounded-[1.25rem] border border-lp-border bg-lp-card shadow-sm">
          {/* Column headers only exist once there are two columns to head. */}
          <div className="hidden border-b border-lp-border bg-lp-muted/50 sm:grid sm:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <div className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-lp-muted-foreground">
              &nbsp;
            </div>
            <div className="flex items-center gap-2 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-lp-muted-foreground">
              <ListOrdered className="h-4 w-4 shrink-0" />
              {geoComparison.seoLabel}
            </div>
            {/* The GEO column is the argument, so it carries the brand tint. */}
            <div className="flex items-center gap-2 border-l border-lp-border bg-lp-primary/5 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-lp-primary">
              <Sparkles className="h-4 w-4 shrink-0" />
              {geoComparison.geoLabel}
            </div>
          </div>

          <Stagger>
            {geoComparison.rows.map((row) => (
              <StaggerItem
                key={row.aspect}
                className="grid gap-1 border-b border-lp-border px-6 py-5 last:border-b-0 sm:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)_minmax(0,1fr)] sm:gap-0 sm:px-0 sm:py-0"
              >
                <div className="text-sm font-bold text-lp-foreground sm:px-6 sm:py-6">
                  {row.aspect}
                </div>
                <div className="text-sm leading-relaxed text-lp-muted-foreground sm:px-6 sm:py-6">
                  <span className="mr-2 font-semibold text-lp-foreground/70 sm:hidden">
                    {geoComparison.seoLabel}:
                  </span>
                  {row.seo}
                </div>
                <div className="text-sm font-medium leading-relaxed text-lp-foreground sm:border-l sm:border-lp-border sm:bg-lp-primary/5 sm:px-6 sm:py-6">
                  <span className="mr-2 font-semibold text-lp-primary sm:hidden">
                    {geoComparison.geoLabel}:
                  </span>
                  {row.geo}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

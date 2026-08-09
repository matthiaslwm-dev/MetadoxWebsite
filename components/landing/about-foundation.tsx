import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { aboutFoundation } from "@/lib/landing-content";

/**
 * Mission / vision / approach as a numbered editorial list rather than cards:
 * the team section directly below is already a card grid, so hairline-separated
 * rows give this section its own texture instead of repeating that rhythm.
 */
export function LandingAboutFoundation() {
  return (
    <section
      id="foundation"
      className="relative scroll-mt-24 bg-lp-background px-6 py-24"
    >
      <div className="mx-auto w-full max-w-5xl">
        <Reveal className="mb-12 text-center">
          <span className="block text-sm font-medium uppercase tracking-wider text-lp-primary">
            {aboutFoundation.eyebrow}
          </span>
        </Reveal>

        {/* Top hairline closes the list so the first row reads as banded too.
            Rows arrive one after another, which reads like the list is being
            written out rather than dropped in whole. */}
        <Stagger className="border-t border-lp-border">
          {aboutFoundation.pillars.map((pillar, index) => (
            <StaggerItem
              key={pillar.title}
              className="group grid gap-x-8 gap-y-4 border-b border-lp-border py-8 sm:grid-cols-[auto_minmax(0,11rem)_minmax(0,1fr)] sm:items-baseline sm:py-10"
            >
              <span className="font-mono text-sm tabular-nums text-lp-primary/60 transition-colors group-hover:text-lp-primary">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="flex items-center gap-3 text-lg font-bold leading-tight text-lp-foreground sm:text-xl">
                <pillar.icon className="h-4 w-4 shrink-0 text-lp-primary sm:hidden" />
                {pillar.title}
              </h3>

              <p className="text-pretty text-base leading-relaxed text-lp-muted-foreground sm:text-lg">
                {pillar.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

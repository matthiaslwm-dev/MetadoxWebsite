import { ArrowRight } from "lucide-react";
import { LpButton } from "./lp-button";
import { ParticleField } from "./particle-field";
import { geoHero } from "@/lib/geo-content";
import { primaryCta } from "@/lib/site";

/**
 * GEO hero. Same type ramp and stat row as the landing hero, but without the
 * floating icons and signal wires: that staging belongs to the home page and
 * would say nothing about search visibility here. A soft radial glow carries
 * the top of the page instead.
 */
export function GeoHero() {
  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-lp-background px-6 pt-28 pb-16">
      <ParticleField />

      {/* Painted over the field, not under it: the wave runs right through the
          middle of the hero, and the copy needs a calmer ground to sit on. */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.92),rgba(255,255,255,0.55)_45%,transparent_72%)]" />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <h1
          style={{ animationDelay: "0.2s" }}
          className="mb-6 animate-lp-fade-in px-2 text-xl font-extrabold leading-tight text-lp-foreground opacity-0 sm:text-2xl md:text-3xl lg:text-4xl"
        >
          <span className="mx-auto my-2 block w-fit text-lp-primary text-2xl leading-[1.2] sm:text-4xl md:text-5xl lg:text-6xl">
            {geoHero.gradientLine}
          </span>
          {geoHero.headline}
        </h1>

        <p
          style={{ animationDelay: "0.3s" }}
          className="mx-auto mb-8 max-w-2xl animate-lp-fade-in px-2 text-base text-lp-muted-foreground opacity-0 sm:text-lg md:text-xl"
        >
          {geoHero.subhead}
        </p>

        <div
          style={{ animationDelay: "0.4s" }}
          className="flex animate-lp-fade-in-up flex-col items-center justify-center gap-4 opacity-0 sm:flex-row"
        >
          <LpButton href={primaryCta.href} variant="hero">
            Book a Free Discovery Call
            <ArrowRight className="h-5 w-5" />
          </LpButton>
          <LpButton href="#what-is-geo">How GEO Works</LpButton>
        </div>

        {/* Which assistants the work covers. Named rather than logo-marked:
            these are trademarks we have no licence to display, and the dot
            carries enough of each brand to be read at a glance. */}
        <div
          style={{ animationDelay: "0.55s" }}
          className="mt-8 flex animate-lp-fade-in flex-wrap items-center justify-center gap-2 opacity-0 sm:gap-3"
        >
          <span className="text-xs text-lp-muted-foreground sm:text-sm">
            {geoHero.coversLabel}
          </span>
          {geoHero.engines.map((engine) => (
            <span
              key={engine.name}
              className="inline-flex items-center gap-2 rounded-full border border-lp-border bg-lp-card px-3.5 py-1.5 text-xs font-medium text-lp-foreground shadow-sm sm:text-sm"
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: engine.dot }}
              />
              {engine.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

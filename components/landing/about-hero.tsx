import { aboutHero } from "@/lib/landing-content";

/**
 * About-page hero: plain white, centred, three lines of type and nothing else.
 *
 * Deliberately none of the landing hero's staging — no radial glow, no gradient
 * headline, no stat row. This page opens quietly and hands over to the story
 * below it, so the ornament would only compete with it.
 *
 * Reference metrics: padding 8rem/4rem, 10rem/6rem from `md` up.
 */
export function LandingAboutHero() {
  return (
    <section className="bg-lp-background px-5 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 md:pb-24 md:pt-40">
      <div
        style={{ animationDelay: "0.1s" }}
        className="mx-auto w-full max-w-4xl animate-lp-fade-in text-center opacity-0"
      >
        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-lp-primary">
          {aboutHero.eyebrow}
        </p>
        <h1 className="mb-6 text-balance text-3xl font-bold leading-tight text-lp-foreground sm:text-4xl md:text-5xl">
          {aboutHero.heading}
        </h1>
        <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-lp-muted-foreground sm:text-lg md:text-xl">
          {aboutHero.subhead}
        </p>
      </div>
    </section>
  );
}

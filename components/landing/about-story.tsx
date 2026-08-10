import { Reveal } from "@/components/ui/motion";
import { aboutStory } from "@/lib/landing-content";

/**
 * "Our Philosophy" — the one section whose copy is fixed. Tinted ground so it reads
 * as its own band between the white hero and the white foundation grid, the
 * same banding rhythm the landing page uses.
 *
 * Two-column split: the heading holds the left rail and the prose runs down the
 * right. Both columns scroll normally, no sticky or reveal behaviour.
 */
export function LandingAboutStory() {
  return (
    <section id="story" className="relative scroll-mt-24 bg-lp-muted/60 px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] md:gap-16 lg:gap-24">
        <Reveal>
          <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-lp-primary">
            {aboutStory.eyebrow}
          </span>
          <h2 className="text-balance text-2xl font-bold leading-tight text-lp-foreground sm:text-3xl md:text-4xl">
            {aboutStory.heading}
          </h2>
        </Reveal>

        <div>
          {/* Prose trails the heading slightly so the eye is led left to right. */}
          <Reveal delay={0.1}>
            <div className="space-y-6 text-pretty text-base leading-relaxed text-lp-muted-foreground sm:text-lg">
              {aboutStory.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          {/* The closing line, pulled out as a rule-marked statement so it
              lands harder than the paragraphs above it. */}
          <Reveal delay={0.2}>
            <p className="mt-9 text-balance border-l-2 border-lp-primary pl-6 text-lg font-semibold leading-snug text-lp-foreground sm:text-xl md:text-2xl">
              {aboutStory.pullQuote}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

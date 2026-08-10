import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { buildCards, whatWeBuild } from "@/lib/landing-content";

/**
 * Six-up services grid sitting between the hero and the process section.
 *
 * Tinted background: the hero and the process section are both white, so a
 * flat white here would run all three together into one undifferentiated
 * column. The tint is what gives the page its banding.
 */
export function LandingWhatWeBuild() {
  return (
    <section
      id="what-we-build"
      className="relative scroll-mt-24 bg-lp-muted/60 px-5 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="mb-16 text-center">
          <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-lp-primary">
            {whatWeBuild.eyebrow}
          </span>
          <h2 className="mb-4 text-2xl font-extrabold text-lp-foreground sm:text-3xl md:text-4xl">
            {whatWeBuild.heading}
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-lp-muted-foreground sm:text-base md:text-lg lg:whitespace-nowrap">
            {whatWeBuild.subhead}
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {buildCards.map((card) => (
            /*
              The whole card is the link, not just the "Learn More" row: it
              gives a pointer-sized target instead of a two-word one, and keeps
              a single tab stop per card. The row below is therefore a span,
              since an anchor inside an anchor is invalid.
            */
            <StaggerItem key={card.title} className="h-full">
              <Link
                href={whatWeBuild.cardHref}
                className="group flex h-full flex-col rounded-[1.25rem] border border-lp-border bg-lp-card p-6 shadow-sm sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-lp-primary/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lp-primary focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
              >
                {/* The icon tile is the hover tell: it fills with the brand colour
                  and inverts the glyph, so the card reacts without moving. */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-lp-border bg-lp-muted text-lp-primary transition-colors group-hover:border-lp-primary group-hover:bg-lp-primary group-hover:text-lp-primary-foreground motion-reduce:transition-none">
                  <card.icon className="h-5 w-5" />
                </div>

                <h3 className="mb-3 text-lg font-bold text-lp-foreground">
                  {card.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-lp-muted-foreground">
                  {card.description}
                </p>

                {/* `mt-auto` pins this to the bottom so the row lines up across
                  a grid row regardless of how long each description runs. The
                  gap opening on hover is what nudges the arrow outward. */}
                <span className="mt-auto inline-flex items-center gap-0 text-sm font-semibold text-lp-primary transition-all duration-300 group-hover:gap-2 motion-reduce:transition-none">
                  {whatWeBuild.cardCta}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

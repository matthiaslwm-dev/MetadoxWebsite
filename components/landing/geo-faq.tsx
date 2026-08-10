import { Plus } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { geoFaq } from "@/lib/geo-content";

/**
 * FAQ accordion built on native `<details>` rather than state.
 *
 * Keeps the section a server component, works without JavaScript, and gives
 * the open/closed semantics for free. It also means the answers are in the
 * initial HTML, which is the whole point on a page about being readable by
 * machines that do not run your scripts.
 */
export function GeoFaq() {
  return (
    <section
      id="geo-faq"
      className="relative scroll-mt-24 bg-lp-background px-5 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-3xl">
        <Reveal className="mb-12 text-center">
          <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-lp-primary">
            {geoFaq.eyebrow}
          </span>
          <h2 className="text-balance text-2xl font-bold text-lp-foreground sm:text-3xl md:text-4xl">
            {geoFaq.heading}
          </h2>
        </Reveal>

        <Stagger className="space-y-3">
          {geoFaq.items.map((item) => (
            <StaggerItem key={item.question}>
              <details className="group rounded-2xl border border-lp-border bg-lp-card px-6 shadow-sm transition-colors open:border-lp-primary/30">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-semibold text-lp-foreground [&::-webkit-details-marker]:hidden">
                  {item.question}
                  {/* One glyph rotated into an x, so there is nothing to keep in
                      sync between the two states. */}
                  <Plus className="h-5 w-5 shrink-0 text-lp-primary transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none" />
                </summary>
                <p className="pb-5 pr-9 text-pretty text-sm leading-relaxed text-lp-muted-foreground sm:text-base">
                  {item.answer}
                </p>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

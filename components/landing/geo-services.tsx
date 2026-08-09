import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { geoServices } from "@/lib/geo-content";

/**
 * The six workstreams inside a GEO engagement.
 *
 * Same card treatment as the landing page's services grid, minus the link:
 * these are parts of one engagement rather than six things to buy, so there is
 * nowhere for a card to go.
 */
export function GeoServices() {
  return (
    <section
      id="geo-services"
      className="relative scroll-mt-24 bg-lp-background px-6 py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="mb-16 text-center">
          <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-lp-primary">
            {geoServices.eyebrow}
          </span>
          <h2 className="mb-4 text-balance text-2xl font-extrabold text-lp-foreground sm:text-3xl md:text-4xl">
            {geoServices.heading}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-lp-muted-foreground">
            {geoServices.subhead}
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {geoServices.items.map((item) => (
            <StaggerItem key={item.title} className="h-full">
              <div className="group flex h-full flex-col rounded-[1.25rem] border border-lp-border bg-lp-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-lp-primary/30 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-lp-border bg-lp-muted text-lp-primary transition-colors group-hover:border-lp-primary group-hover:bg-lp-primary group-hover:text-lp-primary-foreground motion-reduce:transition-none">
                  <item.icon className="h-5 w-5" />
                </div>

                <h3 className="mb-3 text-lg font-bold text-lp-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-lp-muted-foreground">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

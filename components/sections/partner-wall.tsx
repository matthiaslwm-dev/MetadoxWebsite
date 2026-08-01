import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/motion";
import { partners } from "@/lib/content";

export function PartnerWall() {
  return (
    <section className="relative scroll-mt-24 bg-white py-16 sm:py-20">
      <Container>
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Trusted by organisations &amp; partners
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-line [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
            <div className="flex w-max animate-marquee items-stretch hover:[animation-play-state:paused]">
              {/* Second copy is decorative — it only exists to make the loop seamless. */}
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  className="flex items-stretch"
                  aria-hidden={copy === 1 || undefined}
                >
                  {partners.map((p) => (
                    <div
                      key={p.name}
                      className="group flex w-40 shrink-0 items-center justify-center border-r border-line bg-white px-4 py-7 transition-colors hover:bg-canvas sm:w-56"
                    >
                      <span className="font-heading text-base font-semibold tracking-tight text-muted transition-colors duration-300 group-hover:text-navy sm:text-lg">
                        {p.name}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

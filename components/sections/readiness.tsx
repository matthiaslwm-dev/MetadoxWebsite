import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { readinessCards } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Readiness() {
  return (
    <section id="readiness" className="section-pad relative scroll-mt-24 bg-white">
      <Container>
        <SectionHeading
          eyebrow="The AI Readiness Gap"
          title={
            <>
              Are You <span className="text-gradient">AI Ready?</span>
            </>
          }
          description="Businesses adopting AI are reducing costs, boosting productivity and staying competitive. Professionals adopting AI are future-proofing their careers. Don't get left behind."
        />

        <Stagger className="relative mt-14 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
          {readinessCards.map((card) => {
            const featured = card.id === "business";
            return (
              <StaggerItem key={card.id}>
                <div
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-8 transition-all duration-300 hover:-translate-y-1.5 sm:p-10",
                    featured
                      ? "ring-gradient bg-gradient-to-b from-white to-blue-soft/50 shadow-lift"
                      : "border border-line bg-white shadow-soft hover:shadow-lift",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-blue-soft text-blue">
                      <card.icon className="size-7" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue">
                        {card.audience}
                      </p>
                      <h3 className="font-heading text-2xl font-bold text-navy">
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-5 leading-relaxed text-muted">
                    {card.description}
                  </p>

                  <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-navy/40">
                    What you receive
                  </p>
                  <ul className="mt-3 flex flex-col gap-3">
                    {card.deliverables.map((d) => (
                      <li
                        key={d.label}
                        className="flex items-center gap-3 text-[0.95rem] text-ink/80"
                      >
                        <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-lg bg-blue/10 text-blue">
                          <d.icon className="size-3.5" />
                        </span>
                        {d.label}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <Button
                      href={card.href}
                      size="lg"
                      variant={featured ? "primary" : "dark"}
                      className="w-full"
                    >
                      {card.cta}
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                    </Button>
                  </div>
                </div>
              </StaggerItem>
            );
          })}

          {/* OR divider */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <span className="flex size-12 items-center justify-center rounded-full border border-line bg-white text-sm font-bold uppercase tracking-wider text-navy shadow-lift">
              OR
            </span>
          </div>
        </Stagger>
      </Container>
    </section>
  );
}

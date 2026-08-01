import { Landmark } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/motion";
import { grants } from "@/lib/content";

export function PricingGrantBanner() {
  const edg = grants.find((g) => g.code === "EDG");
  if (!edg) return null;

  return (
    <section className="relative scroll-mt-24 bg-white pb-20 sm:pb-24">
      <Container>
        <Reveal className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-blue/20 bg-blue-soft p-7 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue shadow-soft">
                <Landmark className="size-5" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="font-heading text-base font-bold text-navy">
                    {edg.name} ({edg.code})
                  </h2>
                  <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue">
                    {edg.tag}
                  </span>
                </div>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                  Eligible projects may also be supported by Singapore
                  government funding. {edg.description}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

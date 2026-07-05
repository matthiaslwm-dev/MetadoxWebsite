import { Check, X, TrendingDown, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/motion";
import { costOfWaiting } from "@/lib/content";

export function CostOfWaiting() {
  return (
    <section
      id="cost"
      className="relative scroll-mt-24 overflow-hidden bg-navy py-24 text-white sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-50" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[45rem] -translate-x-1/2 rounded-full bg-blue/15 blur-[120px]" />

      <Container className="relative">
        <SectionHeading
          tone="dark"
          eyebrow="Why Act Now"
          title="The Cost of Waiting"
          description="AI adoption is no longer optional. It's a competitive advantage. Businesses embracing AI are improving productivity, reducing costs, and making smarter decisions, while those that delay face an increasingly difficult challenge to catch up."
        />

        <div className="relative mx-auto mt-14 grid max-w-5xl gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-10">
          {/* Businesses That Wait */}
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-9">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-red-500/15 text-red-400">
                  <TrendingDown className="size-5" />
                </span>
                <h3 className="font-heading text-xl font-bold text-white/90">
                  Businesses That Wait
                </h3>
              </div>
              <ul className="mt-7 flex flex-col gap-4">
                {costOfWaiting.wait.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/55">
                    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-400">
                      <X className="size-3.5" />
                    </span>
                    <span className="text-[0.95rem]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Businesses That Act */}
          <Reveal delay={0.12} className="h-full">
            <div className="ring-gradient flex h-full flex-col rounded-3xl bg-gradient-to-b from-blue/[0.12] to-white/[0.03] p-8 shadow-[0_30px_80px_-40px_rgba(1,94,232,0.7)] sm:p-9">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                  <TrendingUp className="size-5" />
                </span>
                <h3 className="font-heading text-xl font-bold text-white">
                  Businesses That Act
                </h3>
              </div>
              <ul className="mt-7 flex flex-col gap-4">
                {costOfWaiting.act.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/90">
                    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-[0.95rem]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* VS badge */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <span className="flex size-14 items-center justify-center rounded-full border border-white/15 bg-navy text-sm font-bold uppercase tracking-widest text-white shadow-lift">
              VS
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

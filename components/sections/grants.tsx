import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { grants, grantProcess } from "@/lib/content";

export function Grants() {
  const last = grantProcess.length - 1;

  return (
    <section
      id="grants"
      className="relative scroll-mt-24 overflow-hidden bg-navy py-24 text-white sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-50" />
      <div className="pointer-events-none absolute -right-20 top-10 h-96 w-96 rounded-full bg-blue/20 blur-[120px]" />

      <Container className="relative">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal className="max-w-2xl">
            <Eyebrow tone="dark">Grants &amp; Funding</Eyebrow>
            <h2 className="mt-5 font-heading text-[1.9rem] font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-[2.7rem]">
              Making AI <span className="text-gradient-light">More Affordable</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
              We help businesses and individuals leverage Singapore government
              support — so AI transformation costs less and delivers more.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/#contact" variant="light" size="lg">
              Explore grant support
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </Button>
          </Reveal>
        </div>

        {/* Grant cards */}
        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {grants.map((grant) => (
            <StaggerItem key={grant.code} className="h-full">
              <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.07] sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-white/10 text-blue-bright">
                    <grant.icon className="size-6" />
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.7rem] font-medium text-white/80">
                    {grant.tag}
                  </span>
                </div>
                <p className="mt-6 font-heading text-lg font-bold text-white">
                  {grant.code}
                </p>
                <p className="text-sm font-semibold text-white/85">{grant.name}</p>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-white/60">
                  {grant.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-bright transition-all group-hover:gap-2.5">
                  How we help
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Process stepper */}
        <Reveal className="mt-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              How we help you maximise funding
            </p>
            <div className="grid gap-6 sm:grid-cols-5 sm:gap-4">
              {grantProcess.map((step, i) => (
                <div
                  key={step.label}
                  className="relative flex flex-col items-center gap-3 text-center"
                >
                  {i !== last && (
                    <ArrowRight className="absolute -right-2.5 top-6 hidden size-4 -translate-y-1/2 text-white/20 sm:block" />
                  )}
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-gradient text-white ring-4 ring-white/5">
                    <step.icon className="size-5" />
                  </span>
                  <span className="text-sm font-medium text-white/80">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

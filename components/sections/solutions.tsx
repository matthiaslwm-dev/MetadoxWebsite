import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { solutions, type Solution } from "@/lib/content";

function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <div className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-blue/30 hover:shadow-lift sm:p-8">
      <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-blue-soft text-blue transition-colors duration-300 group-hover:bg-brand-gradient group-hover:text-white">
        <solution.icon className="size-7" />
      </span>
      <h3 className="mt-6 font-heading text-xl font-bold text-navy">
        {solution.title}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted">
        {solution.description}
      </p>
    </div>
  );
}

export function Solutions() {
  return (
    <section id="solutions" className="section-pad relative scroll-mt-24 bg-white">
      <Container>
        <SectionHeading
          align="left"
          eyebrow="Services"
          title={
            <>
              The problems we&apos;re{" "}
              <span className="text-gradient">built to solve</span>
            </>
          }
          description="Practical AI and software services that remove repetitive work, connect your systems, and give you a clearer view of your business."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <StaggerItem key={solution.title} className="h-full">
              <SolutionCard solution={solution} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-6">
          <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl bg-brand-gradient p-8 text-white sm:flex-row sm:items-center sm:p-10">
            <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-40" />
            <div className="relative">
              <h3 className="font-heading text-xl font-bold sm:text-2xl">
                Not sure where to start?
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
                We will take a look at your business and tell you exactly
                where automation can help, all for free.
              </p>
            </div>
            <Button href="#contact" variant="light" size="lg" className="relative shrink-0">
              Book Free Consultation
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

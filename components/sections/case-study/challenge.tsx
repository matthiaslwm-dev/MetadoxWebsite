import { Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem, Reveal } from "@/components/ui/motion";
import { ChallengeFlow } from "@/components/sections/case-study/challenge-flow";
import type { PortfolioProject } from "@/lib/content";

export function Challenge({ project }: { project: PortfolioProject }) {
  return (
    <section className="section-pad relative scroll-mt-24 bg-white">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <SectionHeading
              align="left"
              eyebrow="The Challenge"
              title={
                <>
                  {project.challenge.title}{" "}
                  <span className="text-gradient">{project.challenge.highlight}</span>
                </>
              }
              description={project.challenge.description}
              className="gap-4"
            />

            <Reveal className="flex items-start gap-3 rounded-2xl border border-line bg-canvas p-5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-soft text-blue">
                <Clock className="size-4" />
              </span>
              <p className="text-sm leading-relaxed text-ink/70">
                {project.challenge.calloutTitle}{" "}
                <span className="font-semibold text-blue">
                  {project.challenge.calloutHighlight}
                </span>
              </p>
            </Reveal>
          </div>

          <Reveal>
            <ChallengeFlow
              steps={project.challenge.flow}
              warning={project.challenge.flowWarning}
            />
          </Reveal>
        </div>

        <Stagger className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {project.challenge.painPoints.map((point) => (
            <StaggerItem key={point.label}>
              <div className="flex items-center gap-2.5 rounded-xl border border-line bg-canvas px-3.5 py-3 transition-colors hover:border-blue/30">
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-blue-soft text-blue">
                  <point.icon className="size-3.5" />
                </span>
                <p className="text-sm font-semibold leading-snug text-ink">
                  {point.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

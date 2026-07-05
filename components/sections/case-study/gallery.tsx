import { Play } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/motion";
import type { PortfolioProject } from "@/lib/content";

export function Gallery({ project }: { project: PortfolioProject }) {
  const { demo, techStack } = project;

  return (
    <section className="section-pad relative scroll-mt-24 bg-canvas">
      <Container>
        <SectionHeading
          eyebrow="Demo"
          title={
            <>
              See It In <span className="text-gradient">Action</span>
            </>
          }
          description={demo.description}
        />

        <Reveal delay={0.1}>
          <div className="mt-14 overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
            <div className="flex items-center gap-1.5 border-b border-line bg-canvas px-4 py-3">
              <span className="size-2.5 rounded-full bg-line" />
              <span className="size-2.5 rounded-full bg-line" />
              <span className="size-2.5 rounded-full bg-line" />
            </div>

            {demo.embedUrl ? (
              <div className="aspect-video w-full">
                <iframe
                  src={demo.embedUrl}
                  title={`${project.name} interactive demo`}
                  className="size-full"
                  allow="clipboard-write"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 px-6 py-24 text-center">
                <span className="inline-flex size-14 items-center justify-center rounded-full bg-blue-soft text-blue">
                  <Play className="size-6 fill-current" />
                </span>
                <p className="font-heading text-lg font-bold text-navy">
                  Interactive demo coming soon
                </p>
                <p className="max-w-md text-sm leading-relaxed text-muted">
                  A walkthrough of the {project.name} workflow will be embedded
                  here.
                </p>
              </div>
            )}
          </div>
        </Reveal>

        {techStack.length ? (
          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-ink/70"
                >
                  <tech.icon className={`size-4 ${tech.colorClassName}`} />
                  {tech.name}
                </span>
              ))}
            </div>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}

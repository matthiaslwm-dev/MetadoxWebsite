import { Play } from "lucide-react";
import { Reveal } from "@/components/ui/motion";
import type { PortfolioProject } from "@/lib/content";

export function CaseStudyGallery({ project }: { project: PortfolioProject }) {
  const { demo, techStack } = project;

  return (
    <section className="relative scroll-mt-24 bg-lp-muted/30 px-6 py-20">
      <div className="mx-auto w-full max-w-4xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-lp-primary">
            Demo
          </span>
          <h2 className="mb-4 text-balance text-2xl font-extrabold text-lp-foreground sm:text-3xl md:text-4xl">
            This is how we do it
          </h2>
          <p className="text-lg text-lp-muted-foreground">
            A closer look at the automation behind every step of the workflow.
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-12 overflow-hidden rounded-[1.25rem] border border-lp-border bg-lp-card shadow-sm"
        >
          <div className="flex items-center gap-1.5 border-b border-lp-border bg-lp-muted px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-lp-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-lp-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-lp-border" />
          </div>

          {demo.embedUrl ? (
            <div className="aspect-video w-full">
              <iframe
                src={demo.embedUrl}
                title={`${project.name} video demo`}
                className="h-full w-full"
                allow="clipboard-write"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center sm:py-24">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-lp-muted text-lp-primary">
                <Play className="h-6 w-6 fill-current" />
              </span>
              <p className="text-lg font-bold text-lp-foreground">
                Video demo coming soon
              </p>
              <p className="max-w-md text-sm leading-relaxed text-lp-muted-foreground">
                A narrated walkthrough of the {project.name} workflow will be
                embedded here.
              </p>
            </div>
          )}
        </Reveal>

        {techStack.length ? (
          <Reveal
            delay={0.16}
            className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
          >
            {techStack.map((tech) => (
              <span
                key={tech.name}
                className="inline-flex items-center gap-2 rounded-full border border-lp-border bg-lp-card px-3.5 py-1.5 text-xs font-medium text-lp-foreground shadow-sm"
              >
                <tech.icon className={`h-4 w-4 ${tech.colorClassName}`} />
                {tech.name}
              </span>
            ))}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

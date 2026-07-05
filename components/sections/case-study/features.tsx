import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import type { PortfolioProject } from "@/lib/content";

export function KeyFeatures({ project }: { project: PortfolioProject }) {
  return (
    <section className="section-pad relative scroll-mt-24 bg-white">
      <Container>
        <SectionHeading
          eyebrow="Key Features"
          title={
            <>
              This is how <span className="text-gradient">we do it</span>
            </>
          }
          description="A closer look at the automation behind every step of the workflow."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {project.features.map((f) => (
            <StaggerItem key={f.title} className="h-full">
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-canvas p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-blue/30 hover:shadow-soft">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-blue-soft text-blue">
                  <f.icon className="size-5" />
                </span>
                <h3 className="font-heading text-base font-bold text-navy">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {f.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

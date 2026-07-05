import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PortfolioProject } from "@/lib/content";

export function Solution({ project }: { project: PortfolioProject }) {
  return (
    <section className="relative scroll-mt-24 overflow-hidden bg-navy py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-blue/20 blur-[130px]" />

      <Container className="relative">
        <SectionHeading
          align="left"
          tone="dark"
          eyebrow="Our Solution"
          title={
            <>
              How Metadox{" "}
              <span className="text-gradient-light">solved it</span>
            </>
          }
          description={project.solution.description}
        />
      </Container>
    </section>
  );
}

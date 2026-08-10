import { Reveal } from "@/components/ui/motion";
import { projectsHero } from "@/lib/projects-content";

/**
 * Simple centred intro above the showcase grid. No stat row or particle
 * field here, the results section below carries the proof.
 */
export function ProjectsHero() {
  return (
    <section className="relative bg-lp-background px-5 pb-6 pt-28 sm:px-6 sm:pb-8 sm:pt-32 md:pt-36 text-center">
      <Reveal className="mx-auto w-full max-w-3xl">
        <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-lp-primary">
          {projectsHero.eyebrow}
        </span>
        <h1 className="mb-4 text-balance text-3xl font-extrabold text-lp-foreground sm:text-4xl md:text-5xl">
          {projectsHero.heading}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-lp-muted-foreground">
          {projectsHero.subhead}
        </p>
      </Reveal>
    </section>
  );
}

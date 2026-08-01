import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/motion";

export function About() {
  return (
    <section id="about" className="section-pad relative scroll-mt-24 bg-white">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Our Story</Eyebrow>
          <h2 className="mt-5 font-heading text-[1.9rem] font-bold leading-[1.1] tracking-tight text-navy sm:text-4xl md:text-[2.5rem]">
            Built on a <span className="text-gradient">simple belief</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mx-auto mt-12 max-w-[62ch]">
          <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              Founded in 2026, Metadox was built on a simple belief. Digital
              transformation should be accessible, practical, and within reach
              for every business.
            </p>
            <p>
              We saw businesses struggling with outdated systems, repetitive
              manual work, disconnected processes, and the growing pressure to
              keep up with rapidly evolving technology. Many knew they needed
              to modernise but weren&apos;t sure where to begin.
            </p>
          </div>

          <p className="my-9 border-l-2 border-blue pl-6 font-heading text-xl font-semibold leading-snug text-navy sm:text-2xl">
            That&apos;s why we created Metadox.
          </p>

          <p className="text-base leading-relaxed text-muted sm:text-lg">
            Today, we help businesses transform through practical technology
            solutions, including modern websites, custom software, AI
            automation, system integration, and process optimisation. Our
            mission is simple. We help organisations work smarter, operate
            more efficiently, and build a strong foundation for long term
            growth.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

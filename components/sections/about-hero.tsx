import { Building2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/motion";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-brand-gradient pb-20 pt-[calc(var(--header-h)+2.5rem)] text-white sm:pb-28">
      <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-blue/25 blur-[130px]" />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <Badge tone="dark" className="mx-auto w-fit">
              <Building2 className="size-3.5 text-blue-bright" />
              About Metadox
            </Badge>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="mt-6 font-heading text-[2.6rem] font-bold leading-[1.06] tracking-tight text-white sm:text-5xl">
              Digital transformation,{" "}
              <span className="text-gradient-light">made practical</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              We help businesses modernise with technology that is
              accessible, scalable and built for real-world impact.
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

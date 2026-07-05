import { ArrowRight, Layers } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";

export function PortfolioHero() {
  return (
    <section className="relative overflow-hidden bg-brand-gradient pb-20 pt-[calc(var(--header-h)+2.5rem)] text-white sm:pb-28">
      <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-blue/25 blur-[130px]" />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <Badge tone="dark" className="mx-auto w-fit">
              <Layers className="size-3.5 text-blue-bright" />
              Projects
            </Badge>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="mt-6 font-heading text-[2.6rem] font-bold leading-[1.06] tracking-tight text-white sm:text-5xl">
              Real problems,{" "}
              <span className="text-gradient-light">solved for real clients</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              A look at the real business problems we&apos;ve solved for
              clients — from workflow automation to web platforms, data
              migration and systems integration.
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="mt-8 flex justify-center">
              <Button href="#contact" size="lg">
                Book Free Consultation
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

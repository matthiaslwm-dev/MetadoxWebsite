import { Tag } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/motion";

export function PricingHero() {
  return (
    <section className="relative overflow-hidden bg-brand-gradient pb-20 pt-[calc(var(--header-h)+2.5rem)] text-white sm:pb-28">
      <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-blue/25 blur-[130px]" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <Badge tone="dark" className="mx-auto w-fit">
              <Tag className="size-3.5 text-blue-bright" />
              Pricing
            </Badge>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="mt-6 font-heading text-[2.6rem] font-bold leading-[1.06] tracking-tight text-white sm:text-5xl">
              One Proposal.{" "}
              <span className="text-gradient-light">Guaranteed Results.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              Every business is different, so every solution is different. We
              scope every project with a clear proposal. If we don&apos;t
              deliver exactly what&apos;s in it, you get 100% of your money
              back.
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

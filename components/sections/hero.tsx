import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/motion";
import { heroFeatures } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-[calc(var(--header-h)+2.5rem)] sm:pb-28">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/hero2.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-navy/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/55 via-40% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-transparent via-55% to-navy/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 via-30% to-transparent" />
      </div>

      <Container>
        {/* Copy */}
        <div className="flex max-w-2xl flex-col">
          <FadeIn>
            <Badge tone="dark" className="w-fit">
              <Sparkles className="size-3.5 text-blue-bright" />
              Digital Transformation Consultancy
            </Badge>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="mt-6 font-heading text-[2.6rem] font-bold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4.05rem]">
              Empowering Businesses &amp; People with{" "}
              <span className="text-gradient-light">AI</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              We help businesses transform through strategy, software,
              automation and AI. By combining business consulting with
              technology implementation, we solve operational bottlenecks,
              improve productivity and build the digital foundation needed
              to unlock AI&apos;s full potential.
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#contact" size="lg">
                Book Free Consultation
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </Button>
              <Button href="#solutions" size="lg" variant="glass">
                Explore Solutions
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>

      <FadeIn delay={0.34}>
        <div className="relative mt-14 w-full">
          <Container>
            <ul className="grid grid-cols-2 divide-y divide-white/15 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
              {heroFeatures.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 px-4 py-5 first:pl-0 sm:first:pl-0"
                >
                  <Icon className="size-7 shrink-0 text-white" strokeWidth={1.5} />
                  <span className="max-w-[8.5rem] text-xs font-semibold uppercase leading-snug tracking-wide text-white/90">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </FadeIn>
    </section>
  );
}

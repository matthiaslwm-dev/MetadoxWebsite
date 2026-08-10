import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/layout/logo";
import { LpButton } from "./lp-button";
import { Reveal } from "@/components/ui/motion";
import { landingAbout } from "@/lib/landing-content";

export function LandingAbout() {
  return (
    <section id="about" className="relative bg-lp-background px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal className="mb-12 text-center">
          <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-lp-primary">
            {landingAbout.eyebrow}
          </span>
          <h2 className="text-2xl font-bold text-lp-foreground sm:text-3xl md:text-4xl">
            {landingAbout.heading}
          </h2>
        </Reveal>

        <div className="flex flex-col items-center gap-10 md:flex-row md:gap-16">
          <Reveal className="shrink-0">
            {/* Stands in for the founder portrait until real team photography
                is available; swap for an <Image> when it lands. */}
            <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-full border-4 border-lp-primary/20 bg-lp-muted shadow-xl md:h-56 md:w-56">
              <LogoMark className="h-24 w-24" />
            </div>
          </Reveal>

          {/* Text trails the portrait so the pair reads left to right. */}
          <Reveal delay={0.1} className="flex-1 text-center md:text-left">
            <h3 className="mb-4 text-2xl font-bold text-lp-foreground md:text-3xl">
              {landingAbout.name}
            </h3>
            <div className="space-y-4 leading-relaxed text-lp-muted-foreground">
              {landingAbout.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8">
              <LpButton href="/about" variant="hero">
                Learn More About Metadox
                <ArrowRight className="h-5 w-5" />
              </LpButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

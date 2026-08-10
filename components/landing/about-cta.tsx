import { ArrowRight } from "lucide-react";
import { LpButton } from "./lp-button";
import { aboutCta } from "@/lib/landing-content";
import { primaryCta } from "@/lib/site";

/** Closing band. White ground so the tinted team grid above it stays banded. */
export function LandingAboutCta() {
  return (
    <section className="relative bg-lp-background px-5 pb-16 pt-4 sm:px-6 sm:pb-20 lg:pb-24">
      <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-[1.5rem] border border-lp-border bg-lp-card px-8 py-14 text-center shadow-lp-soft sm:px-12">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lp-primary/40 to-transparent" />

        <h2 className="mb-4 text-2xl font-bold text-lp-foreground sm:text-3xl">
          {aboutCta.heading}
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-lp-muted-foreground">
          {aboutCta.subhead}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <LpButton href={primaryCta.href} variant="hero">
            {primaryCta.label}
            <ArrowRight className="h-5 w-5" />
          </LpButton>
          <LpButton href="/">Back to Home</LpButton>
        </div>
      </div>
    </section>
  );
}

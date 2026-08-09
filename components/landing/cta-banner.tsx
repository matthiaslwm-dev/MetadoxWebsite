import { CalendarCheck } from "lucide-react";
import { LpButton } from "./lp-button";
import { Reveal } from "@/components/ui/motion";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { landingCta } from "@/lib/landing-content";
import { primaryCta, siteConfig } from "@/lib/site";

const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
  landingCta.whatsappMessage,
)}`;

/**
 * Closing band under the testimonials. Warm tint fading to the footer's white
 * so the page ends on a lift rather than another flat panel, and both actions
 * carry the brand fill: this is the one place we want no visual hierarchy
 * between "talk now" and "book later".
 */
export function LandingCtaBanner() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 bg-gradient-to-b from-lp-muted/70 to-lp-background px-6 py-24"
    >
      <Reveal className="mx-auto w-full max-w-3xl text-center">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-lp-primary">
          {landingCta.eyebrow}
        </p>
        <h2 className="text-balance text-3xl font-extrabold leading-tight text-lp-foreground sm:text-4xl md:text-5xl">
          {landingCta.heading}
        </h2>
        {/* `text-balance` evens the rag: centred copy with a two-word last line
            reads like an accident. Wider measure keeps each to two lines. */}
        <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-lp-muted-foreground sm:text-lg">
          {landingCta.subhead}
        </p>

        {/* The invitation carries more weight than the rationale above it: it is
            what the buttons answer, so it sits closest to them. */}
        <p className="mx-auto mt-4 max-w-2xl text-balance text-base font-medium leading-relaxed text-lp-foreground sm:text-lg">
          {landingCta.invitation}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <LpButton href={whatsappHref} variant="hero">
            <WhatsAppIcon className="h-5 w-5" />
            {landingCta.whatsappLabel}
          </LpButton>
          <LpButton href={primaryCta.href} variant="hero">
            <CalendarCheck className="h-4 w-4" />
            {landingCta.bookLabel}
          </LpButton>
        </div>
      </Reveal>
    </section>
  );
}

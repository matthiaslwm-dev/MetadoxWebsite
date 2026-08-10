import { CalendarCheck } from "lucide-react";
import { LpButton } from "./lp-button";
import { Reveal } from "@/components/ui/motion";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { cn } from "@/lib/utils";
import { landingCta } from "@/lib/landing-content";
import { primaryCta, siteConfig } from "@/lib/site";

type CtaContent = {
  eyebrow: string;
  heading: string;
  subhead: string;
  invitation?: string;
  whatsappLabel: string;
  whatsappMessage: string;
  bookLabel: string;
};

/**
 * Closing band under the testimonials. Warm tint fading to the footer's white
 * so the page ends on a lift rather than another flat panel, and both actions
 * carry the brand fill: this is the one place we want no visual hierarchy
 * between "talk now" and "book later".
 *
 * `content` defaults to the home page's scarcity pitch; the Projects and
 * case-study pages pass `projectsCta` instead, which speaks to a visitor who
 * has just seen a finished result rather than the value prop. That copy runs
 * longer, so those pages also set `wide` to give the subhead room to wrap at
 * three lines instead of four.
 */
export function LandingCtaBanner({
  content = landingCta,
  wide = false,
}: {
  content?: CtaContent;
  wide?: boolean;
}) {
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    content.whatsappMessage,
  )}`;

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 bg-gradient-to-b from-lp-muted/70 to-lp-background px-6 py-24"
    >
      <Reveal
        className={cn("mx-auto w-full text-center", wide ? "max-w-4xl" : "max-w-3xl")}
      >
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-lp-primary">
          {content.eyebrow}
        </p>
        <h2 className="text-balance text-3xl font-extrabold leading-tight text-lp-foreground sm:text-4xl md:text-5xl">
          {content.heading}
        </h2>
        {/* `text-balance` evens the rag: centred copy with a two-word last line
            reads like an accident. Wider measure keeps each to two lines. */}
        <p
          className={cn(
            "mx-auto mt-6 text-balance text-base leading-relaxed text-lp-muted-foreground sm:text-lg",
            wide ? "max-w-3xl" : "max-w-2xl",
          )}
        >
          {content.subhead}
        </p>

        {content.invitation ? (
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base font-medium leading-relaxed text-lp-foreground sm:text-lg">
            {content.invitation}
          </p>
        ) : null}

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <LpButton href={whatsappHref} variant="hero">
            <WhatsAppIcon className="h-5 w-5" />
            {content.whatsappLabel}
          </LpButton>
          <LpButton href={primaryCta.href} variant="hero">
            <CalendarCheck className="h-4 w-4" />
            {content.bookLabel}
          </LpButton>
        </div>
      </Reveal>
    </section>
  );
}

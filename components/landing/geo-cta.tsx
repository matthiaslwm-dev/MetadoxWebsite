import { CalendarCheck } from "lucide-react";
import { LpButton } from "./lp-button";
import { Reveal } from "@/components/ui/motion";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { geoCta, geoHero } from "@/lib/geo-content";
import { primaryCta, siteConfig } from "@/lib/site";

const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
  geoCta.whatsappMessage,
)}`;

/** Serial comma, built from the hero's engine list so the two never diverge. */
const engineList = geoHero.engines
  .map((engine, index, all) =>
    index === all.length - 1 ? `and ${engine.name}` : engine.name,
  )
  .join(", ");

/**
 * Closing band, styled as the landing page's CTA banner: warm tint fading to
 * the footer's white, and both actions carrying the brand fill so there is no
 * hierarchy between "talk now" and "book later".
 */
export function GeoCta() {
  return (
    <section
      id="geo-contact"
      className="relative scroll-mt-24 bg-gradient-to-b from-lp-muted/70 to-lp-background px-6 py-24"
    >
      <Reveal className="mx-auto w-full max-w-3xl text-center">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-lp-primary">
          {geoCta.eyebrow}
        </p>
        <h2 className="text-balance text-3xl font-extrabold leading-tight text-lp-foreground sm:text-4xl md:text-5xl">
          {geoCta.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-lp-muted-foreground sm:text-lg">
          {geoCta.subheadLead} {engineList} {geoCta.subheadTail}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <LpButton href={whatsappHref} variant="hero">
            <WhatsAppIcon className="h-5 w-5" />
            {geoCta.whatsappLabel}
          </LpButton>
          <LpButton href={primaryCta.href} variant="hero">
            <CalendarCheck className="h-4 w-4" />
            {geoCta.bookLabel}
          </LpButton>
        </div>
      </Reveal>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import Script from "next/script";
import { CalendarCheck, CheckCircle2 } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { bookingPage } from "@/lib/landing-content";
import { calendlyUrl } from "@/lib/site";

const CALENDLY_WIDGET = "https://assets.calendly.com/assets/external/widget.js";

/*
  `hide_event_type_details` drops Calendly's left pane. Its copy duplicates the
  page (duration, format, agenda), and because the embed height is fixed and the
  iframe cross-origin, a long description there clips behind Calendly's pinned
  "Privacy Policy" footer. Colours are hex without the leading `#`.
*/
const embedUrl = `${calendlyUrl}?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=015ee8&text_color=03153b`;

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

/**
 * Booking page in the landing design language.
 *
 * The widget wiring is the same proven setup as the legacy booking section;
 * only the surrounding chrome is new. Keep the empty host div and its definite
 * height, both are load-bearing (see the comments below).
 */
export function LandingBooking() {
  const host = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [failed, setFailed] = useState(false);

  // `onReady` fires on first load *and* on every remount, so the widget is
  // rebuilt after a client-side navigation back to this page.
  const mountWidget = () => {
    const parentElement = host.current;
    if (!parentElement || !window.Calendly) return;
    if (parentElement.childElementCount > 0) return;
    window.Calendly.initInlineWidget({ url: embedUrl, parentElement });
    setMounted(true);
  };

  return (
    <>
      <section className="bg-lp-background px-6 pb-16 pt-32 md:pb-20 md:pt-40">
        <div
          style={{ animationDelay: "0.1s" }}
          className="mx-auto w-full max-w-4xl animate-lp-fade-in text-center opacity-0"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-lp-primary">
            {bookingPage.eyebrow}
          </p>
          <h1 className="mb-6 text-balance text-3xl font-bold leading-tight text-lp-foreground sm:text-4xl md:text-5xl">
            {bookingPage.heading}
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-lp-muted-foreground sm:text-lg">
            {bookingPage.subhead}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {bookingPage.trustPoints.map((point) => (
              <span
                key={point.label}
                className="inline-flex items-center gap-2 rounded-full border border-lp-border bg-lp-card px-4 py-2 text-sm font-medium text-lp-foreground shadow-sm"
              >
                <point.icon className="h-4 w-4 text-lp-primary" />
                {point.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-lp-muted/60 px-6 py-20">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal className="mb-12 text-center">
            <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-lp-primary">
              {bookingPage.agendaEyebrow}
            </span>
            <h2 className="text-2xl font-bold text-lp-foreground sm:text-3xl">
              {bookingPage.agendaHeading}
            </h2>
          </Reveal>

          <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {bookingPage.agenda.map((item, index) => (
              <StaggerItem key={item.title} className="h-full">
                <div className="flex h-full flex-col rounded-[1.25rem] border border-lp-border bg-lp-card p-8 shadow-sm">
                  {/* Icon tile and step number share a row, so the three cards
                      start their copy at the same height. */}
                  <div className="mb-6 flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-lp-border bg-lp-muted text-lp-primary">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-sm tabular-nums text-lp-primary/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Two lines' worth of height reserved: one of these titles
                      wraps and the others do not, and without a floor the
                      bodies below start at three different heights. */}
                  <h3 className="mb-3 text-balance text-lg font-bold leading-snug text-lp-foreground md:min-h-[3.5rem]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-lp-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/*
        Full width on purpose: Calendly splits the calendar and the time list
        into two panes above ~700px, and squeezes them (leaving the date picker
        blank) until the frame is roughly 900px or wider.
      */}
      <section id="scheduler" className="scroll-mt-24 bg-lp-background px-6 py-20">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-lp-foreground sm:text-3xl">
              {bookingPage.schedulerHeading}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[1.5rem] border border-lp-border bg-lp-card p-2 shadow-lp-soft sm:p-3">
              {failed ? (
                <div className="flex min-h-[24rem] flex-col items-center justify-center px-6 py-12 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lp-primary/10 text-lp-primary">
                    <CalendarCheck className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-lp-foreground">
                    {bookingPage.fallbackHeading}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-lp-muted-foreground">
                    {bookingPage.fallbackBody}
                  </p>
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-lp-primary px-5 py-3 text-sm font-medium text-lp-primary-foreground transition-all hover:scale-[1.02] hover:shadow-lp-hover motion-reduce:transform-none"
                  >
                    <CalendarCheck className="h-4 w-4" />
                    {bookingPage.fallbackCta}
                  </a>
                </div>
              ) : (
                <div className="relative h-[64rem] w-full sm:h-[46rem]">
                  {!mounted && (
                    <div className="absolute inset-0 flex items-center justify-center text-sm text-lp-muted-foreground">
                      {bookingPage.loading}
                    </div>
                  )}
                  {/*
                    Kept empty: Calendly injects its iframe here and sizes it to
                    `height: 100%`, so this element needs a definite height (not
                    a min-height) or the iframe collapses to ~150px.
                  */}
                  <div
                    ref={host}
                    data-testid="calendly-embed"
                    className="relative h-full w-full [&_iframe]:rounded-2xl"
                  />
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-2xl rounded-2xl border border-lp-border bg-lp-muted/50 px-5 py-4 text-center text-sm leading-relaxed text-lp-muted-foreground">
              {bookingPage.schedulerNote}
            </p>
          </Reveal>
        </div>
      </section>

      <Script
        src={CALENDLY_WIDGET}
        strategy="afterInteractive"
        onReady={mountWidget}
        onError={() => setFailed(true)}
      />
    </>
  );
}

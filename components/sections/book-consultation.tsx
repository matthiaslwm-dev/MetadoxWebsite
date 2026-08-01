"use client";

import { useRef, useState } from "react";
import Script from "next/script";
import { CalendarCheck, CheckCircle2, Clock, ShieldCheck, Video } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/motion";
import { calendlyUrl } from "@/lib/site";

const trustPoints = [
  { icon: Clock, label: "30 minutes" },
  { icon: Video, label: "Online, link sent on booking" },
  { icon: ShieldCheck, label: "No obligation" },
  { icon: CalendarCheck, label: "Singapore-based team" },
];

const agenda = [
  {
    title: "Understand Your Business",
    detail:
      "We take a deep dive into your current workflows, systems, and operations to uncover inefficiencies, bottlenecks, and repetitive tasks that are slowing your business down.",
  },
  {
    title: "Identify Your Highest-Impact AI Opportunities",
    detail:
      "Together, we'll evaluate where AI and automation can deliver the fastest return, which processes are ready for implementation, and where optimisation should come first.",
  },
  {
    title: "Walk Away With a Clear Roadmap",
    detail:
      "You'll leave with a prioritised action plan outlining recommended AI initiatives, expected quick wins, and practical next steps, whether or not you choose to work with Metadox.",
  },
];

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
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

export function BookConsultation() {
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
    <section className="relative overflow-hidden bg-brand-gradient-soft pb-24 pt-[calc(var(--header-h)+3rem)] sm:pb-32">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-blue/10 blur-[130px]" />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>Free Discovery Call</Eyebrow>
              <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-navy sm:text-5xl">
                Book Your Free AI Strategy Session
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
                In 30 minutes, we&apos;ll understand your business, uncover your
                highest-impact AI opportunities, and provide a clear roadmap for what to
                do next. No sales pitch. No obligation. Just practical recommendations
                tailored to your business.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 flex flex-wrap gap-3">
                {trustPoints.map((point) => (
                  <span
                    key={point.label}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy shadow-soft"
                  >
                    <point.icon className="size-4 text-blue" />
                    {point.label}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="flex flex-col gap-5 lg:pt-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-navy/50">
                  AI Strategy Session
                </p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">
                  Discover where AI can create the biggest impact in your business.
                </p>
              </div>
              {agenda.map((item) => (
                <div key={item.title} className="flex items-start gap-3.5">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-blue" />
                  <div>
                    <p className="font-heading text-[0.95rem] font-bold text-navy">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-ink/75">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
              <p className="mt-1 rounded-2xl border border-line bg-white/70 px-4 py-3 text-sm leading-relaxed text-muted">
                We reserve dedicated time for every consultation. If you can&apos;t
                make it, let us know in advance so we can arrange another slot.
              </p>
            </div>
          </Reveal>
        </div>

        {/*
          Full width on purpose: Calendly splits the calendar and the time list
          into two panes above ~700px, and squeezes them (leaving the date
          picker blank) until the frame is roughly 900px or wider.
        */}
        <Reveal delay={0.16}>
          <Card className="mt-12 overflow-hidden p-2 shadow-lift sm:p-3">
            {failed ? (
              <div className="flex min-h-[24rem] flex-col items-center justify-center px-6 py-12 text-center">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-blue-soft text-blue">
                  <CalendarCheck className="size-7" />
                </span>
                <h2 className="mt-6 font-heading text-xl font-bold text-navy">
                  Open the booking calendar
                </h2>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
                  The scheduler couldn&apos;t load here. You can still pick a time on
                  Calendly directly.
                </p>
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-navy-soft"
                >
                  <CalendarCheck className="size-4" />
                  Choose a time
                </a>
              </div>
            ) : (
              <div className="relative h-[64rem] w-full sm:h-[46rem]">
                {!mounted && (
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-muted">
                    Loading available times…
                  </div>
                )}
                {/*
                  Kept empty: Calendly injects its iframe here and sizes it to
                  `height: 100%`, so this element needs a definite height (not a
                  min-height) or the iframe collapses to ~150px.
                */}
                <div
                  ref={host}
                  data-testid="calendly-embed"
                  className="relative h-full w-full [&_iframe]:rounded-2xl"
                />
              </div>
            )}
          </Card>
        </Reveal>
      </Container>

      <Script
        src={CALENDLY_WIDGET}
        strategy="afterInteractive"
        onReady={mountWidget}
        onError={() => setFailed(true)}
      />
    </section>
  );
}

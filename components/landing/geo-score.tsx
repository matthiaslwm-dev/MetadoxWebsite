"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LpButton } from "./lp-button";
import { Reveal } from "@/components/ui/motion";
import { geoScore } from "@/lib/geo-content";
import { primaryCta } from "@/lib/site";

const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/** Gauge geometry. Radii shrink inward so the arcs nest. */
const ARCS = [
  { radius: 80, width: 16 },
  { radius: 70, width: 14 },
  { radius: 60, width: 14 },
];

/** Half-circle length. The arcs are semicircles, so this is the full dash. */
const arcLength = (radius: number) => Math.PI * radius;

/** Sweep from the left of the dial to the right at a fixed baseline. */
const arcPath = (radius: number) =>
  `M ${100 - radius} 110 A ${radius} ${radius} 0 0 1 ${100 + radius} 110`;

/**
 * Nested-arc dial. The outermost ring is the highest-scoring metric, so the
 * bands read as a stack rather than three unrelated rings, and each arc is
 * filled to its own metric's percentage.
 */
function ScoreGauge() {
  const reduced = useReducedMotion();
  // Widest arc first: metrics are listed weakest first, the dial reads the
  // other way round.
  const bands = [...geoScore.metrics].reverse();

  return (
    <svg
      viewBox="0 0 200 130"
      role="img"
      aria-label={`AI visibility score ${geoScore.gauge.score} out of ${geoScore.gauge.max}, rated ${geoScore.gauge.badge}`}
      className="h-auto w-[200px] max-w-full"
    >
      {ARCS.map((arc) => (
        <path
          key={`track-${arc.radius}`}
          d={arcPath(arc.radius)}
          fill="none"
          stroke="#F3F4F6"
          strokeWidth={arc.width}
          strokeLinecap="round"
        />
      ))}

      {ARCS.map((arc, index) => {
        const band = bands[index];
        const length = arcLength(arc.radius);
        const filled = length * (1 - band.pct / 100);

        return (
          <motion.path
            key={band.label}
            d={arcPath(arc.radius)}
            fill="none"
            stroke={band.arc}
            strokeWidth={arc.width}
            strokeLinecap="round"
            strokeDasharray={length}
            initial={reduced ? false : { strokeDashoffset: length }}
            whileInView={{ strokeDashoffset: filled }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, delay: index * 0.15, ease: "easeOut" }}
            // Reduced motion still needs the end state painted.
            style={reduced ? { strokeDashoffset: filled } : undefined}
          />
        );
      })}

      <text
        x="100"
        y="103"
        textAnchor="middle"
        fill="currentColor"
        fontSize="30"
        fontWeight="900"
        className="text-lp-foreground"
      >
        {geoScore.gauge.score}
      </text>
      <text
        x="100"
        y="118"
        textAnchor="middle"
        fill="currentColor"
        fontSize="10"
        fontWeight="700"
        className="text-lp-primary"
      >
        / {geoScore.gauge.max}
      </text>
    </svg>
  );
}

/**
 * "AI Visibility Score": the diagnostic that sets up the offer.
 *
 * Tinted band with the dial and the three signals side by side. The bars fill
 * on entry so the numbers are read as a result rather than as decoration.
 */
export function GeoScore() {
  const reduced = useReducedMotion();

  return (
    <section
      id="ai-visibility-score"
      // Tinted band, the same one the definition section uses, so the page
      // keeps its white / tinted rhythm instead of introducing a third ground.
      className="relative scroll-mt-24 bg-lp-muted/60 px-5 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="mb-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.1em] text-lp-primary">
              {geoScore.eyebrow}
            </p>
            <h2 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-lp-foreground sm:text-4xl md:text-[2.75rem]">
              {geoScore.headingLead}{" "}
              <span className="text-lp-primary">{geoScore.headingAccent}</span>.
              <span className="block">{geoScore.headingRest}</span>
            </h2>
          </div>

          <div>
            <p className="mb-6 text-base leading-relaxed text-lp-muted-foreground">
              {geoScore.subhead}
            </p>
            <LpButton href={primaryCta.href} variant="hero">
              {geoScore.ctaLabel}
              <ArrowRight className="h-5 w-5" />
            </LpButton>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="overflow-hidden rounded-[1.5rem] border border-lp-border bg-lp-card shadow-lp-soft">
            <div className="grid lg:grid-cols-[1fr_1.5fr]">
              {/* Dial. The divider is a bottom edge when stacked, a right edge
                  once the two panes sit side by side. */}
              <div className="flex flex-col items-center justify-center border-b border-lp-border bg-lp-muted/40 px-6 py-10 sm:px-8 sm:py-12 lg:border-b-0 lg:border-r">
                <ScoreGauge />

                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-red-300 bg-red-50 px-3.5 py-1">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-red-500"
                  />
                  <span className="text-[0.72rem] font-bold text-red-700">
                    {geoScore.gauge.badge}
                  </span>
                </span>

                <p className="mt-3.5 text-center text-[0.65rem] text-lp-muted-foreground/60">
                  {geoScore.gauge.caption}
                </p>
              </div>

              <div className="px-6 py-10 sm:px-10 sm:py-12">
                <h3 className="mb-3 text-2xl font-extrabold leading-tight tracking-tight text-lp-foreground">
                  {geoScore.panelHeading}
                  <span className="block text-lp-primary">
                    {geoScore.panelHeadingAccent}
                  </span>
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-lp-muted-foreground">
                  {geoScore.panelSubhead}
                </p>

                <div className="flex flex-col gap-6">
                  {geoScore.metrics.map((metric, index) => (
                    <div key={metric.label}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-bold text-lp-foreground">
                          {metric.label}
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-[0.72rem] font-bold"
                            style={{ color: metric.color }}
                          >
                            {metric.level}
                          </span>
                          <span className="text-sm font-extrabold text-lp-foreground">
                            {metric.pct}%
                          </span>
                        </div>
                      </div>

                      <div className="h-2 rounded-full bg-lp-muted">
                        <motion.div
                          className="h-2 rounded-full"
                          style={{ background: metric.color }}
                          initial={reduced ? false : { width: 0 }}
                          whileInView={{ width: `${metric.pct}%` }}
                          viewport={VIEWPORT}
                          transition={{
                            duration: 0.9,
                            delay: index * 0.15,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

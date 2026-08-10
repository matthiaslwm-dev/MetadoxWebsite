"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useRef } from "react";
import { AlertCircle, Sparkles } from "lucide-react";
import { geoHero, geoProblem } from "@/lib/geo-content";
import { cn } from "@/lib/utils";

const STEP_COUNT = geoProblem.steps.length;
const LAST_STEP = STEP_COUNT - 1;

/**
 * The chat mock. `active` drives how far the exchange has got: 0 is the
 * assistant still typing, 1 adds the answer naming competitors, 2 adds the
 * warning underneath it.
 */
function ChatMock({ active }: { active: number }) {
  const reduced = useReducedMotion();
  const { chat } = geoProblem;

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-lp-border bg-lp-muted/40 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
      {/* Browser chrome. Purely decorative, so it is hidden from the reader. */}
      <div
        aria-hidden="true"
        className="flex items-center gap-2.5 border-b border-lp-border bg-lp-muted/70 px-4 py-3"
      >
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        </div>
        {/* `min-w-0` so the flex item is allowed to shrink below the URL's
            intrinsic width instead of pushing the mock wider than its card. */}
        <div className="min-w-0 flex-1 truncate rounded-full border border-lp-border bg-lp-card px-3.5 py-1 text-[0.7rem] text-lp-muted-foreground/70">
          {chat.url}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* The buyer's question. Tail on the bottom right, as sent. */}
        <div className="mb-5 flex justify-end">
          <p className="max-w-[16rem] rounded-[1.125rem_1.125rem_0.25rem_1.125rem] bg-lp-primary px-4.5 py-3 text-sm font-medium leading-relaxed text-lp-primary-foreground">
            {chat.question}
          </p>
        </div>

        {active === 0 && (
          <motion.div
            key="typing"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex gap-2.5"
          >
            <AssistantAvatar />
            <div className="flex items-center gap-1.5 rounded-[0.25rem_1.125rem_1.125rem_1.125rem] border border-lp-border bg-lp-card px-4.5 py-3.5">
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  className="inline-block h-[7px] w-[7px] rounded-full bg-lp-muted-foreground/40"
                  animate={reduced ? {} : { opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    delay: dot * 0.22,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {active >= 1 && (
          <motion.div
            key="answer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={cn("flex gap-2.5", active >= 2 && "mb-4")}
          >
            <AssistantAvatar />
            <p className="max-w-[20rem] rounded-[0.25rem_1.125rem_1.125rem_1.125rem] border border-lp-border bg-lp-card px-4.5 py-3.5 text-[0.85rem] leading-[1.9] text-lp-foreground/80">
              {chat.answerLead}{" "}
              {chat.competitors.map((competitor, index) => (
                <span key={competitor}>
                  {/* Neutral chips. The point is that these are names other
                      than yours, not which one is which, so colour-coding
                      them would only add noise. */}
                  <span className="inline-flex items-center gap-1 rounded-md border border-lp-border bg-lp-muted px-1.5 py-px text-[0.8rem] font-bold text-lp-foreground">
                    <span
                      aria-hidden="true"
                      className="inline-block h-1.5 w-1.5 rounded-full bg-lp-muted-foreground/40"
                    />
                    {competitor}
                  </span>
                  {index < chat.competitors.length - 2
                    ? " "
                    : index === chat.competitors.length - 2
                      ? " or "
                      : ". "}
                </span>
              ))}
              {chat.answerTail}
            </p>
          </motion.div>
        )}

        {active >= 2 && (
          <motion.div
            key="warning"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-start gap-2.5 rounded-xl border border-red-300 bg-red-50 px-4 py-3.5"
          >
            <AlertCircle className="mt-px h-5 w-5 shrink-0 text-red-500" />
            <p className="text-[0.78rem] leading-relaxed text-red-800">
              {chat.warning}
            </p>
          </motion.div>
        )}

        {/* Which assistants this plays out on, echoing the hero's pill row. */}
        <div className="mt-5 flex flex-wrap gap-2 border-t border-lp-border pt-4">
          {geoHero.engines.map((engine) => (
            <span
              key={engine.name}
              className="inline-flex items-center gap-1.5 rounded-lg border border-lp-border bg-lp-muted/70 px-2.5 py-1 text-[0.7rem] font-medium text-lp-muted-foreground"
            >
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: engine.dot }}
              />
              {engine.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AssistantAvatar() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-lp-foreground text-lp-background"
    >
      <Sparkles className="h-3.5 w-3.5" />
    </div>
  );
}

/**
 * "The Problem": a scroll-scrubbed sequence rather than a static section.
 *
 * The outer element is three viewports tall and the panel inside it is sticky,
 * so scrolling through that spacer advances the three steps while the layout
 * stays put. Progress is read off the spacer, which is what ties the left-hand
 * list and the chat mock to the same position.
 *
 * Below `lg` the pin is dropped entirely: on a phone there is no room for two
 * columns, and dimming two thirds of the copy on a single-column page just
 * hides it. There, every step renders at full strength and the mock shows its
 * final state.
 */
export function GeoProblem() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);

  // The pin and the scrubbing are one behaviour, so they share one breakpoint
  // test rather than a CSS query and a JS query that can disagree.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const sync = () => setPinned(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!pinned) return;
    setActive(Math.min(LAST_STEP, Math.floor(value * STEP_COUNT)));
  });

  // Unpinned there is no scrub to drive, so the sequence shows fully resolved.
  const shown = pinned ? active : LAST_STEP;

  return (
    <section
      id="the-problem"
      ref={spacerRef}
      className="relative scroll-mt-24 bg-lp-background lg:h-[300vh]"
    >
      <div className="flex items-center overflow-hidden px-5 py-16 sm:px-6 sm:py-20 lg:sticky lg:top-0 lg:h-screen lg:py-0">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.1em] text-lp-primary">
              {geoProblem.eyebrow}
            </p>
            <h2 className="mb-3 text-3xl font-extrabold leading-[1.12] tracking-tight text-lp-foreground sm:text-4xl md:text-[2.75rem]">
              {geoProblem.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mb-10 max-w-md text-base leading-relaxed text-lp-muted-foreground">
              {geoProblem.subhead}
            </p>

            <ol className="flex flex-col">
              {geoProblem.steps.map((step, index) => {
                const isActive = !pinned || index === shown;
                return (
                  <li
                    key={step.num}
                    className={cn(
                      "flex gap-5 border-lp-border/60 py-6 transition-opacity duration-500 motion-reduce:transition-none",
                      index < LAST_STEP && "border-b",
                      isActive ? "opacity-100" : "opacity-35",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-extrabold transition-colors duration-500 motion-reduce:transition-none",
                        isActive
                          ? "bg-lp-primary text-lp-primary-foreground"
                          : "bg-lp-muted text-lp-muted-foreground/60",
                      )}
                    >
                      {step.num}
                    </span>

                    <div>
                      <span
                        className={cn(
                          "mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-[0.07em] transition-colors duration-500 motion-reduce:transition-none",
                          isActive
                            ? "text-lp-primary"
                            : "text-lp-muted-foreground/60",
                        )}
                      >
                        {step.label}
                      </span>
                      <h3 className="mb-1.5 text-base font-bold text-lp-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-lp-muted-foreground">
                        {step.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Progress rail. Only honest while the section is pinned. */}
            {pinned && (
              <div aria-hidden="true" className="mt-8 flex gap-2">
                {geoProblem.steps.map((step, index) => (
                  <span
                    key={step.num}
                    className={cn(
                      "h-1 rounded transition-all duration-500 motion-reduce:transition-none",
                      index === shown
                        ? "w-7 bg-lp-primary"
                        : "w-2 bg-lp-border",
                    )}
                  />
                ))}
              </div>
            )}
          </div>

          <ChatMock active={shown} />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ArrowRight, Clock, TrendingUp, Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import { frameworkSteps, type FrameworkAccent } from "@/lib/content";

const ACCENTS: Record<
  FrameworkAccent,
  {
    ring: string;
    icon: string;
    activeBorder: string;
    activeBg: string;
    tagline: string;
    check: string;
    outputBg: string;
    outputBorder: string;
    outputIcon: string;
    duration: string;
    connector: string;
    valueBg: string;
    valueIcon: string;
    valueTitle: string;
  }
> = {
  blue: {
    ring: "ring-blue-100 border-blue-200",
    icon: "text-blue",
    activeBorder: "border-blue/30",
    activeBg: "bg-blue-50",
    tagline: "text-blue",
    check: "text-blue",
    outputBg: "bg-blue-50",
    outputBorder: "border-blue-100",
    outputIcon: "text-blue",
    duration: "text-blue",
    connector: "text-blue-300",
    valueBg: "bg-blue-50",
    valueIcon: "text-blue",
    valueTitle: "text-blue",
  },
  teal: {
    ring: "ring-emerald-100 border-emerald-200",
    icon: "text-emerald-600",
    activeBorder: "border-emerald-300",
    activeBg: "bg-emerald-50",
    tagline: "text-emerald-600",
    check: "text-emerald-500",
    outputBg: "bg-emerald-50",
    outputBorder: "border-emerald-100",
    outputIcon: "text-emerald-600",
    duration: "text-emerald-600",
    connector: "text-emerald-300",
    valueBg: "bg-emerald-50",
    valueIcon: "text-emerald-600",
    valueTitle: "text-emerald-600",
  },
  amber: {
    ring: "ring-amber-100 border-amber-200",
    icon: "text-amber-600",
    activeBorder: "border-amber-300",
    activeBg: "bg-amber-50",
    tagline: "text-amber-600",
    check: "text-amber-500",
    outputBg: "bg-amber-50",
    outputBorder: "border-amber-100",
    outputIcon: "text-amber-600",
    duration: "text-amber-600",
    connector: "text-amber-300",
    valueBg: "bg-amber-50",
    valueIcon: "text-amber-600",
    valueTitle: "text-amber-600",
  },
  purple: {
    ring: "ring-violet-100 border-violet-200",
    icon: "text-violet-600",
    activeBorder: "border-violet-300",
    activeBg: "bg-violet-50",
    tagline: "text-violet-600",
    check: "text-violet-500",
    outputBg: "bg-violet-50",
    outputBorder: "border-violet-100",
    outputIcon: "text-violet-600",
    duration: "text-violet-600",
    connector: "text-violet-300",
    valueBg: "bg-violet-50",
    valueIcon: "text-violet-600",
    valueTitle: "text-violet-600",
  },
};

export function Framework() {
  const [active, setActive] = useState(0);
  const last = frameworkSteps.length - 1;
  const step = frameworkSteps[active];
  const a = ACCENTS[step.accent];

  return (
    <section id="framework" className="section-pad relative scroll-mt-24 bg-canvas">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
      <Container className="relative">
        <SectionHeading
          eyebrow={
            <span className="inline-flex items-center gap-1.5">
              <TrendingUp className="size-3.5" />
              The Road to AI-Ready
            </span>
          }
          title={
            <>
              The Metadox Digital Transformation{" "}
              <span className="text-gradient">Framework</span>
            </>
          }
          description={
            <>
              A practical{" "}
              <span className="text-gradient-electric font-bold">5-step journey</span> to
              digitise your operations, automate work, leverage AI and achieve sustainable
              growth.
            </>
          }
        />

        {/* Speed callout */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-blue/15 bg-blue-50 px-6 py-5 text-center sm:flex-row sm:gap-6 sm:text-left">
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue text-white">
            <Zap className="size-5" />
          </span>
          <div>
            <p className="font-heading text-lg font-bold text-navy">
              Delivered in weeks, not months
            </p>
            <p className="mt-0.5 text-sm text-muted">
              From identifying opportunities to implementing practical AI
              solutions, we help businesses achieve measurable results faster.
            </p>
          </div>
        </div>

        {/* Step nav */}
        <div className="mt-14 -mx-6 flex items-stretch gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:gap-3 lg:overflow-visible lg:px-0 lg:pb-0">
          {frameworkSteps.map((s, i) => {
            const sa = ACCENTS[s.accent];
            const isActive = i === active;
            return (
              <div key={s.no} className="flex flex-1 items-stretch gap-2 lg:gap-3">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex min-w-[200px] flex-1 items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-300 lg:min-w-0",
                    isActive
                      ? `${sa.activeBorder} ${sa.activeBg} shadow-soft`
                      : "border-line bg-white hover:border-line/70 hover:bg-white/60",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-full border bg-white transition-transform duration-300",
                      isActive ? `${sa.ring} scale-105` : "border-line",
                    )}
                  >
                    <s.icon className={cn("size-5", isActive ? sa.icon : "text-muted")} />
                  </span>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "text-[0.65rem] font-bold uppercase tracking-wide",
                        isActive ? sa.tagline : "text-muted",
                      )}
                    >
                      Step {s.no}
                    </p>
                    <p
                      className={cn(
                        "truncate text-sm font-semibold",
                        isActive ? "text-navy" : "text-ink/70",
                      )}
                    >
                      {s.navLabel}
                    </p>
                  </div>
                </button>
                {i !== last && (
                  <ArrowRight className="hidden size-4 shrink-0 self-center text-line lg:block" />
                )}
              </div>
            );
          })}
        </div>

        {/* Step detail panel */}
        <div className="relative mt-6 overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.no}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid items-start gap-8 p-8 sm:p-10 lg:grid-cols-[1.1fr_1fr]"
            >
              <div className="flex flex-col">
                <p className={cn("text-sm font-semibold", a.tagline)}>{step.tagline}</p>
                <h3 className="mt-2 font-heading text-2xl font-bold text-navy">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {step.description}
                </p>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div
                    className={cn(
                      "flex flex-1 items-center gap-3 rounded-xl border p-4",
                      a.outputBg,
                      a.outputBorder,
                    )}
                  >
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/70">
                      <step.output.icon className={cn("size-4", a.outputIcon)} />
                    </span>
                    <div>
                      <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-muted">
                        Output
                      </p>
                      <p className="mt-0.5 text-sm font-semibold leading-snug text-navy">
                        {step.output.label}
                      </p>
                    </div>
                  </div>

                  <p
                    className={cn(
                      "flex shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-wide",
                      a.duration,
                    )}
                  >
                    <Clock className="size-3.5" />
                    {step.duration}
                  </p>
                </div>
              </div>

              <ul className="flex flex-col gap-3 border-t border-line/70 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                {step.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-ink/75">
                    <Check className={cn("mt-0.5 size-4 shrink-0", a.check)} />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

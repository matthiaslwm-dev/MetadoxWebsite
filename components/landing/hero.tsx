"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { IconType } from "react-icons";
import { RiFileExcel2Fill, RiOpenaiFill } from "react-icons/ri";
import {
  SiClaude,
  SiGmail,
  SiPaypal,
  SiStripe,
  SiTelegram,
  SiWhatsapp,
} from "react-icons/si";
import { SignalLayer, useAnchors, type SignalLink } from "./agent-signals";
import { LpButton } from "./lp-button";
import { landingHero } from "@/lib/landing-content";
import { primaryCta } from "@/lib/site";

/**
 * Which cursor reaches for which tool. Each stays on its own side of the hero
 * so no wire is ever drawn across the headline.
 */
const SIGNAL_LINKS: SignalLink[] = [
  {
    from: "james",
    targets: ["whatsapp", "excel", "gmail", "telegram"],
    color: "#015ee8",
    delay: 0.8,
  },
  {
    from: "john",
    targets: ["openai", "stripe", "paypal"],
    color: "#3b82f6",
    delay: 2.2,
  },
  {
    from: "sarah",
    targets: ["claude", "stripe"],
    color: "#8b5cf6",
    delay: 3.6,
  },
];

/**
 * Decorative element that pops in, then drifts vertically forever.
 * Visibility is left to the wrapping container, which differs per breakpoint.
 */
function Floating({
  children,
  className,
  delay = 0,
  anchorRef,
}: {
  children: React.ReactNode;
  className: string;
  delay?: number;
  anchorRef?: (el: HTMLElement | null) => void;
}) {
  // Hook rather than a render-time matchMedia read: the latter returns false
  // during SSR and can return true on the client, desynchronising hydration.
  const reduced = useReducedMotion();
  return (
    <motion.div
      ref={anchorRef}
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + 0.3, duration: 0.5, ease: "easeOut" }}
      className={`absolute flex ${className}`}
    >
      <motion.div
        animate={reduced ? {} : { y: [0, -8, 0] }}
        transition={{
          duration: 3 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const BUBBLE_SIZES = {
  sm: { bubble: "h-10 w-10", icon: "h-5 w-5" },
  lg: { bubble: "h-12 w-12", icon: "h-6 w-6" },
} as const;

/**
 * Floating app logo in a white bubble.
 *
 * Every mark here is drawn on a 24-unit grid, so they all render at one size
 * without any per-icon correction.
 */
function FloatingIcon({
  icon: Icon,
  colorClassName,
  size = "sm",
  className,
  delay = 0,
  anchorRef,
}: {
  icon: IconType;
  colorClassName: string;
  size?: keyof typeof BUBBLE_SIZES;
  className: string;
  delay?: number;
  anchorRef?: (el: HTMLElement | null) => void;
}) {
  const { bubble, icon } = BUBBLE_SIZES[size];
  return (
    <Floating className={className} delay={delay} anchorRef={anchorRef}>
      <div
        className={`flex ${bubble} items-center justify-center rounded-full border border-gray-100 bg-white shadow-md`}
      >
        <Icon className={`${icon} ${colorClassName}`} />
      </div>
    </Floating>
  );
}

/** Named agent cursor drifting around the headline. */
function CursorLabel({
  name,
  pillClassName,
  cursorColor,
  className,
  delay = 0,
  anchorRef,
}: {
  name: string;
  pillClassName: string;
  cursorColor: string;
  className: string;
  delay?: number;
  anchorRef?: (el: HTMLElement | null) => void;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      ref={anchorRef}
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + 0.5, duration: 0.4, ease: "easeOut" }}
      className={`absolute block ${className}`}
    >
      <motion.div
        animate={reduced ? {} : { x: [0, 4, -2, 0], y: [0, -6, 2, 0] }}
        transition={{
          duration: 4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          width="20"
          height="24"
          viewBox="0 0 20 24"
          fill="none"
          className="drop-shadow-md"
          focusable="false"
        >
          <path
            d="M1 1L7 19L10 12L18 10L1 1Z"
            fill={cursorColor}
            stroke="white"
            strokeWidth="1.5"
          />
        </svg>
        <span
          className={`-mt-1 ml-3 inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold text-white shadow-md ${pillClassName}`}
        >
          {name}
        </span>
      </motion.div>
    </motion.div>
  );
}

export function LandingHero() {
  const { containerRef, registerAnchor, points } = useAnchors();

  // One full viewport tall. The header floats over the hero rather than
  // occupying a band above it, so no height is subtracted; instead the copy
  // gets a little top padding so the optical centre sits below the pill.
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 pt-20">

      {/*
        Horizontal offsets are the reference's own, measured against the full
        viewport rather than a capped container — that spread is what frames the
        copy on a wide screen instead of huddling around it.

        Vertical offsets are rescaled. The reference tops out at 62% because its
        hero is roughly 1.5x the viewport (an embedded video sits inside it), so
        62% lands near the fold. This hero is one viewport tall, so the same
        numbers would stack everything into the upper two thirds. The 8%-62%
        band is remapped onto 10%-88%.

        The innermost pair (22%) waits until `2xl`. Below roughly 1600px the
        centred headline is wide enough that they would sit on top of it.
      */}
      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        {/* Behind the icons, so a wire never crosses a bubble it passes. */}
        <SignalLayer links={SIGNAL_LINKS} points={points} />

        <FloatingIcon
          icon={SiTelegram}
          colorClassName="text-[#26A5E4]"
          className="left-[22%] top-[16%] hidden 2xl:flex"
          delay={0.3}
          anchorRef={registerAnchor("telegram")}
        />
        <FloatingIcon
          icon={SiGmail}
          colorClassName="text-[#EA4335]"
          className="left-[6%] top-[19%]"
          delay={0}
          anchorRef={registerAnchor("gmail")}
        />
        <FloatingIcon
          icon={RiFileExcel2Fill}
          colorClassName="text-[#217346]"
          className="left-[4%] top-[52%]"
          delay={0.4}
          anchorRef={registerAnchor("excel")}
        />
        <FloatingIcon
          icon={SiWhatsapp}
          colorClassName="text-[#25D366]"
          size="lg"
          className="left-[10%] top-[78%]"
          delay={0.6}
          anchorRef={registerAnchor("whatsapp")}
        />

        <FloatingIcon
          icon={SiPaypal}
          colorClassName="text-[#003087]"
          className="right-[22%] top-[13%] hidden 2xl:flex"
          delay={0.5}
          anchorRef={registerAnchor("paypal")}
        />
        <FloatingIcon
          icon={RiOpenaiFill}
          colorClassName="text-black"
          size="lg"
          className="right-[8%] top-[22%]"
          delay={0.2}
          anchorRef={registerAnchor("openai")}
        />
        <FloatingIcon
          icon={SiStripe}
          colorClassName="text-[#635BFF]"
          className="right-[5%] top-[49%]"
          delay={0.7}
          anchorRef={registerAnchor("stripe")}
        />
        <FloatingIcon
          icon={SiClaude}
          colorClassName="text-[#D97757]"
          className="right-[6%] top-[85%]"
          delay={0.1}
          anchorRef={registerAnchor("claude")}
        />

        <CursorLabel
          name="James"
          pillClassName="bg-lp-primary"
          cursorColor="#015ee8"
          className="left-[16%] top-[65%]"
          delay={0}
          anchorRef={registerAnchor("james")}
        />
        <CursorLabel
          name="John"
          pillClassName="bg-blue-500"
          cursorColor="#3b82f6"
          className="right-[12%] top-[35%]"
          delay={0.4}
          anchorRef={registerAnchor("john")}
        />
        <CursorLabel
          name="Sarah"
          pillClassName="bg-violet-500"
          cursorColor="#8b5cf6"
          className="right-[14%] top-[71%]"
          delay={0.8}
          anchorRef={registerAnchor("sarah")}
        />
      </div>

      {/*
        Small screens get a lighter set, kept to the bands above and below the
        copy — the only places with room once the text fills the width.
      */}
      <div className="pointer-events-none absolute inset-0 lg:hidden">
        <FloatingIcon
          icon={SiGmail}
          colorClassName="text-[#EA4335]"
          className="left-[8%] top-[5%]"
          delay={0}
        />
        <FloatingIcon
          icon={RiOpenaiFill}
          colorClassName="text-black"
          className="right-[8%] top-[5%]"
          delay={0.3}
        />
        <FloatingIcon
          icon={SiWhatsapp}
          colorClassName="text-[#25D366]"
          className="left-[10%] top-[88%]"
          delay={0.5}
        />
        <FloatingIcon
          icon={RiFileExcel2Fill}
          colorClassName="text-[#217346]"
          className="right-[10%] top-[88%]"
          delay={0.2}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <h1
          style={{ animationDelay: "0.2s" }}
          className="mb-6 animate-lp-fade-in px-2 text-center text-xl font-extrabold leading-tight text-lp-foreground opacity-0 sm:text-2xl md:text-3xl lg:text-4xl"
        >
          {/*
            Explicit leading: the text-* utilities ship a line-height of 1 at
            these sizes, which crops the box above the descenders. Harmless for
            plain text, but this span paints through background-clip: text, so
            anything outside the box simply goes unpainted.
          */}
          {/*
            `w-fit mx-auto` shrinks the painted box to the text itself. The
            gradient is sized by the box, so a full-width block would put its
            endpoints out past the glyphs on any breakpoint where the line is
            narrower than the container, and the line would render as a slice
            out of the middle of the ramp instead of the whole sweep.
          */}
          <span className="mx-auto my-2 block w-fit text-lp-primary text-2xl leading-[1.2] sm:text-4xl md:text-5xl lg:text-6xl">
            {landingHero.gradientLine}
          </span>
          {landingHero.headline}
        </h1>

        <p
          style={{ animationDelay: "0.3s" }}
          className="mx-auto mb-8 max-w-2xl animate-lp-fade-in px-2 text-base text-lp-muted-foreground opacity-0 sm:text-lg md:text-xl"
        >
          {landingHero.subhead}
        </p>

        <div
          style={{ animationDelay: "0.4s" }}
          className="mb-10 flex animate-lp-fade-in flex-row items-center justify-center gap-4 opacity-0 sm:gap-8 md:gap-12"
        >
          {landingHero.stats.map((stat, index) => (
            <div key={stat.label} className="contents">
              {index > 0 && <div className="h-10 w-px bg-lp-border sm:h-12" />}
              <div className="text-center">
                <div className="text-lg font-extrabold whitespace-nowrap text-lp-foreground sm:text-2xl md:text-3xl">
                  {stat.value}
                </div>
                <div className="text-[11px] whitespace-nowrap text-lp-muted-foreground sm:text-sm">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{ animationDelay: "0.5s" }}
          className="flex animate-lp-fade-in-up flex-col items-center justify-center gap-4 opacity-0 sm:flex-row"
        >
          <LpButton href={primaryCta.href}>
            Transform Your Business
            <ArrowRight className="h-5 w-5" />
          </LpButton>
        </div>
      </div>
    </section>
  );
}

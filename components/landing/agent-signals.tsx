"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

/** A cursor and the tools it talks to, cycled in order. */
export type SignalLink = {
  from: string;
  targets: string[];
  color: string;
  /** Seconds before this cursor's first send, so the three never fire together. */
  delay: number;
};

/** Seconds for one full send-and-receive, and the pause before the next one. */
const CYCLE_SECONDS = 4.2;
const GAP_SECONDS = 1.6;

/**
 * Gaps between a wire end and the anchor it points at. The tool end clears the
 * bubble; the cursor end clears the name pill, which sits below and right of
 * the arrow and so pulls the measured centre with it.
 */
const START_GAP = 34;
const END_GAP = 26;

/** Colour of the result travelling back, shared by all three cursors. */
const RESULT_COLOR = "#10b981";

/**
 * Measures where the hero's decorations actually sit.
 *
 * Their positions are percentages that differ per breakpoint, and two of the
 * icons only exist at `2xl`, so reading the DOM is the only way to know what to
 * join up. Anchors are measured on the outer wrapper, which is the element that
 * is positioned: the drift animation lives on a child, so the numbers here stay
 * still while the icons bob.
 */
export function useAnchors() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodes = useRef(new Map<string, HTMLElement>());
  const setters = useRef(new Map<string, (el: HTMLElement | null) => void>());
  const [points, setPoints] = useState<Record<string, Point>>({});

  const registerAnchor = useCallback((id: string) => {
    let setter = setters.current.get(id);
    if (!setter) {
      setter = (el: HTMLElement | null) => {
        if (el) nodes.current.set(id, el);
        else nodes.current.delete(id);
      };
      setters.current.set(id, setter);
    }
    return setter;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const base = container.getBoundingClientRect();
      const next: Record<string, Point> = {};
      for (const [id, el] of nodes.current) {
        const rect = el.getBoundingClientRect();
        // Zero width means the breakpoint has hidden it, so it gets no wire.
        if (rect.width === 0) continue;
        next[id] = {
          x: rect.left - base.left + rect.width / 2,
          y: rect.top - base.top + rect.height / 2,
        };
      }
      setPoints(next);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return { containerRef, registerAnchor, points };
}

function quadraticPoint(a: Point, c: Point, b: Point, t: number): Point {
  const m = 1 - t;
  return {
    x: m * m * a.x + 2 * m * t * c.x + t * t * b.x,
    y: m * m * a.y + 2 * m * t * c.y + t * t * b.y,
  };
}

/** Trimmed endpoints plus the control point that bows the wire to one side. */
function buildCurve(from: Point, to: Point, bow: number) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  const ux = dx / length;
  const uy = dy / length;

  const a = { x: from.x + ux * START_GAP, y: from.y + uy * START_GAP };
  const b = { x: to.x - ux * END_GAP, y: to.y - uy * END_GAP };
  const c = {
    x: (a.x + b.x) / 2 - uy * length * bow,
    y: (a.y + b.y) / 2 + ux * length * bow,
  };
  return { a, b, c, d: `M ${a.x} ${a.y} Q ${c.x} ${c.y} ${b.x} ${b.y}` };
}

/** Travelling dot: a solid core inside a soft halo. */
function Packet({
  cx,
  cy,
  opacity,
  color,
}: {
  cx: MotionValue<number>;
  cy: MotionValue<number>;
  opacity: MotionValue<number>;
  color: string;
}) {
  return (
    <>
      <motion.circle
        cx={cx}
        cy={cy}
        r={9}
        fill={color}
        fillOpacity={0.16}
        style={{ opacity }}
      />
      <motion.circle cx={cx} cy={cy} r={3.5} fill={color} style={{ opacity }} />
    </>
  );
}

/** Ring that expands out of an anchor the moment something lands on it. */
function Pulse({
  at,
  radius,
  opacity,
  color,
}: {
  at: Point;
  radius: MotionValue<number>;
  opacity: MotionValue<number>;
  color: string;
}) {
  return (
    <motion.circle
      cx={at.x}
      cy={at.y}
      r={radius}
      fill="none"
      stroke={color}
      strokeWidth={2}
      style={{ opacity }}
    />
  );
}

function Signal({
  link,
  points,
  bow,
}: {
  link: SignalLink;
  points: Record<string, Point>;
  bow: number;
}) {
  const [cycle, setCycle] = useState(0);
  const progress = useMotionValue(0);

  const from = points[link.from];
  const to = points[link.targets[cycle % link.targets.length]];
  const ready = Boolean(from && to);

  useEffect(() => {
    // Nothing measured yet, or this target is hidden at the current width:
    // step to the next one rather than stalling on it.
    if (!ready) {
      if (!from) return;
      const timer = setTimeout(() => setCycle((c) => c + 1), 200);
      return () => clearTimeout(timer);
    }

    let live = true;
    progress.set(0);
    const controls = animate(progress, 1, {
      duration: CYCLE_SECONDS,
      ease: "linear",
      delay: cycle === 0 ? link.delay : GAP_SECONDS,
    });
    controls.then(() => {
      if (live) setCycle((c) => c + 1);
    });
    return () => {
      live = false;
      controls.stop();
    };
  }, [cycle, from, ready, link.delay, progress]);

  // Fallbacks keep the hook order stable while the layout is still unmeasured.
  const curve = buildCurve(from ?? { x: 0, y: 0 }, to ?? { x: 0, y: 0 }, bow);

  const pathLength = useTransform(progress, [0, 0.12], [0, 1]);
  const pathOpacity = useTransform(progress, [0, 0.06, 0.88, 1], [0, 1, 1, 0]);

  const outAt = useTransform(progress, [0.12, 0.42], [0, 1], { clamp: true });
  const outX = useTransform(outAt, (t) => quadraticPoint(curve.a, curve.c, curve.b, t).x);
  const outY = useTransform(outAt, (t) => quadraticPoint(curve.a, curve.c, curve.b, t).y);
  const outOpacity = useTransform(progress, [0.1, 0.14, 0.4, 0.44], [0, 1, 1, 0]);

  const backAt = useTransform(progress, [0.56, 0.86], [1, 0], { clamp: true });
  const backX = useTransform(backAt, (t) => quadraticPoint(curve.a, curve.c, curve.b, t).x);
  const backY = useTransform(backAt, (t) => quadraticPoint(curve.a, curve.c, curve.b, t).y);
  const backOpacity = useTransform(progress, [0.54, 0.58, 0.84, 0.88], [0, 1, 1, 0]);

  const hitRadius = useTransform(progress, [0.42, 0.56], [10, 30]);
  const hitOpacity = useTransform(progress, [0.42, 0.45, 0.56], [0, 0.7, 0]);

  const homeRadius = useTransform(progress, [0.86, 0.99], [10, 28]);
  const homeOpacity = useTransform(progress, [0.86, 0.89, 0.99], [0, 0.7, 0]);

  if (!ready || !from || !to) return null;

  return (
    <g>
      <motion.path
        d={curve.d}
        fill="none"
        stroke={link.color}
        strokeWidth={1.5}
        strokeOpacity={0.3}
        strokeLinecap="round"
        style={{ pathLength, opacity: pathOpacity }}
      />
      <Pulse at={to} radius={hitRadius} opacity={hitOpacity} color={link.color} />
      <Packet cx={outX} cy={outY} opacity={outOpacity} color={link.color} />
      <Packet cx={backX} cy={backY} opacity={backOpacity} color={RESULT_COLOR} />
      <Pulse at={from} radius={homeRadius} opacity={homeOpacity} color={RESULT_COLOR} />
    </g>
  );
}

/**
 * Wires between the hero's cursors and the tools they use: a signal out, a
 * pulse on arrival, a result back. Sits behind the icons themselves.
 */
export function SignalLayer({
  links,
  points,
}: {
  links: SignalLink[];
  points: Record<string, Point>;
}) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      focusable="false"
    >
      {links.map((link, index) => (
        // Keyed on the measured origin so a resize rebuilds the curves rather
        // than leaving the travelling dots on stale coordinates.
        <Signal
          key={`${link.from}:${Math.round(points[link.from]?.x ?? -1)}:${Math.round(
            points[link.from]?.y ?? -1,
          )}`}
          link={link}
          points={points}
          bow={index % 2 === 0 ? 0.16 : -0.16}
        />
      ))}
    </svg>
  );
}

"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { MotionConfig } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, type ReactNode } from "react";

const HEADER_OFFSET = 84;

/** Resets Lenis (and native) scroll to the top on every route change. */
function ScrollToTopOnRouteChange() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname, lenis]);

  return null;
}

/**
 * Intercepts in-page anchor clicks and routes them through Lenis so every
 * `#anchor` link across the site scrolls smoothly with a navbar offset.
 * Rendered inside <ReactLenis> so `useLenis` has a provider.
 */
function AnchorScroll() {
  const lenis = useLenis();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const el = document.querySelector(href);
      if (!el) return;

      event.preventDefault();
      lenis?.scrollTo(el as HTMLElement, {
        offset: -HEADER_OFFSET,
        duration: 1.25,
      });
      window.history.replaceState(null, "", href);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}

/** Routes that host `?section=` scroll targets. */
const SECTION_ROUTES = ["/", "/legacy-home"];

/** How long to keep re-anchoring after landing, while images above settle. */
const SETTLE_MS = 1500;
/** How long to wait for the target section to mount before giving up. */
const MOUNT_TIMEOUT_MS = 5000;

/**
 * Scrolls to a homepage section named by `?section=` (used instead of `#`
 * hashes in nav links) then strips the query param once landed.
 *
 * Arriving from another route the section isn't in the DOM when this effect
 * first runs, and content above it keeps shifting as images decode — either
 * one used to leave the nav link needing a second click. So: poll until the
 * section mounts, then hold the anchor until the layout stops moving, giving
 * up the moment the visitor scrolls themselves.
 */
function SectionScrollFromQuery() {
  const lenis = useLenis();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const section = searchParams.get("section");
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    // Already on the section-hosting route: glide. Arriving from another route:
    // jump, rather than racing past every section above the target.
    const smooth = previousPathname.current === pathname;
    previousPathname.current = pathname;

    if (!section || !SECTION_ROUTES.includes(pathname)) return;

    let frame = 0;
    let landedAt = 0;
    let aborted = false;
    const start = Date.now();

    const abort = () => {
      aborted = true;
    };
    const userEvents = ["wheel", "touchstart", "keydown"] as const;
    userEvents.forEach((type) =>
      window.addEventListener(type, abort, { passive: true }),
    );

    const scrollTo = (top: number, animate: boolean) => {
      if (!lenis) {
        window.scrollTo({ top, behavior: animate ? "smooth" : "auto" });
        return;
      }
      // Lenis caches the scrollable height and only refreshes it on its own
      // resize observation, so straight after a route change it still holds the
      // previous (shorter) page and silently clamps the target. Recompute first.
      lenis.resize();
      lenis.scrollTo(top, animate ? { duration: 1.25 } : { immediate: true });
    };

    const tick = () => {
      if (aborted) return;
      const el = document.getElementById(section);
      const now = Date.now();

      if (!el) {
        if (now - start < MOUNT_TIMEOUT_MS) frame = requestAnimationFrame(tick);
        return;
      }

      const top = Math.max(
        0,
        el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
      );

      if (!landedAt) {
        landedAt = now;
        scrollTo(top, smooth);
        router.replace(pathname, { scroll: false });
      } else if (!smooth && Math.abs(window.scrollY - top) > 2) {
        // Content above finished loading and pushed the section: re-anchor.
        scrollTo(top, false);
      }

      // Keep watching briefly; a smooth scroll owns the viewport until it ends.
      if (now - landedAt < SETTLE_MS) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      userEvents.forEach((type) => window.removeEventListener(type, abort));
    };
  }, [section, pathname, lenis, router]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.15,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        // Every route scrolls natively, matching the landing page: its reference
        // design uses no smooth-scroll library at all, and having one page feel
        // different from the rest was the inconsistency.
        //
        // Lenis stays mounted so `useLenis` consumers keep working; only the
        // wheel/touch smoothing is off. Programmatic `scrollTo` still animates,
        // which is what anchor links and `?section=` land with.
        smoothWheel: false,
        syncTouch: false,
      }}
    >
      <MotionConfig reducedMotion="user">
        <AnchorScroll />
        <ScrollToTopOnRouteChange />
        <Suspense fallback={null}>
          <SectionScrollFromQuery />
        </Suspense>
        {children}
      </MotionConfig>
    </ReactLenis>
  );
}

"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { MotionConfig } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, type ReactNode } from "react";

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

/**
 * Scrolls to a homepage section named by `?section=` (used instead of `#`
 * hashes in nav links) then strips the query param once landed.
 */
function SectionScrollFromQuery() {
  const lenis = useLenis();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  useEffect(() => {
    if (!section || pathname !== "/") return;
    const el = document.getElementById(section);
    if (!el) return;

    lenis?.scrollTo(el, { offset: -HEADER_OFFSET, duration: 1.25 });
    router.replace(pathname, { scroll: false });
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

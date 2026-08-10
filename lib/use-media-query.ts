"use client";

import { useEffect, useState } from "react";

/**
 * Subscribes to a media query.
 *
 * Returns `null` until the first client render rather than a guessed boolean:
 * the server has no viewport, so any assumed answer would be wrong half the
 * time and would hydrate a mismatch. Callers that mount something expensive
 * (a WebGL canvas, a whole decorative layer) should render nothing while the
 * answer is `null` and let it appear a beat later.
 */
export function useMediaQuery(query: string): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const list = window.matchMedia(query);
    const sync = () => setMatches(list.matches);
    sync();
    list.addEventListener("change", sync);
    return () => list.removeEventListener("change", sync);
  }, [query]);

  return matches;
}

/** Tailwind's `lg` breakpoint, expressed as "everything below it". */
export const BELOW_LG = "(max-width: 1023.98px)";

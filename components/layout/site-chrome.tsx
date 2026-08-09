"use client";

import { usePathname } from "next/navigation";

/** Routes that supply their own header and footer. */
const SELF_CHROMED_ROUTES = ["/", "/about", "/geo", "/booking"];

/**
 * Hides the site-wide navbar/footer on routes that render their own chrome.
 *
 * The landing, About and GEO pages use a floating pill header and minimal
 * footer of their own, so the global ones would double up.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (SELF_CHROMED_ROUTES.includes(pathname)) return null;
  return <>{children}</>;
}

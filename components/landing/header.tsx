"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { primaryCta, siteConfig } from "@/lib/site";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "GEO", href: "/geo" },
];

/**
 * Floating pill header: full navbar width with the logo left, nav links in the
 * middle and the CTA right.
 */
export function LandingHeader() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Entrance transition: the pill drops in once the page is interactive.
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  // Already home, so the link is a no-op: scroll back to the top instead.
  const handleClick = (event: { preventDefault: () => void }) => {
    if (pathname !== "/") return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed left-1/2 top-4 z-50 flex w-[calc(100vw-2rem)] max-w-6xl -translate-x-1/2 items-center justify-between",
        // Reference nav metrics: padding 7px 7px 7px 18px.
        "rounded-full border border-lp-border/70 bg-lp-background/70 py-[7px] pl-[18px] pr-[7px]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_12px_32px_-12px_hsl(220_20%_10%/0.16)]",
        "backdrop-blur-xl backdrop-saturate-150",
        "transition-[opacity,translate] duration-700 ease-out",
        mounted ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
      )}
    >
      {/* Reference groups the logo and links together on the left, gap 22px. */}
      <div className="flex items-center gap-[22px]">
        <Link
          href="/"
          onClick={handleClick}
          aria-label={`${siteConfig.name} home`}
          className="flex shrink-0 items-center transition-opacity hover:opacity-80"
        >
          <Image
            // Trimmed lockup. The source canvas was 43% baked-in padding, so its
            // artwork drew at under half the height it was given. This crop is
            // flush to the ink, so the `h-*` value is the real logo height.
            src="/metadox-logo-lockup.png"
            alt={siteConfig.name}
            width={1953}
            height={321}
            priority
            // Still no alpha channel, so multiply drops the white matte out
            // against the translucent pill.
            // Reference logo metrics: 20px tall.
            className="h-5 w-auto mix-blend-multiply"
          />
        </Link>

        <nav className="hidden items-center gap-0.5 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={link.href === "/" ? handleClick : undefined}
              // Reference nav-link metrics: padding 8px 14px, 0.74rem, weight 500.
              className="rounded-full px-[14px] py-2 text-[0.74rem] font-medium tracking-[0.04em] text-lp-muted-foreground transition-colors duration-200 hover:bg-lp-foreground/5 hover:text-lp-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <Link
        href={primaryCta.href}
        // Reference CTA metrics: padding 9px 18px, 0.74rem, weight 700.
        className="shrink-0 whitespace-nowrap rounded-full bg-lp-primary px-[18px] py-[9px] text-[0.74rem] font-bold tracking-[0.03em] text-lp-primary-foreground transition-all duration-200 hover:scale-[1.04] hover:shadow-lp-hover"
      >
        Book Discovery Call
      </Link>
    </header>
  );
}

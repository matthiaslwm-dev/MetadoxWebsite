"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { primaryCta, siteConfig } from "@/lib/site";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "GEO", href: "/geo" },
  { label: "Projects", href: "/projects" },
];

/**
 * Floating pill header: full navbar width with the logo left, nav links in the
 * middle and the CTA right.
 *
 * The inline link row needs roughly 250px of its own plus the logo and the CTA,
 * which only clears comfortably from `md` up. Below that the links collapse
 * into a sheet under the pill, and below `sm` the CTA joins them there rather
 * than fighting the logo for the same 320px of width.
 */
export function LandingHeader() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Entrance transition: the pill drops in once the page is interactive.
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  // A navigation is the end of the menu's purpose. Closing on pathname rather
  // than on the click itself also covers the back button.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    // Pointer rather than click: this must also close for a tap that lands on
    // something which stops the click from propagating.
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    // The sheet is anchored to the pill, so a width change can leave it
    // stranded over content it no longer belongs to.
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = () => {
      if (desktop.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  // Already home, so the link is a no-op: scroll back to the top instead.
  const handleClick = (event: { preventDefault: () => void }) => {
    if (pathname !== "/") return;
    event.preventDefault();
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed left-1/2 top-4 z-50 w-[calc(100vw-1.5rem)] max-w-6xl -translate-x-1/2 sm:w-[calc(100vw-2rem)]",
        "transition-[opacity,translate] duration-700 ease-out",
        mounted ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between",
          // Reference nav metrics: padding 7px 7px 7px 18px.
          "rounded-full border border-lp-border/70 bg-lp-background/70 py-[7px] pl-[18px] pr-[7px]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_12px_32px_-12px_hsl(220_20%_10%/0.16)]",
          "backdrop-blur-xl backdrop-saturate-150",
        )}
      >
        {/* Reference groups the logo and links together on the left, gap 22px. */}
        <div className="flex min-w-0 items-center gap-[22px]">
          <Link
            href="/"
            onClick={handleClick}
            aria-label={`${siteConfig.name} home`}
            // The lockup is 20px tall, so the anchor around it was a 20px tap
            // target. Padding grows it to 44px; the matching negative margin
            // keeps it from growing the pill along with it.
            className="-my-3 flex shrink-0 items-center py-3 transition-opacity hover:opacity-80"
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

          <nav className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={link.href === "/" ? handleClick : undefined}
                aria-current={link.href === pathname ? "page" : undefined}
                // Reference nav-link metrics: padding 8px 14px, 0.74rem, weight 500.
                className={cn(
                  "rounded-full px-[14px] py-2 text-[0.74rem] font-medium tracking-[0.04em] transition-colors duration-200 hover:bg-lp-foreground/5 hover:text-lp-foreground",
                  link.href === pathname
                    ? "text-lp-foreground"
                    : "text-lp-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <Link
            href={primaryCta.href}
            // Reference CTA metrics: padding 9px 18px, 0.74rem, weight 700.
            // Hidden on the narrowest screens, where it would crowd the logo;
            // the sheet carries it there instead.
            className="hidden shrink-0 whitespace-nowrap rounded-full bg-lp-primary px-[18px] py-[9px] text-[0.74rem] font-bold tracking-[0.03em] text-lp-primary-foreground transition-all duration-200 hover:scale-[1.04] hover:shadow-lp-hover sm:inline-flex"
          >
            Book Discovery Call
          </Link>

          {/*
            44px square. Anything smaller is below every platform's minimum
            touch target, and this is the only way to navigate on a phone.
          */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="landing-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-full text-lp-foreground transition-colors hover:bg-lp-foreground/5 md:hidden"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/*
        Kept mounted so it can transition both ways, and so the button's
        `aria-controls` always resolves. `invisible` rather than `hidden` for
        the same reason, with `pointer-events-none` keeping the collapsed sheet
        from swallowing taps meant for the hero underneath it.
      */}
      <div
        id="landing-mobile-nav"
        className={cn(
          "absolute inset-x-0 top-[calc(100%+0.5rem)] origin-top md:hidden",
          "rounded-[1.5rem] border border-lp-border/70 bg-lp-background/95 p-2.5",
          "shadow-[0_16px_40px_-12px_hsl(220_20%_10%/0.22)]",
          "backdrop-blur-xl backdrop-saturate-150",
          "transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none",
          open
            ? "visible scale-100 opacity-100"
            : "pointer-events-none invisible -translate-y-2 scale-95 opacity-0",
        )}
      >
        <nav className="flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={link.href === "/" ? handleClick : () => setOpen(false)}
              aria-current={link.href === pathname ? "page" : undefined}
              tabIndex={open ? undefined : -1}
              className={cn(
                "rounded-2xl px-4 py-3.5 text-sm font-medium transition-colors",
                link.href === pathname
                  ? "bg-lp-muted text-lp-foreground"
                  : "text-lp-muted-foreground hover:bg-lp-foreground/5 hover:text-lp-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={primaryCta.href}
          onClick={() => setOpen(false)}
          tabIndex={open ? undefined : -1}
          className="mt-2 flex items-center justify-center rounded-2xl bg-lp-primary px-5 py-3.5 text-sm font-bold tracking-[0.02em] text-lp-primary-foreground transition-colors sm:hidden"
        >
          Book Discovery Call
        </Link>
      </div>
    </header>
  );
}

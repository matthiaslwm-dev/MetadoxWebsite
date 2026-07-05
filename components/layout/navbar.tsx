"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { ImageLogo } from "./logo";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { navItems, primaryCta } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis(({ scroll }) => setScrolled(scroll > 8));

  const setMenu = (next: boolean) => {
    setOpen(next);
    if (next) lenis?.stop();
    else lenis?.start();
  };

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        solid
          ? "border-b border-line/70 bg-white/85 shadow-[0_1px_0_rgba(3,21,59,0.05),0_10px_30px_-24px_rgba(3,21,59,0.5)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-4">
        <ImageLogo tone={solid ? "dark" : "light"} />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                solid
                  ? "text-ink/75 hover:bg-navy/[0.05] hover:text-navy"
                  : "text-white/80 hover:bg-white/10 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button href={primaryCta.href} size="md" variant="primary">
            {primaryCta.label}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenu(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-full border backdrop-blur transition-colors lg:hidden",
            solid
              ? "border-line bg-white/70 text-navy hover:bg-white"
              : "border-white/20 bg-white/10 text-white hover:bg-white/20",
          )}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-line bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenu(false)}
                  className="rounded-xl px-4 py-3 text-[0.95rem] font-medium text-ink/80 transition-colors hover:bg-navy/[0.04] hover:text-navy"
                >
                  {item.label}
                </Link>
              ))}
              <Button
                href={primaryCta.href}
                variant="primary"
                size="lg"
                className="mt-3 w-full"
                onClick={() => setMenu(false)}
              >
                {primaryCta.label}
                <ArrowRight className="size-4" />
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

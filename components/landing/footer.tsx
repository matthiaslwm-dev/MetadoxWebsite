import Link from "next/link";
import { siteConfig } from "@/lib/site";

/** Minimal landing-page footer. */
const links = [
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-lp-border/50 bg-lp-background py-8">
      <div className="mx-auto w-full max-w-7xl px-6 text-center text-sm text-lp-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights
          reserved.
        </p>
        {/* `py-2` on the links rather than tighter spacing on the row: these
            are the only two targets in the footer and at their natural 20px
            line box they sit well under any platform's touch minimum. */}
        <nav className="mt-1 flex items-center justify-center gap-2">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-full px-3 py-2 transition-colors hover:text-lp-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

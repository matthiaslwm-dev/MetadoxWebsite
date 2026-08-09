import Link from "next/link";
import { siteConfig } from "@/lib/site";

/**
 * Minimal landing-page footer. The legal pages don't exist yet, so these are
 * placeholders like the ones in the main site footer.
 */
const links = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-lp-border/50 bg-lp-background py-8">
      <div className="mx-auto w-full max-w-7xl px-6 text-center text-sm text-lp-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights
          reserved.
        </p>
        <nav className="mt-3 flex items-center justify-center gap-4">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-lp-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

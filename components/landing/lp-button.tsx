import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md px-8 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lp-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  // Hover fills with the brand blue and flips the label to white, matching the
  // reference's `hover:bg-accent hover:text-accent-foreground`.
  outline:
    "border border-lp-foreground/20 bg-lp-background text-lp-foreground transition-colors hover:bg-lp-primary hover:text-lp-primary-foreground",
  hero: "bg-lp-primary text-lp-primary-foreground shadow-lp-soft transition-all hover:shadow-lp-hover hover:scale-[1.02] active:scale-[0.98]",
} as const;

type LpButtonProps = {
  href: string;
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
};

/**
 * Landing-page button. Deliberately separate from `components/ui/button` so it
 * carries the `lp-*` palette without touching the site-wide navy button.
 */
export function LpButton({
  href,
  variant = "outline",
  className,
  children,
}: LpButtonProps) {
  const isExternal = href.startsWith("http");
  const classes = cn(base, variants[variant], className);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

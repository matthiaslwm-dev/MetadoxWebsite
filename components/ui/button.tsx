import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

export const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-blue text-white shadow-[0_10px_30px_-10px_rgba(1,94,232,0.6)] hover:-translate-y-0.5 hover:bg-blue-ink hover:shadow-[0_16px_44px_-12px_rgba(1,94,232,0.75)]",
        dark: "bg-navy text-white hover:-translate-y-0.5 hover:bg-navy-soft hover:shadow-lift",
        outline:
          "border border-line bg-white text-navy shadow-soft hover:-translate-y-0.5 hover:border-blue/40 hover:bg-blue-soft",
        light:
          "bg-white text-navy hover:-translate-y-0.5 hover:shadow-lift",
        glass: "glass text-navy hover:-translate-y-0.5 hover:shadow-lift",
        ghost: "text-navy hover:bg-navy/5",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-[3.25rem] px-7 text-[0.95rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: ReactNode;
  href?: string;
} & Omit<ComponentProps<"button">, "ref">;

export function Button({
  className,
  variant,
  size,
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    if (/^https?:\/\//.test(href) || href.startsWith("mailto:")) {
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className={classes}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
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

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

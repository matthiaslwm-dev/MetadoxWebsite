import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/** Geometric "M" monogram — matches the app favicon. */
export function LogoMark({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const gradId = tone === "light" ? "mmark-light" : "mmark-dark";
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-9 w-9 shrink-0", className)}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="16" y1="46" x2="48" y2="20" gradientUnits="userSpaceOnUse">
          {tone === "light" ? (
            <>
              <stop stopColor="#9ec2ff" />
              <stop offset="1" stopColor="#ffffff" />
            </>
          ) : (
            <>
              <stop stopColor="#015EE8" />
              <stop offset="1" stopColor="#03153B" />
            </>
          )}
        </linearGradient>
      </defs>
      <rect
        width="64"
        height="64"
        rx="15"
        className={tone === "light" ? "fill-white/10" : "fill-navy/5"}
      />
      <path
        d="M16 46 L16 20 L32 40 L48 20 L48 46"
        stroke={`url(#${gradId})`}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Raster wordmark lockup used in the navbar — white on transparent header, full-color once solid. */
export function ImageLogo({
  className,
  tone = "dark",
  onClick,
}: {
  className?: string;
  tone?: "dark" | "light";
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const isLight = tone === "light";
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      onClick={onClick}
      className={cn("inline-flex items-center transition-opacity hover:opacity-90", className)}
    >
      <Image
        src={isLight ? "/logo2-light.png" : "/logo2.png"}
        alt={siteConfig.name}
        width={539}
        height={118}
        priority
        className="h-9 w-auto"
      />
    </Link>
  );
}

/** Full lockup: mark + wordmark + tagline. */
export function Logo({
  tone = "dark",
  withTagline = true,
  className,
}: {
  tone?: "dark" | "light";
  withTagline?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className={cn(
        "group inline-flex items-center gap-2.5 transition-opacity hover:opacity-90",
        className,
      )}
    >
      <LogoMark tone={tone} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-[1.35rem] font-bold tracking-tight",
            tone === "light" ? "text-white" : "text-navy",
          )}
        >
          METADO<span className="text-blue">X</span>
        </span>
        {withTagline && (
          <span
            className={cn(
              "mt-1 text-[0.58rem] font-medium uppercase tracking-[0.18em]",
              tone === "light" ? "text-white/60" : "text-muted",
            )}
          >
            {siteConfig.tagline}
          </span>
        )}
      </span>
    </Link>
  );
}

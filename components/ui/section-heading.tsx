import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/motion";
import type { ReactNode } from "react";

/** Standard eyebrow + title + description block used at the top of sections. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
  titleClassName,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center"
          ? "mx-auto max-w-2xl items-center text-center"
          : "max-w-2xl items-start text-left",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "font-heading text-[1.9rem] font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-[2.7rem]",
          tone === "dark" ? "text-white" : "text-navy",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-white/70" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

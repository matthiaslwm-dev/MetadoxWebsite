import { Cpu } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { technologies } from "@/lib/content";

export function Technologies() {
  const row = [...technologies, ...technologies];

  return (
    <section className="section-pad relative overflow-hidden bg-white">
      <Container>
        <SectionHeading
          eyebrow={
            <span className="inline-flex items-center gap-1.5">
              <Cpu className="size-3.5" />
              Technologies We Use
            </span>
          }
          title={
            <>
              Built with <span className="text-gradient">modern, proven tools</span>
            </>
          }
          description="We work with today's leading AI platforms and software development tools to build fast, reliable and scalable solutions."
        />
      </Container>

      <div className="relative mt-14 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-3 hover:[animation-play-state:paused]">
          {row.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-white px-5 py-3 shadow-soft"
            >
              <tech.icon className={`size-5 ${tech.colorClassName}`} />
              <span className="text-sm font-semibold text-ink/80">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

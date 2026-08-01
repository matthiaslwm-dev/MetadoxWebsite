import { Target, Eye, Compass } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/motion";

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "Helping businesses transform with technology that is practical, scalable, and built for real-world impact.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    desc: "To make digital transformation accessible to every business, enabling them to innovate, grow, and thrive in a digital-first world.",
  },
  {
    icon: Compass,
    title: "Our Approach",
    desc: "Every business is different. That's why we take the time to understand your challenges, design tailored solutions, and deliver technology that creates lasting value.",
  },
];

export function Mission() {
  return (
    <section className="section-pad relative scroll-mt-24 overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-blue/25 blur-[130px]" />

      <Container className="relative">
        <SectionHeading
          eyebrow="Our Foundation"
          tone="dark"
          title={
            <>
              Mission, vision &amp;{" "}
              <span className="text-gradient-light">approach</span>
            </>
          }
          description="What drives Metadox and how we work with every business we partner with."
        />

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-3">
          {pillars.map((p) => (
            <StaggerItem key={p.title} className="h-full">
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-white/10 text-blue-bright">
                  <p.icon className="size-5" />
                </span>
                <h3 className="font-heading text-base font-bold text-white">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/70">{p.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

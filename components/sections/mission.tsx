import { Building2, Users, Rocket, Globe2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem, Reveal } from "@/components/ui/motion";

const whoWeServe = [
  {
    icon: Building2,
    title: "Business owners",
    desc: "Who cannot access the technology they need to compete and grow.",
  },
  {
    icon: Users,
    title: "Workers",
    desc: "Who are at risk of being left behind as AI reshapes every industry.",
  },
  {
    icon: Rocket,
    title: "Innovators",
    desc: "Whose products could change industries if only they could reach the right markets.",
  },
];

export function Mission() {
  return (
    <section className="section-pad relative scroll-mt-24 overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-blue/25 blur-[130px]" />

      <Container className="relative">
        <SectionHeading
          eyebrow="Why We Exist"
          tone="dark"
          title={
            <>
              We exist to solve{" "}
              <span className="text-gradient-light">real problems</span>
            </>
          }
          description="Metadox was built for the people technology usually leaves out."
        />

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-3">
          {whoWeServe.map((w) => (
            <StaggerItem key={w.title} className="h-full">
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-white/10 text-blue-bright">
                  <w.icon className="size-5" />
                </span>
                <h3 className="font-heading text-base font-bold text-white">
                  {w.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/70">{w.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 flex max-w-3xl flex-col items-center gap-4 text-center">
            <Globe2 className="size-6 text-blue-bright" />
            <p className="font-heading text-xl font-semibold leading-snug text-white sm:text-2xl">
              We believe technology should be a bridge — between countries,
              between skill levels, between opportunity and access.
            </p>
            <p className="text-base leading-relaxed text-white/70">
              Everything we build is a step toward making that bridge open to
              everyone.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

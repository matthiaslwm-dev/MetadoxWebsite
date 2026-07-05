import { ArrowRight, ShieldCheck, Globe2, Landmark, Workflow } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { partners } from "@/lib/content";

const differentiators = [
  {
    icon: ShieldCheck,
    title: "Practical & ROI-first",
    desc: "Outcomes over hype — every engagement is tied to measurable value.",
  },
  {
    icon: Globe2,
    title: "Singapore × China",
    desc: "Local expertise paired with China's world-class AI ecosystem.",
  },
  {
    icon: Landmark,
    title: "Grant-supported",
    desc: "We help you maximise EDG, SSG and SkillsFuture funding.",
  },
  {
    icon: Workflow,
    title: "End-to-end",
    desc: "From strategy and build to training and long-term scale.",
  },
];

export function About() {
  return (
    <section id="about" className="section-pad relative scroll-mt-24 bg-white">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>About Metadox</Eyebrow>
            <h2 className="mt-5 font-heading text-[1.9rem] font-bold leading-[1.1] tracking-tight text-navy sm:text-4xl md:text-[2.5rem]">
              Your bridge to an{" "}
              <span className="text-gradient">AI-ready future</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Metadox is a Singapore-based digital transformation consultancy.
              Beyond AI strategy, we deliver the full range of IT consulting
              and implementation — automation, software development, systems
              integration and data — combined with workforce upskilling and a
              unique bridge to China&apos;s AI ecosystem.
            </p>
            <div className="mt-8">
              <Button href="/#contact" size="lg">
                Book a free consultation
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </Button>
            </div>
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-2">
            {differentiators.map((d) => (
              <StaggerItem key={d.title} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-canvas p-6 transition-colors hover:border-blue/30">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-blue-soft text-blue">
                    <d.icon className="size-5" />
                  </span>
                  <h3 className="font-heading text-base font-bold text-navy">
                    {d.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{d.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Partner wall */}
        <div className="mt-16 border-t border-line pt-14">
          <Reveal className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Trusted by organisations &amp; partners
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
              {partners.map((p) => (
                <div
                  key={p.name}
                  className="group flex items-center justify-center bg-white px-4 py-7 transition-colors hover:bg-canvas"
                >
                  <span className="font-heading text-base font-semibold tracking-tight text-muted transition-colors duration-300 group-hover:text-navy sm:text-lg">
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

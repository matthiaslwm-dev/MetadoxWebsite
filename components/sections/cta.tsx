import { Building2, Users, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/motion";
import { siteConfig } from "@/lib/site";

const mail = (subject: string) =>
  `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}`;

export function CTA() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-brand-gradient py-24 text-white sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-blue/25 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-bright/20 blur-[110px]" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
              Get Started
            </p>
            <h2 className="mt-5 font-heading text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl md:text-[3.25rem]">
              Ready to find out your AI readiness?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              Take the first step in minutes. Discover where you stand, get a
              tailored roadmap, and see exactly how AI can move your business
              forward.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                href={mail("Business AI Readiness Assessment")}
                variant="light"
                size="lg"
              >
                <Building2 className="size-4" />
                Business Assessment
              </Button>
              <Button
                href={mail("AI Skills Readiness Assessment")}
                variant="glass"
                size="lg"
              >
                <Users className="size-4" />
                Workforce Assessment
              </Button>
            </div>

            <div className="mt-6">
              <a
                href={mail("Free AI Consultation")}
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                or book a free consultation
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-10 text-sm text-white/55">
              Prefer email?{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
              >
                {siteConfig.contact.email}
              </a>
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

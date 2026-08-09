import {
  Building2,
  CalendarCheck,
  Check,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/motion";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { primaryCta, siteConfig } from "@/lib/site";

const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
  "Hello, I'd like to learn more about your pricing.",
)}`;

const standardFeatures = [
  "Full discovery & requirements document",
  "Custom-built to your exact specification",
  "Integrated with your existing tools",
  "Tested and handed over working",
  "30-day post-launch support",
  "You own all code, systems & workflows",
  "No monthly fees to us",
];

const enterpriseFeatures = [
  "Dedicated project team across the engagement",
  "Architecture & system design upfront",
  "AI systems, private deployments & multi-agent workflows",
  "Full integration into your existing infrastructure",
  "IP and source code ownership transferred",
  "Ongoing retainer options available",
];

export function PricingPlans() {
  return (
    <section className="relative scroll-mt-24 bg-white py-20 sm:py-24">
      <Container>
        <div className="mx-auto grid max-w-5xl items-start gap-5 lg:grid-cols-2">
          {/* Standard build (featured) */}
          <Reveal className="h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-brand-gradient p-8 text-white sm:p-9">
              <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-30" />
              <div className="pointer-events-none absolute -left-10 bottom-0 h-64 w-64 rounded-full bg-blue-bright/20 blur-[100px]" />

              <div className="relative flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-white/15 text-white">
                    <Zap className="size-5" />
                  </span>
                  <span className="rounded-full border border-white/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
                    Standard Build
                  </span>
                </div>

                <h2 className="mt-6 font-heading text-2xl font-bold leading-tight text-white sm:text-3xl">
                  Project Build
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  For businesses that need a specific solution built: a website,
                  custom software, automation, AI workflow or systems
                  integration. Scoped, built, and handed over working.
                </p>

                <div className="mt-6 rounded-xl border border-white/15 bg-white/10 px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                    Starting from
                  </p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-heading text-4xl font-extrabold text-white">
                      $500
                    </span>
                    <span className="text-base text-white/60">– $5,000</span>
                  </div>
                  <p className="mt-1 text-xs text-white/50">
                    One-time project fee. No monthly charges to us.
                  </p>
                </div>

                <ul className="mt-7 flex-1 space-y-3">
                  {standardFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-white" />
                      <span className="text-sm leading-snug text-white/85">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-xl border-2 border-white/40 p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 size-5 shrink-0 text-white" />
                    <div>
                      <p className="text-sm font-bold text-white">
                        100% Money-Back Guarantee
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-white/80">
                        If we don&apos;t deliver exactly what&apos;s agreed in
                        your proposal and requirements, you get every dollar
                        back. No questions asked.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Button href={primaryCta.href} variant="light" size="lg">
                    <CalendarCheck className="size-4" />
                    Book a FREE Strategy Call
                  </Button>
                  <Button href={whatsappHref} variant="whatsapp" size="lg">
                    <WhatsAppIcon className="size-5" />
                    Message us on WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Enterprise */}
          <Reveal delay={0.08} className="h-full">
            <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-8 shadow-soft sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-blue/20 bg-blue-soft text-blue">
                  <Building2 className="size-5" />
                </span>
                <span className="rounded-full border border-blue/30 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-blue">
                  Enterprise
                </span>
              </div>

              <h2 className="mt-6 font-heading text-2xl font-bold leading-tight text-navy sm:text-3xl">
                Enterprise &amp; Partnership
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                For organisations with complex needs: multi-system
                transformation, private AI deployments, data platforms and deep
                integration across departments. We scope this together on a
                call.
              </p>

              <ul className="mt-7 space-y-3">
                {enterpriseFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-blue" />
                    <span className="text-sm leading-snug text-muted">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-xl border border-line bg-canvas p-4">
                <p className="text-sm italic leading-relaxed text-muted">
                  We ask that you book a call before we commit to anything. We
                  invest real time and expertise in every engagement, and just
                  as we value yours, we ask you to value ours.
                </p>
              </div>

              <div className="mt-auto pt-6">
                <Button href={primaryCta.href} size="lg" className="w-full">
                  <CalendarCheck className="size-4" />
                  Book a Strategy Call
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

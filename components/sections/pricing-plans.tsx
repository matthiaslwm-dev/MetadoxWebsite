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
import { siteConfig } from "@/lib/site";

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

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
                  <Button href="/book" variant="light" size="lg">
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
                <Button href="/book" size="lg" className="w-full">
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

import { CalendarCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/motion";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { primaryCta, siteConfig } from "@/lib/site";

const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
  "Hello, I'd like to talk about digital transformation for my business.",
)}`;

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
              Your digital transformation starts with a conversation.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              Every business is different. We take the time to understand your
              goals, challenges, and opportunities before recommending the right
              solution. If we&rsquo;re the right partner, we&rsquo;ll build a
              roadmap together.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={whatsappHref} variant="light" size="lg">
                <WhatsAppIcon className="size-5" />
                Chat on WhatsApp
              </Button>
              <Button href={primaryCta.href} variant="glass" size="lg">
                <CalendarCheck className="size-4" />
                {primaryCta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

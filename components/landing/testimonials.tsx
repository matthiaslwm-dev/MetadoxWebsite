import { Quote } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { testimonials } from "@/lib/landing-content";

export function LandingTestimonials() {
  return (
    <section id="testimonials" className="relative bg-lp-muted/30 px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="mb-16 text-center">
          <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-lp-primary">
            Testimonials
          </span>
          <h2 className="mb-4 text-2xl font-bold text-lp-foreground sm:text-3xl md:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-lp-muted-foreground">
            Trusted by founders and executives who value results over hype.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) =>
            testimonial.comingSoon ? (
              <StaggerItem
                key={index}
                className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-lp-border bg-lp-card/40 p-6 text-center opacity-60"
              >
                <Quote className="mb-4 h-8 w-8 text-lp-muted-foreground/40" />
                <p className="text-sm text-lp-muted-foreground">
                  {testimonial.quote}
                </p>
              </StaggerItem>
            ) : (
              <StaggerItem
                key={index}
                className="flex h-full flex-col rounded-2xl border border-lp-border bg-lp-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-lp-primary/30 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none"
              >
                <Quote className="mb-4 h-8 w-8 text-lp-primary/40" />
                <blockquote className="mb-6 grow text-base leading-relaxed text-lp-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="border-t border-lp-border pt-4">
                  {testimonial.name && (
                    <p className="font-semibold text-lp-foreground">
                      {testimonial.name}
                    </p>
                  )}
                  {testimonial.title && (
                    <p className="text-sm text-lp-muted-foreground">
                      {testimonial.title}
                    </p>
                  )}
                  {testimonial.subtitle && (
                    <p className="text-sm text-lp-primary">
                      {testimonial.subtitle}
                    </p>
                  )}
                </div>
              </StaggerItem>
            ),
          )}
        </Stagger>
      </div>
    </section>
  );
}

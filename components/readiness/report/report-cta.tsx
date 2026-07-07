import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { primaryCta } from "@/lib/site";

export function ReportCta() {
  return (
    <div className="rounded-[1.75rem] bg-brand-gradient p-8 text-center shadow-lift sm:p-12">
      <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
        Want to Know What to Fix First?
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-white/75">
        Your assessment shows your current AI readiness and the first improvement opportunity. In a
        complimentary strategy session, Metadox will review your results, validate the gaps, and recommend
        the most practical digitalisation and AI path for your business.
      </p>
      <div className="mt-8 flex justify-center">
        <Button href={primaryCta.href} variant="light" size="lg">
          Book Complimentary Strategy Session
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

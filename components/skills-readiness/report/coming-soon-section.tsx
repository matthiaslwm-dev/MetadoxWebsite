import { Sparkles } from "lucide-react";

export function ComingSoonSection() {
  return (
    <div className="rounded-[1.75rem] border border-line bg-white p-8 text-center shadow-soft sm:p-12">
      <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-blue-soft text-blue">
        <Sparkles className="size-6" />
      </span>
      <h2 className="mt-5 font-heading text-2xl font-bold text-navy sm:text-3xl">
        Personalised Learning Recommendations Coming Soon
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-muted">
        We&apos;re currently building personalised AI learning pathways and professional training programmes.
        Soon you&apos;ll be able to receive customised course recommendations based on your assessment results.
      </p>
      <p className="mx-auto mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted">
        For now, thank you for completing your AI Skills Readiness Assessment.
      </p>
    </div>
  );
}

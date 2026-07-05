import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import type { PortfolioProject } from "@/lib/content";

export function BusinessImpact({ project }: { project: PortfolioProject }) {
  return (
    <section className="relative scroll-mt-24 overflow-hidden bg-navy py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0 grid-lines-dark opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-blue/25 blur-[140px]" />

      <Container className="relative">
        <SectionHeading
          tone="dark"
          eyebrow="Business Impact"
          title={
            <>
              What this means <span className="text-gradient-light">day to day</span>
            </>
          }
          description={project.businessImpact.description}
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {project.businessImpact.stats.map((stat) => (
            <StaggerItem key={stat.label} className="h-full">
              <div className="ring-gradient flex h-full flex-col gap-4 rounded-3xl bg-gradient-to-b from-blue/[0.12] to-white/[0.03] p-7">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-white/10 text-blue-bright">
                  <stat.icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    {stat.label}
                  </p>
                  <p className="mt-2 font-heading text-2xl font-bold leading-tight text-white sm:text-3xl">
                    {stat.value}
                  </p>
                  {stat.detail && (
                    <p className="mt-1 text-sm font-medium text-white/70">
                      {stat.detail}
                    </p>
                  )}
                  {stat.note && (
                    <p className="mt-1 text-sm font-semibold text-blue-bright">
                      {stat.note}
                    </p>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

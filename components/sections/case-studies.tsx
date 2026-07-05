"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import {
  featuredProjects,
  featuredProjectValueProps,
  type FeaturedProject,
} from "@/lib/content";
function ProjectCard({ project }: { project: FeaturedProject }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-canvas px-3 py-1 text-xs font-medium text-blue">
        <project.badgeIcon className="size-3.5" />
        {project.badge}
      </span>

      <h3 className="mt-5 font-heading text-xl font-bold text-navy">
        {project.name}
      </h3>
      <p className="mt-2 line-clamp-3 min-h-[4.3rem] text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-line/70 pt-5">
        {project.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <stat.icon className="size-4 text-blue" />
            <p className="font-heading text-base font-bold leading-tight text-navy">
              {stat.value}
            </p>
            <p className="text-xs leading-snug text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className="mt-5 flex w-full items-center justify-between border-t border-line/70 pt-5 text-left text-xs font-semibold uppercase tracking-wide text-blue"
      >
        {expanded ? "Hide details" : "View details"}
        <ChevronDown
          className={`size-4 transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-3 pt-5 sm:grid-cols-2">
              <div className="rounded-xl border border-red-100 bg-red-50/50 p-3">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-red-500">
                  <AlertCircle className="size-3.5" />
                  The Problem
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink/70">
                  {project.problem}
                </p>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-600">
                  <CheckCircle2 className="size-3.5" />
                  Our Solution
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink/70">
                  {project.solution}
                </p>
              </div>
            </div>

            {project.techStack ? (
              <div className="mt-5 border-t border-line/70 pt-5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                  Tech Stack
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech.name}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-ink/70"
                    >
                      <tech.icon className={`size-4 ${tech.colorClassName}`} />
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {project.partners ? (
              <div className="mt-5 border-t border-line/70 pt-5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                  Partners
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  {project.partners.map((partner) => (
                    <span key={partner.name} className="flex items-baseline gap-1">
                      <span
                        className={`font-heading text-sm font-extrabold ${partner.accentClassName}`}
                      >
                        {partner.name}
                      </span>
                      {partner.caption ? (
                        <span className="text-[10px] font-medium uppercase tracking-wide text-muted">
                          {partner.caption}
                        </span>
                      ) : null}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-6 h-9">
        {project.slug ? (
          <Button href={`/projects/${project.slug}`} variant="outline" size="sm">
            See More
            <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
          </Button>
        ) : null}
      </div>
    </article>
  );
}

export function CaseStudies() {
  return (
    <section id="results" className="section-pad relative scroll-mt-24 bg-canvas">
      <Container>
        <SectionHeading
          eyebrow={
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="size-3.5" />
              Featured Projects
            </span>
          }
          title={
            <>
              Projects we&apos;ve <span className="text-gradient">built.</span>
            </>
          }
          description="Every project solves a real operational problem. We focus on automation, measurable improvements and long-term business value."
        />

        <Stagger className="mt-14 grid items-start gap-6 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <StaggerItem key={project.name}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger className="mt-16 grid gap-8 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProjectValueProps.map((prop) => (
            <StaggerItem key={prop.title}>
              <div className="flex items-start gap-3.5">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-soft text-blue">
                  <prop.icon className="size-5" />
                </span>
                <div>
                  <p className="font-heading text-sm font-bold text-navy">{prop.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{prop.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

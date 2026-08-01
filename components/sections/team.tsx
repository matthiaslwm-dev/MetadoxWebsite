import { User } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
};

// Placeholder roster — swap in real names, photos and bios when available.
const team: TeamMember[] = [
  {
    name: "Founder Name",
    role: "Co-Founder & CEO",
    bio: "Leads vision and strategy, setting the direction for Metadox's digital transformation practice.",
  },
  {
    name: "Founder Name",
    role: "Co-Founder",
    bio: "Drives partnerships and the Singapore–China innovation bridge that underpins Metadox's approach.",
  },
];

/** Placeholder entries have no profile yet — render a static chip, not a dead link. */
function isLiveProfile(href?: string) {
  return Boolean(href && href.startsWith("http"));
}

export function Team() {
  return (
    <section id="team" className="section-pad relative scroll-mt-24 bg-canvas">
      <Container>
        <SectionHeading
          title="Meet the Team"
          description="The people behind Metadox."
        />
        <Reveal delay={0.05} className="mt-3 text-center">
          <p className="text-gradient-electric text-xs font-semibold uppercase tracking-[0.2em]">
            Founded in 2026
          </p>
        </Reveal>

        <Stagger className="mx-auto mt-14 grid max-w-2xl gap-5 sm:grid-cols-2">
          {team.map((member) => (
            <StaggerItem key={member.name + member.role} className="h-full">
              <div className="flex h-full flex-col items-center rounded-2xl border border-line bg-white p-7 text-center shadow-soft transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-blue/30 hover:shadow-lift">
                <span className="flex size-20 items-center justify-center rounded-full bg-blue-soft text-blue ring-1 ring-inset ring-blue/20">
                  <User className="size-8" />
                </span>

                <h3 className="mt-5 font-heading text-lg font-bold text-navy">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-blue">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {member.bio}
                </p>

                <div className="mt-auto pt-5">
                  {isLiveProfile(member.linkedin) ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-navy transition-colors hover:border-blue/40 hover:bg-blue-soft"
                    >
                      <LinkedInIcon className="size-3.5" />
                      LinkedIn
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-3 py-1.5 text-xs font-medium text-muted">
                      <LinkedInIcon className="size-3.5" />
                      LinkedIn
                    </span>
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

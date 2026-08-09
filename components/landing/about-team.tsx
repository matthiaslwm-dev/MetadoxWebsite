import Image from "next/image";
import { User } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { aboutTeam } from "@/lib/landing-content";

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

/** Placeholder entries have no profile yet — render a static chip, not a dead link. */
function isLiveProfile(href?: string) {
  return Boolean(href && href.startsWith("http"));
}

export function LandingAboutTeam() {
  return (
    <section id="team" className="relative scroll-mt-24 bg-lp-muted/60 px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="mb-16 text-center">
          <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-lp-primary">
            {aboutTeam.eyebrow}
          </span>
          <h2 className="mb-4 text-balance text-2xl font-bold leading-tight text-lp-foreground sm:text-3xl md:text-4xl">
            {aboutTeam.heading}
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-lp-muted-foreground sm:text-lg">
            {aboutTeam.subhead}
          </p>
        </Reveal>

        <Stagger className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-2">
          {aboutTeam.members.map((member) => (
            <StaggerItem
              key={member.name + member.role}
              // An odd card at the end of the two-up grid spans both columns and
              // centres itself, rather than hanging off the left edge.
              className="flex h-full w-full flex-col items-center rounded-[1.25rem] border border-lp-border bg-lp-card p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-lp-primary/30 hover:shadow-lg sm:last:odd:col-span-2 sm:last:odd:mx-auto sm:last:odd:max-w-[calc(50%-0.75rem)]"
            >
              {/* Members without a portrait yet keep the generic avatar chip. */}
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  width={160}
                  height={160}
                  className="h-20 w-20 rounded-full border border-lp-border object-cover"
                />
              ) : (
                <span className="flex h-20 w-20 items-center justify-center rounded-full border border-lp-border bg-lp-muted text-lp-primary">
                  <User className="h-8 w-8" />
                </span>
              )}

              <h3 className="mt-5 text-lg font-bold leading-tight text-lp-foreground">
                {member.name}
              </h3>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-lp-primary">
                {member.role}
              </p>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-lp-muted-foreground">
                {member.bio}
              </p>

              <div className="mt-auto pt-6">
                {isLiveProfile(member.linkedin) ? (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-lp-border px-3 py-1.5 text-xs font-medium text-lp-foreground transition-colors hover:border-lp-primary/40 hover:text-lp-primary"
                  >
                    <LinkedInIcon className="h-3.5 w-3.5" />
                    LinkedIn
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-lp-border bg-lp-muted px-3 py-1.5 text-xs font-medium text-lp-muted-foreground">
                    <LinkedInIcon className="h-3.5 w-3.5" />
                    LinkedIn
                  </span>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

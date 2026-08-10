import Image from "next/image";
import { User } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { aboutTeam } from "@/lib/landing-content";

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
                <span className="block h-20 w-20 overflow-hidden rounded-full border border-lp-border">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                    style={{
                      objectPosition: member.imagePosition,
                      transform: member.imageZoom ? `scale(${member.imageZoom})` : undefined,
                    }}
                  />
                </span>
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
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

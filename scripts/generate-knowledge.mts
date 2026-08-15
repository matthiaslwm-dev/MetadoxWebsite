/**
 * Flattens the site's content modules into a single markdown knowledge base
 * consumed by the chat system prompt (lib/chat/prompt.ts). Run via
 * `npm run build:kb`; wired as a `prebuild` step so the KB can't drift from
 * the site copy it's generated from.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { siteConfig, calendlyUrl } from "../lib/site";
import * as content from "../lib/content";
import * as landing from "../lib/landing-content";
import * as geo from "../lib/geo-content";
import * as projects from "../lib/projects-content";
import { actionLibrary } from "../lib/readiness/actions";
import { skillActionLibrary } from "../lib/skills-readiness/actions";

const OUTPUT_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "lib",
  "chat",
  "knowledge.generated.md",
);

/** Drops icon components (LucideIcon/IconType), functions, and React elements. */
function stripNonSerializable(_key: string, value: unknown): unknown {
  if (typeof value === "function") return undefined;
  if (value && typeof value === "object" && "$$typeof" in value) return undefined;
  return value;
}

function section(title: string, data: unknown): string {
  const json = JSON.stringify(data, stripNonSerializable, 2);
  return `## ${title}\n\n\`\`\`json\n${json}\n\`\`\`\n`;
}

const sections: string[] = [];

sections.push(`# Metadox Knowledge Base\n\nGenerated from site content. Do not edit by hand — run \`npm run build:kb\`.\n`);

sections.push(
  section("Company", {
    ...siteConfig,
    calendlyUrl,
  }),
);

sections.push(
  "## Pricing\n\n" +
    [
      // The assistant must not quote figures: price tracks complexity, and a number
      // given before scope is understood either undersells the build or scares off a
      // fit. The public /pricing page still shows the published range; see the
      // pricing rule in lib/chat/prompt.ts for how the assistant handles being asked.
      "Project Build (standard): one-time project fee, no monthly charges. There is no fixed price and no standard quote: cost depends entirely on the complexity of what's being built, how many systems it touches, and how much of the work can be reused. This is worked out on the discovery call, never in chat.",
      "Includes: full discovery & requirements document, custom build to spec, integration with existing tools, testing and handover, 30-day post-launch support, client owns all code/systems/workflows.",
      "100% money-back guarantee: if Metadox doesn't deliver exactly what's agreed in the proposal and requirements, full refund, no questions asked.",
      "Enterprise & Partnership: for multi-system transformation, private AI deployments, data platforms and deep integration across departments. Scoped together on a call, no fixed price. Includes a dedicated project team, architecture & system design upfront, IP/source code ownership transferred, ongoing retainer options available.",
      "Government grants may offset cost for eligible Singapore businesses (see Grants section).",
    ].join("\n") +
    "\n",
);

sections.push(
  section("What We Build", {
    buildCards: landing.buildCards,
    whatWeBuild: landing.whatWeBuild,
    processSteps: landing.processSteps,
    solutions: content.solutions,
    frameworkSteps: content.frameworkSteps,
  }),
);

sections.push(
  section("Grants (Singapore)", content.grants),
);

sections.push(
  section("Case Studies & Portfolio", {
    caseStudies: content.caseStudies,
    featuredProjects: content.featuredProjects,
    showcaseProjects: projects.showcaseProjects,
    portfolioProjects: content.portfolioProjects,
  }),
);

sections.push(
  section("Testimonials", landing.testimonials),
);

sections.push(
  section("About Metadox", {
    landingAbout: landing.landingAbout,
    aboutHero: landing.aboutHero,
    aboutStory: landing.aboutStory,
    aboutFoundation: landing.aboutFoundation,
    aboutTeam: landing.aboutTeam,
  }),
);

sections.push(
  section("Booking a Discovery Call", landing.bookingPage),
);

sections.push(
  section("GEO (Generative Engine Optimisation) Service", {
    geoDefinition: geo.geoDefinition,
    geoProblem: geo.geoProblem,
    geoServices: geo.geoServices,
    geoProcess: geo.geoProcess,
    geoComparison: geo.geoComparison,
  }),
);

sections.push(section("GEO FAQ", geo.geoFaq.items));

sections.push(
  "## Common Pain Points and How Metadox Helps\n\n" +
    "These are pain-point-specific pitches surfaced during the readiness assessments. Use them to recognise a visitor's problem and explain how Metadox helps, in your own words.\n\n" +
    section("Business pain points", actionLibrary).replace(/^## [^\n]+\n\n/, "") +
    section("Individual/skills pain points", skillActionLibrary).replace(/^## [^\n]+\n\n/, ""),
);

const output = sections.join("\n");
writeFileSync(OUTPUT_PATH, output, "utf-8");

const wordCount = output.split(/\s+/).length;
console.log(`Knowledge base written to ${OUTPUT_PATH} (${wordCount} words, ${output.length} chars)`);

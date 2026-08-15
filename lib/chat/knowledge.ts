import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Splits knowledge.generated.md into named sections and serves them on demand
 * via the `get_knowledge` tool (lib/chat/tools.ts), instead of inlining the
 * whole file into every system prompt (lib/chat/prompt.ts). Keep this hint
 * map in sync with the `## ` section titles generate-knowledge.mts produces.
 */
const SECTION_HINTS: Record<string, string> = {
  Company: "name, contact info, socials",
  Pricing: "how pricing works, the money-back guarantee, grants",
  "What We Build": "services offered, delivery process, solutions list",
  "Grants (Singapore)": "EDG / SkillsFuture funding that can offset cost",
  "Case Studies & Portfolio": "real project results with numbers (InvoiceFlow, Compass, training)",
  Testimonials: "client quotes",
  "About Metadox": "company story, mission, team",
  "Booking a Discovery Call": "what the discovery call covers",
  "GEO (Generative Engine Optimisation) Service": "AI-search visibility service: what it is, what's included",
  "GEO FAQ": "common GEO questions answered",
  "Common Pain Points and How Metadox Helps": "pitch angles for specific business pain points",
};

type KnowledgeBase = {
  sections: Map<string, string>;
  titles: string[];
};

let cached: KnowledgeBase | null = null;

function load(): KnowledgeBase {
  if (cached) return cached;

  let raw: string;
  try {
    raw = readFileSync(path.join(process.cwd(), "lib", "chat", "knowledge.generated.md"), "utf-8");
  } catch {
    raw = "";
  }

  const sections = new Map<string, string>();
  const matches = [...raw.matchAll(/^## (.+)$/gm)];
  matches.forEach((match, i) => {
    const title = match[1].trim();
    const start = match.index! + match[0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index! : raw.length;
    sections.set(title, raw.slice(start, end).trim());
  });

  cached = { sections, titles: [...sections.keys()] };
  return cached;
}

/** Section titles available to the get_knowledge tool, in file order. */
export function getKnowledgeSectionTitles(): string[] {
  return load().titles;
}

/** Raw markdown content of one section, or undefined if the title doesn't match. */
export function getKnowledgeSection(title: string): string | undefined {
  return load().sections.get(title);
}

/** Short "Title: hint" index for the system prompt, so the model knows what it can look up. */
export function getKnowledgeIndex(): string {
  const { titles } = load();
  if (titles.length === 0) return "(knowledge base unavailable — run `npm run build:kb`)";
  return titles.map((title) => `- ${title}: ${SECTION_HINTS[title] ?? "see section"}`).join("\n");
}

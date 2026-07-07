import type { ActionKey, QuickWin } from "./types";

export const actionLibrary: Record<ActionKey, QuickWin> = {
  "centralise-data": {
    title: "Centralise Your Customer & Business Data",
    whyFirst:
      "Your data is currently scattered across files, tools and people. Bringing it into one place is the foundation everything else — reporting, automation, AI — depends on.",
    potentialImpact: "Faster, more reliable decisions and less time lost searching for information.",
    difficulty: "Medium",
    metadoxHelp:
      "Metadox designs and builds the centralised data structure your business needs, then migrates your existing records into it safely.",
  },
  "migrate-to-cloud": {
    title: "Migrate to Cloud Storage",
    whyFirst:
      "Local files and paper records limit access, collaboration and backup. Moving to the cloud is a quick, low-risk step that unlocks everything after it.",
    potentialImpact: "Your team can access accurate information from anywhere, with far less risk of losing data.",
    difficulty: "Low",
    metadoxHelp: "Metadox handles the cloud setup and data migration end-to-end, with minimal disruption to your team.",
  },
  "integrate-systems": {
    title: "Integrate Your Core Systems",
    whyFirst:
      "Your systems don't currently talk to each other, so your team re-enters the same information more than once. Connecting them removes that duplicated work.",
    potentialImpact: "Less manual re-entry, fewer mismatched records, and a clearer picture across the business.",
    difficulty: "Medium",
    metadoxHelp: "Metadox connects your existing software through integrations and APIs, so data flows automatically.",
  },
  "automate-repetitive": {
    title: "Automate a Repetitive Process",
    whyFirst:
      "Your team is spending significant hours a week on repetitive admin — this is the fastest, most visible win available right now.",
    potentialImpact: "Meaningful hours freed up every week for higher-value work.",
    difficulty: "Low",
    metadoxHelp: "Metadox builds targeted workflow automations around the exact process costing you the most time.",
  },
  "reporting-dashboard": {
    title: "Build a Simple Reporting Dashboard",
    whyFirst:
      "Reporting today is manual and inconsistent, which makes it hard to trust the numbers or act on them quickly.",
    potentialImpact: "Real-time visibility into performance, without waiting on someone to compile a report.",
    difficulty: "Medium",
    metadoxHelp: "Metadox builds a live dashboard connected directly to your existing data sources.",
  },
  "train-staff": {
    title: "Create a Staff AI Training Plan",
    whyFirst:
      "Your team has little to no structured exposure to AI tools yet. A short, practical training programme builds confidence before rolling out anything more advanced.",
    potentialImpact: "A team that's comfortable and confident using AI in everyday work.",
    difficulty: "Low",
    metadoxHelp: "Metadox delivers hands-on AI training workshops tailored to your team's day-to-day workflows.",
  },
  "ai-policy": {
    title: "Create an AI Usage Policy",
    whyFirst:
      "Your business doesn't yet have clear guidelines for how AI should and shouldn't be used — an easy, low-cost step to put in place before adoption widens.",
    potentialImpact: "Safer, more consistent AI use across the business, with clear boundaries for staff.",
    difficulty: "Low",
    metadoxHelp: "Metadox drafts a practical AI usage policy tailored to your business and industry.",
  },
  "apply-ai": {
    title: "Apply AI to Your Highest-Value Process",
    whyFirst:
      "Your data, systems and workflows are in good shape — you're ready to apply AI directly to a high-value process for a measurable improvement.",
    potentialImpact: "A meaningful jump in speed, accuracy or output on the process you choose.",
    difficulty: "Medium",
    metadoxHelp: "Metadox identifies the highest-impact AI use case for your business and implements it end-to-end.",
  },
};

/**
 * Copy for the GEO (Generative Engine Optimisation) page.
 *
 * Kept separate from `landing-content.ts` because this is a single service
 * page with its own narrative, and nothing here is shared with the landing or
 * about pages. Editing one is not meant to move the other.
 */

import {
  BarChart3,
  BookOpenCheck,
  FileSearch,
  Gauge,
  Layers,
  MessageSquareQuote,
  Network,
  Quote,
  Radar,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/* --------------------------------- Hero ---------------------------------- */

export const geoHero = {
  gradientLine: "Generative Engine Optimisation",
  headline: "Get your business recommended by AI.",
  subhead:
    "When your customers ask AI who to choose, we make sure your business is the answer, not your competitor.",
  /** Engine pills under the hero CTAs. `dot` is the assistant's brand colour. */
  coversLabel: "Covers",
  engines: [
    { name: "ChatGPT", dot: "#10A37F" },
    { name: "Gemini", dot: "#4285F4" },
    { name: "Perplexity", dot: "#8B5CF6" },
    { name: "Claude", dot: "#D97757" },
  ],
} as const;

/* ------------------------------ What is GEO ------------------------------- */

export const geoDefinition = {
  eyebrow: "The Basics",
  heading: "What is Generative Engine Optimisation?",
  paragraphs: [
    "Generative Engine Optimisation, or GEO, helps your business get found and recommended by AI tools like ChatGPT, Gemini, Perplexity, Copilot, and Google AI.",
    "Traditional SEO helps your business appear higher in Google search results. GEO helps your business appear directly in the answers people get from AI.",
    "When someone asks AI for a product, service, or recommendation, GEO increases the chances of your business being one of the answers they see.",
  ],
} as const;

/* ------------------------------- The Problem ------------------------------ */

export type GeoProblemStep = {
  num: string;
  label: string;
  title: string;
  body: string;
};

/**
 * Scroll-scrubbed problem section. The three steps advance as the panel is
 * pinned, and the chat mock escalates alongside them: typing, then an answer
 * naming competitors, then the warning.
 *
 * The competitor names are invented. Do not swap in real businesses: putting a
 * named company in a fabricated AI recommendation is a claim we cannot stand
 * behind.
 */
export const geoProblem = {
  eyebrow: "The Problem",
  headingLines: ["Search moved", "into the chatbox."],
  subhead:
    "AI now answers the questions your buyers used to ask Google. If it cannot see you, you are not in the conversation.",
  steps: [
    {
      num: "01",
      label: "Discovery",
      title: "Buyers ask AI first",
      body: "Before they visit a website or read a review, your customers ask AI who to choose. That answer becomes their shortlist.",
    },
    {
      num: "02",
      label: "The Risk",
      title: "AI names your competitors",
      body: "If AI does not know enough about you, it confidently recommends someone else, by name, in your category.",
    },
    {
      num: "03",
      label: "Blind Spot",
      title: "You never see it happen",
      body: "It never shows up in your analytics. The lost sale looks like it never happened, and that is the part that costs the most.",
    },
  ] as GeoProblemStep[],
  chat: {
    url: "chatgpt.com",
    question: "Who's the best digital transformation consultancy in Singapore?",
    answerLead: "Great question. I'd go with",
    /** Invented names. See the note above before changing these. */
    competitors: ["Northpoint", "Vertex Labs", "Lumen Digital"],
    answerTail: "They're the most established and the best documented.",
    warning:
      "Your brand was left out of the answer, so the buyer's shortlist formed without you.",
  },
} as const;

/* ---------------------------- AI Visibility Score -------------------------- */

export type GeoMetric = {
  label: string;
  pct: number;
  level: string;
  /** Bar fill. */
  color: string;
  /** Lighter tone for the matching gauge arc. */
  arc: string;
};

/**
 * The score card. `metrics` drives both the bars and the gauge: each arc is
 * sized from its metric's `pct`, so the dial can never drift out of step with
 * the numbers beside it.
 *
 * The 38 is illustrative of a typical unoptimised brand, not a measurement of
 * anyone in particular. `caption` says so on the page, and it needs to keep
 * saying so if these numbers change.
 */
export const geoScore = {
  eyebrow: "AI Visibility Score",
  headingLead: "Every brand has an",
  headingAccent: "AI Score",
  headingRest: "Most are losing without knowing it.",
  subhead:
    "If AI never mentions your brand when buyers ask for recommendations, you are invisible at the moment that matters. We show you exactly where you stand.",
  ctaLabel: "Get Your Free AI Score",
  gauge: {
    score: 38,
    max: 100,
    badge: "Low Visibility",
    caption: "Typical score for a business before GEO work.",
  },
  panelHeading: "AI checks for three things.",
  panelHeadingAccent: "Most brands fail all three.",
  panelSubhead:
    "AI recommends the brands it understands and trusts. When those signals are thin, it names someone else instead. That is what we fix.",
  metrics: [
    { label: "Visibility", pct: 38, level: "Low", color: "#EF4444", arc: "#EF4444" },
    { label: "Authority", pct: 45, level: "Low", color: "#F97316", arc: "#FB923C" },
    { label: "Coverage", pct: 53, level: "Average", color: "#EAB308", arc: "#FDE68A" },
  ] as GeoMetric[],
} as const;

/* ------------------------------- SEO vs GEO ------------------------------- */

export type GeoComparisonRow = {
  aspect: string;
  seo: string;
  geo: string;
};

export const geoComparison = {
  eyebrow: "The Shift",
  heading: "SEO gets you ranked. GEO gets you recommended.",
  subhead:
    "The two work together, but they are not the same discipline. Here is where they part ways.",
  seoLabel: "Traditional SEO",
  geoLabel: "Generative Engine Optimisation",
  rows: [
    {
      aspect: "Goal",
      seo: "Rank a page in a list of results.",
      geo: "Be named and cited inside the answer.",
    },
    {
      aspect: "Surface",
      seo: "Ten blue links on a results page.",
      geo: "One generated response, often with no links at all.",
    },
    {
      aspect: "How you win",
      seo: "Keywords, backlinks, technical performance.",
      geo: "Clear facts, citable claims, structured entities, third-party mentions.",
    },
    {
      aspect: "Content style",
      seo: "Long pages written to hold attention.",
      geo: "Direct answers a model can lift, quote, and attribute.",
    },
    {
      aspect: "Measurement",
      seo: "Positions, impressions, organic clicks.",
      geo: "Share of AI answers, citation frequency, sentiment of the mention.",
    },
    {
      aspect: "Competition",
      seo: "Everyone on page one.",
      geo: "The two or three brands the model considers worth naming.",
    },
  ] as GeoComparisonRow[],
} as const;

/* ----------------------------- Why it matters ----------------------------- */

export type GeoReason = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const geoWhy = {
  eyebrow: "Why It Matters",
  heading: "Buying decisions are moving into the chat window",
  subhead:
    "AI assistants have become the first place people go with a question. That changes who gets discovered, and how.",
  reasons: [
    {
      title: "The answer replaces the search",
      description:
        "When an assistant gives one confident recommendation, most people act on it. The competitors it did not mention are effectively invisible, however well they rank on Google.",
      icon: MessageSquareQuote,
    },
    {
      title: "AI recommendations carry trust",
      description:
        "A model naming your business does not read like an advert. It reads like advice, and buyers treat it that way. That trust is difficult to buy and expensive to lose.",
      icon: ShieldCheck,
    },
    {
      title: "The buyer arrives pre-qualified",
      description:
        "By the time someone reaches you through an AI answer, they have already described their problem, compared options, and been pointed at you as the fit. The conversation starts much further along.",
      icon: Gauge,
    },
    {
      title: "Early movers get entrenched",
      description:
        "Models lean on established, consistent sources. Businesses that become the reference on a topic now are the ones assistants keep returning to later.",
      icon: Rocket,
    },
    {
      title: "Your competitors are already there",
      description:
        "Ask an assistant who the leading providers in your category are. Someone is being named today. The only question is whether it is you.",
      icon: Radar,
    },
    {
      title: "Silence is not neutral",
      description:
        "If the model has nothing solid to draw on, it fills the gap with whatever it can find: outdated pages, thin directory listings, or a competitor's description of your market.",
      icon: Search,
    },
  ] as GeoReason[],
} as const;

/* ------------------------------ What we do -------------------------------- */

export type GeoService = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const geoServices = {
  eyebrow: "What We Do",
  heading: "The work behind an AI recommendation",
  subhead:
    "GEO is not a single fix. It is a set of changes to how your business is described, structured, and referenced across the web.",
  items: [
    {
      title: "AI Visibility Audit",
      description:
        "We run the questions your customers actually ask across the major assistants and record what comes back: who gets named, what gets cited, and where you stand today.",
      icon: FileSearch,
    },
    {
      title: "Entity & Knowledge Setup",
      description:
        "We make your business machine-readable. Structured data, consistent descriptions, and clean profiles across the sources models rely on, so there is no ambiguity about who you are and what you do.",
      icon: Network,
    },
    {
      title: "Answer-Ready Content",
      description:
        "We rewrite and build content that answers real questions directly, in a form a model can lift and attribute, rather than long pages written only for human patience.",
      icon: BookOpenCheck,
    },
    {
      title: "Citation & Authority Building",
      description:
        "Assistants trust corroboration. We work on the third-party mentions, listings, and references that turn your claims into facts the model has seen more than once.",
      icon: Quote,
    },
    {
      title: "Technical Readiness",
      description:
        "Crawlability for AI agents, schema markup, clean site structure, and fast delivery, so the systems reading your site can actually parse what is on it.",
      icon: Layers,
    },
    {
      title: "Tracking & Reporting",
      description:
        "Ongoing monitoring of how often you appear, for which prompts, on which engines, and in what tone. You see the movement, not just the activity.",
      icon: BarChart3,
    },
  ] as GeoService[],
} as const;

/* -------------------------------- Process --------------------------------- */

export type GeoStep = {
  number: string;
  title: string;
  benefit: string;
  icon: LucideIcon;
  points: string[];
};

export const geoProcess = {
  eyebrow: "How We Work",
  heading: "From invisible to recommended",
  subhead:
    "A measured approach that starts with finding out where you actually stand, not with guessing.",
  steps: [
    {
      number: "01",
      title: "Audit & Benchmark",
      benefit: "Find out what AI says about you today.",
      icon: FileSearch,
      points: [
        "We build the prompt set your buyers use, from category questions to direct comparisons.",
        "We run them across ChatGPT, Gemini, Perplexity, Copilot, and Google AI answers.",
        "We record who gets named, which sources get cited, and how you are described.",
      ],
    },
    {
      number: "02",
      title: "Fix & Build",
      benefit: "Give the models something worth citing.",
      icon: Sparkles,
      points: [
        "We correct the entity data, structured markup, and profiles that define your business.",
        "We write and restructure content around the questions the audit showed you losing.",
        "We build the third-party references that corroborate your claims.",
      ],
    },
    {
      number: "03",
      title: "Track & Improve",
      benefit: "Visibility you can measure, month after month.",
      icon: BarChart3,
      points: [
        "We re-run the prompt set on a schedule and report the change in plain language.",
        "We watch for new competitors entering the answers and respond to them.",
        "We expand into new topics and prompts as your priorities shift.",
      ],
    },
  ] as GeoStep[],
} as const;

/* ---------------------------------- FAQ ----------------------------------- */

export type GeoFaq = {
  question: string;
  answer: string;
};

export const geoFaq = {
  eyebrow: "Questions",
  heading: "Common questions about GEO",
  items: [
    {
      question: "Does GEO replace SEO?",
      answer:
        "No. Good SEO still feeds the models, because assistants read the web that search engines index. GEO adds a second layer on top: being structured, factual, and corroborated enough that a model is willing to name you in an answer.",
    },
    {
      question: "How long before we see results?",
      answer:
        "You get a baseline visibility report within the first few weeks. Meaningful movement in AI answers usually takes two to three months, because models need time to pick up and reinforce the changes we make.",
    },
    {
      question: "Can you guarantee we appear in ChatGPT?",
      answer:
        "Nobody can guarantee that, and you should be careful with anyone who does. What we can do is remove the reasons a model would leave you out, then measure the change honestly and keep working at it.",
    },
    {
      question: "Is this only for large brands?",
      answer:
        "Not at all. Smaller, focused businesses often do better, because models reward specificity. Being clearly the best answer for a narrow question beats being one of many for a broad one.",
    },
    {
      question: "Do we need to rebuild our website?",
      answer:
        "Rarely. Most of the work is on structure, markup, and content on the site you already have. If the site itself is blocking AI crawlers or too slow to read, we will tell you plainly and scope that separately.",
    },
    {
      question: "How do you measure success?",
      answer:
        "Three things: how often you appear across the tracked prompt set, which sources the model cites when it names you, and whether the description of your business is accurate and favourable.",
    },
  ] as GeoFaq[],
} as const;

/* ---------------------------------- CTA ----------------------------------- */

/**
 * Closing banner. The engine names inside the sentence are rendered from
 * `geoHero.engines`, each tinted with its own dot colour, so the list here can
 * never drift out of step with the pills under the hero.
 */
export const geoCta = {
  eyebrow: "Get Started",
  heading: "Find out if you're invisible to AI.",
  subheadLead: "We'll run a free audit across",
  subheadTail: "and show you exactly where you stand.",
  whatsappMessage:
    "Hello, I'd like to find out how my business appears in AI search results.",
  whatsappLabel: "Message Us on WhatsApp",
  bookLabel: "Book a FREE Discovery Call",
} as const;

import {
  Bot,
  BrainCircuit,
  Clock,
  CodeXml,
  Compass,
  Eye,
  GraduationCap,
  PlugZap,
  Rocket,
  Search,
  Target,
  Video,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/* --------------------------------- Hero ---------------------------------- */

export const landingHero = {
  gradientLine: "AI & Digital Transformation",
  headline: "Make your business work for you.",
  subhead:
    "We turn repetitive work, inefficient processes, and operational bottlenecks into intelligent systems that save you time, reduce costs, and give your business more room to grow.",
  stats: [
    { value: "1–2 Weeks", label: "Deployment" },
    { value: "24/7", label: "AI Automation" },
    { value: "End-to-End", label: "Strategy to Launch" },
  ],
} as const;

/* ------------------------------ What We Build ----------------------------- */

export type BuildCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/**
 * The landing page's own six services. Deliberately NOT `solutions` from
 * `content.ts`: that list belongs to the archived services page and is framed
 * by capability ("Cloud Data Migration"), where these are framed by engagement
 * ("Training & Enablement"). Editing one is not meant to move the other.
 */
export const buildCards: BuildCard[] = [
  {
    title: "AI Strategy & Consulting",
    description:
      "We spend time in your business, work out where the hours are going, and tell you what's worth fixing first.",
    icon: BrainCircuit,
  },
  {
    title: "AI Agent Development",
    description:
      "An assistant that reads the inbox, updates the CRM and chases the follow-ups your team keeps forgetting.",
    icon: Bot,
  },
  {
    title: "Workflow Automation",
    description:
      "If someone on your team is copying data from one screen into another, that job should be running by itself.",
    icon: Workflow,
  },
  {
    title: "Integration & Deployment",
    description:
      "You keep the tools you already use. We make everything we build work inside Salesforce, Xero, Microsoft 365 and the rest of your systems.",
    icon: PlugZap,
  },
  {
    title: "Training & Enablement",
    description:
      "We show your team how it all works and write it down properly, so you're not stuck ringing us every time something changes.",
    icon: GraduationCap,
  },
  {
    title: "Custom Software",
    description:
      "Sometimes there's nothing on the market that does what you need. That's when we build it from scratch.",
    icon: CodeXml,
  },
];

/** Section header for the `buildCards` grid. */
export const whatWeBuild = {
  eyebrow: "What We Build",
  heading: "We build AI that works while you sleep",
  subhead:
    "Every business is different. We start by understanding your bottlenecks, then we build the right automation for you.",
  /**
   * Shared destination for all six cards: there are no per-service pages yet,
   * so every card sends visitors to the About page. Give `Solution` its own
   * `href` and read it here once those pages exist.
   */
  cardHref: "/about",
  cardCta: "Learn More",
} as const;

/* -------------------------------- Process -------------------------------- */

export type ProcessStep = {
  number: string;
  title: string;
  benefit: string;
  icon: LucideIcon;
  points: string[];
};

/**
 * The five-stage Metadox framework (see `frameworkSteps` in `content.ts`)
 * condensed into the three phases a first-time visitor needs to understand.
 */
export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover & Strategise",
    benefit: "Understand first, automate second.",
    icon: Search,
    points: [
      "We map how your business actually runs: workflows, handoffs, and where the time goes.",
      "We audit your technology and data, from CRMs and inboxes to spreadsheets and internal tools.",
      "We score the opportunities and turn them into a prioritised roadmap, not a wishlist.",
    ],
  },
  {
    number: "02",
    title: "Build & Integrate",
    benefit: "Custom systems, connected to what you already run.",
    icon: Wrench,
    points: [
      "We build the automations, AI agents and custom software your workflows need.",
      "We connect them to your existing CRM, ERP and internal systems so data flows in one place.",
      "We train your team and document the new process, so adoption outlasts the project.",
    ],
  },
  {
    number: "03",
    title: "Launch, Monitor & Optimize",
    benefit: "Continuous improvement, not a one-off project.",
    icon: Rocket,
    points: [
      "We launch with clear success metrics, safeguards and monitoring in place.",
      "We track KPIs, gather feedback from your team, and fix issues quickly.",
      "We keep refining the systems and expanding the roadmap as your business grows.",
    ],
  },
];

/* ------------------------------ Testimonials ------------------------------ */

export type Testimonial = {
  quote: string;
  name?: string;
  title: string;
  subtitle?: string;
  comingSoon?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "A lot of the work I used to do manually is now taken care of. It saves me hours every week and gives me more time to actually focus on my clients.",
    name: "John Tan",
    title: "Wealth Manager, AIA",
  },
  {
    quote: "More client stories coming soon.",
    title: "",
    comingSoon: true,
  },
  {
    quote: "More client stories coming soon.",
    title: "",
    comingSoon: true,
  },
];

/* --------------------------------- About ---------------------------------- */

export const landingAbout = {
  eyebrow: "About",
  heading: "Who We Are",
  name: "Metadox",
  paragraphs: [
    "Metadox is a Singapore based digital transformation consultancy. We help businesses adopt AI and modernise the technology they already depend on, from workflow automation and custom software to systems integration and data.",
    "We work the unglamorous way round: understanding the business before touching the tools. That means the systems we build get used, and the ones that would not have earned their keep never get built.",
    "Alongside implementation we upskill the people who have to live with the result, so your team can run and extend what we deliver rather than depending on us to do it.",
  ],
} as const;

/** Closing band on the landing page, sitting between testimonials and footer. */
export const landingCta = {
  eyebrow: "We don't take on every project",
  heading: "We work with a select number of clients at a time.",
  subhead:
    "It allows us to stay close to every project, move quickly, and give each solution the attention it deserves.",
  /** The invitation, split off so it can sit closer to the buttons it sets up. */
  invitation:
    "If you're ready to work smarter, move faster, and grow, let's talk about what we can build together.",
  whatsappLabel: "Message Us on WhatsApp",
  whatsappMessage:
    "Hello, I'd like to talk about AI and automation for my business.",
  bookLabel: "Book a Free Discovery Call",
} as const;

/* ------------------------------- About page ------------------------------- */

export const aboutHero = {
  eyebrow: "About Us",
  heading: "We make technology work for you.",
  subhead:
    "We help businesses and people use AI and automation to simplify work, save time, reduce costs, and create more room to grow.",
} as const;

/**
 * The story copy is client-approved. Treat the wording as fixed: only the
 * presentation around it is ours to change. `pullQuote` is the closing line and
 * renders as the rule-marked statement at the end of the section.
 */
export const aboutStory = {
  eyebrow: "Our Philosophy",
  heading: "What We Believe",
  paragraphs: [
    "We believe technology should make work easier, not more complicated.",
    "Every day, businesses and people spend hours on repetitive tasks like entering data, preparing reports, following up with customers, updating systems, and moving information from one place to another. These things need to get done, but they shouldn't take up so much of our time.",
    "That's where AI and automation can help. We build solutions that take care of the repetitive work in the background, using the tools and systems you already rely on.",
    "The goal isn't to replace people. It's to give people more time to think, create, build relationships, make better decisions, and focus on the work that actually matters.",
  ],
  pullQuote:
    "We don't use technology to replace people. We use it to give people back their time, so they can focus on what matters most.",
} as const;

export const aboutFoundation = {
  eyebrow: "Our Foundation",
  pillars: [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "Helping businesses transform with technology that is practical, scalable, and built to deliver measurable results.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "A future where technology makes work simpler, businesses smarter, and people more capable.",
    },
    {
      icon: Compass,
      title: "Our Approach",
      description:
        "Every business works differently. We start by understanding how you work, where time and money are being lost, and what can be improved. Then we build the right solution around you, focused on creating measurable results that last.",
    },
  ],
} as const;

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
  /** Portrait in /public. Members without one fall back to the generic avatar. */
  image?: string;
  /** CSS object-position for the portrait, e.g. "50% 20%". Defaults to center. */
  imagePosition?: string;
  /** Zoom multiplier applied to the portrait to crop in tighter on the face. */
  imageZoom?: number;
};

/** PLACEHOLDER roster — swap in real names, photos and bios when available. */
export const aboutTeam = {
  eyebrow: "The People",
  heading: "Meet the team",
  subhead: "The people behind Metadox.",
  members: [
    {
      name: "Matthias Lee",
      role: "Co-Founder",
      bio: "Leads the vision and strategy, bridging technology and business while leading the delivery team to turn ideas into practical solutions that solve real problems and create meaningful impact.",
      image: "/matthias.png",
    },
    {
      name: "Danny",
      role: "Co-Founder",
      bio: "Leads strategic management and leadership, aligning the team, guiding key decisions, and helping shape the company’s direction and growth.",
      image: "/Danny.jpg",
    },
    {
      name: "William Ang",
      role: "Chief Sales Officer",
      bio: "Leads commercial strategy and sales execution, turning technology into real business value, building lasting client relationships, and leading the sales team to drive growth and results.",
      image: "/william.jpg",
      imagePosition: "50% 65%",
      imageZoom: 1.7,
    },
  ] as TeamMember[],
} as const;

/* ------------------------------ Booking page ------------------------------ */

export const bookingPage = {
  eyebrow: "Free Discovery Call",
  heading: "Book your free discovery call",
  subhead:
    "In 30 minutes we will understand your business, find your highest-impact AI opportunities, and give you a clear view of what to do next. No sales pitch, no obligation.",
  trustPoints: [
    { icon: Clock, label: "30 minutes" },
    { icon: Video, label: "Online, link sent on booking" },
  ],
  agendaEyebrow: "The Agenda",
  agendaHeading: "What we'll cover",
  agenda: [
    {
      title: "Understand your business",
      detail:
        "We take a deep dive into your current workflows, systems and operations to uncover the inefficiencies, bottlenecks and repetitive tasks slowing you down.",
    },
    {
      title: "Find your highest-impact opportunities",
      detail:
        "Together we work out where AI and automation deliver the fastest return, which processes are ready for it, and where plain optimisation should come first.",
    },
    {
      title: "Leave with a clear roadmap",
      detail:
        "You get a prioritised action plan: recommended initiatives, likely quick wins and practical next steps, whether or not you choose to work with us.",
    },
  ],
  schedulerHeading: "Pick a time that suits you",
  schedulerNote:
    "We reserve dedicated time for every call. If you cannot make it, let us know in advance so we can arrange another slot.",
  fallbackHeading: "Open the booking calendar",
  fallbackBody:
    "The scheduler could not load here. You can still pick a time on Calendly directly.",
  fallbackCta: "Choose a time",
  loading: "Loading available times…",
} as const;

export const aboutCta = {
  heading: "Let's work out what to build first",
  subhead:
    "A short discovery call is enough to tell whether there is something here worth building. No pitch deck, no obligation.",
} as const;

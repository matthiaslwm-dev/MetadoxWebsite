import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { FaFileExcel, FaFilePdf, FaLinkedin } from "react-icons/fa6";
import { BsFileEarmarkSpreadsheetFill, BsOpenai } from "react-icons/bs";
import {
  SiN8N,
  SiSupabase,
  SiWhatsapp,
  SiResend,
  SiNextdotjs,
  SiInstagram,
  SiDigitalocean,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiDocker,
  SiVercel,
  SiGithub,
  SiZapier,
  SiClaude,
  SiGooglegemini,
} from "react-icons/si";
import {
  TrendingUp,
  GraduationCap,
  Handshake,
  Globe2,
  Building2,
  Users,
  Target,
  Map,
  Lightbulb,
  Gauge,
  BookOpen,
  Award,
  Compass,
  ClipboardList,
  Workflow,
  Landmark,
  CreditCard,
  Search,
  FileCheck,
  Bot,
  LineChart,
  Zap,
  Cloud,
  Plug,
  Mail,
  FileText,
  Table2,
  Bell,
  Repeat,
  AlertTriangle,
  Database,
  Clock,
  Hourglass,
  Coins,
  CheckCircle2,
  LayoutDashboard,
  User,
  PenLine,
  Send,
  Keyboard,
  ShieldCheck,
  Star,
  Monitor,
  Settings,
  Brain,
  Phone,
} from "lucide-react";

/* ---------------------------------- Hero ---------------------------------- */

export const heroFeatures: { label: string; icon: LucideIcon }[] = [
  { label: "Empowering Businesses", icon: Users },
  { label: "Upskilling People", icon: TrendingUp },
  { label: "Driving Productivity", icon: Lightbulb },
  { label: "Building an AI-Ready Future", icon: Target },
];

/* ------------------------------ AI Readiness ------------------------------ */

export type ReadinessCard = {
  id: string;
  audience: string;
  icon: LucideIcon;
  title: string;
  description: string;
  deliverables: { label: string; icon: LucideIcon }[];
  cta: string;
  href: string;
};

export const readinessCards: ReadinessCard[] = [
  {
    id: "business",
    audience: "For Businesses",
    icon: Building2,
    title: "Business AI Readiness",
    description:
      "Take our 5-minute assessment to discover exactly where your organisation stands — and what to do next.",
    deliverables: [
      { label: "Opportunity & gap analysis", icon: Target },
      { label: "Your AI readiness score", icon: Gauge },
      { label: "A tailored AI roadmap", icon: Map },
      { label: "Prioritised recommendations", icon: Lightbulb },
    ],
    cta: "Check Business AI Readiness",
    href: "/business-ai-readiness",
  },
  {
    id: "workforce",
    audience: "For Individuals",
    icon: Users,
    title: "AI Skills Readiness",
    description:
      "Take our AI Skills Assessment and get a personalised path to future-proof your career.",
    deliverables: [
      { label: "Your AI skills score", icon: Gauge },
      { label: "A personalised learning roadmap", icon: Map },
      { label: "Recommended courses", icon: BookOpen },
      { label: "Skill-gap insights", icon: Award },
    ],
    cta: "Check AI Skills Readiness",
    href: "/ai-skills-readiness",
  },
];

/* ---------------------------- Cost of Waiting ----------------------------- */

export const costOfWaiting = {
  business: {
    wait: [
      "Manual, repetitive processes",
      "Higher operating costs",
      "Slower, gut-based decisions",
      "A widening AI skills gap",
      "Falling behind competitors",
    ],
    act: [
      "Automated, streamlined workflows",
      "Lower costs, higher productivity",
      "Faster, data-driven decisions",
      "A stronger customer experience",
      "An AI-ready, confident workforce",
    ],
  },
  people: {
    wait: [
      "Skills fall behind as AI reshapes roles",
      "Stuck doing manual, repetitive tasks",
      "Career growth stalls without new capabilities",
      "Anxious about being replaced by AI",
      "Missed opportunities for higher-value work",
    ],
    act: [
      "Future-proofed skills that stay relevant",
      "Confident using AI to work faster",
      "Career growth accelerates with new capabilities",
      "Seen as a valuable, AI-ready professional",
      "Access to higher-value, higher-paid opportunities",
    ],
  },
};

/* ------------------------------- Framework -------------------------------- */

export type FrameworkAccent = "blue" | "teal" | "amber" | "purple";

export type FrameworkStep = {
  no: string;
  navLabel: string;
  title: string;
  tagline: string;
  accent: FrameworkAccent;
  icon: LucideIcon;
  description: string;
  points: string[];
  output: { icon: LucideIcon; label: string };
  duration: string;
};

export const frameworkSteps: FrameworkStep[] = [
  {
    no: "01",
    navLabel: "Plan",
    title: "Assess Your Business",
    tagline: "Understand. Identify. Prioritise.",
    accent: "blue",
    icon: Search,
    description:
      "We analyse your business, workflows and technology to uncover bottlenecks, inefficiencies and opportunities.",
    points: [
      "Business process review",
      "Workflow mapping & bottleneck analysis",
      "Digital maturity assessment",
      "Technology & data audit",
      "Stakeholder interviews & alignment",
      "Transformation roadmap & quick wins",
    ],
    output: { icon: FileText, label: "Assessment Report & Roadmap" },
    duration: "1 – 2 Weeks",
  },
  {
    no: "02",
    navLabel: "Build",
    title: "Build the Digital Foundation",
    tagline: "Digitise. Centralise. Integrate.",
    accent: "teal",
    icon: Database,
    description:
      "We build the systems and structure your business needs to run efficiently and prepare for automation and AI.",
    points: [
      "Custom software development",
      "Cloud database & data centralisation",
      "System integration & API",
      "CRM / ERP / internal portals",
      "Website & customer portals",
      "Data security & access control",
    ],
    output: { icon: Database, label: "Solid Digital Foundation & Connected Systems" },
    duration: "2 – 4 Weeks",
  },
  {
    no: "03",
    navLabel: "Automate",
    title: "Automate Operations",
    tagline: "Streamline. Automate. Save Time.",
    accent: "amber",
    icon: Settings,
    description:
      "We automate repetitive tasks and workflows to cut manual work, reduce errors and lower operating costs.",
    points: [
      "Workflow automation",
      "Document & approval automation",
      "Invoice, reporting & notifications",
      "Email / WhatsApp automation",
      "Task scheduling & RPA",
      "Real-time dashboards & reporting",
    ],
    output: { icon: Zap, label: "Automated Workflows & Operational Efficiency" },
    duration: "1 – 3 Weeks",
  },
  {
    no: "04",
    navLabel: "Enable",
    title: "Enable AI",
    tagline: "Make Data Intelligent. Drive Value.",
    accent: "purple",
    icon: Brain,
    description:
      "With clean data and connected systems, we apply AI solutions that deliver real insights and automation.",
    points: [
      "AI agents & chatbots",
      "AI search & knowledge base",
      "AI document understanding",
      "Predictive analytics & insights",
      "AI copilots & smart assistants",
      "Prompt engineering & tuning",
    ],
    output: { icon: Bot, label: "AI-Powered Solutions & Business Intelligence" },
    duration: "1 – 3 Weeks",
  },
  {
    no: "05",
    navLabel: "Optimise & Scale",
    title: "Optimise & Scale",
    tagline: "Measure. Improve. Scale Further.",
    accent: "blue",
    icon: TrendingUp,
    description:
      "We continuously optimise performance, monitor results and scale your digital and AI capabilities.",
    points: [
      "Performance monitoring & KPI tracking",
      "Continuous optimisation",
      "Ongoing support & maintenance",
      "Team training & capability building",
      "Future roadmap & feature expansion",
      "Scalable architecture & infrastructure",
    ],
    output: { icon: TrendingUp, label: "Sustainable Growth & Long-Term ROI" },
    duration: "Ongoing",
  },
];

/* ------------------------------- Solutions -------------------------------- */

export type Solution = {
  title: string;
  icon: LucideIcon;
  description: string;
};

export const solutions: Solution[] = [
  {
    title: "AI Workflow Automation",
    icon: Zap,
    description:
      "We look at the tasks your team does over and over and build systems that do them automatically. Think data entry, approvals, reporting and more.",
  },
  {
    title: "Cloud Data Migration",
    icon: Cloud,
    description:
      "Your business data is probably spread across old computers, spreadsheets, and outdated systems. We bring it all together and move it somewhere safe and easy to access.",
  },
  {
    title: "AI Agents and Chatbots",
    icon: Bot,
    description:
      "We build smart chat assistants that answer customer questions, handle bookings, and support your team around the clock. No extra staff needed.",
  },
  {
    title: "Data and Reporting",
    icon: LineChart,
    description:
      "We turn the data your business already has into simple reports and live dashboards. See what is working and what is not, without waiting for someone to pull a report.",
  },
  {
    title: "Software Development",
    icon: Globe2,
    description:
      "Custom software built for speed, usability, and scale. From internal tools to customer-facing products, we design and develop end to end.",
  },
  {
    title: "Systems Integration",
    icon: Plug,
    description:
      "If your tools do not talk to each other, your team wastes time copying data between them. We connect your existing software so everything stays in sync automatically.",
  },
];

/* -------------------------------- Grants ---------------------------------- */

export type Grant = {
  code: string;
  name: string;
  tag: string;
  icon: LucideIcon;
  description: string;
};

export const grants: Grant[] = [
  {
    code: "EDG",
    name: "Enterprise Development Grant",
    tag: "Up to 50% funding",
    icon: Landmark,
    description:
      "Support for AI consulting, software development and digital transformation projects.",
  },
  {
    code: "SSG",
    name: "SkillsFuture Singapore",
    tag: "Corporate training",
    icon: GraduationCap,
    description:
      "Course-fee funding for workforce AI upskilling and corporate training programmes.",
  },
  {
    code: "SFC",
    name: "SkillsFuture Credit",
    tag: "For individuals",
    icon: CreditCard,
    description:
      "Use SkillsFuture Credit for approved courses to build in-demand, future-ready AI skills.",
  },
];

export const grantProcess: { label: string; icon: LucideIcon }[] = [
  { label: "Assess eligibility", icon: Search },
  { label: "Recommend grants", icon: Compass },
  { label: "Application support", icon: FileCheck },
  { label: "Implementation", icon: Workflow },
  { label: "Training", icon: GraduationCap },
];

/* ------------------------------ Case Studies ------------------------------ */

export type CaseStudy = {
  metricValue: number;
  metricSuffix: string;
  metricLabel: string;
  industry: string;
  title: string;
  description: string;
};

export const caseStudies: CaseStudy[] = [
  {
    metricValue: 70,
    metricSuffix: "%",
    metricLabel: "Reduction in manual processing",
    industry: "Manufacturing",
    title: "Automating order & QA operations",
    description:
      "A precision manufacturer replaced manual order entry and quality reporting with AI-driven automation.",
  },
  {
    metricValue: 45,
    metricSuffix: "%",
    metricLabel: "Improvement in forecasting",
    industry: "Distribution",
    title: "Sharper demand & cash-flow forecasts",
    description:
      "Custom AI models improved demand planning and cash-flow accuracy across the business.",
  },
  {
    metricValue: 200,
    metricSuffix: "+",
    metricLabel: "Professionals upskilled",
    industry: "Workforce",
    title: "Group-wide AI enablement",
    description:
      "A structured upskilling programme made AI part of everyday work across every department.",
  },
];

/* --------------------------- Featured Projects ----------------------------- */

export type FeaturedProjectStat = {
  icon: LucideIcon;
  value: string;
  label: string;
};

export type FeaturedProjectTech = {
  name: string;
  icon: LucideIcon | IconType;
  colorClassName: string;
};

export type FeaturedProject = {
  /** Links to a full case study page in `portfolioProjects` when present. */
  slug?: string;
  badge: string;
  badgeIcon: LucideIcon;
  mockup: "invoice" | "pipeline" | "training";
  name: string;
  description: string;
  problem: string;
  solution: string;
  stats: FeaturedProjectStat[];
  techStack?: FeaturedProjectTech[];
  partners?: { name: string; accentClassName: string; caption?: string }[];
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "invoiceflow",
    badge: "Automation Project",
    badgeIcon: Zap,
    mockup: "invoice",
    name: "InvoiceFlow",
    description:
      "Automated invoice generation, payment tracking and reminders for an SME finance team.",
    problem:
      "Invoices were built by hand, payments lived in spreadsheets, and staff sent every reminder manually.",
    solution:
      "One automated workflow now creates invoices, tracks payments and sends reminders in real time.",
    stats: [
      { icon: Clock, value: "15 min → 2 min", label: "Invoice creation time" },
      { icon: User, value: "75%", label: "Less manual work" },
      { icon: Bell, value: "0", label: "Manual reminder emails" },
      { icon: Monitor, value: "100%", label: "Invoices tracked digitally" },
    ],
    techStack: [
      { name: "n8n", icon: SiN8N, colorClassName: "text-[#EA4B71]" },
      { name: "Supabase", icon: SiSupabase, colorClassName: "text-[#3ECF8E]" },
      { name: "WhatsApp API", icon: SiWhatsapp, colorClassName: "text-[#25D366]" },
      { name: "Resend", icon: SiResend, colorClassName: "text-navy" },
    ],
  },
  {
    slug: "compass",
    badge: "CRE Intelligence & Automation",
    badgeIcon: Compass,
    mockup: "pipeline",
    name: "Compass",
    description:
      "AI intelligence system for commercial real estate teams that spots companies about to need more office, retail or warehouse space — before a human would notice.",
    problem:
      "Brokers relied on cold calling, door-knocking and reactive URA REALIS/EdgeProp lease-expiration lists, missing companies that were quietly outgrowing their space until a competing broker already had months of head start.",
    solution:
      "AI agents scan hiring, funding and expansion signals to flag companies needing space months before a lease even comes up, then route the strongest opportunities straight into an automated pipeline.",
    stats: [
      { icon: Zap, value: "80%", label: "Faster opportunity qualification" },
      { icon: Database, value: "10,000+", label: "Companies monitored" },
      { icon: Target, value: "60%", label: "Higher quality opportunities" },
      { icon: TrendingUp, value: "Real-time", label: "Pipeline visibility" },
    ],
    techStack: [
      { name: "Next.js", icon: SiNextdotjs, colorClassName: "text-navy" },
      { name: "Supabase", icon: SiSupabase, colorClassName: "text-[#3ECF8E]" },
      { name: "Apify", icon: Bot, colorClassName: "text-violet-600" },
      { name: "Pipedrive API", icon: Handshake, colorClassName: "text-emerald-600" },
    ],
  },
  {
    badge: "Training Program",
    badgeIcon: GraduationCap,
    mockup: "training",
    name: "AI Workforce Upskilling",
    description:
      "Designed and delivered hands-on AI training programmes for professionals.",
    problem:
      "Employees understood AI in theory but had no clear way to apply it inside daily workflows.",
    solution:
      "Hands-on workshops built around real use cases, prompt engineering and everyday productivity gains.",
    stats: [
      { icon: Users, value: "200+", label: "Professionals trained" },
      { icon: Star, value: "4.8/5", label: "Average training rating" },
      { icon: BookOpen, value: "15+", label: "Workflows covered" },
      { icon: Award, value: "100%", label: "Practical & hands-on" },
    ],
    partners: [
      { name: "SkillsFuture", accentClassName: "text-red-600", caption: "SG" },
      { name: "SSG", accentClassName: "text-red-600", caption: "Singapore SkillsFuture" },
    ],
  },
];

export const featuredProjectValueProps: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Problem-Solving First",
    description: "We solve real operational problems that create immediate impact.",
    icon: Target,
  },
  {
    title: "Measurable Results",
    description: "Every project is designed to deliver clear, measurable improvements.",
    icon: TrendingUp,
  },
  {
    title: "Built with Scalable Tech",
    description: "Modern, reliable and scalable technologies that grow with you.",
    icon: Settings,
  },
  {
    title: "Focused on Long-Term Value",
    description: "Solutions that drive efficiency today and support your future growth.",
    icon: ShieldCheck,
  },
];

/* ------------------------------- Portfolio -------------------------------- */

export type KpiStat = {
  icon: LucideIcon;
  label: string;
  value: string;
  detail?: string;
  note?: string;
};

export type PortfolioProject = {
  slug: string;
  name: string;
  category: string;
  filterGroup: string;
  industry: string;
  description: string;
  challenge: {
    title: string;
    highlight: string;
    description: string;
    calloutTitle: string;
    calloutHighlight: string;
    painPoints: { label: string; description: string; icon: LucideIcon }[];
    flow: { label: string; icon: LucideIcon | IconType; colorClassName: string }[];
    flowWarning: string;
  };
  solution: {
    description: string;
  };
  workflow: {
    kpis: {
      icon: LucideIcon;
      value: string;
      label: string;
      detail: string;
      tone: "red" | "green" | "brand";
    }[];
    before: {
      timeValue: string;
      timeLabel: string;
      warning: string;
      loopLabel: string;
      steps: { title: string; description: string; icon: LucideIcon | IconType }[];
    };
    after: {
      timeValue: string;
      timeLabel: string;
      badge: string;
      customerStep: { title: string; description: string; icon: LucideIcon };
      automationLabel: string;
      automationSteps: { title: string; description: string; icon: LucideIcon | IconType }[];
      reviewStep: { title: string; description: string; icon: LucideIcon };
    };
    stats: {
      icon: LucideIcon;
      value: string;
      label: string;
      description: string;
      tone: "blue" | "green" | "purple" | "orange";
    }[];
  };
  businessImpact: {
    description: string;
    stats: KpiStat[];
  };
  beforeAfterTable: { before: string; after: string }[];
  techStack: FeaturedProjectTech[];
  demo: { embedUrl?: string; liveUrl?: string };
  businessValue: string[];
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "invoiceflow",
    name: "InvoiceFlow",
    category: "Finance Workflow Automation",
    filterGroup: "AI Automation",
    industry: "SME Finance & Operations",
    description:
      "Automating invoice generation, sending, tracking, and payment reminders for an SME finance team.",
    challenge: {
      title: "How most SMEs still",
      highlight: "handle invoicing",
      description:
        "For many SMEs, invoicing is still a manual, multi-step process spread across different tools. It takes time, creates bottlenecks, and leaves room for human error — slowing cash flow and taking focus away from growing the business.",
      calloutTitle: "Time-consuming. Error-prone. Hard to scale.",
      calloutHighlight: "It's a hidden cost most SMEs can't afford.",
      painPoints: [
        {
          label: "Manual customer lookup",
          description: "Searching for customer information across multiple files and systems.",
          icon: Search,
        },
        {
          label: "Manual invoice creation",
          description: "Creating invoices from scratch or copying old templates.",
          icon: ClipboardList,
        },
        {
          label: "Manual PDF generation",
          description: "Converting documents to PDF before sending.",
          icon: FileText,
        },
        {
          label: "Manual email drafting",
          description: "Writing and sending emails individually to each customer.",
          icon: Mail,
        },
        {
          label: "Spreadsheet tracking",
          description: "Manually updating spreadsheets to track invoices and payments.",
          icon: Table2,
        },
        {
          label: "Manual payment follow-up",
          description: "Chasing payments through reminders and status checks.",
          icon: Bell,
        },
        {
          label: "Repetitive admin work",
          description: "Doing the same tasks over and over instead of value-added work.",
          icon: Repeat,
        },
        {
          label: "Human error",
          description: "Typos, missed updates, and inconsistencies cause costly mistakes.",
          icon: AlertTriangle,
        },
      ],
      flow: [
        { label: "Create in Excel/Word", icon: FaFileExcel, colorClassName: "text-[#217346]" },
        { label: "Export as PDF", icon: FaFilePdf, colorClassName: "text-[#e02424]" },
        { label: "Draft & send email", icon: Mail, colorClassName: "text-blue-500" },
        {
          label: "Update spreadsheet",
          icon: BsFileEarmarkSpreadsheetFill,
          colorClassName: "text-[#0f9d58]",
        },
        { label: "Follow up for payment", icon: Bell, colorClassName: "text-amber-400" },
      ],
      flowWarning: "Repetitive. Inconsistent. Easy to get wrong.",
    },
    solution: {
      description:
        "Metadox designed a workflow automation around the client's existing invoicing process — replacing manual, repetitive admin with a streamlined system, while keeping human review before anything is sent.",
    },
    workflow: {
      kpis: [
        { icon: Clock, value: "15 min+", label: "Manual Process", detail: "per invoice", tone: "red" },
        { icon: Clock, value: "< 2 min", label: "With InvoiceFlow", detail: "per invoice", tone: "green" },
        { icon: TrendingUp, value: "87%", label: "Time Saved", detail: "per invoice", tone: "brand" },
      ],
      before: {
        timeValue: "15 min+",
        timeLabel: "per invoice",
        warning: "Repetitive, error-prone & time-consuming",
        loopLabel: "Repeat for every invoice",
        steps: [
          { title: "Customer Request", description: "Receive invoice request", icon: User },
          { title: "Create Invoice Manually", description: "Manually input all details", icon: PenLine },
          { title: "Generate PDF", description: "Export or save as PDF", icon: FaFilePdf },
          { title: "Draft Email", description: "Write and format email", icon: Mail },
          { title: "Send Invoice", description: "Attach PDF and send email", icon: Send },
          {
            title: "Update Spreadsheet",
            description: "Manually update tracking sheet",
            icon: LayoutDashboard,
          },
        ],
      },
      after: {
        timeValue: "< 2 min",
        timeLabel: "per invoice",
        badge: "Automated, accurate & faster",
        customerStep: {
          title: "Customer Request",
          description: "Invoice request received",
          icon: User,
        },
        automationLabel: "InvoiceFlow Automation",
        automationSteps: [
          { title: "Retrieve Customer", description: "Auto-fetch customer details", icon: Database },
          { title: "Generate Invoice", description: "Auto-generate invoice", icon: FileText },
          { title: "Create PDF", description: "Professional PDF created", icon: FaFilePdf },
          { title: "Send Email", description: "Email auto-drafted with invoice", icon: Mail },
          { title: "Update Tracking", description: "Tracking & due date updated", icon: TrendingUp },
          { title: "Schedule Follow-up", description: "Payment reminder scheduled", icon: Bell },
        ],
        reviewStep: {
          title: "Review & Send",
          description: "Quick review and send",
          icon: CheckCircle2,
        },
      },
      stats: [
        {
          icon: Clock,
          value: "87%",
          label: "Faster Invoicing",
          description: "Save up to 13 minutes per invoice.",
          tone: "blue",
        },
        {
          icon: Keyboard,
          value: "0",
          label: "Manual Data Entry",
          description: "Customer retrieval, invoice generation, and tracking are automated.",
          tone: "green",
        },
        {
          icon: Bell,
          value: "Automated",
          label: "Follow-ups",
          description: "Payment reminders are automatically scheduled and tracked.",
          tone: "purple",
        },
        {
          icon: ShieldCheck,
          value: "100%",
          label: "Consistent Output",
          description: "Every invoice, PDF, and email follows the same professional standard.",
          tone: "orange",
        },
      ],
    },
    businessImpact: {
      description:
        "The impact of moving invoicing from manual admin to an automated workflow.",
      stats: [
        {
          icon: Clock,
          label: "Time Per Invoice",
          value: "10–15 min",
          detail: "↓ ~1–2 min review",
          note: "≈ 80–90% reduction",
        },
        {
          icon: FileText,
          label: "Invoices Per Month",
          value: "300",
        },
        {
          icon: Hourglass,
          label: "Estimated Admin Time Saved",
          value: "40+ hours/month",
        },
        {
          icon: Coins,
          label: "Estimated Labour Cost Saved",
          value: "~S$800–1,500/month",
        },
        {
          icon: TrendingUp,
          label: "Manual Steps Eliminated",
          value: "6+",
        },
        {
          icon: CheckCircle2,
          label: "Human Errors",
          value: "Reduced through workflow standardisation",
        },
      ],
    },
    beforeAfterTable: [
      { before: "Manual invoice creation", after: "One-click generation" },
      { before: "Manual email", after: "Automated" },
      { before: "Spreadsheet tracking", after: "Dashboard" },
      { before: "Manual reminders", after: "Automated" },
    ],
    techStack: [
      { name: "n8n", icon: SiN8N, colorClassName: "text-[#EA4B71]" },
      { name: "Supabase", icon: SiSupabase, colorClassName: "text-[#3ECF8E]" },
      { name: "WhatsApp API", icon: SiWhatsapp, colorClassName: "text-[#25D366]" },
      { name: "Resend", icon: SiResend, colorClassName: "text-navy" },
    ],
    demo: {
      embedUrl: "https://app.arcade.software/share/videos/x13fbm2ZuArJfqmRtAUg",
    },
    businessValue: [
      "Reduces repetitive administrative work",
      "Standardises finance workflows",
      "Reduces manual errors",
      "Improves invoice visibility",
      "Better payment tracking",
      "Improves operational efficiency",
      "Shows how automation can help SMEs scale without adding admin workload",
    ],
  },
  {
    slug: "compass",
    name: "Compass",
    category: "CRE Intelligence & Automation",
    filterGroup: "AI Automation",
    industry: "Commercial Real Estate",
    description:
      "An AI intelligence system that identifies companies likely to need office, retail or warehouse space within the next 6–12 months, and automates the broker's pipeline end to end.",
    challenge: {
      title: "How most CRE brokers still",
      highlight: "find space-hungry companies",
      description:
        "Most brokers still prospect the way they did 20 years ago: cold calling and door-knocking businesses in a submarket, and cross-checking URA REALIS or EdgeProp for leases that are about to expire. But an expiring lease is a reactive signal — by the time it shows up, several other brokers are already circling. Anything earlier — a funding round, a hiring spree, a new branch opening — has to be caught by manually reading business news and LinkedIn, one company at a time, or by hoping a lawyer, accountant or mover happens to mention a growing client.",
      calloutTitle: "Reactive prospecting. Data everywhere, signal nowhere.",
      calloutHighlight: "By the time a lease is expiring, three other brokers have already called.",
      painPoints: [
        {
          label: "Cold calling & door-knocking",
          description: "Calling or visiting businesses one at a time, hoping to catch one that needs space.",
          icon: Phone,
        },
        {
          label: "Reactive lease-expiration lists",
          description: "URA REALIS and EdgeProp only flag a prospect once their lease is already about to expire.",
          icon: Landmark,
        },
        {
          label: "Referral-dependent pipeline",
          description: "Relying on lawyers, accountants and movers to mention a client is growing.",
          icon: Handshake,
        },
        {
          label: "Manual news & LinkedIn scanning",
          description: "Reading business journals and LinkedIn by hand for funding, hiring or expansion news.",
          icon: Search,
        },
        {
          label: "Fragmented public records",
          description: "Permit filings, business licences and news sit in separate places with nothing joining them up.",
          icon: FileCheck,
        },
        {
          label: "No opportunity scoring",
          description: "Every company treated the same, with no way to prioritise who needs space soonest.",
          icon: Target,
        },
        {
          label: "Delayed follow-up",
          description: "By the time a growing company is noticed, a competing broker has already made the call.",
          icon: Clock,
        },
        {
          label: "Spreadsheet-based tracking",
          description: "Tracking every prospect's status manually in a shared sheet.",
          icon: Table2,
        },
      ],
      flow: [
        { label: "Cold call & door-knock", icon: Phone, colorClassName: "text-[#0A66C2]" },
        { label: "Check URA REALIS / EdgeProp leases", icon: Landmark, colorClassName: "text-[#E4405F]" },
        {
          label: "Wait on referral tips",
          icon: Handshake,
          colorClassName: "text-[#0f9d58]",
        },
        { label: "Manually scan news & LinkedIn", icon: Search, colorClassName: "text-amber-500" },
        { label: "Follow up (often too late)", icon: Clock, colorClassName: "text-red-500" },
      ],
      flowWarning: "Reactive. Fragmented. Signals missed every day.",
    },
    solution: {
      description:
        "Compass is an AI-powered commercial real estate intelligence platform that transforms real-time business signals into qualified property opportunities. AI continuously identifies, qualifies, and prioritises companies likely to require new office, retail, or warehouse space, enabling brokers to engage prospects months before competitors.",
    },
    workflow: {
      kpis: [
        { icon: Clock, value: "2-3 hrs/day", label: "Cold Calling & List-Chasing", detail: "per broker", tone: "red" },
        { icon: Zap, value: "< 5 min", label: "With Compass", detail: "to review daily signals", tone: "green" },
        { icon: TrendingUp, value: "80%", label: "Time Saved", detail: "vs cold calling & lease-list chasing", tone: "brand" },
      ],
      before: {
        timeValue: "2-3 hrs/day",
        timeLabel: "per broker, cold calling & chasing lease lists",
        warning: "Reactive, inconsistent & signals missed",
        loopLabel: "Repeat for every submarket",
        steps: [
          { title: "New Submarket", description: "Broker picks a submarket to prospect in", icon: User },
          { title: "Cold Call & Door-Knock", description: "Call or visit businesses one by one", icon: Phone },
          { title: "Check Lease-Expiration Lists", description: "Cross-reference URA REALIS or EdgeProp for expiring leases", icon: Landmark },
          { title: "Wait on Referral Tips", description: "Hope a lawyer, accountant or mover mentions a growing client", icon: Handshake },
          { title: "Guess Priority", description: "No consistent way to rank who needs space soonest", icon: Target },
          { title: "Manual Outreach", description: "Reach out without knowing any growth signals", icon: Send },
        ],
      },
      after: {
        timeValue: "< 5 min",
        timeLabel: "to review daily qualified opportunities",
        badge: "Automated, scored & prioritised",
        customerStep: {
          title: "New Signal Detected",
          description: "Signal Feed catches a growth signal months before the lease renewal",
          icon: Bell,
        },
        automationLabel: "Compass Automation",
        automationSteps: [
          { title: "Monitor Signal Feed", description: "Scans LinkedIn, Facebook, Instagram, news & public filings for growth signals", icon: Search },
          { title: "Match Social Profiles", description: "AI matches identities across platforms", icon: Users },
          { title: "Enrich Company Data", description: "Auto-fills company, headcount & contact details", icon: Database },
          { title: "AI Opportunity Scoring", description: "Scores & prioritises by likelihood of near-term space need — months before a lease expires", icon: Target },
          { title: "Sync to Pipeline", description: "Pushes qualified opportunities into the pipeline", icon: Handshake },
          { title: "Notify Broker", description: "Sends an instant alert the moment a high-intent signal lands", icon: Bell },
        ],
        reviewStep: {
          title: "Review & Engage",
          description: "Broker reviews top opportunities and reaches out first",
          icon: CheckCircle2,
        },
      },
      stats: [
        {
          icon: Zap,
          value: "80%",
          label: "Faster Qualification",
          description: "Cuts manual research time from hours to minutes.",
          tone: "blue",
        },
        {
          icon: Database,
          value: "10,000+",
          label: "Companies Processed",
          description: "Signal Feed continuously enriches and tracks companies at scale.",
          tone: "green",
        },
        {
          icon: Target,
          value: "60%",
          label: "Higher Quality Opportunities",
          description: "AI scoring surfaces the companies most likely to need space soon.",
          tone: "purple",
        },
        {
          icon: TrendingUp,
          value: "Real-time",
          label: "Pipeline Visibility",
          description: "Every opportunity's status and signal history in one dashboard.",
          tone: "orange",
        },
      ],
    },
    businessImpact: {
      description:
        "The impact of moving CRE prospecting from manual research to an AI-scored Signal Feed.",
      stats: [
        {
          icon: Clock,
          label: "Research Time Per Prospect",
          value: "20–30 min",
          detail: "↓ ~2–3 min review",
          note: "≈ 85% reduction",
        },
        {
          icon: Database,
          label: "Companies Processed",
          value: "10,000+",
        },
        {
          icon: Hourglass,
          label: "Estimated Time Saved",
          value: "15+ hours/week per broker",
        },
        {
          icon: Target,
          label: "Opportunity Quality Improvement",
          value: "~60% higher",
        },
        {
          icon: TrendingUp,
          label: "Manual Steps Eliminated",
          value: "5+",
        },
        {
          icon: CheckCircle2,
          label: "Pipeline Visibility",
          value: "Real-time, always up to date",
        },
      ],
    },
    beforeAfterTable: [
      { before: "Cold calling & door-knocking", after: "Automated Signal Feed" },
      { before: "Reactive lease-expiration lists", after: "Proactive growth-signal detection" },
      { before: "Referral-dependent pipeline", after: "AI-matched identities & signals" },
      { before: "No opportunity prioritisation", after: "AI-scored & ranked opportunities" },
    ],
    techStack: [
      { name: "Next.js", icon: SiNextdotjs, colorClassName: "text-navy" },
      { name: "Supabase", icon: SiSupabase, colorClassName: "text-[#3ECF8E]" },
      { name: "Apify", icon: Bot, colorClassName: "text-violet-600" },
      { name: "Pipedrive API", icon: Handshake, colorClassName: "text-emerald-600" },
    ],
    demo: {
      embedUrl: "https://app.arcade.software/share/videos/kIyxlt47KCgFOPJXXLb2",
      liveUrl: "https://metadox-compass.vercel.app",
    },
    businessValue: [
      "Eliminates hours of manual prospecting each week",
      "Surfaces companies about to need space before competing brokers do",
      "Standardises opportunity qualification with AI scoring",
      "Keeps pipeline data accurate and up to date automatically",
      "Improves broker focus on the highest-value opportunities",
      "Gives leadership real-time visibility into pipeline health",
      "Shows how AI can turn scattered growth signals into a scalable deal engine",
    ],
  },
];

export type ExternalPortfolioProject = {
  name: string;
  category: string;
  filterGroup: string;
  description: string;
  url: string;
};

export const externalPortfolioProjects: ExternalPortfolioProject[] = [
  {
    name: "SCGM Repository",
    category: "Nonprofit Web Platform",
    filterGroup: "Web Development",
    description:
      "A shared platform for the Singapore Centre for Global Missions that centralises every partner church's mission data, so leaders see the full picture and can find natural partners to work with.",
    url: "https://scgmrepo.vercel.app/",
  },
  {
    name: "DroneAIO",
    category: "Commercial Drone Services Website",
    filterGroup: "Web Development",
    description:
      "An all-in-one commercial drone solutions hub bringing facade inspection and drone photography/videography for marketing together on one site.",
    url: "https://drone-aio.vercel.app/",
  },
];

/* ------------------------------ Technologies ------------------------------- */

export const technologies: FeaturedProjectTech[] = [
  { name: "Next.js", icon: SiNextdotjs, colorClassName: "text-navy" },
  { name: "React", icon: SiReact, colorClassName: "text-[#61DAFB]" },
  { name: "TypeScript", icon: SiTypescript, colorClassName: "text-[#3178C6]" },
  { name: "Tailwind CSS", icon: SiTailwindcss, colorClassName: "text-[#06B6D4]" },
  { name: "Node.js", icon: SiNodedotjs, colorClassName: "text-[#5FA04E]" },
  { name: "Python", icon: SiPython, colorClassName: "text-[#3776AB]" },
  { name: "Supabase", icon: SiSupabase, colorClassName: "text-[#3ECF8E]" },
  { name: "PostgreSQL", icon: SiPostgresql, colorClassName: "text-[#4169E1]" },
  { name: "Docker", icon: SiDocker, colorClassName: "text-[#2496ED]" },
  { name: "Vercel", icon: SiVercel, colorClassName: "text-navy" },
  { name: "GitHub", icon: SiGithub, colorClassName: "text-navy" },
  { name: "n8n", icon: SiN8N, colorClassName: "text-[#EA4B71]" },
  { name: "Zapier", icon: SiZapier, colorClassName: "text-[#FF4F00]" },
  { name: "OpenAI", icon: BsOpenai, colorClassName: "text-navy" },
  { name: "Claude", icon: SiClaude, colorClassName: "text-[#D97757]" },
  { name: "Gemini", icon: SiGooglegemini, colorClassName: "text-[#4285F4]" },
];

/* -------------------------------- Partners -------------------------------- */

export const partners: { name: string; type: "ecosystem" | "technology" }[] = [
  { name: "Enterprise Singapore", type: "ecosystem" },
  { name: "SkillsFuture", type: "ecosystem" },
  { name: "SSG", type: "ecosystem" },
  { name: "EDG", type: "ecosystem" },
  { name: "Alibaba Cloud", type: "technology" },
  { name: "Huawei Cloud", type: "technology" },
  { name: "Tencent Cloud", type: "technology" },
  { name: "Microsoft", type: "technology" },
];

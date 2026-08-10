/**
 * Copy for the landing-styled `/projects` page.
 *
 * Kept separate from `content.ts` (which still powers the legacy case-study
 * route at `/projects/[slug]`) because this page tells the same story in the
 * `lp-*` visual language: one real project, shown in full, instead of a grid
 * of teasers.
 */

import type { IconType } from "react-icons";
import { BsOpenai } from "react-icons/bs";
import {
  SiN8N,
  SiSupabase,
  SiWhatsapp,
  SiResend,
  SiNextdotjs,
  SiTelegram,
} from "react-icons/si";

export const projectsHero = {
  eyebrow: "Success Stories",
  heading: "Real Results From Real Clients",
  subhead:
    "Every project below is work we've delivered for real clients and organisations, solving real challenges and delivering real outcomes.",
} as const;

/** Closing band on the Projects and case-study pages. */
export const projectsCta = {
  eyebrow: "You've seen what's possible",
  heading: "Now, let's build what's possible for you.",
  subhead:
    "Every business has different challenges, workflows, and opportunities. We take the time to understand how yours works. Then we identify where technology can make the biggest difference and build solutions around what you actually need.",
  whatsappLabel: "Message Us on WhatsApp",
  whatsappMessage:
    "Hello, I'd like to talk about AI and automation for my business.",
  bookLabel: "Book a Free Discovery Call",
} as const;

export type ShowcaseProject = {
  slug: string;
  name: string;
  category: string;
  industry: string;
  filterGroup: string;
  impactLabel: string;
  impactHeadline: string;
  tags: { name: string; icon: IconType; colorClassName: string }[];
  challenge: string;
  solution: string;
  ctaLabel: string;
  ctaHref: string;
};

export const showcaseProjects: ShowcaseProject[] = [
  {
    slug: "invoiceflow",
    name: "InvoiceFlow",
    category: "Finance Workflow Automation",
    industry: "SME Finance & Operations",
    filterGroup: "AI Automation",
    impactLabel: "Impact",
    impactHeadline: "80 to 90% less time spent on invoicing",
    tags: [
      { name: "n8n", icon: SiN8N, colorClassName: "text-[#EA4B71]" },
      { name: "Supabase", icon: SiSupabase, colorClassName: "text-[#3ECF8E]" },
      { name: "WhatsApp API", icon: SiWhatsapp, colorClassName: "text-[#25D366]" },
      { name: "Resend", icon: SiResend, colorClassName: "text-navy" },
    ],
    challenge:
      "For many SMEs, invoicing is still a manual, multi-step process spread across different tools. It takes time, creates bottlenecks, and leaves room for human error, slowing cash flow and taking focus away from growing the business.",
    solution:
      "Metadox designed a workflow automation around the client's existing invoicing process, replacing manual, repetitive admin with a streamlined system that creates, sends, and tracks every invoice automatically, while keeping human review before anything goes out.",
    ctaLabel: "View Case Study",
    ctaHref: "/projects/invoiceflow",
  },
  {
    slug: "vero",
    name: "Vero",
    category: "AI Content Intelligence",
    industry: "Financial Advisory & Wealth Management",
    filterGroup: "AI Automation",
    impactLabel: "Impact",
    impactHeadline: "Hours of research turned into minutes",
    tags: [
      { name: "Next.js", icon: SiNextdotjs, colorClassName: "text-navy" },
      { name: "Supabase", icon: SiSupabase, colorClassName: "text-[#3ECF8E]" },
      { name: "OpenAI API", icon: BsOpenai, colorClassName: "text-navy" },
      { name: "Telegram API", icon: SiTelegram, colorClassName: "text-[#26A5E4]" },
    ],
    challenge:
      "Financial advisors spend hours each week researching market updates, financial news, government initiatives, and relevant topics to share with their clients. The process is repetitive and time-consuming, taking valuable time away from client relationships and advisory work.",
    solution:
      "Metadox built Vero, an AI-powered content intelligence platform that researches relevant financial topics, identifies useful updates, and turns them into clear, client-ready content. Advisors can review, edit, and approve drafts before publishing, giving them a faster and more consistent way to stay connected with their clients.",
    ctaLabel: "View Case Study",
    ctaHref: "https://vero-app-six.vercel.app/",
  },
];

import { calendlyUrl, primaryCta, siteConfig } from "@/lib/site";

/**
 * Everything client-specific for the chat assistant lives here. Porting this
 * system to another site: swap this file, rerun `npm run build:kb` against
 * that site's content modules, and the rest of lib/chat and components/chat
 * work unchanged.
 */
export const chatbotConfig = {
  assistantName: "Sarah",
  assistantTitle: "Virtual Assistant",
  assistantAvatar: "/chat/sarah-avatar.svg",
  companyName: siteConfig.name,
  greeting: `Hey, I'm Sarah 👋 Quick question! if AI could fix one frustrating thing in your business right now, what would you pick?`,
  suggestedPrompts: [
    "Too much manual work",
    "I want to reduce cost",
    "Need more sales",
    "Not sure, surprise me",
  ],
  calendlyUrl,
  bookingCtaLabel: primaryCta.label,
  whatsapp: siteConfig.contact.whatsapp,
  email: siteConfig.contact.email,
} as const;

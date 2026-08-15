import { tool } from "ai";
import { z } from "zod";

import { chatbotConfig } from "@/lib/chat/config";
import { logEvent, upsertLeadRow } from "@/lib/chat/sheets";
import type { LeadInfo } from "@/lib/chat/types";

export type ChatToolsContext = {
  conversationId: string;
  pageUrl?: string;
  /** Mutated in place so the route handler can read final state in onFinish. */
  state: {
    lead: LeadInfo;
    bookingIntent: boolean;
    ctaShown: boolean;
  };
};

export function createChatTools({ conversationId, pageUrl, state }: ChatToolsContext) {
  return {
    capture_lead: tool({
      description:
        "Save what you've learned about the visitor: name, email, company, industry, their pain point, or their goal. Call AT MOST TWICE per conversation: once when you first understand their real, concrete problem, and again only if they give a name, an email, or a genuinely different problem. Do not call it on a vague opening answer, and do not call it again just to reword a pain point you already saved. Omit fields you don't have rather than sending empty strings.",
      inputSchema: z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        company: z.string().optional(),
        industry: z.string().optional(),
        painPoint: z.string().optional(),
        goal: z.string().optional(),
      }),
      execute: async (input) => {
        state.lead = { ...state.lead, ...Object.fromEntries(Object.entries(input).filter(([, v]) => v)) };
        await upsertLeadRow({ conversationId, lead: state.lead, pageUrl });
        await logEvent(conversationId, "lead_captured");
        return { saved: true };
      },
    }),

    signal_booking_intent: tool({
      description:
        "Call ONCE per conversation, the first time the visitor shows genuine interest in booking a call or working with us, even before you have their contact details. Clicking a suggested prompt is not interest, and neither is your own decision to offer a call. If you have already called this, never call it again.",
      inputSchema: z.object({}),
      execute: async () => {
        state.bookingIntent = true;
        await upsertLeadRow({ conversationId, bookingIntent: true, pageUrl });
        await logEvent(conversationId, "booking_intent");
        return { acknowledged: true };
      },
    }),

    show_booking_cta: tool({
      description:
        "Show the booking button. It opens the scheduler in a popup where the visitor picks a time and enters their own name and email. This is how every call gets booked, and describing it in text does NOT create it: only this call does. Call it in the same reply as any sentence implying a scheduler, link or button exists, and whenever the visitor agrees to a call or asks for the link. You never see the available times, so never state a specific date or time. Call it exactly ONCE per conversation: if the button is already showing, do not call it again, just answer what they asked.",
      inputSchema: z.object({}),
      execute: async () => {
        state.ctaShown = true;
        await logEvent(conversationId, "booking_cta_shown");
        return {
          label: chatbotConfig.bookingCtaLabel,
          calendlyUrl: chatbotConfig.calendlyUrl,
        };
      },
    }),
  };
}

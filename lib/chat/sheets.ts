import { GoogleAuth } from "google-auth-library";

import type { ChatEvent, LeadInfo } from "@/lib/chat/types";

const LEADS_RANGE = "Leads!A:A";
const LEADS_APPEND_RANGE = "Leads!A:U";
const EVENTS_APPEND_RANGE = "Events!A:D";

const LEADS_HEADER = [
  "conversation_id",
  "created_at",
  "updated_at",
  "name",
  "email",
  "company",
  "industry",
  "pain_point",
  "goal",
  "booking_intent",
  "booked_cta_clicked",
  "message_count",
  "page_url",
  "transcript",
  "booked_at",
  // Token/cost observability, accumulated across every turn of the conversation.
  "llm_calls",
  "input_tokens",
  "cached_input_tokens",
  "output_tokens",
  "estimated_cost_usd",
  "model",
] as const;

let authClient: GoogleAuth | null = null;

function isConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SHEETS_ID &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY,
  );
}

function getAuth(): GoogleAuth {
  if (authClient) return authClient;
  authClient = new GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return authClient;
}

async function sheetsFetch(path: string, init?: RequestInit) {
  const client = getAuth();
  const token = await client.getAccessToken();
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`Sheets API ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

async function findLeadRow(conversationId: string): Promise<number | null> {
  const data = await sheetsFetch(`/values/${encodeURIComponent(LEADS_RANGE)}`);
  const values: string[][] = data.values || [];
  const rowIndex = values.findIndex((row) => row[0] === conversationId);
  return rowIndex === -1 ? null : rowIndex + 1;
}

export type TurnUsageUpdate = {
  model: string;
  /** Number of LLM calls this turn made (>1 when tool calls forced extra round-trips). */
  llmCalls: number;
  inputTokens: number;
  cachedInputTokens: number;
  outputTokens: number;
  /** Null when the model has no known pricing (see lib/chat/pricing.ts). */
  costUsd: number | null;
};

export type LeadRowUpdate = {
  conversationId: string;
  lead?: LeadInfo;
  bookingIntent?: boolean;
  ctaClicked?: boolean;
  messageCount?: number;
  pageUrl?: string;
  transcript?: string;
  /** ISO start time of the confirmed discovery call. */
  bookedAt?: string;
  /** This turn's token usage — accumulated into the row's running totals. */
  usage?: TurnUsageUpdate;
};

/** Upserts one row per conversation in the Leads tab. Swallows errors: a CRM outage must never break a chat. */
export async function upsertLeadRow(update: LeadRowUpdate): Promise<void> {
  if (!isConfigured()) return;

  try {
    const now = new Date().toISOString();
    const existingRow = await findLeadRow(update.conversationId);

    if (existingRow === null) {
      const row = [
        update.conversationId,
        now,
        now,
        update.lead?.name || "",
        update.lead?.email || "",
        update.lead?.company || "",
        update.lead?.industry || "",
        update.lead?.painPoint || "",
        update.lead?.goal || "",
        update.bookingIntent ? "yes" : "no",
        update.ctaClicked ? "yes" : "no",
        String(update.messageCount ?? 0),
        update.pageUrl || "",
        update.transcript || "",
        update.bookedAt || "",
        String(update.usage?.llmCalls ?? 0),
        String(update.usage?.inputTokens ?? 0),
        String(update.usage?.cachedInputTokens ?? 0),
        String(update.usage?.outputTokens ?? 0),
        update.usage?.costUsd != null ? update.usage.costUsd.toFixed(6) : "",
        update.usage?.model || "",
      ];
      await sheetsFetch(
        `/values/${encodeURIComponent(LEADS_APPEND_RANGE)}:append?valueInputOption=RAW`,
        { method: "POST", body: JSON.stringify({ values: [row] }) },
      );
      return;
    }

    const currentRes = await sheetsFetch(`/values/Leads!A${existingRow}:U${existingRow}`);
    const current: string[] = currentRes.values?.[0] || [];
    const merged = [...LEADS_HEADER].map((_, i) => current[i] || "");

    merged[2] = now;
    if (update.lead?.name) merged[3] = update.lead.name;
    if (update.lead?.email) merged[4] = update.lead.email;
    if (update.lead?.company) merged[5] = update.lead.company;
    if (update.lead?.industry) merged[6] = update.lead.industry;
    if (update.lead?.painPoint) merged[7] = update.lead.painPoint;
    if (update.lead?.goal) merged[8] = update.lead.goal;
    if (update.bookingIntent) merged[9] = "yes";
    if (update.ctaClicked) merged[10] = "yes";
    if (update.messageCount !== undefined) merged[11] = String(update.messageCount);
    if (update.pageUrl) merged[12] = update.pageUrl;
    if (update.transcript !== undefined) merged[13] = update.transcript;
    if (update.bookedAt) merged[14] = update.bookedAt;

    if (update.usage) {
      const numeric = (i: number) => Number(current[i]) || 0;
      merged[15] = String(numeric(15) + update.usage.llmCalls);
      merged[16] = String(numeric(16) + update.usage.inputTokens);
      merged[17] = String(numeric(17) + update.usage.cachedInputTokens);
      merged[18] = String(numeric(18) + update.usage.outputTokens);
      merged[19] =
        update.usage.costUsd != null ? (numeric(19) + update.usage.costUsd).toFixed(6) : merged[19];
      merged[20] = update.usage.model;
    }

    await sheetsFetch(`/values/Leads!A${existingRow}:U${existingRow}?valueInputOption=RAW`, {
      method: "PUT",
      body: JSON.stringify({ values: [merged] }),
    });
  } catch (err) {
    console.error("[chat/sheets] upsertLeadRow failed", err);
  }
}

/** Appends one row to the Events tab. Swallows errors: a CRM outage must never break a chat. */
export async function logEvent(conversationId: string, event: ChatEvent, detail?: string): Promise<void> {
  if (!isConfigured()) return;

  try {
    await sheetsFetch(
      `/values/${encodeURIComponent(EVENTS_APPEND_RANGE)}:append?valueInputOption=RAW`,
      {
        method: "POST",
        body: JSON.stringify({
          values: [[new Date().toISOString(), conversationId, event, detail || ""]],
        }),
      },
    );
  } catch (err) {
    console.error("[chat/sheets] logEvent failed", err);
  }
}

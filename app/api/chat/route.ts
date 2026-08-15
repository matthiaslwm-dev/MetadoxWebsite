import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";

import { getChatModel } from "@/lib/chat/model";
import { estimateCostUsd } from "@/lib/chat/pricing";
import { buildSystemPrompt } from "@/lib/chat/prompt";
import { MAX_INPUT_CHARS, MAX_MESSAGES_PER_CONVERSATION, isRateLimited } from "@/lib/chat/rate-limit";
import { logEvent, upsertLeadRow } from "@/lib/chat/sheets";
import { createChatTools } from "@/lib/chat/tools";

export const runtime = "nodejs";
export const maxDuration = 30;

/** Only the most recent turns are sent as model input; older ones rarely matter for this playbook (4-8 exchange target) and just cost tokens. */
const CONTEXT_WINDOW_MESSAGES = 16;

type ChatRequestBody = {
  id?: string;
  messages?: UIMessage[];
  pageUrl?: string;
};

function clientKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

function textFromParts(parts: UIMessage["parts"] | undefined): string {
  return (parts ?? [])
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

export async function POST(request: Request) {
  const key = clientKey(request);
  if (isRateLimited(key)) {
    return Response.json({ error: "Too many messages. Please slow down and try again shortly." }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as ChatRequestBody | null;
  const messages = body?.messages;
  const conversationId = body?.id;

  if (!messages || !conversationId) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (messages.length > MAX_MESSAGES_PER_CONVERSATION) {
    return Response.json({ error: "This conversation has reached its message limit." }, { status: 400 });
  }

  const lastText = textFromParts(messages[messages.length - 1]?.parts);
  if (lastText.length > MAX_INPUT_CHARS) {
    return Response.json({ error: "Message is too long." }, { status: 400 });
  }

  if (messages.length <= 1) {
    void logEvent(conversationId, "conversation_started", body?.pageUrl);
  }

  const state = {
    lead: {},
    bookingIntent: false,
    ctaShown: false,
  };

  const trimmedMessages = messages.slice(-CONTEXT_WINDOW_MESSAGES);

  const result = streamText({
    model: getChatModel(),
    system: buildSystemPrompt(),
    messages: await convertToModelMessages(trimmedMessages),
    tools: createChatTools({ conversationId, pageUrl: body?.pageUrl, state }),
    stopWhen: stepCountIs(20),
    // Reasoning models spend hidden reasoning tokens out of this budget before producing any visible
    // text/tool output — too low a cap silently truncates the reply to nothing. Kept generous as a
    // safety margin even with reasoningEffort "none" below (see route comment on known provider bug).
    maxOutputTokens: 2000,
    providerOptions: {
      // Ignored by non-OpenAI providers. "none" fully disables GPT-5.1+'s hidden reasoning pass —
      // this is a short conversational assistant, not a reasoning task, and reasoning tokens are what
      // caused replies to go silently empty. Some GPT-5.4 requests reportedly still burn reasoning
      // tokens despite "none" (open OpenAI bug) — maxOutputTokens above is the backstop for that.
      openai: { reasoningEffort: "none" },
    },
    onFinish: async (event) => {
      const modelId = event.model?.modelId ?? "unknown";
      const inputTokens = event.usage.inputTokens ?? 0;
      const cachedInputTokens = event.usage.inputTokenDetails.cacheReadTokens ?? 0;
      const outputTokens = event.usage.outputTokens ?? 0;
      const llmCalls = event.steps.length;
      const costUsd = estimateCostUsd(modelId, { inputTokens, cachedInputTokens, outputTokens });

      // Per-turn cost/token observability. Cheap enough to always log; aggregate with
      // scripts/report-usage.mts, which reads the running per-conversation totals this
      // writes into the Leads sheet below.
      console.log("[chat/usage]", {
        conversationId,
        model: modelId,
        llmCalls,
        inputTokens,
        cachedInputTokens,
        outputTokens,
        cacheHitRate: inputTokens > 0 ? cachedInputTokens / inputTokens : 0,
        costUsd,
      });

      await upsertLeadRow({
        conversationId,
        lead: state.lead,
        bookingIntent: state.bookingIntent || undefined,
        messageCount: messages.length,
        pageUrl: body?.pageUrl,
        transcript: messages.map((m) => `${m.role}: ${textFromParts(m.parts)}`).join("\n"),
        usage: { model: modelId, llmCalls, inputTokens, cachedInputTokens, outputTokens, costUsd },
      });
    },
  });

  return createUIMessageStreamResponse({ stream: result.toUIMessageStream() });
}

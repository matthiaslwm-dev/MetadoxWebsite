/**
 * Conversation simulator for the site chat assistant.
 *
 * Drives the REAL system prompt (lib/chat/prompt.ts) and the REAL model
 * (lib/chat/model.ts) against LLM-played visitor personas, then writes annotated
 * transcripts for review. The HTTP route is deliberately bypassed: it adds rate
 * limiting and Sheets logging but nothing that affects conversation quality, so
 * this stays offline and side-effect free. Tools are stubbed to record calls.
 *
 * Fidelity note: the greeting is client-side only (chat-panel renders the
 * welcome screen while messages is empty), so the model never sees it in its
 * history. The persona does see it, exactly like a visitor would.
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/simulate-chat.mts [--only <id>] [--label <name>]
 */
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import { openai } from "@ai-sdk/openai";
import { generateText, stepCountIs, tool, type ModelMessage } from "ai";
import { z } from "zod";

import { chatbotConfig } from "../lib/chat/config";
import { getChatModel } from "../lib/chat/model";
import { buildSystemPrompt } from "../lib/chat/prompt";
import { personas, type Persona } from "./chat-personas";

const PERSONA_MODEL = process.env.SIM_PERSONA_MODEL || "gpt-5.4";
const MAX_VISITOR_TURNS = 12;
/** Visitor gets this many more turns after the booking button appears, then we stop. */
const TURNS_AFTER_CTA = 3;
/**
 * The knowledge base makes every bot call ~19k tokens, so a 200k TPM account
 * only sustains a couple of conversations in parallel. Kept low with generous
 * retries rather than fast and flaky.
 */
const CONCURRENCY = 2;
const MAX_RETRIES = 8;
const END_TOKEN = "[END]";

type ToolCall = { turn: number; name: string; args: unknown };
type Turn = { role: "assistant" | "user"; text: string; tools?: ToolCall[] };

function arg(flag: string): string | undefined {
  const i = process.argv.indexOf(flag);
  return i === -1 ? undefined : process.argv[i + 1];
}

/** Mirrors lib/chat/tools.ts shape, but records instead of writing anywhere. */
function simTools(calls: ToolCall[], turn: () => number) {
  const record = (name: string) => (args: unknown) => {
    calls.push({ turn: turn(), name, args });
  };
  return {
    capture_lead: tool({
      description:
        "Save what you've learned about the visitor: name, email, company, industry, their pain point, or their goal. Call whenever you learn new info, even partial.",
      inputSchema: z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        company: z.string().optional(),
        industry: z.string().optional(),
        painPoint: z.string().optional(),
        goal: z.string().optional(),
      }),
      execute: async (input) => {
        record("capture_lead")(input);
        return { saved: true };
      },
    }),
    signal_booking_intent: tool({
      description:
        "Call the moment the visitor shows genuine interest in booking a call or working with us, even before you have their contact details.",
      inputSchema: z.object({}),
      execute: async (input) => {
        record("signal_booking_intent")(input);
        return { acknowledged: true };
      },
    }),
    show_booking_cta: tool({
      description:
        "Show the booking button. It opens the scheduler in a popup where the visitor picks a time and enters their own name and email. This is how every call gets booked: you never see or choose the times yourself, so never state a specific date or time. Call it once the visitor has agreed to a call.",
      inputSchema: z.object({}),
      execute: async (input) => {
        record("show_booking_cta")(input);
        return { label: chatbotConfig.bookingCtaLabel, calendlyUrl: chatbotConfig.calendlyUrl };
      },
    }),
  };
}

function personaSystem(p: Persona): string {
  return `You are role-playing a visitor on a company website, chatting with their assistant. Stay in character at all times. You are NOT an AI assistant here, you are this person:

${p.brief}

Ground truth about your business (answer consistently with this when asked, but do not dump it all at once):
${p.facts}

How you type:
- Like a real person on a phone or laptop, in a chat box. Short. Often no capital letters, occasional typo, occasional Singlish particle (lah, lor, ah) but do not overdo it.
- Usually one or two sentences. Sometimes just a few words.
- You are not trying to be helpful to the assistant. You answer what you feel like answering.
- Do not volunteer numbers, frequencies or details unless the question actually asks for them or it feels natural to mention.
- You get mildly annoyed by generic sales talk, questions that feel like a form, and being asked something you already answered.
- Never mention that this is a simulation, never break character, never write stage directions.
${p.behaviour ? `\nSpecific to you:\n${p.behaviour}\n` : ""}
When the conversation has reached a natural end (you have booked, you have said no, or you have lost interest), reply with your final in-character line followed by ${END_TOKEN} on the same line. Do not use ${END_TOKEN} before then.

The assistant greeted you with: "${chatbotConfig.greeting}"`;
}

/**
 * Persona sees the conversation mirrored: assistant turns are its "user" input.
 * On the very first turn there is nothing yet, so the greeting stands in as the
 * opening line the visitor is reacting to.
 */
function mirror(turns: Turn[]): ModelMessage[] {
  if (turns.length === 0) return [{ role: "user", content: chatbotConfig.greeting }];
  return turns.map((t) => ({
    role: t.role === "assistant" ? ("user" as const) : ("assistant" as const),
    content: t.text,
  }));
}

async function runPersona(p: Persona): Promise<{ persona: Persona; turns: Turn[]; toolCalls: ToolCall[]; note?: string }> {
  const system = buildSystemPrompt();
  const toolCalls: ToolCall[] = [];
  const turns: Turn[] = [];
  let visitorTurn = 0;
  const tools = simTools(toolCalls, () => visitorTurn);

  // Model history excludes the greeting, matching the real client.
  let botHistory: ModelMessage[] = [];
  let ctaTurn: number | null = null;
  let note: string | undefined;

  for (visitorTurn = 1; visitorTurn <= MAX_VISITOR_TURNS; visitorTurn++) {
    let visitorText: string;
    if (visitorTurn === 1 && p.opener) {
      visitorText = p.opener;
    } else {
      const v = await generateText({
        model: openai(PERSONA_MODEL),
        system: personaSystem(p),
        messages: mirror(turns),
        maxOutputTokens: 400,
        maxRetries: MAX_RETRIES,
      });
      visitorText = v.text.trim();
    }

    const ended = visitorText.includes(END_TOKEN);
    visitorText = visitorText.replace(END_TOKEN, "").trim();
    if (visitorText) turns.push({ role: "user", text: visitorText });
    if (ended) {
      note = `visitor ended the conversation at turn ${visitorTurn}`;
      break;
    }

    botHistory.push({ role: "user", content: visitorText });

    const before = toolCalls.length;
    const r = await generateText({
      model: getChatModel(),
      system,
      messages: botHistory,
      tools,
      stopWhen: stepCountIs(20),
      maxOutputTokens: 2000,
      maxRetries: MAX_RETRIES,
      providerOptions: { openai: { reasoningEffort: "none" } },
    });

    botHistory = [...botHistory, ...r.response.messages];
    const fired = toolCalls.slice(before);
    turns.push({ role: "assistant", text: r.text.trim(), tools: fired.length ? fired : undefined });

    if (!r.text.trim()) {
      note = `EMPTY REPLY from assistant at turn ${visitorTurn}`;
      break;
    }

    if (ctaTurn === null && fired.some((c) => c.name === "show_booking_cta")) ctaTurn = visitorTurn;
    if (ctaTurn !== null && visitorTurn >= ctaTurn + TURNS_AFTER_CTA) {
      note = note ?? `stopped ${TURNS_AFTER_CTA} turns after booking button appeared`;
      break;
    }
  }

  if (!note && visitorTurn > MAX_VISITOR_TURNS) {
    note = `hit the ${MAX_VISITOR_TURNS}-turn cap without reaching a booking`;
  }
  return { persona: p, turns, toolCalls, note };
}

function renderTranscript(r: Awaited<ReturnType<typeof runPersona>>): string {
  const exchanges = r.turns.filter((t) => t.role === "user").length;
  const lines: string[] = [
    `## ${r.persona.id}`,
    "",
    `**Probing:** ${r.persona.probe}`,
    `**Exchanges:** ${exchanges}`,
    `**Tools:** ${r.toolCalls.length ? r.toolCalls.map((c) => `\`${c.name}\` (turn ${c.turn})`).join(", ") : "none"}`,
    r.note ? `**Outcome:** ${r.note}` : "",
    "",
    "---",
    "",
    `**Sarah (greeting, client-side):** ${chatbotConfig.greeting}`,
    "",
  ];
  let n = 0;
  for (const t of r.turns) {
    if (t.role === "user") {
      n++;
      lines.push(`**Visitor ${n}:** ${t.text}`, "");
    } else {
      const wordCount = t.text.split(/\s+/).filter(Boolean).length;
      const questions = (t.text.match(/\?/g) || []).length;
      lines.push(`**Sarah ${n}:** ${t.text}`, "");
      lines.push(`> _${wordCount} words, ${questions} question mark(s)_${
        t.tools ? ` · tools: ${t.tools.map((c) => `\`${c.name}\`${Object.keys(c.args as object).length ? " " + JSON.stringify(c.args) : ""}`).join(", ")}` : ""
      }`, "");
    }
  }
  return lines.join("\n");
}

async function pool<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) {
        const i = cursor++;
        out[i] = await fn(items[i]);
      }
    }),
  );
  return out;
}

async function main() {
  const only = arg("--only");
  const label = arg("--label") || "run";
  const selected = only ? personas.filter((p) => p.id === only) : personas;
  if (!selected.length) throw new Error(`No persona matched --only ${only}`);

  const outDir = path.join(process.cwd(), "scripts", "sim-output", label);
  mkdirSync(outDir, { recursive: true });

  console.log(`Running ${selected.length} persona(s) · bot=${process.env.CHAT_MODEL} · persona=${PERSONA_MODEL}`);

  const results = await pool(selected, CONCURRENCY, async (p) => {
    const r = await runPersona(p).catch((e) => {
      console.error(`  ✗ ${p.id}: ${e.message}`);
      return { persona: p, turns: [] as Turn[], toolCalls: [] as ToolCall[], note: `ERROR: ${e.message}` };
    });
    console.log(`  ✓ ${p.id} (${r.turns.filter((t) => t.role === "user").length} exchanges, ${r.toolCalls.length} tool calls)`);
    return r;
  });

  const doc = [
    `# Chat simulation: ${label}`,
    "",
    `Bot model: \`${process.env.CHAT_MODEL}\` · Persona model: \`${PERSONA_MODEL}\` · ${new Date().toISOString()}`,
    "",
    ...results.map(renderTranscript),
  ].join("\n\n");

  const file = path.join(outDir, "transcripts.md");
  writeFileSync(file, doc, "utf-8");
  console.log(`\nWrote ${file}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

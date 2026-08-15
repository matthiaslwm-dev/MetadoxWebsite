/**
 * Aggregates the token/cost observability written into the Leads sheet by
 * app/api/chat/route.ts (see lib/chat/sheets.ts LEADS_HEADER) into fleet-wide
 * cost metrics: average/P50/P95 cost per conversation, cache hit rate, cost by
 * model, and so on. Read-only — never writes back to the sheet.
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/report-usage.mts
 */
import { GoogleAuth } from "google-auth-library";

const LEADS_RANGE = "Leads!A2:U";

// Column indices, matching LEADS_HEADER in lib/chat/sheets.ts.
const COL = {
  messageCount: 11,
  llmCalls: 15,
  inputTokens: 16,
  cachedInputTokens: 17,
  outputTokens: 18,
  costUsd: 19,
  model: 20,
} as const;

function num(row: string[], i: number): number {
  return Number(row[i]) || 0;
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const idx = Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length));
  return sorted[idx];
}

async function main() {
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  if (!sheetId || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    console.error("Missing GOOGLE_SHEETS_ID / GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_PRIVATE_KEY env vars.");
    process.exit(1);
  }

  const auth = new GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const token = await auth.getAccessToken();

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(LEADS_RANGE)}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) {
    console.error(`Sheets API ${res.status}: ${await res.text()}`);
    process.exit(1);
  }

  const { values } = (await res.json()) as { values?: string[][] };
  const rows = (values || []).filter((r) => r.length > 0 && num(r, COL.llmCalls) > 0);

  if (rows.length === 0) {
    console.log("No conversations with usage data yet.");
    return;
  }

  const costs = rows.map((r) => num(r, COL.costUsd)).sort((a, b) => a - b);
  const turns = rows.map((r) => num(r, COL.messageCount));
  const totalInput = rows.reduce((sum, r) => sum + num(r, COL.inputTokens), 0);
  const totalCached = rows.reduce((sum, r) => sum + num(r, COL.cachedInputTokens), 0);
  const totalOutput = rows.reduce((sum, r) => sum + num(r, COL.outputTokens), 0);
  const totalCalls = rows.reduce((sum, r) => sum + num(r, COL.llmCalls), 0);
  const totalCost = costs.reduce((sum, c) => sum + c, 0);

  const costByModel = new Map<string, { conversations: number; cost: number }>();
  for (const r of rows) {
    const model = r[COL.model] || "unknown";
    const entry = costByModel.get(model) ?? { conversations: 0, cost: 0 };
    entry.conversations += 1;
    entry.cost += num(r, COL.costUsd);
    costByModel.set(model, entry);
  }

  console.log(`\nConversations analysed: ${rows.length}\n`);
  console.log("Cost per conversation");
  console.log(`  Average : $${(totalCost / rows.length).toFixed(4)}`);
  console.log(`  P50     : $${percentile(costs, 50).toFixed(4)}`);
  console.log(`  P95     : $${percentile(costs, 95).toFixed(4)}`);
  console.log(`  Max     : $${costs[costs.length - 1].toFixed(4)}`);

  console.log("\nConversation shape");
  console.log(`  Avg messages/conversation : ${(turns.reduce((a, b) => a + b, 0) / turns.length).toFixed(1)}`);
  console.log(`  Avg LLM calls/conversation: ${(totalCalls / rows.length).toFixed(1)}`);
  console.log(`  Avg tokens/LLM call       : ${((totalInput + totalOutput) / totalCalls).toFixed(0)}`);

  console.log("\nCaching");
  console.log(`  Cache hit rate (cached/total input tokens): ${((totalCached / totalInput) * 100).toFixed(1)}%`);

  console.log("\nCost by model");
  for (const [model, { conversations, cost }] of costByModel) {
    console.log(`  ${model}: ${conversations} conversations, $${cost.toFixed(4)} total, $${(cost / conversations).toFixed(4)} avg`);
  }
  console.log("");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

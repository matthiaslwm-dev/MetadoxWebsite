import { logEvent, upsertLeadRow } from "@/lib/chat/sheets";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { conversationId?: string } | null;
  const conversationId = body?.conversationId;
  if (!conversationId) return Response.json({ error: "Missing conversationId" }, { status: 400 });

  await Promise.all([
    logEvent(conversationId, "cta_clicked"),
    upsertLeadRow({ conversationId, ctaClicked: true }),
  ]);

  return Response.json({ ok: true });
}

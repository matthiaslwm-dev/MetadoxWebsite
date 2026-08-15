/**
 * Last line of defence against the model emitting its own tool-call plumbing as
 * visible text. Observed in simulation on gpt-5.4-mini: a reply began with
 * `signal_booking_intent to=functions.signal_booking_intent <junk> to=functions.show_booking_cta <junk>`
 * before the real sentence, with no tools actually firing. Intermittent, so the
 * prompt alone can't be trusted to prevent it.
 *
 * Deliberately narrow: it only rewrites lines that already contain unmistakable
 * plumbing, so ordinary prose is never touched.
 */

const TOOL_NAMES = ["capture_lead", "signal_booking_intent", "show_booking_cta"];

/** Harmony-style channel sentinels, e.g. <|channel|>, <|start|>. */
const SENTINEL = /<\|[a-z_]*\|>/gi;
/** `functions.foo` and `to=functions.foo`. */
const FUNCTION_REF = /\b(?:to=)?functions\.[A-Za-z_][A-Za-z0-9_]*/g;
/** A bare tool name used as a token rather than inside a sentence. */
const BARE_TOOL = new RegExp(`\\b(?:${TOOL_NAMES.join("|")})\\b`, "g");

/** Non-global twins for testing, so no lastIndex state leaks between lines. */
const PLUMBING = new RegExp(`<\\|[a-z_]*\\|>|\\bfunctions\\.[A-Za-z_]|\\b(?:${TOOL_NAMES.join("|")})\\b`, "i");

export function sanitizeAssistantText(text: string): string {
  if (!text) return text;

  const cleaned = text
    .split("\n")
    .map((line) => {
      if (!PLUMBING.test(line)) return line;

      const stripped = line
        .replace(SENTINEL, "")
        .replace(FUNCTION_REF, "")
        .replace(BARE_TOOL, "")
        .replace(/\s{2,}/g, " ")
        .trim();

      // If what survives on a plumbing line has no letters, it was never prose
      // (the observed leak left only stray CJK spam tokens behind). Drop it.
      return /[A-Za-z]/.test(stripped) ? stripped : "";
    })
    .join("\n");

  return cleaned.replace(/\n{3,}/g, "\n\n").trim();
}

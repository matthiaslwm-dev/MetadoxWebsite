/**
 * Per-million-token USD rates for models this chatbot might run on, used to
 * turn raw usage (lib/chat/route usage capture) into an estimated cost per
 * turn/conversation for the observability logging. Source: provider pricing
 * pages, checked August 2026 — re-verify if a number looks stale.
 */
export type ModelPricing = {
  inputPerM: number;
  /** Rate for tokens served from the provider's automatic prompt cache. */
  cachedInputPerM: number;
  outputPerM: number;
};

const PRICING: Record<string, ModelPricing> = {
  "gpt-5.4-mini": { inputPerM: 0.75, cachedInputPerM: 0.075, outputPerM: 4.5 },
};

/** Returns null for unlisted models rather than guessing — see PRICING above to add one. */
export function getModelPricing(modelId: string): ModelPricing | null {
  return PRICING[modelId] ?? null;
}

export type TurnUsage = {
  inputTokens: number;
  cachedInputTokens: number;
  outputTokens: number;
};

/** Null when the model has no known pricing, so callers can log tokens without a fabricated cost. */
export function estimateCostUsd(modelId: string, usage: TurnUsage): number | null {
  const pricing = getModelPricing(modelId);
  if (!pricing) return null;

  const nonCachedInput = Math.max(usage.inputTokens - usage.cachedInputTokens, 0);
  const cost =
    nonCachedInput * pricing.inputPerM +
    usage.cachedInputTokens * pricing.cachedInputPerM +
    usage.outputTokens * pricing.outputPerM;

  return cost / 1_000_000;
}

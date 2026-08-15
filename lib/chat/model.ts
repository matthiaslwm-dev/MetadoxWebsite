import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import type { LanguageModel } from "ai";

export type ChatProvider = "google" | "openai" | "anthropic";

/**
 * Central place to swap the chat LLM. Add a new provider by installing its
 * AI SDK package and adding a case here — no other file needs to change.
 */
export function getChatModel(): LanguageModel {
  const provider = (process.env.CHAT_PROVIDER || "google") as ChatProvider;

  switch (provider) {
    case "google":
      return google(process.env.CHAT_MODEL || "gemini-flash-latest");
    case "openai":
      return openai(process.env.CHAT_MODEL || "gpt-5.4-mini");
    case "anthropic": {
      // Installed on demand: `npm install @ai-sdk/anthropic` when upgrading.
      throw new Error(
        "CHAT_PROVIDER=anthropic requires installing @ai-sdk/anthropic and wiring it in lib/chat/model.ts",
      );
    }
    default:
      throw new Error(`Unknown CHAT_PROVIDER: ${provider}`);
  }
}

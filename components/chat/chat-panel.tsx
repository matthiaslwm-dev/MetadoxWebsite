"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { RotateCcw, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { chatbotConfig } from "@/lib/chat/config";
import { MAX_INPUT_CHARS, MAX_MESSAGES_PER_CONVERSATION } from "@/lib/chat/rate-limit";
import { WelcomeScreen } from "@/components/chat/welcome-screen";
import { MessageBubble, TypingBubble } from "@/components/chat/message-bubble";
import { claimsBookingUi } from "@/lib/chat/cta-fallback";

const STORAGE_KEY_PREFIX = "metadox-chat:";

function storageKey(conversationId: string) {
  return `${STORAGE_KEY_PREFIX}${conversationId}`;
}

export function ChatPanel({
  conversationId,
  initialMessages,
  autoSendPrompt,
  onClose,
  onReset,
}: {
  conversationId: string;
  initialMessages: UIMessage[];
  autoSendPrompt?: string;
  onClose: () => void;
  onReset: () => void;
}) {
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const autoSentRef = useRef(false);

  const { messages, sendMessage, status, error } = useChat({
    id: conversationId,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: () => ({ pageUrl: window.location.href }),
    }),
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey(conversationId), JSON.stringify(messages));
    } catch {
      // sessionStorage unavailable (private browsing, quota) — conversation still works, just not persisted.
    }
  }, [messages, conversationId]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const isBusy = status === "submitted" || status === "streaming";
  const atLimit = messages.length >= MAX_MESSAGES_PER_CONVERSATION;

  /**
   * The booking button belongs to the FIRST assistant message that either fired
   * `show_booking_cta` or claimed in text that a scheduler exists. Deciding here
   * rather than per-bubble gives us both halves of the fix: the model re-calling
   * the tool later can't produce a second button, and a message that only talks
   * about the scheduler still gets one.
   */
  const ctaMessageId = useMemo(() => {
    const hit = messages.find(
      (m) =>
        m.role === "assistant" &&
        (m.parts.some(
          (p) => p.type === "tool-show_booking_cta" && "state" in p && p.state === "output-available",
        ) ||
          m.parts.some((p) => p.type === "text" && "text" in p && claimsBookingUi(p.text))),
    );
    return hit?.id;
  }, [messages]);

  const submitText = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isBusy || atLimit) return;
    sendMessage({ text: trimmed.slice(0, MAX_INPUT_CHARS) });
    setInput("");
  };

  useEffect(() => {
    if (!autoSendPrompt || autoSentRef.current || initialMessages.length > 0) return;
    autoSentRef.current = true;
    submitText(autoSendPrompt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSendPrompt]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-line bg-white px-4 py-3">
        <div className="flex items-center gap-2.5">
          <img
            src={chatbotConfig.assistantAvatar}
            alt=""
            className="size-9 shrink-0 rounded-full bg-blue"
          />
          <div>
            <p className="text-sm font-semibold text-navy">{chatbotConfig.assistantName}</p>
            <p className="text-xs text-muted">{chatbotConfig.assistantTitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onReset}
            aria-label="Start new conversation"
            title="Start new conversation"
            className="flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-canvas hover:text-navy"
          >
            <RotateCcw className="size-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-canvas hover:text-navy"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      <div ref={listRef} aria-live="polite" className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <WelcomeScreen onPromptClick={submitText} />
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                showCta={ctaMessageId === message.id}
                onCtaClicked={() => {
                  fetch("/api/chat/cta-click", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ conversationId }),
                  }).catch(() => {});
                }}
              />
            ))}
            {isBusy && messages[messages.length - 1]?.role === "user" && <TypingBubble />}
          </>
        )}
        {error && (
          <div className="rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700">
            <p>Something went wrong.</p>
            <button type="button" onClick={onReset} className="mt-1 font-semibold underline">
              Start a new conversation
            </button>
          </div>
        )}
      </div>

      <div className="border-t border-line bg-white p-3">
        {atLimit ? (
          <div className="px-1 text-center text-xs text-muted">
            <p>This conversation has reached its limit.</p>
            <button type="button" onClick={onReset} className="mt-1 font-semibold text-blue underline">
              Start a new conversation
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitText(input);
            }}
            className="flex items-end gap-2"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submitText(input);
                }
              }}
              placeholder="Type your message..."
              rows={1}
              maxLength={MAX_INPUT_CHARS}
              className="max-h-24 flex-1 resize-none rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-muted focus:border-blue/40"
            />
            <button
              type="submit"
              disabled={!input.trim() || isBusy}
              aria-label="Send message"
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-full bg-blue text-white transition-all",
                "hover:-translate-y-0.5 hover:bg-blue-ink disabled:pointer-events-none disabled:opacity-40 motion-reduce:transform-none",
              )}
            >
              <Send className="size-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

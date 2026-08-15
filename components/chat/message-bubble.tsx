import type { UIMessage } from "ai";
import { cn } from "@/lib/utils";
import { MarkdownLite } from "@/components/chat/markdown-lite";
import { BookingCta } from "@/components/chat/booking-cta";
import { chatbotConfig } from "@/lib/chat/config";
import { sanitizeAssistantText } from "@/lib/chat/sanitize";

export function MessageBubble({
  message,
  showCta,
  onCtaClicked,
}: {
  message: UIMessage;
  /** Decided by the panel, which is the only place that can see the whole conversation. */
  showCta: boolean;
  onCtaClicked: () => void;
}) {
  const isUser = message.role === "user";
  const textParts = message.parts.filter((p) => p.type === "text");

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-blue px-4 py-2.5 text-sm text-white">
          {textParts.map((p, i) => (
            <MarkdownLite key={i} text={"text" in p ? p.text : ""} />
          ))}
        </div>
      </div>
    );
  }

  // Sanitized before the emptiness check, so a reply that was nothing but leaked
  // tool plumbing collapses instead of rendering an empty bubble.
  const assistantTexts = textParts
    .map((p) => sanitizeAssistantText("text" in p ? p.text : ""))
    .filter((t) => t.trim().length > 0);
  const hasText = assistantTexts.length > 0;

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%]">
        {hasText && (
          <div
            className={cn(
              "rounded-2xl rounded-bl-md border border-line bg-white px-4 py-2.5 text-sm leading-relaxed text-ink shadow-soft",
            )}
          >
            {assistantTexts.map((t, i) => (
              <MarkdownLite key={i} text={t} />
            ))}
          </div>
        )}
        {showCta && <BookingCta onClicked={onCtaClicked} />}
      </div>
    </div>
  );
}

export function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3 shadow-soft">
        <span className="size-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.2s]" />
        <span className="size-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.1s]" />
        <span className="size-1.5 animate-bounce rounded-full bg-muted" />
        <span className="sr-only">{chatbotConfig.assistantName} is typing</span>
      </div>
    </div>
  );
}

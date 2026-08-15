"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { chatbotConfig } from "@/lib/chat/config";

export function ChatTeaser({
  onDismiss,
  onBubbleClick,
  onPromptClick,
}: {
  onDismiss: () => void;
  onBubbleClick: () => void;
  onPromptClick: (prompt: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed bottom-24 right-5 z-[89] flex w-[min(280px,85vw)] flex-col items-end gap-2 sm:right-6"
    >
      <div className="relative w-full">
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full border border-line bg-white text-muted shadow-soft transition-colors hover:text-navy"
        >
          <X className="size-3" />
        </button>
        <button
          type="button"
          onClick={onBubbleClick}
          className="flex w-full items-start gap-2.5 rounded-2xl rounded-br-md border border-line bg-white px-4 py-3 text-left shadow-lift transition-all hover:-translate-y-0.5 motion-reduce:transform-none"
        >
          <img src={chatbotConfig.assistantAvatar} alt="" className="mt-0.5 size-8 shrink-0 rounded-full bg-blue" />
          <span className="text-sm leading-relaxed text-ink">{chatbotConfig.greeting}</span>
        </button>
      </div>

      <div className="flex flex-col items-end gap-2">
        {chatbotConfig.suggestedPrompts.map((prompt, i) => (
          <motion.button
            key={prompt}
            type="button"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.1 + i * 0.06 }}
            onClick={() => onPromptClick(prompt)}
            className="rounded-full border border-blue/30 bg-white px-4 py-2 text-right text-xs font-medium text-blue shadow-soft transition-all hover:-translate-y-0.5 hover:bg-blue-soft motion-reduce:transform-none"
          >
            {prompt}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

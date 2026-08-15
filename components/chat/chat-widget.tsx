"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import type { UIMessage } from "ai";
import { ChatPanel } from "@/components/chat/chat-panel";
import { ChatTeaser } from "@/components/chat/chat-teaser";
import { useTabAttention } from "@/lib/chat/attention";

/** Full-page immersive flows render their own chrome; a floating widget would compete for attention. */
const SUPPRESSED_ROUTES = ["/business-ai-readiness", "/ai-skills-readiness"];

const SESSION_ID_KEY = "metadox-chat:id";
const TEASER_DELAY_MS = 1800;

function readStoredMessages(conversationId: string): UIMessage[] {
  try {
    const raw = sessionStorage.getItem(`metadox-chat:${conversationId}`);
    return raw ? (JSON.parse(raw) as UIMessage[]) : [];
  } catch {
    return [];
  }
}

function getOrCreateConversationId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_ID_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_ID_KEY, id);
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

function startNewConversation(previousId?: string): string {
  const id = crypto.randomUUID();
  try {
    if (previousId) sessionStorage.removeItem(`metadox-chat:${previousId}`);
    sessionStorage.setItem(SESSION_ID_KEY, id);
  } catch {
    // sessionStorage unavailable — new id still works, just isn't persisted.
  }
  return id;
}

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<{ conversationId: string; initialMessages: UIMessage[] } | null>(null);
  const [teaserVisible, setTeaserVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [autoSendPrompt, setAutoSendPrompt] = useState<string | undefined>();

  const suppressed = SUPPRESSED_ROUTES.includes(pathname);

  useEffect(() => {
    if (suppressed) return;
    setNotificationVisible(true);
    const timer = setTimeout(() => setTeaserVisible(true), TEASER_DELAY_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suppressed]);

  useTabAttention(notificationVisible, "1 new message");

  if (suppressed) return null;

  const markTeaserSeen = () => {
    setTeaserVisible(false);
    setNotificationVisible(false);
  };

  const openChat = () => {
    markTeaserSeen();
    if (!session) {
      const conversationId = getOrCreateConversationId();
      setSession({ conversationId, initialMessages: readStoredMessages(conversationId) });
    }
    setOpen(true);
  };

  const handleToggle = () => {
    if (!open) {
      openChat();
      return;
    }
    setOpen(false);
  };

  const handleTeaserPromptClick = (prompt: string) => {
    setAutoSendPrompt(prompt);
    openChat();
  };

  const handleReset = () => {
    const conversationId = startNewConversation(session?.conversationId);
    setSession({ conversationId, initialMessages: [] });
    setAutoSendPrompt(undefined);
  };

  return (
    <>
      <AnimatePresence>
        {!open && teaserVisible && session === null && (
          <ChatTeaser
            onDismiss={markTeaserSeen}
            onBubbleClick={openChat}
            onPromptClick={handleTeaserPromptClick}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && session && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-4 bottom-24 top-20 z-[90] flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-lift sm:inset-x-auto sm:bottom-24 sm:right-6 sm:top-auto sm:h-[600px] sm:w-[400px]"
            role="dialog"
            aria-modal="true"
            aria-label="Chat with Metadox"
          >
            <ChatPanel
              key={session.conversationId}
              conversationId={session.conversationId}
              initialMessages={session.initialMessages}
              autoSendPrompt={autoSendPrompt}
              onClose={() => setOpen(false)}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={handleToggle}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[90] flex size-14 items-center justify-center rounded-full bg-blue text-white shadow-[0_10px_30px_-8px_rgba(1,94,232,0.6)] transition-all hover:-translate-y-0.5 hover:bg-blue-ink motion-reduce:transform-none"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.15 }}
          >
            {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
          </motion.span>
        </AnimatePresence>

        {!open && notificationVisible && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[10px] font-bold text-white"
          >
            1
          </motion.span>
        )}
      </button>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const defaultMessages = [
  "Reviewing your business foundation...",
  "Analysing data and systems readiness...",
  "Benchmarking against similar Singapore businesses...",
  "Identifying inefficiencies...",
  "Selecting your top quick win...",
  "Preparing your AI readiness report...",
];

export function LoadingScreen({
  onDone,
  title = "Analysing Your AI Readiness",
  messages = defaultMessages,
}: {
  onDone: () => void;
  title?: string;
  messages?: string[];
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= messages.length - 1) {
      const timeout = setTimeout(onDone, 900);
      return () => clearTimeout(timeout);
    }
    const interval = setTimeout(() => setIndex((i) => i + 1), 750);
    return () => clearTimeout(interval);
  }, [index, onDone, messages.length]);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center py-16 text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-blue-soft text-blue">
        <Sparkles className="size-8 animate-pulse" />
      </span>
      <h1 className="mt-8 font-heading text-2xl font-bold text-navy">{title}</h1>
      <div className="mt-6 h-7">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="text-muted"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="mt-10 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-blue transition-all duration-700 ease-out"
          style={{ width: `${((index + 1) / messages.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

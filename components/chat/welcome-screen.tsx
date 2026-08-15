import { chatbotConfig } from "@/lib/chat/config";

export function WelcomeScreen({ onPromptClick }: { onPromptClick: (prompt: string) => void }) {
  return (
    <div className="flex flex-1 flex-col justify-end gap-4 px-4 pb-2">
      <div className="flex items-start gap-2.5">
        <img src={chatbotConfig.assistantAvatar} alt="" className="mt-0.5 size-8 shrink-0 rounded-full bg-blue" />
        <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-line bg-white px-4 py-2.5 text-sm leading-relaxed text-ink shadow-soft">
          {chatbotConfig.greeting}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {chatbotConfig.suggestedPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onPromptClick(prompt)}
            className="rounded-xl border border-line bg-white px-3.5 py-2.5 text-left text-xs font-medium text-navy shadow-soft transition-all hover:-translate-y-0.5 hover:border-blue/30 hover:bg-blue-soft motion-reduce:transform-none"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";
import { ChatInput } from "./ChatInput";
import { MessageBubble } from "./MessageBubble";
import { useChat } from "@/hooks/useChat";
import { useProfileStore } from "@/store/profileStore";
import { Button } from "@/components/ui/Button";

const suggestions = [
  "Which schemes am I most likely eligible for?",
  "What documents should I keep ready?",
  "Explain PM-KISAN application steps in simple words."
];

export function ChatWindow() {
  const searchParams = useSearchParams();
  const schemeId = searchParams.get("schemeId") ?? undefined;
  const language = useProfileStore((state) => state.language);
  const { messages, isStreaming, sendMessage } = useChat(schemeId);

  return (
    <div className="mx-auto flex h-[calc(100vh-9rem)] max-w-4xl flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-950 transition-colors">
      <div className="border-b border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-slate-900/50 px-4 py-3 transition-colors">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-brand-600 dark:text-sky-400 transition-colors" />
          <h1 className="text-base font-bold text-slate-950 dark:text-white transition-colors">CivicBridge assistant</h1>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion}
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => void sendMessage(suggestion)}
              disabled={isStreaming}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto bg-white dark:bg-slate-950 p-4 transition-colors">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
      <ChatInput onSend={(message) => void sendMessage(message)} disabled={isStreaming} language={language} />
    </div>
  );
}

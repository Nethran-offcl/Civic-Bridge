"use client";

import { useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";
import { ChatInput } from "./ChatInput";
import { MessageBubble } from "./MessageBubble";
import { useChat } from "@/hooks/useChat";
import { getSchemeById } from "@/lib/schemes";
import { useProfileStore } from "@/store/profileStore";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/hooks/useTranslation";
import type { Scheme } from "@/types/scheme";

const suggestions = [
  "Which schemes am I most likely eligible for?",
  "What documents should I keep ready?",
  "Explain PM-KISAN application steps in simple words."
];

export function ChatWindow({ initialScheme }: { initialScheme?: Scheme }) {
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const schemeId = searchParams.get("schemeId") ?? undefined;
  const language = useProfileStore((state) => state.language);
  const activeScheme = initialScheme ?? (schemeId ? getSchemeById(schemeId) : undefined);
  const { messages, isStreaming, sendMessage } = useChat(schemeId, activeScheme);

  return (
    <div className="mx-auto flex h-[calc(100vh-9rem)] max-w-4xl flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-950 transition-colors">
      <div className="border-b border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-slate-900/50 px-4 py-3 transition-colors">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-brand-600 dark:text-sky-400 transition-colors" />
          <h1 className="text-base font-bold text-slate-950 dark:text-white transition-colors">{t("CivicBridge assistant")}</h1>
        </div>
        {activeScheme ? (
          <div className="mt-3 rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 text-sm text-brand-950 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-100">
            <p className="font-semibold">{t("Current scheme")}: {activeScheme.name}</p>
            <p className="mt-1 line-clamp-2 text-brand-900/80 dark:text-sky-100/80">{activeScheme.descriptionDetailed}</p>
          </div>
        ) : null}
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
              {t(suggestion)}
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

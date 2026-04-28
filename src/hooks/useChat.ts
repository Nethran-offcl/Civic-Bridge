"use client";

import { useCallback, useEffect, useState } from "react";
import { detectLanguage } from "@/lib/i18n";
import { useProfileStore } from "@/store/profileStore";
import type { ChatMessage } from "@/types/chat";
import type { Scheme } from "@/types/scheme";

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    createdAt: new Date().toISOString()
  };
}

function createSchemeSummary(scheme: Scheme) {
  const topBenefit = scheme.benefits[0];
  const eligibilitySummary = scheme.eligibility.notes.slice(0, 3).join(" ");
  const documentsSummary = scheme.documents.slice(0, 4).join(", ");

  return [
    `Here is a quick summary of ${scheme.name}.`,
    scheme.descriptionDetailed,
    topBenefit ? `Main benefit: ${topBenefit.amount ?? topBenefit.title} - ${topBenefit.description}` : "Main benefit details are listed in the scheme.",
    eligibilitySummary ? `Eligibility notes: ${eligibilitySummary}` : "Eligibility notes are listed in the scheme.",
    documentsSummary ? `Keep these documents ready: ${documentsSummary}.` : "Document requirements are listed in the scheme.",
    scheme.applicationUrl ? `Official application portal: ${scheme.applicationUrl}` : "Official application portal is not listed.",
    "Ask any follow-up questions about this scheme and I will stay focused on it."
  ].join(" ");
}

function createInitialMessages(initialScheme?: Scheme) {
  if (!initialScheme) {
    return [createMessage("assistant", "Tell me which scheme you want to understand, or ask what you may be eligible for.")];
  }

  return [createMessage("assistant", createSchemeSummary(initialScheme))];
}

export function useChat(initialSchemeId?: string, initialScheme?: Scheme) {
  const profile = useProfileStore((state) => state.profile);
  const language = useProfileStore((state) => state.language);
  const setLanguage = useProfileStore((state) => state.setLanguage);
  const [messages, setMessages] = useState<ChatMessage[]>(() => createInitialMessages(initialScheme));
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    setMessages(createInitialMessages(initialScheme));
    setIsStreaming(false);
  }, [initialScheme]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isStreaming) return;

      const detected = detectLanguage(content);
      if (detected !== language) setLanguage(detected);

      const userMessage = createMessage("user", content.trim());
      const assistantMessage = createMessage("assistant", "");
      const nextMessages = [...messages, userMessage, assistantMessage];
      setMessages(nextMessages);
      setIsStreaming(true);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          profile,
          language: detected,
          schemeId: initialSchemeId
        })
      });

      const reader = response.body?.getReader();
      if (!reader) {
        setIsStreaming(false);
        return;
      }

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";

        for (const part of parts) {
          if (part.startsWith("data: ")) {
            const parsed = JSON.parse(part.replace("data: ", "")) as { token?: string };
            if (parsed.token) {
              setMessages((current) =>
                current.map((message) =>
                  message.id === assistantMessage.id
                    ? { ...message, content: message.content + parsed.token }
                    : message
                )
              );
            }
          }
        }
      }

      setIsStreaming(false);
    },
    [initialSchemeId, isStreaming, language, messages, profile, setLanguage]
  );

  return {
    messages,
    isStreaming,
    sendMessage
  };
}

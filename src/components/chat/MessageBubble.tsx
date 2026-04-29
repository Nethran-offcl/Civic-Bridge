import ReactMarkdown from "react-markdown";
import { Bot, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types/chat";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-3", isUser && "justify-end")}>
      {!isUser ? (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600 dark:bg-brand-900/50 dark:text-brand-100">
          <Bot className="h-5 w-5" />
        </div>
      ) : null}
      <div
        data-no-translate="true"
        className={cn(
          "max-w-[82%] rounded-lg px-4 py-3 text-sm leading-6",
          isUser ? "bg-brand-500 text-white dark:bg-sky-600 dark:text-white" : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
        )}
      >
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            ol: ({ children }) => <ol className="ml-5 list-decimal space-y-1">{children}</ol>,
            ul: ({ children }) => <ul className="ml-5 list-disc space-y-1">{children}</ul>,
            a: ({ children, href }) => (
              <a href={href} target="_blank" rel="noreferrer" className="font-semibold underline">
                {children}
              </a>
            )
          }}
        >
          {message.content || "..."}
        </ReactMarkdown>
      </div>
      {isUser ? (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-slate-900 text-white">
          <UserRound className="h-5 w-5" />
        </div>
      ) : null}
    </div>
  );
}

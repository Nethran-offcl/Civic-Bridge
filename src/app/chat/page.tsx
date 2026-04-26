import { Suspense } from "react";
import { ChatWindow } from "@/components/chat/ChatWindow";

export default function ChatPage() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="mx-auto max-w-4xl rounded-lg bg-white p-6">Loading chat...</div>}>
        <ChatWindow />
      </Suspense>
    </div>
  );
}

import { Suspense } from "react";
import { getSchemeById } from "@/lib/schemes";
import { ChatWindow } from "@/components/chat/ChatWindow";

export default async function ChatPage(props: { searchParams: Promise<{ schemeId?: string }> }) {
  const searchParams = await props.searchParams;
  const schemeId = searchParams?.schemeId;
  const selectedScheme = schemeId ? getSchemeById(schemeId) : undefined;

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="mx-auto max-w-4xl rounded-lg bg-white p-6">Loading chat...</div>}>
        <ChatWindow initialScheme={selectedScheme} />
      </Suspense>
    </div>
  );
}

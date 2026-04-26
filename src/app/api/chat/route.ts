import { detectLanguage } from "@/lib/i18n";
import { retrieveRelevantSchemes } from "@/lib/rag";
import { streamChat } from "@/lib/gemini";
import type { ChatRequestBody } from "@/types/chat";

const encoder = new TextEncoder();

export async function POST(request: Request) {
  const body = (await request.json()) as ChatRequestBody;
  const lastMessage = body.messages[body.messages.length - 1]?.content ?? "";
  const language = body.language ?? detectLanguage(lastMessage);
  const context = retrieveRelevantSchemes(lastMessage, { schemeId: body.schemeId, topK: 5 });

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const token of streamChat(body.messages, context, language, body.profile)) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token })}\n\n`));
        }
        controller.enqueue(encoder.encode("event: done\ndata: {}\n\n"));
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to stream answer";
        controller.enqueue(encoder.encode(`event: error\ndata: ${JSON.stringify({ message })}\n\n`));
      } finally {
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive"
    }
  });
}

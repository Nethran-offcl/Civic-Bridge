import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ChatMessage } from "@/types/chat";
import type { Scheme } from "@/types/scheme";
import type { SupportedLanguage, UserProfile } from "@/types/profile";
import { getCivicBridgeSystemPrompt } from "./prompts";

let client: GoogleGenerativeAI | null = null;

function getGeminiClient() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  if (!client) {
    client = new GoogleGenerativeAI(key);
  }
  return client;
}

export async function getEmbedding(text: string): Promise<number[]> {
  const genAI = getGeminiClient();
  if (!genAI) return localEmbedding(text);

  const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });
  const result = await embeddingModel.embedContent(text);
  return result.embedding.values;
}

export async function* streamChat(
  messages: ChatMessage[],
  context: Scheme[],
  language: SupportedLanguage,
  profile?: UserProfile
): AsyncGenerator<string> {
  const genAI = getGeminiClient();
  const system = getCivicBridgeSystemPrompt(language, profile, context);

  if (!genAI) {
    yield* streamFallbackAnswer(messages, context);
    return;
  }

  const geminiFlash = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { temperature: 0.3, topP: 0.95, maxOutputTokens: 2048 }
  });

  const conversation = messages
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join("\n");

  const result = await geminiFlash.generateContentStream(`${system}\n\nConversation:\n${conversation}`);

  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) yield text;
  }
}

function localEmbedding(text: string) {
  const vector = new Array<number>(32).fill(0);
  for (let index = 0; index < text.length; index += 1) {
    vector[index % vector.length] += text.charCodeAt(index) / 255;
  }
  return vector;
}

async function* streamFallbackAnswer(messages: ChatMessage[], context: Scheme[]) {
  const lastQuestion = messages[messages.length - 1]?.content ?? "this scheme";
  const primary = context[0];

  const answer = primary
    ? `1. Based on the scheme data I have, ${primary.name} may be relevant for your question: "${lastQuestion}".\n2. Main benefit: ${primary.benefits[0]?.amount ?? primary.benefits[0]?.title ?? "benefit details vary"}.\n3. Documents usually needed: ${primary.documents.slice(0, 4).join(", ")}.\n4. Apply or verify on the official portal: ${primary.applicationUrl ?? primary.sourceUrl ?? "not listed"}.\n5. Do not share Aadhaar, OTP, bank account number, or passwords in this chat.`
    : "I could not find a matching scheme in the local database. Please try asking about your occupation, state, age, or income range. Do not share Aadhaar, OTP, or bank details here.";

  const tokens = answer.split(/(\s+)/);
  for (const token of tokens) {
    await new Promise((resolve) => setTimeout(resolve, 12));
    yield token;
  }
}

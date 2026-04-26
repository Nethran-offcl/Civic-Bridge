import { NextResponse } from "next/server";
import { z } from "zod";
import { detectLanguage } from "@/lib/i18n";
import type { SupportedLanguage } from "@/types/profile";

const translateSchema = z.object({
  text: z.string().min(1),
  targetLanguage: z.enum(["en", "hi", "kn", "ta", "te", "mr", "bn", "gu"]).optional()
});

export async function POST(request: Request) {
  const parsed = translateSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid translation request" }, { status: 400 });
  }

  const detectedLanguage = detectLanguage(parsed.data.text);
  const targetLanguage: SupportedLanguage = parsed.data.targetLanguage ?? detectedLanguage;

  return NextResponse.json({
    text: parsed.data.text,
    detectedLanguage,
    targetLanguage,
    translated: false,
    note: "Translation API is not configured. Gemini chat responses are prompted in the detected language."
  });
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { detectLanguage } from "@/lib/i18n";
import { translateTexts } from "@/lib/translation";
import type { SupportedLanguage } from "@/types/profile";

const translateSchema = z.object({
  text: z.string().min(1).optional(),
  texts: z.array(z.string().min(1)).optional(),
  targetLanguage: z.enum(["en", "hi", "kn", "ta", "te", "mr", "bn", "gu"]).optional()
}).refine((value) => value.text || value.texts?.length, {
  message: "Provide text or texts"
});

export async function POST(request: Request) {
  const parsed = translateSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid translation request" }, { status: 400 });
  }

  const texts = parsed.data.texts ?? [parsed.data.text ?? ""];
  const sourceText = parsed.data.text ?? texts[0] ?? "";
  const detectedLanguage = detectLanguage(sourceText);
  const targetLanguage: SupportedLanguage = parsed.data.targetLanguage ?? detectedLanguage;
  const translatedTexts = await translateTexts(texts, targetLanguage);

  return NextResponse.json({
    text: translatedTexts[0] ?? parsed.data.text,
    texts: translatedTexts,
    detectedLanguage,
    targetLanguage,
    translated: targetLanguage !== "en"
  });
}

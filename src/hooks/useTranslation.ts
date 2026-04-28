"use client";

import { useCallback } from "react";
import { translateUi } from "@/lib/uiTranslations";
import { useProfileStore } from "@/store/profileStore";

export function useTranslation() {
  const language = useProfileStore((state) => state.language);

  const t = useCallback((text: string) => translateUi(text, language), [language]);

  return { language, t };
}

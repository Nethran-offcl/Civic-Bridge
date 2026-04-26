"use client";

import { detectLanguage } from "@/lib/i18n";
import { useProfileStore } from "@/store/profileStore";
import type { SupportedLanguage } from "@/types/profile";

export function useLanguage() {
  const language = useProfileStore((state) => state.language);
  const setLanguage = useProfileStore((state) => state.setLanguage);

  return {
    language,
    setLanguage,
    detectAndSetLanguage: (text: string) => {
      const detected = detectLanguage(text);
      setLanguage(detected);
      return detected;
    },
    isSupported: (value: string): value is SupportedLanguage =>
      ["en", "hi", "kn", "ta", "te", "mr", "bn", "gu"].includes(value)
  };
}

"use client";

import { Languages } from "lucide-react";
import { getSupportedLanguages } from "@/lib/i18n";
import { useProfileStore } from "@/store/profileStore";
import { Select } from "@/components/ui/Select";
import type { SupportedLanguage } from "@/types/profile";

export function LanguageToggle() {
  const language = useProfileStore((state) => state.language);
  const setLanguage = useProfileStore((state) => state.setLanguage);

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">
      <Languages className="h-4 w-4" />
      <Select
        aria-label="Select language"
        value={language}
        onChange={(event) => setLanguage(event.target.value as SupportedLanguage)}
        className="h-10 min-h-10 w-36"
      >
        {getSupportedLanguages().map((item) => (
          <option key={item.code} value={item.code}>
            {item.nativeName}
          </option>
        ))}
      </Select>
    </label>
  );
}

import type { SupportedLanguage } from "@/types/profile";

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, { name: string; nativeName: string; speechCode: string }> = {
  en: { name: "English", nativeName: "English", speechCode: "en-IN" },
  hi: { name: "Hindi", nativeName: "हिंदी", speechCode: "hi-IN" },
  kn: { name: "Kannada", nativeName: "ಕನ್ನಡ", speechCode: "kn-IN" },
  ta: { name: "Tamil", nativeName: "தமிழ்", speechCode: "ta-IN" },
  te: { name: "Telugu", nativeName: "తెలుగు", speechCode: "te-IN" },
  mr: { name: "Marathi", nativeName: "मराठी", speechCode: "mr-IN" },
  bn: { name: "Bengali", nativeName: "বাংলা", speechCode: "bn-IN" },
  gu: { name: "Gujarati", nativeName: "ગુજરાતી", speechCode: "gu-IN" }
};

export const UI_STRINGS = {
  en: {
    findSchemes: "Find my schemes",
    trusted: "Your data stays on your device until you choose to save it."
  },
  hi: {
    findSchemes: "मेरी योजनाएं खोजें",
    trusted: "जब तक आप सेव नहीं करते, आपका डेटा आपके डिवाइस पर रहता है।"
  }
} as const;

export function detectLanguage(text: string): SupportedLanguage {
  if (/[\u0C80-\u0CFF]/.test(text)) return "kn";
  if (/[\u0B80-\u0BFF]/.test(text)) return "ta";
  if (/[\u0C00-\u0C7F]/.test(text)) return "te";
  if (/[\u0980-\u09FF]/.test(text)) return "bn";
  if (/[\u0A80-\u0AFF]/.test(text)) return "gu";
  if (/[\u0900-\u097F]/.test(text)) return "hi";
  return "en";
}

export function getSupportedLanguages() {
  return Object.entries(SUPPORTED_LANGUAGES).map(([code, details]) => ({
    code: code as SupportedLanguage,
    ...details
  }));
}

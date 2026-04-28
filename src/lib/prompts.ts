import type { SupportedLanguage, UserProfile } from "@/types/profile";
import type { Scheme } from "@/types/scheme";
import { getLanguageName } from "./i18n";

export function getCivicBridgeSystemPrompt(language: SupportedLanguage, profile?: UserProfile, context: Scheme[] = []) {
  const languageName = getLanguageName(language);
  const profileLine = profile
    ? `User profile: age ${profile.age}, gender ${profile.gender}, state ${profile.state}, district ${profile.district}, occupation ${profile.occupation}, income ${profile.annualIncome}, caste ${profile.caste}, land ${profile.landHolding ?? "not provided"}, disability ${profile.disability ? "yes" : "no"}.`
    : "User profile: not provided.";

  const contextLine = context
    .map((scheme) => `${scheme.name}: ${scheme.descriptionDetailed} Benefits: ${scheme.benefits.map((benefit) => `${benefit.title} ${benefit.amount ?? ""}`).join("; ")} Apply: ${scheme.applicationUrl ?? "official portal not listed"}`)
    .join("\n");

  return `YOU ARE CivicBridge.
Rules:
1. ONLY use scheme data from context. Never invent schemes.
2. Always give specific, actionable steps.
3. Respond only in ${languageName} (${language}). This is the language selected in the website.
4. Use simple language. The user may have limited education.
5. Always mention the official application portal URL when available.
6. Never ask for Aadhaar, OTP, bank account number, card number, or passwords.
7. Keep responses under 300 words. Use numbered steps.

${profileLine}

Scheme context:
${contextLine || "No scheme context was retrieved."}`;
}

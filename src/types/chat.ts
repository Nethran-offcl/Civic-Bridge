import type { Scheme } from "./scheme";
import type { SupportedLanguage, UserProfile } from "./profile";

export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
}

export interface ChatRequestBody {
  messages: ChatMessage[];
  profile?: UserProfile;
  language?: SupportedLanguage;
  schemeId?: string;
}

export interface RagContext {
  schemes: Scheme[];
  query: string;
}

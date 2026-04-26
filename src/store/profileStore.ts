"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MatchResult } from "@/types/scheme";
import type { SupportedLanguage, UserProfile } from "@/types/profile";

interface ProfileState {
  profile: UserProfile | null;
  matches: MatchResult[];
  language: SupportedLanguage;
  profileId: string | null;
  setProfile: (profile: UserProfile) => void;
  setMatches: (matches: MatchResult[]) => void;
  setLanguage: (language: SupportedLanguage) => void;
  setProfileId: (profileId: string | null) => void;
  clear: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      matches: [],
      language: "en",
      profileId: null,
      setProfile: (profile) => set({ profile, language: profile.preferredLanguage }),
      setMatches: (matches) => set({ matches }),
      setLanguage: (language) => set({ language }),
      setProfileId: (profileId) => set({ profileId }),
      clear: () => set({ profile: null, matches: [], profileId: null })
    }),
    {
      name: "civicbridge-profile-v1"
    }
  )
);

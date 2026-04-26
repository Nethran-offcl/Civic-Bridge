import type { UserProfile } from "@/types/profile";

export interface IntakeStepProps {
  value: UserProfile;
  onChange: (patch: Partial<UserProfile>) => void;
}

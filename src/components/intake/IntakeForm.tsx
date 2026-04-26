"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { useProfileStore } from "@/store/profileStore";
import type { MatchResult } from "@/types/scheme";
import type { UserProfile } from "@/types/profile";
import { StepIndicator } from "./StepIndicator";
import { PersonalStep } from "./steps/PersonalStep";
import { LocationStep } from "./steps/LocationStep";
import { OccupationStep } from "./steps/OccupationStep";
import { IncomeStep } from "./steps/IncomeStep";
import { AdditionalStep } from "./steps/AdditionalStep";

const steps = ["Personal", "Location", "Work", "Income", "More"];

const initialProfile: UserProfile = {
  age: 45,
  gender: "female",
  state: "Karnataka",
  district: "",
  occupation: "farmer",
  annualIncome: "below_50000",
  caste: "prefer_not_to_say",
  landHolding: "below_1acre",
  disability: false,
  preferredLanguage: "en",
  familySize: 4
};

const demoProfile: UserProfile = {
  age: 52,
  gender: "male",
  state: "Karnataka",
  district: "Mandya",
  occupation: "farmer",
  annualIncome: "below_50000",
  caste: "OBC",
  landHolding: "1_2acres",
  disability: false,
  preferredLanguage: "en",
  familySize: 5
};

export function IntakeForm() {
  const router = useRouter();
  const setProfile = useProfileStore((state) => state.setProfile);
  const setMatches = useProfileStore((state) => state.setMatches);
  const setProfileId = useProfileStore((state) => state.setProfileId);
  const [profile, setLocalProfile] = useState<UserProfile>(initialProfile);
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateProfile(patch: Partial<UserProfile>) {
    setLocalProfile((current) => ({ ...current, ...patch }));
  }

  async function submitProfile(nextProfile = profile) {
    setIsSubmitting(true);
    setProfile(nextProfile);

    const response = await fetch("/api/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextProfile)
    });

    const data = (await response.json()) as { matches: MatchResult[]; profileId: string | null };
    setMatches(data.matches);
    setProfileId(data.profileId);
    setIsSubmitting(false);
    router.push("/results");
  }

  const StepComponent = [PersonalStep, LocationStep, OccupationStep, IncomeStep, AdditionalStep][step];

  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle>Find schemes in 2 minutes</CardTitle>
            <CardDescription>Answer five simple sections. You can skip optional details.</CardDescription>
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setLocalProfile(demoProfile);
              void submitProfile(demoProfile);
            }}
            disabled={isSubmitting}
          >
            <Sparkles className="h-4 w-4" />
            Demo farmer
          </Button>
        </div>
        <StepIndicator steps={steps} currentStep={step} />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          <ShieldCheck className="mr-2 inline h-4 w-4" />
          Your data stays on your device unless you configure Supabase saving.
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.18 }}
          >
            <StepComponent value={profile} onChange={updateProfile} />
          </motion.div>
        </AnimatePresence>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button type="button" variant="secondary" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0 || isSubmitting}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          {step < steps.length - 1 ? (
            <Button type="button" onClick={() => setStep((value) => Math.min(steps.length - 1, value + 1))}>
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="button" onClick={() => void submitProfile()} disabled={isSubmitting}>
              {isSubmitting ? "Matching..." : "Show my schemes"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

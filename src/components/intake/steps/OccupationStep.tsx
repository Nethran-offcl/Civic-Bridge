"use client";

import { BriefcaseBusiness, GraduationCap, Hammer, Leaf, Store, UsersRound, Waves } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { OCCUPATION_LABELS, type OccupationCategory } from "@/types/profile";
import type { IntakeStepProps } from "../types";

const options: Array<{ value: OccupationCategory; icon: React.ComponentType<{ className?: string }> }> = [
  { value: "farmer", icon: Leaf },
  { value: "agricultural_labourer", icon: Leaf },
  { value: "fisherman", icon: Waves },
  { value: "artisan", icon: Hammer },
  { value: "construction_worker", icon: Hammer },
  { value: "domestic_worker", icon: UsersRound },
  { value: "small_business", icon: Store },
  { value: "student", icon: GraduationCap },
  { value: "unemployed", icon: BriefcaseBusiness },
  { value: "other", icon: BriefcaseBusiness }
];

export function OccupationStep({ value, onChange }: IntakeStepProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const Icon = option.icon;
        return (
          <Button
            key={option.value}
            type="button"
            variant={value.occupation === option.value ? "default" : "secondary"}
            onClick={() => onChange({ occupation: option.value })}
            className="min-h-14 justify-start"
          >
            <Icon className="h-5 w-5" />
            {OCCUPATION_LABELS[option.value]}
          </Button>
        );
      })}
    </div>
  );
}

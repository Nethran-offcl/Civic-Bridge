"use client";

import { UserRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Gender } from "@/types/profile";
import type { IntakeStepProps } from "../types";

const genderOptions: Array<{ value: Gender; label: string }> = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" }
];

export function PersonalStep({ value, onChange }: IntakeStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="mb-3 block text-sm font-semibold text-slate-800">Age: {value.age}</label>
        <input
          type="range"
          min={18}
          max={80}
          value={value.age}
          onChange={(event) => onChange({ age: Number(event.target.value) })}
          className="w-full accent-brand-500"
        />
        <div className="mt-2 flex justify-between text-xs text-slate-500">
          <span>18</span>
          <span>80</span>
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold text-slate-800">Gender</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {genderOptions.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant={value.gender === option.value ? "default" : "secondary"}
              onClick={() => onChange({ gender: option.value })}
              className="justify-start"
            >
              <UserRound className="h-4 w-4" />
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
